import { lazy, Suspense, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Button from '../components/Button';

const HeroScene = lazy(() => import('../components/HeroScene'));

const chips = [
  // Chips sit in the right-hand (3D) half only, and are hidden below lg so they never cover text.
  { label: 'Websites', cls: 'left-[56%] top-[16%] hidden lg:block', d: '0s' },
  { label: 'Apps', cls: 'right-[3%] top-[9%] hidden lg:block', d: '1.2s' },
  { label: 'Meesho', cls: 'right-[1%] top-[44%] hidden lg:block', d: '2.1s' },
  { label: 'Amazon', cls: 'left-[60%] top-[78%] hidden lg:block', d: '0.6s' },
  { label: 'Flipkart', cls: 'right-[6%] top-[80%] hidden lg:block', d: '1.6s' },
  { label: 'Video', cls: 'left-[70%] top-[93%] hidden lg:block', d: '2.6s' },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.25 } } };
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const [showScene, setShowScene] = useState(false);

  // Mount the WebGL scene after first paint so the text is instant.
  useEffect(() => {
    const saveData = navigator.connection?.saveData;
    if (reduce || saveData) return undefined;
    const go = () => setShowScene(true);
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(go, { timeout: 1200 });
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(go, 300);
    return () => clearTimeout(id);
  }, [reduce]);

  return (
    <section id="home" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28">
      {/* Scene layer */}
      <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 w-full opacity-40 sm:opacity-60 lg:w-[54%] lg:opacity-100">
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(closest-side at 55% 50%, rgb(var(--glow-rgb) / .2), transparent 70%)' }}
        />
        {showScene && (
          <Suspense fallback={null}>
            <HeroScene className="absolute inset-0 animate-[fadein_1.2s_ease_both]" />
          </Suspense>
        )}
        {chips.map((c) => (
          <span
            key={c.label}
            style={{ animationDelay: c.d }}
            className={`glass absolute animate-float rounded-full px-4 py-2 text-sm font-semibold ${c.cls}`}
          >
            {c.label}
          </span>
        ))}
      </div>

      <div className="container-x">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-2xl">
          <motion.h1 variants={item} className="text-[2.9rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.2rem]">
            We build the digital side of your business.
            <span className="mt-3 block text-3xl font-bold tracking-tight text-muted sm:text-4xl lg:text-[2.6rem]">Then we help you run it.</span>
          </motion.h1>
          <motion.p variants={item} className="mt-7 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">
            Websites, apps and creative content, plus day-to-day account management for Meesho, Amazon and Flipkart sellers. One team, end to end.
          </motion.p>
          <motion.div variants={item} className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact">Let&apos;s work together</Button>
            <Button href="#services" variant="secondary">Explore our services</Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
