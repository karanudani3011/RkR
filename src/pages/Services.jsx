import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import routeSurveyImage from '../assets/route-survey.png';
import renewableVideo from '../assets/10.mp4';
import './Services.css';

const LOWBED_VIDEO   = '/videos/lowbed-trailer.mp4';
const LOWBED_POSTER  = '/videos/lowbed-trailer-poster.jpg';

const serviceData = [
  {
    id: 'wind', title: 'Wind Energy Transport',
    description: 'Turbine blades, towers and nacelles are long, heavy and fragile. We plan the vehicle, the route and the escort before the first wheel turns.',
    points: ['Extendable blade trailers and tower carriers', 'Site-to-site movement with trained crew', 'Escort and clearance coordination'], photo: null,
    video: '/videos/services/wind.mp4', poster: '/videos/services/wind.jpg',
  },
  {
    id: 'heavy', title: 'Heavy & Specialised Transport',
    description: 'Oversized machinery and project cargo need more than a bigger truck. We match the right trailer to the weight, height and width of your load.',
    points: [
      'Low-bed, multi-axle and hydraulic trailers',
      'Load securing and lashing plans',
      'Permits and route approvals handled for you',
      'Machinery loading and unloading support',
    ], photo: null,
    video: LOWBED_VIDEO, poster: LOWBED_POSTER,
  },
  {
    id: 'survey', title: 'Route Survey & Modification',
    description: 'Before an oversized load moves, we drive the route. Low bridges, tight turns and weak culverts are found early and planned around.',
    points: ['Pre-movement route inspection', 'Clearance and weight-limit checks', 'Temporary road or obstacle modification support'], photo: null,
    media: { type: 'image', src: routeSurveyImage, alt: 'Route survey planning with maps, hard hat and walkie-talkies at a construction site' },
  },
  {
    id: 'renewable', title: 'Renewable Energy Logistics',
    description: 'Solar panels, wind equipment and storage systems are moving to sites across the country. We handle delivery with the care these loads need.',
    points: ['Solar module and inverter transport', 'Equipment delivery to remote project sites', 'Scheduled phased supply for large projects'], photo: null,
    media: { type: 'video', src: renewableVideo },
  },
];

const skyTones = {
  wind: ['#a9d8f3', '#eff8fd'], heavy: ['#c8d7df', '#f4f7f8'],
  survey: ['#f2d8b6', '#fff5e7'], renewable: ['#ffe3aa', '#fff8e6'],
};

/* ─── Lowbed video panel (heavy service) ───────────────────────────────── */
function LowbedVideoPanel({ title }) {
  const panelRef  = useRef(null);
  const videoRef  = useRef(null);
  const [failed, setFailed] = useState(false);
  const reducedMotion = useRef(
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false,
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return undefined;

    // Ensure muted (required for autoplay on Chrome/mobile)
    video.muted = true;
    video.playsInline = true;

    if (reducedMotion.current) return undefined;

    let visible = false;

    const tryPlay = () => {
      if (!visible || video.error) return;
      video.play().catch(() => {
        // Autoplay blocked – retry on next user interaction
        const resume = () => {
          video.play().catch(() => {});
          document.removeEventListener('click', resume);
          document.removeEventListener('touchstart', resume);
        };
        document.addEventListener('click', resume, { once: true });
        document.addEventListener('touchstart', resume, { once: true });
      });
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) tryPlay();
        else video.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(panelRef.current);

    // Also play as soon as enough data is ready
    video.addEventListener('canplay', tryPlay);
    video.addEventListener('loadeddata', tryPlay);

    // Pause/resume on tab visibility
    const onVisibilityChange = () => {
      if (document.hidden) video.pause();
      else if (visible) tryPlay();
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    return () => {
      io.disconnect();
      video.removeEventListener('canplay', tryPlay);
      video.removeEventListener('loadeddata', tryPlay);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      video.pause();
    };
  }, []);

  return (
    <div ref={panelRef} className="services-panel services-panel-lowbed service-reveal">
      {!failed ? (
        <video
          ref={videoRef}
          className="services-video-lowbed"
          autoPlay={!reducedMotion.current}
          muted
          loop
          playsInline
          preload="metadata"
          poster={LOWBED_POSTER}
          aria-label={`${title} video`}
          onError={() => setFailed(true)}
        >
          <source src={LOWBED_VIDEO} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        /* Fallback: show poster image when video fails to load */
        <img
          className="services-photo"
          src={LOWBED_POSTER}
          alt="Low-bed trailer transporting heavy machinery"
          loading="lazy"
        />
      )}
    </div>
  );
}

/* ─── Generic media box (other video services) ──────────────────────────── */
function MediaBox({ title, media }) {
  const panelRef = useRef(null);
  const videoRef = useRef(null);
  const [isPortraitVideo, setIsPortraitVideo] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(
    () => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  useEffect(() => {
    if (media.type !== 'video' || !panelRef.current || !videoRef.current) return undefined;

    const video = videoRef.current;
    video.muted = true;

    const updateRatio = () => {
      if (!video.videoWidth || !video.videoHeight) return;
      panelRef.current?.style.setProperty('aspect-ratio', `${video.videoWidth} / ${video.videoHeight}`);
      setIsPortraitVideo(video.videoHeight > video.videoWidth);
    };
    video.addEventListener('loadedmetadata', updateRatio);
    if (video.readyState >= 1) updateRatio();

    if (reducedMotion) {
      video.pause();
      return () => video.removeEventListener('loadedmetadata', updateRatio);
    }

    let isVisible = false;
    const tryPlay = () => { if (isVisible && !video.error) video.play().catch(() => {}); };
    const checkRect = () => {
      const r = panelRef.current?.getBoundingClientRect();
      if (!r) return false;
      const h = Math.max(0, Math.min(r.bottom, window.innerHeight) - Math.max(r.top, 0));
      const w = Math.max(0, Math.min(r.right, window.innerWidth) - Math.max(r.left, 0));
      return h * w >= r.width * r.height * 0.25;
    };
    const sync = () => { isVisible = checkRect(); if (isVisible) tryPlay(); else video.pause(); };

    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      if (isVisible) tryPlay(); else video.pause();
    }, { threshold: 0.25 });

    io.observe(panelRef.current);
    video.addEventListener('loadeddata', tryPlay);
    video.addEventListener('canplay', tryPlay);
    window.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();

    return () => {
      io.disconnect();
      video.removeEventListener('loadedmetadata', updateRatio);
      video.removeEventListener('loadeddata', tryPlay);
      video.removeEventListener('canplay', tryPlay);
      window.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
      video.pause();
    };
  }, [media.type, media.src, reducedMotion]);

  return (
    <div
      ref={panelRef}
      className={`services-panel${media.type === 'video'
        ? ` services-panel-video${isPortraitVideo ? ' is-portrait-video' : ''}`
        : ' service-reveal'}`}
      style={media.type === 'video' ? { aspectRatio: '16 / 9' } : undefined}
    >
      {media.type === 'image' ? (
        <img className="services-photo" src={media.src} alt={media.alt} loading="lazy" decoding="async" />
      ) : (
        <video
          ref={videoRef}
          className="services-video"
          autoPlay={!reducedMotion}
          muted
          loop
          playsInline
          preload="auto"
          poster={media.poster}
          aria-label={`${title} video`}
          onError={() => setVideoFailed(true)}
        >
          <source src={media.src} type="video/mp4" />
        </video>
      )}
      {media.type === 'video' && videoFailed && (
        media.poster
          ? <img className="services-video-fallback" src={media.poster} alt={`${title} video preview`} />
          : <div className="services-video-fallback services-video-fallback-label">{title}</div>
      )}
    </div>
  );
}

/* ─── SVG scene decoration per service ──────────────────────────────────── */
function SceneFeature({ id }) {
  switch (id) {
    case 'wind':
      return <g fill="none" stroke="#f8fbfc" strokeLinecap="round"><path d="M96 252V143m150 109V169" strokeWidth="4"/><g className="service-turbine-spin" style={{ transformOrigin: '96px 143px' }}><path d="M96 143V93m0 50 43 25m-43-25-43 25" strokeWidth="4" /></g><g className="service-turbine-spin slow" style={{ transformOrigin: '246px 169px' }}><path d="M246 169v-36m0 36 31 18m-31-18-31 18" strokeWidth="3" /></g></g>;
    case 'survey':
      return <g><path d="M5 225h390v9H5Z" fill="#aebbc0"/><path d="M57 234v32m104-32v32m105-32v32m75-32v32" stroke="#7e9097" strokeWidth="10"/><path d="M57 225q52-55 104 0m0 0q52-55 105 0m0 0q38-42 75 0" fill="none" stroke="#899da5" strokeWidth="6"/><path d="M20 218h360" stroke="#e7ecee" strokeWidth="4"/></g>;
    case 'renewable':
      return <g><g fill="#3b6483" stroke="#9db9ca" strokeWidth="2"><path d="m25 242 32-31h62l-32 31Z"/><path d="m133 242 32-31h62l-32 31Z"/><path d="m241 242 32-31h62l-32 31Z"/></g><path d="M42 242v11m108-11v11m108-11v11" stroke="#71838b" strokeWidth="4"/><path d="M25 252h280" stroke="#87989c" strokeWidth="3"/></g>;
    default: return null;
  }
}

/* ─── Per-service visual panel ───────────────────────────────────────────── */
function ServiceScene({ service, index }) {
  // Heavy service always gets the dedicated lowbed video panel
  if (service.id === 'heavy') {
    return <LowbedVideoPanel title={service.title} />;
  }

  const mediaVideo = service.media?.type === 'video' ? service.media.src : null;
  const usesMediaBox = ['renewable'].includes(service.id);
  const [top, bottom] = skyTones[service.id] ?? ['#a9d8f3', '#eff8fd'];
  const gradientId = `service-sky-${service.id}`;

  if (usesMediaBox) return <MediaBox title={service.title} media={service.media} />;

  if (service.media?.type === 'image') {
    return (
      <div className="services-panel service-reveal">
        <img className="services-photo" src={service.media.src} alt={service.media.alt} loading="lazy" />
      </div>
    );
  }

  if (mediaVideo) return <MediaBox title={service.title} media={service.media} />;

  if (service.video) {
    return <MediaBox title={service.title} media={{ type: 'video', src: service.video, poster: service.poster }} />;
  }

  return (
    <div className="services-panel service-reveal">
      {service.photo ? (
        <img className="services-photo" src={service.photo} alt={`${service.title} transport`} />
      ) : (
        <svg className="services-scene" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs><linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={top} /><stop offset="1" stopColor={bottom} /></linearGradient></defs>
          <rect width="400" height="300" fill={`url(#${gradientId})`} />
          <g className="service-sun-rays" style={{ transformOrigin: '335px 58px' }} stroke="#fff4cf" strokeWidth="2" opacity=".55"><path d="M335 29v-8m0 74v-8m29-29h8m-74 0h8m49-20 6-6m-53 52 6-6m41 0 6 6m-53-52 6 6" /></g>
          <circle cx="335" cy="58" r="21" fill="#fff3ce" opacity=".92" />
          <g className="service-cloud"><ellipse cx="64" cy="66" rx="35" ry="11" fill="#fff" opacity=".78" /><ellipse cx="86" cy="60" rx="22" ry="12" fill="#fff" opacity=".83" /><ellipse cx="48" cy="60" rx="16" ry="9" fill="#fff" opacity=".75" /></g>
          <g className="service-cloud service-cloud-two"><ellipse cx="226" cy="102" rx="31" ry="9" fill="#fff" opacity=".58" /><ellipse cx="246" cy="97" rx="20" ry="10" fill="#fff" opacity=".64" /></g>
          <path d="M0 236q64-54 128-12t128-6 144 7v75H0Z" fill="#bdcfc3" />
          <path d="M0 256q90-32 184-4t216-7v55H0Z" fill="#8eaa96" />
          <SceneFeature id={service.id} />
        </svg>
      )}
      <div className="services-road" aria-hidden="true" />
      <svg className="services-truck" viewBox="0 0 100 48" aria-hidden="true" style={{ '--truck-delay': `${-(index * 1.1)}s` }}>
        <defs>
          <linearGradient id={`box-${service.id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#d9dde3" /></linearGradient>
          <linearGradient id={`cab-${service.id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#19b3a1" /><stop offset="1" stopColor="#0c6159" /></linearGradient>
        </defs>
        <ellipse cx="50" cy="45" rx="47" ry="3" fill="#000" opacity=".3" />
        <rect x="2" y="33" width="94" height="5" rx="2" fill="#2f353c" />
        <rect x="2" y="4" width="60" height="30" rx="2" fill={`url(#box-${service.id})`} stroke="#b9bec6" strokeWidth=".6" />
        <rect x="2" y="27" width="60" height="2.2" fill="#D61F10" />
        <g fontFamily="system-ui, sans-serif" fontWeight="800" textAnchor="middle">
          <rect x="16" y="8" width="9" height="9" fill="#D61F10" /><rect x="27" y="8" width="9" height="9" fill="#D61F10" /><rect x="38" y="8" width="9" height="9" fill="#D61F10" />
          <g fontSize="7" fill="#fff"><text x="20.5" y="15.2">R</text><text x="31.5" y="15.2">K</text><text x="42.5" y="15.2">R</text></g>
          <text x="31.5" y="23.5" fontSize="4.6" fill="#222">RadheKrishna</text>
        </g>
        <path d="M62 12h19l13 13v9H62z" fill={`url(#cab-${service.id})`} /><path d="M67 15h12l9 10H67z" fill="#cfe9f5" /><path d="m69 15 5 0-7 10h-2z" fill="#fff" opacity=".55" />
        <rect x="59.5" y="17" width="3" height="8" rx="1" fill="#1d1d1f" /><rect x="92" y="29" width="6" height="6" rx="1.5" fill="#50565d" /><rect x="92.5" y="24" width="4" height="3.5" rx="1" fill="#ffe58a" />
        {[15, 30, 80].map((cx) => (
          <g className="services-wheel" key={cx}>
            <circle cx={cx} cy="38" r="7.5" fill="#18181a" />
            <circle cx={cx} cy="38" r="3.6" fill="#a2a8af" />
            <circle cx={cx} cy="38" r="1.3" fill="#444" />
          </g>
        ))}
      </svg>
    </div>
  );
}

/* ─── One service row ────────────────────────────────────────────────────── */
function ServiceRow({ service, index }) {
  return (
    <section className={`services-row${index % 2 === 1 ? ' is-reversed' : ''}`} id={service.id} key={service.id}>
      <ServiceScene service={service} index={index} />
      <div className="services-copy service-reveal">
        <span className="services-number">{String(index + 1).padStart(2, '0')}</span>
        <h2>{service.title}</h2>
        <p>{service.description}</p>
        <ul>{service.points.map((point) => <li key={point}>{point}</li>)}</ul>
        <Link className="services-quote" to="/contact">Get a quote</Link>
      </div>
    </section>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function ServicesPage() {
  const pageRef   = useRef(null);
  const chipsRef  = useRef(null);
  const [activeService, setActiveService] = useState(serviceData[0]?.id || 'wind');

  useEffect(() => {
    const handleHashOrQuery = () => {
      const rawHash     = window.location.hash.replace(/^#/, '');
      const urlParams   = new URLSearchParams(window.location.search);
      const requested   = rawHash || urlParams.get('service');
      if (!requested) return;
      const match = serviceData.find((s) => s.id === requested);
      setActiveService(match ? match.id : serviceData[0].id);
    };
    handleHashOrQuery();
    window.addEventListener('hashchange', handleHashOrQuery);
    return () => window.removeEventListener('hashchange', handleHashOrQuery);
  }, []);

  useEffect(() => {
    document.title = 'Services | RadheKrishna Roadways';
    const page = pageRef.current;
    if (!page) return undefined;

    const revealItems   = [...page.querySelectorAll('.service-reveal')];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      revealItems.forEach((el) => el.classList.add('is-visible'));
      return undefined;
    }

    const revealIo = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); obs.unobserve(entry.target); }
      });
    }, { threshold: 0.15 });
    revealItems.forEach((el) => revealIo.observe(el));

    const sectionIo = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        setActiveService(entry.target.id);
        chipsRef.current?.querySelector(`[href="#${entry.target.id}"]`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    serviceData.forEach(({ id }) => {
      const el = page.querySelector(`#${id}`);
      if (el) sectionIo.observe(el);
    });

    return () => { revealIo.disconnect(); sectionIo.disconnect(); };
  }, []);

  return (
    <main className="services-page" ref={pageRef}>
      <section className="services-hero">
        <div className="services-wrap">
          <Link className="services-breadcrumb" to="/">Home <span>/</span> Services</Link>
          <h1>Every kind of cargo. One road partner.</h1>
          <p>From wind turbine blades to everyday freight, RadheKrishna Roadways moves it safely across India.</p>
          <div className="services-hero-rule" />
        </div>
      </section>

      <nav className="services-chip-nav" aria-label="Jump to a service">
        <div className="services-chip-list" ref={chipsRef}>
          {serviceData.map((service) => (
            <a
              key={service.id}
              className={activeService === service.id ? 'is-active' : ''}
              href={`#${service.id}`}
              onClick={() => setActiveService(service.id)}
            >
              {service.title}
            </a>
          ))}
        </div>
      </nav>

      <div className="services-wrap services-list">
        {serviceData.map((service, index) => (
          <ServiceRow service={service} index={index} key={service.id} />
        ))}
      </div>

      <section className="services-cta">
        <h2>Not sure which service fits your load?</h2>
        <Link className="services-quote" to="/contact">Talk to our team</Link>
      </section>
    </main>
  );
}
