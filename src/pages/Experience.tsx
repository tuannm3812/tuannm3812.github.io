import { motion } from 'motion/react';
import { resumeData } from '../data/resume';
import OrgLogo from '../components/OrgLogo';
import SectionHeading from '../components/SectionHeading';
import SketchIcon, { type SketchIconName } from '../components/artwork/SketchIcon';
import { EMPLOYER_LOGO } from '../data/orgLogos';

// Skill groups use the same type colours as the drawn project covers:
// blue for agents and code, green for data, amber for models.
const SKILL_STYLE: Record<string, { icon: SketchIconName; tone: string; chip: string }> = {
  'Languages & Engineering': {
    icon: 'code',
    tone: 'border-t-brand dark:border-t-sky-300',
    chip: 'bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-200',
  },
  'Data Platforms': {
    icon: 'database',
    tone: 'border-t-emerald-600 dark:border-t-emerald-400',
    chip: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200',
  },
  'Pipelines & Analytics': {
    icon: 'flow',
    tone: 'border-t-emerald-600 dark:border-t-emerald-400',
    chip: 'bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200',
  },
  'Machine Learning': {
    icon: 'scatter',
    tone: 'border-t-amber-600 dark:border-t-amber-400',
    chip: 'bg-amber-50 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200',
  },
  'Production & MLOps': {
    icon: 'rocket',
    tone: 'border-t-amber-600 dark:border-t-amber-400',
    chip: 'bg-amber-50 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200',
  },
  'AI, LLMs & Agents': {
    icon: 'nodes',
    tone: 'border-t-brand dark:border-t-sky-300',
    chip: 'bg-blue-50 text-blue-800 dark:bg-blue-950/60 dark:text-blue-200',
  },
};

// The career in four stops. Years come from the roles and education in resume.ts.
const CAREER_PATH: {
  year: string;
  hand: string;
  title: string;
  org: string;
  icon: SketchIconName;
}[] = [
  { year: '2017', hand: 'Audit', title: 'Audit Automation', org: 'PwC', icon: 'ledger' },
  {
    year: '2020',
    hand: 'Strategy',
    title: 'AI for Business Clients',
    org: 'FPT',
    icon: 'compass',
  },
  { year: '2021', hand: 'Growth', title: 'ML & Insights Lead', org: 'Shopee', icon: 'growth' },
  { year: '2025', hand: 'AI', title: 'AI Builder', org: 'Sydney', icon: 'spark' },
];

function CareerPath() {
  return (
    <div className="relative">
      <svg
        viewBox="0 0 1000 40"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute left-[12%] top-[32px] hidden h-10 w-[76%] md:block"
      >
        <path
          d="M4 22 C 120 6, 220 34, 340 20 S 560 8, 680 22 S 880 30, 996 14"
          fill="none"
          stroke="#f59e0b"
          strokeWidth={4}
          strokeLinecap="round"
          strokeDasharray="2 12"
        />
      </svg>
      <ol className="relative grid gap-6 md:grid-cols-4 md:gap-4">
        {CAREER_PATH.map((stop, i) => (
          <motion.li
            key={stop.year}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12 }}
            className="flex items-center gap-4 md:flex-col md:text-center"
          >
            <span className="flex h-[104px] w-[104px] flex-shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-950">
              <SketchIcon name={stop.icon} size={60} />
            </span>
            <span className="space-y-0.5">
              <span className="block font-hand text-2xl font-bold leading-none text-brand dark:text-sky-300">
                {stop.year} · {stop.hand}
              </span>
              <span className="block font-semibold">{stop.title}</span>
              <span className="block text-sm text-slate-500 dark:text-slate-400">{stop.org}</span>
            </span>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

/** Highlights [[key terms]] and measured results (percentages, counts like 40+). */
function Highlighted({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\[\[.*?\]\]|\d+(?:\.\d+)?%|\d+\+)/).map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="key-term">
            {part.replace(/^\[\[|\]\]$/g, '')}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function splitRole(role: string) {
  const [title, team] = role.split(' · ');
  return { title, team };
}

export default function Experience() {
  return (
    <div className="max-w-5xl mx-auto space-y-16">
      {/* Page Header */}
      <div className="border-b border-slate-100 pb-8 dark:border-slate-800/65">
        <div className="space-y-3">
          <p className="hand-eyebrow">Experience</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Where I've done <span className="hand-underline">the work.</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            Seven years across audit, AI consulting and ML insights, now building AI systems in
            Sydney.
          </p>
        </div>
      </div>

      {/* Work Experience */}
      <section className="space-y-8">
        <SectionHeading hand="From Audit to AI" title="Experience" />
        <CareerPath />

        <ol className="space-y-6">
          {resumeData.experience.map((exp, index) => {
            const { title, team } = splitRole(exp.role);
            return (
              <motion.li
                key={exp.company}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="grid gap-3 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8"
              >
                <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-3 md:pt-1">
                  <OrgLogo id={EMPLOYER_LOGO[exp.company]} size={44} framed={false} />
                  <p className="text-sm font-semibold tabular-nums text-slate-500 dark:text-slate-400">
                    {exp.period}
                  </p>
                </div>
                <div className="surface-card space-y-4 p-6">
                  <div className="min-w-0 space-y-1">
                    <h3 className="text-xl font-bold leading-snug tracking-tight">{title}</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      <span className="font-semibold text-slate-900 dark:text-white">
                        {exp.company}
                      </span>
                      {team && <> · {team}</>} · {exp.location}
                    </p>
                  </div>
                  <ul className="grid gap-x-8 gap-y-2.5 md:grid-cols-2">
                    {exp.points.map((point) => (
                      <li
                        key={point}
                        className="flex gap-2.5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-slate-400"
                        />
                        <span>
                          <Highlighted text={point} />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.li>
            );
          })}
        </ol>
      </section>

      {/* Education */}
      <section className="space-y-8">
        <SectionHeading hand="Still Learning" title="Education" />

        <ol className="space-y-6">
          {resumeData.education.map((edu, index) => (
            <motion.li
              key={edu.institution}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="grid gap-3 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-8"
            >
              <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-3 md:pt-1">
                <OrgLogo id={EMPLOYER_LOGO[edu.institution]} size={44} framed={false} />
                <p className="text-sm font-semibold tabular-nums text-slate-500 dark:text-slate-400">
                  {edu.period}
                </p>
              </div>
              <div className="surface-card space-y-4 p-6">
                <div className="min-w-0 space-y-1">
                  <h3 className="text-xl font-bold leading-snug tracking-tight">{edu.degree}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {edu.institution}
                    </span>{' '}
                    · {edu.location}
                  </p>
                </div>
                <ul className="grid gap-x-8 gap-y-2.5 md:grid-cols-2">
                  {edu.points.map((point) => (
                    <li
                      key={point}
                      className="flex gap-2.5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-400"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2.5 h-1 w-1 flex-shrink-0 rounded-full bg-slate-400"
                      />
                      <span>
                        <Highlighted text={point} />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.li>
          ))}
        </ol>
      </section>

      {/* Technical Skill Matrix */}
      <section className="space-y-8 pb-24">
        <SectionHeading hand="What I Reach For" title="Skills" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resumeData.technologyStack.map((stack, index) => {
            const style = SKILL_STYLE[stack.title] ?? SKILL_STYLE['Languages & Engineering'];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className={`surface-card flex flex-col justify-between border-t-4 p-5 ${style.tone}`}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <SketchIcon name={style.icon} size={44} />
                    <h3 className="font-bold text-slate-950 dark:text-white leading-tight">
                      {stack.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {stack.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 border-t border-slate-100 pt-4 mt-4 dark:border-slate-800">
                  {stack.tools.map((tool) => (
                    <span
                      key={tool}
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${style.chip}`}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
