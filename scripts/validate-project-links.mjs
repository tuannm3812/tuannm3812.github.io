import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';
import {
  FALLBACK_POINT_DEMO,
  FALLBACK_POINT_NO_DEMO,
  FALLBACK_STACK,
} from './sync-github-projects.mjs';

const RESUME_PATH = './src/data/resume.ts';
const GITHUB_PROJECTS_PATH = './src/data/githubProjects.ts';
const PRIORITY_PATH = './src/data/projectPriority.ts';
const DATABASE_PROJECTS_DIR = './docs/database/projects';

async function validate() {
  console.log('🔍 Running project link and data integrity validations...\n');
  let errors = 0;
  let warnings = 0;

  // 1. Read files
  let resumeContent = '';
  let githubContent = '';
  let priorityContent = '';
  let dbProjectFiles = [];

  try {
    resumeContent = await readFile(RESUME_PATH, 'utf-8');
  } catch (e) {
    console.error(`❌ Could not read ${RESUME_PATH}:`, e.message);
    errors++;
  }

  try {
    githubContent = await readFile(GITHUB_PROJECTS_PATH, 'utf-8');
  } catch (e) {
    console.error(`❌ Could not read ${GITHUB_PROJECTS_PATH}:`, e.message);
    errors++;
  }

  try {
    priorityContent = await readFile(PRIORITY_PATH, 'utf-8');
  } catch (e) {
    console.error(`❌ Could not read ${PRIORITY_PATH}:`, e.message);
    errors++;
  }

  try {
    const files = await readdir(DATABASE_PROJECTS_DIR);
    dbProjectFiles = files.filter(f => f.endsWith('.md'));
  } catch (e) {
    console.warn(`⚠️ Could not read database projects dir ${DATABASE_PROJECTS_DIR}:`, e.message);
    warnings++;
  }

  if (errors > 0) {
    process.exit(1);
  }

  // 2. Extract project titles and github links from resume.ts
  const projectsBlockMatch = resumeContent.match(/projects:\s*\[([\s\S]*?)\]\s*,\s*reflections:/);
  const projectsBlock = projectsBlockMatch ? projectsBlockMatch[1] : '';

  const resumeProjects = [];
  const resumeProjRegex = /title:\s*['"]([^'"]+)['"]/g;
  let match;
  while ((match = resumeProjRegex.exec(projectsBlock)) !== null) {
    resumeProjects.push(match[1]);
  }

  const githubProjectsList = [];
  const githubProjRegex = /title:\s*['"]([^'"]+)['"]/g;
  while ((match = githubProjRegex.exec(githubContent)) !== null) {
    githubProjectsList.push(match[1]);
  }

  // Get list of priority entries (can be quoted or unquoted)
  const priorityEntries = new Set();
  const priorityRegex = /(?:['"]([^'"]+)['"]|(\w+)):\s*\{\s*score/g;
  while ((match = priorityRegex.exec(priorityContent)) !== null) {
    const key = match[1] || match[2];
    priorityEntries.add(key);
  }

  console.log(`📊 Curated Resume Projects found: ${resumeProjects.length}`);
  console.log(`📊 Synced GitHub Projects found: ${githubProjectsList.length}`);
  console.log(`📊 Priority Config Entries found: ${priorityEntries.size}\n`);

  // Check priorities
  const allProjects = [...new Set([...resumeProjects, ...githubProjectsList])];
  for (const title of allProjects) {
    if (!priorityEntries.has(title)) {
      console.warn(`⚠️ Warning: Project "${title}" does not have a priority score in projectPriority.ts.`);
      console.warn(`   It will default to score 0 and sort to the bottom.`);
      warnings++;
    }
  }

  // Check for placeholder copy in the generated cards.
  //
  // The sync script already refuses to finish when it generates placeholder
  // copy, but it writes the file *before* exiting so the diff stays reviewable.
  // That leaves the bad card sitting in the working tree, where a `git add -A`
  // would commit it and this gate — the documented pre-commit check — used to
  // pass. So check the written file too, not just the moment it is generated.
  //
  // Detection leans on one fact: a card either has a PROJECT_COPY_OVERRIDES
  // entry or it does not. Without one, `points[1]` is always one of the two
  // fallback bullets, so that marker alone catches every unwritten card. The
  // stack and impact markers are checked as well, purely to say more about what
  // is wrong. Constants are imported from the sync script so the two cannot
  // drift apart.
  const fallbackStackLiteral = `stack: [${FALLBACK_STACK.map((s) => `'${s}'`).join(', ')}]`;
  const cardChunks = githubContent.split(/(?=\n\s*title:)/).slice(1);

  for (const chunk of cardChunks) {
    const title = chunk.match(/title:\s*['"]([^'"]+)['"]/)?.[1] ?? '(unknown card)';
    const reasons = [];

    if (chunk.includes(FALLBACK_POINT_DEMO) || chunk.includes(FALLBACK_POINT_NO_DEMO)) {
      reasons.push('fallback points[1] - no PROJECT_COPY_OVERRIDES entry');
    }
    if (chunk.includes(fallbackStackLiteral)) {
      reasons.push(`fallback ${fallbackStackLiteral}`);
    }
    if (/impact:\s*(?:\n\s*)?['"]Public .+ project from GitHub['"]/.test(chunk)) {
      reasons.push('fallback impact - repo has no description');
    }

    if (reasons.length > 0) {
      console.error(`\u274c Error: Project "${title}" still carries placeholder copy:`);
      for (const reason of reasons) {
        console.error(`   - ${reason}`);
      }
      console.error(
        '   Add a PROJECT_COPY_OVERRIDES entry in scripts/sync-github-projects.mjs,'
      );
      console.error('   then re-run `npm run sync:github-projects`.');
      errors++;
    }
  }

  // Check database files mapping
  if (dbProjectFiles.length > 0) {
    const dbProjectTitles = dbProjectFiles.map(f => {
      // sanitize filename logic back to possible title is tricky,
      // so we just read each markdown file first heading: "# Project: <Title>"
      return f;
    });

    console.log(`📂 Database projects catalog: ${dbProjectFiles.length} files found.`);
  }

  // A run that reports errors must not print a green check: this gate now
  // blocks commits, so its verdict line has to match its exit code.
  const verdict = errors > 0 ? '❌' : '✅';
  console.log(`\n${verdict} Validation completed: ${errors} Errors, ${warnings} Warnings.`);
  if (errors > 0) {
    process.exit(1);
  }
}

validate().catch(err => {
  console.error('❌ Validation script failed:', err);
  process.exit(1);
});
