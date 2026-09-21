import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Button from './Button';
import Icon from './Icons';
import Logo from './Logo';
import { useActiveSection } from '../hooks/useActiveSection';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'marketplace', label: 'Marketplace' },
  { id: 'work', label: 'Work' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];
const ids = ['home', 'services', 'marketplace', 'why', 'work', 'process', 'about', 'cta', 'contact'];
const navIds = new Set(links.map((l) => l.id));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState('home');
  const active = useActiveSection(ids);

  useEffect(() => { if (navIds.has(active)) setCurrent(active); }, [active]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-3 z-50 px-3 sm:top-4 sm:px-6"
    >
      <nav
        aria-label="Main"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-full px-4 py-2 transition-[background,border-color,backdrop-filter] duration-300 sm:px-5 ${
          scrolled || open ? 'nav-glass shadow-[0_10px_40px_-15px_rgba(0,0,0,.6)]' : 'border border-transparent'
        }`}
      >
        <a href="#home" aria-label="Taleem Tech, back to top"><Logo /></a>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                aria-current={current === l.id ? 'true' : undefined}
                className={`nav-link relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                  current === l.id ? 'text-ink' : 'text-muted hover:text-ink'
                }`}
              >
                {current === l.id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full bg-white/[.07]" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                )}
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Button href="#contact" className="hidden !min-h-10 !px-5 !py-2 text-sm sm:inline-flex">Let&apos;s talk</Button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full hairline lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <Icon name={open ? 'close' : 'menu'} size={22} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="nav-glass mx-auto mt-2 max-w-6xl origin-top rounded-3xl p-3 lg:hidden"
          >
            <ul>
              {links.map((l, i) => (
                <motion.li key={l.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  <a
                    href={`#${l.id}`}
                    onClick={() => setOpen(false)}
                    className={`block rounded-2xl px-4 py-3.5 text-lg font-semibold ${current === l.id ? 'bg-white/[.06] text-accent' : 'text-ink'}`}
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <Button href="#contact" onClick={() => setOpen(false)} className="mt-2 w-full">Let&apos;s talk</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
