import React from 'react';
import { motion } from 'motion/react';
import { resumeData } from '../data/resume';
import { ArrowRight, Code, Database, Brain, Globe, Sparkles } from 'lucide-react';
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

  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="min-h-[70vh] flex flex-col justify-center gap-8 py-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-4"
        >
          <span className="text-brand font-mono font-medium uppercase tracking-widest text-sm">
            Available for new opportunities
          </span>
          <h1 className="text-5xl md:text-8xl font-black leading-none tracking-tight">
            Building the future of <br />
            <span className="text-brand">Intelligent Data.</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            I'm a <span className="text-slate-900 dark:text-slate-100 font-semibold">{resumeData.title}</span> specializing in scalable ML systems and MLOps.
          </p>
        </motion.div>

        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ delay: 0.5 }}
           className="flex flex-wrap gap-4"
        >
          <Link
            to="/projects"
            className="px-8 py-4 bg-brand text-white font-bold rounded-lg hover:bg-brand-light transition-all flex items-center gap-2 group"
          >
            View Projects
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 bg-slate-200 dark:bg-slate-800 font-bold rounded-lg hover:bg-slate-300 dark:hover:bg-slate-700 transition-all"
          >
            Get in Touch
          </Link>
        </motion.div>
      </section>

      {/* Quick Summary */}
      <section className="grid md:grid-cols-2 gap-12 items-center border-y border-slate-200 dark:border-slate-800 py-24">
        <h2 className="text-3xl md:text-5xl font-black tracking-tight">
          7+ Years of <br />
          Experience in <br />
          <span className="text-brand">Data Science & ML.</span>
        </h2>
        <div className="space-y-8 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          <p>{resumeData.summary}</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
              <span className="block text-2xl font-bold text-brand">50+</span>
              <span className="text-sm">ML Projects Delivered</span>
            </div>
             <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/50">
              <span className="block text-2xl font-bold text-brand">40+</span>
              <span className="text-sm">Scalable Pipelines</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reflections & Insights */}
      <section className="space-y-12">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">Reflections & Insights</h2>
          <p className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl">
            Thoughts on the intersection of business strategy, data engineering, and artificial intelligence.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* @ts-ignore */}
          {resumeData.reflections.map((reflection, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand/50 transition-all shadow-sm hover:shadow-xl hover:shadow-brand/5"
            >
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand/10 text-brand text-xs font-bold uppercase tracking-wider">
                    <Sparkles size={14} />
                    {reflection.category}
                  </span>
                  <h3 className="text-xl font-bold">
                    {reflection.title}
                  </h3>
                </div>

                <ul className="space-y-4">
                  {reflection.points.map((point: string, i: number) => (
                    <li key={i} className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm flex gap-3">
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
      <section className="py-24 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight">My Expertise</h2>
          <p className="text-slate-500 dark:text-slate-400">Leveraging cutting-edge technologies to solve complex problems.</p>
        </div>

        <div className="space-y-12">
          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-4 gap-6"
          >
            {[
              { icon: <Database />, title: "Data Engineering", desc: "Scalable pipelines & Medallion architecture." },
              { icon: <Brain />, title: "Machine Learning", desc: "Predictive modeling & Computer Vision." },
              { icon: <Globe />, title: "NLP", desc: "Sentiment analysis & Text processing." },
              { icon: <Code />, title: "MLOps", desc: "Containerization & Deployment at scale." }
            ].map((skill, index) => (
              <motion.div
                key={index}
                variants={item}
                className="p-6 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-brand transition-all hover:shadow-lg hover:shadow-brand/5 space-y-3 group"
              >
                <div className="w-10 h-10 rounded-lg bg-brand/10 text-brand flex items-center justify-center group-hover:scale-110 transition-transform">
                  {skill.icon}
                </div>
                <h3 className="text-lg font-bold group-hover:text-brand transition-colors">{skill.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed">{skill.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="pt-12 border-t border-slate-200 dark:border-slate-800"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400 text-center mb-8">Core Technology Stack</p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Python", "PyTorch", "GCP", "BigQuery", "SQL", "Airflow", "dbt", "Docker", "FastAPI", "Spark", "Databricks"].map((tech) => (
                <span 
                  key={tech}
                  className="px-4 py-2 text-xs font-mono border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 rounded-lg text-slate-600 dark:text-slate-400 shadow-sm hover:border-brand hover:text-brand transition-all cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
