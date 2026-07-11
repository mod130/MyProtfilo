export default function Badge({ children, className = '', muted = false }) {
  const base = muted
    ? 'border-ink-dark/10 bg-ink-dark/[0.04] text-ink-dark/70 dark:border-white/10 dark:bg-white/5 dark:text-ink-light/70'
    : 'border-primary-500/20 bg-primary-500/10 text-primary-700 dark:border-primary-400/25 dark:bg-primary-500/10 dark:text-primary-300';

  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 font-mono text-xs ${base} ${className}`}>
      {children}
    </span>
  );
}
