import { Award, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { experienceMeta } from '../../data/experience';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';
import Badge from '../ui/Badge';

export default function Experience() {
  const { t } = useLanguage();
  const items = t('experienceSection.items');
  const experienceItems = Array.isArray(items) ? items : [];
  const achievements = t('experienceSection.achievements');
  const achievementItems = Array.isArray(achievements) ? achievements : [];

  return (
    <section id="experience" className="section-py relative bg-surface-light-elevated dark:bg-surface-dark-elevated">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t('experienceSection.eyebrow')}
          title={t('experienceSection.title')}
          subtitle={t('experienceSection.subtitle')}
          className="mb-16"
        />

        <ol className="relative flex flex-col gap-10 border-s-2 border-ink-dark/10 ps-8 dark:border-white/10 sm:gap-12">
          {experienceItems.map((item, index) => {
            const meta = experienceMeta[index] || {};
            const Icon = meta.icon;
            return (
              <Reveal as="li" key={`${item.role}-${item.period}`} delay={index * 0.08} className="relative">
                <span className="absolute -start-[3.05rem] top-0 flex h-10 w-10 items-center justify-center rounded-2xl border border-ink-dark/10 bg-surface-light text-primary-600 shadow-card dark:border-white/10 dark:bg-surface-dark-card dark:text-primary-300">
                  {Icon && <Icon className="h-5 w-5" strokeWidth={1.8} />}
                </span>

                <div className="glass-panel rounded-2xl p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h3 className="font-display text-lg font-semibold text-ink-dark dark:text-ink-light sm:text-xl">
                        {item.role}
                      </h3>
                      <p className="text-sm font-medium text-primary-600 dark:text-primary-300">{item.company}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {meta.current && (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-online/10 px-3 py-1 font-mono text-[11px] font-medium text-online">
                          <span className="h-1.5 w-1.5 rounded-full bg-online" />
                          {t('experienceSection.present')}
                        </span>
                      )}
                      <Badge muted>{item.period}</Badge>
                      <Badge>{item.type}</Badge>
                    </div>
                  </div>

                  <ul className="mt-4 flex flex-col gap-2.5">
                    {(item.points || []).map((point) => (
                      <li key={point} className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-dark/70 dark:text-ink-light/70">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-500 dark:text-primary-400" strokeWidth={1.8} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            );
          })}
        </ol>

        <Reveal delay={0.1} className="mt-16">
          <div className="glass-panel rounded-3xl p-8">
            <div className="mb-6 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary text-white shadow-glow">
                <Award className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <h3 className="font-display text-xl font-semibold text-ink-dark dark:text-ink-light">
                {t('experienceSection.achievementsTitle')}
              </h3>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {achievementItems.map((achievement) => (
                <div key={achievement} className="flex items-start gap-3 rounded-2xl bg-ink-dark/[0.03] p-4 dark:bg-white/5">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-online" strokeWidth={1.8} />
                  <p className="text-sm leading-relaxed text-ink-dark/70 dark:text-ink-light/70">{achievement}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
