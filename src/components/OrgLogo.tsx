import { ORG_LOGOS } from '../data/orgLogos';

export default function OrgLogo({ id, size = 40 }: { id: string; size?: number }) {
  const logo = ORG_LOGOS[id];
  if (!logo) return null;
  const pad = Math.round(size * (logo.inset ?? 0.18));
  return (
    <span
      title={logo.name}
      className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-[22%] ring-1 ring-slate-900/10 dark:ring-white/10"
      style={{ width: size, height: size, background: logo.bg, padding: logo.src ? pad : 0 }}
    >
      {logo.src ? (
        <img
          src={logo.src}
          alt={`${logo.name} logo`}
          width={size}
          height={size}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      ) : (
        <span
          aria-label={`${logo.name} logo`}
          role="img"
          className="font-extrabold tracking-tight"
          style={{ color: logo.ink, fontSize: size * (logo.monogram!.length > 2 ? 0.3 : 0.4) }}
        >
          {logo.monogram}
        </span>
      )}
    </span>
  );
}
