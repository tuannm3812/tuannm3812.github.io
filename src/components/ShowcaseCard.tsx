import type { CSSProperties } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../data/resume';
import { COVERS, getCoverKind, getProjectLogo, getProjectPoster } from '../lib/projectVisuals';
import OrgLogo from './OrgLogo';
import TagChip from './TagChip';
import { getProjectCard } from '../lib/projectCards';

function linkLabel(href: string) {
  if (href.endsWith('-deck.pdf')) return 'Deck';
  return href.startsWith('/assets/posters/') ? 'Poster' : 'Live demo';
}

function DrawnCover({ project }: { project: Project }) {
  const cover = COVERS[getCoverKind(getProjectCard(project))];
  return (
    <div
      className="drawn-cover relative aspect-[1.414/1] overflow-hidden"
      style={{ '--cover-bg': cover.bg, '--cover-dark': cover.darkBg } as CSSProperties}
    >
      <svg
        viewBox="0 0 320 180"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        <path
          d={cover.path}
          fill="none"
          stroke={cover.ink}
          strokeWidth={2}
          strokeLinecap="round"
          opacity={0.55}
        />
        <g fill={cover.ink} opacity={0.8}>
          {cover.dots.map(([x, y, r]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={r} />
          ))}
        </g>
      </svg>
      <p
        className="font-hand absolute bottom-1.5 left-2.5 text-xl font-bold leading-none"
        style={{ color: cover.ink }}
      >
        {cover.label}
      </p>
    </div>
  );
}

/**
 * Compact project card (Mike, 18 Nov): a small poster or drawn thumbnail on the
 * left, copy on the right. The Home gallery already shows the big posters, so
 * the Projects page keeps every card the same modest size.
 */
export default function ShowcaseCard({
  project,
  onTagClick,
}: {
  project: Project;
  onTagClick?: (tag: string) => void;
}) {
  const poster = getProjectPoster(project);
  const logo = getProjectLogo(project);
  const primary = project.demo ?? project.github;
  const card = getProjectCard(project);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="surface-card group flex h-full gap-4 p-4 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:gap-5"
    >
      <div className="relative w-28 shrink-0 self-start overflow-hidden rounded-lg ring-1 ring-slate-200/80 sm:w-40 dark:ring-slate-800">
        {poster ? (
          <img
            src={poster}
            alt=""
            width={1200}
            height={848}
            loading="lazy"
            className="aspect-[1.414/1] w-full bg-slate-100 object-cover object-top dark:bg-slate-900"
          />
        ) : (
          <DrawnCover project={project} />
        )}
        {logo && (
          <span className="absolute right-1.5 top-1.5">
            <OrgLogo id={logo} size={22} />
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{card.label}</p>
        <h3 className="text-base font-bold leading-snug tracking-tight sm:text-lg">
          {primary ? (
            <a
              href={primary}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40"
            >
              {card.title}
            </a>
          ) : (
            card.title
          )}
        </h3>
        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          {card.description}
        </p>
        <ul aria-label="Skills" className="flex flex-wrap gap-1.5 pt-1">
          {card.tags.map((tag) => (
            <li key={tag}>
              <TagChip tag={tag} size="xs" onClick={onTagClick} />
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-x-4 pt-1 text-sm font-semibold">
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-9 items-center gap-1 text-brand hover:underline dark:text-sky-300"
            >
              {linkLabel(project.demo)}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-9 items-center gap-1 text-slate-700 hover:text-brand dark:text-slate-300"
            >
              Code
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
