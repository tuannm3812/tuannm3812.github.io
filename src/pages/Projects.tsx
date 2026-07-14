import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '../lib/utils';
import ProjectCard from '../components/ProjectCard';
import { getPortfolioProjects } from '../lib/projects';

export default function Projects() {
  const projects = getPortfolioProjects();

  const categories = ['All', ...Array.from(new Set(projects.map((project) => project.category)))];
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSelectedTag(null);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = activeCategory === 'All' || project.category === activeCategory;
    const matchesTag = !selectedTag || project.stack.includes(selectedTag);
    return matchesCategory && matchesTag;
  });

  return (
    <div className="space-y-8 pb-24">
      <div className="max-w-3xl space-y-3">
        <p className="section-eyebrow">Portfolio evidence</p>
        <h2 className="text-4xl font-black tracking-tight md:text-5xl">
          Technical <span className="text-brand">Projects</span>
        </h2>
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

      <motion.div layout className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.title} project={project} onTagClick={setSelectedTag} />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
