import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import SketchIcon from '../components/artwork/SketchIcon';
import { resumeData } from '../data/resume';
import { workingStyle } from '../data/home';
import SelectedWorkGallery from '../components/SelectedWorkGallery';

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
        <div className="icon-tile h-11 w-11 shrink-0">{icon}</div>
        <div>
          <h3 className="font-bold">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{desc}</p>
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
            I help teams turn scattered data into AI products, models and dashboards that people can
            inspect, trust and act on, from first prototype to handover.
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

      <section className="space-y-6 pb-10" aria-labelledby="how-i-work-heading">
        <SectionHeading
          hand="How I Work"
          title="Three Habits Behind Every Project"
          id="how-i-work-heading"
        />
        <div className="grid gap-4 md:grid-cols-3">
          {workingStyle.map((item) => (
            <WorkingStyleCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              desc={item.desc}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
