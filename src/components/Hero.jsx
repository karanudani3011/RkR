import { Link } from 'react-router-dom';
import BackgroundVideo from './BackgroundVideo.jsx';

export default function Hero() {
  return (
    <section className="hero relative min-h-[90vh] overflow-hidden" id="top" aria-labelledby="hero-title">
      <BackgroundVideo
        src="/videos/hero-bg.mp4"
        poster="/videos/hero-poster.jpg"
        overlayClassName="bg-black/25"
      />
      <div className="hero-copy relative z-10">
        <div className="tag">Trucks on rent</div>
        <h1 id="hero-title" style={{ textShadow: '0 2px 12px rgba(0,0,0,0.55)' }}>Right Truck.<br /><b>Right On Time.</b></h1>
        <p style={{ textShadow: '0 2px 12px rgba(0,0,0,0.55)' }}>Rent trucks of every size for your goods, day trips or long-term contracts. Clean vehicles, experienced drivers, honest rates.</p>
        <div className="hero-actions">
          <Link className="btn btn-quote" to="/contact">Book a Truck</Link>
          <a className="btn o" href="#fleet">View Fleet</a>
        </div>
      </div>
    </section>
  );
}
