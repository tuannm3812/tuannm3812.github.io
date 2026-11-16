import { describe, expect, it } from 'vitest';
import { auditSource } from './ui-audit.mjs';

const rules = (text, file = 'src/pages/Home.tsx') => auditSource(text, file).map((f) => f.rule);

describe('ui-audit', () => {
  it('flags the styles the guideline retired', () => {
    expect(rules(`<div className="rounded-lg shadow-md bg-gradient-to-r backdrop-blur-xl" />`)).toEqual([
      'shadow',
      'gradient',
      'blur',
      'rounded',
    ]);
  });

  it('allows square corners, avatars and dots', () => {
    expect(rules(`<img className="rounded-full" /><div className="rounded-none" />`)).toEqual([]);
  });

  it('flags colour literals outside the token file, but not HTML entities', () => {
    expect(rules(`const c = '#0540f2';`)).toEqual(['literal-colour']);
    expect(rules(`const c = '#0540f2';`, 'src/index.css')).toEqual([]);
    expect(rules(`<text>+0.010 &#183; best</text>`)).toEqual([]);
  });

  it('flags a static firebase import outside the lazy routes', () => {
    const line = `import { getAuth } from 'firebase/auth';`;
    expect(rules(line, 'src/components/Layout.tsx')).toEqual(['static-firebase']);
    expect(rules(line, 'src/pages/Blog.tsx')).toEqual([]);
  });

  it('honours an explicit ignore marker', () => {
    expect(rules(`<div className="shadow-sm" /> {/* ui-audit-ignore: shadow */}`)).toEqual([]);
  });
});
