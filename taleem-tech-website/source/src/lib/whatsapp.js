import { SERVICE_OPTIONS } from '../data/serviceOptions';

/** Keeps only digits, e.g. "+91 98765 43210" -> "919876543210". */
export const cleanNumber = (n) => String(n ?? '').replace(/\D/g, '');

/** Builds the pre-written WhatsApp text from the form values. */
export function buildMessage(v) {
  const service = SERVICE_OPTIONS.find((o) => o.value === v.service)?.label ?? v.service;
  const lines = [
    '*New enquiry from the Taleem Tech website*',
    '',
    `*Name:* ${v.name.trim()}`,
    v.business.trim() && `*Business:* ${v.business.trim()}`,
    `*Email:* ${v.email.trim()}`,
    `*Phone:* ${v.phone.trim()}`,
    `*Service:* ${service}`,
    '',
    '*Message:*',
    v.message.trim(),
  ];
  return lines.filter((l) => l !== false && l !== undefined).join('\n');
}

/** wa.me link that opens WhatsApp (app or web) with the message ready to send. */
export function buildWhatsAppUrl(number, values) {
  return `https://wa.me/${cleanNumber(number)}?text=${encodeURIComponent(buildMessage(values))}`;
}

/**
 * Opens WhatsApp. Must be called directly inside a click/submit handler so browsers do not block it.
 * Falls back to navigating the current tab if a pop-up blocker stops the new tab.
 */
export function openWhatsApp(url) {
  const win = window.open(url, '_blank', 'noopener,noreferrer');
  if (!win) window.location.href = url;
}
