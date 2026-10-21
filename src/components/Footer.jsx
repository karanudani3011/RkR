import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import FooterScene from './FooterScene.jsx';
import { WHATSAPP_DISPLAY, WHATSAPP_TEL } from '../constants/contact.js';
import './Footer.css';

function FaPhoneAlt(props) {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M497.39 361.8l-112-48a24 24 0 0 0-28 6.9l-49.6 60.6A370.66 370.66 0 0 1 130.6 204.1l60.6-49.6a23.94 23.94 0 0 0 6.9-28l-48-112A24.16 24.16 0 0 0 122.6.61l-104 24A24 24 0 0 0 0 48c0 256.5 207.9 464 464 464a24 24 0 0 0 23.4-18.6l24-104a24.29 24.29 0 0 0-14.01-27.6z" />
    </svg>
  );
}

function FaWhatsapp(props) {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}

function FaMapMarkerAlt(props) {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 384 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
    </svg>
  );
}

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
          <div className="rkr-footer-logo">
            <span className="rkr-footer-sq">
              <b>R</b><b>K</b><b>R</b>
            </span>
            <span className="rkr-footer-nm">
              RadheKrishna
              <small>ROADWAYS</small>
            </span>
          </div>
          <p className="rkr-footer-tag">Reliable road transport for your cargo, day and night.</p>
          <Link className="rkr-footer-btn" to="/contact">Get a Quote</Link>
        </div>
        <nav aria-label="Quick links">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/#services">Fleet</Link></li>
            <li><Link to="/#how-it-works">How it works</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div className="rkr-footer-contact">
          <h4>Contact</h4>
          <p>
            <span className="rkr-footer-icon-badge"><FaPhoneAlt aria-hidden="true" /></span>
            <span>
              <strong>Mobile No:</strong>{' '}
              <a href="tel:8238477779">8238477779</a>
            </span>
          </p>
          <p>
            <span className="rkr-footer-icon-badge"><FaWhatsapp aria-hidden="true" /></span>
            <span>
              <strong>WhatsApp:</strong>{' '}
              <a href={`tel:${WHATSAPP_TEL}`}>{WHATSAPP_DISPLAY}</a>
            </span>
          </p>
          <p>
            <span className="rkr-footer-icon-badge"><FaMapMarkerAlt aria-hidden="true" /></span>
            <span>
              <strong>Address:</strong>{' '}
              <a
                href="https://www.google.com/maps/search/?api=1&query=OFFICE+NO+321%2C+ISCON+PROZONE+MALL%2C+150+FT+RING+ROAD%2C+RAJKOT+360005"
                target="_blank"
                rel="noopener noreferrer"
              >
                OFFICE NO 321, ISCON PROZONE MALL, 150 FT RING ROAD, RAJKOT 360005
              </a>
            </span>
          </p>
        </div>
      </div>
      <FooterScene />
    </footer>
  );
}
