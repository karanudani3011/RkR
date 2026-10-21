import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Pause, Play, Volume2, VolumeX } from 'lucide-react';
import './CaseStudies.css';

const VIDEO_TITLE = 'Our work on the road';
const VIDEO_CAPTION = 'See how we move heavy machinery and cargo across India.';

export default function CaseStudies() {
  const reduceMotion = useReducedMotion();
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  const playVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = isMuted;
    try {
      await video.play();
      setIsPlaying(true);
      setAutoplayBlocked(false);
    } catch {
      setIsPlaying(false);
      setAutoplayBlocked(true);
    }
  }, [isMuted]);

  useEffect(() => {
    document.title = 'Case Studies | RadheKrishna Roadways';
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const frame = frameRef.current;
    if (!video || !frame) return undefined;

    video.muted = true;
    if (reduceMotion) {
      video.pause();
      setIsPlaying(false);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        video.play().then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        }).catch(() => {
          setIsPlaying(false);
          setAutoplayBlocked(true);
        });
      } else {
        video.pause();
        setIsPlaying(false);
      }
    }, { threshold: 0.4 });

    observer.observe(frame);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [reduceMotion]);

  const togglePlayback = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      playVideo();
    }
  };

  const toggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    if (videoRef.current) videoRef.current.muted = nextMuted;
  };

  return (
    <main className="case-studies-page">
      <section className="case-studies-hero">
        <p className="case-studies-eyebrow">OUR WORK</p>
        <h1>Case Studies</h1>
        <p className="case-studies-subtitle">
          A look at how RadheKrishna Roadways supports transport needs across industries.
        </p>
      </section>

      <motion.section
        className="case-studies-video-section"
        aria-labelledby="case-studies-video-title"
        initial={reduceMotion ? false : { opacity: 0, y: 18 }}
        whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="case-studies-video-frame" ref={frameRef}>
          <video
            ref={videoRef}
            autoPlay={!reduceMotion}
            muted={isMuted}
            loop
            playsInline
            preload="auto"
            poster="/videos/case-study-poster.jpg"
            controls={Boolean(reduceMotion)}
            className="case-studies-video"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          >
            <source src="/videos/case-study.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {(reduceMotion || autoplayBlocked) && !isPlaying && (
            <button
              type="button"
              className="case-studies-video-start"
              onClick={playVideo}
              aria-label="Play case study video"
            >
              <Play aria-hidden="true" fill="currentColor" />
            </button>
          )}
          {!reduceMotion && (
            <div className="case-studies-video-controls">
              <button type="button" onClick={togglePlayback} aria-label={isPlaying ? 'Pause video' : 'Play video'}>
                {isPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" fill="currentColor" />}
              </button>
              <button type="button" onClick={toggleMute} aria-label={isMuted ? 'Unmute video' : 'Mute video'}>
                {isMuted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
              </button>
            </div>
          )}
        </div>
        <h2 id="case-studies-video-title" className="case-studies-video-title">
          {VIDEO_TITLE}
        </h2>
        <p className="case-studies-video-caption">{VIDEO_CAPTION}</p>
      </motion.section>
    </main>
  );
}
