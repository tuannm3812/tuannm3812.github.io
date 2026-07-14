import React from 'react';
import { motion } from 'motion/react';
import { resumeData } from '../data/resume';
import {
  Briefcase,
  GraduationCap,
  MapPin,
  Calendar,
  Code2,
  Database,
  Cpu,
  BrainCircuit,
  Wrench,
  Bot,
  Lightbulb,
  Terminal,
  Download,
} from 'lucide-react';

function getStackIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes('language') || t.includes('engineering'))
    return <Code2 size={20} className="text-brand" />;
  if (t.includes('platform')) return <Database size={20} className="text-brand" />;
  if (t.includes('orchestration') || t.includes('analytics'))
    return <Cpu size={20} className="text-brand" />;
  if (t.includes('machine learning') || t.includes('ml'))
    return <BrainCircuit size={20} className="text-brand" />;
  if (t.includes('production') || t.includes('mlops'))
    return <Wrench size={20} className="text-brand" />;
  if (t.includes('ai') || t.includes('nlp') || t.includes('agent'))
    return <Bot size={20} className="text-brand" />;
  return <Terminal size={20} className="text-brand" />;
}

export default function Experience() {
  return (
    <div className="max-w-5xl mx-auto space-y-16">
      {/* Page Header with Resume Download */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-slate-100 pb-8 dark:border-slate-800/65">
        <div className="space-y-3">
          <p className="section-eyebrow">Background & Credentials</p>
          <h1 className="text-4xl font-black tracking-tight md:text-5xl">
            Professional <span className="text-brand">Path</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            My career history, technical expertise matrix, professional philosophy, and academic
            credentials.
          </p>
        </div>
        <a
          href="/assets/tuan-nguyen-resume.pdf"
          download
          className="btn-secondary flex items-center gap-2 cursor-pointer w-fit"
        >
          <Download size={18} />
          Download Resume (PDF)
        </a>
      </div>

      {/* Work Experience */}
      <section className="space-y-8">
        <p className="section-eyebrow">Professional path</p>
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

              <div className="surface-card surface-card-hover space-y-3 p-5">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <h3 className="text-xl font-bold">{exp.role}</h3>
                  <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/60 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600 dark:border-slate-700/60 dark:bg-slate-800/70 dark:text-slate-400">
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
                    <li
                      key={i}
                      className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed flex gap-2"
                    >
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

      {/* Technical Skill Matrix */}
      <section className="space-y-8">
        <p className="section-eyebrow">Expertise & Stack</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-4">
          <Terminal className="text-brand" />
          Technical Skill Matrix
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resumeData.technologyStack.map((stack, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="surface-card surface-card-hover flex flex-col justify-between p-5"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="icon-tile h-9 w-9">{getStackIcon(stack.title)}</div>
                  <h3 className="font-bold text-slate-950 dark:text-white leading-tight">
                    {stack.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {stack.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 border-t border-slate-100 pt-4 mt-4 dark:border-slate-800">
                {stack.tools.map((tool) => (
                  <span
                    key={tool}
                    className="rounded bg-slate-100/60 px-2 py-0.5 font-mono text-[9px] font-semibold text-slate-600 transition-colors hover:bg-brand/10 hover:text-brand dark:bg-slate-900/65 dark:text-slate-400 dark:hover:text-brand"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy & Reflections */}
      <section className="space-y-8">
        <p className="section-eyebrow">Philosophy & Mindset</p>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight flex items-center gap-4">
          <Lightbulb className="text-brand" />
          Professional Philosophy
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {resumeData.reflections.map((ref, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="soft-panel border-l-4 border-l-brand p-5 space-y-3"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {ref.category}
                </span>
                <h3 className="text-base font-black text-slate-950 dark:text-white">{ref.title}</h3>
              </div>
              <ul className="space-y-2">
                {ref.points.map((point, i) => (
                  <li
                    key={i}
                    className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education */}
      <section className="space-y-8 pb-24">
        <p className="section-eyebrow">Academic foundation</p>
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
              className="surface-card surface-card-hover space-y-3 p-6"
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
