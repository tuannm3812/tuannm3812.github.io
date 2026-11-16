import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';
import ProjectCard from '../components/ProjectCard';
import { getPortfolioProjects, splitFlagshipProjects } from '../lib/projects';

// The unfiltered grid runs to ~45 cards of equal visual weight, which buries the
// strongest work. With no filter applied, every 3-star project in
// projectPriority.ts gets its own band and the rest collapse to a short preview;
// any active filter falls back to a single flat grid of every match.
const ARCHIVE_PREVIEW_COUNT = 6;

export default function Projects() {
  const projects = getPortfolioProjects();

  const categories = ['All', ...Array.from(new Set(projects.map((project) => project.category)))];
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showAllArchive, setShowAllArchive] = useState(false);

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
  const restProjects = isFiltered ? filteredProjects : archive;
  const isArchiveCollapsed =
    !isFiltered && !showAllArchive && restProjects.length > ARCHIVE_PREVIEW_COUNT;
  const remainingProjects = isArchiveCollapsed
    ? restProjects.slice(0, ARCHIVE_PREVIEW_COUNT)
    : restProjects;

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

      <section className="space-y-4">
        {featuredProjects.length > 0 && (
          <div className="index-heading mt-6">
            <h2 className="section-eyebrow">More projects</h2>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {restProjects.length} more
            </span>
          </div>
        )}
        <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {remainingProjects.map((project) => (
              <ProjectCard key={project.title} project={project} onTagClick={setSelectedTag} />
            ))}
          </AnimatePresence>
        </motion.div>
        {isArchiveCollapsed && (
          <div className="flex justify-center pt-2">
            <button type="button" onClick={() => setShowAllArchive(true)} className="btn-secondary">
              Show all {restProjects.length} projects
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
