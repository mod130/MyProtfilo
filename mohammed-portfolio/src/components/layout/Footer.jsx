import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { socialLinks, profile } from '../../data/socials';

const SECTION_IDS = ['home', 'about', 'experience', 'skills', 'projects', 'lab', 'certificates', 'contact'];

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <footer className="border-t border-ink-dark/10 bg-surface-light dark:border-white/10 dark:bg-surface-dark">
      <div className="container-px mx-auto max-w-7xl py-16">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <a href="#home" className="flex items-center gap-2.5 font-display text-lg font-semibold text-ink-dark dark:text-ink-light">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-secondary text-sm font-bold text-white shadow-glow">
                MA
              </span>
              {t('hero.name')}
            </a>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-dark/60 dark:text-ink-light/60">
              {t('footer.tagline')}
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socialLinks.map(({ id, label, icon: Icon, href }) => (
                <a
                  key={id}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-ink-dark/10 text-ink-dark/70 transition-colors hover:border-primary-400/40 hover:text-primary-600 dark:border-white/10 dark:text-ink-light/70 dark:hover:text-primary-300"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.8} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-ink-dark/50 dark:text-ink-light/50">
              {t('footer.quickLinks')}
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {SECTION_IDS.map((id) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    className="text-sm text-ink-dark/70 transition-colors hover:text-primary-600 dark:text-ink-light/70 dark:hover:text-primary-300"
                  >
                    {t(`nav.${id}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-ink-dark/50 dark:text-ink-light/50">
              {t('footer.getInTouch')}
            </h3>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-ink-dark/70 dark:text-ink-light/70">
              <li>
                <a href={`mailto:${profile.email}`} className="hover:text-primary-600 dark:hover:text-primary-300">
                  {profile.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${profile.phone.replace(/\s+/g, '')}`}
                  className="hover:text-primary-600 dark:hover:text-primary-300"
                >
                  {profile.phone}
                </a>
              </li>
              <li>{profile.location}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-ink-dark/10 pt-8 text-xs text-ink-dark/50 dark:border-white/10 dark:text-ink-light/50 sm:flex-row">
          <p>
            © {year} {t('hero.name')} — {t('footer.rights')}
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 rounded-full border border-ink-dark/10 px-3.5 py-1.5 font-medium text-ink-dark/60 transition-colors hover:border-primary-400/40 hover:text-primary-600 dark:border-white/10 dark:text-ink-light/60 dark:hover:text-primary-300"
          >
            {t('common.backToTop')}
            <ArrowUp className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
