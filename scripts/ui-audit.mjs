// Mechanical checks that hold whatever the visual style (docs/14).
// The Swiss-index style rules (no shadow, gradient, blur, rounded corners,
// colour literals) were removed on 2026-11-17 when Mike chose to keep his
// original look; add a rule here only when review keeps repeating it.
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const SRC = 'src';

// Class names are matched as whole tokens inside className strings and @apply.
export const RULES = [
  {
    id: 'static-firebase',
    message: 'static firebase import puts the SDK back on the critical path',
    test: (line, file) =>
      /^\s*import\s[^;]*from\s+['"]firebase\//.test(line) &&
      // Blog and Contact are lazy routes, so their imports stay off first paint.
      !/src[\\/](lib[\\/](firebase|reliability)|hooks[\\/]useBlogComments|pages[\\/](Blog|Contact)\.tsx)/.test(file),
  },
];

// Lines that may break a rule on purpose carry `ui-audit-ignore: <rule-id>`.
export function auditSource(text, file) {
  const findings = [];
  text.split('\n').forEach((line, index) => {
    for (const rule of RULES) {
      if (line.includes(`ui-audit-ignore: ${rule.id}`)) continue;
      if (rule.test(line, file)) {
        findings.push({ file, line: index + 1, rule: rule.id, message: rule.message });
      }
    }
  });
  return findings;
}

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(path)));
    else if (/\.(tsx?|css)$/.test(entry.name) && !/\.test\.tsx?$/.test(entry.name)) out.push(path);
  }
  return out;
}

async function main() {
  const files = await walk(SRC);
  const findings = [];
  for (const file of files) {
    findings.push(...auditSource(await readFile(file, 'utf8'), file));
  }
  if (findings.length === 0) {
    console.log(`ui-audit: ${files.length} files, 0 findings`);
    return;
  }
  for (const f of findings) {
    console.error(`${relative('.', f.file)}:${f.line}  ${f.rule}  ${f.message}`);
  }
  console.error(`ui-audit: ${findings.length} finding(s)`);
  process.exitCode = 1;
}

if (import.meta.url === `file://${process.argv[1]}`) main();
