import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import SketchIcon from '../components/artwork/SketchIcon';
import { resumeData } from '../data/resume';
import { workingStyle } from '../data/home';
import SelectedWorkGallery from '../components/SelectedWorkGallery';

function WorkingStyleStep({
  step,
  icon,
  title,
  desc,
  last,
}: {
  step: number;
  icon: React.ReactNode;
  title: string;
  desc: string;
  last: boolean;
}) {
  return (
    <li className="relative">
      {/* Dotted amber connector to the next step, as on the Experience career path. */}
      {!last && (
        <span
          aria-hidden="true"
          className="absolute left-[4.75rem] right-[-1rem] top-8 hidden border-t-2 border-dotted border-slate-300 dark:border-slate-700 md:block"
        />
      )}
      <div className="relative flex items-center gap-3">
        <span className="flex h-16 w-16 items-center justify-center rounded-full border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
          {icon}
        </span>
      </div>
      <p className="font-hand mt-4 text-2xl font-bold leading-none text-brand dark:text-sky-300">
        Step {step}
      </p>
      <h3 className="mt-1.5 text-lg font-bold tracking-tight">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-600 dark:text-slate-400">
        {desc}
      </p>
    </li>
  );
}

export default function Home() {
  return (
    <div className="space-y-14">
      <section className="grid min-h-[56vh] min-w-0 items-center gap-10 py-8 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="min-w-0 space-y-6"
        >
          <div className="flex flex-wrap items-center gap-3 text-sm">
            <span className="font-semibold text-brand dark:text-sky-300">
              AI Builder · ML Engineer · AI Consultant
            </span>
            <span className="hidden h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-700 sm:block" />
            <span className="inline-flex items-center gap-1 text-slate-500 dark:text-slate-400">
              <SketchIcon name="pin" size={18} />
              {resumeData.location}
            </span>
          </div>

          <h1 className="max-w-4xl break-words text-3xl font-black leading-[0.98] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl">
            Reliable AI systems from <span className="hand-underline">messy data.</span>
          </h1>

          <p className="max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400 sm:text-lg md:text-xl">
            I'm Mike. I help teams turn scattered data into AI products, models and dashboards that
            people can inspect, trust and act on, from first prototype to handover.
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="min-w-0"
        >
          <div className="relative w-full max-w-full overflow-hidden rounded-2xl">
            <picture>
              <source srcSet="/assets/tuan-profile-warm.webp" type="image/webp" />
              <img
                src="/assets/tuan-profile-warm.jpg"
                alt="Tuan Nguyen looking across the water toward a city skyline"
                width={1200}
                height={1600}
                fetchPriority="high"
                className="h-[340px] w-full object-cover object-[42%_72%] md:h-[430px]"
              />
            </picture>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/5 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="font-hand text-2xl font-bold leading-none text-amber-300">
                Sydney-Based Builder
              </p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-slate-200">
                Business context, clean data foundations, and production-minded AI delivery.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      <SelectedWorkGallery />

      <section className="space-y-6" aria-labelledby="how-i-work-heading">
        <SectionHeading
          hand="How I Work"
          title="Three Habits Behind Every Project"
          id="how-i-work-heading"
        />
        <ol className="grid gap-8 pt-2 md:grid-cols-3 md:gap-10">
          {workingStyle.map((item, i) => (
            <WorkingStyleStep
              key={item.title}
              step={i + 1}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
              last={i === workingStyle.length - 1}
            />
          ))}
        </ol>
      </section>

      <section
        aria-labelledby="closing-heading"
        className="flex flex-col items-start gap-6 border-t border-slate-200 pt-12 md:flex-row md:items-center md:justify-between dark:border-slate-800"
      >
        <div className="space-y-2">
          <p className="hand-eyebrow">Next Step</p>
          <h2 id="closing-heading" className="text-3xl font-bold tracking-tight md:text-4xl">
            Have a messy data question? <span className="hand-underline">Let's talk.</span>
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Open to applied AI and ML engineering roles in Sydney.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4">
          <Link to="/contact" className="btn-primary group">
            Get in Touch
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/experience" className="btn-secondary">
            See Experience
          </Link>
        </div>
      </section>
    </div>
  );
}
