import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { translations, languages, type Language } from './translations';

type LangContextType = {
  lang: Language;
  dir: 'rtl' | 'ltr';
  setLang: (l: Language) => void;
  t: (typeof translations)[Language];
};

const LangContext = createContext<LangContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    let saved: string | null = null;
    try { saved = typeof window !== 'undefined' ? localStorage.getItem('app-lang') : null; } catch { saved = null; }
    if (saved === 'ar' || saved === 'fr' || saved === 'en') return saved;
    if (typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('fr')) return 'fr';
    if (typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('en')) return 'en';
    return 'ar';
  });

  const dir = useMemo(() => languages.find((l) => l.code === lang)?.dir ?? 'rtl', [lang]);

  const setLang = (l: Language) => {
    setLangState(l);
    try { if (typeof window !== 'undefined') localStorage.setItem('app-lang', l); } catch { /* storage may be unavailable */ }
  };

  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = dir;
    document.title = translations[lang].meta.title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', translations[lang].meta.description);
  }, [lang, dir]);

  const value = useMemo<LangContextType>(
    () => ({ lang, dir, setLang, t: translations[lang] }),
    [lang, dir],
  );

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
