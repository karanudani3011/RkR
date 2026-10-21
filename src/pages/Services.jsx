import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/services.js';
import ServiceMedia from '../components/ServiceMedia.jsx';
import './Services.css';

const serviceData = services;

function ServiceRow({ service, index }) {
  return (
    <section
      className={`services-row${index % 2 === 1 ? ' is-reversed' : ''}`}
      id={service.slug}
    >
      <ServiceMedia
        type={service.type || (service.video ? 'video' : 'image')}
        src={service.src || service.video || service.image}
        poster={service.poster || service.image}
        alt={service.alt}
        orientation={service.orientation}
        objectPosition={service.objectPosition}
        className="service-reveal"
      />
      <div className="services-copy service-reveal">
        <span className="services-number">{String(index + 1).padStart(2, '0')}</span>
        <h2>{service.title}</h2>
        <p>{service.description}</p>
        {service.points?.length > 0 && (
          <ul>{service.points.map((point) => <li key={point}>{point}</li>)}</ul>
        )}
        <Link className="services-quote btn-quote" to="/contact">Get a quote</Link>
      </div>
    </section>
  );
}

export default function ServicesPage() {
  const pageRef = useRef(null);
  const chipsRef = useRef(null);
  const [activeService, setActiveService] = useState(serviceData[0]?.slug || 'wind-energy');

  useEffect(() => {
    const handleHashOrQuery = () => {
      const rawHash = window.location.hash.replace(/^#/, '');
      const urlParams = new URLSearchParams(window.location.search);
      const requested = rawHash || urlParams.get('service');
      if (!requested) return;
      const match = serviceData.find((service) => service.slug === requested || service.id === requested);
      setActiveService(match ? match.slug : serviceData[0].slug);
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
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealItems.forEach((element) => element.classList.add('is-visible'));
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
    revealItems.forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        setActiveService(entry.target.id);
        chipsRef.current
          ?.querySelector(`[href="#${entry.target.id}"]`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      });
    }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
    serviceData.forEach(({ slug }) => {
      const section = page.querySelector(`#${slug}`);
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
              key={service.id}
              className={activeService === service.slug ? 'is-active' : ''}
              href={`#${service.slug}`}
              onClick={() => setActiveService(service.slug)}
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
        <Link className="services-quote btn-quote" to="/contact">Talk to our team</Link>
      </section>
    </main>
  );
}
