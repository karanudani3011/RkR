import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import parse, { domToReact } from 'html-react-parser';
import { assetUrls, originalMarkup } from '../components/originalMarkup.js';
import { services } from '../data/services.js';
import { useReveal } from '../hooks/useReveal.js';
import Hero from '../components/Hero.jsx';
import Fleet from '../components/Fleet.jsx';

const TOTAL_DURATION = 6;
const STEPS = 4;
const STEP_TIME = (TOTAL_DURATION * 0.7 / (STEPS - 1)) * 1000;
const HOLD = 1500;
const HOW_WORKS_TIMING_STYLE = {
  '--entrance-duration': `${TOTAL_DURATION / 12}s`,
  '--draw-duration': `${TOTAL_DURATION * 0.2}s`,
  '--quick-duration': `${TOTAL_DURATION * 0.075}s`,
  '--delay-short': `${TOTAL_DURATION * 0.025}s`,
  '--delay-medium': `${TOTAL_DURATION * 0.05}s`,
  '--delay-long': `${TOTAL_DURATION * 0.1}s`,
};

function original(name) {
  return originalMarkup[name].replace(/__ASSET_(\d+)__/g, (_, i) => assetUrls[Number(i)]);
}

function Html({ name, className }) {
  const markup = original(name).replace(/\s+onsubmit="[^"]*"/gi, '');
  return <div className={className}>{parse(markup)}</div>;
}

function SvgDefs() { return <Html name="defs" />; }

function Stats() { return <Html name="stats" />; }

function ServiceCard({ service }) {
  return <div className="sc rv"><div className="ph"><img src={service.photo} alt={service.alt} /></div><div className="sb"><div className="ib">{service.icon}</div><h3>{service.title}</h3><p>{service.description}</p><a className="go" href="#quote"><span>Enquire</span>→</a></div></div>;
}

function Services() {
  return <section id="services"><div className="wrap"><div className="k">Our services</div><h2>Services built to keep you moving</h2><div className="g">{services.map((service) => <ServiceCard key={service.title} service={service} />)}</div><p className="home-services-page-link"><Link to="/services">Explore all services</Link></p></div></section>;
}

function HowMarkup({ activeStep, cycle, reduceMotion }) {
  const markup = original('how');
  let stepIndex = 0;
  const options = {
    replace(domNode) {
      if (domNode.name === 'i' && domNode.attribs?.id === 'pb') {
        return (
          <motion.i
            id="pb"
            initial={false}
            animate={{ scaleX: activeStep < 0 ? 0 : (activeStep + 1) / STEPS }}
            transition={{ duration: activeStep < 0 || reduceMotion ? 0 : STEP_TIME / 1000, ease: 'linear' }}
            style={{ transformOrigin: 'left' }}
          />
        );
      }

      if (domNode.name === 'div' && domNode.attribs?.class?.split(/\s+/).includes('st')) {
        const index = stepIndex;
        stepIndex += 1;
        const isActive = activeStep >= index;
        const isCurrent = activeStep === index;
        return (
          <motion.div
            key={`${cycle}-${index}`}
            className={`st${isActive ? ' on' : ''}${isCurrent ? ' cur' : ''}`}
            initial={false}
          >
            {domToReact(domNode.children, options)}
          </motion.div>
        );
      }

      return undefined;
    },
  };

  return parse(markup, options);
}

function HowItWorks() {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.4, once: false });
  const reduceMotion = useReducedMotion();
  const [activeStep, setActiveStep] = useState(-1);
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (!inView) {
      setActiveStep(-1);
      return undefined;
    }
    if (reduceMotion) {
      setActiveStep(STEPS - 1);
      return undefined;
    }

    const timers = [];
    setActiveStep(0);
    for (let index = 1; index < STEPS; index += 1) {
      timers.push(window.setTimeout(() => setActiveStep(index), index * STEP_TIME));
    }
    timers.push(window.setTimeout(() => {
      setActiveStep(-1);
      setCycle((currentCycle) => currentCycle + 1);
    }, (STEPS - 1) * STEP_TIME + STEP_TIME + HOLD));

    return () => timers.forEach((timer) => window.clearTimeout(timer));
  }, [inView, cycle, reduceMotion]);

  return (
    <div
      ref={ref}
      className={`how-works-sequence${reduceMotion ? ' motion-reduced' : ''}`}
      style={HOW_WORKS_TIMING_STYLE}
    >
      <HowMarkup activeStep={activeStep} cycle={cycle} reduceMotion={reduceMotion} />
    </div>
  );
}

function Why() { return <Html name="why" />; }

function QuoteCta() {
  const host = useRef(null);
  useEffect(() => {
    const form = host.current?.querySelector('form');
    const prevent = (event) => event.preventDefault();
    form?.addEventListener('submit', prevent);
    return () => form?.removeEventListener('submit', prevent);
  }, []);
  return <div ref={host}><Html name="quote" /></div>;
}

export default function Home() {
  useReveal();
  useEffect(() => { document.title = 'RadheKrishna Roadways – Trucks on Rent'; }, []);
  return <><SvgDefs /><Hero /><section id="about" className="empty-anchor" aria-label="About Us" /><Stats /><Services /><Fleet /><HowItWorks /><Why /><div id="contact" className="contact-anchor"><QuoteCta /></div></>;
}

