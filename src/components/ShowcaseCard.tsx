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
      className="drawn-cover relative aspect-[16/9] overflow-hidden"
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
        className="font-hand absolute bottom-2.5 left-4 text-3xl font-bold leading-none"
        style={{ color: cover.ink }}
      >
        {cover.label}
      </p>
    </div>
  );
}

export default function ShowcaseCard({
  project,
  onTagClick,
  feature = false,
}: {
  project: Project;
  onTagClick?: (tag: string) => void;
  /** Wide card: cover on the left, copy on the right, from md up. */
  feature?: boolean;
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
      className={`surface-card group flex h-full flex-col overflow-hidden transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-lg ${feature ? 'md:flex-row' : ''}`}
    >
      <div className={`relative ${feature ? 'md:w-3/5 md:shrink-0' : ''}`}>
        {poster ? (
          <div className="bg-slate-100 px-3.5 pt-3.5 dark:bg-slate-900">
            <img
              src={poster}
              alt=""
              width={1200}
              height={848}
              loading="lazy"
              className="aspect-[1.414/1] w-full rounded-t-md object-cover object-top"
            />
          </div>
        ) : (
          <DrawnCover project={project} />
        )}
        {logo && (
          <span className="absolute right-3 top-3">
            <OrgLogo id={logo} size={34} />
          </span>
        )}
      </div>

      <div
        className={`flex flex-1 flex-col gap-2.5 p-5 ${feature ? 'md:justify-center md:p-8' : ''}`}
      >
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400">{card.label}</p>
        <h3
          className={`font-bold leading-snug tracking-tight ${feature ? 'text-2xl md:text-3xl' : 'text-lg'}`}
        >
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

        <div className="mt-auto space-y-3 pt-2">
          <ul aria-label="Skills" className="flex flex-wrap gap-1.5">
            {card.tags.map((tag) => (
              <li key={tag}>
                <TagChip tag={tag} onClick={onTagClick} />
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-x-4 gap-y-1 border-t border-slate-100 pt-3 text-sm font-semibold dark:border-slate-800">
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
      </div>
    </motion.article>
  );
}
