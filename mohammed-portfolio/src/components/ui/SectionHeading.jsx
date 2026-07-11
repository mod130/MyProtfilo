import Reveal from './Reveal';

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center', className = '' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-start';

  return (
    <div className={`flex flex-col gap-4 max-w-2xl ${alignment} ${className}`}>
      {eyebrow && (
        <Reveal>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/25 bg-primary-500/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-primary-600 dark:border-primary-400/30 dark:text-primary-300">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-500 dark:bg-primary-400" />
            {eyebrow}
          </span>
        </Reveal>
      )}
      <Reveal delay={0.08}>
        <h2 className="text-3xl font-bold tracking-tight text-ink-dark dark:text-ink-light sm:text-4xl lg:text-5xl">
          {title}
        </h2>
      </Reveal>
      {subtitle && (
        <Reveal delay={0.14}>
          <p className="text-base leading-relaxed text-ink-dark/65 dark:text-ink-light/65 sm:text-lg">{subtitle}</p>
        </Reveal>
      )}
    </div>
  );
}
