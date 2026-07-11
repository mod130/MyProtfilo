import { motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import { skillCategories } from '../../data/skills';
import ProgressBar from '../ui/ProgressBar';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="section-py relative bg-surface-light dark:bg-surface-dark">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t('skillsSection.eyebrow')}
          title={t('skillsSection.title')}
          subtitle={t('skillsSection.subtitle')}
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {skillCategories.map((category, catIndex) => {
            const Icon = category.icon;
            return (
              <Reveal
                key={category.id}
                delay={catIndex * 0.08}
                direction={catIndex % 2 === 0 ? 'left' : 'right'}
              >
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="glass-panel h-full rounded-3xl p-7"
                >
                  <div className="mb-6 flex items-center gap-3">
                    <span
                      className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${category.accent} text-white shadow-glow`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-ink-dark dark:text-ink-light">
                      {t(`skillsSection.categories.${category.id}`)}
                    </h3>
                  </div>

                  <div className="flex flex-col gap-5">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="group">
                        <div className="mb-2 flex items-center justify-between text-sm">
                          <span className="font-medium text-ink-dark/85 dark:text-ink-light/85 transition-colors group-hover:text-primary-600 dark:group-hover:text-primary-300">
                            {skill.name}
                          </span>
                          <span className="font-mono text-xs text-ink-dark/50 dark:text-ink-light/50">
                            {skill.level}%
                          </span>
                        </div>
                        <ProgressBar value={skill.level} />
                      </div>
                    ))}
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
