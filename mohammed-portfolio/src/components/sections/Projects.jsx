import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLanguage } from '../../i18n/LanguageContext';
import { projects, projectFilters } from '../../data/projects';
import ProjectCard from '../ui/ProjectCard';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

export default function Projects() {
  const { t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState('all');

  const filtered = useMemo(
    () => (activeFilter === 'all' ? projects : projects.filter((project) => project.category === activeFilter)),
    [activeFilter]
  );

  return (
    <section id="projects" className="section-py relative bg-surface-light dark:bg-surface-dark">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t('projectsSection.eyebrow')}
          title={t('projectsSection.title')}
          subtitle={t('projectsSection.subtitle')}
          className="mb-12"
        />

        <Reveal delay={0.1} className="mb-12 flex flex-wrap items-center justify-center gap-2.5">
          {projectFilters.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`relative rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-white'
                    : 'text-ink-dark/65 hover:text-ink-dark dark:text-ink-light/65 dark:hover:text-ink-light'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="project-filter-pill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary-500 to-secondary shadow-glow"
                    transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                  />
                )}
                <span className="relative">{t(`projectsSection.filters.${filter}`)}</span>
              </button>
            );
          })}
        </Reveal>

        <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProjectCard
                  project={project}
                  title={t(`projectsSection.items.${project.id}.title`)}
                  description={t(`projectsSection.items.${project.id}.description`)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="mt-12 text-center text-sm text-ink-dark/50 dark:text-ink-light/50">
            {t('projectsSection.noResults')}
          </p>
        )}
      </div>
    </section>
  );
}
