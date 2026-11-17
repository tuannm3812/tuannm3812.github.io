import { motion } from 'motion/react';
import { resumeData } from '../data/resume';
import OrgLogo from '../components/OrgLogo';
import { EMPLOYER_LOGO } from '../data/orgLogos';
import { Code2, Database, Cpu, BrainCircuit, Wrench, Bot, Terminal, Download } from 'lucide-react';

function getStackIcon(title: string) {
  const t = title.toLowerCase();
  if (t.includes('language') || t.includes('engineering'))
    return <Code2 size={18} className="text-brand dark:text-sky-300" />;
  if (t.includes('platform'))
    return <Database size={18} className="text-brand dark:text-sky-300" />;
  if (t.includes('orchestration') || t.includes('analytics'))
    return <Cpu size={18} className="text-brand dark:text-sky-300" />;
  if (t.includes('machine learning') || t.includes('ml'))
    return <BrainCircuit size={18} className="text-brand dark:text-sky-300" />;
  if (t.includes('production') || t.includes('mlops'))
    return <Wrench size={18} className="text-brand dark:text-sky-300" />;
  if (t.includes('ai') || t.includes('nlp') || t.includes('agent'))
    return <Bot size={18} className="text-brand dark:text-sky-300" />;
  return <Terminal size={18} className="text-brand dark:text-sky-300" />;
}

/** Highlights the measured results in a bullet (percentages and counts like 40+). */
function Highlighted({ text }: { text: string }) {
  return (
    <>
      {text.split(/(\d+(?:\.\d+)?%|\d+\+)/).map((part, i) =>
        i % 2 === 1 ? (
          <mark key={i} className="key-term">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}

function SectionHeading({ hand, title }: { hand: string; title: string }) {
  return (
    <div className="space-y-1.5">
      <p className="hand-eyebrow">{hand}</p>
      <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{title}</h2>
    </div>
  );
}

function splitRole(role: string) {
  const [title, team] = role.split(' · ');
  return { title, team };
}

export default function Experience() {
  return (
    <div className="max-w-5xl mx-auto space-y-16">
      {/* Page Header with Resume Download */}
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between border-b border-slate-100 pb-8 dark:border-slate-800/65">
        <div className="space-y-3">
          <p className="hand-eyebrow">experience</p>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Where I've done <span className="hand-underline">the work.</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl">
            Seven years across audit, strategy consulting and growth analytics, now building applied
            AI and ML.
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
        <SectionHeading hand="roles" title="Experience" />

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
                <p className="pt-1 text-sm font-semibold tabular-nums text-slate-500 dark:text-slate-400">
                  {exp.period}
                </p>
                <div className="surface-card space-y-4 p-6">
                  <div className="flex items-start gap-4">
                    <OrgLogo id={EMPLOYER_LOGO[exp.company]} size={44} />
                    <div className="min-w-0 space-y-1">
                      <h3 className="text-xl font-bold leading-snug tracking-tight">{title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        <span className="font-semibold text-slate-900 dark:text-white">
                          {exp.company}
                        </span>
                        {team && <> · {team}</>} · {exp.location}
                      </p>
                    </div>
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

      {/* Technical Skill Matrix */}
      <section className="space-y-8">
        <SectionHeading hand="toolkit" title="Skills" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {resumeData.technologyStack.map((stack, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="surface-card flex flex-col justify-between p-5"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-2.5">
                  <div className="icon-tile h-8 w-8">{getStackIcon(stack.title)}</div>
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
                    className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-900 dark:text-slate-300"
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
        <SectionHeading hand="how I work" title="Principles" />

        <div className="grid md:grid-cols-3 gap-5">
          {resumeData.reflections.map((ref, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="surface-card space-y-3 p-6"
            >
              <div className="space-y-1">
                <span className="font-hand text-xl font-bold leading-none text-amber-600 dark:text-amber-400">
                  {ref.category.toLowerCase()}
                </span>
                <h3 className="text-lg font-bold text-slate-950 dark:text-white">{ref.title}</h3>
              </div>
              <ul className="space-y-2">
                {ref.points.map((point, i) => (
                  <li
                    key={i}
                    className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed"
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
        <SectionHeading hand="study" title="Education" />

        <div className="grid md:grid-cols-2 gap-5">
          {resumeData.education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="surface-card space-y-4 p-6"
            >
              <div className="flex items-start gap-3">
                <OrgLogo id={EMPLOYER_LOGO[edu.institution]} size={44} />
                <div className="space-y-1">
                  <h3 className="text-lg font-bold">{edu.institution}</h3>
                  <p className="font-medium text-slate-600 dark:text-slate-300">{edu.degree}</p>
                </div>
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400">
                {edu.period} · {edu.location}
              </p>

              <ul className="space-y-2">
                {edu.points.map((point, i) => (
                  <li
                    key={i}
                    className="flex gap-2.5 text-sm leading-relaxed text-slate-600 dark:text-slate-400"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-slate-400"
                    />
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
