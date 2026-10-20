import { useEffect, useState } from 'react';
import './ContactPage.css';
import ContactBanner from '../components/ContactBanner.jsx';
import { PHONE_DISPLAY, PHONE_TEL } from '../constants/contact.js';

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

const infoCards = [
  { icon: '☎', title: 'Phone', text: PHONE_DISPLAY, href: `tel:${PHONE_TEL}` },
  { icon: '@', title: 'Email', text: 'info@yourdomain.com', href: 'mailto:info@yourdomain.com' },
  { icon: '⌖', title: 'Address', text: 'Your city, Gujarat' },
  { icon: '◷', title: 'Working hours', text: 'Mon to Sat, 9:00 AM to 8:00 PM', extra: '24x7 booking support' },
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
                  <div><h3>{item.title}</h3>{item.href ? <a href={item.href}>{item.text}</a> : <p>{item.text}</p>}{item.extra && <small>{item.extra}</small>}</div>
                </article>
              ))}
            </div>
            <a className="whatsapp-button" href={`https://wa.me/${PHONE_TEL.slice(1)}`} target="_blank" rel="noreferrer"><span aria-hidden="true">◉</span> Chat on WhatsApp</a>
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
