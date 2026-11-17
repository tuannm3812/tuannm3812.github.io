import { describe, expect, it } from 'vitest';
import { selectedWork, splitKeyTerms } from './selectedWork';
import { PROJECT_CARDS } from './projectCards';

describe('splitKeyTerms', () => {
  it('splits [[key terms]] from plain text', () => {
    expect(splitKeyTerms('a [[b c]] d')).toEqual([
      { text: 'a ', key: false },
      { text: 'b c', key: true },
      { text: ' d', key: false },
    ]);
  });
});

describe('selectedWork copy rules', () => {
  it('keeps subtitles to 15 words and stacks to 3-4 chips', () => {
    for (const p of selectedWork) {
      expect(p.subtitle.split(/\s+/).length, p.id).toBeLessThanOrEqual(15);
      expect(p.stack.length, p.id).toBeGreaterThanOrEqual(3);
      expect(p.stack.length, p.id).toBeLessThanOrEqual(4);
    }
  });

  it('never names a client', () => {
    const text = JSON.stringify(selectedWork);
    expect(text).not.toMatch(/Synogize|HPC/i);
  });

  it('uses the same title as the project card', () => {
    const cardTitles = new Set(Object.values(PROJECT_CARDS).map((card) => card.title));
    for (const p of selectedWork) expect(cardTitles.has(p.title), p.title).toBe(true);
  });
});
