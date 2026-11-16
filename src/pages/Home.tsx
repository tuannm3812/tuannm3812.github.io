import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Download } from 'lucide-react';
import { resumeData } from '../data/resume';
import { workingStyle } from '../data/home';
import { getPortfolioProjects, splitFlagshipProjects } from '../lib/projects';

const pad = (n: number) => String(n).padStart(2, '0');

// resume.ts carries a hand-typed project count for the PDF resume; on the site
// the live count is shown instead so it always matches the Projects page.
const PROJECT_COUNT_LABEL = 'Technical projects across ML, data, and AI';

export default function Home() {
  const allProjects = getPortfolioProjects();
  const { flagship } = splitFlagshipProjects(allProjects);

  return (
    <div className="space-y-16 md:space-y-20">
      <section className="grid min-w-0 gap-10 pt-6 md:grid-cols-12 md:gap-8 md:pt-10">
        <div className="min-w-0 space-y-7 md:col-span-8">
          <p className="flex flex-wrap gap-x-5 gap-y-1 text-xs uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
            <span className="font-semibold text-brand dark:text-brand-light">
              Applied AI Engineer · ML Engineer · Data Engineer
            </span>
            <span>{resumeData.location}</span>
          </p>

          <h1 className="break-words text-5xl font-black leading-[0.92] tracking-[-0.035em] sm:text-6xl lg:text-7xl xl:text-[5.5rem]">
            Reliable AI systems from <span className="text-brand">messy data.</span>
          </h1>

          <p className="max-w-[46ch] text-lg leading-relaxed text-slate-700 dark:text-slate-300">
            I build applied AI agents, deployable ML prototypes, and data pipelines that are easy to
            inspect, rerun, and trust.
          </p>

          <div className="flex flex-wrap gap-3">
            <Link to="/projects" className="btn-primary group">
              View projects
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <a href="/assets/tuan-nguyen-resume.pdf" download className="btn-secondary">
              <Download size={18} aria-hidden="true" />
              Download resume
            </a>
            <Link
              to="/contact"
              className="self-center px-2 text-sm font-medium underline decoration-rule underline-offset-4 hover:text-brand hover:decoration-brand dark:decoration-rule-dark dark:hover:text-brand-light"
            >
              Get in touch
            </Link>
          </div>
        </div>

        <figure className="min-w-0 space-y-2 self-end md:col-span-4">
          <picture>
            <source srcSet="/assets/tuan-profile.webp" type="image/webp" />
            <img
              src="/assets/tuan-profile.jpg"
              alt="Tuan Nguyen looking across the water toward a city skyline"
              width={1200}
              height={1600}
              fetchPriority="high"
              className="aspect-[4/5] w-full object-cover object-[42%_60%] grayscale contrast-[1.05]"
            />
          </picture>
          <figcaption className="font-mono text-[11px] text-slate-500 dark:text-slate-400">
            Fig. 1 — {resumeData.location}
          </figcaption>
        </figure>
      </section>

      <section
        aria-label="Highlights"
        className="grid grid-cols-2 border-y border-ink md:grid-cols-4 dark:border-slate-200"
      >
        {resumeData.highlights
          .map((item) =>
            item.label === PROJECT_COUNT_LABEL
              ? { ...item, value: String(allProjects.length) }
              : item,
          )
          .map((item, index) => (
            <div
              key={item.label}
              className={
                'border-rule py-4 pr-3 dark:border-rule-dark ' +
                (index % 2 === 1 ? 'border-l pl-4 ' : '') +
                (index >= 2 ? 'border-t md:border-t-0 ' : '') +
                (index === 2 ? 'md:border-l md:pl-4' : '')
              }
            >
              <p className="font-display text-3xl font-extrabold leading-none tracking-tight">
                {item.value}
              </p>
              <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">{item.label}</p>
            </div>
          ))}
      </section>

      <section className="space-y-2">
        <div className="index-heading">
          <h2 className="section-eyebrow">Flagship work</h2>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Ranked · {flagship.length} of {allProjects.length}
          </span>
        </div>

        <ol className="divide-y divide-rule dark:divide-rule-dark">
          {flagship.map((project, index) => {
            const href = project.demo || project.github;
            const body = (
              <>
                <span className="font-mono text-xs text-slate-500 md:col-span-1 md:pt-1.5 dark:text-slate-400">
                  {pad(index + 1)}
                </span>
                <span className="font-display text-xl font-bold leading-tight tracking-tight transition-colors group-hover:text-brand md:col-span-4 md:text-2xl dark:group-hover:text-brand-light">
                  {project.title}
                </span>
                <span className="text-sm leading-relaxed text-slate-700 md:col-span-4 md:pt-1 dark:text-slate-300">
                  {project.impact}
                </span>
                <span className="flex items-start justify-between gap-3 font-mono text-[11px] text-slate-500 md:col-span-3 md:justify-end md:pt-1.5 md:text-right dark:text-slate-400">
                  {project.stack.slice(0, 2).join(' · ')}
                  {href && <ArrowUpRight size={14} className="shrink-0 group-hover:text-brand" />}
                </span>
              </>
            );
            const rowClass =
              'group grid grid-cols-[2.5rem_1fr] gap-x-3 gap-y-1 py-4 md:grid-cols-12 md:gap-x-6 [&>*:nth-child(n+3)]:col-start-2 md:[&>*:nth-child(n+3)]:col-start-auto';
            return (
              <li key={project.title}>
                {href ? (
                  <a href={href} target="_blank" rel="noreferrer" className={rowClass}>
                    {body}
                  </a>
                ) : (
                  <div className={rowClass}>{body}</div>
                )}
              </li>
            );
          })}
        </ol>

        <div className="pt-4">
          <Link to="/projects" className="btn-secondary">
            Browse all {allProjects.length} projects
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <section className="space-y-6">
        <div className="index-heading">
          <h2 className="section-eyebrow">How I work</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {workingStyle.map((item) => (
            <div key={item.title} className="space-y-2">
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
