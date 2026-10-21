import { useEffect } from 'react';
import BackgroundVideo from '../components/BackgroundVideo.jsx';
import './SafetyPage.css';

const images = import.meta.glob('../assets/images/*', { eager: true, query: '?url', import: 'default' });
const imageFor = (name) => images[`../assets/images/${name}`];

const pillars = [
  {
    id: 'plan', title: 'We plan for safety', image: 'safety-risk.jpg', alt: 'Worker in hard hat and hi-vis vest securing a container lock', position: '30% center',
    lead: 'Every movement begins before the vehicle starts. We run detailed route surveys, road and bridge assessments, permit checks and operational risk planning, so each trip is planned with clarity and control.',
    checks: ['Route survey and validation', 'Alternate route planning', 'Road and bridge assessment', 'Permit management', 'Critical point identification before dispatch', 'Monsoon and night movement preparedness', 'Traffic and obstruction planning', 'Emergency response planning'],
  },
  {
    id: 'risk', title: 'We own the risk', image: 'safety-plan.jpg', alt: 'Container ship at sea with a rescue helicopter overhead', position: '60% center',
    lead: 'Heavy logistics brings complex risks. We take a risk-first approach: safer cargo movement, driver readiness, road safety and timely execution, with every movement monitored to protect people, cargo, roads and delivery timelines.',
    checks: ['Vehicle inspection', 'Equipment condition checks', 'Lashing and securing checks', 'Site safety supervision', 'Driver and operator verification', 'Real-time issue reporting', 'Escort readiness', 'Emergency response and planning'],
    stats: [['98%', 'Safe delivery'], ['450+', 'Routes assessed'], ['0', 'Major incidents']],
  },
  {
    id: 'execute', title: 'We execute safely', image: 'safety-execute.jpg', alt: 'Reach stacker lifting a container in a container yard', position: 'center',
    lead: 'Every delivery is completed through disciplined execution, coordinated manpower and strict safety checks. From loading to handover, we make sure each cargo moves with the right technical care and operational responsibility.',
    checks: ['Alcohol tests', 'Escort coordination', 'Vehicle inspection', 'Secure cargo handover', 'Lashing check', 'Final delivery confirmation', 'Full equipment verification', 'Route progress monitoring in transit'],
  },
];

const journeyItems = [
  { title: 'Wind turbine blade transport', text: 'Extra-long blades need specialised trailers, trained crews and flexible planning for long-distance runs.', icon: <path d="M6 36h36M10 36V14l14-6 14 6v22M20 36V24h8v12" /> },
  { title: 'Route planning and monsoon readiness', text: 'Routes are studied in advance for road conditions, traffic, seasonal risks and night movement.', icon: <><path d="M8 40c6-10 10-14 16-14s10-4 16-18M24 26v14" /><circle cx="24" cy="26" r="2" /></> },
  { title: 'On-ground safety officers', text: 'Trained officers stay at key loading locations to supervise documentation, equipment checks and vehicle readiness.', icon: <><circle cx="24" cy="15" r="7" /><path d="M10 42c0-9 6-14 14-14s14 5 14 14M18 15h12" /></> },
  { title: 'Pre-movement safety briefings', text: 'Before every dispatch, drivers, escorts and supervisors are briefed on route risks and emergency steps.', icon: <><path d="M24 6l14 5v11c0 9-6 16-14 20-8-4-14-11-14-20V11z" /><path d="m17 24 5 5 9-10" /></> },
  { title: 'Pre-movement alcohol testing', text: 'A zero-tolerance policy: drivers and operators are tested before every heavy-haul movement.', icon: <><rect x="16" y="6" width="16" height="36" rx="4" /><path d="M20 14h8M20 22h8M20 30h8" /></> },
  { title: 'Technology-driven fleet monitoring', text: 'GPS tracking helps us watch vehicle movement, stoppages, speed and alerts in real time.', icon: <><rect x="6" y="10" width="36" height="24" rx="3" /><path d="M16 42h16M24 34v8M13 28l7-8 5 5 8-10" /></> },
  { title: 'Dash camera surveillance', text: 'Dash cameras help us review driver behaviour and road conditions, and keep improving.', icon: <><rect x="8" y="14" width="32" height="22" rx="4" /><circle cx="24" cy="25" r="6" /><path d="m18 14 3-5h6l3 5" /></> },
  { title: 'Strengthened escort protocols', text: 'Dedicated escort supervisors and vehicles manage traffic, turns and communication throughout the movement.', icon: <><path d="M6 32h36l-4-10H14zM12 32v6M36 32v6" /><circle cx="14" cy="32" r="3" /><circle cx="34" cy="32" r="3" /></> },
  { title: 'Critical point monitoring', text: 'Sharp turns, narrow passages, bridges and tolls are tracked closely for safe, controlled movement.', icon: <><path d="M24 6 4 42h40zM24 20v10M24 35v1" /></> },
];

function Photo({ name, alt, position, pillar = false }) {
  const source = imageFor(name);
  return <figure className={`safety-photo${pillar ? ' safety-pillar-photo' : ''}${source ? '' : ' is-placeholder'}`}>
    {source && <img src={source} alt={alt} loading="lazy" decoding={pillar ? 'async' : undefined} style={position ? { objectPosition: position } : undefined} />}
    {!source && <span className="safety-photo-placeholder" role="img" aria-label={`${alt} photo placeholder`} />}
  </figure>;
}

export default function SafetyPage() {
  useEffect(() => {
    document.title = 'Safety | RadheKrishna Roadways';
  }, []);

  return (
    <main className="safety-page">
      <section className="safety-hero">
        <BackgroundVideo
          src="/videos/safety-bg.mp4"
          poster="/videos/safety-poster.jpg"
          overlayClassName="bg-black/60"
        />
        <div className="safety-hero-copy relative z-10">
          <div className="safety-wrap">
            <h1>Every cargo, safely planned and responsibly delivered.</h1>
            <p>At RadheKrishna Roadways, every movement is guided by careful planning, trained teams and strict safety compliance, from the first survey to the final handover.</p>
          </div>
        </div>
        <div className="safety-hazard-stripe" aria-hidden="true" />
      </section>

      {pillars.map((pillar, index) => (
        <section className={`safety-pillar${index % 2 ? ' is-tinted' : ''}`} id={pillar.id} key={pillar.id}>
          <div className={`safety-wrap safety-pillar-layout${index % 2 ? ' is-reversed' : ''}`}>
            <Photo name={pillar.image} alt={pillar.alt} position={pillar.position} pillar />
            <div className="safety-pillar-copy">
              <h2>{pillar.title}</h2><p className="safety-lead">{pillar.lead}</p>
              <h3>Key safety practices</h3>
              <ul className="safety-checks">{pillar.checks.map((check) => <li key={check}>{check}</li>)}</ul>
              {pillar.stats && <div className="safety-stats">{pillar.stats.map(([value, label]) => <div key={label}><strong>{value}</strong><span>{label}</span></div>)}</div>}
            </div>
          </div>
        </section>
      ))}

      <section className="safety-journey">
        <div className="safety-wrap">
          <h2>How we build safety into every journey</h2>
          <p className="safety-section-intro">Nine habits our crews follow on every movement, whatever the cargo.</p>
          <div className="safety-journey-grid">{journeyItems.map((item) => <article className="safety-journey-item" key={item.title}>
            <svg viewBox="0 0 48 48" aria-hidden="true">{item.icon}</svg><h3>{item.title}</h3><p>{item.text}</p>
          </article>)}</div>
        </div>
      </section>

    </main>
  );
}
