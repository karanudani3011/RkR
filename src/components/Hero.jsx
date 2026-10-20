import video from '../assets/media-1.mp4';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <video className="hero-video" autoPlay muted loop playsInline preload="auto" aria-label="RadheKrishna Roadways truck on the road" src={video} />
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-copy">
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
