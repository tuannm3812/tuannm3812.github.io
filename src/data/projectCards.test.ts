import { describe, expect, it } from 'vitest';
import { PROJECT_CARDS } from './projectCards';
import { selectedWork } from './selectedWork';
import { TAG_VOCABULARY, isKnownTag } from './tagVocabulary';
import { getPortfolioProjects } from '../lib/projects';

// Card rules: docs/12-design-guideline.md, "Project cards".
const words = (text: string) => text.trim().split(/\s+/).length;
// Sponsors, clients and internal infrastructure never appear on a card.
const BANNED = /\b(LEGO|Caterpillar|WesTrac|Austroads|Synogize|HPC)\b/i;

describe('project cards', () => {
  const entries = Object.entries(PROJECT_CARDS);

  it('covers every project on the Projects page', () => {
    const missing = getPortfolioProjects()
      .map((project) => project.title)
      .filter((title) => !PROJECT_CARDS[title]);
    expect(missing, 'add these to src/data/projectCards.ts').toEqual([]);
  });

  it('has no entries for projects that no longer exist', () => {
    const titles = new Set(getPortfolioProjects().map((project) => project.title));
    expect(entries.map(([key]) => key).filter((key) => !titles.has(key))).toEqual([]);
  });

  it.each(entries)('%s uses exactly 3 distinct tags from the fixed list', (_, card) => {
    expect(card.tags).toHaveLength(3);
    expect(new Set(card.tags).size).toBe(3);
    for (const tag of card.tags) expect(isKnownTag(tag), tag).toBe(true);
  });

  it.each(entries)('%s has a one-sentence description of 8 to 14 words', (_, card) => {
    expect(words(card.description)).toBeGreaterThanOrEqual(8);
    expect(words(card.description)).toBeLessThanOrEqual(14);
    expect(card.description).toMatch(/^[A-Z0-9].*\.$/);
    expect(card.description).not.toMatch(BANNED);
  });

  it.each(entries)('%s has a short title with no event or Kaggle prefix', (_, card) => {
    expect(words(card.title)).toBeLessThanOrEqual(6);
    expect(card.title).not.toMatch(/^Kaggle\b|Hackathon|\b20\d\d\b/);
    expect(card.title).not.toMatch(BANNED);
  });

  it('leads every card with a skill, never a tool', () => {
    const tools = new Set<string>(TAG_VOCABULARY.tools);
    expect(entries.filter(([, card]) => tools.has(card.tags[0])).map(([key]) => key)).toEqual([]);
  });
});

describe('Home gallery tags', () => {
  it.each(selectedWork.map((work) => [work.id, work] as const))(
    '%s uses 3 tags from the fixed list',
    (_, work) => {
      expect(work.stack).toHaveLength(3);
      for (const tag of work.stack) expect(isKnownTag(tag), tag).toBe(true);
    },
  );
});
