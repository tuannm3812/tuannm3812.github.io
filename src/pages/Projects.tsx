import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { cn } from '../lib/utils';
import ProjectCard from '../components/ProjectCard';
import {
  ORIGIN_SECTIONS,
  getPlaygroundEpisode,
  getPortfolioProjects,
  groupProjectsByOrigin,
  splitFlagshipProjects,
} from '../lib/projects';
import type { ProjectOrigin } from '../data/projectOrigin';
import type { Project } from '../data/resume';

// The unfiltered grid runs to ~40 cards of equal visual weight, which buries the
// strongest work. With no filter applied, every 3-star project in
// projectPriority.ts leads as "Selected work", then the rest are grouped by
// origin (projectOrigin.ts) so self-initiated work reads before set coursework.
// Each group shows a short preview; any active filter falls back to one grid.
const SECTION_PREVIEW_COUNT: Record<ProjectOrigin, number> = {
  personal: 6,
  hackathon: 6,
  kaggle: 6,
  other: 3,
  coursework: 3,
};

function PlaygroundTable({ episodes }: { episodes: Project[] }) {
  return (
    <div className="surface-card overflow-hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200/80 px-5 py-4 dark:border-slate-800/80">
        <h3 className="text-base font-black tracking-tight">Kaggle Playground Series, season 6</h3>
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
          {episodes.length} monthly tabular competitions
        </span>
      </div>
      <ol className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
        {episodes.map((project) => (
          <li key={project.title}>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="group grid grid-cols-[4rem_1fr_auto] items-baseline gap-x-4 px-5 py-3 text-sm transition-colors hover:bg-brand/5"
            >
              <span className="font-mono text-xs font-bold text-brand">
                {getPlaygroundEpisode(project.title)}
              </span>
              <span className="min-w-0">
                <span className="font-semibold group-hover:text-brand">
                  {project.title.replace(/^Kaggle S\d+E\d+\s*/, '')}
                </span>
                <span className="ml-3 hidden font-mono text-[11px] text-slate-400 md:inline dark:text-slate-500">
                  {project.stack.slice(0, 2).join(' · ')}
                </span>
              </span>
              <ArrowUpRight
                size={14}
                className="text-slate-400 group-hover:text-brand"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Projects() {
  const projects = getPortfolioProjects();

  const categories = ['All', ...Array.from(new Set(projects.map((project) => project.category)))];
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<ProjectOrigin>>(new Set());
  const expand = (origin: ProjectOrigin) => setExpanded((current) => new Set(current).add(origin));

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSelectedTag(null);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const matchesTag = !selectedTag || project.stack.includes(selectedTag);
    return matchesCategory && matchesTag;
  });

  const isFiltered = activeCategory !== 'All' || Boolean(selectedTag);
  const { flagship, archive } = splitFlagshipProjects(filteredProjects);
  const featuredProjects = isFiltered ? [] : flagship;
  const { groups, playground } = groupProjectsByOrigin(archive);

  return (
    <div className="space-y-8 pb-24">
      <div className="max-w-3xl space-y-3">
        <p className="section-eyebrow">Portfolio evidence</p>
        <h1 className="text-4xl font-black tracking-tight md:text-5xl">
          Technical <span className="text-brand">Projects</span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Public work across AI agents, deep learning, data engineering, Kaggle competitions, and
          deployed ML systems.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="-mx-4 flex overflow-x-auto px-4 pb-2 scrollbar-none md:mx-0 md:px-0">
          <div className="flex gap-1.5 rounded-full border border-slate-200/50 bg-slate-100/60 p-1 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-900/60">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className="relative cursor-pointer select-none whitespace-nowrap rounded-full px-4 py-1.5 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-project-pill"
                      className="absolute inset-0 rounded-full bg-slate-950 shadow-sm dark:bg-white"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={cn(
                      'relative z-10 transition-colors duration-200',
                      isActive
                        ? 'text-white dark:text-slate-950'
                        : 'text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white',
                    )}
                  >
                    {category}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {selectedTag && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-xs font-medium"
          >
            <span className="text-slate-500">Filtered by technology:</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-brand/10 px-3 py-1 font-bold text-brand">
              {selectedTag}
              <button
                onClick={() => setSelectedTag(null)}
                className="cursor-pointer rounded-full p-0.5 hover:bg-brand/15"
                aria-label="Clear technology filter"
              >
                <X size={11} />
              </button>
            </span>
          </motion.div>
        )}
      </div>

      {featuredProjects.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="section-eyebrow">Selected work</h2>
            <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
              Flagship {featuredProjects.length} of {filteredProjects.length}
            </span>
          </div>
          <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {featuredProjects.map((project) => (
                <ProjectCard key={project.title} project={project} onTagClick={setSelectedTag} />
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      )}

      {isFiltered ? (
        <section className="space-y-4">
          <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.title} project={project} onTagClick={setSelectedTag} />
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      ) : (
        ORIGIN_SECTIONS.map(({ origin, title, note }) => {
          const sectionProjects = groups.get(origin) ?? [];
          const extra = origin === 'kaggle' ? playground : [];
          if (sectionProjects.length + extra.length === 0) return null;
          const isCollapsed =
            !expanded.has(origin) && sectionProjects.length > SECTION_PREVIEW_COUNT[origin];
          const shown = isCollapsed
            ? sectionProjects.slice(0, SECTION_PREVIEW_COUNT[origin])
            : sectionProjects;
          return (
            <section
              key={origin}
              className="space-y-4 border-t border-slate-200/70 pt-8 dark:border-slate-800/70"
              aria-labelledby={`origin-${origin}`}
            >
              <div className="flex items-baseline justify-between gap-4">
                <h2 id={`origin-${origin}`} className="section-eyebrow">
                  {title}
                </h2>
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                  {note} · {sectionProjects.length + extra.length}
                </span>
              </div>
              {shown.length > 0 && (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                  {shown.map((project) => (
                    <ProjectCard
                      key={project.title}
                      project={project}
                      onTagClick={setSelectedTag}
                    />
                  ))}
                </div>
              )}
              {isCollapsed && (
                <div className="flex justify-center">
                  <button type="button" onClick={() => expand(origin)} className="btn-secondary">
                    Show all {sectionProjects.length} in {title}
                  </button>
                </div>
              )}
              {extra.length > 0 && <PlaygroundTable episodes={extra} />}
            </section>
          );
        })
      )}
    </div>
  );
}
