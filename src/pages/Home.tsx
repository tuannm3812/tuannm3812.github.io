import React from 'react';
import { motion } from 'motion/react';
import { resumeData } from '../data/resume';
import { ArrowRight, Brain, CloudCog, Database, Globe, MapPin, Sparkles, TerminalSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  const expertise = [
    {
      icon: <Brain />,
      label: "AI Agents & Deep Learning",
      title: "Models that reason and act",
      desc: "LLM agents, text-to-SQL, RAG, computer vision, audio ML, image captioning, and competition-grade ML systems."
    },
    {
      icon: <Database />,
      label: "Data Engineering",
      title: "Pipelines that can be trusted",
      desc: "Airflow, dbt, Snowflake, Databricks, Delta Lake, medallion architecture, and warehouse-ready analytics marts."
    },
    {
      icon: <CloudCog />,
      label: "MLOps & Deployment",
      title: "From notebook to production",
      desc: "FastAPI, Streamlit, GitHub Actions, pytest, model artifacts, reproducible workflows, and live dashboards."
    },
    {
      icon: <Globe />,
      label: "Kaggle & Experimentation",
      title: "Systematic ML experimentation",
      desc: "Grouped validation, gradient boosting sweeps, OOF blending, bioacoustic ML, tabular modeling, and simulation agents."
    }
  ];

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="grid min-h-[66vh] items-center gap-10 py-8 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-5"
        >
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="text-brand font-mono font-medium uppercase tracking-widest">
              Open to ML and data engineering roles
            </span>
            <span className="hidden sm:block h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <MapPin size={16} />
              {resumeData.location}
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-[0.95] tracking-tight">
            Building reliable ML workflows from messy data.
          </h1>
          <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            I'm a <span className="text-slate-900 dark:text-slate-100 font-semibold">{resumeData.title}</span> focused on AI agents, deep learning, data engineering, Kaggle competition ML, and deployed data workflows.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/projects"
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold rounded-lg transition-all flex items-center gap-2 group shadow-md"
            >
              View Projects
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="px-6 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-850 font-bold rounded-lg transition-all shadow-sm"
            >
              Get in Touch
            </Link>
          </div>
        </motion.div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.5 }}
           className="space-y-4"
        >
          <div className="relative overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl shadow-slate-300/50 dark:shadow-black/40">
            <img
              src="/assets/tuan-profile.jpg"
              alt="Tuan Nguyen looking across the water toward a city skyline"
              className="h-[360px] w-full object-cover object-[42%_72%] md:h-[440px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-sky-200">Sydney-based data builder</p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-200">
                I like work that moves from ambiguous data to systems people can actually use.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {resumeData.highlights.map((highlight) => (
              <div
                key={highlight.label}
                className="p-4 rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-sm hover:border-brand/40 transition-colors"
              >
                <span className="block text-2xl font-black text-brand">{highlight.value}</span>
                <span className="mt-1 block text-xs leading-snug text-slate-600 dark:text-slate-400">{highlight.label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Quick Summary */}
      <section className="grid md:grid-cols-2 gap-10 items-center border-y border-slate-200 dark:border-slate-800 py-14">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight">
          7+ Years of <br />
          Experience in <br />
          <span className="text-brand">Data Science & ML.</span>
        </h2>
        <div className="space-y-6 text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          <p>{resumeData.summary}</p>
        </div>
      </section>

      {/* Reflections & Insights */}
      <section className="space-y-8">
        <div className="space-y-3">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Reflections & Insights</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            Thoughts on the intersection of business strategy, data engineering, machine learning, and applied AI.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {resumeData.reflections.map((reflection, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-brand transition-all shadow-sm hover:shadow-md hover:shadow-brand/5"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider">
                    <Sparkles size={14} />
                    {reflection.category}
                  </span>
                  <h3 className="text-xl font-bold">
                    {reflection.title}
                  </h3>
                </div>

                <ul className="space-y-2">
                  {reflection.points.map((point: string, i: number) => (
                    <li key={i} className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs flex gap-2">
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

      {/* Expertise */}
      <section className="py-14 space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">My Expertise</h2>
          <p className="text-slate-500 dark:text-slate-400">A practical stack for moving from raw data to deployed decisions.</p>
        </div>

        <div className="space-y-8">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-4"
          >
            {expertise.map((skill) => (
              <motion.div
                key={skill.label}
                variants={item}
                className="expertise-band p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 hover:border-brand/60 transition-all hover:shadow-md group"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-lg bg-white dark:bg-slate-950 text-brand border border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:scale-105 transition-transform shrink-0">
                    {skill.icon}
                  </div>
                  <div className="space-y-2">
                    <p className="font-mono text-xs uppercase tracking-[0.22em] text-brand">{skill.label}</p>
                    <h3 className="text-xl font-bold group-hover:text-brand transition-colors">{skill.title}</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{skill.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-12 border-t border-slate-200 dark:border-slate-800 space-y-8"
          >
            <div className="text-center space-y-3">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Core Technology Stack</p>
              <h3 className="text-2xl md:text-3xl font-black tracking-tight">Tools I use across the ML lifecycle</h3>
              <p className="mx-auto max-w-2xl text-sm md:text-base text-slate-500 dark:text-slate-400">
                Grouped by how they show up in my work: from data foundations and modelling to deployment, analytics, and AI interfaces.
              </p>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {resumeData.technologyStack.map((group) => (
                <div
                  key={group.title}
                  className="rounded-xl border border-slate-200/80 dark:border-slate-800/80 bg-white dark:bg-slate-900 p-5 shadow-sm hover:border-brand/60 transition-all"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                      <TerminalSquare size={18} />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{group.title}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                        {group.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {group.tools.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 text-[10px] font-mono font-semibold border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 rounded-md text-slate-600 dark:text-slate-400 hover:border-brand hover:text-brand transition-all cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
