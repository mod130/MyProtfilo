import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import { labItems } from '../../data/lab';
import AnimatedCounter from '../ui/AnimatedCounter';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

export default function Lab() {
  const { t } = useLanguage();

  return (
    <section id="lab" className="section-py relative bg-surface-light-elevated dark:bg-surface-dark-elevated">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t('labSection.eyebrow')}
          title={t('labSection.title')}
          subtitle={t('labSection.subtitle')}
          className="mb-16"
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {labItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.id} delay={(index % 8) * 0.05}>
                <motion.div
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25 }}
                  className="glass-panel flex h-full flex-col gap-3 rounded-2xl p-5"
                >
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-300">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-online" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-online" />
                    </span>
                  </div>
                  <div>
                    <p className="font-display text-2xl font-bold text-ink-dark dark:text-ink-light">
                      <AnimatedCounter target={item.count} />
                    </p>
                    <p className="text-xs text-ink-dark/55 dark:text-ink-light/55">
                      {t('labSection.projectsLabel')}
                    </p>
                  </div>
                  <p className="mt-auto text-sm font-semibold text-ink-dark/80 dark:text-ink-light/80">
                    {item.label}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
