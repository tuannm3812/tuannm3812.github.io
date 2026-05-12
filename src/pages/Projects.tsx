import React from 'react';
import { motion } from 'motion/react';
import { resumeData } from '../data/resume';
import { githubProjects } from '../data/githubProjects';
import { ChevronDown, ExternalLink, Github, Layers, Star, Target } from 'lucide-react';

const projectPriority: Record<string, { score: number; stars: number }> = {
  'AIPA: Enterprise Text-to-SQL Agent': { score: 100, stars: 3 },
  'Production-Grade ELT Pipeline': { score: 96, stars: 3 },
  'NYC Taxi Databricks': { score: 94, stars: 3 },
  'Solana Price Forecasting': { score: 91, stars: 3 },
  'Bioacoustic Species Classification': { score: 89, stars: 3 },
  'VisionVoice: Image Captioning': { score: 84, stars: 2 },
  'Flickr8k Image Captioning': { score: 80, stars: 2 },
  'Youtube Trending Snowflake Lakehouse': { score: 78, stars: 2 },
  'Gender Equality Policy NLP': { score: 76, stars: 2 },
  'TikTok Semantic': { score: 75, stars: 2 },
  'AI Meal Planner': { score: 73, stars: 2 },
  'FAOSTAT Food Price Shock Dashboard': { score: 70, stars: 2 },
  'Sydney Rainfall Forecasting': { score: 68, stars: 2 },
  'AfriWeave': { score: 60, stars: 1 },
  'Apple Foundation Agent': { score: 55, stars: 1 },
  'Personal Portfolio': { score: 45, stars: 1 }
};

function getProjectRank(title: string) {
  return projectPriority[title] || { score: 0, stars: 0 };
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
          Public work across computer vision, data engineering, time-series modelling, NLP, AI agents, and applied product prototypes.
        </p>
      </div>

      <div className="space-y-4">
        {sortedProjectGroups.map(([category, projects], categoryIndex) => (
          <details
            key={category}
            className="group/category rounded-xl border border-slate-200 bg-white/70 dark:border-slate-800 dark:bg-slate-900/70"
            open={categoryIndex === 0}
          >
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
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

            <div className="grid gap-4 border-t border-slate-100 p-5 dark:border-slate-800 md:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, index) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="group relative flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-brand/50 hover:shadow-lg hover:shadow-brand/5 dark:border-slate-800 dark:bg-slate-950"
                >
                  <div className="flex-1 space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <span className="inline-flex items-center gap-2 rounded-full bg-brand/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-brand">
                          {project.stack[0]}
                        </span>
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
                      {project.stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md bg-slate-100 px-1.5 py-1 font-mono text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-400"
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
                        className="flex items-center gap-2 rounded-lg bg-slate-900 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-brand hover:shadow-brand/20 dark:bg-brand dark:hover:bg-brand-light"
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
                        className="flex items-center gap-2 rounded-lg border border-brand/30 bg-brand/5 px-3 py-2 text-[10px] font-bold uppercase tracking-wider text-brand transition-all hover:bg-brand hover:text-white"
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
