import { githubProjects } from '../data/githubProjects';
import { projectPriority } from '../data/projectPriority';
import { projectOrigin } from '../data/projectOrigin';
import type { ProjectOrigin } from '../data/projectOrigin';
import { resumeData } from '../data/resume';
import type { Project } from '../data/resume';

export function getProjectRank(title: string) {
  return projectPriority[title] || { score: 0, stars: 0 };
}

export function isKaggleProject(project: Pick<Project, 'title' | 'category' | 'stack'>) {
  return (
    project.category.includes('Kaggle') ||
    project.title.toLowerCase().includes('kaggle') ||
    project.stack.some((tech) => tech.toLowerCase().includes('kaggle'))
  );
}

export function getPortfolioProjects() {
  const curatedGithubLinks = new Set(
    resumeData.projects.map((project) => project.github).filter(Boolean),
  );

  return [
    ...resumeData.projects,
    ...githubProjects.filter((project) => !curatedGithubLinks.has(project.github)),
  ].sort(
    (a, b) =>
      getProjectRank(b.title).score - getProjectRank(a.title).score ||
      a.title.localeCompare(b.title),
  );
}

/** Stars a project needs in projectPriority.ts to lead the Projects page. */
export const FLAGSHIP_STARS = 3;

/**
 * Splits a ranked project list into flagship work (every 3-star entry in
 * projectPriority.ts, in rank order) and the rest. Rank order is preserved on
 * both sides, so the caller can pass an already-sorted list straight through.
 */
export function splitFlagshipProjects<T extends Pick<Project, 'title'>>(projects: T[]) {
  const flagship: T[] = [];
  const archive: T[] = [];
  for (const project of projects) {
    (getProjectRank(project.title).stars >= FLAGSHIP_STARS ? flagship : archive).push(project);
  }
  return { flagship, archive };
}

/** Section order on the Projects page: self-initiated work first, set coursework last. */
export const ORIGIN_SECTIONS: { origin: ProjectOrigin; title: string; note: string }[] = [
  { origin: 'personal', title: 'Self-initiated', note: 'Products and tools I scoped myself' },
  { origin: 'hackathon', title: 'Hackathons & events', note: 'Built against the clock' },
  { origin: 'kaggle', title: 'Kaggle', note: 'Competitions and simulations' },
  { origin: 'other', title: 'Other projects', note: 'Earlier public builds' },
  { origin: 'coursework', title: 'Coursework', note: 'Set assignments at UTS' },
];

/**
 * A project's origin: the projectOrigin.ts entry when there is one, otherwise
 * "kaggle" for anything that reads as a Kaggle project, otherwise "other".
 */
export function getProjectOrigin(
  project: Pick<Project, 'title' | 'category' | 'stack'>,
): ProjectOrigin {
  return projectOrigin[project.title] ?? (isKaggleProject(project) ? 'kaggle' : 'other');
}

const PLAYGROUND_TITLE = /^Kaggle (S\d+E\d+)\b/;

/** The Playground Series episode code ("S6E4") for a monthly Playground card, else null. */
export function getPlaygroundEpisode(title: string) {
  return PLAYGROUND_TITLE.exec(title)?.[1] ?? null;
}

/**
 * Groups a ranked list into ORIGIN_SECTIONS order, keeping rank order inside
 * each group. Kaggle Playground episodes are pulled out into their own list,
 * sorted by episode, so the page can show them as one table instead of a
 * dozen near-identical cards.
 */
export function groupProjectsByOrigin<T extends Pick<Project, 'title' | 'category' | 'stack'>>(
  projects: T[],
) {
  const groups = new Map<ProjectOrigin, T[]>(ORIGIN_SECTIONS.map(({ origin }) => [origin, []]));
  const playground: T[] = [];
  for (const project of projects) {
    if (getPlaygroundEpisode(project.title)) playground.push(project);
    else groups.get(getProjectOrigin(project))!.push(project);
  }
  const episodeNumber = (title: string) =>
    Number(getPlaygroundEpisode(title)!.replace(/^S\d+E/, ''));
  playground.sort((a, b) => episodeNumber(a.title) - episodeNumber(b.title));
  return { groups, playground };
}
