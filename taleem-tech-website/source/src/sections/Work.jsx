import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import PortfolioCard from '../components/PortfolioCard';
import SectionHeading from '../components/SectionHeading';
import { projects } from '../data/portfolio';

export default function Work() {
  const categories = useMemo(() => ['All', ...new Set(projects.map((p) => p.category))], []);
  const [cat, setCat] = useState('All');
  const shown = cat === 'All' ? projects : projects.filter((p) => p.category === cat);
  const allPlaceholders = projects.every((p) => p.isPlaceholder);

  return (
    <section id="work" className="section-y">
      <div className="container-x">
        <SectionHeading
          title="Selected work & capabilities"
          intro={allPlaceholders
            ? 'Explore our service-led project concepts. Real client case studies and live project links will be added as the portfolio grows.'
            : 'A selection of projects across websites, e-commerce, marketplaces, creative content and branding.'}
        />

        <div className="mt-8 flex items-center justify-between gap-4">
          <p className="text-sm text-muted">Browse by service</p>
          <span className="text-sm font-semibold text-muted">{shown.length} {shown.length === 1 ? 'project' : 'projects'}</span>
        </div>

        <div role="group" aria-label="Filter projects by category" className="mt-4 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={`min-h-11 rounded-full px-5 text-sm font-semibold transition-all duration-300 ${
                cat === c
                  ? 'bg-accent text-accent-ink shadow-[0_8px_30px_rgba(255,255,255,0.08)]'
                  : 'hairline text-muted hover:-translate-y-0.5 hover:text-ink'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p, index) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                transition={{ duration: 0.35, delay: index * 0.035, ease: [0.22, 1, 0.36, 1] }}
              >
                <PortfolioCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-12 rounded-3xl hairline bg-surface/40 p-6 text-center sm:p-8">
          <p className="text-lg font-semibold">Have a project in mind?</p>
          <p className="mx-auto mt-2 max-w-2xl text-muted">Tell us what you want to build, launch or improve. We can help turn your idea into a polished digital experience.</p>
          <a href="#contact" className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-accent-ink transition-transform hover:-translate-y-0.5">
            Start a conversation <span aria-hidden="true" className="ml-2">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
