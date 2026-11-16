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

// The unfiltered grid runs to ~45 cards of equal visual weight, which buries the
// strongest work. With no filter applied, every 3-star project in
// projectPriority.ts gets its own band, then the rest are grouped by origin
// (projectOrigin.ts) so self-initiated work reads before set coursework. Each
// group shows a short preview; any active filter falls back to one flat grid.
const SECTION_PREVIEW_COUNT: Record<ProjectOrigin, number> = {
  personal: 6,
  hackathon: 6,
  kaggle: 6,
  other: 3,
  coursework: 3,
};

function PlaygroundTable({ episodes }: { episodes: Project[] }) {
  return (
    <div className="border-t border-ink dark:border-slate-200">
      <div className="flex flex-wrap items-baseline justify-between gap-2 py-3">
        <h3 className="font-display text-lg font-bold tracking-tight">
          Playground Series, season 6
        </h3>
        <span className="text-xs text-slate-500 dark:text-slate-400">
          {episodes.length} monthly tabular competitions
        </span>
      </div>
      <ol className="divide-y divide-rule border-y border-rule dark:divide-rule-dark dark:border-rule-dark">
        {episodes.map((project) => {
          const episode = getPlaygroundEpisode(project.title);
          const name = project.title.replace(/^Kaggle S\d+E\d+\s*/, '');
          return (
            <li key={project.title}>
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-[4rem_1fr_auto] items-baseline gap-x-4 py-2.5 text-sm"
              >
                <span className="font-mono text-xs text-slate-500 dark:text-slate-400">
                  {episode}
                </span>
                <span className="min-w-0">
                  <span className="font-medium group-hover:text-brand dark:group-hover:text-brand-light">
                    {name}
                  </span>
                  <span className="ml-3 hidden font-mono text-[11px] text-slate-500 md:inline dark:text-slate-400">
                    {project.stack.slice(0, 2).join(' · ')}
                  </span>
                </span>
                <ArrowUpRight
                  size={14}
                  className="text-slate-400 group-hover:text-brand dark:group-hover:text-brand-light"
                  aria-hidden="true"
                />
              </a>
            </li>
          );
        })}
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
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand dark:text-brand-light">
          Portfolio evidence
        </p>
        <h1 className="text-5xl font-black leading-[0.95] tracking-[-0.03em] md:text-6xl">
          Projects
        </h1>
        <p className="max-w-[60ch] text-lg text-slate-700 dark:text-slate-300">
          Public work across AI agents, deep learning, data engineering, Kaggle competitions, and
          deployed ML systems.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="-mx-4 flex overflow-x-auto px-4 pb-2 scrollbar-none md:mx-0 md:px-0">
          <div className="flex gap-5 border-b border-rule dark:border-rule-dark">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  aria-pressed={isActive}
                  className="relative -mb-px cursor-pointer select-none whitespace-nowrap py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-project-pill"
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-brand dark:bg-brand-light"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={cn(
                      'relative z-10 transition-colors duration-200',
                      isActive
                        ? 'font-semibold text-ink dark:text-white'
                        : 'text-slate-500 hover:text-ink dark:text-slate-400 dark:hover:text-white',
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
            <span className="inline-flex items-center gap-1.5 border border-brand px-2 py-0.5 font-mono text-brand dark:border-brand-light dark:text-brand-light">
              {selectedTag}
              <button
                onClick={() => setSelectedTag(null)}
                className="cursor-pointer p-0.5 hover:bg-brand/15"
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
          <div className="index-heading">
            <h2 className="section-eyebrow">Flagship work</h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Ranked · {featuredProjects.length} of {filteredProjects.length}
            </span>
          </div>
          <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  rank={index + 1}
                  className={index === 0 ? 'md:col-span-2 lg:col-span-3' : ''}
                  onTagClick={setSelectedTag}
                />
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
          const preview = SECTION_PREVIEW_COUNT[origin];
          const isCollapsed = !expanded.has(origin) && sectionProjects.length > preview;
          const shown = isCollapsed ? sectionProjects.slice(0, preview) : sectionProjects;
          const total = sectionProjects.length + extra.length;
          return (
            <section key={origin} className="space-y-4" aria-labelledby={`origin-${origin}`}>
              <div className="index-heading mt-6">
                <h2 id={`origin-${origin}`} className="section-eyebrow">
                  {title}
                </h2>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  {note} · {total}
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
                <div className="flex justify-center pt-2">
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
