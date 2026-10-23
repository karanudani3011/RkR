import { useEffect, useRef, useState } from 'react';
import { Eye, Flag } from 'lucide-react';
import StatCard from '../components/StatCard.jsx';
import JourneyTimeline from '../components/JourneyTimeline.jsx';
import './WhoWeAre.css';

const visionMission = [
  {
    title: 'Vision',
    label: 'OUR VISION',
    icon: Eye,
    content: 'To become a trusted Pan-India leader in Heavy and Over-Dimensional Cargo (ODC) Logistics by setting benchmarks in safety, reliability, and operational excellence, while connecting industries and driving progress through seamless transportation solutions.',
    chips: ['Safety', 'Reliability', 'Operational Excellence'],
  },
  {
    title: 'Mission',
    label: 'OUR MISSION',
    icon: Flag,
    content: 'To deliver the right vehicle, the right route, and the right execution for every shipment through expert planning, safe cargo handling, efficient route optimization, and timely delivery ensuring reliability, transparency, and customer satisfaction at every step.',
    chips: ['Right Vehicle', 'Right Route', 'Right Execution'],
  },
];

function VisionMissionCard({ item }) {
  const Icon = item.icon;
  return (
    <article
      className={`vm-card vm-card--${item.title.toLowerCase()}`}
    >
      <div className="vm-content">
        <span className="vm-icon"><Icon size={27} strokeWidth={2.1} aria-hidden="true" /></span>
        <p className="vm-eyebrow">{item.label}</p>
        <h3 className="vm-title">{item.title}</h3>
        <span className="vm-bar" aria-hidden="true" />
        <p className="vm-copy">{item.content}</p>
        <ul className="vm-chips" aria-label={`${item.title} principles`}>
          {item.chips.map((chip) => <li key={chip}>{chip}</li>)}
        </ul>
      </div>
      <span className="vm-number" aria-hidden="true">{item.title === 'Vision' ? '01' : '02'}</span>
      {item.title === 'Mission' && <span className="vm-watermark" aria-hidden="true">RKR</span>}
      <span className="vm-road" aria-hidden="true" />
    </article>
  );
}

function VisionMissionCards() {
  const sectionRef = useRef(null);
  const [motionState, setMotionState] = useState('waiting');

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (typeof IntersectionObserver === 'undefined' || reducedMotion) {
      setMotionState('ready');
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setMotionState('visible');
        observer.disconnect();
      }
    }, { threshold: 0.2 });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <div className={`who-value-grid vm-section${motionState === 'waiting' ? ' vm-section--waiting' : ''}${motionState === 'visible' ? ' vm-section--visible' : ''}`} ref={sectionRef}>
      {visionMission.map((item) => <VisionMissionCard key={item.title} item={item} />)}
    </div>
  );
}

export default function WhoWeArePage() {
  useEffect(() => { document.title = 'Who We Are? | RadheKrishna Roadways'; }, []);

  return (
    <main className="who-page">
      <section className="who-hero">
        <div className="who-wrap">
          <p className="who-eyebrow">ABOUT US</p>
          <h1>Who <span>We Are?</span></h1>
          <p className="who-subline">From a family legacy to a growing logistics network.</p>
          <div className="who-rule" />
        </div>
      </section>

      <section className="who-intro who-wrap" aria-label="Company Introduction">
        <div className="who-intro-copy">
          <p>Founded in 2012 by Rajesh Patel, with a vision to build a trusted transportation business. We started with just 2 Eicher vehicles — 19 FT &amp; 22 FT — serving Regular Transport requirements.</p>
          <p>Over the years, we expanded our fleet and grew with the changing needs of the industry. Today, we have evolved into Heavy &amp; ODC Transportation, supported by our own fleet and a strong market network.</p>
          <p>From a family legacy to a growing logistics network — we continue to move forward with trust, responsibility and ambition.</p>
        </div>
        <div className="who-stats">
          <StatCard end={12} suffix="K" label="Projects Completed" index={0} />
          <StatCard end={32} label="ODC Vehicles" index={1} />
          <StatCard end={300} suffix="+" label="Attached Vehicle Owners" index={2} />
        </div>
      </section>

      <section className="who-values">
        <div className="who-wrap">
          <div className="who-section-heading"><h2>Vision &amp; Mission</h2></div>
          <VisionMissionCards />
        </div>
      </section>

      <JourneyTimeline />

      <section className="who-network">
        <div className="who-wrap">
          <p className="who-eyebrow">And where does RKR stand?</p>
          <h2>Asset + Network</h2>
          <p className="who-network-copy">We have our own specialised fleet for regular &amp; ODC requirements, while our industry network allows us to arrange additional suitable vehicles when the requirement demands it.</p>
          <blockquote>We don't depend on only trucks we own. We depend on the capability we can deliver.</blockquote>
        </div>
      </section>
    </main>
  );
}
