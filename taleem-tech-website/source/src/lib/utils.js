export const formatINR = (n) => '₹' + n.toLocaleString('en-IN');

export function formatPrice(price) {
  if (!price) return '';
  if (price.custom) return 'Custom quote';
  if (price.range) return `${formatINR(price.range[0])}–${formatINR(price.range[1])}`;
  return formatINR(price.amount);
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' });
}
