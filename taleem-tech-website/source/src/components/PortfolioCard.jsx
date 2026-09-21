import Button from './Button';
import Mockup from './Mockup';
import TiltCard from './TiltCard';

export default function PortfolioCard({ project }) {
  return (
    <TiltCard className="group glass h-full overflow-hidden rounded-3xl transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_70px_rgba(255,255,255,0.08)]">
      <div className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-gradient-to-br from-surface-2 via-surface to-bg">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_45%)]" />
        <div className="depth-2 relative grid h-full w-full place-items-center transition-transform duration-700 group-hover:scale-[1.06]">
          {project.image ? (
            <img src={project.image} alt={`${project.title} preview`} loading="lazy" className="h-full w-full object-cover" />
          ) : (
            <Mockup type={project.mockup} />
          )}
        </div>
        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
          {project.isPlaceholder && (
            <span className="rounded-full border border-white/10 bg-bg/70 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted backdrop-blur-md">
              Concept preview
            </span>
          )}
          <span className="ml-auto grid h-9 w-9 place-items-center rounded-full bg-bg/70 text-sm text-ink hairline backdrop-blur-md transition-transform duration-300 group-hover:rotate-45">
            ↗
          </span>
        </div>
      </div>

      <div className="depth-1 flex h-full flex-col p-6">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">{project.category}</p>
        <h3 className="mt-2 text-xl font-bold leading-tight tracking-tight">{project.title}</h3>
        <p className="mt-3 leading-relaxed text-muted">{project.description}</p>

        {project.tags?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2" aria-label="Project capabilities">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/[.03] px-3 py-1 text-xs font-medium text-muted">
                {tag}
              </span>
            ))}
          </div>
        )}

        {project.href ? (
          <Button href={project.href} variant="ghost" className="!mt-5 !min-h-0 !px-0 !py-0 text-sm" target="_blank" rel="noopener noreferrer">
            View project <span aria-hidden="true" className="ml-2">↗</span>
          </Button>
        ) : (
          <a href="#contact" className="mt-5 inline-flex min-h-10 items-center text-sm font-semibold text-ink transition-colors hover:text-accent">
            Discuss a similar project <span aria-hidden="true" className="ml-2">↗</span>
          </a>
        )}
      </div>
    </TiltCard>
  );
}
