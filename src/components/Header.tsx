import { useState, useEffect } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { href: '#home', label: t.nav.home },
    { href: '#how', label: t.nav.howItWorks },
    { href: '#order', label: t.nav.order },
    { href: '#faq', label: t.nav.faq },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Brand */}
          <a href="#home" className="flex items-center gap-2.5 shrink-0">
            <span className={`flex h-9 w-9 items-center justify-center rounded-xl ${scrolled ? 'bg-teal-600 text-white' : 'bg-white/15 text-white backdrop-blur'}`}>
              <ShoppingBag className="h-5 w-5" />
            </span>
            <span className={`font-bold text-lg ${scrolled ? 'text-slate-900' : 'text-white'}`}>
              {t.nav.brand}
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition ${
                  scrolled ? 'text-slate-600 hover:text-teal-700 hover:bg-teal-50' : 'text-white/90 hover:text-white hover:bg-white/10'
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <a
              href="#order"
              className="hidden sm:inline-flex rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-700"
            >
              {t.nav.order}
            </a>
            {/* Mobile menu toggle */}
            <button
              type="button"
              className={`md:hidden flex h-9 w-9 items-center justify-center rounded-lg ${scrolled ? 'text-slate-800 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={t.nav.menu}
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div id="mobile-navigation" className="md:hidden bg-white border-t border-slate-100 shadow-lg">
          <nav className="px-4 py-3 space-y-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-teal-50 hover:text-teal-700"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
