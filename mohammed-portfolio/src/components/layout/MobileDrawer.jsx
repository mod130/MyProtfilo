import { AnimatePresence, motion } from 'framer-motion';
import { X, FileDown } from 'lucide-react';
import { useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import ThemeToggle from './ThemeToggle';
import LanguageSwitch from './LanguageSwitch';
import { profile } from '../../data/socials';

export default function MobileDrawer({ open, onClose, links, activeId }) {
  const { t, isRtl } = useLanguage();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const drawerSide = isRtl ? { left: 0 } : { right: 0 };
  const initialX = isRtl ? '-100%' : '100%';

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
          <motion.div
            key="drawer"
            initial={{ x: initialX }}
            animate={{ x: 0 }}
            exit={{ x: initialX }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'fixed', top: 0, bottom: 0, ...drawerSide, width: 'min(85vw, 360px)' }}
            className="z-50 flex flex-col border-ink-dark/10 bg-surface-light shadow-2xl dark:border-white/10 dark:bg-surface-dark-elevated lg:hidden"
            role="dialog"
            aria-modal="true"
            aria-label={t('nav.home')}
          >
            <div className="flex items-center justify-between border-b border-ink-dark/10 px-6 py-5 dark:border-white/10">
              <span className="font-display text-lg font-semibold text-ink-dark dark:text-ink-light">
                {t('hero.name')}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label={t('common.closeMenu')}
                className="flex h-9 w-9 items-center justify-center rounded-full text-ink-dark/70 hover:bg-ink-dark/5 dark:text-ink-light/70 dark:hover:bg-white/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-4 py-6">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={onClose}
                  className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                    activeId === link.id
                      ? 'bg-primary-500/10 text-primary-600 dark:text-primary-300'
                      : 'text-ink-dark/75 hover:bg-ink-dark/5 dark:text-ink-light/75 dark:hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="border-t border-ink-dark/10 px-6 py-5 dark:border-white/10">
              <a
                href={profile.resumeUrl}
                download
                className="mb-4 flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary px-5 py-3 text-sm font-semibold text-white shadow-glow"
              >
                <FileDown className="h-4 w-4" />
                {t('nav.resume')}
              </a>
              <div className="flex items-center justify-between gap-3">
                <ThemeToggle className="flex-1" />
                <LanguageSwitch className="flex-1 justify-center" />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
