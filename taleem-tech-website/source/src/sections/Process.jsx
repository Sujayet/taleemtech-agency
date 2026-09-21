import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import { steps } from '../data/process';

/** Each step flips up from a tilted plane as it scrolls into place. */
function Step({ step, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 95%', 'start 55%'] });
  const rotateX = useTransform(scrollYProgress, [0, 1], [38, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <li ref={ref} className="relative pl-16 sm:pl-24" style={{ perspective: 900 }}>
      <span className="absolute left-0 top-1 grid h-12 w-12 place-items-center rounded-full bg-accent font-display text-lg font-extrabold text-accent-ink shadow-[0_0_0_8px_var(--bg)] sm:h-14 sm:w-14">
        {index + 1}
      </span>
      <motion.div style={{ rotateX, opacity, y, transformOrigin: 'top center' }} className="glass rounded-3xl p-7">
        <h3 className="text-2xl font-bold">{step.title}</h3>
        <p className="mt-2 max-w-md text-lg leading-relaxed text-muted">{step.text}</p>
      </motion.div>
    </li>
  );
}

export default function Process() {
  const listRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 70%', 'end 60%'] });

  return (
    <section id="process" className="section-y">
      <div className="container-x">
        <SectionHeading title="How we work" intro="Four steps from first conversation to launch." />
        <div className="relative mt-14 max-w-3xl">
          <div className="absolute bottom-6 left-6 top-6 w-px bg-line sm:left-7" aria-hidden="true" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: scrollYProgress }}
            className="absolute bottom-6 left-6 top-6 w-px origin-top bg-accent sm:left-7"
          />
          <ol ref={listRef} className="relative space-y-8">
            {steps.map((s, i) => <Step key={s.title} step={s} index={i} />)}
          </ol>
        </div>
      </div>
    </section>
  );
}
