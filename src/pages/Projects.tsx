import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { resumeData } from '../data/resume';
import { githubProjects } from '../data/githubProjects';
import { ExternalLink, Github, Star, Trophy } from 'lucide-react';
import { cn } from '../lib/utils';

const projectPriority: Record<string, { score: number; stars: number }> = {
  'Enterprise Text-to-SQL Agent': { score: 100, stars: 3 },
  'Production-Grade ELT Pipeline': { score: 96, stars: 3 },
  'AI Meal Planner': { score: 94, stars: 3 },
  'CircleU: iOS Journaling App': { score: 92, stars: 3 },
  'Solana Price Forecasting': { score: 91, stars: 3 },
  'UTS Tech Festival 2026 GenAI Hackathon': { score: 90, stars: 3 },
  'Bioacoustic Species Classification': { score: 89, stars: 3 },
  'Kaggle CSIRO Image2Biomass': { score: 88, stars: 2 },
  'FoodLens: Calibrated Food Recognition': { score: 87, stars: 2 },
  'Kaggle ROGII Wellbore Geology Prediction': { score: 86, stars: 2 },
  'Kaggle AI Agent Security': { score: 85, stars: 2 },
  'TikTok Semantic': { score: 85, stars: 2 },
  'Kaggle Pokémon TCG AI Battle': { score: 84, stars: 2 },
  'Kaggle NFL Player Contact Detection': { score: 84, stars: 2 },
  'VisionVoice: Image Captioning': { score: 83, stars: 2 },
  'Kaggle NeuroGolf 2026': { score: 82, stars: 2 },
  'UNSW Marketing Analytics Hackathon 2026': { score: 81, stars: 2 },
  'NYC Taxi Databricks': { score: 81, stars: 2 },
  'Airbnb ELT Warehouse': { score: 80, stars: 2 },
  'YouTube Trending Snowflake Lakehouse': { score: 79, stars: 2 },
  'Flickr8k Image Captioning': { score: 78, stars: 2 },
  'Kaggle S6E5 Predict F1 Pit Stops': { score: 77, stars: 2 },
  'Kaggle Maze Crawler': { score: 76, stars: 2 },
  'Kaggle S6E6 Predicting Stellar Class': { score: 75, stars: 2 },
  'Kaggle Orbit Wars': { score: 74, stars: 2 },
  'Kaggle S6E4 Predict Irrigation Need': { score: 73, stars: 2 },
  'Sydney Rainfall Forecasting': { score: 71, stars: 2 },
  'Gender Equality Policy NLP': { score: 69, stars: 2 },
  'UTS MDSI LLM Wiki': { score: 68, stars: 2 },
  'FAOSTAT Food Price Shock Dashboard': { score: 67, stars: 2 },
  'ScriptClean AI': { score: 65, stars: 2 },
  'AfriWeave': { score: 60, stars: 1 },
  'Deep Learning Group 10': { score: 58, stars: 1 },
  'Apple Foundation Agent': { score: 55, stars: 1 },
  'Personal Portfolio': { score: 45, stars: 1 }
};

function getProjectRank(title: string) {
  return projectPriority[title] || { score: 0, stars: 0 };
}

function isKaggleProject(project: { title: string; category: string; stack: string[] }) {
  return (
    project.category.includes('Kaggle') ||
    project.title.toLowerCase().includes('kaggle') ||
    project.stack.some((tech) => tech.toLowerCase().includes('kaggle'))
  );
}

function ProjectCard({ project, index }: { project: any; index: number }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
      className="surface-card group relative overflow-hidden flex h-full flex-col p-5 hover:-translate-y-0.5 transition-transform duration-300"
    >
      {/* Spotlight Hover Glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(350px circle at ${coords.x}px ${coords.y}px, rgba(5, 64, 242, 0.055), transparent 80%)`
        }}
      />

      <div className="flex-1 space-y-4 relative z-10">
        <div className="space-y-2">
          <div className="flex items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {project.stack.length > 0 && (
                <span className="brand-pill px-2.5 py-1">
                  {project.stack[0]}
                </span>
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
            {getProjectRank(project.title).stars > 0 && (
              <span
                className="flex items-center gap-0.5 text-amber-400"
                aria-label={`${getProjectRank(project.title).stars} star project`}
                title={`${getProjectRank(project.title).stars} star project`}
              >
                {Array.from({ length: getProjectRank(project.title).stars }).map((_, starIndex) => (
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
          {project.points.slice(0, 2).map((point: string, i: number) => (
            <li key={i} className="flex gap-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
              <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
              {point}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1 pt-1">
          {project.stack.map((tech: string, techIndex: number) => (
            <span
              key={`${tech}-${techIndex}`}
              className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[9px] font-semibold text-slate-600 transition-colors hover:border-brand/40 hover:text-brand dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-400"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4 dark:border-slate-800 relative z-10">
        {project.github && (
          <a 
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg bg-slate-950 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand dark:bg-white dark:text-slate-950 dark:hover:bg-brand dark:hover:text-white focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none"
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
            className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-700 transition-all hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none"
          >
            <ExternalLink size={13} />
            Live Demo
          </a>
        )}
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const curatedGithubLinks = new Set(resumeData.projects.map((project) => project.github).filter(Boolean));
  const projects = [
    ...resumeData.projects,
    ...githubProjects.filter((project) => !curatedGithubLinks.has(project.github))
  ].sort((a, b) => getProjectRank(b.title).score - getProjectRank(a.title).score || a.title.localeCompare(b.title));

  // Extract unique categories in chronological/priority order
  const categories = ["All", ...Array.from(new Set(projects.map((p) => p.category)))];
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="space-y-8 pb-24">
      {/* Title block */}
      <div className="max-w-3xl space-y-3">
        <p className="section-eyebrow">Portfolio evidence</p>
        <h2 className="text-4xl md:text-5xl font-black tracking-tight">
          Technical <span className="text-brand">Projects</span>
        </h2>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Public work across AI agents, deep learning, data engineering, Kaggle competitions, and deployed ML systems.
        </p>
      </div>

      {/* Pill Filters bar */}
      <div className="flex overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 md:mx-0 md:px-0">
        <div className="flex gap-1.5 bg-slate-100/60 p-1 rounded-full dark:bg-slate-900/60 border border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md">
          {categories.map((category) => {
            const isActive = activeCategory === category;
            return (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className="relative rounded-full px-4 py-1.5 text-xs font-bold transition-colors focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none select-none cursor-pointer whitespace-nowrap"
                style={{ WebkitTapHighlightColor: 'transparent' }}
              >
                {isActive && (
                  <motion.span
                    layoutId="active-project-pill"
                    className="absolute inset-0 rounded-full bg-slate-950 dark:bg-white shadow-sm"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span
                  className={cn(
                    "relative z-10 transition-colors duration-200",
                    isActive
                      ? "text-white dark:text-slate-950"
                      : "text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white"
                  )}
                >
                  {category}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <motion.div 
        layout
        className="grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={index}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
