import { useEffect, useState } from 'react';
import { Menu, FileDown } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { useActiveSection } from '../../hooks/useActiveSection';
import { profile } from '../../data/socials';
import ThemeToggle from './ThemeToggle';
import LanguageSwitch from './LanguageSwitch';
import MobileDrawer from './MobileDrawer';
import Button from '../ui/Button';

const SECTION_IDS = ['home', 'about', 'experience', 'skills', 'projects', 'lab', 'certificates', 'contact'];

export default function Navbar() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const activeId = useActiveSection(SECTION_IDS);

  const links = SECTION_IDS.map((id) => ({ id, label: t(`nav.${id}`) }));

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 12);
    }
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-all duration-300 ${
        scrolled
          ? 'border-b border-ink-dark/10 bg-surface-light/80 backdrop-blur-xl dark:border-white/10 dark:bg-surface-dark/70'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <a href="#main-content" className="skip-link">
        {t('nav.skipToContent')}
      </a>

      <div className="container-px mx-auto flex h-[72px] max-w-7xl items-center justify-between">
        <a href="#home" className="flex items-center gap-2.5 font-display text-lg font-semibold text-ink-dark dark:text-ink-light">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary text-sm font-bold text-white shadow-glow">
            MA
          </span>
          <span className="hidden sm:inline">{t('hero.name')}</span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                activeId === link.id
                  ? 'text-primary-600 dark:text-primary-300'
                  : 'text-ink-dark/70 hover:text-ink-dark dark:text-ink-light/70 dark:hover:text-ink-light'
              }`}
            >
              {link.label}
              {activeId === link.id && (
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-primary-500 to-secondary" />
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center gap-2 sm:flex">
            <ThemeToggle />
            <LanguageSwitch />
          </div>
          <Button
            href={profile.resumeUrl}
            download
            size="sm"
            icon={FileDown}
            className="hidden lg:inline-flex"
          >
            {t('nav.resume')}
          </Button>
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-label={t('common.openMenu')}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-dark/10 text-ink-dark dark:border-white/10 dark:text-ink-light lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} links={links} activeId={activeId} />
    </header>
  );
}
