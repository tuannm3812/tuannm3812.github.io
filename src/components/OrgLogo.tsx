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
      className="inline-flex shrink-0 rounded-[22%] bg-blue-50 ring-1 ring-brand/15 dark:bg-slate-900 dark:ring-sky-300/20"
      style={{ width: size, height: size, padding: pad }}
    >
      <span
        aria-hidden="true"
        className="h-full w-full bg-brand dark:bg-sky-300"
        style={{ mask, WebkitMask: mask }}
      />
    </span>
  );
}
