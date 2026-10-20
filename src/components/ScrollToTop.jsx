import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [pathname, hash]);

  return null;
}

export function HashScroll() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) return undefined;
    let attempts = 0;
    let timer;
    const scrollToTarget = () => {
      const target = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
      if (attempts++ < 20) timer = window.setTimeout(scrollToTarget, 25);
    };
    timer = window.setTimeout(scrollToTarget, 0);
    return () => window.clearTimeout(timer);
  }, [pathname, hash]);

  return null;
}
