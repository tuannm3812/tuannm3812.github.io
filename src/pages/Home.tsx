import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, GraduationCap, MapPin } from 'lucide-react';
import { resumeData } from '../data/resume';
import { focusAreas, featuredProjects, workingStyle } from '../data/home';
import { cn } from '../lib/utils';

// Every tool named in the skill matrix, de-duplicated, feeds the marquee so it
// stays in step with the Experience page without a second hand-kept list.
const marqueeTools = Array.from(new Set(resumeData.technologyStack.flatMap((s) => s.tools)));

// Bento spans for the four featured projects: wide/narrow, then narrow/wide.
const bentoSpans = ['md:col-span-4', 'md:col-span-2', 'md:col-span-2', 'md:col-span-4'];

// Floating chips around the portrait on large screens.
const chipPositions = [
  'lg:-left-10 lg:top-10',
  'lg:-right-8 lg:top-[42%]',
  'lg:-left-6 lg:bottom-36',
];

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
};

function SectionHeading({
  eyebrow,
  title,
  accent,
  children,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="max-w-3xl space-y-4">
      <p className="section-eyebrow">{eyebrow}</p>
      <h2 className="text-4xl font-black leading-[1.05] tracking-tight md:text-5xl">
        {title} <span className="font-display-serif text-gradient pr-1">{accent}</span>
      </h2>
      {children}
    </div>
  );
}

function FocusChip({
  title,
  desc,
  className,
  delay,
}: {
  title: string;
  desc: string;
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      className={cn(
        'surface-card glow-border p-4 lg:absolute lg:w-56 lg:bg-white/90 lg:shadow-2xl lg:shadow-brand/20 lg:dark:bg-night/85',
        className,
      )}
    >
      <span className="flex items-center gap-2 text-sm font-bold text-slate-950 dark:text-white">
        <span className="h-2 w-2 rounded-full bg-gradient-to-r from-brand to-aurora-cyan" />
        {title}
      </span>
      <span className="mt-1 block text-xs leading-snug text-slate-600 dark:text-slate-400">
        {desc}
      </span>
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="space-y-28">
      {/* Hero */}
      <section className="grid min-h-[70vh] min-w-0 items-center gap-14 pt-4 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="min-w-0 space-y-8"
        >
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
            <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1.5 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              AI, ML, and data engineering
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200/80 bg-white/70 px-3 py-1.5 text-slate-600 backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-400">
              <MapPin size={13} />
              {resumeData.location}
            </span>
          </div>

          <h1 className="max-w-4xl break-words text-5xl font-black leading-[0.95] tracking-[-0.035em] sm:text-6xl md:text-7xl xl:text-[5.5rem]">
            Reliable AI systems from{' '}
            <span className="font-display-serif text-gradient text-glow pr-2">messy data.</span>
          </h1>

          <p className="max-w-xl text-base leading-relaxed text-slate-600 dark:text-slate-400 sm:text-lg md:text-xl">
            I build applied AI agents, deployable ML prototypes, and data pipelines that are easy to
            inspect, rerun, and trust.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/projects" className="btn-primary group">
              View Projects
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/contact" className="btn-secondary">
              Get in Touch
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
          className="relative mx-auto w-full min-w-0 max-w-md lg:max-w-none"
        >
          {/* Rotating gradient halo behind the portrait */}
          <div
            className="absolute -inset-3 rounded-[2.5rem] bg-[conic-gradient(from_0deg,var(--color-brand),var(--color-aurora-violet),var(--color-aurora-cyan),var(--color-brand))] opacity-60 blur-2xl animate-spin-slow"
            aria-hidden="true"
          />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/20 bg-slate-950 shadow-2xl shadow-brand/20">
            <picture>
              <source srcSet="/assets/tuan-profile.webp" type="image/webp" />
              <img
                src="/assets/tuan-profile.jpg"
                alt="Tuan Nguyen looking across the water toward a city skyline"
                width={1200}
                height={1600}
                fetchPriority="high"
                className="h-[400px] w-full object-cover object-[42%_72%] md:h-[520px]"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-cyan-200">
                Sydney-based builder
              </p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-200">
                Business context, clean data foundations, and production-minded AI delivery.
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:mt-0 lg:block">
            {focusAreas.map((area, index) => (
              <FocusChip
                key={area.title}
                title={area.title}
                desc={area.desc}
                className={chipPositions[index]}
                delay={0.5 + index * 0.12}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Highlights */}
      <motion.section
        {...fadeUp}
        className="surface-card grid grid-cols-2 divide-slate-200/70 overflow-hidden md:grid-cols-4 md:divide-x dark:divide-white/[0.06]"
      >
        {resumeData.highlights.map((item) => (
          <div key={item.label} className="space-y-2 p-6 md:p-8">
            <p className="text-gradient text-4xl font-black tracking-tight md:text-5xl">
              {item.value}
            </p>
            <p className="text-sm leading-snug text-slate-600 dark:text-slate-400">{item.label}</p>
          </div>
        ))}
      </motion.section>

      {/* Tool marquee */}
      <section aria-label="Tools I work with" className="-mx-4 space-y-5">
        <p className="px-4 text-center font-mono text-[11px] uppercase tracking-[0.28em] text-slate-500">
          Toolkit in daily rotation
        </p>
        <div className="mask-fade-x overflow-hidden">
          <div className="flex w-max animate-marquee gap-3 hover:[animation-play-state:paused]">
            {[...marqueeTools, ...marqueeTools].map((tool, index) => (
              <span
                key={`${tool}-${index}`}
                aria-hidden={index >= marqueeTools.length}
                className="whitespace-nowrap rounded-full border border-slate-200/80 bg-white/60 px-4 py-2 font-mono text-xs text-slate-600 backdrop-blur-xl dark:border-white/[0.08] dark:bg-white/[0.03] dark:text-slate-400"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured projects */}
      <section className="space-y-10">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Featured projects" title="Flagship technical" accent="work.">
            <p className="text-base leading-relaxed text-slate-600 dark:text-slate-400 md:text-lg">
              Selected large-scale builds across enterprise AI, AI product engineering, deep
              learning research, and production-grade data architecture.
            </p>
          </SectionHeading>
          <Link to="/projects" className="btn-secondary group w-fit shrink-0">
            Browse all projects
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid auto-rows-[minmax(420px,auto)] gap-5 md:grid-cols-6">
          {featuredProjects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              {...fadeUp}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              className={cn(
                'glow-border group relative flex flex-col justify-end overflow-hidden rounded-3xl border border-slate-200/70 bg-slate-950 text-white shadow-xl shadow-slate-300/30 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-brand/25 dark:border-white/[0.08] dark:shadow-black/40',
                bentoSpans[index],
              )}
            >
              {project.coverImage && (
                <img
                  src={project.coverImage}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/5" />

              <div className="absolute left-6 right-6 top-6 flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/10 text-cyan-200 backdrop-blur-md">
                  {project.icon}
                </div>
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md transition-all duration-300 group-hover:rotate-45 group-hover:bg-white group-hover:text-slate-950">
                  <ArrowUpRight size={18} />
                </span>
              </div>

              <div className="relative space-y-3 p-6 md:p-7">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-white/50">0{index + 1}</span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-cyan-200">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-2xl font-black tracking-tight md:text-3xl">{project.title}</h3>
                <p className="max-w-xl text-sm leading-relaxed text-slate-300">{project.outcome}</p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 font-mono text-[10px] text-slate-200 backdrop-blur-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Working style */}
      <section className="space-y-10">
        <SectionHeading eyebrow="How I work" title="Principles behind" accent="the builds." />
        <div className="grid gap-5 md:grid-cols-3">
          {workingStyle.map((item, index) => (
            <motion.div
              key={item.title}
              {...fadeUp}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="surface-card surface-card-hover glow-border group relative overflow-hidden p-7"
            >
              <span
                className="pointer-events-none absolute -right-2 -top-6 select-none font-display-serif text-[7rem] leading-none text-slate-900/[0.04] transition-colors duration-500 group-hover:text-brand/10 dark:text-white/[0.04]"
                aria-hidden="true"
              >
                0{index + 1}
              </span>
              <div className="icon-tile relative h-11 w-11">{item.icon}</div>
              <h3 className="relative mt-6 text-lg font-bold">{item.title}</h3>
              <p className="relative mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Education strip */}
      <motion.section
        {...fadeUp}
        className="surface-card flex flex-col items-start gap-5 p-6 sm:flex-row sm:items-center md:p-8"
      >
        <div className="icon-tile h-12 w-12">
          <GraduationCap size={22} />
        </div>
        <div className="flex-1">
          <p className="font-bold">{resumeData.education[0].degree}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            {resumeData.education[0].institution} · {resumeData.education[0].period}
          </p>
        </div>
        <Link to="/experience" className="btn-secondary group w-fit">
          Full background
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.section>
    </div>
  );
}
