import React from 'react';
import { motion } from 'motion/react';
import { resumeData } from '../data/resume';
import { Briefcase, GraduationCap, MapPin, Calendar } from 'lucide-react';

export default function Experience() {
  return (
    <div className="max-w-5xl mx-auto space-y-16">
      {/* Work Experience */}
      <section className="space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-4">
          <Briefcase className="text-brand" />
          Professional Experience
        </h2>

        <div className="space-y-10 border-l-2 border-slate-200/80 dark:border-slate-800/80 ml-4 pl-8 md:pl-10">
          {resumeData.experience.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] md:-left-[49px] top-1 w-4 h-4 rounded-full bg-brand border-4 border-slate-100 dark:border-slate-950" />

              <div className="space-y-3 rounded-xl border border-slate-200/80 bg-white p-5 shadow-sm dark:border-slate-800/80 dark:bg-slate-900/70 hover:border-brand/40 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-slate-50 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-400">
                    <Calendar size={14} />
                    {exp.period}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-3 text-sm text-brand font-bold">
                  <span>{exp.company}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 font-medium italic">
                    <MapPin size={14} />
                    {exp.location}
                  </span>
                </div>

                <ul className="grid gap-2 md:grid-cols-2">
                  {exp.points.map((point, i) => (
                    <li key={i} className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex gap-2">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-8 pb-24">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-4">
          <GraduationCap className="text-brand" />
          Education
        </h2>

        <div className="grid md:grid-cols-2 gap-5">
          {resumeData.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 space-y-3 shadow-sm hover:border-brand/40 transition-colors"
            >
              <div className="space-y-1">
                <h3 className="text-lg font-bold">{edu.institution}</h3>
                <p className="text-brand font-medium">{edu.degree}</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {edu.period}
                </span>
                <span className="flex items-center gap-1 text-slate-500 dark:text-slate-400 italic">
                  <MapPin size={14} />
                  {edu.location}
                </span>
              </div>

              <ul className="space-y-2">
                {edu.points.map((point, i) => (
                  <li key={i} className="text-sm text-slate-600 dark:text-slate-400 flex gap-2">
                    <span className="mt-1 w-1 h-1 rounded-full bg-brand flex-shrink-0" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
