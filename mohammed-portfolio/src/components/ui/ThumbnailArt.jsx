import { useId } from 'react';

/**
 * Generates a distinctive abstract background pattern + centered icon badge,
 * used as project thumbnails so the site looks fully polished without
 * requiring real screenshots. Swap in a real <img> per project whenever you
 * have one — this component is purely decorative filler art.
 */
export default function ThumbnailArt({ variant = 'nodes', from = '#6C63FF', to = '#8B5CF6', Icon, className = '' }) {
  const uid = useId();
  const gradientId = `art-gradient-${uid}`;
  const glowId = `art-glow-${uid}`;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg viewBox="0 0 400 240" className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={from} />
            <stop offset="100%" stopColor={to} />
          </linearGradient>
          <radialGradient id={glowId} cx="50%" cy="35%" r="65%">
            <stop offset="0%" stopColor={from} stopOpacity="0.55" />
            <stop offset="100%" stopColor={from} stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="400" height="240" fill="#0A0A0F" />
        <rect width="400" height="240" fill={`url(#${glowId})`} />

        {variant === 'circuit' && (
          <g stroke={`url(#${gradientId})`} strokeWidth="1.5" fill="none" opacity="0.75">
            <path d="M-10 40 H120 L150 70 H260 L290 40 H410" />
            <path d="M-10 120 H80 L110 150 H210 L235 125 H340 L365 150 H410" />
            <path d="M-10 190 H150 L175 165 H300 L320 190 H410" />
            <circle cx="120" cy="40" r="4" fill={to} />
            <circle cx="290" cy="40" r="4" fill={from} />
            <circle cx="110" cy="150" r="4" fill={from} />
            <circle cx="340" cy="120" r="4" fill={to} />
            <circle cx="175" cy="165" r="4" fill={to} />
          </g>
        )}

        {variant === 'nodes' && (
          <g stroke={`url(#${gradientId})`} strokeWidth="1.2" opacity="0.7">
            <line x1="60" y1="50" x2="160" y2="90" />
            <line x1="160" y1="90" x2="270" y2="55" />
            <line x1="160" y1="90" x2="140" y2="180" />
            <line x1="270" y1="55" x2="340" y2="120" />
            <line x1="140" y1="180" x2="250" y2="200" />
            <line x1="250" y1="200" x2="340" y2="120" />
            <line x1="60" y1="50" x2="40" y2="160" />
            <line x1="40" y1="160" x2="140" y2="180" />
            {[
              [60, 50],
              [160, 90],
              [270, 55],
              [340, 120],
              [140, 180],
              [250, 200],
              [40, 160],
            ].map(([cx, cy], i) => (
              <circle key={i} cx={cx} cy={cy} r="5" fill={i % 2 === 0 ? from : to} stroke="none" />
            ))}
          </g>
        )}

        {variant === 'waves' && (
          <g fill="none" stroke={`url(#${gradientId})`} strokeWidth="1.4" opacity="0.75">
            <path d="M-10 90 Q60 60 130 90 T270 90 T410 90" />
            <path d="M-10 130 Q60 105 130 130 T270 130 T410 130" opacity="0.6" />
            <path d="M-10 170 Q60 150 130 170 T270 170 T410 170" opacity="0.4" />
          </g>
        )}

        {variant === 'dots' && (
          <g fill={to} opacity="0.7">
            {Array.from({ length: 8 }).map((_, row) =>
              Array.from({ length: 13 }).map((_, col) => {
                const x = 15 + col * 30;
                const y = 15 + row * 30;
                const active = (row + col) % 3 === 0;
                return <circle key={`${row}-${col}`} cx={x} cy={y} r={active ? 2.6 : 1.3} fill={active ? from : to} opacity={active ? 0.9 : 0.35} />;
              })
            )}
          </g>
        )}

        {variant === 'blobs' && (
          <g opacity="0.65">
            <circle cx="120" cy="70" r="80" fill={from} opacity="0.35" />
            <circle cx="290" cy="130" r="95" fill={to} opacity="0.3" />
            <circle cx="220" cy="60" r="50" fill={to} opacity="0.25" />
          </g>
        )}

        {variant === 'grid' && (
          <g stroke={`url(#${gradientId})`} strokeWidth="1" opacity="0.5">
            {Array.from({ length: 9 }).map((_, i) => (
              <line key={`v${i}`} x1={i * 46} y1="0" x2={i * 46} y2="240" />
            ))}
            {Array.from({ length: 7 }).map((_, i) => (
              <line key={`h${i}`} x1="0" y1={i * 40} x2="400" y2={i * 40} />
            ))}
          </g>
        )}
      </svg>

      {Icon && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-glow"
            aria-hidden="true"
          >
            <Icon className="h-7 w-7 text-white" strokeWidth={1.75} />
          </div>
        </div>
      )}
    </div>
  );
}
