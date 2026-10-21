import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Boxes, Factory, MapPin, TrendingUp, Truck } from 'lucide-react';
import { useRef } from 'react';
import TimelineItem from './TimelineItem.jsx';

const milestones = [
  { year: '2012', detail: '2 Eicher vehicles (19 FT & 22 FT), Regular Transport', icon: Truck },
  { year: '2012–15', detail: '5 vehicles, Stronger Regular Transport network', icon: TrendingUp },
  { year: '2016–19', detail: '25 vehicles, Entered Heavy Transportation', icon: Factory },
  { year: '2019–25', detail: 'Started serving Industrial Clients, Big Machinery', icon: Boxes },
  { year: '2026', detail: '32 ODC vehicles & 300+ attached vehicle owners, Regular + ODC Transportation, Growing Pan-India network', icon: MapPin, isToday: true },
];

export default function JourneyTimeline() {
  const timelineRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.78', 'end 0.25'],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.3 });
  const truckY = useTransform(progress, [0, 1], ['0%', '100%']);

  return (
    <section className="who-journey who-wrap" aria-labelledby="journey-title">
      <div className="who-section-heading"><h2 id="journey-title">Our Journey</h2></div>
      <div className="journey-timeline" ref={timelineRef}>
        <div className="journey-track" aria-hidden="true">
          <div className="journey-track-base" />
          <motion.div
            className="journey-track-progress"
            style={{ scaleY: reduceMotion ? 1 : progress, transformOrigin: 'top' }}
          />
          {!reduceMotion && (
            <div className="journey-traveler-axis">
              <motion.div className="journey-traveler-position" style={{ top: truckY }}>
                <span className="journey-traveler"><Truck size={22} strokeWidth={2.5} /></span>
              </motion.div>
            </div>
          )}
        </div>
        <ol className="journey-list">
          {milestones.map((milestone, index) => (
            <TimelineItem
              key={milestone.year}
              {...milestone}
              index={index}
              count={milestones.length}
              progress={progress}
            />
          ))}
        </ol>
      </div>
    </section>
  );
}
