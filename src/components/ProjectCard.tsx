import { motion } from 'motion/react';
import { ExternalLink, Github, Star, Trophy } from 'lucide-react';
import type { Project } from '../data/resume';
import { getProjectRank, isKaggleProject } from '../lib/projects';

export default function ProjectCard({
  project,
  onTagClick,
  rank,
  className = '',
}: {
  project: Project;
  onTagClick?: (tag: string) => void;
  /** 1-based position in the flagship list; shown as "01", "02", ... */
  rank?: number;
  className?: string;
}) {
  const projectRank = getProjectRank(project.title);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className={
        'surface-card surface-card-hover group relative flex h-full flex-col p-5 ' +
        (rank ? 'border-t-2 border-t-ink dark:border-t-slate-200 ' : '') +
        className
      }
    >
      <div className="relative z-10 flex-1 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              {rank && (
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                  {String(rank).padStart(2, '0')}
                </span>
              )}
              {project.stack.length > 0 && <span className="brand-pill">{project.stack[0]}</span>}
              {isKaggleProject(project) && (
                <span
                  className="inline-flex items-center gap-1 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400"
                  title="Kaggle competition project"
                >
                  <Trophy size={12} />
                  Kaggle
                </span>
              )}
            </div>
            {projectRank.stars > 0 && (
              <span
                className="flex items-center gap-0.5 text-ink dark:text-slate-200"
                aria-label={`${projectRank.stars} star project`}
                title={`${projectRank.stars} star project`}
              >
                {Array.from({ length: projectRank.stars }).map((_, starIndex) => (
                  <Star key={starIndex} size={11} fill="currentColor" strokeWidth={1.5} />
                ))}
              </span>
            )}
          </div>
          <h4 className="text-xl font-bold leading-tight">{project.title}</h4>
          {project.impact && (
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {project.impact}
            </p>
          )}
        </div>

        <ul className="space-y-2">
          {project.points.slice(0, 2).map((point, index) => (
            <li
              key={index}
              className="flex gap-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400"
            >
              <span className="mt-[0.45rem] h-px w-2.5 flex-shrink-0 bg-slate-400" />
              {point}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1 pt-1">
          {project.stack.map((tech, techIndex) => (
            <button
              key={`${tech}-${techIndex}`}
              onClick={() => onTagClick?.(tech)}
              disabled={!onTagClick}
              className={`tech-tag transition-colors ${
                onTagClick ? 'cursor-pointer hover:border-brand hover:text-brand' : ''
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-5 flex flex-wrap gap-5 border-t border-rule pt-3 dark:border-rule-dark">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-ink underline-offset-4 hover:text-brand hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:text-slate-100 dark:hover:text-brand-light"
          >
            <Github size={13} />
            Source code
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 text-xs font-semibold text-brand underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand dark:text-brand-light"
          >
            <ExternalLink size={13} />
            Live demo
          </a>
        )}
      </div>
    </motion.div>
  );
}
