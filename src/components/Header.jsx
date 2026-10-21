import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import aboutMenuImage from '../assets/freight-forwarding.png';
import './Header.css';

const aboutMenu = [
  { label: 'Who We Are?', href: '/about/who-we-are', route: true },
  { label: 'Our Clients', href: '/about/our-clients', route: true },
  { label: 'Team', href: '/team', route: true },
  { label: 'Safety', href: '/about/safety', route: true },
];

const aboutMenuPhoto = aboutMenuImage;

function AboutMegaMenu({ closeMenu, sectionClass, onOpenChange }) {
  const rootRef = useRef(null);
  const triggerRef = useRef(null);
  const closeTimerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname, hash } = useLocation();

  const clearCloseTimer = () => {
    if (closeTimerRef.current) window.clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };
  const close = () => {
    clearCloseTimer();
    setOpen(false);
    setMobileOpen(false);
  };

  useEffect(() => {
    close();
  }, [pathname, hash]);

  useEffect(() => {
    onOpenChange(open || mobileOpen);
  }, [open, mobileOpen, onOpenChange]);

  useEffect(() => {
    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) close();
    };
    const onKeyDown = (event) => {
      if (event.key === 'Escape' && (open || mobileOpen)) {
        close();
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
      clearCloseTimer();
    };
  }, [open, mobileOpen]);

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimerRef.current = window.setTimeout(() => setOpen(false), 150);
  };
  const menuLink = (item) => (
    item.route ? <Link to={item.href} key={item.href} onClick={() => { close(); closeMenu(); }}>
      <span>{item.label}</span><span className="about-menu-arrow" aria-hidden="true">&gt;</span>
    </Link> : <a href={item.href} key={item.href} onClick={() => { close(); closeMenu(); }}>
      <span>{item.label}</span><span className="about-menu-arrow" aria-hidden="true">&gt;</span>
    </a>
  );

  return (
    <div
      ref={rootRef}
      className={`about-mega${open ? ' is-open' : ''}${mobileOpen ? ' mobile-expanded' : ''}`}
      onMouseEnter={() => { clearCloseTimer(); setOpen(true); }}
      onMouseLeave={scheduleClose}
    >
      <button
        ref={triggerRef}
        className={`about-trigger${sectionClass('about') ? ' active' : ''}`}
        type="button"
        aria-expanded={open || mobileOpen}
        aria-controls="about-mega-panel about-mega-panel-mobile"
        aria-haspopup="true"
        onClick={() => {
          if (window.matchMedia('(max-width: 899px)').matches) setMobileOpen((value) => !value);
          else setOpen(true);
        }}
      >
        <span>About Us</span><svg className="about-trigger-chevron" viewBox="0 0 16 16" aria-hidden="true"><path d="m3.5 6 4.5 4.5L12.5 6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>

      <div id="about-mega-panel" className="about-mega-panel" aria-hidden={!open}>
        <nav className="about-mega-inner" aria-label="About Us">
          <div className="about-mega-links-wrap">
            <h2>ABOUT US <span aria-hidden="true">&gt;</span></h2>
            <div className="about-mega-columns">
              <div>{aboutMenu.slice(0, 2).map(menuLink)}</div>
              <div>{aboutMenu.slice(2).map(menuLink)}</div>
            </div>
          </div>
          <img className="about-mega-image" src={aboutMenuPhoto} alt="Freight aircraft above a container port" />
        </nav>
      </div>

      <div className="about-mobile-links" id="about-mega-panel-mobile" aria-hidden={!mobileOpen}>
        {aboutMenu.map(menuLink)}
      </div>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname, hash } = useLocation();
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    closeMenu();
  }, [pathname, hash]);

  useEffect(() => {
    const updateScrollState = () => setScrolled(window.scrollY > 50);
    updateScrollState();
    window.addEventListener('scroll', updateScrollState, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollState);
  }, [pathname]);

  const sectionClass = (section) =>
    (pathname === '/' && hash === `#${section}`) || (section === 'about' && pathname.startsWith('/about/')) ? 'active' : undefined;

  return (
    <header className={`header${scrolled ? ' scrolled' : ''}${menuOpen ? ' menu-open' : ''}${aboutOpen ? ' about-open' : ''}`}>
      <Link className="header-logo" to="/" aria-label="RKR RadheKrishna Roadways home" onClick={closeMenu}>
        <img
          className="site-logo"
          src={pathname === '/' && !scrolled && !menuOpen && !aboutOpen ? '/rkr-logo-white.png' : '/rkr-logo-color.png'}
          alt="RadheKrishna Roadways"
          width="180"
          height="44"
          fetchPriority="high"
        />
      </Link>
      <button className="header-menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
        <span /><span /><span />
      </button>
      <nav className={`header-nav${menuOpen ? ' menu-open' : ''}`} aria-label="Main navigation">
        <AboutMegaMenu closeMenu={closeMenu} sectionClass={sectionClass} onOpenChange={setAboutOpen} />
        <NavLink to="/services" className={({ isActive }) => isActive ? 'active' : undefined} onClick={closeMenu}>Services</NavLink>
        <NavLink to="/case-studies" className={({ isActive }) => isActive ? 'active' : undefined} onClick={closeMenu}>Case Studies</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'active' : undefined} onClick={closeMenu}>Contact Us</NavLink>
        <Link className="header-quote btn-quote" to="/contact" onClick={closeMenu}>Get a Quote</Link>
      </nav>
    </header>
  );
}
