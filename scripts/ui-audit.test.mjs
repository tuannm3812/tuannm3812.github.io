import { describe, expect, it } from 'vitest';
import { auditSource } from './ui-audit.mjs';

const rules = (text, file = 'src/pages/Home.tsx') => auditSource(text, file).map((f) => f.rule);

describe('ui-audit', () => {
  it('flags a static firebase import outside the lazy routes', () => {
    const line = `import { getAuth } from 'firebase/auth';`;
    expect(rules(line, 'src/components/Layout.tsx')).toEqual(['static-firebase']);
    expect(rules(line, 'src/pages/Blog.tsx')).toEqual([]);
  });

  it('allows a dynamic import anywhere', () => {
    expect(rules(`const m = await import('firebase/auth');`, 'src/lib/firebaseHealth.ts')).toEqual([]);
  });

  it('honours an explicit ignore marker', () => {
    const line = `import { getAuth } from 'firebase/auth'; // ui-audit-ignore: static-firebase`;
    expect(rules(line, 'src/components/Layout.tsx')).toEqual([]);
  });
});
