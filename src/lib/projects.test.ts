import { describe, expect, it } from 'vitest';
import { projectPriority } from '../data/projectPriority';
import {
  FLAGSHIP_STARS,
  getPlaygroundEpisode,
  getPortfolioProjects,
  getProjectOrigin,
  groupProjectsByOrigin,
  splitFlagshipProjects,
} from './projects';

describe('splitFlagshipProjects', () => {
  it('puts every 3-star project first, in rank order', () => {
    const all = getPortfolioProjects();
    const titles = new Set(all.map((p) => p.title));
    const { flagship } = splitFlagshipProjects(all);
    // A priority entry can land before its card syncs (FarmLens did), so only
    // titles that have a card are expected.
    const expected = Object.entries(projectPriority)
      .filter(([title, rank]) => rank.stars >= FLAGSHIP_STARS && titles.has(title))
      .sort(([, a], [, b]) => b.score - a.score)
      .map(([title]) => title);
    expect(flagship.map((p) => p.title)).toEqual(expected);
  });

  it('keeps every project exactly once', () => {
    const all = getPortfolioProjects();
    const { flagship, archive } = splitFlagshipProjects(all);
    expect(flagship.length + archive.length).toBe(all.length);
    expect(archive.every((p) => !flagship.includes(p))).toBe(true);
  });

  it('treats unranked projects as archive', () => {
    const { flagship, archive } = splitFlagshipProjects([{ title: 'Not in the priority map' }]);
    expect(flagship).toEqual([]);
    expect(archive).toHaveLength(1);
  });
});

describe('groupProjectsByOrigin', () => {
  const all = getPortfolioProjects();
  const { groups, playground } = groupProjectsByOrigin(all);

  it('keeps every project exactly once', () => {
    const grouped = [...groups.values()].flat().length + playground.length;
    expect(grouped).toBe(all.length);
  });

  it('pulls Playground episodes into one list, in episode order', () => {
    const episodes = playground.map((p) => getPlaygroundEpisode(p.title));
    expect(episodes.length).toBeGreaterThan(0);
    expect(episodes).toEqual(
      [...episodes].sort((a, b) => Number(a!.slice(3)) - Number(b!.slice(3))),
    );
  });

  it('files set assignments as coursework and free-topic builds as personal', () => {
    expect(
      getProjectOrigin({ title: 'Production-Grade ELT Pipeline', category: '', stack: [] }),
    ).toBe('coursework');
    expect(getProjectOrigin({ title: 'AI Meal Planner', category: '', stack: [] })).toBe(
      'personal',
    );
  });

  it('falls back to kaggle, then other, for unmapped titles', () => {
    expect(getProjectOrigin({ title: 'Kaggle New Comp', category: 'x', stack: [] })).toBe('kaggle');
    expect(getProjectOrigin({ title: 'Mystery', category: 'x', stack: [] })).toBe('other');
  });
});

describe('getPlaygroundEpisode', () => {
  it('reads the episode code and ignores other Kaggle titles', () => {
    expect(getPlaygroundEpisode('Kaggle S6E10 Predicting Airline Satisfaction')).toBe('S6E10');
    expect(getPlaygroundEpisode('Kaggle Orbit Wars')).toBeNull();
  });
});
