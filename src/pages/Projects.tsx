import React from 'react';
import { motion } from 'motion/react';
import { resumeData } from '../data/resume';
import { ExternalLink, Github, Layers } from 'lucide-react';

export default function Projects() {
  return (
    <div className="space-y-12 pb-24">
      <div className="max-w-3xl space-y-4">
        <h2 className="text-4xl md:text-5xl font-black tracking-tight">Technical Projects</h2>
        <p className="text-xl text-slate-500 dark:text-slate-400">
          A selection of projects ranging from Edge ML to Production-Grade Data Engineering.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {resumeData.projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative h-full flex flex-col p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand/50 transition-all shadow-sm hover:shadow-xl hover:shadow-brand/5"
          >
            <div className="flex-1 space-y-6">
              <div className="space-y-2">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider">
                  <Layers size={14} />
                  {project.category}
                </span>
                <h3 className="text-2xl font-bold group-hover:text-brand transition-colors">
                  {project.title}
                </h3>
              </div>

              <ul className="space-y-4">
                {project.points.map((point, i) => (
                  <li key={i} className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm flex gap-3">
                    <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex gap-4">
              {project.github && (
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-900 dark:bg-brand text-white text-xs font-bold uppercase tracking-wider hover:bg-brand dark:hover:bg-brand-light transition-all shadow-sm hover:shadow-brand/20"
                >
                  <Github size={14} />
                  Source Code
                </a>
              )}
              {/* @ts-ignore */}
              {project.demo && (
                <a 
                  /* @ts-ignore */
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 text-xs font-bold uppercase tracking-wider hover:border-brand hover:text-brand transition-all"
                >
                  <ExternalLink size={14} />
                  Live Demo
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
