import { useEffect } from 'react';
import './WhoWeAre.css';

const journey = [
  { year: '2012', detail: '2 Eicher vehicles (19 FT & 22 FT), Regular Transport' },
  { year: '2012–15', detail: '5 vehicles, Stronger Regular Transport network' },
  { year: '2016–19', detail: '25 vehicles, Entered Heavy Transportation' },
  { year: '2019–25', detail: 'Started serving Industrial Clients, Big Machinery' },
  { year: '2026', detail: '32 ODC vehicles & 300+ attached vehicle owners, Regular + ODC Transportation, Growing Pan-India network' },
];

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
          <p>Founded in 2012 by my father, with a vision to build a trusted transportation business. We started with just 2 Eicher vehicles — 19 FT &amp; 22 FT — serving Regular Transport requirements.</p>
          <p>Over the years, we expanded our fleet and grew with the changing needs of the industry. Today, we have evolved into Heavy &amp; ODC Transportation, supported by our own fleet and a strong market network.</p>
          <p>From a family legacy to a growing logistics network — we continue to move forward with trust, responsibility and ambition.</p>
        </div>
        <div className="who-stats">
          <article className="who-stat"><strong>12K</strong><span>Projects Completed</span></article>
          <article className="who-stat"><strong>32</strong><span>ODC Vehicles</span></article>
          <article className="who-stat"><strong>300+</strong><span>Attached Vehicle Owners</span></article>
        </div>
      </section>

      <section className="who-values">
        <div className="who-wrap">
          <div className="who-section-heading"><h2>Vision &amp; Mission</h2></div>
          <div className="who-value-grid">
            <article className="who-value-card"><h3>Vision</h3><p>To become a trusted Pan-India name in Heavy &amp; ODC Logistics.</p></article>
            <article className="who-value-card"><h3>Mission</h3><p>Right Vehicle. Right Route. Right Execution. Every Time.</p></article>
          </div>
        </div>
      </section>

      <section className="who-journey who-wrap">
        <div className="who-section-heading"><h2>Our Journey</h2></div>
        <ol className="who-timeline">
          {journey.map(({ year, detail }) => <li className="who-milestone" key={year}><span className="who-marker" aria-hidden="true" /><h3>{year}</h3><p>{detail}</p></li>)}
        </ol>
      </section>

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
