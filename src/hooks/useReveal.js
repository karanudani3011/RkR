import { useEffect } from 'react';

export function useReveal() {
  useEffect(() => {
    document.documentElement.classList.add('js');
    const cards = [...document.querySelectorAll('.rv')];
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    cards.forEach((card, index) => {
      card.style.transitionDelay = `${(index % 4) * 120}ms`;
      observer.observe(card);
    });
    return () => observer.disconnect();
  }, []);
}
