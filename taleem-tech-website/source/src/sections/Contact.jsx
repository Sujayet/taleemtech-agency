import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from '../components/Button';
import Icon from '../components/Icons';
import SectionHeading from '../components/SectionHeading';
import { site } from '../config/site';
import { SERVICE_OPTIONS } from '../data/serviceOptions';
import { buildMessage, buildWhatsAppUrl, cleanNumber, openWhatsApp } from '../lib/whatsapp';

const EMPTY = { name: '', business: '', email: '', phone: '', service: '', message: '' };
const MAX_MESSAGE = 1000; // keeps the WhatsApp link a safe length
const MAX_ENCODED = 4000;

/** Checks the form before opening WhatsApp. */
function validate(v) {
  const e = {};
  const name = v.name.trim();
  if (name.length < 2) e.name = 'Please enter your full name.';
  if (v.business.trim().length > 120) e.business = 'Keep this under 120 characters.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Enter a valid email address, like name@example.com.';
  const digits = v.phone.replace(/\D/g, '');
  if (!/^\+?[0-9\s\-()]{7,20}$/.test(v.phone.trim()) || digits.length < 7 || digits.length > 15)
    e.phone = 'Enter a phone or WhatsApp number with 7–15 digits.';
  if (!v.service) e.service = 'Choose the service you need.';
  const msg = v.message.trim();
  if (msg.length < 10) e.message = 'Tell us a little more (at least 10 characters).';
  else if (msg.length > MAX_MESSAGE) e.message = `Keep the message under ${MAX_MESSAGE} characters.`;
  // Non-English text takes more space in a link, so also check the encoded length.
  else if (encodeURIComponent(buildMessage(v)).length > MAX_ENCODED) e.message = 'This message is too long to send on WhatsApp. Please shorten it.';
  return e;
}

const inputCls =
  'w-full rounded-xl bg-white/[.04] px-4 py-3.5 text-base text-ink placeholder:text-muted/60 hairline transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/40 aria-[invalid=true]:border-red-400';

function Field({ id, label, required, error, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label} {required ? <span className="text-accent" aria-hidden="true">*</span> : <span className="font-normal text-muted">(optional)</span>}
        {required && <span className="sr-only"> required</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-300">
          {error}
        </p>
      )}
    </div>
  );
}

export default function Contact({ draft }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | success | error
  const [waUrl, setWaUrl] = useState('');
  const [notice, setNotice] = useState('');
  const formRef = useRef(null);

  // Prefill from "Enquire" buttons elsewhere on the page.
  useEffect(() => {
    if (!draft) return;
    setValues((v) => ({ ...v, service: draft.service ?? v.service, message: draft.message ?? v.message }));
    setErrors({});
    setStatus((s) => (s === 'success' ? 'idle' : s));
  }, [draft]);

  const set = (k) => (e) => {
    setValues((v) => ({ ...v, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  // Runs synchronously so the browser lets us open WhatsApp (no pop-up blocking).
  const onSubmit = (e) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    setNotice('');
    const first = Object.keys(found)[0];
    if (first) {
      setStatus('error');
      setNotice('Please fix the highlighted fields.');
      formRef.current?.querySelector(`[name="${first}"]`)?.focus();
      return;
    }
    if (cleanNumber(site.contact.whatsapp).length < 8) {
      setStatus('error');
      setNotice('The enquiry form is not connected yet. Please contact us another way.');
      return;
    }
    const url = buildWhatsAppUrl(site.contact.whatsapp, values);
    setWaUrl(url);
    setStatus('success');
    setValues(EMPTY);
    openWhatsApp(url);
  };

  const aria = (k) => ({ 'aria-invalid': errors[k] ? 'true' : undefined, 'aria-describedby': errors[k] ? `${k}-error` : undefined });
  const details = [
    site.contact.email && { label: 'Email', value: site.contact.email, href: `mailto:${site.contact.email}` },
    site.contact.phone && { label: 'Phone', value: site.contact.phone, href: `tel:${site.contact.phone.replace(/\s/g, '')}` },
    site.contact.whatsapp && { label: 'WhatsApp', value: 'Message us', href: `https://wa.me/${site.contact.whatsapp}` },
    site.contact.address && { label: 'Location', value: site.contact.address },
  ].filter(Boolean);
  const socials = Object.entries(site.social).filter(([, url]) => url);

  return (
    <section id="contact" className="section-y">
      <div className="container-x grid gap-14 lg:grid-cols-[.85fr_1.15fr]">
        <div>
          <SectionHeading title="Tell us what you need" intro="Share a few details and your enquiry opens in WhatsApp, ready to send to us. The more you tell us, the better our first reply will be." />
          {(details.length > 0 || socials.length > 0) && (
            <dl className="mt-10 space-y-5">
              {details.map((d) => (
                <div key={d.label}>
                  <dt className="text-sm text-muted">{d.label}</dt>
                  <dd className="mt-0.5 text-lg font-semibold">
                    {d.href ? <a href={d.href} className="transition-colors hover:text-accent" {...(d.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{d.value}</a> : d.value}
                  </dd>
                </div>
              ))}
              {socials.length > 0 && (
                <div>
                  <dt className="text-sm text-muted">Follow</dt>
                  <dd className="mt-1 flex flex-wrap gap-x-5 gap-y-1 text-lg font-semibold">
                    {socials.map(([k, url]) => (
                      <a key={k} href={url} target="_blank" rel="noopener noreferrer" className="capitalize transition-colors hover:text-accent">{k}</a>
                    ))}
                  </dd>
                </div>
              )}
            </dl>
          )}
        </div>

        <div className="glass relative overflow-hidden rounded-3xl p-6 sm:p-9">
          <AnimatePresence mode="wait" initial={false}>
            {status === 'success' ? (
              <motion.div
                key="ok"
                role="status"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[26rem] flex-col items-center justify-center text-center"
              >
                <motion.span
                  initial={{ scale: 0, rotate: -40 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                  className="grid h-16 w-16 place-items-center rounded-full bg-accent text-accent-ink"
                >
                  <Icon name="check" size={32} />
                </motion.span>
                <h3 className="mt-6 text-2xl font-bold">One last step: press Send in WhatsApp</h3>
                <p className="mt-2 max-w-sm text-muted">WhatsApp should now be open with your enquiry written for you. Your enquiry reaches us only after you press Send there.</p>
                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  <Button href={waUrl} target="_blank" rel="noopener noreferrer" arrow={false}>Open WhatsApp again</Button>
                  <Button variant="secondary" arrow={false} onClick={() => { setStatus('idle'); setNotice(''); }}>Send another enquiry</Button>
                </div>
              </motion.div>
            ) : (
              <motion.form key="form" ref={formRef} onSubmit={onSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-5 sm:grid-cols-2">
                <p className="text-sm text-muted sm:col-span-2"><span className="text-accent">*</span> marks required fields.</p>

                <Field id="name" label="Full name" required error={errors.name}>
                  <input id="name" name="name" type="text" autoComplete="name" maxLength={100} value={values.name} onChange={set('name')} className={inputCls} {...aria('name')} />
                </Field>
                <Field id="business" label="Business / organisation" error={errors.business}>
                  <input id="business" name="business" type="text" autoComplete="organization" maxLength={120} value={values.business} onChange={set('business')} className={inputCls} {...aria('business')} />
                </Field>
                <Field id="email" label="Email" required error={errors.email}>
                  <input id="email" name="email" type="email" autoComplete="email" inputMode="email" maxLength={254} value={values.email} onChange={set('email')} className={inputCls} {...aria('email')} />
                </Field>
                <Field id="phone" label="Phone / WhatsApp" required error={errors.phone}>
                  <input id="phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" maxLength={20} value={values.phone} onChange={set('phone')} className={inputCls} {...aria('phone')} />
                </Field>
                <div className="sm:col-span-2">
                  <Field id="service" label="Service required" required error={errors.service}>
                    <select id="service" name="service" value={values.service} onChange={set('service')} className={`${inputCls} [&>option]:bg-surface`} {...aria('service')}>
                      <option value="">Choose a service</option>
                      {SERVICE_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </Field>
                </div>
                <div className="sm:col-span-2">
                  <Field id="message" label="Message" required error={errors.message}>
                    <textarea id="message" name="message" rows={5} maxLength={MAX_MESSAGE} value={values.message} onChange={set('message')} className={`${inputCls} resize-y`} {...aria('message')} />
                  </Field>
                </div>

                <div className="sm:col-span-2">
                  <Button type="submit" className="w-full sm:w-auto">Send enquiry on WhatsApp</Button>
                  <p className="mt-3 text-sm text-muted">This opens WhatsApp with your message ready to send.</p>
                  <div role="alert" aria-live="assertive" className="min-h-6">
                    {status === 'error' && notice && (
                      <p className="mt-4 flex items-start gap-2 rounded-xl border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-200">
                        <Icon name="alert" size={18} className="mt-0.5 shrink-0" />
                        {notice}
                      </p>
                    )}
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
