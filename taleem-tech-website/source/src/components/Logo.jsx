import { site } from '../config/site';

/** 3D "TT" mark (public/brand/logo-mark-3d.webp) + wordmark. The full circular badge lives in the About section. */
export default function Logo({ className = '' }) {
  const logoUrl = `${import.meta.env.BASE_URL}brand/logo-mark-3d.webp`;

  return (
    <span className={`inline-flex items-center gap-2.5 font-display text-lg font-bold tracking-tight ${className}`}>
      <img src={logoUrl} width="36" height="35" alt="" decoding="async" className="h-9 w-auto" />
      {site.name}
    </span>
  );
}
