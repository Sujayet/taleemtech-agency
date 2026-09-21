import Button from './Button';
import Mockup from './Mockup';
import TiltCard from './TiltCard';

export default function PortfolioCard({ project }) {
  return (
    <TiltCard className="group glass h-full overflow-hidden rounded-3xl transition-transform duration-300 hover:-translate-y-1">
      <div className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-gradient-to-br from-surface-2 to-surface">
        <div className="depth-2 grid h-full w-full place-items-center transition-transform duration-700 group-hover:scale-[1.06]">
          {project.image ? (
            <img src={project.image} alt={`${project.title} preview`} loading="lazy" className="h-full w-full object-cover" />
          ) : (
            <Mockup type={project.mockup} />
          )}
        </div>
        <div className="absolute inset-x-4 top-4 flex items-center justify-between gap-3">
          {project.isPlaceholder && (
            <span className="rounded-full bg-bg/70 px-3 py-1 text-xs font-semibold text-muted hairline backdrop-blur-md">
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
        <h3 className="mt-2 text-xl font-bold leading-tight">{project.title}</h3>
        <p className="mt-3 leading-relaxed text-muted">{project.description}</p>

        {project.tags?.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span key={tag} className="rounded-full px-3 py-1 text-xs font-medium text-muted hairline">
                {tag}
              </span>
            ))}
          </div>
        )}

        {project.href && (
          <Button href={project.href} variant="ghost" className="!mt-5 !min-h-0 !px-0 !py-0 text-sm" target="_blank" rel="noopener noreferrer">
            View project
          </Button>
        )}
      </div>
    </TiltCard>
  );
}
