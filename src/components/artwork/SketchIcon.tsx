// Hand-drawn icon set for the portfolio. Each icon pairs blue ink strokes with
// an amber blob behind it, matching the Caveat underline and key-term marker.
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
} as const;

export type SketchIconName = keyof typeof SKETCH_ICONS;

export default function SketchIcon({
  name,
  size = 48,
  className = '',
}: {
  name: SketchIconName;
  size?: number;
  className?: string;
}) {
  const icon = SKETCH_ICONS[name];
  const [cx, cy, r] = icon.blob;
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      aria-hidden="true"
      className={`text-brand dark:text-sky-300 ${className}`}
    >
      <circle cx={cx} cy={cy} r={r} className="fill-amber-300/70 dark:fill-amber-500/35" />
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth={2.4}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {icon.paths.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}
