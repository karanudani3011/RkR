import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import FooterScene from './FooterScene.jsx';
import { PHONE_DISPLAY, PHONE_TEL } from '../constants/contact.js';
import './Footer.css';

const randomBetween = (min, max) => min + Math.random() * (max - min);

export default function Footer() {
  const stars = useMemo(() => Array.from({ length: 150 }, (_, index) => {
    const size = randomBetween(1, 2.6);
    return {
      key: `star-${index}`,
      style: {
        left: `${randomBetween(0, 100)}%`, top: `${randomBetween(0, 100)}%`,
        width: `${size}px`, height: `${size}px`, '--d': `${randomBetween(0.8, 4)}s`,
        animationDelay: `-${randomBetween(0, 4)}s`, opacity: randomBetween(0.4, 1),
      },
    };
  }), []);
  const sparkles = useMemo(() => Array.from({ length: 10 }, (_, index) => ({
    key: `spark-${index}`,
    style: { left: `${randomBetween(2, 92)}%`, top: `${randomBetween(4, 88)}%`, '--s': `${randomBetween(10, 20)}px`, animationDelay: `-${randomBetween(0, 3)}s` },
  })), []);

  return (
    <footer className="site-footer">
      <div className="rkr-footer-sky" aria-hidden="true">
        {stars.map(({ key, style }) => <i className="rkr-footer-star" key={key} style={style} />)}
        {sparkles.map(({ key, style }) => <i className="rkr-footer-spark" key={key} style={style} />)}
        <div className="rkr-footer-moon" /><i className="rkr-footer-shoot" />
      </div>
      <div className="rkr-footer-content">
        <div>
          <div className="rkr-footer-logo"><span className="rkr-footer-sq"><b>R</b><b>K</b><b>R</b></span><span className="rkr-footer-nm">RadheKrishna<small>ROADWAYS</small></span></div>
          <p className="rkr-footer-tag">Reliable truck rental and road transport for your cargo, day and night.</p>
          <Link className="rkr-footer-btn" to="/contact">Get a Quote</Link>
        </div>
        <nav aria-label="Quick links">
          <h4>Quick Links</h4><ul>
            <li><Link to="/services">Services</Link></li><li><Link to="/#services">Fleet</Link></li>
            <li><Link to="/#how-it-works">How it works</Link></li><li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div><h4>Contact</h4><p>Phone: <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a></p><p>Email: <a className="rkr-footer-mail" href="mailto:info@yourdomain.com">info@yourdomain.com</a></p><p>Your city, Gujarat</p></div>
      </div>
      <FooterScene />
    </footer>
  );
}
