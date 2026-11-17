import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/resume';
import { getProjectCard } from '../lib/projectCards';
import TagChip from './TagChip';
/**
 * One line per project: for Kaggle and coursework, where a wall of cards is too
 * heavy. Rows are numbered rather than logo-marked, because every row in a
 * section shares the same organisation and the section heading already names it.
 */
export default function ProjectIndex({ projects }: { projects: Project[] }) {
  return (
    <ol className="surface-card divide-y divide-slate-200/80 overflow-hidden dark:divide-slate-800/80">
      {projects.map((project, index) => {
        const href = project.demo ?? project.github;
        const card = getProjectCard(project);
        const body = (
          <>
            <span className="text-xs font-bold tabular-nums text-brand dark:text-sky-300">
              {String(index + 1).padStart(2, '0')}
            </span>
            <span className="min-w-0">
              <span className="block font-semibold text-slate-900 group-hover:text-brand dark:text-white">
                {card.title}
              </span>
              <span className="block text-sm text-slate-500 dark:text-slate-400 md:hidden">
                {card.description}
              </span>
            </span>
            <span className="hidden text-sm text-slate-600 md:block dark:text-slate-400">
              {card.description}
            </span>
            <span className="hidden flex-wrap gap-1 lg:flex">
              {card.tags.slice(0, 2).map((tag) => (
                <TagChip key={tag} tag={tag} size="xs" />
              ))}
            </span>
            {href && (
              <ArrowUpRight
                size={16}
                aria-hidden="true"
                className="text-slate-400 group-hover:text-brand"
              />
            )}
          </>
        );
        const grid =
          'group grid grid-cols-[1.75rem_minmax(0,1fr)_1rem] items-center gap-x-4 px-5 py-3.5 md:grid-cols-[1.75rem_minmax(0,1fr)_minmax(0,1.4fr)_1rem] lg:grid-cols-[1.75rem_minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,0.9fr)_1rem]';
        return (
          <li key={project.title}>
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className={`${grid} transition-colors hover:bg-brand/5`}
              >
                {body}
              </a>
            ) : (
              <div className={grid}>{body}</div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
