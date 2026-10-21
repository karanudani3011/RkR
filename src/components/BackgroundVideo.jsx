import { useEffect, useRef, useState } from 'react';
import './BackgroundVideo.css';

function getMotionPreference() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getMobilePreference() {
  return window.matchMedia('(max-width: 768px)').matches;
}

export default function BackgroundVideo({ src, poster, overlayClassName = 'bg-black/50' }) {
  const videoRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(getMotionPreference);
  const [mobile, setMobile] = useState(getMobilePreference);
  const showPosterOnly = reducedMotion || mobile;
  const overlayStyle = overlayClassName.includes('bg-gradient-to-r')
    ? { background: 'linear-gradient(to right, rgba(122,15,20,.9), rgba(143,17,25,.7), rgba(0,0,0,.4))' }
    : { backgroundColor: overlayClassName.includes('bg-black/60') ? 'rgba(0,0,0,.6)' : 'rgba(0,0,0,.5)' };

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const mobileQuery = window.matchMedia('(max-width: 768px)');
    const updateMotion = (event) => setReducedMotion(event.matches);
    const updateMobile = (event) => setMobile(event.matches);

    motionQuery.addEventListener?.('change', updateMotion);
    mobileQuery.addEventListener?.('change', updateMobile);
    return () => {
      motionQuery.removeEventListener?.('change', updateMotion);
      mobileQuery.removeEventListener?.('change', updateMobile);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || showPosterOnly) return undefined;

    video.muted = true;
    let observer;

    const playVideo = async () => {
      try {
        await video.play();
      } catch (error) {
        console.warn(`Background video autoplay was blocked: ${src}`, error);
      }
    };

    observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        playVideo();
      } else {
        video.pause();
      }
    }, { threshold: 0.4 });

    observer.observe(video);
    return () => {
      observer?.disconnect();
      video.pause();
    };
  }, [showPosterOnly, src]);

  return (
    <div className="background-video-layer absolute inset-0 z-0" aria-hidden="true">
      <div
        className="background-video-poster absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url("${poster}")` }}
      />
      {!showPosterOnly && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={poster}
          className="background-video absolute inset-0 h-full w-full object-cover"
          onError={() => console.error(`Failed to load background video: ${src}`)}
        >
          <source src={src} type="video/mp4" />
        </video>
      )}
      <div className={`background-video-overlay absolute inset-0 ${overlayClassName}`} style={overlayStyle} />
    </div>
  );
}
