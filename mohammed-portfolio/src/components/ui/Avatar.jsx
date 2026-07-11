import { useId, useState } from 'react';

/**
 * Displays `src` if it loads successfully. If the image is missing (e.g. no
 * real photo has been added yet) it falls back to a generated gradient
 * initials badge, so the layout never shows a broken image icon.
 *
 * Drop your real photo at the given `src` path (e.g. /public/profile.jpg)
 * and it will be used automatically — no code changes required.
 */
export default function Avatar({ src, alt = '', initials = 'MA', className = '', rounded = 'rounded-[2rem]' }) {
  const [errored, setErrored] = useState(!src);
  const uid = useId();
  const gradientId = `avatar-gradient-${uid}`;

  if (errored) {
    return (
      <div className={`relative flex items-center justify-center overflow-hidden ${rounded} ${className}`}>
        <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6C63FF" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
          </defs>
          <rect width="100" height="100" fill={`url(#${gradientId})`} />
          <circle cx="50" cy="38" r="16" fill="#ffffff" opacity="0.18" />
          <path d="M20 92c2-20 14-32 30-32s28 12 30 32" fill="#ffffff" opacity="0.18" />
        </svg>
        <span className="relative font-display text-4xl font-semibold tracking-wide text-white sm:text-5xl">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setErrored(true)}
      className={`object-cover ${rounded} ${className}`}
    />
  );
}
