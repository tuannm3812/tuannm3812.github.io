import { useState } from 'react';
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
          className="flex w-fit flex-wrap gap-0.5 rounded-full bg-slate-100 p-1 dark:bg-slate-900"
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
              className={`min-h-9 rounded-full px-3.5 text-sm font-semibold transition-colors ${
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

      <nav
        aria-label="Selected projects"
        className="overflow-x-auto border-b border-slate-200 dark:border-slate-800"
      >
        <div className="flex min-w-max gap-7">
          {list.map((p, i) => (
            <button
              key={p.id}
              type="button"
              aria-current={i === at ? 'true' : undefined}
              onClick={() => go(i)}
              className={`-mb-px inline-flex min-h-11 items-baseline gap-2 border-b-2 pb-3 text-[15px] whitespace-nowrap transition-colors ${
                i === at
                  ? 'border-brand font-bold text-slate-950 dark:border-sky-300 dark:text-white'
                  : 'border-transparent font-medium text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              <span className="text-xs tabular-nums text-slate-400">{pad(i + 1)}</span>
              {p.short}
            </button>
          ))}
        </div>
      </nav>

      <div aria-live="polite" className="grid items-stretch gap-10 lg:grid-cols-2">
        <figure className="m-0 rounded-3xl bg-slate-100 p-4 sm:p-5 dark:bg-slate-900">
          <a
            href={current.poster}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open the full poster for ${current.title}`}
            className="block overflow-hidden rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/50"
          >
            <img
              key={current.id}
              src={current.thumb}
              alt={current.alt}
              width={1200}
              height={848}
              loading="lazy"
              className="aspect-[1.414/1] w-full object-cover object-top shadow-[0_1px_2px_rgba(15,23,42,0.08),0_12px_32px_-12px_rgba(15,23,42,0.25)] transition-transform duration-500 hover:scale-[1.015]"
            />
          </a>
          <figcaption className="flex items-center justify-end gap-2.5 pt-4">
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
          </figcaption>
        </figure>

        <div className="flex min-w-0 flex-col gap-6 lg:py-5">
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
        Browse all projects
        <ArrowRight size={18} aria-hidden="true" />
      </Link>
    </section>
  );
}
