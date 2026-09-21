import SectionHeading from '../components/SectionHeading';

const pillars = [
  { name: 'Technology', text: 'Websites, apps and systems that work.' },
  { name: 'Creativity', text: 'Design, video and content with a point of view.' },
  { name: 'Business understanding', text: 'Solutions shaped around how you actually sell.' },
];

/** The (static) 3D badge, with three faint rings turning slowly behind it: technology, creativity, business. */
function Emblem() {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md">
      <div className="orbit-stage absolute inset-0" aria-hidden="true">
        <div className="relative h-full w-full animate-[spin3d_34s_linear_infinite] preserve-3d">
          <div className="orbit" style={{ transform: 'rotateX(72deg)', borderColor: 'rgb(var(--accent-rgb) / .8)' }} />
          <div className="orbit" style={{ transform: 'rotateY(72deg) scale(.86)' }} />
          <div className="orbit" style={{ transform: 'rotateX(28deg) rotateY(28deg) scale(.7)', borderColor: 'rgb(var(--accent-rgb) / .5)' }} />
        </div>
      </div>
      <img
        src="/brand/logo-badge-3d.webp"
        width="800" height="798" loading="lazy" decoding="async"
        alt="Taleem Tech badge: Dream comes true"
        className="absolute left-1/2 top-1/2 z-10 w-[64%] -translate-x-1/2 -translate-y-1/2"
      />
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="section-y">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            title="A digital solutions agency for practical ideas"
            intro="Taleem Tech helps businesses turn ideas into practical digital experiences. We bring technology, creativity and business understanding together, so one team can build your website and also run your marketplace accounts."
          />
          <dl className="mt-10 space-y-5">
            {pillars.map((p) => (
              <div key={p.name} className="border-l-2 border-accent/60 pl-5">
                <dt className="text-lg font-bold">{p.name}</dt>
                <dd className="mt-0.5 text-muted">{p.text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <Emblem />
      </div>
    </section>
  );
}
