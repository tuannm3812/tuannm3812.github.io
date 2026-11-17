import { useId } from 'react';

// Hand-drawn icons in the site's two inks (Mike, 18 Nov): an amber marker blob
// behind, a brand-blue pen line on top, drawn twice and roughened so it reads
// as a sketch, like the amber hand-underline and the Caveat eyebrows.
// Used for every decorative icon on Home, Contact and the footer, so the set
// looks like one person drew it. Arrows and controls stay Lucide.

export type SketchIconName =
  'mail' | 'pin' | 'linkedin' | 'github' | 'kaggle' | 'database' | 'package' | 'eye';

/** Pen strokes on a 24 x 24 grid. */
const STROKES: Record<SketchIconName, string[]> = {
  mail: ['M3.5 6.5h17v11.5h-17z', 'M3.8 7l8.2 6.2 8.2-6.2'],
  pin: [
    'M12 21.2s-6.8-6.1-6.8-11.4a6.8 6.8 0 0 1 13.6 0c0 5.3-6.8 11.4-6.8 11.4z',
    'M12 7.3a2.4 2.4 0 1 1 0 4.8a2.4 2.4 0 1 1 0-4.8z',
  ],
  linkedin: [
    'M5.5 3.2h13a2.3 2.3 0 0 1 2.3 2.3v13a2.3 2.3 0 0 1-2.3 2.3h-13a2.3 2.3 0 0 1-2.3-2.3v-13a2.3 2.3 0 0 1 2.3-2.3z',
    'M8 10.6v6.6',
    'M8 7.4v.2',
    'M11.6 17.2v-6.6',
    'M11.6 13.4c0-1.7 1.2-2.8 2.7-2.8s2.5 1 2.5 2.9v3.7',
  ],
  github: [
    'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4',
    'M9 18c-4.51 2-5-2-7-2',
  ],
  database: [
    'M4.5 6c0-1.7 3.4-3 7.5-3s7.5 1.3 7.5 3-3.4 3-7.5 3-7.5-1.3-7.5-3z',
    'M4.5 6v12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3V6',
    'M4.5 12c0 1.7 3.4 3 7.5 3s7.5-1.3 7.5-3',
  ],
  package: [
    'M12 2.8l8.5 4.6v9.2L12 21.2l-8.5-4.6V7.4z',
    'M3.8 7.6 12 12l8.2-4.4',
    'M12 12v9',
    'M7.8 5.1l8.4 4.6',
  ],
  eye: [
    'M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12z',
    'M12 9a3 3 0 1 1 0 6a3 3 0 1 1 0-6z',
  ],
  kaggle: ['M8 3.5v17', 'M17.2 6.5 8.4 14.6', 'M11.6 11.8l6.2 8.7'],
};

/** One loose amber blob, sitting low and right like a marker swipe. */
const BLOB =
  'M7.2 8.6c2.1-3.3 7.6-4.2 10.9-1.9 3.2 2.3 3.6 7.6.9 10.6-2.6 3-8.4 3.5-11.3 1-2.8-2.5-2.6-6.6-.5-9.7z';

export default function SketchIcon({ name, size = 26 }: { name: SketchIconName; size?: number }) {
  const filterId = `sketch-${useId().replace(/:/g, '')}`;
  const strokes = STROKES[name];
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className="shrink-0 overflow-visible"
    >
      <defs>
        <filter id={filterId} filterUnits="userSpaceOnUse" x="-4" y="-4" width="32" height="32">
          <feTurbulence type="fractalNoise" baseFrequency="0.12" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="1.4" />
        </filter>
      </defs>
      <path
        d={BLOB}
        transform="translate(1.2 1.4)"
        className="fill-amber-300 dark:fill-amber-400/45"
      />
      <g
        filter={`url(#${filterId})`}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-brand dark:stroke-sky-300"
      >
        {strokes.map((d) => (
          <path key={d} d={d} strokeWidth={1.9} />
        ))}
        {/* A lighter second pass, slightly off the first, for the pen-retrace look. */}
        <g transform="translate(0.6 -0.45)" opacity={0.45}>
          {strokes.map((d) => (
            <path key={d} d={d} strokeWidth={1.1} />
          ))}
        </g>
      </g>
    </svg>
  );
}
