import { useEffect, useRef, useState } from 'react';
import CountUp from './CountUp.jsx';

export default function StatCard({ end, suffix = '', label, index = 0 }) {
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return undefined;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.2 });

    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef}
      className={`who-stat${isVisible ? ' is-visible' : ''}`}
      style={{ '--stat-delay': `${index * 0.15}s` }}
    >
      <strong><CountUp end={end} suffix={suffix} duration={2} active={isVisible} /></strong>
      <span>{label}</span>
    </article>
  );
}
