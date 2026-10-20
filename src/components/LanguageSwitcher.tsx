import { useEffect, useRef, useState } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { languages, type Language } from '@/lib/translations';

export default function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const current = languages.find((l) => l.code === lang)!;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20"
        aria-label="Language"
        aria-expanded={open}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{current.label}</span>
        <span className="sm:hidden">{current.code.toUpperCase()}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="absolute end-0 mt-2 w-44 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-900/10 z-50 animate-in">
          {languages.map((l) => (
            <button
              key={l.code}
              type="button"
              onClick={() => {
                setLang(l.code as Language);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between px-4 py-3 text-sm transition hover:bg-slate-50 ${
                lang === l.code ? 'bg-teal-50 text-teal-700 font-semibold' : 'text-slate-700'
              }`}
            >
              <span>{l.label}</span>
              {lang === l.code && <Check className="h-4 w-4" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
