import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { reasons } from '../data/process';

/** Isometric stack that spreads apart on hover: a small nod to "built to grow". */
function LayerStack() {
  const layers = [
    { z: 0, bg: 'var(--surface-2)', hoverZ: 0 },
    { z: 26, bg: 'rgb(var(--glow-rgb) / .16)', hoverZ: 52 },
    { z: 52, bg: 'rgb(var(--glow-rgb) / .5)', hoverZ: 104 },
  ];
  return (
    <div className="group layers relative mt-14 hidden h-56 w-56 lg:block" aria-hidden="true">
      <div className="layers-inner absolute inset-4">
        {layers.map((l, i) => (
          <div
            key={i}
            className="layer hairline group-hover:[transform:var(--h)]"
            style={{ background: l.bg, transform: `translateZ(${l.z}px)`, '--h': `translateZ(${l.hoverZ}px)` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Why() {
  return (
    <section id="why" className="section-y">
      <div className="container-x grid gap-14 lg:grid-cols-[.9fr_1.1fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeading
            title="Why Taleem Tech"
            intro="We are a small team that treats your business like our own. That shapes how we work."
          />
          <LayerStack />
        </div>
        <ol className="divide-y divide-line border-y border-line">
          {reasons.map((r, i) => (
            <motion.li
              key={r.title}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group py-9 transition-colors"
            >
              <h3 className="text-2xl font-bold transition-colors duration-300 group-hover:text-accent sm:text-3xl">{r.title}</h3>
              <p className="mt-3 max-w-lg text-lg leading-relaxed text-muted">{r.text}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
