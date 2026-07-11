import { ChevronDown, FileDown, Github, Linkedin, Mail, Network, Server, ShieldCheck, Code2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useTypewriter } from '../../hooks/useTypewriter';
import Button from '../ui/Button';
import Avatar from '../ui/Avatar';
import StatusDot from '../ui/StatusDot';
import AnimatedCounter from '../ui/AnimatedCounter';
import NetworkCanvas from '../ui/NetworkCanvas';
import Reveal from '../ui/Reveal';
import { profile, socialLinks } from '../../data/socials';

const FLOATING_ICONS = [
  { Icon: Network, style: 'top-[6%] start-[2%]', delay: '0s' },
  { Icon: Server, style: 'top-[62%] start-[-4%]', delay: '1.4s' },
  { Icon: ShieldCheck, style: 'top-[14%] end-[4%]', delay: '0.7s' },
  { Icon: Code2, style: 'top-[70%] end-[0%]', delay: '2.1s' },
];

export default function Hero() {
  const { t } = useLanguage();
  const roles = t('hero.roles');
  const typedRole = useTypewriter(Array.isArray(roles) ? roles : [roles]);

  const stats = [
    { id: 'experience', target: 2, suffix: '+' },
    { id: 'projects', target: 12, suffix: '+' },
    { id: 'certificates', target: 8, suffix: '' },
    { id: 'technologies', target: 10, suffix: '+' },
  ];

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden bg-surface-light pt-28 dark:bg-surface-dark sm:pt-24"
    >
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden="true" />
      <div className="absolute inset-0" aria-hidden="true">
        <NetworkCanvas className="h-full w-full opacity-70" />
      </div>
      <div
        className="absolute -top-40 start-1/3 h-[520px] w-[520px] rounded-full bg-primary-500/25 blur-[140px]"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 end-0 h-[420px] w-[420px] rounded-full bg-secondary/20 blur-[120px]"
        aria-hidden="true"
      />

      {FLOATING_ICONS.map(({ Icon, style, delay }, i) => (
        <div
          key={i}
          className={`pointer-events-none absolute hidden h-14 w-14 items-center justify-center rounded-2xl border border-ink-dark/10 bg-white/60 text-primary-500 shadow-card backdrop-blur-md animate-float dark:border-white/10 dark:bg-white/5 dark:text-primary-300 lg:flex ${style}`}
          style={{ animationDelay: delay }}
          aria-hidden="true"
        >
          <Icon className="h-6 w-6" strokeWidth={1.6} />
        </div>
      ))}

      <div className="container-px relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="flex flex-col items-start gap-6 text-start">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary-500/25 bg-primary-500/10 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-primary-600 dark:border-primary-400/30 dark:text-primary-300">
              <StatusDot />
              {t('hero.eyebrow')}
            </span>
          </Reveal>

          <Reveal delay={0.08}>
            <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-ink-dark dark:text-ink-light sm:text-5xl lg:text-6xl">
              {t('hero.greeting')}{' '}
              <span className="text-gradient">{t('hero.name')}</span>
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="flex min-h-[2rem] items-center gap-2 font-mono text-base text-ink-dark/80 dark:text-ink-light/80 sm:text-lg">
              <span className="text-primary-500 dark:text-primary-400">~$</span>
              <span>{t('hero.rolePrefix')}</span>
              <span className="text-secondary dark:text-secondary-400">
                {typedRole}
                <span className="ms-0.5 inline-block h-[1.1em] w-[2px] translate-y-[2px] animate-blink bg-secondary align-middle" />
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="max-w-xl text-base leading-relaxed text-ink-dark/65 dark:text-ink-light/65 sm:text-lg">
              {t('hero.description')}
            </p>
          </Reveal>

          <Reveal delay={0.26} className="flex flex-wrap items-center gap-3">
            <Button href="#projects" variant="primary" size="lg">
              {t('hero.ctaPrimary')}
            </Button>
            <Button href="#contact" variant="secondary" size="lg">
              {t('hero.ctaSecondary')}
            </Button>
          </Reveal>

          <Reveal delay={0.32} className="flex items-center gap-3">
            {socialLinks.map(({ id, label, icon: Icon, href }) => (
              <a
                key={id}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-dark/10 text-ink-dark/70 transition-all hover:-translate-y-0.5 hover:border-primary-400/40 hover:text-primary-600 dark:border-white/10 dark:text-ink-light/70 dark:hover:text-primary-300"
              >
                <Icon className="h-4 w-4" strokeWidth={1.8} />
              </a>
            ))}
            <a
              href={profile.resumeUrl}
              download
              aria-label={t('common.downloadCv')}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-dark/10 text-ink-dark/70 transition-all hover:-translate-y-0.5 hover:border-primary-400/40 hover:text-primary-600 dark:border-white/10 dark:text-ink-light/70 dark:hover:text-primary-300"
            >
              <FileDown className="h-4 w-4" strokeWidth={1.8} />
            </a>
          </Reveal>

          <Reveal delay={0.38} className="grid w-full grid-cols-2 gap-3 pt-4 sm:grid-cols-4">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="glass-panel flex flex-col gap-1 rounded-2xl px-4 py-3.5 text-start"
              >
                <span className="font-display text-2xl font-bold text-ink-dark dark:text-ink-light">
                  <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                </span>
                <span className="text-xs leading-snug text-ink-dark/55 dark:text-ink-light/55">
                  {t(`stats.${stat.id}`)}
                </span>
              </div>
            ))}
          </Reveal>
        </div>

        <Reveal direction="scale" delay={0.2} className="relative mx-auto w-full max-w-md">
          <div className="absolute inset-0 -z-10 flex items-center justify-center" aria-hidden="true">
            <div className="h-[340px] w-[340px] rounded-full border border-primary-400/20 sm:h-[400px] sm:w-[400px]" />
            <div className="absolute h-[260px] w-[260px] rounded-full border border-secondary/20 sm:h-[310px] sm:w-[310px]" />
          </div>

          <div className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[2.5rem] border border-ink-dark/10 shadow-glow-lg dark:border-white/10">
            <Avatar src="/profile.jpg" alt={t('hero.name')} initials="MA" className="h-full w-full" rounded="rounded-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-dark/60 via-transparent to-transparent" />
          </div>

          <div className="glass-panel absolute -bottom-6 start-[-8%] flex items-center gap-3 rounded-2xl px-4 py-3 sm:start-[-14%]">
            <StatusDot />
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-medium uppercase tracking-wide text-ink-dark/50 dark:text-ink-light/50">
                {t('hero.statusBadge.label')}
              </span>
              <span className="text-sm font-semibold text-ink-dark dark:text-ink-light">
                {t('hero.statusBadge.role')}
              </span>
              <span className="text-xs text-primary-600 dark:text-primary-300">{t('hero.statusBadge.company')}</span>
            </div>
          </div>
        </Reveal>
      </div>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-xs font-medium text-ink-dark/50 dark:text-ink-light/50 sm:flex"
        aria-label={t('hero.scrollHint')}
      >
        <span className="font-mono">{t('hero.scrollHint')}</span>
        <ChevronDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
