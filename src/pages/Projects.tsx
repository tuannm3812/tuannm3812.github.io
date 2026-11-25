import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { cn } from '../lib/utils';
import ShowcaseCard from '../components/ShowcaseCard';
import ProjectIndex from '../components/ProjectIndex';
import SectionHeading from '../components/SectionHeading';
import {
  ORIGIN_SECTIONS,
  getPlaygroundEpisode,
  getPortfolioProjects,
  groupProjectsByOrigin,
  splitFlagshipProjects,
} from '../lib/projects';
import type { ProjectOrigin } from '../data/projectOrigin';
import type { Project } from '../data/resume';
import { getProjectCard } from '../lib/projectCards';
import { FILTER_GROUPS, TAG_GROUPS, type TagGroup } from '../data/tagVocabulary';
import TagChip from '../components/TagChip';

// The unfiltered grid runs to ~40 cards of equal visual weight, which buries the
// strongest work. With no filter applied, every 3-star project in
// projectPriority.ts leads as "Selected work", then the rest are grouped by
// origin (projectOrigin.ts) so self-initiated work reads before set coursework.
// Each group shows a short preview; any active filter falls back to one grid.
// Kaggle, other and coursework render as one-line index rows; Selected Work and
// hackathons use compact cards with a small thumbnail (Mike, 18 Nov).
const INDEX_ORIGINS = new Set<ProjectOrigin>(['kaggle', 'other', 'coursework']);
const SECTION_PREVIEW_COUNT: Record<ProjectOrigin, number> = {
  personal: 6,
  hackathon: 6,
  kaggle: 6,
  other: 8,
  coursework: 8,
};

function PlaygroundTable({ episodes }: { episodes: Project[] }) {
  return (
    <div className="surface-card overflow-hidden">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-slate-200/80 px-5 py-4 dark:border-slate-800/80">
        <h3 className="text-base font-bold tracking-tight">Kaggle Playground Series, Season 6</h3>
        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
          {episodes.length} monthly tabular competitions
        </span>
      </div>
      <ol className="divide-y divide-slate-200/80 dark:divide-slate-800/80">
        {episodes.map((project) => (
          <li key={project.title}>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="group grid grid-cols-[4rem_1fr_auto] items-baseline gap-x-4 px-5 py-3 text-sm transition-colors hover:bg-brand/5"
            >
              <span className="text-xs font-bold tabular-nums text-brand dark:text-sky-300">
                {getPlaygroundEpisode(project.title)}
              </span>
              <span className="min-w-0">
                <span className="font-semibold group-hover:text-brand">
                  {getProjectCard(project).title}
                </span>
                <span className="ml-3 hidden gap-1 align-middle md:inline-flex">
                  {getProjectCard(project)
                    .tags.slice(0, 2)
                    .map((tag) => (
                      <TagChip key={tag} tag={tag} size="xs" />
                    ))}
                </span>
              </span>
              <ArrowUpRight
                size={14}
                className="text-slate-400 group-hover:text-brand"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ol>
    </div>
  );
}

export default function Projects() {
  const projects = getPortfolioProjects();

  // The filter offers the card groups from tagVocabulary.ts, so it matches the
  // card labels and tag colours.
  const categories: ('All' | TagGroup)[] = ['All', ...FILTER_GROUPS];
  const [activeCategory, setActiveCategory] = useState<'All' | TagGroup>('All');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<Set<ProjectOrigin>>(new Set());
  const expand = (origin: ProjectOrigin) => setExpanded((current) => new Set(current).add(origin));

  const handleCategoryChange = (category: 'All' | TagGroup) => {
    setActiveCategory(category);
    setSelectedTag(null);
  };

  const filteredProjects = projects.filter((project) => {
    const card = getProjectCard(project);
    const matchesCategory = activeCategory === 'All' || card.group === activeCategory;
    const matchesTag = !selectedTag || card.tags.includes(selectedTag);
    return matchesCategory && matchesTag;
  });

  const isFiltered = activeCategory !== 'All' || Boolean(selectedTag);
  const { flagship, archive } = splitFlagshipProjects(filteredProjects);
  const featuredProjects = isFiltered ? [] : flagship;
  const { groups, playground } = groupProjectsByOrigin(archive);
  // One leftover self-initiated card (the rest are Selected Work) is not worth a
  // section of its own, so it joins Other Projects.
  const personal = groups.get('personal') ?? [];
  if (personal.length === 1) {
    groups.set('other', [...personal, ...(groups.get('other') ?? [])]);
    groups.delete('personal');
  }

  return (
    <div className="space-y-8 pb-24">
      <div className="max-w-3xl space-y-3">
        <p className="hand-eyebrow">Projects</p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Everything <span className="hand-underline">I've built.</span>
        </h1>
        <p className="text-lg text-slate-500 dark:text-slate-400">
          AI agents, ML models, data pipelines and competition work. My own projects come first.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="scroll-fade-x -mx-4 flex overflow-x-auto px-4 pb-2 scrollbar-none md:mx-0 md:px-0">
          <div className="flex shrink-0 gap-1.5 rounded-full border border-slate-200/50 bg-slate-100/60 p-1 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-900/60">
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className="relative cursor-pointer select-none whitespace-nowrap rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="active-project-pill"
                      className="absolute inset-0 rounded-full bg-slate-950 shadow-sm dark:bg-white"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span
                    className={cn(
                      'relative z-10 transition-colors duration-200',
                      isActive
                        ? 'text-white dark:text-slate-950'
                        : 'text-slate-600 hover:text-slate-950 dark:text-slate-400 dark:hover:text-white',
                    )}
                  >
                    {category === 'All' ? 'All' : TAG_GROUPS[category].label}
                  </span>
                </button>
              );
            })}
          </div>
          {/* Scrollable room past the last pill so the fade never covers it. */}
          <div aria-hidden="true" className="w-10 shrink-0 md:hidden" />
        </div>

        {selectedTag && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-xs font-medium"
          >
            <span className="text-slate-500">Showing projects tagged</span>
            <TagChip tag={selectedTag} />
            <button
              onClick={() => setSelectedTag(null)}
              className="inline-flex cursor-pointer items-center gap-1 rounded-full px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
              aria-label="Clear tag filter"
            >
              <X size={12} />
              Clear
            </button>
          </motion.div>
        )}
      </div>

      {featuredProjects.length > 0 && (
        <section className="space-y-6">
          <SectionHeading
            hand="Start Here"
            title="Selected Work"
            aside={`${featuredProjects.length} of ${filteredProjects.length}`}
          />
          <div className="grid gap-4 lg:grid-cols-2">
            {featuredProjects.map((project) => (
              <ShowcaseCard key={project.title} project={project} onTagClick={setSelectedTag} />
            ))}
          </div>
        </section>
      )}

      {isFiltered ? (
        <section className="space-y-4">
          <motion.div layout className="grid gap-4 lg:grid-cols-2">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <ShowcaseCard key={project.title} project={project} onTagClick={setSelectedTag} />
              ))}
            </AnimatePresence>
          </motion.div>
        </section>
      ) : (
        ORIGIN_SECTIONS.map(({ origin, title, note }) => {
          const sectionProjects = groups.get(origin) ?? [];
          const extra = origin === 'kaggle' ? playground : [];
          if (sectionProjects.length + extra.length === 0) return null;
          const asIndex = INDEX_ORIGINS.has(origin);
          const isCollapsed =
            !expanded.has(origin) &&
            sectionProjects.length + extra.length > SECTION_PREVIEW_COUNT[origin];
          const shown = isCollapsed
            ? sectionProjects.slice(0, SECTION_PREVIEW_COUNT[origin])
            : sectionProjects;
          return (
            <section key={origin} className="space-y-6 pt-10" aria-labelledby={`origin-${origin}`}>
              <SectionHeading
                id={`origin-${origin}`}
                hand={note}
                title={title}
                aside={sectionProjects.length + extra.length}
              />
              {shown.length > 0 &&
                (asIndex ? (
                  <ProjectIndex projects={shown} />
                ) : (
                  <div className="grid gap-4 lg:grid-cols-2">
                    {shown.map((project) => (
                      <ShowcaseCard
                        key={project.title}
                        project={project}
                        onTagClick={setSelectedTag}
                      />
                    ))}
                  </div>
                ))}
              {isCollapsed && (
                <div className="flex justify-center">
                  <button type="button" onClick={() => expand(origin)} className="btn-secondary">
                    Show all {sectionProjects.length + extra.length} in {title}
                  </button>
                </div>
              )}
              {extra.length > 0 && !isCollapsed && <PlaygroundTable episodes={extra} />}
            </section>
          );
        })
      )}
    </div>
  );
}
