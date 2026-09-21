import { motion } from 'framer-motion';

/** Heading block that eases in once when scrolled into view. */
export default function SectionHeading({ title, intro, align = 'left', className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''} ${className}`}
    >
      <h2 className="text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl">{title}</h2>
      {intro && <p className="mt-5 text-lg leading-relaxed text-muted">{intro}</p>}
    </motion.div>
  );
}
