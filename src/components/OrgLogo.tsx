import { ORG_LOGOS, logoMask } from '../data/orgLogos';

export default function OrgLogo({ id, size = 40 }: { id?: string; size?: number }) {
  const logo = id ? ORG_LOGOS[id] : undefined;
  if (!id || !logo) return null;
  const pad = Math.round(size * (logo.inset ?? 0.18));
  const mask = `url(${logoMask(id)}) center / contain no-repeat`;
  return (
    <span
      role="img"
      aria-label={`${logo.name} logo`}
      title={logo.name}
      className="inline-flex shrink-0 rounded-[22%] bg-white ring-1 ring-slate-900/10 dark:bg-slate-900 dark:ring-white/10"
      style={{ width: size, height: size, padding: pad }}
    >
      <span
        aria-hidden="true"
        className="h-full w-full bg-slate-800 dark:bg-slate-200"
        style={{ mask, WebkitMask: mask }}
      />
    </span>
  );
}
