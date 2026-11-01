import { useEffect, useState } from 'react';
import { ArrowRight, Calculator, Loader2 } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { supabase } from '@/lib/supabase';
import { calculateEstimate, PRICING_CONFIG } from '@/lib/pricing';

type Rate = { currency: string; rate_dzd: number; updated_at: string };
const ratesPromise = supabase?.from('exchange_rates').select('currency, rate_dzd, updated_at').in('currency', ['USD', 'EUR', 'CNY']).then(({ data, error }) => { if (error) throw error; return (data ?? []) as Rate[]; });

export default function PriceEstimator() {
  const { t, lang } = useLang();
  const [rates, setRates] = useState<Rate[]>([]);
  const [unavailable, setUnavailable] = useState(!ratesPromise);
  const [currency, setCurrency] = useState('USD');
  const [amount, setAmount] = useState('');

  useEffect(() => { if (!ratesPromise) return; Promise.resolve(ratesPromise).then(setRates).catch((error: Error) => { console.error('[price-estimator] exchange rate lookup failed:', error.message); setUnavailable(true); }); }, []);
  const rate = rates.find((item) => item.currency === currency);
  const isStale = rate ? Date.now() - new Date(rate.updated_at).getTime() > PRICING_CONFIG.staleAfterDays * 24 * 60 * 60 * 1000 : true;
  const parsedAmount = amount === '' ? NaN : Number(amount);
  const estimate = rate && !isStale && parsedAmount >= 0 && parsedAmount <= PRICING_CONFIG.maxAmount ? calculateEstimate(parsedAmount * rate.rate_dzd) : null;
  const formatDzd = (value: number) => new Intl.NumberFormat(lang === 'ar' ? 'ar-DZ-u-nu-latn' : lang === 'fr' ? 'fr-DZ' : 'en-US', { maximumFractionDigits: 2 }).format(value);
  const message = unavailable || !rate || isStale ? t.estimator.unavailable : null;
  return <section id="estimator" className="scroll-mt-20 bg-white py-20 sm:py-28"><div className="mx-auto max-w-5xl px-4 sm:px-6"><div className="mx-auto max-w-2xl text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-700"><Calculator className="h-7 w-7" /></div><h2 className="mt-5 text-3xl font-bold text-slate-900">{t.estimator.title}</h2><p className="mt-3 text-slate-600">{t.estimator.subtitle}</p></div><div className="mx-auto mt-10 max-w-3xl rounded-3xl bg-slate-50 p-6 shadow-xl shadow-slate-900/5 ring-1 ring-slate-100 sm:p-8"><div className="grid gap-5 sm:grid-cols-[1fr_180px]"><label className="block text-sm font-semibold text-slate-700">{t.estimator.amountLabel}<input type="number" min="0" max={PRICING_CONFIG.maxAmount} step="0.01" inputMode="decimal" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="0.00" className="mt-2 min-h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 placeholder:text-slate-500 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20" /><span className="mt-1.5 block text-xs font-normal text-slate-500">{t.estimator.amountHint}</span></label><label className="block text-sm font-semibold text-slate-700">{t.estimator.currencyLabel}<select value={currency} onChange={(event) => setCurrency(event.target.value)} className="mt-2 min-h-11 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-slate-900 outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20">{(rates.length ? rates : [{ currency: 'USD' }, { currency: 'EUR' }, { currency: 'CNY' }]).map((item) => <option key={item.currency}>{item.currency}</option>)}</select></label></div><div aria-live="polite" className="mt-6 rounded-2xl bg-white p-5 ring-1 ring-slate-200">{rates.length === 0 && !unavailable ? <div className="flex items-center gap-2 text-slate-500"><Loader2 className="h-4 w-4 animate-spin" />{t.estimator.loading}</div> : message ? <p className="text-sm leading-relaxed text-slate-600">{message}</p> : estimate && rate ? <div><p className="text-sm text-slate-600">{formatDzd(parsedAmount * rate.rate_dzd)} DA + {formatDzd(estimate.commissionDzd)} DA = <strong className="text-lg text-slate-900">{formatDzd(estimate.totalDzd)} DA</strong></p><p className="mt-2 text-xs text-slate-500">{t.estimator.updated} {new Intl.DateTimeFormat(lang === 'ar' ? 'ar-DZ' : lang === 'fr' ? 'fr-DZ' : 'en-US').format(new Date(rate.updated_at))} · {t.estimator.disclaimer}</p></div> : <p className="text-sm text-slate-500">{t.estimator.enterAmount}</p>}</div><a href="#order" className="mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:bg-teal-700 sm:w-auto">{t.estimator.cta}<ArrowRight className="h-4 w-4 rtl:rotate-180" /></a></div></div></section>;
}
