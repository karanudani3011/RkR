import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Pause, Play, Truck, Volume2, VolumeX } from 'lucide-react';
import { caseStudies } from '../data/caseStudies.js';
import { PHONE_TEL } from '../constants/contact.js';
import './CaseStudies.css';

const PAGE_DESCRIPTION = 'Explore how RadheKrishna Roadways plans and delivers specialized transport solutions for oversized and industrial cargo.';

function CaseStudyVideo({ study, index, reduceMotion }) {
  const frameRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackBlocked, setPlaybackBlocked] = useState(false);
  const isFirstVideo = index === 0;

  const playVideo = useCallback(async () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = isMuted;
    try {
      await video.play();
      setIsPlaying(true);
      setPlaybackBlocked(false);
    } catch {
      setIsPlaying(false);
      setPlaybackBlocked(true);
    }
  }, [isMuted]);

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
          setPlaybackBlocked(false);
        }).catch(() => {
          setIsPlaying(false);
          setPlaybackBlocked(true);
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
    <div className="case-studies-video-frame" ref={frameRef}>
      <span className="case-studies-video-badge">CASE STUDY {String(index + 1).padStart(2, '0')}</span>
      <video
        ref={videoRef}
        autoPlay={isFirstVideo && !reduceMotion}
        muted={isMuted}
        loop
        playsInline
        preload={isFirstVideo ? 'metadata' : 'none'}
        poster={study.poster || undefined}
        className="case-studies-video"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        aria-label={`Video for ${study.title}`}
      >
        <source src={study.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {playbackBlocked && !isPlaying && (
        <button
          type="button"
          className="case-studies-video-start"
          onClick={playVideo}
          aria-label={`Play video for ${study.title}`}
        >
          <Play aria-hidden="true" fill="currentColor" />
        </button>
      )}
      <div className="case-studies-video-controls">
        <button type="button" onClick={togglePlayback} aria-label={isPlaying ? `Pause ${study.title} video` : `Play ${study.title} video`}>
          {isPlaying ? <Pause aria-hidden="true" /> : <Play aria-hidden="true" fill="currentColor" />}
        </button>
        <button type="button" onClick={toggleMute} aria-label={isMuted ? `Unmute ${study.title} video` : `Mute ${study.title} video`}>
          {isMuted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
        </button>
      </div>
    </div>
  );
}

function CaseStudyArticle({ study, index, reduceMotion }) {
  return (
    <article
      className={`case-studies-article case-studies-reveal${index % 2 === 1 ? ' is-reversed' : ''}`}
      id={`case-study-${study.id}`}
      style={{ '--case-study-stagger': `${index * 110}ms` }}
      aria-labelledby={`case-study-title-${study.id}`}
    >
      <div className="case-studies-media-column">
        <CaseStudyVideo study={study} index={index} reduceMotion={reduceMotion} />
      </div>
      <div className="case-studies-details">
        <span className="case-studies-category">{study.category}</span>
        <h2 id={`case-study-title-${study.id}`}>{study.title}</h2>
        <p className="case-studies-client">Client: {study.client}</p>
        <span className="case-studies-detail-rule" aria-hidden="true" />
        <h3 className="case-studies-overview-label">Project Overview</h3>
        <p className="case-studies-overview">{study.overview}</p>
        <div className="case-studies-stats" aria-label={`${study.client} project statistics`}>
          {study.stats.map((stat) => (
            <div className="case-studies-stat" key={`${stat.label}-${stat.value}`}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function CaseStudies() {
  const pageRef = useRef(null);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    document.title = 'Case Studies | RadheKrishna Roadways';
    let meta = document.querySelector('meta[name="description"]');
    const createdMeta = !meta;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    const previousDescription = meta.content;
    meta.content = PAGE_DESCRIPTION;
    return () => {
      if (createdMeta) meta.remove();
      else meta.content = previousDescription;
    };
  }, []);

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return undefined;
    const revealItems = [...page.querySelectorAll('.case-studies-reveal')];
    if (reduceMotion || !('IntersectionObserver' in window)) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        instance.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [reduceMotion]);

  return (
    <main className="case-studies-page" ref={pageRef}>
      <section className="case-studies-hero case-studies-wrap" aria-labelledby="case-studies-heading">
        <Link className="case-studies-breadcrumb" to="/">Home <span>/</span> Case Studies</Link>
        <p className="case-studies-eyebrow">OUR WORK</p>
        <h1 id="case-studies-heading">Case Studies</h1>
        <span className="case-studies-hero-rule" aria-hidden="true" />
        <p className="case-studies-subtitle">A look at how RadheKrishna Roadways supports transport needs across industries.</p>
      </section>

      {caseStudies.length > 1 && (
        <nav className="case-studies-chip-nav" aria-label="Jump to a case study">
          <div className="case-studies-chip-list">
            <a href="#case-studies-list">All</a>
            {caseStudies.map((study) => (
              <a href={`#case-study-${study.id}`} key={study.id}>{study.client || study.title}</a>
            ))}
          </div>
        </nav>
      )}

      <div className="case-studies-list case-studies-wrap" id="case-studies-list">
        {caseStudies.map((study, index) => (
          <div className="case-studies-entry" key={study.id}>
            <CaseStudyArticle study={study} index={index} reduceMotion={reduceMotion} />
            {index < caseStudies.length - 1 && <div className="case-studies-road-divider" aria-hidden="true"><span className="case-studies-road-truck"><Truck /></span></div>}
          </div>
        ))}
      </div>

      <section className="case-studies-cta case-studies-reveal" aria-label="Talk to our team about oversized cargo">
        <h2>Have oversized cargo to move? Talk to our team.</h2>
        <div className="case-studies-cta-actions">
          <Link className="btn-quote" to="/contact">Get a Quote</Link>
          <a className="case-studies-call-button" href={PHONE_TEL}>Call Us</a>
        </div>
      </section>
    </main>
  );
}
