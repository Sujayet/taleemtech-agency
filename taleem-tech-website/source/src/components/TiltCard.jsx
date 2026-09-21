import { useRef } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

/**
 * 3D tilt that follows the mouse, with a soft red glare. Children can use
 * `.depth-1` / `.depth-2` to float above the card surface.
 * Disabled for touch and reduced-motion users.
 */
export default function TiltCard({ children, className = '', max = 9, ...rest }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 180, damping: 18 });
  const sry = useSpring(ry, { stiffness: 180, damping: 18 });

  const onMove = (e) => {
    if (reduce || e.pointerType !== 'mouse' || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * max * 2);
    rx.set(-(py - 0.5) * max * 2);
    ref.current.style.setProperty('--mx', `${px * 100}%`);
    ref.current.style.setProperty('--my', `${py * 100}%`);
  };
  const onLeave = () => { rx.set(0); ry.set(0); };

  return (
    <div style={{ perspective: 1100 }} className="h-full">
      <motion.div
        ref={ref}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
        className={`group relative h-full ${className}`}
        {...rest}
      >
        {children}
        <span className="tilt-glare" aria-hidden="true" />
      </motion.div>
    </div>
  );
}
