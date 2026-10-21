import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

const mediaClassName = 'service-media-element';

export default function ServiceMedia({ type = 'image', src, poster, alt }) {
  const panelRef = useRef(null);
  const videoRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [videoFailed, setVideoFailed] = useState(false);
  const showVideo = type === 'video' && !reduceMotion && !videoFailed;

  useEffect(() => {
    const video = videoRef.current;
    const panel = panelRef.current;
    if (!showVideo || !video || !panel) return undefined;

    video.muted = true;
    const playVideo = () => {
      try {
        const playPromise = video.play();
        playPromise?.catch(() => {});
      } catch {
        // Autoplay can be blocked by the browser.
      }
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) playVideo();
      else video.pause();
    }, { threshold: 0.25 });

    observer.observe(panel);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [showVideo, src]);

  return (
    <div
      ref={panelRef}
      className="services-panel service-reveal relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-lg bg-neutral-100"
    >
      {showVideo ? (
        <video
          ref={videoRef}
          className={mediaClassName}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-label={alt}
          onError={() => setVideoFailed(true)}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          className={mediaClassName}
          src={type === 'video' ? poster : src}
          alt={alt}
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
}
