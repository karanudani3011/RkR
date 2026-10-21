import { useEffect, useRef } from 'react';

const mediaClassName = 'service-media-element';

export default function ServiceMedia({ type = 'image', src, poster, alt, orientation = 'landscape', objectPosition = 'center', className = '' }) {
  const panelRef = useRef(null);
  const videoRef = useRef(null);
  const isPortrait = orientation === 'portrait';
  const isWideImage = type === 'image' && orientation === 'landscape-wide';
  const aspectRatio = isPortrait ? '3 / 4' : isWideImage ? '16 / 9' : '4 / 3';

  useEffect(() => {
    const video = videoRef.current;
    const panel = panelRef.current;
    if (type !== 'video' || !video || !panel) return undefined;

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
  }, [type, src]);

  return (
    <div
      ref={panelRef}
      className={`services-panel ph service-media-frame relative w-full overflow-hidden rounded-2xl shadow-lg bg-neutral-100 ${isPortrait ? 'orientation-portrait max-w-[360px] aspect-[3/4] mx-auto' : isWideImage ? 'service-media--landscape orientation-landscape aspect-video' : 'orientation-landscape aspect-[4/3]'} ${className}`.trim()}
      style={{ aspectRatio }}
    >
      {type === 'video' ? (
        <video
          ref={videoRef}
          className={`${mediaClassName} absolute inset-0 h-full w-full object-cover object-center`}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          aria-label={alt}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <img
          className={`${mediaClassName} absolute inset-0 h-full w-full object-cover object-center`}
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={{ objectPosition }}
        />
      )}
    </div>
  );
}
