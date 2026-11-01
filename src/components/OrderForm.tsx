import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Send, CheckCircle2, Instagram, AlertCircle, Loader2, User, AtSign, Phone, MapPin, Link as LinkIcon, Package, Hash } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { supabase, type Order } from '@/lib/supabase';
import { sendOrderEmail } from '@/lib/web3forms';
import { INSTAGRAM_URL, wilayas } from '@/lib/translations';

type Status = 'idle' | 'submitting' | 'success' | 'error';
const MAX_LENGTHS = { fullName: 120, instagram: 100, phone: 20, city: 120, postalCode: 5, address: 300, productUrl: 500, details: 1000 } as const;

function withTimeout<T>(promise: Promise<T>, ms = 15000): Promise<T> {
  return Promise.race([promise, new Promise<T>((_, reject) => setTimeout(() => reject(new Error('Request timed out')), ms))]);
}

export default function OrderForm() {
  const { lang, t } = useLang();
  const [status, setStatus] = useState<Status>('idle');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formKey, setFormKey] = useState(0);
  const firstErrorRef = useRef<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | null>(null);
  const errorRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);

  const validate = (data: Record<string, string>) => {
    const errs: Record<string, string> = {};
    for (const field of ['fullName', 'instagram', 'phone', 'city', 'postalCode', 'address']) {
      if (!data[field]?.trim()) errs[field] = t.form.errors.required;
    }
    if (data.postalCode && !/^\d{5}$/.test(data.postalCode.trim())) errs.postalCode = t.form.errors.invalidPostalCode;
    if (!data.productUrl?.trim() && !data.details?.trim()) errs.productUrl = t.form.errors.productReference;
    if (data.productUrl && !/^https?:\/\/.+\..+/i.test(data.productUrl.trim())) errs.productUrl = t.form.errors.invalidUrl;
    if (data.phone && !/^(?:\+213|0)(?:5|6|7)\d{8}$/.test(data.phone.replace(/[\s()-]/g, ''))) errs.phone = t.form.errors.invalidPhone;
    return errs;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length) {
      firstErrorRef.current?.focus();
    }
  }, [formErrors]);
  useEffect(() => { if (status === 'error') errorRef.current?.scrollIntoView({ block: 'center', behavior: 'smooth' }); }, [status]);
  useEffect(() => { if (status === 'success') successRef.current?.focus(); }, [status]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (String(fd.get('website') ?? '').trim()) return;
    const data = Object.fromEntries(['fullName', 'instagram', 'phone', 'city', 'postalCode', 'address', 'productUrl', 'details'].map((key) => [key, String(fd.get(key) ?? '')])) as Record<string, string>;
    const errs = validate(data);
    setFormErrors(errs);
    if (Object.keys(errs).length) return;
    setStatus('submitting');
    const order: Order = { order_number: `BR-${crypto.randomUUID().replace(/-/g, '').slice(0, 8).toUpperCase()}`, full_name: data.fullName.trim(), instagram_username: data.instagram.trim().replace(/^@/, '').replace(/^https?:\/\/(?:www\.)?instagram\.com\//i, '').replace(/\?.*$/, ''), phone: data.phone.trim(), wilaya_city: data.city.trim(), postal_code: data.postalCode.trim(), delivery_address: data.address.trim(), product_url: data.productUrl.trim() || null, product_details: data.details.trim(), status: 'pending' };
    const results = await Promise.allSettled([
      withTimeout((async () => { if (!supabase) throw new Error('Supabase is not configured'); const result = await supabase.from('orders').insert(order); if (result.error) throw result.error; })()),
      withTimeout(sendOrderEmail(order)),
    ]);
    results.forEach((result, index) => { if (result.status === 'rejected') console.error(`[order] ${index === 0 ? 'Supabase' : 'Web3Forms'} failed: ${result.reason instanceof Error ? result.reason.message : 'Unknown error'}`); });
    setStatus(results.some((result) => result.status === 'fulfilled' && (result.value === undefined || result.value === true)) ? 'success' : 'error');
  };

  const reset = () => { setStatus('idle'); setFormErrors({}); setFormKey((key) => key + 1); };
  if (status === 'success') return <section id="order" className="scroll-mt-20 py-20 sm:py-28 bg-slate-50"><div className="mx-auto max-w-xl px-4 sm:px-6"><div className="rounded-3xl bg-white p-8 sm:p-10 text-center shadow-xl shadow-slate-900/5 ring-1 ring-slate-100"><div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-100"><CheckCircle2 className="h-12 w-12 text-teal-700" /></div><h2 ref={successRef} tabIndex={-1} className="mt-6 text-2xl sm:text-3xl font-bold text-slate-900">{t.success.title}</h2><p className="mt-3 text-slate-600 leading-relaxed">{t.success.message}</p><div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center"><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-700 via-pink-700 to-amber-700 px-6 py-3 text-base font-semibold text-white shadow-lg"><Instagram className="h-5 w-5" />{t.success.instagramBtn}</a><button type="button" onClick={reset} className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-base font-semibold text-slate-700">{t.success.newOrder}</button></div></div></div></section>;

  const fields = [
    ['fullName', t.form.fields.fullName, t.form.fields.fullNamePlaceholder, User, 'text', true, false, 'name'], ['instagram', t.form.fields.instagram, t.form.fields.instagramPlaceholder, AtSign, 'text', true, false, 'username'], ['phone', t.form.fields.phone, t.form.fields.phonePlaceholder, Phone, 'tel', true, false, 'tel'], ['city', t.form.fields.city, t.form.fields.cityPlaceholder, MapPin, 'text', true, false, 'address-level1'], ['postalCode', t.form.fields.postalCode, t.form.fields.postalCodePlaceholder, Hash, 'text', true, false, 'postal-code'], ['address', t.form.fields.address, t.form.fields.addressPlaceholder, MapPin, 'text', true, true, 'street-address'], ['productUrl', t.form.fields.productUrl, t.form.fields.productUrlPlaceholder, LinkIcon, 'url', false, true, 'url'], ['details', t.form.fields.details, t.form.fields.detailsPlaceholder, Package, 'text', false, true, 'off'],
  ] as const;
  return <section id="order" className="scroll-mt-20 py-20 sm:py-28 bg-slate-50"><div className="mx-auto max-w-3xl px-4 sm:px-6"><div className="text-center mb-10"><h2 className="text-3xl sm:text-4xl font-bold text-slate-900">{t.form.title}</h2><p className="mt-3 text-slate-600">{t.form.subtitle}</p></div><form key={formKey} onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 sm:p-8 shadow-xl shadow-slate-900/5 ring-1 ring-slate-100 space-y-5" noValidate>
    <input name="website" tabIndex={-1} aria-hidden="true" autoComplete="off" className="sr-only" />
    {status === 'error' && <div ref={errorRef} role="alert" className="flex items-start gap-3 rounded-xl bg-red-50 p-4 text-red-700 ring-1 ring-red-200"><AlertCircle className="h-5 w-5 shrink-0 mt-0.5" /><div><p className="font-semibold">{t.error.title}</p><p className="text-sm">{t.error.message}</p></div></div>}
    <div className="grid gap-5 sm:grid-cols-2">{fields.map(([name, label, placeholder, Icon, type, required, full, autocomplete]) => { const invalid = Boolean(formErrors[name]); const describedBy = invalid ? `${name}-error` : undefined; return <div key={name} className={full ? 'sm:col-span-2' : ''}><label htmlFor={name} className="block text-sm font-medium text-slate-700 mb-1.5">{label}{required && <span aria-hidden="true" className="text-red-500 ms-1">*</span>}</label><div className="relative"><span className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5 text-slate-500"><Icon className="h-5 w-5" /></span>{name === 'city' ? <select ref={(el) => { if (invalid) firstErrorRef.current = el; }} id={name} name={name} defaultValue="" required={required} aria-required={required} aria-invalid={invalid} aria-describedby={describedBy} autoComplete={autocomplete} className={`w-full appearance-none rounded-xl border bg-white ps-11 pe-4 py-3 text-sm text-slate-900 ${invalid ? 'border-red-300 bg-red-50/30' : 'border-slate-200'}`}><option value="" disabled>{placeholder}</option>{wilayas.map((wilaya) => <option key={wilaya.code} value={`${wilaya.code} - ${wilaya.ar} - ${wilaya.fr}`}>{wilaya.code} - {lang === 'ar' ? wilaya.ar : wilaya.fr}</option>)}</select> : name === 'details' ? <textarea ref={(el) => { if (invalid) firstErrorRef.current = el; }} id={name} name={name} rows={3} maxLength={MAX_LENGTHS[name]} placeholder={placeholder} required={required} aria-required={required} aria-invalid={invalid} aria-describedby={describedBy} autoComplete={autocomplete} className={`w-full rounded-xl border ps-11 pe-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 ${invalid ? 'border-red-300 bg-red-50/30' : 'border-slate-200'}`} /> : <input ref={(el) => { if (invalid) firstErrorRef.current = el; }} id={name} name={name} type={type} maxLength={MAX_LENGTHS[name]} max={name === 'phone' ? undefined : undefined} inputMode={name === 'postalCode' ? 'numeric' : name === 'phone' ? 'tel' : undefined} placeholder={placeholder} required={required} aria-required={required} aria-invalid={invalid} aria-describedby={describedBy} autoComplete={autocomplete} className={`w-full rounded-xl border ps-11 pe-4 py-3 text-sm text-slate-900 placeholder:text-slate-500 ${invalid ? 'border-red-300 bg-red-50/30' : 'border-slate-200'}`} />}</div>{invalid && <p id={describedBy} className="mt-1.5 text-xs text-red-600">{formErrors[name]}</p>}</div>; })}</div>
    <button type="submit" disabled={status === 'submitting'} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-700 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-teal-700/25 transition hover:bg-teal-700 disabled:opacity-60 disabled:cursor-not-allowed">{status === 'submitting' ? <><Loader2 className="h-5 w-5 animate-spin" />{t.form.submitting}</> : <><Send className="h-5 w-5" />{t.form.submit}</>}</button>
  </form></div></section>;
}
