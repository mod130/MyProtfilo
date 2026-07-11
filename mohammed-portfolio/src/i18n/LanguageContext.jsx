import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import en from './en.json';
import ar from './ar.json';

const STORAGE_KEY = 'mohammed-portfolio-lang';

const dictionaries = { en, ar };

const LanguageContext = createContext(null);

function getFromPath(obj, path) {
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : undefined), obj);
}

function detectInitialLanguage() {
  if (typeof window === 'undefined') return 'en';

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === 'en' || stored === 'ar') return stored;
  } catch {
    // localStorage may be unavailable (privacy mode) — fall back silently.
  }

  const browserLang = (navigator.language || navigator.userLanguage || 'en').toLowerCase();
  return browserLang.startsWith('ar') ? 'ar' : 'en';
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(detectInitialLanguage);

  const dir = language === 'ar' ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    document.title = getFromPath(dictionaries[language], 'meta.title') || document.title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', getFromPath(dictionaries[language], 'meta.description') || '');
    }
  }, [language, dir]);

  const setLanguage = useCallback((lang) => {
    if (lang !== 'en' && lang !== 'ar') return;
    setLanguageState(lang);
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Ignore storage failures — language still updates for this session.
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  }, [language, setLanguage]);

  const t = useCallback(
    (path, fallback = '') => {
      const value = getFromPath(dictionaries[language], path);
      if (value === undefined) return fallback || path;
      return value;
    },
    [language]
  );

  const value = useMemo(
    () => ({ language, dir, isRtl: dir === 'rtl', setLanguage, toggleLanguage, t }),
    [language, dir, setLanguage, toggleLanguage, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
