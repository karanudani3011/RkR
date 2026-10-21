import { useEffect, useState } from 'react';

export default function CountUp({ end, suffix = '', duration = 2, active = false }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return undefined;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion || duration <= 0) {
      setValue(end);
      return undefined;
    }

    let frame;
    const startedAt = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - startedAt) / (duration * 1000), 1);
      setValue(Math.round(end * (1 - (1 - progress) ** 3)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, end]);

  return <>{value}{suffix}</>;
}
