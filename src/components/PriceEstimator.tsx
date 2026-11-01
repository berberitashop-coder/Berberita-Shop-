import { useState } from 'react';
import { ArrowRight, Calculator } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { CURRENCIES, DEFAULT_CURRENCY, PRICING_CONFIG, estimateFromForeignAmount, type Currency } from '@/lib/pricing';

export default function PriceEstimator() {
  const { t, lang } = useLang();
  const [currency, setCurrency] = useState<Currency>(DEFAULT_CURRENCY);
  const [amount, setAmount] = useState('');

  const parsedAmount = amount === '' ? NaN : Number(amount);
  const estimate = parsedAmount >= 0 && parsedAmount <= PRICING_CONFIG.maxAmount ? estimateFromForeignAmount(parsedAmount, currency) : null;
  const formatDzd = (value: number) =>
    new Intl.NumberFormat(lang === 'ar' ? 'ar-DZ-u-nu-latn' : lang === 'fr' ? 'fr-DZ' : 'en-US', { maximumFractionDigits: 0 }).format(value);

  return (
    <section id="estimator" className="scroll-mt-20 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-700">
            <Calculator className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-3xl font-bold text-slate-900">{t.estimator.title}</h2>
          <p className="mt-3 text-slate-600">{t.estimator.subtitle}</p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-slate-50 p-6 shadow-xl shadow-slate-900/5 ring-1 ring-slate-100 sm:p-8">
          <fieldset>
            <legend className="text-sm font-semibold text-slate-700">{t.estimator.currencyLabel}</legend>
            <div className="mt-2 grid grid-cols-2 gap-3">
              {CURRENCIES.map((code) => (
                <label key={code} className="relative block cursor-pointer">
                  <input
                    type="radio"
                    name="estimator-currency"
                    value={code}
                    checked={currency === code}
                    onChange={() => setCurrency(code)}
                    className="peer sr-only"
                  />
                  <span className="flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 font-semibold text-slate-700 transition peer-checked:border-teal-700 peer-checked:bg-teal-700 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-teal-700/40">
                    {code}
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="mt-5 block text-sm font-semibold text-slate-700">
            {t.estimator.amountLabel}
            <input
              type="number"
              min="0"
              max={PRICING_CONFIG.maxAmount}
              step="0.01"
              inputMode="decimal"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              placeholder="0.00"
              className="mt-2 min-h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20"
            />
            <span className="mt-1.5 block text-xs font-normal text-slate-500">{t.estimator.amountHint}</span>
          </label>

          <div aria-live="polite" className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-slate-200">
            {estimate ? (
              <div>
                <p className="text-sm text-slate-600">{t.estimator.approxLabel}</p>
                <p className="mt-1 text-3xl font-bold text-slate-900">
                  <span dir="ltr">≈ {formatDzd(estimate.totalDzd)} DA</span>
                </p>
                <p className="mt-2 text-xs leading-relaxed text-slate-500">{t.estimator.disclaimer}</p>
              </div>
            ) : (
              <p className="text-sm text-slate-500">{t.estimator.enterAmount}</p>
            )}
          </div>

          <a
            href="#order"
            className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-800 sm:w-auto"
          >
            {t.estimator.cta}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </a>
        </div>
      </div>
    </section>
  );
}
