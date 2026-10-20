import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';
import { assetUrls, originalMarkup } from '../components/originalMarkup.js';
import { services } from '../data/services.js';
import { steps } from '../data/steps.js';
import { useReveal } from '../hooks/useReveal.js';
import Hero from '../components/Hero.jsx';
import Fleet from '../components/Fleet.jsx';

function original(name) {
  return originalMarkup[name].replace(/__ASSET_(\d+)__/g, (_, i) => assetUrls[Number(i)]);
}

function Html({ name, className }) {
  const markup = original(name).replace(/\s+onsubmit="[^"]*"/gi, '');
  return <div className={className}>{parse(markup)}</div>;
}

function SvgDefs() { return <Html name="defs" />; }

function Stats() { return <Html name="stats" />; }

function ServiceCard({ service }) {
  return <div className="sc rv"><div className="ph"><img src={service.photo} alt={service.alt} /></div><div className="sb"><div className="ib">{service.icon}</div><h3>{service.title}</h3><p>{service.description}</p><a className="go" href="#quote"><span>Enquire</span>→</a></div></div>;
}

function Services() {
  return <section id="services"><div className="wrap"><div className="k">Our services</div><h2>Services built to keep you moving</h2><div className="g">{services.map((service) => <ServiceCard key={service.title} service={service} />)}</div><p className="home-services-page-link"><Link to="/services">Explore all services</Link></p></div></section>;
}

function HowItWorks() {
  const host = useRef(null);
  useEffect(() => {
    const root = host.current;
    const section = root?.querySelector('#how-it-works');
    const cards = [...(root?.querySelectorAll('.st') || [])];
    const bar = root?.querySelector('#pb');
    if (!section || !bar) return undefined;
    let timer;
    let index = 0;
    const reset = () => {
      clearTimeout(timer);
      cards.forEach((card) => card.classList.remove('on', 'cur'));
      bar.style.transition = 'none'; bar.style.width = '0'; void bar.offsetWidth; bar.style.transition = ''; index = 0;
      timer = setTimeout(next, 400);
    };
    const next = () => {
      if (index > 0) cards[index - 1].classList.remove('cur');
      if (index >= steps.length) { timer = setTimeout(reset, 3500); return; }
      cards[index].classList.add('on', 'cur'); bar.style.width = `${(index + 1) * 25}%`; index += 1;
      timer = setTimeout(next, 3800);
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { observer.disconnect(); reset(); }
    }, { threshold: 0.35 });
    observer.observe(section);
    return () => { observer.disconnect(); clearTimeout(timer); };
  }, []);
  return <div ref={host}><Html name="how" /></div>;
}

function Why() { return <Html name="why" />; }

function QuoteCta() {
  const host = useRef(null);
  useEffect(() => {
    const form = host.current?.querySelector('form');
    const prevent = (event) => event.preventDefault();
    form?.addEventListener('submit', prevent);
    return () => form?.removeEventListener('submit', prevent);
  }, []);
  return <div ref={host}><Html name="quote" /><p className="home-contact-page-link">Or <Link to="/contact">open the full contact page</Link></p></div>;
}

export default function Home() {
  useReveal();
  useEffect(() => { document.title = 'RadheKrishna Roadways – Trucks on Rent'; }, []);
  return <><SvgDefs /><Hero /><section id="about" className="empty-anchor" aria-label="About Us" /><Stats /><Services /><Fleet /><HowItWorks /><Why /><div id="contact" className="contact-anchor"><QuoteCta /></div></>;
}

