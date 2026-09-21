import Logo from '../components/Logo';
import { site } from '../config/site';

const links = [
  ['Services', '#services'], ['Marketplace', '#marketplace'], ['Work', '#work'], ['About', '#about'], ['Contact', '#contact'],
];

export default function Footer() {
  return (
    <footer className="border-t border-line py-12">
      <div className="container-x flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo />
          <p className="mt-3 max-w-xs text-sm text-muted">{site.tagline}</p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {links.map(([label, href]) => (
              <li key={href}><a href={href} className="text-sm text-muted transition-colors hover:text-accent">{label}</a></li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="container-x mt-10 space-y-2 text-sm text-muted">
        <p>Meesho, Amazon and Flipkart are trademarks of their respective owners. {site.name} is an independent service provider and is not affiliated with or endorsed by them.</p>
        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
