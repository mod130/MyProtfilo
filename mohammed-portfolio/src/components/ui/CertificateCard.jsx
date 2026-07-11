import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

export default function CertificateCard({ certificate, title, issuer, description }) {
  const { t } = useLanguage();
  const Icon = certificate.icon;

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="glass-panel flex h-full flex-col gap-4 rounded-3xl p-6"
    >
      <div className="flex items-start justify-between">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-secondary text-white shadow-glow">
          <Icon className="h-5 w-5" strokeWidth={1.8} />
        </span>
        <span className="rounded-full border border-ink-dark/10 px-3 py-1 font-mono text-[11px] text-ink-dark/55 dark:border-white/10 dark:text-ink-light/55">
          {certificate.date}
        </span>
      </div>

      <div>
        <h3 className="font-display text-base font-semibold text-ink-dark dark:text-ink-light sm:text-lg">{title}</h3>
        <p className="mt-1 text-sm font-medium text-primary-600 dark:text-primary-300">{issuer}</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-dark/60 dark:text-ink-light/60">{description}</p>
      </div>

      <a
        href={certificate.verifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-300 dark:hover:text-primary-200"
      >
        {t('common.verify')}
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </motion.div>
  );
}
