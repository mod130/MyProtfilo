import { useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import { ChevronDown, ExternalLink, GraduationCap, Github } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import Badge from './Badge';
import ThumbnailArt from './ThumbnailArt';

export default function ProjectCard({ project, title, description }) {
  const { t, isRtl } = useLanguage();
  const [expanded, setExpanded] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], isRtl ? [6, -6] : [-6, 6]), { stiffness: 200, damping: 20 });

  function handleMouseMove(event) {
    if (shouldReduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    x.set((event.clientX - rect.left) / rect.width - 0.5);
    y.set((event.clientY - rect.top) / rect.height - 0.5);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const Icon = project.icon;

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      className="glass-panel flex h-full flex-col overflow-hidden rounded-3xl"
    >
      <div className="relative h-48 shrink-0">
        <ThumbnailArt variant={project.art.variant} from={project.art.from} to={project.art.to} Icon={Icon} className="h-full w-full" />
        {project.isGraduation && (
          <span className="absolute top-3 start-3 inline-flex items-center gap-1.5 rounded-full bg-surface-dark/70 px-3 py-1 font-mono text-[11px] text-white backdrop-blur-md">
            <GraduationCap className="h-3.5 w-3.5" />
            {t('projectsSection.graduationBadge')}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 p-6">
        <div>
          <h3 className="font-display text-lg font-semibold text-ink-dark dark:text-ink-light sm:text-xl">{title}</h3>
          <p
            className={`mt-2 text-sm leading-relaxed text-ink-dark/65 dark:text-ink-light/65 ${
              expanded ? '' : 'line-clamp-2'
            }`}
          >
            {description}
          </p>
        </div>

        <motion.div layout className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <Badge key={tech} muted>
              {tech}
            </Badge>
          ))}
        </motion.div>

        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink-dark/10 px-3.5 py-2 text-xs font-semibold text-ink-dark/80 transition-colors hover:border-primary-400/40 hover:text-primary-600 dark:border-white/10 dark:text-ink-light/80 dark:hover:text-primary-300"
            >
              <Github className="h-3.5 w-3.5" />
              {t('common.sourceCode')}
            </a>
          )}
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-ink-dark/10 px-3.5 py-2 text-xs font-semibold text-ink-dark/80 transition-colors hover:border-primary-400/40 hover:text-primary-600 dark:border-white/10 dark:text-ink-light/80 dark:hover:text-primary-300"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              {t('common.liveDemo')}
            </a>
          )}
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            aria-expanded={expanded}
            className="ms-auto inline-flex items-center gap-1 rounded-full bg-primary-500/10 px-3.5 py-2 text-xs font-semibold text-primary-600 transition-colors hover:bg-primary-500/20 dark:text-primary-300"
          >
            {expanded ? t('common.showLess') : t('common.details')}
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
