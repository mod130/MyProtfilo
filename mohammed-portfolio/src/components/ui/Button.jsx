import { forwardRef } from 'react';
import { motion } from 'framer-motion';

const variants = {
  primary:
    'bg-gradient-to-r from-primary-500 to-secondary text-white shadow-glow hover:shadow-glow-lg hover:brightness-110',
  secondary:
    'border border-ink-dark/15 bg-ink-dark/[0.03] text-ink-dark hover:bg-ink-dark/[0.06] dark:border-white/15 dark:bg-white/5 dark:text-ink-light dark:hover:bg-white/10',
  ghost:
    'text-ink-dark/70 hover:text-ink-dark hover:bg-ink-dark/5 dark:text-ink-light/70 dark:hover:text-ink-light dark:hover:bg-white/5',
};

const sizes = {
  sm: 'px-4 py-2 text-sm gap-1.5',
  md: 'px-5 py-3 text-sm gap-2',
  lg: 'px-7 py-3.5 text-base gap-2.5',
};

/**
 * Renders as <button>, internal anchor (#section) or external <a> depending
 * on the `href` prop — external links automatically get target/rel/noopener.
 */
const Button = forwardRef(function Button(
  { as, href, variant = 'primary', size = 'md', icon: Icon, iconPosition = 'start', className = '', children, ...rest },
  ref
) {
  const classes = `inline-flex items-center justify-center rounded-full font-semibold transition-all duration-300 ease-smooth focus-visible:outline-offset-4 ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      {Icon && iconPosition === 'start' && <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />}
      <span>{children}</span>
      {Icon && iconPosition === 'end' && <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />}
    </>
  );

  const Tag = as === 'a' || href ? motion.a : motion.button;
  const isExternal = typeof href === 'string' && /^https?:\/\//.test(href);

  return (
    <Tag
      ref={ref}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className={classes}
      {...rest}
    >
      {content}
    </Tag>
  );
});

export default Button;
