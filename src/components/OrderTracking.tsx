import { FormEvent, useState } from 'react';
import { Search, PackageCheck, Loader2 } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { supabase } from '@/lib/supabase';

const STATUS_ORDER = ['pending', 'paid', 'ordered', 'shipped', 'arrived'];

export default function OrderTracking() {
  const { t } = useLang();
  const [result, setResult] = useState<{ order_number: string; status: string } | null>(null);
  const [state, setState] = useState<'idle' | 'loading' | 'not-found' | 'error'>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setState('loading');
    setResult(null);
    if (!supabase) { setState('error'); return; }
    const { data: rows, error } = await supabase.rpc('track_order', {
      p_order_number: String(data.get('orderNumber') ?? '').trim(),
      p_phone: String(data.get('phone') ?? '').trim(),
    });
    if (error) {
      console.error('[tracking] lookup failed:', error.message);
      setState('error');
      return;
    }
    const match = Array.isArray(rows) ? rows[0] : null;
    if (!match) { setState('not-found'); return; }
    setResult(match);
    setState('idle');
  };

  const currentIndex = result ? Math.max(0, STATUS_ORDER.indexOf(result.status)) : -1;
  return <section id="tracking" className="scroll-mt-20 bg-slate-50 py-20 sm:py-28"><div className="mx-auto max-w-3xl px-4 sm:px-6"><div className="text-center"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-700"><PackageCheck className="h-7 w-7" /></div><h2 className="mt-5 text-3xl font-bold text-slate-900">{t.tracking.title}</h2><p className="mx-auto mt-3 max-w-xl text-slate-600">{t.tracking.subtitle}</p></div><form onSubmit={handleSubmit} className="mx-auto mt-8 grid max-w-xl gap-4 rounded-3xl bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-slate-100 sm:grid-cols-[1fr_1fr_auto] sm:items-end"><label className="block text-sm font-medium text-slate-700">{t.tracking.orderNumber}<input name="orderNumber" required maxLength={20} placeholder={t.tracking.orderNumberPlaceholder} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm uppercase outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20" /></label><label className="block text-sm font-medium text-slate-700">{t.tracking.phone}<input name="phone" required maxLength={20} inputMode="tel" placeholder={t.tracking.phonePlaceholder} className="mt-1.5 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20" /></label><button disabled={state === 'loading'} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-teal-700 px-5 font-semibold text-white disabled:opacity-60">{state === 'loading' ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}{state === 'loading' ? t.tracking.loading : t.tracking.search}</button>{(state === 'not-found' || state === 'error') && <p role="alert" className="text-sm text-red-600 sm:col-span-3">{t.tracking.notFound}</p>}</form><p className="mt-3 text-center text-xs text-slate-500">{t.tracking.privacy}</p>{result && <div className="mt-8 rounded-3xl bg-white p-6 shadow-xl shadow-slate-900/5 ring-1 ring-slate-100"><p className="text-center text-sm font-semibold text-slate-700">{result.order_number}</p><ol className="mt-6 grid gap-3 sm:grid-cols-5" aria-label={t.tracking.title}>{STATUS_ORDER.map((status, index) => <li key={status} className={`rounded-xl p-3 text-center text-sm ${index <= currentIndex ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-500'}`}><span className="block font-semibold">{t.tracking.statuses[status]}</span>{index === currentIndex && <span className="mt-1 block text-xs opacity-90">{t.tracking.statuses[status]}</span>}</li>)}</ol></div>}</div></section>;
}
