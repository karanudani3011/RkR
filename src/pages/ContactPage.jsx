import { useEffect, useState } from 'react';
import './ContactPage.css';
import ContactBanner from '../components/ContactBanner.jsx';

const CONTACT = {
  phone: "8238477779",
  whatsapp: "+917265828079",
  whatsappDisplay: "+91 72658 28079",
  address: "OFFICE NO 321, ISCON PROZONE MALL, 150 FT RING ROAD, RAJKOT 360005",
  hours: "9:00 AM to 5:00 PM",
  holiday: "Wednesday"
};

const initialValues = {
  fullName: '', phone: '', email: '', truckType: '', loadWeight: '',
  pickup: '', drop: '', message: '',
};

function validate(values) {
  const next = {};
  if (!values.fullName.trim()) next.fullName = 'Please enter your full name.';
  if (!/^\d{10}$/.test(values.phone.replace(/\D/g, ''))) next.phone = 'Enter a valid 10-digit phone number.';
  if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email address.';
  return next;
}

function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const update = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
    setSuccess('');
  };

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    setLoading(true);
    // Add the contact API request or EmailJS integration here when credentials are available.
    window.setTimeout(() => {
      console.log('Contact callback request:', values);
      setLoading(false);
      setSuccess('Thanks! Our team will call you back shortly.');
      setValues(initialValues);
      setErrors({});
    }, 650);
  };

  const field = (name, label, props = {}) => (
    <label className="contact-field" htmlFor={`contact-${name}`} key={name}>
      <span>{label}{props.required && <b aria-hidden="true"> *</b>}</span>
      <input id={`contact-${name}`} name={name} value={values[name]} onChange={update} required={props.required} type={props.type || 'text'} placeholder={props.placeholder || ''} inputMode={props.inputMode} min={props.min} aria-invalid={Boolean(errors[name])} aria-describedby={errors[name] ? `error-${name}` : undefined} />
      {errors[name] && <small className="contact-error" id={`error-${name}`}>{errors[name]}</small>}
    </label>
  );

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="contact-form-heading"><span className="contact-eyebrow">LET’S TALK TRANSPORT</span><h2>Request a Callback</h2><p>Tell us a little about your shipment and we’ll be in touch.</p></div>
      <div className="contact-form-grid">
        {field('fullName', 'Full name', { required: true, placeholder: 'Your name' })}
        {field('phone', 'Phone number', { required: true, type: 'tel', inputMode: 'numeric', placeholder: '10-digit phone number' })}
        {field('email', 'Email (optional)', { type: 'email', placeholder: 'you@example.com' })}
        <label className="contact-field" htmlFor="contact-truckType"><span>Truck type</span><select id="contact-truckType" name="truckType" value={values.truckType} onChange={update}><option value="">Select truck type</option><option>Mini Truck</option><option>Open Body</option><option>Container</option><option>Heavy Duty</option></select></label>
        {field('loadWeight', 'Load weight in tons', { type: 'number', min: '0', placeholder: 'e.g. 5' })}
        <div className="contact-form-row">
          {field('pickup', 'Pickup location', { placeholder: 'From' })}
          {field('drop', 'Drop location', { placeholder: 'To' })}
        </div>
        <label className="contact-field contact-message" htmlFor="contact-message"><span>Message</span><textarea id="contact-message" name="message" rows="4" value={values.message} onChange={update} placeholder="Share any details about your cargo or route" /></label>
      </div>
      <button className="contact-submit" type="submit" disabled={loading}>{loading ? <><span className="contact-spinner" /> Sending request…</> : 'Request Callback'}</button>
      {success && <p className="contact-success" role="status">{success}</p>}
    </form>
  );
}

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

function FaClock(props) {
  return (
    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8l-19.2 26.5c-3.9 5.3-11.4 6.5-16.8 2.6z" />
    </svg>
  );
}

const infoCards = [
  {
    icon: <FaPhoneAlt aria-hidden="true" />,
    title: 'Phone',
    text: CONTACT.phone,
    href: `tel:${CONTACT.phone}`,
  },
  {
    icon: <FaWhatsapp aria-hidden="true" />,
    title: 'WhatsApp',
    text: CONTACT.whatsappDisplay,
    href: `tel:${CONTACT.whatsapp}`,
  },
  {
    icon: <FaMapMarkerAlt aria-hidden="true" />,
    title: 'Address',
    text: CONTACT.address,
    href: 'https://www.google.com/maps/search/?api=1&query=ISCON+Prozone+Mall+150+Feet+Ring+Road+Rajkot',
    target: '_blank',
    rel: 'noopener noreferrer',
    className: 'contact-info-address',
  },
  {
    icon: <FaClock aria-hidden="true" />,
    title: 'Working hours',
    text: CONTACT.hours,
    extra: `Holiday: ${CONTACT.holiday}`,
  },
];

const faqs = [
  ['How fast can I get a truck?', 'Availability depends on your pickup location and truck type. Share your route and we’ll confirm the earliest option.'],
  ['Do you provide drivers?', 'Yes. Driver availability can be confirmed when we arrange the right truck for your shipment.'],
  ['How is the rate decided?', 'Rates depend on truck type, route, load, distance and timing. We’ll share a clear quote before booking.'],
];

export default function ContactPage() {
  useEffect(() => { document.title = 'Contact Us | RadheKrishna Roadways'; }, []);

  return (
    <main className="contact-page">
      <ContactBanner />

      <section className="contact-main" aria-label="Contact information and callback form">
        <div className="contact-main-grid">
          <div className="contact-info">
            <span className="contact-eyebrow">WE’RE HERE TO HELP</span>
            <h2>Get in touch</h2>
            <p className="contact-intro">Talk with our team about your truck and transport needs.</p>
            <div className="contact-info-list">
              {infoCards.map((item) => (
                <article className="contact-info-card" key={item.title}>
                  <span className="contact-info-icon" aria-hidden="true">{item.icon}</span>
                  <div>
                    <h3>{item.title}</h3>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.target}
                        rel={item.rel}
                        className={item.className}
                      >
                        {item.text}
                      </a>
                    ) : (
                      <p className={item.className}>{item.text}</p>
                    )}
                    {item.extra && <small>{item.extra}</small>}
                  </div>
                </article>
              ))}
            </div>
            <a
              className="whatsapp-button"
              href={`https://wa.me/${CONTACT.whatsapp.replace('+', '')}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp aria-hidden="true" /> Chat on WhatsApp
            </a>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="contact-map-section" aria-label="Find us in Gujarat">
        <div className="contact-map-inner"><div><span className="contact-eyebrow">OUR SERVICE AREA</span><h2>Road transport across Gujarat</h2></div><iframe title="Map of Gujarat" src="https://www.google.com/maps?q=Gujarat&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
      </section>

      <section className="contact-faq-section">
        <div className="contact-faq-inner"><span className="contact-eyebrow">QUICK ANSWERS</span><h2>Frequently asked questions</h2><div className="contact-faq-list">{faqs.map(([question, answer]) => <details key={question}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div></div>
      </section>
    </main>
  );
}
