import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, X } from 'lucide-react';
import { cn } from '../lib/utils';
import ProjectCard from '../components/ProjectCard';
import { getPortfolioProjects, getProjectRank } from '../lib/projects';

// The unfiltered grid runs to ~35 cards of equal visual weight, which buries the
// strongest work. With no filter applied, every 3-star project in projectPriority.ts
// gets a flagship band of its own, and the rest start collapsed. Any active filter
// falls back to a single flat grid showing everything that matches.
const FLAGSHIP_STARS = 3;
const COLLAPSED_COUNT = 6;

export default function Projects() {
  const projects = getPortfolioProjects();

  const categories = ['All', ...Array.from(new Set(projects.map((project) => project.category)))];
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showAll, setShowAll] = useState(false);

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
  const isFlagship = (title: string) => getProjectRank(title).stars >= FLAGSHIP_STARS;
  const featuredProjects = isFiltered ? [] : filteredProjects.filter((p) => isFlagship(p.title));
  const remainingProjects = isFiltered
    ? filteredProjects
    : filteredProjects.filter((p) => !isFlagship(p.title));
  const isCollapsed = !isFiltered && !showAll && remainingProjects.length > COLLAPSED_COUNT;
  const visibleRemaining = isCollapsed
    ? remainingProjects.slice(0, COLLAPSED_COUNT)
    : remainingProjects;

  return (
    <div className="space-y-8 pb-24">
      <div className="max-w-3xl space-y-3">
        <p className="section-eyebrow">Portfolio evidence</p>
        <h1 className="text-5xl font-black tracking-tight md:text-6xl">
          Technical <span className="font-display-serif text-gradient pr-1">Projects</span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Public work across AI agents, deep learning, data engineering, Kaggle competitions, and
          deployed ML systems.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="-mx-4 flex overflow-x-auto px-4 pb-2 scrollbar-none md:mx-0 md:px-0">
          <div className="flex gap-1.5 rounded-full border border-slate-200/50 bg-white/60 p-1 backdrop-blur-md dark:border-white/[0.08] dark:bg-white/[0.04]">
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
        <section className="space-y-6">
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div className="space-y-3">
              <p className="section-eyebrow">Selected work</p>
              <h2 className="text-3xl font-black tracking-tight md:text-4xl">
                Flagship <span className="font-display-serif text-gradient pr-1">projects</span>
              </h2>
            </div>
            <span className="font-mono text-xs text-slate-500">
              {featuredProjects.length} of {filteredProjects.length} projects
            </span>
          </div>
          <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {featuredProjects.map((project, index) => (
                <ProjectCard
                  key={project.title}
                  project={project}
                  onTagClick={setSelectedTag}
                  featured
                  className={index === 0 ? 'lg:col-span-2' : undefined}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      )}

      <section className="space-y-4">
        {featuredProjects.length > 0 && (
          <div className="space-y-3 border-t border-slate-200/70 pt-10 dark:border-white/[0.08]">
            <p className="section-eyebrow">Archive</p>
            <h2 className="text-2xl font-black tracking-tight md:text-3xl">
              More projects &amp; competitions
            </h2>
          </div>
        )}
        <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visibleRemaining.map((project) => (
              <ProjectCard key={project.title} project={project} onTagClick={setSelectedTag} />
            ))}
          </AnimatePresence>
        </motion.div>
        {isCollapsed && (
          <div className="flex justify-center pt-4">
            <button onClick={() => setShowAll(true)} className="btn-secondary group">
              Show all {remainingProjects.length} projects
              <ChevronDown size={18} className="transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
