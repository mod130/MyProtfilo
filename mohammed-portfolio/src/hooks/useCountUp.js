import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

/**
 * Animates a number from 0 to `target` once the referenced element scrolls into view.
 * Returns [displayValue, ref] — attach `ref` to the element you want to observe.
 */
export function useCountUp(target, { duration = 1600, decimals = 0 } = {}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return undefined;

    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setValue(target);
      return undefined;
    }

    let frame;
    const start = performance.now();

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic for a natural deceleration
      const eased = 1 - (1 - progress) ** 3;
      setValue(Number((eased * target).toFixed(decimals)));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isInView, target, duration, decimals]);

  return [value, ref];
}
