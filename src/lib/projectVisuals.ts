import { selectedWork } from '../data/selectedWork';
import { PROJECT_LOGO } from '../data/orgLogos';
import type { Project } from '../data/resume';
import { isKaggleProject } from './projects';

export type CoverKind = 'agent' | 'ml' | 'data' | 'vision';

/** Poster thumbnail for projects that have one (same files as the Home gallery). */
// Project cards whose title differs from the gallery title.
const POSTER_ALIASES: Record<string, string> = {
  'UNSW MA Hackathon 2026': 'kiva',
};

export function getProjectPoster(project: Pick<Project, 'title'>): string | undefined {
  const alias = POSTER_ALIASES[project.title];
  return selectedWork.find((work) => work.id === alias || work.title === project.title)?.thumb;
}

export function getCoverKind(project: Pick<Project, 'category'>): CoverKind {
  if (project.category.includes('Agents')) return 'agent';
  if (project.category.includes('Vision')) return 'vision';
  if (project.category.includes('Data Engineering')) return 'data';
  return 'ml';
}

export function getProjectLogo(project: Pick<Project, 'title' | 'category' | 'stack'>) {
  return PROJECT_LOGO[project.title] ?? (isKaggleProject(project) ? 'kaggle' : undefined);
}

/**
 * Drawn covers for projects without a poster. Each kind has its own motif and
 * palette, so a page of 40 cards reads as designed without any image files.
 */
export const COVERS: Record<
  CoverKind,
  { label: string; bg: string; darkBg: string; ink: string; path: string; dots: number[][] }
> = {
  agent: {
    label: 'agents',
    bg: '#eef2ff',
    darkBg: '#1e1b4b',
    ink: '#0540f2',
    path: 'M60 60 L150 40 L240 80 L170 130 L60 60 M150 40 L170 130 M240 80 L290 30',
    dots: [
      [60, 60, 7],
      [150, 40, 7],
      [240, 80, 7],
      [170, 130, 7],
      [290, 30, 5],
    ],
  },
  ml: {
    label: 'models',
    bg: '#fef3c7',
    darkBg: '#422006',
    ink: '#b45309',
    path: 'M20 150 C 90 140, 160 90, 300 30',
    dots: [
      [40, 120, 4],
      [70, 140, 4],
      [95, 100, 4],
      [130, 115, 4],
      [160, 80, 4],
      [190, 95, 4],
      [220, 60, 4],
      [250, 70, 4],
      [280, 40, 4],
      [110, 70, 4],
    ],
  },
  data: {
    label: 'pipelines',
    bg: '#ecfdf5',
    darkBg: '#022c22',
    ink: '#047857',
    path: 'M30 90 H90 M130 90 H190 M230 90 H290 M90 90 C110 60, 110 60, 130 90',
    dots: [
      [30, 90, 8],
      [110, 75, 8],
      [210, 90, 8],
      [290, 90, 8],
    ],
  },
  vision: {
    label: 'vision',
    bg: '#fdf2f8',
    darkBg: '#3b0a24',
    ink: '#be185d',
    path: 'M40 30 H280 V150 H40 Z M120 30 V150 M200 30 V150 M40 90 H280 M150 60 L230 120',
    dots: [
      [150, 60, 6],
      [230, 120, 6],
    ],
  },
};
