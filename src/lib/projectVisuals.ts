import { selectedWork } from '../data/selectedWork';
import { PROJECT_LOGO } from '../data/orgLogos';
import { PROJECT_CARDS } from '../data/projectCards';
import type { Project } from '../data/resume';
import { isKaggleProject } from './projects';
import type { ProjectCard } from './projectCards';

export type CoverKind = 'agent' | 'ml' | 'data' | 'vision';

/**
 * Poster thumbnail for projects that have one (same files as the Home gallery).
 * The gallery uses the card title from projectCards.ts, not the source title,
 * so match on that. Matching on the source title silently dropped the
 * Text-to-SQL, Agent Harness and Wildfire posters on 17 Nov.
 */

// Cover images for projects outside the Home gallery.
const EXTRA_THUMBS: Record<string, string> = {
  // Off the Home gallery since 21 Nov, so its poster is listed here instead.
  CircleU: '/assets/posters/circleu-thumb.webp',
  'UTS Tech Festival 2026 GenAI Hackathon': '/assets/posters/techfest-thumb.webp',
  'FarmLens: NSW Crop Suitability Explorer': '/assets/posters/farmlens-thumb.webp',
  'Half-time Briefing: Microsoft x Premier League Hackathon': '/assets/posters/halftime-thumb.webp',
};

export function getProjectPoster(project: Pick<Project, 'title'>): string | undefined {
  const cardTitle = PROJECT_CARDS[project.title]?.title ?? project.title;
  return (
    EXTRA_THUMBS[project.title] ?? selectedWork.find((work) => work.title === cardTitle)?.thumb
  );
}

/** Drawn-cover motif from the card's main skill (projectCards.ts). */
export function getCoverKind(card: Pick<ProjectCard, 'group' | 'tags'>): CoverKind {
  if (card.group === 'ai') return 'agent';
  if (card.group === 'data' || card.group === 'analytics') return 'data';
  if (card.tags[0] === 'Computer Vision') return 'vision';
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
