import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { PHONE_DISPLAY, PHONE_TEL } from '../constants/contact.js';
import './ContactBanner.css';

const TRUCK_DURATION = 5200;
const INITIAL_CARD_STATE = [
  { visible: false, clickable: false },
  { visible: false, clickable: false },
  { visible: false, clickable: false },
];

function CheckIcon() {
  return <svg viewBox="0 0 16 16" aria-hidden="true"><path d="m3 8 3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function ContactIcon({ type }) {
  if (type === 'phone') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6.6 3.5 9.4 7l-1.8 2a15 15 0 0 0 7.4 7.4l2-1.8 3.5 2.8-.8 3.1c-.2.7-.9 1.1-1.6 1C9.2 19.9 4.1 14.8 2.5 6c-.1-.7.3-1.4 1-1.6l3.1-.9Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>;
  if (type === 'whatsapp') return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.6Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /><path d="M9 8.3c.4-.5.8-.4 1.1.1l.8 1.3c.2.3.1.6-.2.9l-.5.5c.6 1.1 1.4 1.8 2.5 2.4l.5-.6c.2-.3.5-.4.8-.2l1.4.7c.5.3.6.7.2 1.1-.5.6-1.2.9-1.9.8-2.6-.4-5.4-3-5.8-5.6-.1-.6.4-1.1 1.1-1.4Z" fill="currentColor" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.8" /><path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" /></svg>;
}

const quickContacts = [
  { type: 'phone', label: 'Call Us', value: PHONE_DISPLAY, href: `tel:${PHONE_TEL}` },
  { type: 'whatsapp', label: 'WhatsApp', value: 'Chat with our team', href: `https://wa.me/${PHONE_TEL.slice(1)}`, external: true },
  { type: 'email', label: 'Email', value: 'info@yourdomain.com', href: 'mailto:info@yourdomain.com' },
];

export default function ContactBanner() {
  const trackRef = useRef(null);
  const truckRef = useRef(null);
  const cardRefs = useRef([]);
  const [cardState, setCardState] = useState(INITIAL_CARD_STATE);

  useEffect(() => {
    const track = trackRef.current;
    const truck = truckRef.current;
    const cards = cardRefs.current;
    if (!track || !truck || cards.some((card) => !card)) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frameId = 0;
    let startTime;
    const shown = [false, false, false];
    const clickable = [false, false, false];

    const setCardProgress = (card, index, progress) => {
      const clipped = Math.max(0, Math.min(1, progress));
      card.style.clipPath = `inset(0 ${(1 - clipped) * 100}% 0 0 round 16px)`;
      if (clipped > 0 && !shown[index]) {
        shown[index] = true;
        setCardState((current) => current.map((state, i) => i === index ? { ...state, visible: true } : state));
      }
      if (clipped >= 1 && !clickable[index]) {
        clickable[index] = true;
        setCardState((current) => current.map((state, i) => i === index ? { visible: true, clickable: true } : state));
      }
    };

    const showAll = () => {
      const endX = track.clientWidth;
      truck.style.transform = `translateX(${endX}px)`;
      cards.forEach((card) => {
        card.style.clipPath = 'inset(0 0 0 0 round 16px)';
      });
      setCardState(quickContacts.map(() => ({ visible: true, clickable: true })));
    };

    if (reduceMotion) {
      showAll();
      return undefined;
    }

    truck.style.transform = `translateX(-${truck.getBoundingClientRect().width}px)`;
    cards.forEach((card) => {
      card.style.clipPath = 'inset(0 100% 0 0 round 16px)';
    });

    const animate = (timestamp) => {
      if (startTime === undefined) startTime = timestamp;
      const progress = Math.min(1, (timestamp - startTime) / TRUCK_DURATION);
      const truckWidth = truck.getBoundingClientRect().width;
      const trackWidth = track.clientWidth;
      const truckX = -truckWidth + progress * (trackWidth + truckWidth);
      truck.style.transform = `translateX(${truckX}px)`;

      const isMobile = window.innerWidth <= 720;
      cards.forEach((card, index) => {
        if (isMobile) {
          setCardProgress(card, index, progress * cards.length - index);
          return;
        }
        const cardLeft = card.getBoundingClientRect().left - track.getBoundingClientRect().left;
        const revealWidth = truckX + truckWidth - cardLeft;
        setCardProgress(card, index, revealWidth / card.getBoundingClientRect().width);
      });

      if (progress < 1) frameId = window.requestAnimationFrame(animate);
      else showAll();
    };

    frameId = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frameId);
  }, []);

  return (
    <section className="contact-banner-block" aria-label="Contact RadheKrishna Roadways">
      <div className="contact-hero-banner">
        <div className="contact-banner-content">
          <p className="contact-banner-breadcrumb"><Link to="/">Home</Link><span>/</span><span aria-current="page">Contact Us</span></p>
          <p className="contact-banner-eyebrow"><span />WE’RE ALWAYS ON THE ROAD</p>
          <h1>Let's move your cargo.</h1>
          <p className="contact-banner-subtitle">Tell us your load and route. We'll call you back with the best rate.</p>
          <div className="contact-banner-chips"><span><CheckIcon />24x7 Support</span><span><CheckIcon />Pan-India Routes</span></div>
        </div>
      </div>

      <section className="contact-quick-cards-section" aria-label="Quick contact options">
        <div className="contact-quick-cards-watermark" aria-hidden="true">RKR</div>
        <div className="contact-journey-track" ref={trackRef}>
          <div className="contact-journey-stop contact-journey-stop-call"><i /><span>Call</span></div>
          <div className="contact-journey-stop contact-journey-stop-whatsapp"><i /><span>WhatsApp</span></div>
          <div className="contact-journey-stop contact-journey-stop-email"><i /><span>Email</span></div>
          <div className="contact-journey-road" aria-hidden="true" />
          <svg className="contact-journey-truck" viewBox="0 0 64 36" aria-label="Animated delivery truck" ref={truckRef}>
            <rect x="0" y="4" width="38" height="22" rx="3" fill="#2b3a55" stroke="#14203a" strokeWidth="2" />
            <path d="M38 10h14l8 9v7H38z" fill="#f5a300" />
            <path d="M43 13h8l5 6H43z" fill="#bfe3f7" />
            <circle cx="12" cy="29" r="5" fill="#222" /><circle cx="12" cy="29" r="2" fill="#bbb" />
            <circle cx="48" cy="29" r="5" fill="#222" /><circle cx="48" cy="29" r="2" fill="#bbb" />
          </svg>
        </div>
        <div className="contact-quick-cards">
          {quickContacts.map((item, index) => (
            <a
              className={`contact-quick-card${cardState[index].visible ? ' is-revealed' : ''}${cardState[index].clickable ? ' is-clickable' : ''}`}
              href={item.href}
              key={item.type}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noreferrer' : undefined}
              aria-hidden={!cardState[index].visible}
              tabIndex={cardState[index].clickable ? 0 : -1}
              ref={(element) => { cardRefs.current[index] = element; }}
            >
              <span className="contact-quick-icon"><ContactIcon type={item.type} /></span>
              <span className="contact-quick-copy"><b>{item.label}</b><span>{item.value}</span></span>
            </a>
          ))}
        </div>
      </section>
    </section>
  );
}
