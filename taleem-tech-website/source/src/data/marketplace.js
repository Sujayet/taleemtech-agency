/**
 * Rate card, transcribed from the handwritten "E-commerce Basic Plan" sheet.
 * price: { amount } | { range: [min, max] } | { custom: true }   per: 'month' | 'one-time'
 * Edit here — the UI renders straight from this file.
 */
export const platforms = [
  {
    id: 'meesho',
    name: 'Meesho',
    blurb: 'Full seller-account handling',
    includes: ['30 catalogs every month', 'Inventory management', 'Order management', 'Meesho Ads'],
    price: { amount: 2000 },
    per: 'month',
    service: 'MARKETPLACE',
  },
  {
    id: 'amazon',
    name: 'Amazon',
    blurb: 'Seller-account handling',
    includes: ['Up to 25 catalogs', 'Account handling'],
    price: { amount: 2500 },
    per: 'month',
    service: 'MARKETPLACE',
  },
  {
    id: 'flipkart',
    name: 'Flipkart',
    blurb: 'Seller-account handling',
    includes: ['Up to 25 catalogs', 'Account handling'],
    price: { amount: 2500 },
    per: 'month',
    service: 'MARKETPLACE',
  },
];

export const rateCard = [
  {
    id: 'social-pages',
    title: 'Instagram & Facebook page handling',
    includes: ['5 reels per month', '15 posts per month', 'Facebook page management, same as above'],
    price: { amount: 2500 },
    per: 'month',
    service: 'SOCIAL_DESIGN',
  },
  {
    id: 'meta-setup',
    title: 'Meta Ads setup',
    includes: ['Meta account setup', 'Meta Business Suite setup'],
    price: { amount: 2000 },
    per: 'one-time',
    service: 'MARKETING',
  },
  {
    id: 'meta-ads',
    title: 'Meta Ads management',
    includes: ['Ad management', 'Ad creation', 'Testing for leads and sales'],
    price: { amount: 1500 },
    per: 'month',
    service: 'MARKETING',
  },
  {
    id: 'google',
    title: 'Google Business Profile & Ads',
    includes: ['Account creation and setup', 'Google Ads'],
    price: { amount: 1500 },
    per: 'month',
    service: 'MARKETING',
  },
  {
    id: 'gst-returns',
    title: 'GST returns (GSTR-1 & 3B)',
    includes: [],
    tiers: [
      { label: 'Up to 100 bills', price: { amount: 700 } },
      { label: 'Up to 200 bills', price: { amount: 1000 } },
      { label: '200–500 bills', price: { amount: 1200 } },
      { label: 'Above 500 bills', price: { range: [1500, 2000] } },
    ],
    per: 'month',
    service: 'GST',
  },
  {
    id: 'gst-registration',
    title: 'GST registration',
    includes: ['New GST number creation'],
    price: { amount: 1500 },
    per: 'one-time',
    service: 'GST',
  },
  {
    id: 'web-app',
    title: 'Website & app (Android and iOS)',
    includes: ['Scoped and quoted per project'],
    price: { custom: true },
    per: null,
    service: 'WEBSITE',
  },
];
