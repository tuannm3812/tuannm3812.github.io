import { useId } from 'react';

// The one hand-drawn icon set for the portfolio (Mike, 18 Nov: every decorative
// icon is sketchy, in the site's blue and amber). Each icon pairs a brand-blue
// pen line, roughened and traced twice, with an amber blob behind it, matching
// the Caveat underline and key-term marker. Controls and arrows stay Lucide.
// Standalone SVG copies live in public/assets/artwork/ for decks and posts;
// regenerate them if a drawing here changes.

export const SKETCH_ICONS = {
  code: {
    blob: [17, 30, 11],
    paths: [
      'M17 14 C 12 18, 9 21, 7.5 24 C 10 27, 13 30, 17.5 34',
      'M31 14 C 36 18, 39 21, 40.5 24 C 38 27, 35 30, 30.5 34',
      'M27 11 C 25 20, 23 28, 21 37',
    ],
  },
  database: {
    blob: [30, 32, 11],
    paths: [
      'M10 13 C 10 9, 38 9, 38 13 C 38 17, 10 17, 10 13 Z',
      'M10 13 V 35 C 10 39.5, 38 39.5, 38 35 V 13',
      'M10 24 C 10 28, 38 28, 38 24',
    ],
  },
  flow: {
    blob: [33, 33, 9],
    paths: [
      'M8 12 H 18 V 20 H 8 Z',
      'M30 28 H 40 V 36 H 30 Z',
      'M18 16 C 26 16, 24 32, 29.5 32',
      'M26 29 L 30 32 L 26 35',
    ],
  },
  scatter: {
    blob: [16, 32, 10],
    paths: [
      'M7 40 C 18 36, 27 24, 41 9',
      'M10.6 33 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0 M15.6 37 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0 M18.6 27 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0 M24.6 29 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0 M27.6 19 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0 M32.6 22 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0 M36.6 13 a1.4 1.4 0 1 0 2.8 0 a1.4 1.4 0 1 0 -2.8 0',
    ],
  },
  rocket: {
    blob: [17, 33, 9],
    paths: [
      'M30 8 C 38 10, 40 14, 40 18 C 34 26, 28 30, 22 32 L 16 26 C 18 20, 22 14, 30 8 Z',
      'M29.4 17 a1.6 1.6 0 1 0 3.2 0 a1.6 1.6 0 1 0 -3.2 0',
      'M16 26 C 11 27, 9 31, 8 37 C 14 36, 18 34, 22 32',
      'M18 21 L 12 20 L 9 24',
      'M27 30 L 28 36 L 24 39',
    ],
  },
  nodes: {
    blob: [32, 31, 10],
    paths: [
      'M12 14 L 25 10 L 37 18 L 27 35 L 12 14 M 25 10 L 27 35',
      'M9.4 14 a2.6 2.6 0 1 0 5.2 0 a2.6 2.6 0 1 0 -5.2 0 M22.4 10 a2.6 2.6 0 1 0 5.2 0 a2.6 2.6 0 1 0 -5.2 0 M34.4 18 a2.6 2.6 0 1 0 5.2 0 a2.6 2.6 0 1 0 -5.2 0 M24.4 35 a2.6 2.6 0 1 0 5.2 0 a2.6 2.6 0 1 0 -5.2 0',
    ],
  },
  ledger: {
    blob: [30, 31, 10],
    paths: [
      'M11 9 H 31 L 37 15 V 40 H 11 Z',
      'M31 9 V 15 H 37',
      'M16 21 H 31 M16 27 H 31 M16 33 H 25',
      'M26 33 L 28.5 36 L 34 29',
    ],
  },
  compass: {
    blob: [18, 30, 10],
    paths: [
      'M24 7 C 33 7, 41 15, 41 24 C 41 33, 33 41, 24 41 C 15 41, 7 33, 7 24 C 7 15, 15 7, 24 7 Z',
      'M30 17 L 26.5 26.5 L 18 31 L 21.5 21.5 Z',
    ],
  },
  growth: {
    blob: [16, 33, 10],
    paths: ['M8 39 H 41', 'M10 33 L 19 24 L 26 29 L 39 13', 'M32 12.5 L 39.5 12.5 L 39.5 20'],
  },
  spark: {
    blob: [31, 31, 10],
    paths: [
      'M22 8 C 23 17, 25 20, 34 22 C 25 24, 23 27, 22 37 C 21 27, 19 24, 10 22 C 19 20, 21 17, 22 8 Z',
      'M36 7 V 13 M33 10 H 39',
      'M38 31 V 35 M36 33 H 40',
    ],
  },
  cap: {
    blob: [32, 33, 9],
    paths: [
      'M5 18 L 24 10 L 43 18 L 24 26 Z',
      'M13 22 V 31 C 18 36, 30 36, 35 31 V 22',
      'M41 19 V 30',
    ],
  },
  mail: {
    // Drawn on a 24 grid, rendered at 2x.
    grid: 24,
    blob: [30, 32, 10],
    paths: ['M3.5 6.5h17v11.5h-17z', 'M3.8 7l8.2 6.2 8.2-6.2'],
  },
  pin: {
    // Drawn on a 24 grid, rendered at 2x.
    grid: 24,
    blob: [30, 30, 9],
    paths: [
      'M12 21.2s-6.8-6.1-6.8-11.4a6.8 6.8 0 0 1 13.6 0c0 5.3-6.8 11.4-6.8 11.4z',
      'M12 7.3a2.4 2.4 0 1 1 0 4.8a2.4 2.4 0 1 1 0-4.8z',
    ],
  },
  linkedin: {
    // Drawn on a 24 grid, rendered at 2x.
    grid: 24,
    blob: [31, 31, 10],
    paths: [
      'M5.5 3.2h13a2.3 2.3 0 0 1 2.3 2.3v13a2.3 2.3 0 0 1-2.3 2.3h-13a2.3 2.3 0 0 1-2.3-2.3v-13a2.3 2.3 0 0 1 2.3-2.3z',
      'M8 10.6v6.6',
      'M8 7.4v.2',
      'M11.6 17.2v-6.6',
      'M11.6 13.4c0-1.7 1.2-2.8 2.7-2.8s2.5 1 2.5 2.9v3.7',
    ],
  },
  github: {
    // Drawn on a 24 grid, rendered at 2x.
    grid: 24,
    blob: [30, 30, 10],
    paths: [
      'M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4',
      'M9 18c-4.51 2-5-2-7-2',
    ],
  },
  kaggle: {
    // Drawn on a 24 grid, rendered at 2x.
    grid: 24,
    blob: [30, 30, 9],
    paths: ['M8 3.5v17', 'M17.2 6.5 8.4 14.6', 'M11.6 11.8l6.2 8.7'],
  },
  package: {
    // Drawn on a 24 grid, rendered at 2x.
    grid: 24,
    blob: [30, 31, 10],
    paths: [
      'M12 2.8l8.5 4.6v9.2L12 21.2l-8.5-4.6V7.4z',
      'M3.8 7.6 12 12l8.2-4.4',
      'M12 12v9',
      'M7.8 5.1l8.4 4.6',
    ],
  },
  eye: {
    // Drawn on a 24 grid, rendered at 2x.
    grid: 24,
    blob: [30, 30, 9],
    paths: [
      'M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12z',
      'M12 9a3 3 0 1 1 0 6a3 3 0 1 1 0-6z',
    ],
  },
} as const;

export type SketchIconName = keyof typeof SKETCH_ICONS;

interface SketchIcon {
  grid?: 24;
  blob: readonly [number, number, number];
  paths: readonly string[];
}

export default function SketchIcon({
  name,
  size = 48,
  className = '',
}: {
  name: SketchIconName;
  size?: number;
  className?: string;
}) {
  const filterId = `sketch-${useId().replace(/:/g, '')}`;
  const icon: SketchIcon = SKETCH_ICONS[name];
  const [cx, cy, r] = icon.blob;
  const scale = icon.grid === 24 ? 2 : 1;
  const lines = (width: number) => (
    <g transform={scale === 2 ? 'scale(2)' : undefined} strokeWidth={width / scale}>
      {icon.paths.map((d) => (
        <path key={d} d={d} />
      ))}
    </g>
  );
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 overflow-visible text-brand dark:text-sky-300 ${className}`}
    >
      <defs>
        <filter id={filterId} filterUnits="userSpaceOnUse" x="-6" y="-6" width="60" height="60">
          <feTurbulence type="fractalNoise" baseFrequency="0.06" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="2.6" />
        </filter>
      </defs>
      <circle cx={cx} cy={cy} r={r} className="fill-amber-300/80 dark:fill-amber-400/45" />
      <g
        filter={`url(#${filterId})`}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {lines(2.6)}
        {/* A lighter second pass, slightly off the first, for the pen-retrace look. */}
        <g transform="translate(1.1 -0.9)" opacity={0.45}>
          {lines(1.4)}
        </g>
      </g>
    </svg>
  );
}
