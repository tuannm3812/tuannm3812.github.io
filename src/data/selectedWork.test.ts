import { describe, expect, it } from 'vitest';
import { selectedWork, splitKeyTerms } from './selectedWork';
import { PROJECT_CARDS } from './projectCards';
import { resumeData } from './resume';

// Client and sponsor names that must not appear in public copy (docs/12, Public content).
const BANNED = /\b(LEGO|Caterpillar|WesTrac|Austroads|Synogize|HPC)\b/i;

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
  it('keeps subtitles to 15 words', () => {
    for (const p of selectedWork) {
      expect(p.subtitle.split(/\s+/).length, p.id).toBeLessThanOrEqual(15);
    }
  });

  it('uses exactly the tags of the project card', () => {
    const cards = Object.values(PROJECT_CARDS);
    for (const p of selectedWork) {
      const card = cards.find((c) => c.title === p.title);
      expect(p.stack, p.id).toEqual(card?.tags);
    }
  });

  it('never names a client or sponsor, in the gallery or the resume data', () => {
    expect(JSON.stringify(selectedWork)).not.toMatch(BANNED);
    expect(JSON.stringify(resumeData)).not.toMatch(BANNED);
  });

  it('keeps the phone number out of the public bundle', () => {
    expect(JSON.stringify(resumeData)).not.toMatch(/\+61|\b04\d{2}\s?\d{3}\s?\d{3}\b/);
  });

  it('uses the same title as the project card', () => {
    const cardTitles = new Set(Object.values(PROJECT_CARDS).map((card) => card.title));
    for (const p of selectedWork) expect(cardTitles.has(p.title), p.title).toBe(true);
  });
});
