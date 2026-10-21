import { Link } from 'react-router-dom';
import BackgroundVideo from './BackgroundVideo.jsx';

export default function Hero() {
  return (
    <section className="hero relative min-h-[90vh] overflow-hidden" id="top" aria-labelledby="hero-title">
      <BackgroundVideo
        src="/videos/hero-bg.mp4"
        poster="/videos/hero-poster.jpg"
        overlayClassName="bg-gradient-to-r from-[#7a0f14]/90 via-[#8f1119]/70 to-black/40"
      />
      <div className="hero-copy relative z-10">
        <div className="tag">Trucks on rent</div>
        <h1 id="hero-title">Right Truck.<br /><b>Right On Time.</b></h1>
        <p>Rent trucks of every size for your goods, day trips or long-term contracts. Clean vehicles, experienced drivers, honest rates.</p>
        <div className="hero-actions">
          <Link className="btn" to="/contact">Book a Truck</Link>
          <a className="btn o" href="#fleet">View Fleet</a>
        </div>
      </div>
    </section>
  );
}
