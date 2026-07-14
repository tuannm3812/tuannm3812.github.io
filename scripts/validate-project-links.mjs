import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

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

  // Check database files mapping
  if (dbProjectFiles.length > 0) {
    const dbProjectTitles = dbProjectFiles.map(f => {
      // sanitize filename logic back to possible title is tricky,
      // so we just read each markdown file first heading: "# Project: <Title>"
      return f;
    });

    console.log(`📂 Database projects catalog: ${dbProjectFiles.length} files found.`);
  }

  console.log(`\n✅ Validation completed: ${errors} Errors, ${warnings} Warnings.`);
  if (errors > 0) {
    process.exit(1);
  }
}

validate().catch(err => {
  console.error('❌ Validation script failed:', err);
  process.exit(1);
});
