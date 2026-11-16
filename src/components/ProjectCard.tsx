import { useState } from 'react';
import type { MouseEvent } from 'react';
import { motion } from 'motion/react';
import { ExternalLink, Github, Star, Trophy } from 'lucide-react';
import type { Project } from '../data/resume';
import { getProjectRank, isKaggleProject } from '../lib/projects';

export default function ProjectCard({
  project,
  onTagClick,
}: {
  project: Project;
  onTagClick?: (tag: string) => void;
}) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const projectRank = getProjectRank(project.title);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      onMouseMove={handleMouseMove}
      className="surface-card group relative flex h-full flex-col overflow-hidden p-5 transition-transform duration-300 hover:-translate-y-0.5"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(5, 64, 242, 0.055), transparent 80%)`,
        }}
      />

      <div className="relative z-10 flex-1 space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {project.stack.length > 0 && (
                <span className="brand-pill px-2.5 py-1">{project.stack[0]}</span>
              )}
              {isKaggleProject(project) && (
                <span
                  className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-sky-700 dark:border-sky-800 dark:bg-sky-950/70 dark:text-sky-300"
                  title="Kaggle competition project"
                >
                  <Trophy size={12} />
                  Kaggle
                </span>
              )}
            </div>
            {projectRank.stars > 0 && (
              <span
                className="flex items-center gap-0.5 text-amber-400"
                aria-label={`${projectRank.stars} star project`}
                title={`${projectRank.stars} star project`}
              >
                {Array.from({ length: projectRank.stars }).map((_, starIndex) => (
                  <Star key={starIndex} size={13} fill="currentColor" strokeWidth={1.5} />
                ))}
              </span>
            )}
          </div>
          <h4 className="text-lg font-bold leading-tight transition-colors group-hover:text-brand">
            {project.title}
          </h4>
          {project.impact && (
            <p className="relative pl-3 text-xs font-semibold leading-relaxed text-slate-500 dark:text-slate-400">
              <span className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-0.5 rounded-full bg-brand/60" />
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
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
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
              className={`rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[11px] font-semibold text-slate-600 transition-colors dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400 ${
                onTagClick
                  ? 'cursor-pointer hover:border-brand/45 hover:bg-brand/5 hover:text-brand'
                  : ''
              }`}
            >
              {tech}
            </button>
          ))}
        </div>
      </div>

      <div className="relative z-10 mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg bg-slate-950 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 dark:bg-white dark:text-slate-950 dark:hover:bg-brand dark:hover:text-white"
          >
            <Github size={13} />
            Source Code
          </a>
        )}
        {project.demo && (
          <a
            href={project.demo}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-700 transition-all hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
          >
            <ExternalLink size={13} />
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}
