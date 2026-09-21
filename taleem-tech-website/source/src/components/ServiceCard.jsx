import Icon from './Icons';
import TiltCard from './TiltCard';

export default function ServiceCard({ item, onEnquire }) {
  const featured = item.featured;
  return (
    <TiltCard
      className={`glass flex flex-col rounded-3xl p-7 transition-colors duration-300 hover:border-accent/50 ${
        featured ? 'border-accent/40 sm:col-span-2 lg:col-span-1' : ''
      }`}
    >
      <span
        className={`depth-1 grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110 ${
          featured ? 'bg-accent text-accent-ink' : 'bg-white/[.06] text-accent'
        }`}
      >
        <Icon name={item.icon} size={24} />
      </span>
      <h3 className="depth-1 mt-6 text-xl font-bold leading-snug">{item.title}</h3>
      <p className="mt-3 flex-1 leading-relaxed text-muted">{item.description}</p>

      {item.href ? (
        <a
          href={item.href}
          className="depth-1 mt-7 inline-flex items-center gap-2 text-sm font-semibold text-accent"
        >
          {item.cta}
          <Icon name="arrow" size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
        </a>
      ) : (
        <button
          type="button"
          onClick={() => onEnquire({ service: item.service })}
          className="depth-1 mt-7 inline-flex items-center gap-2 self-start text-sm font-semibold text-ink/80 transition-colors hover:text-accent"
        >
          Ask about this
          <Icon name="arrow" size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
        </button>
      )}
    </TiltCard>
  );
}
