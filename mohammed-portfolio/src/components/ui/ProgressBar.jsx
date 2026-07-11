import { motion, useReducedMotion } from 'framer-motion';

export default function ProgressBar({ value, className = '' }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div
      className={`h-1.5 w-full overflow-hidden rounded-full bg-ink-dark/10 dark:bg-white/10 ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-primary-400 via-secondary to-accent"
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: shouldReduceMotion ? 0.01 : 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
      />
    </div>
  );
}
