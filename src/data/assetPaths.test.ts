import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

// Every local '/assets/...' path named in src/data or src/lib must exist under public/, so a
// typo in a poster or thumbnail path fails `npm run check` instead of the live site.
describe('local asset paths in src/data and src/lib', () => {
  const paths = new Set<string>();
  const files = ['src/data', 'src/lib'].flatMap((d) =>
    readdirSync(join(process.cwd(), d))
      .filter((f) => f.endsWith('.ts') && !f.includes('.test.'))
      .map((f) => join(process.cwd(), d, f)),
  );
  for (const f of files) {
    for (const m of readFileSync(f, 'utf8').matchAll(/['"`](\/assets\/[^'"`?#\s]+)/g)) {
      if (!m[1].includes('${')) paths.add(m[1]);
    }
  }

  it('finds some paths to check', () => {
    expect(paths.size).toBeGreaterThan(0);
  });

  it.each([...paths])('%s exists in public/', (p) => {
    expect(existsSync(join(process.cwd(), 'public', p))).toBe(true);
  });
});
