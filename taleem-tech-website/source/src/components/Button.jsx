import Icon from './Icons';

const variants = {
  primary:
    'btn-red',
  secondary: 'hairline text-ink hover:border-accent/60 hover:bg-ink/[.05]',
  ghost: 'text-ink hover:text-accent',
};

/** Renders <a> when `href` is given, otherwise <button>. Arrow nudges right on hover. */
export default function Button({
  href, onClick, children, variant = 'primary', arrow = true, className = '', type = 'button', disabled, ...rest
}) {
  const cls = `group inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold
    transition-[background,border-color,transform,box-shadow] duration-300 active:scale-[.98]
    disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`;
  const inner = (
    <>
      {children}
      {arrow && <Icon name="arrow" size={18} className="transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );
  if (href) return <a href={href} onClick={onClick} className={cls} {...rest}>{inner}</a>;
  return <button type={type} onClick={onClick} disabled={disabled} className={cls} {...rest}>{inner}</button>;
}
