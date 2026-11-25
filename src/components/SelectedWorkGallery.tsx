import { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import TagChip from './TagChip';
import {
  SELECTED_WORK_GROUPS,
  selectedWork,
  splitKeyTerms,
  type SelectedWorkGroup,
} from '../data/selectedWork';

type Filter = 'all' | SelectedWorkGroup;

const GROUP_TONE: Record<SelectedWorkGroup, { text: string; dot: string }> = {
  research: { text: 'text-amber-700 dark:text-amber-400', dot: 'bg-amber-600 dark:bg-amber-400' },
  product: { text: 'text-brand dark:text-sky-300', dot: 'bg-brand dark:bg-sky-300' },
  event: { text: 'text-purple-700 dark:text-purple-300', dot: 'bg-purple-700 dark:bg-purple-300' },
};

const pad = (n: number) => String(n).padStart(2, '0');

function KeyTerms({ text }: { text: string }) {
  return (
    <>
      {splitKeyTerms(text).map((part, i) =>
        part.key ? (
          <mark key={i} className="key-term">
            {part.text}
          </mark>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  );
}

export default function SelectedWorkGallery() {
  const [filter, setFilter] = useState<Filter>('all');
  const [index, setIndex] = useState(0);

  const list = selectedWork.filter((p) => filter === 'all' || p.group === filter);
  const current = list[Math.min(index, list.length - 1)];
  const at = list.indexOf(current);
  const go = (i: number) => setIndex((i + list.length) % list.length);
  const tone = GROUP_TONE[current.group];
  // Swipe left or right on the cover to change project (phones).
  const touchX = useRef<number | null>(null);
  const onTouchEnd = (x: number) => {
    if (touchX.current === null) return;
    const dx = x - touchX.current;
    touchX.current = null;
    if (Math.abs(dx) > 48) go(dx < 0 ? at + 1 : at - 1);
  };
  const filters: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' },
    ...SELECTED_WORK_GROUPS,
  ];

  return (
    <section className="space-y-8" aria-labelledby="selected-work-heading">
      <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div className="space-y-2">
          <p className="font-hand text-3xl font-bold leading-none text-brand dark:text-sky-300">
            Selected Work
          </p>
          <h2
            id="selected-work-heading"
            className="text-3xl font-bold tracking-tight text-balance md:text-[2.75rem] md:leading-[1.08]"
          >
            From messy question to <span className="hand-underline">working answer.</span>
          </h2>
        </div>
        <div
          role="group"
          aria-label="Filter selected work"
          className="scrollbar-none flex w-fit max-w-full gap-0.5 overflow-x-auto rounded-full bg-slate-100 p-1 dark:bg-slate-900"
        >
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => {
                setFilter(f.id);
                setIndex(0);
              }}
              className={`min-h-9 shrink-0 whitespace-nowrap rounded-full px-3.5 text-sm font-semibold transition-colors ${
                filter === f.id
                  ? 'bg-white text-slate-950 shadow-sm dark:bg-slate-700 dark:text-white'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Announce only the change of project, not the whole story. */}
      <p aria-live="polite" className="sr-only">
        Project {at + 1} of {list.length}: {current.title}
      </p>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-12">
        <figure
          className="m-0 min-w-0 space-y-4"
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}
        >
          <a
            href={current.poster}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open the full poster for ${current.title}`}
            className="surface-card block overflow-hidden rounded-2xl shadow-[0_1px_2px_rgba(15,23,42,0.06),0_24px_48px_-24px_rgba(15,23,42,0.3)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
          >
            <motion.img
              key={current.id}
              initial={{ opacity: 0, scale: 1.01 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              src={current.thumb}
              alt={current.alt}
              width={1200}
              height={848}
              loading="lazy"
              className="aspect-[1.414/1] w-full bg-white object-cover object-top"
            />
          </a>
          <figcaption className="flex items-center gap-3">
            <nav
              aria-label="Selected projects"
              className="scroll-fade-x scrollbar-none min-w-0 flex-1 overflow-x-auto py-1"
            >
              <div className="flex min-w-max gap-2.5 px-1 pr-10 md:pr-1">
                {list.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    aria-current={i === at ? 'true' : undefined}
                    aria-label={p.title}
                    title={p.title}
                    onClick={() => go(i)}
                    className={`w-[4.5rem] shrink-0 overflow-hidden rounded-md bg-white ring-2 transition-[opacity,box-shadow] lg:w-16 xl:w-[4.25rem] ${
                      i === at
                        ? 'ring-brand dark:ring-sky-300'
                        : 'opacity-60 ring-slate-200 hover:opacity-100 dark:ring-slate-700'
                    }`}
                  >
                    <img
                      src={p.thumb}
                      alt=""
                      width={1200}
                      height={848}
                      loading="lazy"
                      className="aspect-[1.414/1] w-full object-cover object-top"
                    />
                  </button>
                ))}
              </div>
            </nav>
            <div className="hidden shrink-0 items-center gap-2.5 sm:flex">
              <span className="text-[13px] font-semibold tabular-nums text-slate-500 dark:text-slate-400">
                {pad(at + 1)} / {pad(list.length)}
              </span>
              <button
                type="button"
                onClick={() => go(at - 1)}
                aria-label="Previous project"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-900 transition-colors hover:border-brand hover:text-brand dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              >
                <ArrowLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => go(at + 1)}
                aria-label="Next project"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white transition-colors hover:bg-brand dark:bg-white dark:text-slate-950 dark:hover:bg-sky-300"
              >
                <ArrowRight size={18} aria-hidden="true" />
              </button>
            </div>
          </figcaption>
        </figure>

        <div className="flex min-w-0 flex-col gap-6 lg:pt-2">
          <div className="space-y-2.5">
            <p className={`flex items-center gap-2 text-[13px] font-bold ${tone.text}`}>
              <span aria-hidden="true" className={`h-2 w-2 rounded-full ${tone.dot}`} />
              {current.label}
            </p>
            <h3 className="text-3xl font-bold leading-[1.08] tracking-tight text-balance md:text-[2.1rem]">
              {current.title}
            </h3>
            <p className="text-lg font-medium leading-snug text-slate-700 text-pretty dark:text-slate-300 md:text-[1.2rem]">
              {current.subtitle}
            </p>
            <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">
              {current.role}
            </p>
          </div>

          <dl className="space-y-3.5">
            {(
              [
                ['question', current.question],
                ['built', current.built],
                ['answer', current.answer],
              ] as const
            ).map(([term, text]) => (
              <div key={term} className="grid grid-cols-[5.5rem_minmax(0,1fr)] gap-3">
                <dt className="font-hand text-[1.4rem] font-bold leading-tight text-brand dark:text-sky-300">
                  {term}
                </dt>
                <dd
                  className={`text-[15px] leading-relaxed ${
                    term === 'question'
                      ? 'text-base font-semibold text-slate-950 dark:text-white'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <KeyTerms text={text} />
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-auto space-y-5 border-t border-slate-200 pt-5 dark:border-slate-800">
            <ul aria-label="Skills" className="flex flex-wrap gap-2">
              {current.stack.map((tag) => (
                <li key={tag}>
                  <TagChip tag={tag} />
                </li>
              ))}
            </ul>
            {(current.demo || current.code) && (
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {current.demo && (
                  <a href={current.demo} target="_blank" rel="noreferrer" className="btn-primary">
                    Live demo
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                )}
                {current.code && (
                  <a
                    href={current.code}
                    target="_blank"
                    rel="noreferrer"
                    className={
                      current.demo
                        ? 'inline-flex min-h-11 items-center gap-1 font-semibold underline decoration-slate-300 underline-offset-4 hover:text-brand dark:decoration-slate-600'
                        : 'btn-primary'
                    }
                  >
                    Code
                    <ArrowUpRight size={18} aria-hidden="true" />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <Link to="/projects" className="btn-secondary w-fit">
        Browse All Projects
        <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </section>
  );
}
