import { useCountUp } from '../../hooks/useCountUp';

export default function AnimatedCounter({ target, suffix = '', prefix = '', decimals = 0, className = '' }) {
  const [value, ref] = useCountUp(target, { decimals });

  return (
    <span ref={ref} className={className}>
      {prefix}
      {decimals > 0 ? value.toFixed(decimals) : Math.round(value)}
      {suffix}
    </span>
  );
}
