import { describe, expect, it } from 'vitest';
import { selectedWork } from '../data/selectedWork';
import { PROJECT_CARDS } from '../data/projectCards';
import { getProjectPoster } from './projectVisuals';

describe('getProjectPoster', () => {
  it('finds the poster for every Home gallery project from its source title', () => {
    for (const work of selectedWork) {
      const source = Object.keys(PROJECT_CARDS).find((t) => PROJECT_CARDS[t].title === work.title);
      expect(source, work.title).toBeDefined();
      expect(getProjectPoster({ title: source! }), work.title).toBe(work.thumb);
    }
  });
});
