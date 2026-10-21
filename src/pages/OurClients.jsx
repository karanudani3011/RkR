import { useEffect, useMemo, useRef, useState } from 'react';
import './OurClients.css';

const names = [
  'Indian Railways', 'Adani Green Energy Limited', 'Suzlon', 'JSW Energy',
  'Reliance Industries Limited', 'PGVCL', 'KP Energy Limited', 'Larsen & Toubro',
  'Heben Cranes', 'SRP Crane Controls', 'RPPL Transformers', 'Boostflow Water', 'Onix Renewable', 'EQ',
  'Induct Crane', 'Monocraft', 'Gunatit Electropower', 'Embicon', 'Synergy Transformers', 'PMECH Engitech',
  'Incredible Machines', 'Mascot Electrotek', 'Alpa Infrastructure', 'Nova Cranes', 'Ganesh Cranes', 'Krishna LM',
  'JIT', 'Visaman Global Sales', 'Sarang Capsules', 'Chaan Roofing System', 'Mrunal Transformers',
  'Sardar Roofing Sheets', 'RT', 'PND Transformers', 'HM', 'Neo Tech', 'JJ EPC', 'Star Pipe Products', 'KTM',
  'Synchro Energy', 'SB', 'H2O Chemicals', 'Super Laser', 'Prosper Universal', 'Aluwerk', 'Galvacoat Industries',
  'Rayzon Green', 'ANB Metal Cast', 'Sudarshan Planeta', 'Atha Energies', 'Phoenix CNC', 'Nilkanth Engitech',
  'SS Solar System', 'Yogi Industries', 'Top Crane', 'Thermalon', 'Rajoo Engineers', 'Galaxy Chains',
  'Heat Wave Furnace', 'TrafoFab', 'Oilcool Radiators', 'TAR Induction',
];

const logoFiles = import.meta.glob('/src/assets/images/rkr/images/clients/*.{png,PNG,webp,jpg,jpeg,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
});

const slugify = (value) => value.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, '-');
const logosBySlug = Object.fromEntries(Object.entries(logoFiles).map(([path, url]) => {
  const filename = path.split('/').pop();
  return [filename.replace(/\.[^.]+$/, '').toLowerCase(), url];
}));

function ClientCard({ name, index, visibleRef }) {
  const [failed, setFailed] = useState(false);
  const clientSlug = slugify(name);
  const logo = logosBySlug[clientSlug] || logosBySlug[clientSlug.replace(/-limited$/, '')];
  return (
    <article className="client-card" ref={visibleRef} style={{ '--client-stagger': `${(index % 12) * 55}ms` }}>
      <span className="client-number">{String(index + 1).padStart(2, '0')}</span>
      <div className="client-logo-area">
        {logo && !failed
          ? <img src={logo} alt={`${name} logo`} loading="lazy" decoding="async" onError={() => setFailed(true)} />
          : <span className="client-logo-fallback">{name}</span>}
      </div>
      <p className="client-name">{name}</p>
    </article>
  );
}

export default function OurClientsPage() {
  const [query, setQuery] = useState('');
  const gridRef = useRef(null);
  const filteredNames = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const searchTerms = {
      'Indian Railways': 'railways',
      'Adani Green Energy Limited': 'adani',
      'Reliance Industries Limited': 'reliance',
      PGVCL: 'pgvcl',
      'KP Energy Limited': 'kp',
      'Larsen & Toubro': 'l&t larsen',
    };
    return names.filter((name) => `${name} ${searchTerms[name] || ''}`.toLowerCase().includes(normalized));
  }, [query]);

  useEffect(() => { document.title = 'Our Clients | RadheKrishna Roadways'; }, []);

  useEffect(() => {
    const cards = [...(gridRef.current?.querySelectorAll('.client-card') ?? [])];
    if (!cards.length) return undefined;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion || !('IntersectionObserver' in window)) {
      cards.forEach((card) => card.classList.add('is-visible'));
      return undefined;
    }
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          instance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, [filteredNames]);

  return (
    <main className="clients-page">
      <section className="clients-hero">
        <div className="clients-wrap clients-hero-inner">
          <p className="clients-eyebrow">ABOUT US</p>
          <h1>Our <span>Clients</span></h1>
          <p className="clients-subline">Trusted by {names.length}+ industry leaders across cranes, transformers, solar, roofing, machinery and more.</p>
          <div className="clients-badge">{names.length}+ Trusted Clients</div>
        </div>
        <div className="clients-road" aria-hidden="true"><span /></div>
      </section>

      <div className="clients-toolbar">
        <div className="clients-wrap clients-toolbar-inner">
          <h2>Companies that <span>trust RKR</span></h2>
          <label className="clients-search">
            <span className="clients-search-icon" aria-hidden="true" />
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search client name..." aria-label="Search client name" />
          </label>
        </div>
      </div>

      <section className="clients-grid-section" aria-label="Our clients">
        <div className="clients-wrap">
          {filteredNames.length ? (
            <div className="clients-grid" ref={gridRef}>
              {filteredNames.map((name) => <ClientCard name={name} index={names.indexOf(name)} key={name} />)}
            </div>
          ) : <p className="clients-empty">No client found.</p>}
        </div>
      </section>
    </main>
  );
}
