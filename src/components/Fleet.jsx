import { useState } from 'react';
import { Link } from 'react-router-dom';

const MIN_LOAD = 1;
const MAX_LOAD = 300;
const THUMB = 22;
const clampLoad = (value) => Math.min(MAX_LOAD, Math.max(MIN_LOAD, value));

const TRUCKS = [
  { id: "open", icon: "🚛", name: "Open Body", minTons: 1, maxTons: 9, capacity: "Up to 9 tons", body: "Open flat / high-side body", bestFor: "Bulk goods, construction material, general cargo" },
  { id: "container", icon: "📦", name: "Container Truck", minTons: 9, maxTons: 18, capacity: "9 to 18 tons", body: "Closed container body", bestFor: "Secure, weather-protected and long-distance cargo" },
  { id: "heavy", icon: "🏗️", name: "Heavy Duty Trailer", minTons: 18, maxTons: 300, capacity: "18 to 300 tons", body: "Multi-axle hydraulic low-bed trailer", bestFor: "Heavy machinery, ODC and oversized cargo" },
];

export default function Fleet() {
  const [load, setLoad] = useState(5);
  const [selected, setSelected] = useState(0);

  const selectedTruck = TRUCKS[selected] || TRUCKS[0];
  const percent = Math.min(100, Math.round((load / selectedTruck.maxTons) * 100));
  const pct = ((load - MIN_LOAD) / (MAX_LOAD - MIN_LOAD)) * 100;

  const handleRange = (e) => {
    const nextLoad = clampLoad(Number(e.target.value));
    setLoad(nextLoad);

    if (nextLoad >= 18) {
      setSelected(2);
    } else if (nextLoad > 9) {
      setSelected(1);
    } else {
      setSelected(0);
    }
  };

  const handleTab = (index) => {
    setSelected(index);
    setLoad(clampLoad(TRUCKS[index].minTons));
  };

  return (
    <section id="fleet">
      <div className="wrap">
        <div className="k">Our fleet</div>
        <h2>Slide your load, we pick the truck</h2>
        <div className="fl">
          <div className="fst">
            <div
              className="cl"
              style={{
                position: 'absolute',
                top: 18,
                left: 0,
                width: 120,
                height: 26,
                borderRadius: 20,
                background: 'rgba(255,255,255,.18)',
              }}
            />
            <svg viewBox="0 0 560 230" role="img" aria-label="Truck that matches your load">
              <defs>
                <symbol id="fcab" viewBox="392 34 142 156">
                  <rect x="392" y="40" width="5" height="62" fill="var(--truck-silver)" />
                  <path d="M396 170V78Q396 66 408 66H500Q512 66 514 78V170Z" fill="currentColor" />
                  <path d="M396 170V78Q396 66 408 66H500Q512 66 514 78V170Z" fill="url(#sh)" />
                  <path d="M400 68Q436 46 492 50Q510 52 512 68Z" fill="var(--truck-silver)" />
                  <rect x="410" y="78" width="48" height="36" rx="4" fill="var(--glass)" />
                  <path d="M466 78H504Q510 78 510 84V114H466Z" fill="var(--glass)" />
                  <path d="M466 78H490L474 114H466Z" fill="#fff" opacity=".16" />
                  <path d="M404 80V166M460 80V166" stroke="#c4cad1" strokeWidth="2" />
                  <rect x="508" y="88" width="8" height="26" rx="2" fill="var(--truck-charcoal)" />
                  <rect x="498" y="116" width="26" height="46" rx="3" fill="var(--truck-charcoal)" />
                  <path d="M502 126H520M502 134H520M502 142H520" stroke="var(--cab-stripe,var(--truck-steel))" strokeWidth="2" />
                  <rect x="514" y="152" width="12" height="9" rx="3" fill="#FFD45A" />
                  <rect x="494" y="166" width="34" height="14" rx="3" fill="var(--truck-silver)" />
                  <rect x="444" y="172" width="26" height="16" rx="6" fill="var(--truck-silver)" />
                </symbol>
              </defs>
              <rect y="190" width="560" height="40" fill="var(--road)" />
              <line className="rd2" x1="0" y1="212" x2="560" y2="212" stroke="var(--road-line)" strokeWidth="3" strokeDasharray="18 14" />

              {/* 1. Open Body */}
              <g key={selected === 0 ? 'ob-on' : 'ob-off'} className={`ftk ${selected === 0 ? 'on' : ''}`}>
                <g transform="translate(75 19) scale(.9)">
                  <ellipse cx="260" cy="191" rx="270" ry="5" fill="#000" opacity=".3" />
                  <rect x="10" y="158" width="436" height="8" fill="var(--truck-charcoal)" />
                  <rect x="10" y="150" width="296" height="8" fill="var(--truck-graphite)" />
                  <rect x="24" y="110" width="50" height="40" rx="2" fill="var(--cargo-kraft)" />
                  <rect x="80" y="110" width="50" height="40" rx="2" fill="var(--cargo-sand)" />
                  <rect x="136" y="110" width="50" height="40" rx="2" fill="var(--truck-white)" />
                  <rect x="192" y="110" width="50" height="40" rx="2" fill="var(--cargo-kraft)" />
                  <rect x="52" y="70" width="50" height="40" rx="2" fill="var(--truck-white)" />
                  <rect x="108" y="70" width="50" height="40" rx="2" fill="var(--cargo-sand)" />
                  <rect x="164" y="70" width="50" height="40" rx="2" fill="var(--cargo-kraft)" />
                  <rect x="10" y="118" width="296" height="3" fill="var(--truck-silver)" />
                  <path d="M11 118V150M104 118V150M204 118V150M304 118V150" stroke="var(--truck-silver)" strokeWidth="4" />
                  <use className="fleet-cab" href="#fcab" x="306" y="22" width="142" height="156" />
                  <use className="sp" href="#whl" x="51" y="152" width="38" height="38" style={{ transformOrigin: '70px 171px' }} />
                  <use className="sp" href="#whl" x="96" y="152" width="38" height="38" style={{ transformOrigin: '115px 171px' }} />
                  <use className="sp" href="#whl" x="319" y="152" width="38" height="38" style={{ transformOrigin: '338px 171px' }} />
                  <use className="sp" href="#whl" x="385" y="152" width="38" height="38" style={{ transformOrigin: '404px 171px' }} />
                </g>
              </g>

              {/* 2. Container */}
              <g key={selected === 1 ? 'ct-on' : 'ct-off'} className={`ftk ${selected === 1 ? 'on' : ''}`}>
                <g transform="translate(74 28.5) scale(.85)">
                  <ellipse cx="260" cy="191" rx="270" ry="5" fill="#000" opacity=".3" />
                  <rect x="10" y="158" width="466" height="8" fill="var(--truck-charcoal)" />
                  <rect x="10" y="40" width="320" height="118" rx="4" fill="var(--truck-steel)" />
                  <path d="M26 44V154M42 44V154M58 44V154M74 44V154M90 44V154M106 44V154M122 44V154M138 44V154M154 44V154M170 44V154M186 44V154M202 44V154M218 44V154M234 44V154M250 44V154M266 44V154M282 44V154M298 44V154M314 44V154" stroke="var(--truck-silver)" strokeOpacity=".55" strokeWidth="2" />
                  <rect x="10" y="40" width="320" height="118" rx="4" fill="url(#sh)" />
                  <image href="/rkr-logo-color.png" x="58" y="39" width="224" height="120" preserveAspectRatio="xMidYMid meet" />
                  <use className="fleet-cab" href="#fcab" x="336" y="22" width="142" height="156" />
                  <use className="sp" href="#whl" x="41" y="152" width="38" height="38" style={{ transformOrigin: '60px 171px' }} />
                  <use className="sp" href="#whl" x="83" y="152" width="38" height="38" style={{ transformOrigin: '102px 171px' }} />
                  <use className="sp" href="#whl" x="125" y="152" width="38" height="38" style={{ transformOrigin: '144px 171px' }} />
                  <use className="sp" href="#whl" x="349" y="152" width="38" height="38" style={{ transformOrigin: '368px 171px' }} />
                  <use className="sp" href="#whl" x="415" y="152" width="38" height="38" style={{ transformOrigin: '434px 171px' }} />
                </g>
              </g>

              {/* 3. Heavy Duty */}
              <g key={selected === 2 ? 'hd-on' : 'hd-off'} className={`ftk ${selected === 2 ? 'on' : ''}`}>
                <g transform="translate(57 38) scale(.8)">
                  <ellipse cx="260" cy="191" rx="270" ry="5" fill="#000" opacity=".3" />
                  <rect x="10" y="158" width="528" height="8" fill="var(--truck-charcoal)" />
                  <rect x="10" y="150" width="380" height="8" fill="var(--truck-graphite)" />
                  <rect x="60" y="88" width="250" height="62" rx="31" fill="var(--truck-silver)" />
                  <rect x="60" y="88" width="250" height="62" rx="31" fill="url(#sh)" />
                  <path d="M110 88V150M170 88V150M230 88V150" stroke="var(--truck-silver)" strokeWidth="5" />
                  <rect x="70" y="146" width="40" height="6" fill="var(--truck-charcoal)" />
                  <rect x="260" y="146" width="40" height="6" fill="var(--truck-charcoal)" />
                  <use className="fleet-cab heavy-cab" href="#fcab" x="396" y="22" width="142" height="156" />
                  <use className="sp" href="#whl" x="31" y="152" width="38" height="38" style={{ transformOrigin: '50px 171px' }} />
                  <use className="sp" href="#whl" x="73" y="152" width="38" height="38" style={{ transformOrigin: '92px 171px' }} />
                  <use className="sp" href="#whl" x="115" y="152" width="38" height="38" style={{ transformOrigin: '134px 171px' }} />
                  <use className="sp" href="#whl" x="157" y="152" width="38" height="38" style={{ transformOrigin: '176px 171px' }} />
                  <use className="sp" href="#whl" x="199" y="152" width="38" height="38" style={{ transformOrigin: '218px 171px' }} />
                  <use className="sp" href="#whl" x="409" y="152" width="38" height="38" style={{ transformOrigin: '428px 171px' }} />
                  <use className="sp" href="#whl" x="475" y="152" width="38" height="38" style={{ transformOrigin: '494px 171px' }} />
                </g>
              </g>
            </svg>
          </div>

          <div className="fp">
            <label htmlFor="ld">
              Your load: <b id="lv">{load}</b> tons
            </label>
            <div className="fleet-load-slider-wrap">
              <input
                id="ld"
                className="w-full m-0 p-0 fleet-load-range"
                type="range"
                min={MIN_LOAD}
                max={MAX_LOAD}
                step={1}
                value={load}
                onChange={handleRange}
                aria-label="Select load in tons"
                aria-valuemin={MIN_LOAD}
                aria-valuemax={MAX_LOAD}
                style={{ '--pct': pct, '--thumb-size': `${THUMB}px` }}
              />
            </div>

            <div className="ftabs">
              {TRUCKS.map((item, idx) => (
                <button
                  key={item.id}
                  className={`ftab ${selected === idx ? 'on' : ''}`}
                  type="button"
                  onClick={() => handleTab(idx)}
                >
                  {item.icon} {item.name}
                </button>
              ))}
            </div>

            <div className="fsp">
              <h3 id="sn">{selectedTruck.name}</h3>
              <dl>
                <dt>Capacity</dt>
                <dd id="sc">{selectedTruck.capacity}</dd>
                <dt>Body</dt>
                <dd id="sbd">{selectedTruck.body}</dd>
                <dt>Best for</dt>
                <dd id="sf">{selectedTruck.bestFor}</dd>
              </dl>
              <div className="fmt">
                <i id="mf" style={{ width: `${percent}%` }} />
              </div>
              <small id="mp">{percent}% of this truck's capacity used</small>
            </div>

            <a className="btn btn-quote" href="#quote">
              Get a quote for this truck
            </a>
            <small className="fnt">
              Capacities are indicative. Final vehicle is confirmed at booking.
            </small>

            {load >= 100 && (
              <div className="fleet-heavy-note">
                For 100+ ton loads, please{' '}
                <Link to="/contact">contact us</Link>{' '}
                for special vehicle and route planning.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
