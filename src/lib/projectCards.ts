import { PROJECT_CARDS } from '../data/projectCards';
import { TAG_GROUPS, getTagGroup, type TagGroup } from '../data/tagVocabulary';
import type { ProjectOrigin } from '../data/projectOrigin';
import type { Project } from '../data/resume';
import { getProjectOrigin } from './projects';

const ORIGIN_LABEL: Record<ProjectOrigin, string> = {
  personal: 'Self-Initiated',
  hackathon: 'Hackathon',
  kaggle: 'Kaggle',
  other: 'Side Project',
  coursework: 'Coursework',
};

export interface ProjectCard {
  title: string;
  description: string;
  tags: string[];
  /** The card's main skill area: the group of its first tag. */
  group: TagGroup;
  /** "Type of Work · Origin", e.g. "Machine Learning · Hackathon". */
  label: string;
}

/**
 * The copy a card shows. Every project should have a PROJECT_CARDS entry (a
 * test enforces it); the fallback only keeps the page rendering meanwhile.
 */
export function getProjectCard(project: Pick<Project, 'title' | 'impact' | 'stack' | 'category'>) {
  const copy = PROJECT_CARDS[project.title];
  const tags = copy ? [...copy.tags] : project.stack.slice(0, 3);
  const group = getTagGroup(tags[0] ?? '');
  return {
    title: copy?.title ?? project.title,
    description: copy?.description ?? project.impact ?? '',
    tags,
    group,
    label: `${TAG_GROUPS[group].label} · ${ORIGIN_LABEL[getProjectOrigin(project)]}`,
  } satisfies ProjectCard;
}
