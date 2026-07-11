import { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { contactDetails, socialLinks, profile } from '../../data/socials';
import Reveal from '../ui/Reveal';
import SectionHeading from '../ui/SectionHeading';

const CONTACT_ENDPOINT = import.meta.env.VITE_CONTACT_ENDPOINT || '';
const EMAIL_ADDRESS = import.meta.env.VITE_CONTACT_EMAIL || profile.email;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const { t } = useLanguage();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | mailto | error

  function validate(values) {
    const nextErrors = {};
    if (!values.name.trim()) nextErrors.name = t('contactSection.form.errors.nameRequired');
    if (!values.email.trim()) {
      nextErrors.email = t('contactSection.form.errors.emailRequired');
    } else if (!EMAIL_REGEX.test(values.email.trim())) {
      nextErrors.email = t('contactSection.form.errors.emailInvalid');
    }
    if (!values.subject.trim()) nextErrors.subject = t('contactSection.form.errors.subjectRequired');
    if (!values.message.trim()) {
      nextErrors.message = t('contactSection.form.errors.messageRequired');
    } else if (values.message.trim().length < 10) {
      nextErrors.message = t('contactSection.form.errors.messageMinLength');
    }
    return nextErrors;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setStatus('submitting');

    if (CONTACT_ENDPOINT) {
      try {
        const response = await fetch(CONTACT_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!response.ok) throw new Error('Request failed');
        setStatus('success');
        setForm(initialForm);
      } catch {
        setStatus('error');
      }
      return;
    }

    // No backend configured — fall back to opening the visitor's email
    // client with the message pre-filled, so the form still works.
    const body = `${form.message}\n\n— ${form.name} (${form.email})`;
    const mailtoUrl = `mailto:${EMAIL_ADDRESS}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    setStatus('mailto');
    setForm(initialForm);
  }

  const fields = [
    { name: 'name', type: 'text', label: t('contactSection.form.name'), placeholder: t('contactSection.form.namePlaceholder') },
    { name: 'email', type: 'email', label: t('contactSection.form.email'), placeholder: t('contactSection.form.emailPlaceholder') },
  ];

  return (
    <section id="contact" className="section-py relative bg-surface-light dark:bg-surface-dark">
      <div className="container-px mx-auto max-w-7xl">
        <SectionHeading
          eyebrow={t('contactSection.eyebrow')}
          title={t('contactSection.title')}
          subtitle={t('contactSection.subtitle')}
          className="mb-16"
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal direction="left" className="flex flex-col gap-4">
            <div className="glass-panel rounded-3xl p-7">
              <h3 className="mb-5 font-display text-base font-semibold text-ink-dark dark:text-ink-light">
                {t('contactSection.infoTitle')}
              </h3>
              <ul className="flex flex-col gap-4">
                {contactDetails.map((detail) => (
                  <li key={detail.id} className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-500/10 text-primary-600 dark:text-primary-300">
                      <detail.icon className="h-4 w-4" strokeWidth={1.8} />
                    </span>
                    <div className="flex flex-col leading-tight">
                      <span className="text-[11px] uppercase tracking-wide text-ink-dark/45 dark:text-ink-light/45">
                        {t(`contactSection.${detail.label}`)}
                      </span>
                      {detail.href ? (
                        <a
                          href={detail.href}
                          className="truncate text-sm font-medium text-ink-dark hover:text-primary-600 dark:text-ink-light dark:hover:text-primary-300"
                        >
                          {detail.value}
                        </a>
                      ) : (
                        <span className="truncate text-sm font-medium text-ink-dark dark:text-ink-light">
                          {detail.value}
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-panel rounded-3xl p-7">
              <h3 className="mb-5 font-display text-base font-semibold text-ink-dark dark:text-ink-light">
                {t('contactSection.social')}
              </h3>
              <div className="flex items-center gap-3">
                {socialLinks.map(({ id, label, icon: Icon, href }) => (
                  <a
                    key={id}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-dark/10 text-ink-dark/70 transition-all hover:-translate-y-0.5 hover:border-primary-400/40 hover:text-primary-600 dark:border-white/10 dark:text-ink-light/70 dark:hover:text-primary-300"
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.8} />
                  </a>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="right" delay={0.08}>
            <form noValidate onSubmit={handleSubmit} className="glass-panel flex flex-col gap-5 rounded-3xl p-7 sm:p-8">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {fields.map((field) => (
                  <div key={field.name} className="flex flex-col gap-1.5">
                    <label htmlFor={field.name} className="text-sm font-medium text-ink-dark/80 dark:text-ink-light/80">
                      {field.label}
                    </label>
                    <input
                      id={field.name}
                      name={field.name}
                      type={field.type}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      aria-invalid={Boolean(errors[field.name])}
                      aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
                      className={`rounded-xl border bg-transparent px-4 py-3 text-sm text-ink-dark outline-none transition-colors placeholder:text-ink-dark/35 focus:border-primary-400 dark:text-ink-light dark:placeholder:text-ink-light/35 ${
                        errors[field.name]
                          ? 'border-red-400/70 focus:border-red-400'
                          : 'border-ink-dark/15 dark:border-white/15'
                      }`}
                    />
                    {errors[field.name] && (
                      <p id={`${field.name}-error`} className="text-xs text-red-500">
                        {errors[field.name]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-sm font-medium text-ink-dark/80 dark:text-ink-light/80">
                  {t('contactSection.form.subject')}
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder={t('contactSection.form.subjectPlaceholder')}
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'subject-error' : undefined}
                  className={`rounded-xl border bg-transparent px-4 py-3 text-sm text-ink-dark outline-none transition-colors placeholder:text-ink-dark/35 focus:border-primary-400 dark:text-ink-light dark:placeholder:text-ink-light/35 ${
                    errors.subject ? 'border-red-400/70 focus:border-red-400' : 'border-ink-dark/15 dark:border-white/15'
                  }`}
                />
                {errors.subject && (
                  <p id="subject-error" className="text-xs text-red-500">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label htmlFor="message" className="text-sm font-medium text-ink-dark/80 dark:text-ink-light/80">
                  {t('contactSection.form.message')}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder={t('contactSection.form.messagePlaceholder')}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`resize-none rounded-xl border bg-transparent px-4 py-3 text-sm text-ink-dark outline-none transition-colors placeholder:text-ink-dark/35 focus:border-primary-400 dark:text-ink-light dark:placeholder:text-ink-light/35 ${
                    errors.message ? 'border-red-400/70 focus:border-red-400' : 'border-ink-dark/15 dark:border-white/15'
                  }`}
                />
                {errors.message && (
                  <p id="message-error" className="text-xs text-red-500">
                    {errors.message}
                  </p>
                )}
              </div>

              <motion.button
                type="submit"
                disabled={status === 'submitting'}
                whileHover={{ scale: status === 'submitting' ? 1 : 1.02 }}
                whileTap={{ scale: status === 'submitting' ? 1 : 0.98 }}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary-500 to-secondary px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition-all hover:shadow-glow-lg disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t('contactSection.form.submitting')}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {t('contactSection.form.submit')}
                  </>
                )}
              </motion.button>

              {status === 'success' && (
                <p className="flex items-center gap-2 text-sm font-medium text-online">
                  <CheckCircle2 className="h-4 w-4" />
                  {t('contactSection.form.success')}
                </p>
              )}
              {status === 'mailto' && (
                <p className="flex items-center gap-2 text-sm font-medium text-online">
                  <CheckCircle2 className="h-4 w-4" />
                  {t('contactSection.form.mailtoFallback')}
                </p>
              )}
              {status === 'error' && (
                <p className="flex items-center gap-2 text-sm font-medium text-red-500">
                  <AlertCircle className="h-4 w-4" />
                  {t('contactSection.form.error')}
                </p>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
