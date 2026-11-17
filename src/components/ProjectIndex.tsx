import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/resume';
import { getProjectLogo } from '../lib/projectVisuals';
import OrgLogo from './OrgLogo';

/** One line per project: for Kaggle and coursework, where a wall of cards is too heavy. */
export default function ProjectIndex({ projects }: { projects: Project[] }) {
  return (
    <ol className="surface-card divide-y divide-slate-200/80 overflow-hidden dark:divide-slate-800/80">
      {projects.map((project) => {
        const href = project.demo ?? project.github;
        const logo = getProjectLogo(project);
        const body = (
          <>
            <span className="flex h-7 w-7 items-center justify-center">
              {logo ? (
                <OrgLogo id={logo} size={26} />
              ) : (
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-slate-400" />
              )}
            </span>
            <span className="min-w-0">
              <span className="block font-semibold text-slate-900 group-hover:text-brand dark:text-white">
                {project.title}
              </span>
              {project.impact && (
                <span className="block text-sm text-slate-500 dark:text-slate-400 md:hidden">
                  {project.impact}
                </span>
              )}
            </span>
            <span className="hidden text-sm text-slate-600 md:block dark:text-slate-400">
              {project.impact}
            </span>
            <span className="hidden text-xs font-semibold text-slate-500 lg:block dark:text-slate-400">
              {project.stack.slice(0, 3).join(' · ')}
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
