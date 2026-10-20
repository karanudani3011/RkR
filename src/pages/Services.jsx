import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import freightForwardingImage from '../assets/freight-forwarding.png';
import breakbulkVideo from '../assets/5.mp4';
import clearanceVideo from '../assets/6.mp4';
import routeSurveyImage from '../assets/route-survey.png';
import warehousingImage from '../assets/warehousing.png';
import intercartingVideo from '../assets/9.mp4';
import renewableVideo from '../assets/10.mp4';
import './Services.css';

const serviceData = [
  {
    id: 'wind', title: 'Wind Energy Transport',
    description: 'Turbine blades, towers and nacelles are long, heavy and fragile. We plan the vehicle, the route and the escort before the first wheel turns.',
    points: ['Extendable blade trailers and tower carriers', 'Site-to-site movement with trained crew', 'Escort and clearance coordination'], photo: null,
    video: '/videos/services/wind.mp4', poster: '/videos/services/wind.jpg',
  },
  {
    id: 'multimodal', title: 'Multimodal Transport',
    description: 'One booking, several modes. Road, rail and sea legs are joined together so your cargo keeps moving without handover gaps.',
    points: ['Single point of contact end to end', 'Road, rail and sea connections', 'Live status at every transfer point'], photo: null,
    video: '/videos/services/multimodal.mp4', poster: '/videos/services/multimodal.jpg',
  },
  {
    id: 'freight', title: 'International Freight Forwarding',
    description: 'Shipping abroad means paperwork, carriers and deadlines. We coordinate the whole chain from pickup at your door to the destination port.',
    points: ['Import and export bookings', 'Documentation and cargo tracking', 'Door-to-port and door-to-door options'], photo: null,
    media: { type: 'image', src: freightForwardingImage, alt: 'Aircraft flying over a container port' },
  },
  {
    id: 'breakbulk', title: 'Breakbulk Chartering',
    description: 'Cargo that does not fit a container still needs a ship. We help you charter vessels for steel, machinery and other loose project cargo.',
    points: ['Vessel sourcing for non-containerised cargo', 'Port handling and stowage planning', 'Pickup and delivery linked to the voyage'], photo: null,
    media: { type: 'video', src: breakbulkVideo },
  },
  {
    id: 'customs', title: 'In-house Custom Clearance',
    description: 'Our own clearance team keeps your cargo from waiting at the port. Fewer middlemen means faster answers when something needs fixing.',
    points: ['Import and export documentation', 'Duty and tariff guidance', 'Quick resolution of clearance queries'], photo: null,
    media: { type: 'video', src: clearanceVideo },
  },
  {
    id: 'survey', title: 'Route Survey & Modification',
    description: 'Before an oversized load moves, we drive the route. Low bridges, tight turns and weak culverts are found early and planned around.',
    points: ['Pre-movement route inspection', 'Clearance and weight-limit checks', 'Temporary road or obstacle modification support'], photo: null,
    media: { type: 'image', src: routeSurveyImage, alt: 'Route survey planning with maps, hard hat and walkie-talkies at a construction site' },
  },
  {
    id: 'warehouse', title: 'Warehousing',
    description: 'Safe, organised storage close to your route. Hold stock between shipments and release it when your customer is ready.',
    points: ['Secure covered and open storage', 'Inward and outward stock records', 'Pick, pack and dispatch support'], photo: null,
    media: { type: 'image', src: warehousingImage, alt: 'Warehouse with pallet racking, conveyor belts and a forklift' },
  },
  {
    id: 'intercarting', title: 'Intercarting',
    description: 'Short moves inside ports, plants and yards. We shuttle cargo between storage, loading points and the main haul without delay.',
    points: ['Plant-to-port and yard shuttles', 'Flexible vehicles for short distances', 'Quick turnaround to keep lines moving'], photo: null,
    media: { type: 'video', src: intercartingVideo },
  },
  {
    id: 'renewable', title: 'Renewable Energy Logistics',
    description: 'Solar panels, wind equipment and storage systems are moving to sites across the country. We handle delivery with the care these loads need.',
    points: ['Solar module and inverter transport', 'Equipment delivery to remote project sites', 'Scheduled phased supply for large projects'], photo: null,
    media: { type: 'video', src: renewableVideo },
  },
];

const skyTones = {
  wind: ['#a9d8f3', '#eff8fd'],
  multimodal: ['#bad7ee', '#f4f8fb'], freight: ['#8bc1e9', '#e7f4fc'],
  breakbulk: ['#b5d4e8', '#eff6fa'], customs: ['#d2e2ec', '#f7f9fa'],
  survey: ['#f2d8b6', '#fff5e7'], warehouse: ['#cfe1ef', '#f5f8fa'],
  intercarting: ['#d2e1e7', '#f7f9fa'], renewable: ['#ffe3aa', '#fff8e6'],
};

function MediaBox({ title, media }) {
  const panelRef = useRef(null);
  const videoRef = useRef(null);
  const [isPortraitVideo, setIsPortraitVideo] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = (event) => setReducedMotion(event.matches);
    mediaQuery.addEventListener?.('change', updatePreference);
    return () => mediaQuery.removeEventListener?.('change', updatePreference);
  }, []);

  useEffect(() => {
    if (media.type !== 'video' || !panelRef.current || !videoRef.current) return undefined;

    const video = videoRef.current;
    video.muted = true;
    const updateVideoRatio = () => {
      if (!video.videoWidth || !video.videoHeight) return;
      panelRef.current?.style.setProperty('aspect-ratio', `${video.videoWidth} / ${video.videoHeight}`);
      setIsPortraitVideo(video.videoHeight > video.videoWidth);
    };
    video.addEventListener('loadedmetadata', updateVideoRatio);
    if (video.readyState >= 1) updateVideoRatio();
    if (reducedMotion) {
      video.pause();
      return () => video.removeEventListener('loadedmetadata', updateVideoRatio);
    }

    let isVisible = false;
    const tryPlay = () => {
      if (isVisible && !video.error) video.play().catch(() => {});
    };
    const checkVisibility = () => {
      const rect = panelRef.current?.getBoundingClientRect();
      if (!rect) return false;
      const visibleHeight = Math.max(0, Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0));
      const visibleWidth = Math.max(0, Math.min(rect.right, window.innerWidth) - Math.max(rect.left, 0));
      return visibleHeight * visibleWidth >= rect.width * rect.height * 0.25;
    };
    const syncPlayback = () => {
      isVisible = checkVisibility();
      if (isVisible) tryPlay();
      else video.pause();
    };
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      if (isVisible) tryPlay();
      else video.pause();
    }, { threshold: 0.25 });

    observer.observe(panelRef.current);
    video.addEventListener('loadeddata', tryPlay);
    video.addEventListener('canplay', tryPlay);
    window.addEventListener('scroll', syncPlayback, { passive: true });
    window.addEventListener('resize', syncPlayback);
    syncPlayback();
    return () => {
      observer.disconnect();
      video.removeEventListener('loadedmetadata', updateVideoRatio);
      video.removeEventListener('loadeddata', tryPlay);
      video.removeEventListener('canplay', tryPlay);
      window.removeEventListener('scroll', syncPlayback);
      window.removeEventListener('resize', syncPlayback);
      video.pause();
    };
  }, [media.type, media.src, reducedMotion]);

  return (
    <div
      ref={panelRef}
      className={`services-panel${media.type === 'video' ? ` services-panel-video${isPortraitVideo ? ' is-portrait-video' : ''}` : ' service-reveal'}`}
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

function SceneFeature({ id }) {
  switch (id) {
    case 'wind':
      return <g fill="none" stroke="#f8fbfc" strokeLinecap="round"><path d="M96 252V143m150 109V169" strokeWidth="4"/><g className="service-turbine-spin" style={{ transformOrigin: '96px 143px' }}><path d="M96 143V93m0 50 43 25m-43-25-43 25" strokeWidth="4" /></g><g className="service-turbine-spin slow" style={{ transformOrigin: '246px 169px' }}><path d="M246 169v-36m0 36 31 18m-31-18-31 18" strokeWidth="3" /></g></g>;
    case 'multimodal':
      return <g><rect x="25" y="224" width="48" height="26" fill="#cf5145"/><rect x="74" y="224" width="48" height="26" fill="#668b9d"/><rect x="123" y="224" width="48" height="26" fill="#d4a75d"/><rect x="49" y="198" width="48" height="26" fill="#7996a5"/><rect x="98" y="198" width="48" height="26" fill="#cf5145"/><path d="M207 250V145h105m0 0v34m-105-34-32 36" fill="none" stroke="#4f5d65" strokeWidth="6"/><path d="m302 179 18 10-18 10" fill="none" stroke="#4f5d65" strokeWidth="5"/></g>;
    case 'freight':
      return <g><path d="M22 219Q196 118 374 219" fill="none" stroke="#fff" strokeWidth="2" strokeDasharray="5 7" opacity=".8"/><g className="service-plane"><path d="m-12 78 52 12-52 12 8-12z" fill="#fff"/><path d="m7 90-13-17m13 17L-6 107" fill="none" stroke="#fff" strokeWidth="4"/></g><rect x="286" y="221" width="48" height="29" fill="#6b8da2"/><rect x="336" y="221" width="42" height="29" fill="#d26653"/></g>;
    case 'breakbulk':
      return <g><path d="M24 231h255l-22 24H53Z" fill="#394f5c"/><path d="M24 231h255" stroke="#d64b3e" strokeWidth="4"/><rect x="66" y="208" width="42" height="23" fill="#d9b363"/><rect x="114" y="214" width="34" height="17" fill="#d9dfe1"/><path d="M202 231V151h62m-4 0 19 75m-77-75-31 25" fill="none" stroke="#59666e" strokeWidth="5"/><path d="M0 258q25-7 50 0t50 0 50 0 50 0 50 0 50 0 50 0 50 0v18H0Z" fill="#79a8be" opacity=".72"/></g>;
    case 'customs':
      return <g><rect x="57" y="191" width="74" height="59" fill="#f1f4f5"/><rect x="50" y="183" width="88" height="10" fill="#d64b3e"/><rect x="73" y="204" width="30" height="27" fill="#91c6df"/><path d="M130 232h139" stroke="#fff" strokeWidth="7"/><path d="M158 232h22m20 0h22m20 0h22" stroke="#d64b3e" strokeWidth="6"/><rect x="260" y="225" width="8" height="25" fill="#52626c"/><path d="M269 225 359 196" fill="none" stroke="#d64b3e" strokeWidth="7" strokeLinecap="round"/><rect x="303" y="215" width="67" height="35" fill="#668b9d"/></g>;
    case 'survey':
      return <g><path d="M5 225h390v9H5Z" fill="#aebbc0"/><path d="M57 234v32m104-32v32m105-32v32m75-32v32" stroke="#7e9097" strokeWidth="10"/><path d="M57 225q52-55 104 0m0 0q52-55 105 0m0 0q38-42 75 0" fill="none" stroke="#899da5" strokeWidth="6"/><path d="M20 218h360" stroke="#e7ecee" strokeWidth="4"/></g>;
    case 'warehouse':
      return <g><rect x="35" y="185" width="210" height="67" fill="#e7ecee"/><path d="m29 185 111-30 111 30Z" fill="#aebfc7"/><path d="M50 203h45v49H50zm58 0h45v49h-45zm58 0h45v49h-45z" fill="#90a5ae"/><rect x="270" y="224" width="42" height="28" fill="#c69a62"/><rect x="314" y="224" width="42" height="28" fill="#d8b47b"/><rect x="292" y="196" width="42" height="28" fill="#c69a62"/></g>;
    case 'intercarting':
      return <g><rect x="25" y="222" width="52" height="28" fill="#6c8da0"/><rect x="79" y="222" width="52" height="28" fill="#d26653"/><rect x="25" y="194" width="52" height="28" fill="#d4dfe3"/><rect x="266" y="222" width="52" height="28" fill="#d7ad62"/><rect x="320" y="222" width="52" height="28" fill="#668b9d"/><path d="M151 211h87m-17-11 18 11-18 11" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/></g>;
    case 'renewable':
      return <g><g fill="#3b6483" stroke="#9db9ca" strokeWidth="2"><path d="m25 242 32-31h62l-32 31Z"/><path d="m133 242 32-31h62l-32 31Z"/><path d="m241 242 32-31h62l-32 31Z"/></g><path d="M42 242v11m108-11v11m108-11v11" stroke="#71838b" strokeWidth="4"/><path d="M25 252h280" stroke="#87989c" strokeWidth="3"/></g>;
    default: return null;
  }
}

function ServiceScene({ service, index }) {
  const mediaVideo = service.media?.type === 'video' ? service.media.src : null;
  const usesMediaBox = ['customs', 'survey', 'warehouse', 'intercarting', 'renewable'].includes(service.id);
  const [top, bottom] = skyTones[service.id];
  const gradientId = `service-sky-${service.id}`;

  if (usesMediaBox) {
    return <MediaBox title={service.title} media={service.media} />;
  }

  if (service.media?.type === 'image') {
    return (
      <div className="services-panel service-reveal">
        <img className="services-photo" src={service.media.src} alt={service.media.alt} loading="lazy" />
      </div>
    );
  }

  if (mediaVideo) {
    return <MediaBox title={service.title} media={service.media} />;
  }

  if (service.video) {
    return <MediaBox title={service.title} media={{ type: 'video', src: service.video, poster: service.poster }} />;
  }

  return (
    <div className="services-panel service-reveal">
      {service.photo ? <img className="services-photo" src={service.photo} alt={`${service.title} transport`} /> : (
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
        <defs><linearGradient id={`box-${service.id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" /><stop offset="1" stopColor="#d9dde3" /></linearGradient><linearGradient id={`cab-${service.id}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#19b3a1" /><stop offset="1" stopColor="#0c6159" /></linearGradient></defs>
        <ellipse cx="50" cy="45" rx="47" ry="3" fill="#000" opacity=".3" />
        <rect x="2" y="33" width="94" height="5" rx="2" fill="#2f353c" />
        <rect x="2" y="4" width="60" height="30" rx="2" fill={`url(#box-${service.id})`} stroke="#b9bec6" strokeWidth=".6" />
        <rect x="2" y="27" width="60" height="2.2" fill="#D61F10" />
        <g fontFamily="system-ui, sans-serif" fontWeight="800" textAnchor="middle"><rect x="16" y="8" width="9" height="9" fill="#D61F10" /><rect x="27" y="8" width="9" height="9" fill="#D61F10" /><rect x="38" y="8" width="9" height="9" fill="#D61F10" /><g fontSize="7" fill="#fff"><text x="20.5" y="15.2">R</text><text x="31.5" y="15.2">K</text><text x="42.5" y="15.2">R</text></g><text x="31.5" y="23.5" fontSize="4.6" fill="#222">RadheKrishna</text></g>
        <path d="M62 12h19l13 13v9H62z" fill={`url(#cab-${service.id})`} /><path d="M67 15h12l9 10H67z" fill="#cfe9f5" /><path d="m69 15 5 0-7 10h-2z" fill="#fff" opacity=".55" />
        <rect x="59.5" y="17" width="3" height="8" rx="1" fill="#1d1d1f" /><rect x="92" y="29" width="6" height="6" rx="1.5" fill="#50565d" /><rect x="92.5" y="24" width="4" height="3.5" rx="1" fill="#ffe58a" />
        {[15, 30, 80].map((cx) => <g className="services-wheel" key={cx}><circle cx={cx} cy="38" r="7.5" fill="#18181a" /><circle cx={cx} cy="38" r="3.6" fill="#a2a8af" /><circle cx={cx} cy="38" r="1.3" fill="#444" /></g>)}
      </svg>
    </div>
  );
}

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

export default function ServicesPage() {
  const pageRef = useRef(null);
  const chipsRef = useRef(null);
  const [activeService, setActiveService] = useState(serviceData[0]?.id || 'wind');

  useEffect(() => {
    // If URL has a hash or query for the removed service or any unknown service, fall back to first service
    const handleHashOrQuery = () => {
      const rawHash = window.location.hash.replace(/^#/, '');
      const urlParams = new URLSearchParams(window.location.search);
      const queryService = urlParams.get('service');
      const requested = rawHash || queryService;

      if (requested) {
        const match = serviceData.find((s) => s.id === requested);
        if (match) {
          setActiveService(match.id);
        } else {
          setActiveService(serviceData[0].id);
        }
      }
    };

    handleHashOrQuery();
    window.addEventListener('hashchange', handleHashOrQuery);
    return () => window.removeEventListener('hashchange', handleHashOrQuery);
  }, []);

  useEffect(() => {
    document.title = 'Services | RadheKrishna Roadways';
    const page = pageRef.current;
    if (!page) return undefined;

    const revealItems = [...page.querySelectorAll('.service-reveal')];
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) {
      revealItems.forEach((item) => item.classList.add('is-visible'));
      return undefined;
    }

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealItems.forEach((item) => revealObserver.observe(item));

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        setActiveService(entry.target.id);
        const chip = chipsRef.current?.querySelector(`[href="#${entry.target.id}"]`);
        chip?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    serviceData.forEach(({ id }) => {
      const section = page.querySelector(`#${id}`);
      if (section) sectionObserver.observe(section);
    });

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
    };
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
              className={activeService === service.id ? 'is-active' : ''}
              href={`#${service.id}`}
              key={service.id}
              onClick={() => setActiveService(service.id)}
            >
              {service.title}
            </a>
          ))}
        </div>
      </nav>

      <div className="services-wrap services-list">
        {serviceData.map((service, index) => <ServiceRow service={service} index={index} key={service.id} />)}
      </div>

      <section className="services-cta">
        <h2>Not sure which service fits your load?</h2>
        <Link className="services-quote" to="/contact">Talk to our team</Link>
      </section>
    </main>
  );
}
