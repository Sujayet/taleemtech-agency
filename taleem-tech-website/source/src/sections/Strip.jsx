const words = ['Websites', 'Mobile apps', 'Video editing', 'Graphic design', 'Meesho', 'Amazon', 'Flipkart', 'Meta ads', 'Google Business', 'GST filing'];

function Row({ hidden }) {
  return (
    <ul className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {words.map((w) => (
        <li key={w} className="flex items-center">
          <span className="px-7 font-display text-xl font-semibold text-ink/80 sm:text-2xl">{w}</span>
          <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className="text-accent"><path d="M5 0 10 5 5 10 0 5z" fill="currentColor" /></svg>
        </li>
      ))}
    </ul>
  );
}

export default function Strip() {
  return (
    <div className="group relative overflow-hidden border-y border-line py-6" aria-label="What we work on">
      <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
        <Row />
        <Row hidden />
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-bg to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-bg to-transparent" />
    </div>
  );
}
