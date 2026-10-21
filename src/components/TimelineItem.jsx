import { motion, useReducedMotion, useTransform } from 'framer-motion';

export default function TimelineItem({ year, detail, icon: Icon, index, count, isToday = false, progress }) {
  const reduceMotion = useReducedMotion();
  const threshold = count <= 1 ? 1 : (index + 1) / count;
  const dotScale = useTransform(progress, [Math.max(0, threshold - 0.06), threshold], [0, 1]);
  const ringOpacity = useTransform(progress, [Math.max(0, threshold - 0.04), threshold], [0, 1]);
  const fromX = index % 2 === 0 ? -60 : 60;

  return (
    <motion.li className={`journey-item${isToday ? ' is-today' : ''}`}>
      <span className="journey-dot-position" aria-hidden="true">
        <motion.span
          className="journey-dot"
          style={{ scale: reduceMotion ? 1 : dotScale }}
        >
          <motion.span className="journey-dot-ring" style={{ opacity: reduceMotion ? 0 : ringOpacity }} />
        </motion.span>
      </span>
      <motion.article
        className="journey-card"
        initial={reduceMotion ? false : { opacity: 0, x: fromX }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: reduceMotion ? 0 : 0.6, ease: 'easeOut' }}
      >
        <div className="journey-card-icon" aria-hidden="true"><Icon size={19} strokeWidth={2.2} /></div>
        <div className="journey-card-copy">
          <h3>{year}</h3>
          <p>{detail}</p>
        </div>
      </motion.article>
    </motion.li>
  );
}
