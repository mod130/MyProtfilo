import { motion, useReducedMotion } from 'framer-motion';

const DIRECTIONS = {
  up: { y: 28, x: 0 },
  down: { y: -28, x: 0 },
  left: { y: 0, x: 28 },
  right: { y: 0, x: -28 },
  fade: { y: 0, x: 0 },
  scale: { y: 0, x: 0 },
};

/**
 * Wraps children with a scroll-triggered reveal animation. Respects
 * prefers-reduced-motion by disabling translation/scale (opacity-only fade).
 */
export default function Reveal({
  children,
  as = 'div',
  direction = 'up',
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.25,
  className = '',
  ...rest
}) {
  const shouldReduceMotion = useReducedMotion();
  const MotionTag = motion[as] || motion.div;
  const offset = DIRECTIONS[direction] || DIRECTIONS.up;
  const scaleFrom = direction === 'scale' ? 0.94 : 1;

  const initial = shouldReduceMotion
    ? { opacity: 0 }
    : { opacity: 0, x: offset.x, y: offset.y, scale: scaleFrom };

  const animate = shouldReduceMotion ? { opacity: 1 } : { opacity: 1, x: 0, y: 0, scale: 1 };

  return (
    <MotionTag
      initial={initial}
      whileInView={animate}
      viewport={{ once, amount }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
