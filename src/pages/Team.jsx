import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { founder, members } from '../data/team.js';
import { PHONE_TEL } from '../constants/contact.js';
import './Team.css';

function Avatar({ person, className = '' }) {
  return (
    <div className={`team-avatar ${className}`} aria-label={`${person.name} portrait`}>
      {person.photo
        ? <img src={person.photo} alt={`${person.name}`} />
        : <span aria-hidden="true">{person.initials}</span>}
    </div>
  );
}

function MemberCard({ member, index, cardRef, visible }) {
  return (
    <article
      ref={cardRef}
      className={`team-card${visible ? ' is-visible' : ''}`}
      style={{ '--team-stagger': `${index * 80}ms` }}
    >
      <span className="team-card-number" aria-hidden="true">{member.id}</span>
      <Avatar person={member} className="team-avatar-small" />
      <h3>{member.name}</h3>
      <p className="team-role">{member.role}</p>
      <p className="team-member-bio">{member.bio}</p>
      <div className="team-focus">
        <h4>Focus</h4>
        <ul aria-label={`${member.name} focus areas`}>
          {member.focus.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </article>
  );
}

export default function TeamPage() {
  const cardRefs = useRef([]);
  const [visibleCards, setVisibleCards] = useState(() => new Set());

  useEffect(() => {
    document.title = 'Team | RadheKrishna Roadways';
    const description = 'Meet the people behind RadheKrishna Roadways: a family-led team bringing experience, planning and commitment to every delivery.';
    let meta = document.querySelector('meta[name="description"]');
    const createdMeta = !meta;
    if (!meta) {
      meta = document.createElement('meta');
      meta.name = 'description';
      document.head.appendChild(meta);
    }
    const previousDescription = meta.content;
    meta.content = description;
    return () => {
      if (createdMeta) meta.remove();
      else meta.content = previousDescription;
    };
  }, []);

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || !('IntersectionObserver' in window)) {
      setVisibleCards(new Set(members.map((_, index) => index)));
      return undefined;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const index = Number(entry.target.dataset.memberIndex);
        setVisibleCards((current) => new Set(current).add(index));
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -36px 0px' });
    cardRefs.current.forEach((card) => card && observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="team-page">
      <section className="team-hero" aria-labelledby="team-title">
        <div className="team-container">
          <Link className="team-breadcrumb" to="/">Home <span>/</span> Team</Link>
          <p className="team-eyebrow">THE PEOPLE BEHIND THE ROAD</p>
          <h1 id="team-title">Meet the team <span>driving</span> your cargo.</h1>
          <p className="team-hero-subtitle">Experience, planning and commitment behind every delivery.</p>
          <div className="team-hero-rule" aria-hidden="true" />
        </div>
      </section>

      <section className="team-founder-section" aria-labelledby="founder-name">
        <div className="team-container">
          <article className="team-founder-card">
            <div className="team-founder-visual">
              <div className="team-founder-frame" aria-hidden="true" />
              <Avatar person={founder} className="team-avatar-founder" />
              <span className="team-founder-badge">FOUNDER</span>
            </div>
            <div className="team-founder-copy">
              <p className="team-eyebrow">FOUNDER</p>
              <h2 id="founder-name">{founder.name}</h2>
              <p className="team-founder-role">{founder.role} <span aria-hidden="true">|</span> {founder.company}</p>
              <span className="team-quote-mark" aria-hidden="true">“</span>
              <p className="team-founder-bio">{founder.bio}</p>
            </div>
          </article>
          <div className="team-road" aria-hidden="true"><span /></div>
        </div>
      </section>

      <section className="team-members-section" aria-labelledby="team-generation-title">
        <div className="team-container">
          <div className="team-section-heading">
            <h2 id="team-generation-title">The Next Generation</h2>
            <div className="team-heading-rule" aria-hidden="true" />
            <p>Carrying the vision forward.</p>
          </div>
          <div className="team-grid" aria-label="Radhekrishna Roadways team members">
            {members.map((member, index) => (
              <MemberCard
                key={member.id}
                member={member}
                index={index}
                cardRef={(node) => {
                  cardRefs.current[index] = node;
                  if (node) node.dataset.memberIndex = String(index);
                }}
                visible={visibleCards.has(index)}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="team-cta-section" aria-label="Contact our team">
        <div className="team-container">
          <div className="team-cta">
            <h2>Have cargo to move? Talk to our team.</h2>
            <div className="team-cta-actions">
              <Link className="btn-quote" to="/contact">Get a Quote</Link>
              <a className="team-call-button" href={PHONE_TEL}>Call Us</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
