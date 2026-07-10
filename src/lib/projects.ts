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
