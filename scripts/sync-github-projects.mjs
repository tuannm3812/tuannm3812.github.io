import { readFile, writeFile } from 'node:fs/promises';

const GITHUB_USER = process.env.GITHUB_USER || 'tuannm3812';
const TOKEN = process.env.GITHUB_TOKEN;
const OUTPUT_PATH = new URL('../src/data/githubProjects.ts', import.meta.url);
const RESUME_PATH = new URL('../src/data/resume.ts', import.meta.url);
const IGNORED_REPOS = new Set(
  (process.env.GITHUB_PROJECT_IGNORE || '')
    .split(',')
    .map((name) => name.trim())
    .filter(Boolean)
);

async function fetchRepos(page = 1, repos = []) {
  const response = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&page=${page}&sort=updated&type=owner`,
    {
      headers: {
        Accept: 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        ...(TOKEN ? { Authorization: `Bearer ${TOKEN}` } : {})
      }
    }
  );

  if (!response.ok) {
    throw new Error(`GitHub API request failed: ${response.status} ${response.statusText}`);
  }

  const pageRepos = await response.json();
  const nextRepos = [...repos, ...pageRepos];
  return pageRepos.length === 100 ? fetchRepos(page + 1, nextRepos) : nextRepos;
}

function getCuratedGithubLinks(resumeSource) {
  return new Set(
    [...resumeSource.matchAll(new RegExp(`https://github\\.com/${GITHUB_USER}/[^"',\\s]+`, 'g'))].map(
      ([url]) => url.replace(/\/$/, '')
    )
  );
}

function toTitle(name) {
  return name
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
    .replace(/\bAi\b/g, 'AI')
    .replace(/\bNlp\b/g, 'NLP')
    .replace(/\bElt\b/g, 'ELT')
    .replace(/\bCsiro\b/g, 'CSIRO')
    .replace(/\bS6e4\b/g, 'S6E4')
    .replace(/\bS6e5\b/g, 'S6E5')
    .replace(/\bF1\b/g, 'F1')
    .replace(/\bFaostat\b/g, 'FAOSTAT');
}

function inferCategory(repo) {
  const text = `${repo.name} ${repo.description || ''}`.toLowerCase();

  if (/kaggle|playground|competition|catboost|lightgbm|biomass|irrigation|pit-stop|pit stop/.test(text)) {
    return 'Machine Learning & Kaggle';
  }

  if (/(bird|vision|image|caption|computer vision|deep learning|pytorch|cnn|lstm)/.test(text)) {
    return 'Deep Learning & Computer Vision';
  }

  if (/(solana|forecast|price|time-series|time series|mlops|fastapi)/.test(text)) {
    return 'Time-Series & MLOps';
  }

  if (/(nlp|text|sql|agent|llm|generative|prompt|transformer|token|transcript)/.test(text)) {
    return 'NLP & Generative AI';
  }

  if (/(elt|warehouse|airflow|dbt|dashboard|analytics|faostat|data|pipeline)/.test(text)) {
    return 'Data Engineering & Analytics';
  }

  return 'Applied AI Products';
}

function inferStack(repo) {
  const text = `${repo.name} ${repo.description || ''} ${repo.homepage || ''}`.toLowerCase();
  const stack = [];

  if (/pyspark|spark/.test(text)) stack.push('PySpark');
  if (/databricks/.test(text)) stack.push('Databricks');
  if (/delta lake|delta/.test(text)) stack.push('Delta Lake');
  if (/snowflake/.test(text)) stack.push('Snowflake');
  if (/streamlit/.test(text)) stack.push('Streamlit');
  if (/fastapi/.test(text)) stack.push('FastAPI');
  if (/react|vite/.test(text)) stack.push('React');
  if (/typescript/.test(text)) stack.push('TypeScript');
  if (/tailwind/.test(text)) stack.push('Tailwind CSS');
  if (/scikit-learn|sklearn/.test(text)) stack.push('Scikit-learn');
  if (/catboost/.test(text)) stack.push('CatBoost');
  if (/lightgbm/.test(text)) stack.push('LightGBM');
  if (/joblib/.test(text)) stack.push('joblib');
  if (/pytorch|torch/.test(text)) stack.push('PyTorch');
  if (/keras|jax/.test(text)) stack.push('Keras/JAX');
  if (/airflow/.test(text)) stack.push('Airflow');
  if (/dbt/.test(text)) stack.push('dbt');
  if (/bigquery|gcp|google cloud/.test(text)) stack.push('GCP');
  if (/api/.test(text)) stack.push('API');
  if (/plotly/.test(text)) stack.push('Plotly');
  if (/llm|agent|gemini|prompt/.test(text)) stack.push('LLMs');
  if (/gemini/.test(text)) stack.push('Gemini API');
  if (/nlp|text|token|transformer/.test(text)) stack.push('NLP');
  if (repo.language) stack.push(repo.language);

  return [...new Set(stack)].slice(0, 6);
}

function getDemoUrl(repo) {
  const homepage = repo.homepage?.trim();
  if (!homepage) return undefined;
  return /^https?:\/\//.test(homepage) ? homepage : `https://${homepage}`;
}

const PROJECT_COPY_OVERRIDES = {
  'NYC-Taxi-Databricks': {
    impact: 'Databricks lakehouse analytics for NYC taxi trips',
    points: [
      'Built a Databricks lakehouse workflow with PySpark and Delta Lake for NYC green and yellow taxi trip analytics.',
      'Preparing refreshed notebooks and outputs to document ingestion, transformation, and scalable trip analysis patterns.'
    ]
  },
  'Deep-Learning-Group-10': {
    impact: 'Deep learning notebook workspace for group experimentation',
    points: [
      'Maintained a Jupyter-based deep learning project workspace for collaborative model experimentation and analysis.',
      'Kept as supporting academic evidence while higher-signal portfolio cards focus on documented, reproducible repos.'
    ]
  },
  'kaggle-csiro-image2biomass': {
    impact: 'Active Kaggle workflow for pasture biomass prediction',
    points: [
      'Built an active CSIRO Image2Biomass Kaggle workflow with EDA, grouped validation, tabular/color baselines, embedding experiments, and model tuning.',
      'Added biomass constraint checks and a decision-support product concept for submission-ready pasture biomass prediction.'
    ]
  },
  'kaggle-maze-crawler': {
    impact: 'Small Kaggle notebook project for maze-navigation experimentation',
    points: [
      'Maintained a compact Kaggle notebook project for maze-crawler experimentation and iterative problem solving.',
      'Kept as a lightweight supporting signal for competition practice and notebook-based exploration.'
    ]
  },
  'kaggle-s6e4-predict-irrigation-need': {
    impact: 'Kaggle Playground S6E4 irrigation-need prediction workflow',
    points: [
      'Built a Kaggle Playground S6E4 workflow for predicting irrigation need with EDA, CatBoost baselines, tuning, and reusable submission steps.',
      'Packaged the notebook process around repeatable feature review, model comparison, and competition-ready prediction outputs.'
    ]
  },
  'kaggle-s6e5-predict-f1-pit-stops': {
    impact: 'Kaggle F1 pit-stop prediction with model diagnostics',
    points: [
      'Built a Kaggle F1 pit-stop prediction workflow with EDA, feature engineering, LightGBM tuning, and model diagnostics.',
      'Structured the project as a reusable competition notebook for analysing race-context features and submission-ready predictions.'
    ]
  },
  'ScriptClean-AI': {
    impact: 'Transcript-to-study-guide app powered by Gemini',
    points: [
      'Built a React, TypeScript, Tailwind, and Gemini app that converts raw YouTube transcripts into high-fidelity study guides and lecture notes.',
      'Added speaker structure, topic headers, bilingual vocabulary support, and formatted rich-text export for Google Docs or Microsoft Word workflows.'
    ]
  },
  'sydney-rainfall-forecasting': {
    impact: 'Live Streamlit dashboard for Sydney rainfall forecasts',
    points: [
      'Built a rainfall forecasting app with Open-Meteo data, scikit-learn models, and joblib artifacts.',
      'Includes a live project link from the repository homepage metadata.'
    ]
  },
  'youtube-trending-snowflake-lakehouse': {
    impact: 'Snowflake pipeline for multi-country YouTube trends',
    points: [
      'Built a Snowflake analytics workflow for ingesting, cleaning, and analyzing multi-country YouTube Trending data.',
      'Preparing updated outputs to document repeatable trend analysis across country-level media datasets.'
    ]
  }
};

function buildProject(repo) {
  const stack = inferStack(repo);
  const description = repo.description?.trim();
  const demo = getDemoUrl(repo);
  const copy = PROJECT_COPY_OVERRIDES[repo.name];

  return {
    title: toTitle(repo.name),
    category: inferCategory(repo),
    github: repo.html_url,
    ...(demo ? { demo } : {}),
    impact: copy?.impact || description || `Public ${repo.language || 'technical'} project from GitHub`,
    stack: stack.length ? stack : ['GitHub', 'Project'],
    points:
      copy?.points || [
        description
          ? description.replace(/\s+/g, ' ')
          : `Public repository for ${toTitle(repo.name)}, maintained on GitHub.`,
        demo
          ? 'Includes a live project link from the repository homepage metadata.'
          : 'Maintained as a public GitHub project and ready for deeper portfolio documentation.'
      ]
  };
}

function serializeProjects(projects) {
  return `import type { Project } from './resume';

// Auto-generated by scripts/sync-github-projects.mjs.
// Curated projects in resume.ts take priority when GitHub URLs overlap.
export const githubProjects: Project[] = ${JSON.stringify(projects, null, 2)};
`;
}

const resumeSource = await readFile(RESUME_PATH, 'utf8');
const curatedGithubLinks = getCuratedGithubLinks(resumeSource);
const repos = await fetchRepos();

const projects = repos
  .filter((repo) => !repo.private)
  .filter((repo) => !repo.fork)
  .filter((repo) => !repo.archived)
  .filter((repo) => !repo.disabled)
  .filter((repo) => repo.size > 0)
  .filter((repo) => repo.name.toLowerCase() !== GITHUB_USER.toLowerCase())
  .filter((repo) => !IGNORED_REPOS.has(repo.name))
  .filter((repo) => !curatedGithubLinks.has(repo.html_url.replace(/\/$/, '')))
  .map(buildProject)
  .sort((a, b) => a.title.localeCompare(b.title));

await writeFile(OUTPUT_PATH, serializeProjects(projects), 'utf8');
console.log(`Synced ${projects.length} generated GitHub project(s).`);
