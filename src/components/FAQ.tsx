import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';

export default function FAQ() {
  const { t } = useLang();
  const [open, setOpen] = useState<number | null>(0);
  return <section id="faq" className="scroll-mt-20 py-20 sm:py-28 bg-white"><div className="mx-auto max-w-3xl px-4 sm:px-6"><h2 className="text-center text-3xl sm:text-4xl font-bold text-slate-900">{t.faq.title}</h2><div className="mt-10 space-y-3">{t.faq.items.map((item, i) => { const isOpen = open === i; const panelId = `faq-panel-${i}`; const buttonId = `faq-button-${i}`; return <div key={i} className={`rounded-2xl border transition ${isOpen ? 'border-teal-200 bg-teal-50/40' : 'border-slate-200 bg-white'}`}><button id={buttonId} type="button" onClick={() => setOpen(isOpen ? null : i)} className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start" aria-expanded={isOpen} aria-controls={panelId}><span className="font-semibold text-slate-900">{item.q}</span><ChevronDown className={`h-5 w-5 shrink-0 text-teal-700 transition-transform motion-reduce:transition-none ${isOpen ? 'rotate-180' : ''}`} /></button><div id={panelId} role="region" aria-labelledby={buttonId} hidden={!isOpen} className="grid grid-rows-[1fr]"><div className="overflow-hidden"><p className="whitespace-pre-line px-5 pb-4 text-slate-600 leading-relaxed">{item.a}</p></div></div></div>; })}</div></div></section>;
}
