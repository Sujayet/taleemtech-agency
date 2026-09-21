import Button from './Button';
import Mockup from './Mockup';
import TiltCard from './TiltCard';

export default function PortfolioCard({ project }) {
  return (
    <TiltCard className="glass overflow-hidden rounded-3xl">
      <div className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-gradient-to-br from-surface-2 to-surface">
        <div className="depth-2 grid h-full w-full place-items-center transition-transform duration-700 group-hover:scale-[1.06]">
          {project.image ? (
            <img src={project.image} alt={`${project.title} preview`} loading="lazy" className="h-full w-full object-cover" />
          ) : (
            <Mockup type={project.mockup} />
          )}
        </div>
        {project.isPlaceholder && (
          <span className="absolute left-4 top-4 rounded-full bg-bg/70 px-3 py-1 text-xs font-semibold text-muted hairline">
            Sample layout
          </span>
        )}
      </div>
      <div className="depth-1 p-6">
        <p className="text-sm font-semibold text-accent">{project.category}</p>
        <h3 className="mt-1 text-xl font-bold">{project.title}</h3>
        <p className="mt-2 leading-relaxed text-muted">{project.description}</p>
        {project.href && (
          <Button href={project.href} variant="ghost" className="!min-h-0 !px-0 !py-0 mt-4 text-sm" target="_blank" rel="noopener noreferrer">
            View project
          </Button>
        )}
      </div>
    </TiltCard>
  );
}
