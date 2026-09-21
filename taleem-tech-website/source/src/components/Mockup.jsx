/** Small CSS-drawn previews so placeholder projects look like real work without stock imagery. */
const bar = 'rounded-full bg-white/15';

function Browser() {
  return (
    <div className="w-4/5 overflow-hidden rounded-xl border border-white/10 bg-surface-2 shadow-2xl">
      <div className="flex gap-1.5 border-b border-white/10 px-3 py-2">
        <i className="h-2 w-2 rounded-full bg-white/20" /><i className="h-2 w-2 rounded-full bg-white/20" /><i className="h-2 w-2 rounded-full bg-white/20" />
      </div>
      <div className="space-y-2.5 p-4">
        <div className={`h-3 w-2/3 ${bar}`} /><div className={`h-2 w-1/2 ${bar}`} />
        <div className="grid grid-cols-3 gap-2 pt-2">
          <div className="h-14 rounded-lg bg-accent/70" /><div className="h-14 rounded-lg bg-white/10" /><div className="h-14 rounded-lg bg-white/10" />
        </div>
      </div>
    </div>
  );
}
function Phone() {
  return (
    <div className="h-4/5 w-24 rounded-[1.4rem] border border-white/15 bg-surface-2 p-2 shadow-2xl">
      <div className="mx-auto mb-2 h-1 w-8 rounded-full bg-white/20" />
      <div className="space-y-2">
        <div className="h-10 rounded-xl bg-accent/70" />
        {[0, 1, 2].map((i) => <div key={i} className="h-7 rounded-lg bg-white/10" />)}
      </div>
    </div>
  );
}
function Social() {
  const tones = ['bg-accent/70', 'bg-white/10', 'bg-white/20', 'bg-white/10', 'bg-accent/40', 'bg-white/15'];
  return (
    <div className="grid w-3/5 grid-cols-3 gap-2 shadow-2xl">
      {tones.map((t, i) => <div key={i} className={`aspect-square rounded-lg ${t}`} />)}
    </div>
  );
}
function Video() {
  return (
    <div className="w-4/5 rounded-xl border border-white/10 bg-surface-2 p-3 shadow-2xl">
      <div className="grid aspect-video place-items-center rounded-lg bg-white/[.06]">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-accent text-accent-ink">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
        </span>
      </div>
      <div className="mt-3 h-1.5 rounded-full bg-white/10"><div className="h-full w-1/3 rounded-full bg-accent" /></div>
    </div>
  );
}
function Brand() {
  return (
    <div className="w-4/5 rounded-xl border border-white/10 bg-surface-2 p-4 shadow-2xl">
      <svg width="40" height="40" viewBox="0 0 64 64"><path d="M32 8 52 20v24L32 56 12 44V20z" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinejoin="round" /></svg>
      <div className="mt-3 flex gap-2">
        {['bg-accent', 'bg-white/80', 'bg-white/30', 'bg-white/10'].map((c) => <i key={c} className={`h-6 w-6 rounded-full ${c}`} />)}
      </div>
      <div className={`mt-3 h-2 w-1/2 ${bar}`} />
    </div>
  );
}
function Catalog() {
  return (
    <div className="grid w-3/5 grid-cols-2 gap-2 shadow-2xl">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="rounded-lg border border-white/10 bg-surface-2 p-2">
          <div className={`aspect-[4/3] rounded ${i === 0 ? 'bg-accent/70' : 'bg-white/10'}`} />
          <div className={`mt-2 h-1.5 w-2/3 ${bar}`} />
        </div>
      ))}
    </div>
  );
}

const map = { browser: Browser, phone: Phone, social: Social, video: Video, brand: Brand, catalog: Catalog };

export default function Mockup({ type }) {
  const Comp = map[type] || Browser;
  return <Comp />;
}
