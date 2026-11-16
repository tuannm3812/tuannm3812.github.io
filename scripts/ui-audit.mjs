// Mechanical checks for the design guideline (docs/12-design-guideline.md).
// Each rule here is one that review comments kept repeating; see docs/14.
import { readdir, readFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

const SRC = 'src';
const TOKENS_FILE = join(SRC, 'index.css');

// Class names are matched as whole tokens inside className strings and @apply.
export const RULES = [
  {
    id: 'literal-colour',
    message: 'colour literal outside src/index.css tokens',
    test: (line, file) =>
      file !== TOKENS_FILE &&
      /((?<![&\w])#[0-9a-fA-F]{3,8}\b|rgba?\()/.test(line) &&
      !/^\s*(\/\/|\*)/.test(line),
  },
  {
    id: 'shadow',
    message: 'drop shadows are not part of the Swiss look',
    test: (line) => /(^|[\s'"`:])(dark:|hover:|group-hover:)*shadow(-[\w/[\].-]+)?(?=[\s'"`]|$)/.test(line),
  },
  {
    id: 'gradient',
    message: 'gradients are not part of the Swiss look',
    test: (line) => /(bg-gradient-|bg-\[linear-gradient|bg-\[radial-gradient|radial-gradient\(|linear-gradient\()/.test(line),
  },
  {
    id: 'blur',
    message: 'blur and glass effects are not part of the Swiss look',
    test: (line) => /(^|[\s'"`:])(backdrop-blur|blur)(-[\w[\].-]+)?(?=[\s'"`]|$)/.test(line),
  },
  {
    id: 'rounded',
    message: 'corners are square; only rounded-none and rounded-full (avatars, dots) are allowed',
    test: (line) =>
      /(^|[\s'"`:])rounded(-(?!none\b|full\b)[\w[\].-]+)?(?=[\s'"`]|$)/.test(line),
  },
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
