import { motion } from 'framer-motion';
import Button from '../components/Button';
import Icon from '../components/Icons';
import SectionHeading from '../components/SectionHeading';
import TiltCard from '../components/TiltCard';
import { site } from '../config/site';
import { platforms, rateCard } from '../data/marketplace';
import { formatPrice } from '../lib/utils';

const handled = ['Catalog listing', 'Inventory', 'Orders', 'Marketplace ads'];

function Price({ price, per }) {
  if (!site.showPrices) return null;
  return (
    <p className="whitespace-nowrap font-display">
      <span className="text-2xl font-bold text-ink">{formatPrice(price)}</span>
      {per && <span className="ml-1.5 text-sm text-muted">{per === 'month' ? 'per month' : 'one-time'}</span>}
    </p>
  );
}

export default function Marketplace({ onEnquire }) {
  return (
    <section id="marketplace" className="section-y theme-light relative">
      <div className="container-x">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              title="Your Meesho, Amazon and Flipkart accounts, handled."
              intro="Selling online means a daily list of small jobs. We take them on: we list your catalogs, keep stock accurate, process orders and run your marketplace ads."
            />
            <ul className="mt-8 grid grid-cols-2 gap-3 sm:max-w-md">
              {handled.map((h) => (
                <li key={h} className="flex items-center gap-2.5 text-ink/90">
                  <span className="grid h-6 w-6 place-items-center rounded-full bg-accent/15 text-accent"><Icon name="check" size={14} /></span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          {/* Decorative rotating 3D ring; the real details are in the cards below */}
          <div className="ring-stage" aria-hidden="true">
            <div className="carousel3d">
              <div className="ring-spin absolute inset-0 preserve-3d">
                {platforms.map((p, i) => (
                  <div key={p.id} className="slab" style={{ '--i': i }}>
                    <div className="theme-dark flex h-full flex-col justify-between rounded-3xl p-6 shadow-[0_30px_60px_-30px_rgba(20,21,24,.6)]" style={{ background: 'linear-gradient(160deg, #2c2d33 0%, #141518 72%)', border: '1px solid rgb(253 50 49 / .45)' }}>
                      <span className="grid h-11 w-11 place-items-center rounded-2xl bg-accent text-accent-ink"><Icon name="store" size={22} /></span>
                      <div>
                        <p className="font-display text-3xl font-extrabold tracking-tight">{p.name}</p>
                        <p className="mt-1 text-sm text-muted">{p.blurb}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Platform plans */}
        <div className="mt-16 grid gap-5 lg:grid-cols-3">
          {platforms.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 40, rotateX: -14 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformPerspective: 900 }}
            >
              <TiltCard className="glass flex flex-col rounded-3xl p-7 transition-colors hover:border-accent/50">
                <h3 className="depth-1 text-2xl font-bold">{p.name}</h3>
                <ul className="depth-1 mt-5 flex-1 space-y-2.5">
                  {p.includes.map((x) => (
                    <li key={x} className="flex gap-2.5 text-muted">
                      <span className="mt-1 text-accent"><Icon name="check" size={16} /></span>{x}
                    </li>
                  ))}
                </ul>
                <div className="depth-1 mt-7 flex flex-wrap items-end justify-between gap-x-3 gap-y-4 border-t border-line pt-5">
                  <Price price={p.price} per={p.per} />
                  <Button
                    variant="secondary"
                    className="!min-h-10 !px-4 !py-2 text-sm"
                    onClick={() => onEnquire({ service: p.service, message: `I'd like to know more about ${p.name} account management.` })}
                  >
                    Enquire
                  </Button>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Rate card */}
        <div className="mt-20">
          <SectionHeading title="Grow and stay compliant" intro="Add-ons that sit alongside your marketplace accounts." className="max-w-xl" />
          <div className="mt-10 divide-y divide-line border-y border-line">
            {rateCard.map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5 }}
                className="grid gap-4 py-6 md:grid-cols-[1fr_1.3fr_17.5rem] md:items-center md:gap-8"
              >
                <h3 className="text-xl font-bold">{r.title}</h3>

                {r.tiers ? (
                  <dl className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm">
                    {r.tiers.map((t) => (
                      <div key={t.label} className="flex justify-between gap-3 border-b border-line pb-1.5">
                        <dt className="text-muted">{t.label}</dt>
                        <dd className="font-semibold">{site.showPrices ? formatPrice(t.price) : ''}</dd>
                      </div>
                    ))}
                  </dl>
                ) : (
                  <ul className="flex flex-wrap gap-2">
                    {r.includes.map((x) => (
                      <li key={x} className="rounded-full bg-ink/[.05] px-3 py-1 text-sm text-muted hairline">{x}</li>
                    ))}
                  </ul>
                )}

                <div className="flex items-center justify-between gap-5 md:justify-end">
                  {!r.tiers && <Price price={r.price} per={r.per} />}
                  <Button
                    variant="ghost"
                    className="!min-h-10 !px-2 !py-2 text-sm"
                    onClick={() => onEnquire({ service: r.service, message: `I'd like to know more about: ${r.title}.` })}
                  >
                    Enquire
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
