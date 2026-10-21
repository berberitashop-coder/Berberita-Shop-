import { ClipboardList, MessageCircle, Truck, ArrowDown } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

const stepIcons = [ClipboardList, MessageCircle, Truck];

export default function Hero() {
  const { t } = useLang();

  return (
    <section id="home" className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-teal-900 to-slate-800 pt-28 pb-20 sm:pt-36 sm:pb-28">
      {/* Decorative blobs */}
      <div className="pointer-events-none absolute -top-24 -start-24 h-96 w-96 rounded-full bg-teal-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -end-20 h-96 w-96 rounded-full bg-cyan-500/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-teal-200 ring-1 ring-white/15 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-300" />
            </span>
            {t.hero.badge}
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-white tracking-tight">
            {t.hero.title}
          </h1>

          <p className="mt-5 text-lg sm:text-xl text-slate-300 leading-relaxed">
            {t.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#order"
              className="inline-flex items-center gap-2 rounded-xl bg-teal-500 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-500/30 transition hover:bg-teal-400 hover:shadow-teal-500/50"
            >
              {t.hero.cta}
              <ArrowDown className="h-4 w-4" />
            </a>
            <a
              href="#how"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-7 py-3.5 text-base font-semibold text-white backdrop-blur transition hover:bg-white/10"
            >
              {t.nav.howItWorks}
            </a>
          </div>
        </div>

        {/* Steps */}
        <div id="how" className="mt-20 scroll-mt-20">
          <h2 className="text-center text-2xl sm:text-3xl font-bold text-white">{t.hero.stepsTitle}</h2>
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {t.hero.steps.map((step, i) => {
              const Icon = stepIcons[i] ?? ClipboardList;
              return (
                <div
                  key={i}
                  className="group relative rounded-2xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur transition hover:bg-white/10 hover:ring-teal-400/40"
                >
                  <div className="flex items-center gap-3">
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-500/20 text-teal-300 ring-1 ring-teal-400/30 transition group-hover:bg-teal-500/30">
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="text-5xl font-black text-white/10 leading-none">{i + 1}</span>
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                  <p className="mt-2 text-sm text-slate-300 leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
