import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const SOURCE_PATH = new URL('../docs/04-github-profile-readme.md', import.meta.url);
const outputPath = process.env.PROFILE_README_OUTPUT || 'README.md';

async function syncProfileReadme() {
  const source = await readFile(SOURCE_PATH, 'utf8');
  await mkdir(dirname(outputPath), { recursive: true });
  await writeFile(outputPath, source.endsWith('\n') ? source : `${source}\n`, 'utf8');
}

await syncProfileReadme();
console.log(`Synced GitHub profile README to ${outputPath}`);
