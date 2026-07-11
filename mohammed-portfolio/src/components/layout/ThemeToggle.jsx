import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../i18n/LanguageContext';

export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={t('common.toggleTheme')}
      title={t('common.toggleTheme')}
      className={`relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-ink-dark/10 bg-ink-dark/[0.03] text-ink-dark transition-colors hover:bg-ink-dark/[0.07] dark:border-white/10 dark:bg-white/5 dark:text-ink-light dark:hover:bg-white/10 ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.span
            key="moon"
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex"
          >
            <Moon className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </motion.span>
        ) : (
          <motion.span
            key="sun"
            initial={{ rotate: 90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: -90, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="flex"
          >
            <Sun className="h-[18px] w-[18px]" strokeWidth={1.8} />
          </motion.span>
        )}
      </AnimatePresence>
    </button>
  );
}
