import { motion } from 'framer-motion';
import Button from '../components/Button';
import { scrollToId } from '../lib/utils';

export default function CTA() {
  return (
    <section id="cta" className="px-3 py-10 sm:px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-line bg-surface px-6 py-24 text-center sm:py-32"
      >
        <div className="floor-grid" aria-hidden="true" />
        <div
          className="absolute inset-0"
          aria-hidden="true"
          style={{ background: 'radial-gradient(60% 60% at 50% 30%, rgb(var(--glow-rgb) / .18), transparent 70%)' }}
        />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl">Have an idea? Let&apos;s build it.</h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-muted">
            Tell us what you are trying to achieve, and we will explore how technology can help.
          </p>
          <div className="mt-10">
            <Button onClick={() => scrollToId('contact')} className="!px-8">Start a project</Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
