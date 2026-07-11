import { Languages } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export default function LanguageSwitch({ className = '' }) {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      aria-label={t('common.toggleLanguage')}
      title={t('common.toggleLanguage')}
      className={`flex h-10 items-center gap-1.5 rounded-full border border-ink-dark/10 bg-ink-dark/[0.03] px-3 text-sm font-semibold text-ink-dark transition-colors hover:bg-ink-dark/[0.07] dark:border-white/10 dark:bg-white/5 dark:text-ink-light dark:hover:bg-white/10 ${className}`}
    >
      <Languages className="h-[16px] w-[16px]" strokeWidth={1.8} />
      <span className="font-mono text-xs tracking-wide">{language === 'en' ? 'EN' : 'AR'}</span>
    </button>
  );
}
