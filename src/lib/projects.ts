import { githubProjects } from '../data/githubProjects';
import { projectPriority } from '../data/projectPriority';
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
