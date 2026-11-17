import type { ReactNode } from 'react';

/** Handwritten Title Case eyebrow over a bold h2; used on Experience and Projects. */
export default function SectionHeading({
  hand,
  title,
  id,
  aside,
}: {
  hand: string;
  title: string;
  id?: string;
  aside?: ReactNode;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div className="space-y-1.5">
        <p className="hand-eyebrow">{hand}</p>
        <h2 id={id} className="text-3xl font-bold tracking-tight md:text-4xl">
          {title}
        </h2>
      </div>
      {aside && (
        <span className="pb-1.5 text-sm font-semibold tabular-nums text-slate-400 dark:text-slate-500">
          {aside}
        </span>
      )}
    </div>
  );
}
