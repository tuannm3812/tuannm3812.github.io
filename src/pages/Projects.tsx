import React from 'react';
import { motion } from 'motion/react';
import { resumeData } from '../data/resume';
import { githubProjects } from '../data/githubProjects';
import { ChevronDown, ExternalLink, Github, Layers, Star, Target, Trophy } from 'lucide-react';

const projectPriority: Record<string, { score: number; stars: number }> = {
  'Enterprise Text-to-SQL Agent': { score: 100, stars: 3 },
  'Production-Grade ELT Pipeline': { score: 96, stars: 3 },
  'AI Meal Planner': { score: 94, stars: 3 },
  'Solana Price Forecasting': { score: 91, stars: 3 },
  'Bioacoustic Species Classification': { score: 89, stars: 3 },
  'Kaggle CSIRO Image2Biomass': { score: 88, stars: 2 },
  'FoodLens: Calibrated Food Recognition': { score: 87, stars: 2 },
  'Kaggle ROGII Wellbore Geology Prediction': { score: 86, stars: 2 },
  'TikTok Semantic': { score: 85, stars: 2 },
  'Kaggle NFL Player Contact Detection': { score: 84, stars: 2 },
  'VisionVoice: Image Captioning': { score: 83, stars: 2 },
  'Kaggle NeuroGolf 2026': { score: 82, stars: 2 },
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

export default function Projects() {
  const curatedGithubLinks = new Set(resumeData.projects.map((project) => project.github).filter(Boolean));
  const projects = [
    ...resumeData.projects,
    ...githubProjects.filter((project) => !curatedGithubLinks.has(project.github))
  ].sort((a, b) => getProjectRank(b.title).score - getProjectRank(a.title).score || a.title.localeCompare(b.title));

  const groupedProjects = projects.reduce<Record<string, typeof projects>>((groups, project) => {
    groups[project.category] = groups[project.category] || [];
    groups[project.category].push(project);
    return groups;
  }, {});

  const sortedProjectGroups = Object.entries(groupedProjects).sort(
    ([, aProjects], [, bProjects]) =>
      Math.max(...bProjects.map((project) => getProjectRank(project.title).score)) -
      Math.max(...aProjects.map((project) => getProjectRank(project.title).score))
  );

  return (
    <div className="space-y-8 pb-24">
      <div className="max-w-3xl space-y-3">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight">
          Technical <span className="text-brand">Projects</span>
        </h2>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          Public work across AI agents, deep learning, data engineering, Kaggle competitions, and deployed ML systems.
        </p>
      </div>

      <div className="space-y-4">
        {sortedProjectGroups.map(([category, projects], categoryIndex) => (
          <details
            key={category}
            className="group/category rounded-xl border border-slate-200/80 bg-white/90 dark:border-slate-800/80 dark:bg-slate-900/90 shadow-sm overflow-hidden"
            open={categoryIndex === 0}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 bg-slate-50/50 dark:bg-slate-900/50 [&::-webkit-details-marker]:hidden border-b border-transparent group-open/category:border-slate-200/60 dark:group-open/category:border-slate-800/60 focus-visible:ring-2 focus-visible:ring-brand focus-visible:outline-none">
              <span className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Layers size={18} />
                </span>
                <span>
                  <span className="block text-xl font-black tracking-tight">{category}</span>
                  <span className="text-sm text-slate-500 dark:text-slate-400">{projects.length} projects</span>
                </span>
              </span>
              <ChevronDown
                size={20}
                className="text-slate-400 transition-transform group-open/category:rotate-180"
              />
            </summary>

            <div className="grid gap-4 p-5 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="group relative flex h-full flex-col rounded-lg border border-slate-200/80 bg-white p-5 shadow-sm transition-all hover:border-brand hover:shadow-md dark:border-slate-800/80 dark:bg-slate-950"
                >
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-1.5">
                          {project.stack.length > 0 && (
                            <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand">
                              {project.stack[0]}
                            </span>
                          )}
                          {isKaggleProject(project) && (
                            <span
                              className="inline-flex items-center gap-1 rounded-full border border-sky-200 bg-sky-50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-700 dark:border-sky-800 dark:bg-sky-950/70 dark:text-sky-300"
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
                        <p className="flex items-start gap-2 text-xs font-medium leading-relaxed text-slate-600 dark:text-slate-400">
                          <Target size={14} className="mt-0.5 flex-shrink-0 text-brand" />
                          {project.impact}
                        </p>
                      )}
                    </div>

                    <ul className="space-y-2">
                      {project.points.slice(0, 2).map((point, i) => (
                        <li key={i} className="flex gap-2 text-xs leading-relaxed text-slate-600 dark:text-slate-400">
                          <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" />
                          {point}
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1">
                      {project.stack.map((tech, techIndex) => (
                        <span
                          key={`${tech}-${techIndex}`}
                          className="rounded-md border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 px-2 py-0.5 font-mono text-[9px] font-semibold text-slate-600 dark:text-slate-400"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
                    {project.github && (
                      <a 
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center gap-2 rounded-lg bg-slate-950 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-brand dark:bg-slate-900 dark:hover:bg-brand focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none"
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
                        className="flex items-center gap-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 transition-all hover:border-brand hover:bg-brand hover:text-white focus-visible:ring-2 focus-visible:ring-brand/40 focus-visible:outline-none"
                      >
                        <ExternalLink size={13} />
                        Live Demo
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </details>
        ))}
      </div>
    </div>
  );
}
