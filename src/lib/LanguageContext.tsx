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
    const saved = typeof window !== 'undefined' ? localStorage.getItem('app-lang') : null;
    if (saved === 'ar' || saved === 'fr' || saved === 'en') return saved;
    return 'ar';
  });

  const dir = useMemo(() => languages.find((l) => l.code === lang)?.dir ?? 'rtl', [lang]);

  const setLang = (l: Language) => {
    setLangState(l);
    if (typeof window !== 'undefined') localStorage.setItem('app-lang', l);
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
