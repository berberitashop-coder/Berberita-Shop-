import { Instagram, ShoppingBag, Heart } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { INSTAGRAM_URL } from '@/lib/translations';

export default function Footer() {
  const { t } = useLang();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center gap-6 text-center">
          <a href="#home" className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white">
              <ShoppingBag className="h-5 w-5" />
            </span>
            <span className="font-bold text-lg text-white">{t.nav.brand}</span>
          </a>

          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-amber-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-pink-500/20 transition hover:shadow-pink-500/40"
          >
            <Instagram className="h-5 w-5" />
            {t.footer.followInstagram}
          </a>

          <p className="flex items-center gap-1.5 text-sm text-slate-400">
            {t.footer.madeWith}
            <Heart className="h-4 w-4 text-pink-500 fill-pink-500" />
          </p>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-6 text-center text-sm text-slate-500">
          © {year} {t.nav.brand}. {t.footer.rights}.
        </div>
      </div>
    </footer>
  );
}
