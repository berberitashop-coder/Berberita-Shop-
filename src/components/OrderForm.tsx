import { useState, type FormEvent } from 'react';
import { Send, CheckCircle2, Instagram, AlertCircle, Loader2, User, AtSign, Phone, MapPin, Link as LinkIcon, Package, ImagePlus, Hash } from 'lucide-react';
import { useLang } from '@/lib/LanguageContext';
import { supabase, type Order } from '@/lib/supabase';
import { sendOrderEmail } from '@/lib/web3forms';
import { INSTAGRAM_URL, wilayas } from '@/lib/translations';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const IMAGE_EXTENSIONS: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

export default function OrderForm() {
  const { lang, t } = useLang();
  const [status, setStatus] = useState<Status>('idle');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [selectedFileName, setSelectedFileName] = useState('');
  const [formKey, setFormKey] = useState(0);

  const validate = (data: Record<string, string>, image: File | null) => {
    const errs: Record<string, string> = {};
    const required = ['fullName', 'instagram', 'phone', 'city', 'postalCode', 'address'];
    for (const f of required) {
      if (!data[f]?.trim()) {
        errs[f] = t.form.errors.required;
      }
    }
    if (data.postalCode && !/^\d{5}$/.test(data.postalCode.trim())) {
      errs.postalCode = t.form.errors.invalidPostalCode;
    }
    if (!data.productUrl?.trim() && !image) {
      errs.productUrl = t.form.errors.required;
    }
    if (data.productUrl && !/^https?:\/\/.+\..+/i.test(data.productUrl.trim())) {
      errs.productUrl = t.form.errors.invalidUrl;
    }
    if (image && !IMAGE_EXTENSIONS[image.type]) {
      errs.productImage = t.form.errors.invalidImage;
    }
    if (image && image.size > MAX_IMAGE_SIZE) {
      errs.productImage = t.form.errors.imageTooLarge;
    }
    if (data.phone && !/^[+\d\s()-]{6,}$/.test(data.phone.trim())) {
      errs.phone = t.form.errors.invalidPhone;
    }
    return errs;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data: Record<string, string> = {
      fullName: String(fd.get('fullName') ?? ''),
      instagram: String(fd.get('instagram') ?? ''),
      phone: String(fd.get('phone') ?? ''),
      city: String(fd.get('city') ?? ''),
      postalCode: String(fd.get('postalCode') ?? ''),
      address: String(fd.get('address') ?? ''),
      productUrl: String(fd.get('productUrl') ?? ''),
      details: String(fd.get('details') ?? ''),
    };
    const selectedImage = fd.get('productImage');
    const image = selectedImage instanceof File && selectedImage.size > 0 ? selectedImage : null;

    const errs = validate(data, image);
    setFormErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setStatus('submitting');
    const order: Order = {
      full_name: data.fullName.trim(),
      instagram_username: data.instagram.trim().replace(/^@/, ''),
      phone: data.phone.trim(),
      wilaya_city: data.city.trim(),
      postal_code: data.postalCode.trim(),
      delivery_address: data.address.trim(),
      product_url: data.productUrl.trim() || null,
      product_details: data.details.trim(),
    };

    let savedToDatabase = false;
    try {
      if (image) {
        const extension = IMAGE_EXTENSIONS[image.type];
        const imagePath = `products/${crypto.randomUUID()}.${extension}`;
        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(imagePath, image, { contentType: image.type, upsert: false });
        if (!uploadError) order.product_image_path = imagePath;
      }
      const { error } = await supabase.from('orders').insert(order);
      savedToDatabase = !error;
    } catch {
      savedToDatabase = false;
    }

    const emailSent = await sendOrderEmail(order, image?.name);

    setStatus(emailSent || savedToDatabase ? 'success' : 'error');
  };

  const reset = () => {
    setStatus('idle');
    setFormErrors({});
    setSelectedFileName('');
    setFormKey((key) => key + 1);
  };

  // Success state
  if (status === 'success') {
    return (
      <section id="order" className="scroll-mt-20 py-20 sm:py-28 bg-slate-50">
        <div className="mx-auto max-w-xl px-4 sm:px-6">
          <div className="rounded-3xl bg-white p-8 sm:p-10 text-center shadow-xl shadow-slate-900/5 ring-1 ring-slate-100">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-teal-100">
              <CheckCircle2 className="h-12 w-12 text-teal-600" />
            </div>
            <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-slate-900">{t.success.title}</h2>
            <p className="mt-3 text-slate-600 leading-relaxed">{t.success.message}</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fuchsia-600 via-pink-600 to-amber-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-pink-500/30 transition hover:shadow-pink-500/50"
              >
                <Instagram className="h-5 w-5" />
                {t.success.instagramBtn}
              </a>
              <button
                type="button"
                onClick={reset}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-6 py-3 text-base font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                {t.success.newOrder}
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  const fields: {
    name: string; label: string; placeholder: string; icon: typeof User;
    type: string; required: boolean; full?: boolean; textarea?: boolean;
  }[] = [
    { name: 'fullName', label: t.form.fields.fullName, placeholder: t.form.fields.fullNamePlaceholder, icon: User, type: 'text', required: true },
    { name: 'instagram', label: t.form.fields.instagram, placeholder: t.form.fields.instagramPlaceholder, icon: AtSign, type: 'text', required: true },
    { name: 'phone', label: t.form.fields.phone, placeholder: t.form.fields.phonePlaceholder, icon: Phone, type: 'tel', required: true },
    { name: 'city', label: t.form.fields.city, placeholder: t.form.fields.cityPlaceholder, icon: MapPin, type: 'text', required: true },
    { name: 'postalCode', label: t.form.fields.postalCode, placeholder: t.form.fields.postalCodePlaceholder, icon: Hash, type: 'text', required: true },
    { name: 'address', label: t.form.fields.address, placeholder: t.form.fields.addressPlaceholder, icon: MapPin, type: 'text', required: true, full: true },
    { name: 'productUrl', label: t.form.fields.productUrl, placeholder: t.form.fields.productUrlPlaceholder, icon: LinkIcon, type: 'url', required: false, full: true },
    { name: 'details', label: t.form.fields.details, placeholder: t.form.fields.detailsPlaceholder, icon: Package, type: 'text', required: false, full: true, textarea: true },
  ];

  return (
    <section id="order" className="scroll-mt-20 py-20 sm:py-28 bg-slate-50">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">{t.form.title}</h2>
          <p className="mt-3 text-slate-600">{t.form.subtitle}</p>
        </div>

        <form
          key={formKey}
          onSubmit={handleSubmit}
          className="rounded-3xl bg-white p-6 sm:p-8 shadow-xl shadow-slate-900/5 ring-1 ring-slate-100 space-y-5"
          noValidate
        >
          {status === 'error' && (
            <div className="flex items-start gap-3 rounded-xl bg-red-50 p-4 text-red-700 ring-1 ring-red-200">
              <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold">{t.error.title}</p>
                <p className="text-sm">{t.error.message}</p>
              </div>
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            {fields.map((f) => (
              <div key={f.name} className={f.full ? 'sm:col-span-2' : ''}>
                <label htmlFor={f.name} className="block text-sm font-medium text-slate-700 mb-1.5">
                  {f.label}
                  {f.required && <span className="text-red-500 ms-1">*</span>}
                </label>
                <div className="relative">
                  <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5 text-slate-400">
                    <f.icon className="h-5 w-5" />
                  </span>
                  {f.name === 'city' ? (
                    <select
                      id={f.name}
                      name={f.name}
                      defaultValue=""
                      className={`w-full appearance-none rounded-xl border bg-white ps-11 pe-4 py-3 text-sm text-slate-900 transition focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 ${
                        formErrors[f.name] ? 'border-red-300 bg-red-50/30' : 'border-slate-200'
                      }`}
                    >
                      <option value="" disabled>{f.placeholder}</option>
                      {wilayas.map((wilaya) => (
                        <option key={wilaya.code} value={`${wilaya.code} - ${wilaya.ar} - ${wilaya.fr}`}>
                          {wilaya.code} - {lang === 'ar' ? wilaya.ar : wilaya.fr}
                        </option>
                      ))}
                    </select>
                  ) : f.textarea ? (
                    <textarea
                      id={f.name}
                      name={f.name}
                      rows={3}
                      placeholder={f.placeholder}
                      className={`w-full rounded-xl border ps-11 pe-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 ${
                        formErrors[f.name] ? 'border-red-300 bg-red-50/30' : 'border-slate-200'
                      }`}
                    />
                  ) : (
                    <input
                      id={f.name}
                      name={f.name}
                      type={f.type}
                      placeholder={f.placeholder}
                      className={`w-full rounded-xl border ps-11 pe-4 py-3 text-sm text-slate-900 placeholder:text-slate-400 transition focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 ${
                        formErrors[f.name] ? 'border-red-300 bg-red-50/30' : 'border-slate-200'
                      }`}
                    />
                  )}
                </div>
                {formErrors[f.name] && (
                  <p className="mt-1.5 text-xs text-red-600">{formErrors[f.name]}</p>
                )}
              </div>
            ))}
          </div>

          <div>
            <label htmlFor="productImage" className="block text-sm font-medium text-slate-700 mb-1.5">
              {t.form.fields.productImage}
            </label>
            <div className={`relative rounded-xl border border-dashed transition focus-within:ring-2 focus-within:ring-teal-500/40 focus-within:border-teal-500 ${
              formErrors.productImage ? 'border-red-300 bg-red-50/30' : 'border-slate-300'
            }`}>
              <span className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5 text-slate-400">
                <ImagePlus className="h-5 w-5" />
              </span>
              <input
                id="productImage"
                name="productImage"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={(event) => setSelectedFileName(event.target.files?.[0]?.name ?? '')}
                className="w-full cursor-pointer rounded-xl px-3 py-3 ps-11 text-sm text-slate-600 file:me-3 file:rounded-lg file:border-0 file:bg-teal-50 file:px-3 file:py-2 file:font-medium file:text-teal-700 hover:file:bg-teal-100"
              />
            </div>
            <p className="mt-1.5 text-xs text-slate-500">
              {selectedFileName || t.form.fields.productImageHint}
            </p>
            {formErrors.productImage && (
              <p className="mt-1.5 text-xs text-red-600">{formErrors.productImage}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-teal-600/25 transition hover:bg-teal-700 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                {t.form.submitting}
              </>
            ) : (
              <>
                <Send className="h-5 w-5" />
                {t.form.submit}
              </>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
