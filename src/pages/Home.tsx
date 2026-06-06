import React from 'react';
import { motion } from 'motion/react';
import { resumeData } from '../data/resume';
import { ArrowRight, Bot, Brain, Camera, CloudCog, Database, ExternalLink, MapPin, PackageCheck, SearchCheck, Trophy, Warehouse } from 'lucide-react';
import { Link } from 'react-router-dom';

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
    icon: <Brain size={20} />,
    label: "AI Agents & Deep Learning",
    title: "Models that reason and act",
    desc: "Text-to-SQL, RAG, vision, audio ML, captioning, and competition-grade modelling systems."
  },
  {
    icon: <Database size={20} />,
    label: "Data Engineering",
    title: "Pipelines that can be trusted",
    desc: "Airflow, dbt, Snowflake, Databricks, Delta Lake, medallion layers, and analytics marts."
  },
  {
    icon: <CloudCog size={20} />,
    label: "MLOps & Deployment",
    title: "From notebook to production",
    desc: "FastAPI, Streamlit, GitHub Actions, pytest, model artifacts, and live dashboards."
  },
  {
    icon: <Trophy size={20} />,
    label: "Kaggle & Experimentation",
    title: "Systematic ML experimentation",
    desc: "Grouped validation, boosting sweeps, OOF blending, bioacoustics, tabular ML, and simulation agents."
  }
];

const focusAreas = [
  {
    title: "Data Engineering",
    desc: "Reliable data foundations for analytics and ML."
  },
  {
    title: "Machine Learning",
    desc: "Models with validation, diagnostics, and repeatable workflows."
  },
  {
    title: "Applied AI",
    desc: "AI workflows with retrieval, safeguards, and usable interfaces."
  }
];

const featuredBuilds = [
  {
    icon: <Bot size={20} />,
    title: "Enterprise Text-to-SQL Agent",
    category: "Applied AI",
    outcome: "Natural-language analytics over local SQLite with schema RAG, SQL validation, and privacy-aware execution.",
    stack: ["Gemini/Ollama", "Schema RAG", "SQLGlot", "Streamlit"],
    href: "https://github.com/tuannm3812/aipa-text-to-sql-agent"
  },
  {
    icon: <Camera size={20} />,
    title: "FoodLens",
    category: "Deployable ML",
    outcome: "Calibrated food recognition with confidence routing, multi-food detection, and full-stack delivery.",
    stack: ["PyTorch", "ResNet50", "FastAPI", "React"],
    href: "https://github.com/tuannm3812/foodlens-calibrated-food-recognition"
  },
  {
    icon: <Warehouse size={20} />,
    title: "Airbnb ELT Warehouse",
    category: "Data Engineering",
    outcome: "Sydney Airbnb and Census warehouse with orchestration, dimensional marts, and SCD Type 2 history.",
    stack: ["Airflow", "dbt", "PostgreSQL", "Medallion"],
    href: "https://github.com/tuannm3812/airbnb-ELT-warehouse"
  }
];

const lifecycleStack = [
  {
    icon: <Database size={18} />,
    step: "Prepare",
    desc: "Clean, model, and organize data so downstream work starts from a trusted base.",
    tools: ["Python", "SQL", "PySpark", "Airflow", "dbt", "Snowflake"]
  },
  {
    icon: <Brain size={18} />,
    step: "Model",
    desc: "Build experiments with clear validation, diagnostics, and repeatable training logic.",
    tools: ["PyTorch", "scikit-learn", "LightGBM", "CatBoost", "Validation", "Diagnostics"]
  },
  {
    icon: <PackageCheck size={18} />,
    step: "Ship",
    desc: "Package outputs into APIs, apps, artifacts, and automated checks people can use.",
    tools: ["FastAPI", "Streamlit", "GitHub Actions", "pytest", "Artifacts", "APIs"]
  },
  {
    icon: <SearchCheck size={18} />,
    step: "Explain",
    desc: "Add retrieval, monitoring, documentation, and diagnostics so decisions are traceable.",
    tools: ["SQLGlot", "Retrieval", "Dashboards", "Docs", "Evaluation", "Monitoring"]
  }
];

const reflectionIcons = [
  <SearchCheck size={20} />,
  <Database size={20} />,
  <PackageCheck size={20} />
];

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="grid min-h-[66vh] min-w-0 items-center gap-10 py-8 lg:grid-cols-[1.08fr_0.92fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="min-w-0 space-y-6"
        >
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="section-eyebrow">
              Open to ML and data engineering roles
            </span>
            <span className="hidden sm:block h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700" />
            <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <MapPin size={16} />
              {resumeData.location}
            </span>
          </div>
          <h1 className="max-w-4xl break-words text-3xl sm:text-5xl md:text-6xl xl:text-7xl font-black leading-[0.98] tracking-tight">
            <span className="block">Reliable ML systems</span>
            <span className="block">from messy data.</span>
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-lg md:text-xl">
            I'm a <span className="text-slate-900 dark:text-slate-100 font-semibold">ML Engineer & Data Professional</span> building AI agents, deployable models, and data pipelines that are easy to inspect, rerun, and trust.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/projects"
              className="btn-primary group"
            >
              View Projects
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/contact"
              className="btn-secondary"
            >
              Get in Touch
            </Link>
          </div>

          <div className="soft-panel grid gap-3 p-3 sm:grid-cols-3">
            {focusAreas.map((area) => (
              <div key={area.title} className="rounded-md bg-white/80 px-3 py-3 dark:bg-slate-900/70">
                <span className="block text-sm font-black text-slate-950 dark:text-white">{area.title}</span>
                <span className="mt-1 block text-[11px] font-semibold leading-snug text-slate-600 dark:text-slate-400">
                  {area.desc}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="min-w-0 space-y-4"
        >
          <div className="surface-card relative w-full max-w-full overflow-hidden shadow-xl shadow-slate-300/40 dark:shadow-black/30">
            <img
              src="/assets/tuan-profile.jpg"
              alt="Tuan Nguyen looking across the water toward a city skyline"
              className="h-[360px] w-full object-cover object-[42%_72%] md:h-[440px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-sky-200">Sydney-based data builder</p>
              <p className="mt-2 max-w-[18rem] text-xs leading-relaxed text-slate-200 sm:max-w-sm sm:text-sm">
                I turn ambiguous data problems into systems people can use and review.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Featured Builds */}
      <section className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="section-eyebrow">Featured builds</p>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight">
              Work that goes beyond the notebook.
            </h2>
            <p className="text-base leading-relaxed text-slate-500 dark:text-slate-400 md:text-lg">
              Three examples of data, ML, and AI work built for review, reuse, and deployment.
            </p>
          </div>
          <Link to="/projects" className="btn-secondary w-fit">
            Browse all projects
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid gap-4 lg:grid-cols-3">
          {featuredBuilds.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="surface-card surface-card-hover group flex min-h-[250px] flex-col justify-between p-6"
            >
              <div className="space-y-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex min-w-0 flex-wrap items-center gap-3">
                    <span className="icon-tile h-10 w-10 transition-all group-hover:border-brand/50 group-hover:bg-brand group-hover:text-white">
                      {project.icon}
                    </span>
                    <span className="brand-pill">{project.category}</span>
                  </div>
                  <ExternalLink size={18} className="text-slate-400 transition-colors group-hover:text-brand" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-black tracking-tight group-hover:text-brand transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {project.outcome}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-1.5 border-t border-slate-100 pt-4 dark:border-slate-800">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[10px] font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Quick Summary */}
      <section className="soft-panel grid md:grid-cols-[0.9fr_1.1fr] gap-10 items-center p-6 md:p-8">
        <h2 className="text-3xl md:text-4xl font-black tracking-tight">
          Business context <br />
          meets engineering <br />
          <span className="text-brand">execution.</span>
        </h2>
        <div className="space-y-4 text-base md:text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          <p>
            My background spans consulting, audit, and e-commerce analytics. That shapes how I build: clear business framing, reliable data foundations, and outputs people can act on.
          </p>
        </div>
      </section>

      {/* Reflections & Insights */}
      <section className="space-y-8">
        <div className="space-y-3">
          <p className="section-eyebrow">Working style</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">How I Think About the Work</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            Practical principles from moving between business problems, data systems, and ML delivery.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {resumeData.reflections.map((reflection, index) => (
            <motion.div
              key={reflection.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="surface-card surface-card-hover p-6"
            >
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="icon-tile h-10 w-10">
                    {reflectionIcons[index % reflectionIcons.length]}
                  </div>
                  <span className="brand-pill">{reflection.category}</span>
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
        <div className="max-w-3xl space-y-3">
          <p className="section-eyebrow">Modern data stack</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight">Core Toolkit</h2>
          <p className="text-lg text-slate-500 dark:text-slate-400">Tools and patterns I use to move from raw data to reliable outputs.</p>
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
                className="surface-card surface-card-hover expertise-band p-6 group"
              >
                <div className="flex items-start gap-5">
                  <div className="icon-tile h-10 w-10 group-hover:scale-105 transition-transform">
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
            <div className="max-w-3xl space-y-3">
              <p className="section-eyebrow">Workflow</p>
              <h3 className="text-3xl md:text-4xl font-black tracking-tight">From raw data to systems people can trust.</h3>
              <p className="text-lg leading-relaxed text-slate-500 dark:text-slate-400">
                The stack is organized around delivery: prepare reliable data, model with evidence, ship usable interfaces, and make every output easy to review.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {lifecycleStack.map((group) => (
                <div
                  key={group.step}
                  className="surface-card surface-card-hover p-5"
                >
                  <div className="flex items-start gap-3">
                    <div className="icon-tile mt-1 h-9 w-9">
                      {group.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{group.step}</h4>
                      <p className="mt-1 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                        {group.desc}
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
