import { describe, expect, it } from 'vitest';
import { projectPriority } from '../data/projectPriority';
import { FLAGSHIP_STARS, getPortfolioProjects, splitFlagshipProjects } from './projects';

describe('splitFlagshipProjects', () => {
  it('puts every 3-star project first, in rank order', () => {
    const { flagship } = splitFlagshipProjects(getPortfolioProjects());
    const expected = Object.entries(projectPriority)
      .filter(([, rank]) => rank.stars >= FLAGSHIP_STARS)
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
