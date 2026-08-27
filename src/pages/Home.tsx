import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, MapPin } from 'lucide-react';
import { resumeData } from '../data/resume';
import { focusAreas, featuredProjects, workingStyle } from '../data/home';

function FocusAreaCard({ title, desc }: { title: string; desc: string }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="relative soft-panel p-4 overflow-hidden transition-all duration-300 hover:border-brand/45 hover:-translate-y-0.5"
    >
      {hovering && (
        <div
          className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(120px circle at ${coords.x}px ${coords.y}px, rgba(5, 64, 242, 0.08), transparent 80%)`,
          }}
        />
      )}
      <span className="relative z-10 block text-sm font-black text-slate-950 dark:text-white">
        {title}
      </span>
      <span className="relative z-10 mt-1 block text-xs font-semibold leading-snug text-slate-600 dark:text-slate-400">
        {desc}
      </span>
    </div>
  );
}

function WorkingStyleCard({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="surface-card p-5 relative overflow-hidden transition-transform duration-300 hover:-translate-y-0.5"
    >
      {hovering && (
        <div
          className="pointer-events-none absolute inset-0 opacity-100 transition-opacity duration-300"
          style={{
            background: `radial-gradient(200px circle at ${coords.x}px ${coords.y}px, rgba(5, 64, 242, 0.045), transparent 80%)`,
          }}
        />
      )}
      <div className="relative z-10 flex items-start gap-3">
        <div className="icon-tile h-9 w-9">{icon}</div>
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function ProjectCover({
  icon,
  title,
  category,
  coverImage,
}: {
  icon: React.ReactNode;
  title: string;
  category: string;
  coverImage?: string;
}) {
  return (
    <div className="relative aspect-[16/9] overflow-hidden rounded-md border border-slate-200 bg-slate-950 dark:border-slate-800">
      {coverImage ? (
        <>
          <img
            src={coverImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-950/40 to-slate-950/20" />
        </>
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,165,233,0.22),rgba(15,23,42,0)_45%),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:auto,26px_26px,26px_26px]" />
      )}
      <div className="relative flex h-full flex-col justify-between p-5 text-white">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-white/20 bg-white/10 text-sky-200">
          {icon}
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-sky-200">{category}</p>
          <p className="mt-1 text-sm font-black">{title}</p>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="space-y-14">
      <section className="grid min-h-[62vh] min-w-0 items-center gap-10 py-8 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="min-w-0 space-y-6"
        >
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="section-eyebrow">AI, ML, and data engineering</span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700 sm:block" />
            <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <MapPin size={16} />
              {resumeData.location}
            </span>
          </div>

          <h1 className="max-w-4xl break-words text-3xl font-black leading-[0.98] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
            Reliable AI systems from messy data.
          </h1>

          <p className="max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-lg md:text-xl">
            I build applied AI agents, deployable ML prototypes, and data pipelines that are easy to
            inspect, rerun, and trust.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link to="/projects" className="btn-primary group">
              View Projects
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link to="/contact" className="btn-secondary">
              Get in Touch
            </Link>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {focusAreas.map((area) => (
              <FocusAreaCard key={area.title} title={area.title} desc={area.desc} />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="min-w-0"
        >
          <div className="surface-card relative w-full max-w-full overflow-hidden shadow-xl shadow-slate-300/40 dark:shadow-black/30">
            <picture>
              <source srcSet="/assets/tuan-profile.webp" type="image/webp" />
              <img
                src="/assets/tuan-profile.jpg"
                alt="Tuan Nguyen looking across the water toward a city skyline"
                width={1200}
                height={1600}
                fetchPriority="high"
                className="h-[340px] w-full object-cover object-[42%_72%] md:h-[430px]"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-sky-200">
                Sydney-based builder
              </p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-200">
                Business context, clean data foundations, and production-minded AI delivery.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl space-y-3">
            <p className="section-eyebrow">Featured projects</p>
            <h2 className="text-3xl font-black tracking-tight md:text-4xl">
              Flagship technical work.
            </h2>
            <p className="text-base leading-relaxed text-slate-500 dark:text-slate-400 md:text-lg">
              Selected large-scale builds across enterprise AI, AI product engineering, deep
              learning research, and production-grade data architecture.
            </p>
          </div>
          <Link to="/projects" className="btn-secondary w-fit">
            Browse all projects
            <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {featuredProjects.map((project, index) => (
            <motion.a
              key={project.title}
              href={project.href}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="surface-card surface-card-hover group flex min-h-full flex-col gap-5 p-5"
            >
              <ProjectCover
                icon={project.icon}
                title={project.title}
                category={project.category}
                coverImage={project.coverImage}
              />

              <div className="flex flex-1 flex-col justify-between gap-5">
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <span className="brand-pill">{project.category}</span>
                    <ExternalLink
                      size={18}
                      className="text-slate-400 transition-colors group-hover:text-brand"
                    />
                  </div>
                  <h3 className="text-2xl font-black tracking-tight transition-colors group-hover:text-brand">
                    {project.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                    {project.outcome}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 border-t border-slate-100 pt-4 dark:border-slate-800">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 font-mono text-[10px] font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400"
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

      <section className="grid gap-4 md:grid-cols-3">
        {workingStyle.map((item) => (
          <WorkingStyleCard key={item.title} icon={item.icon} title={item.title} desc={item.desc} />
        ))}
      </section>
    </div>
  );
}
