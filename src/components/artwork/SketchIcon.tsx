import {
  ChartScatter,
  CodeXml,
  Compass,
  Database,
  Eye,
  FileCheck2,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Network,
  Package,
  Rocket,
  Sparkles,
  TrendingUp,
  Workflow,
  type LucideIcon,
} from 'lucide-react';

// The portfolio's one decorative icon set (Mike, 18 Nov): a clean brand-blue
// line icon over a small amber dot, the same blue-and-amber pairing as the
// Caveat underline and the key-term marker. It replaced a hand-drawn set that
// read as unpolished. Lines are Lucide; Kaggle has no Lucide icon, so its "k"
// is drawn here on the same 24 grid and stroke. Arrows and controls elsewhere
// use plain Lucide. Standalone SVG copies live in public/assets/artwork/;
// regenerate them if this file changes.

const KaggleK: LucideIcon = (({ size = 24, ...rest }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...rest}
  >
    <path d="M8 3.5v17" />
    <path d="M17.5 6.5 8.5 14.5" />
    <path d="M11.8 11.8 18 20.5" />
  </svg>
)) as LucideIcon;

export const SKETCH_ICONS = {
  code: CodeXml,
  database: Database,
  flow: Workflow,
  scatter: ChartScatter,
  rocket: Rocket,
  nodes: Network,
  ledger: FileCheck2,
  compass: Compass,
  growth: TrendingUp,
  spark: Sparkles,
  cap: GraduationCap,
  mail: Mail,
  pin: MapPin,
  linkedin: Linkedin,
  github: Github,
  kaggle: KaggleK,
  package: Package,
  eye: Eye,
} satisfies Record<string, LucideIcon>;

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
  const Icon = SKETCH_ICONS[name];
  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      aria-hidden="true"
      focusable="false"
      className={`shrink-0 text-brand dark:text-sky-300 ${className}`}
    >
      <circle cx={30} cy={30} r={10} className="fill-amber-300 dark:fill-amber-400/40" />
      {/* Lucide draws on a 24 grid; place it at 2/3 of the 48 box, stroke 1.75. */}
      <Icon x={8} y={8} width={32} height={32} strokeWidth={1.75} absoluteStrokeWidth={false} />
    </svg>
  );
}
