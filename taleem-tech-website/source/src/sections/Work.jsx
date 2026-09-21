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
          title="Our work"
          intro={allPlaceholders ? 'A preview of the kinds of projects we take on. Real project case studies are coming soon.' : 'A selection of projects across web, apps, content and marketplaces.'}
        />

        <div role="group" aria-label="Filter projects by category" className="mt-10 flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={`min-h-11 rounded-full px-5 text-sm font-semibold transition-colors ${
                cat === c ? 'bg-accent text-accent-ink' : 'hairline text-muted hover:text-ink'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <motion.div layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <PortfolioCard project={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
