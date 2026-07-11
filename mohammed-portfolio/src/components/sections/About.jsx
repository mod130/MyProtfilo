import { FileDown, Mail, MapPin, Clock, User } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { profile } from '../../data/socials';
import Avatar from '../ui/Avatar';
import Button from '../ui/Button';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

export default function About() {
  const { t } = useLanguage();
  const journey = t('about.journey');
  const journeyItems = Array.isArray(journey) ? journey : [];

  const infoRows = [
    { icon: User, label: t('about.infoName'), value: t('hero.name') },
    { icon: MapPin, label: t('about.infoLocation'), value: t('about.infoLocationValue') },
    { icon: Clock, label: t('about.infoExperience'), value: t('about.infoExperienceValue') },
    { icon: Mail, label: t('about.infoEmail'), value: profile.email },
  ];

  return (
    <section id="about" className="section-py relative bg-surface-light dark:bg-surface-dark">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading eyebrow={t('about.eyebrow')} title={t('about.title')} className="mb-16" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal direction="left" className="relative mx-auto w-full max-w-sm">
            <div className="glass-panel overflow-hidden rounded-[2rem] p-3">
              <Avatar
                src="/profile-about.jpg"
                alt={t('hero.name')}
                initials="MA"
                className="aspect-[4/5] w-full"
                rounded="rounded-[1.5rem]"
              />
            </div>
            <div
              className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-primary-500/20 to-secondary/20 blur-2xl"
              aria-hidden="true"
            />
          </Reveal>

          <div className="flex flex-col gap-8">
            <Reveal direction="right">
              <p className="text-base leading-relaxed text-ink-dark/70 dark:text-ink-light/70 sm:text-lg">
                {t('about.bio')}
              </p>
            </Reveal>

            <Reveal direction="right" delay={0.08} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {infoRows.map((row) => (
                <div key={row.label} className="glass-panel flex items-center gap-3 rounded-2xl px-4 py-3.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-300">
                    <row.icon className="h-4 w-4" strokeWidth={1.8} />
                  </span>
                  <div className="flex flex-col leading-tight">
                    <span className="text-[11px] uppercase tracking-wide text-ink-dark/45 dark:text-ink-light/45">
                      {row.label}
                    </span>
                    <span className="truncate text-sm font-semibold text-ink-dark dark:text-ink-light">
                      {row.value}
                    </span>
                  </div>
                </div>
              ))}
            </Reveal>

            <Reveal direction="right" delay={0.16}>
              <Button href={profile.resumeUrl} download icon={FileDown}>
                {t('common.downloadCv')}
              </Button>
            </Reveal>
          </div>
        </div>

        <div className="mt-24">
          <Reveal>
            <h3 className="mb-10 font-display text-2xl font-bold text-ink-dark dark:text-ink-light">
              {t('about.journeyTitle')}
            </h3>
          </Reveal>

          <ol className="relative flex flex-col gap-10 border-s-2 border-ink-dark/10 ps-8 dark:border-white/10 sm:gap-12">
            {journeyItems.map((item, index) => (
              <Reveal as="li" key={item.title} delay={index * 0.08} className="relative">
                <span className="absolute -start-[2.55rem] top-0.5 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary-500 to-secondary shadow-glow ring-4 ring-surface-light dark:ring-surface-dark">
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>
                <span className="font-mono text-xs uppercase tracking-widest text-primary-600 dark:text-primary-300">
                  {item.year}
                </span>
                <h4 className="mt-1.5 font-display text-lg font-semibold text-ink-dark dark:text-ink-light">
                  {item.title}
                </h4>
                <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-ink-dark/65 dark:text-ink-light/65 sm:text-base">
                  {item.description}
                </p>
              </Reveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
