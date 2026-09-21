import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import ServiceCard from '../components/ServiceCard';
import { services } from '../data/services';

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.08 } } };
const cell = {
  hidden: { opacity: 0, y: 30, rotateX: -12 },
  show: { opacity: 1, y: 0, rotateX: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Services({ onEnquire }) {
  return (
    <section id="services" className="section-y">
      <div className="container-x">
        <SectionHeading
          title="What we do"
          intro="We combine technology, creativity and business thinking to help brands build, grow and operate digitally."
        />
        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((s) => (
            <motion.div key={s.id} variants={cell} style={{ transformPerspective: 900 }}>
              <ServiceCard item={s} onEnquire={onEnquire} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
