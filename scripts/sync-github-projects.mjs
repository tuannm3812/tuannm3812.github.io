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
    .replace(/\bRogii\b/g, 'ROGII')
    .replace(/\bNeurogolf\b/g, 'NeuroGolf')
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
    stack: ['PySpark', 'Databricks', 'Delta Lake', 'Lakehouse Analytics'],
    points: [
      'Built a Databricks lakehouse workflow for NYC green and yellow taxi trip analytics across ingestion, transformation, and business insight layers.',
      'Applied PySpark, Delta Lake processing, scalable notebook workflows, trip-level feature preparation, and lakehouse analytics documentation.'
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
    stack: ['ExtraTrees', 'HistGradientBoosting', 'GroupKFold', 'EfficientNet-B0', 'PCA', 'Constraint Checks'],
    points: [
      'Built a CSIRO Image2Biomass competition workflow for pasture biomass prediction using image metadata, color features, and submission-ready post-processing.',
      'Applied grouped validation, ExtraTrees and HistGradientBoosting sweeps, OOF blending, EfficientNet-B0 embedding probes, PCA experiments, and biomass constraint checks.'
    ]
  },
  'kaggle-maze-crawler': {
    impact: 'Kaggle simulation agent with replay-driven BFS experiments',
    stack: ['Jump BFS', 'Wall Memory', 'Danger Gating', 'Simulation/RL', 'Replay Analysis'],
    points: [
      'Built a Kaggle Maze Crawler workflow for turn-based maze navigation, simulation review, agent iteration, and Kaggle-safe submission generation.',
      'Applied jump-preferred BFS, known-wall memory, mirrored-wall inference, active scout replacement, south-bound danger gating, and replay diagnostics.'
    ]
  },
  'kaggle-ROGII-Wellbore-Geology-Prediction': {
    impact: 'Kaggle wellbore TVT reconstruction with Beam/PF trajectory modeling',
    stack: ['Beam Search', 'Particle Filter', 'LightGBM', 'CatBoost', 'Artifact Replay', 'Masked Validation'],
    points: [
      'Built a ROGII Wellbore Geology workflow for reconstructing hidden TVT trajectories from horizontal wells, paired typewells, and gamma-ray log signals.',
      'Applied held-out-well masked-tail validation, typewell GR alignment, feature-tree residuals, spatial formation imputation, Beam/PF trajectory candidates, and artifact replay.'
    ]
  },
  'kaggle-neurogolf-2026': {
    impact: 'Kaggle NeuroGolf 2026 ARC-style solver and ONNX submission workflow',
    stack: ['ONNX', 'ARC Solvers', 'Connected Components', 'One-Hot Tensors', 'Rule Diagnostics'],
    points: [
      'Built a NeuroGolf 2026 workflow for ARC-style grid reasoning, task profiling, solver routing, and ONNX submission packaging.',
      'Applied shape and palette diagnostics, connected-component analysis, same-shape and shape-changing solver queues, static one-hot tensors, and solved-task manifests.'
    ]
  },
  'kaggle-s6e4-predict-irrigation-need': {
    impact: 'Kaggle Playground S6E4 irrigation-need prediction workflow',
    stack: ['CatBoost', 'Stratified CV', 'Model Diagnostics', 'Feature Interactions', 'Class Weighting', 'EDA Diagnostics'],
    points: [
      'Built a Kaggle Playground irrigation-need prediction workflow for classifying crop water demand from agronomic and weather-style tabular features.',
      'Applied CatBoost tuning, stratified validation, agronomic interaction features, threshold features, class-weight experiments, feature importance review, and reusable submission validation.'
    ]
  },
  'kaggle-s6e5-predict-f1-pit-stops': {
    impact: 'Kaggle F1 pit-stop prediction with model diagnostics',
    stack: ['LightGBM', 'XGBoost', 'CatBoost', 'Stratified CV', 'Calibration', 'Feature Engineering'],
    points: [
      'Built a Kaggle F1 pit-stop prediction workflow for estimating next-lap pit probability from race, stint, tyre, lap-time, and position context.',
      'Applied race-context feature engineering, stratified validation, LightGBM tuning, XGBoost and CatBoost challenger checks, calibration diagnostics, and race-level error review.'
    ]
  },
  'ScriptClean-AI': {
    impact: 'Transcript-to-study-guide app powered by Gemini',
    stack: ['React', 'TypeScript', 'Gemini API', 'Transcript Processing', 'Rich Text Export'],
    points: [
      'Built a transcript-to-study-guide app for converting raw YouTube lecture transcripts into structured study notes and learning materials.',
      'Applied React, TypeScript, Tailwind, Gemini prompting, speaker structure, topic headers, bilingual vocabulary support, and rich-text export for Docs or Word workflows.'
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
    stack: ['Snowflake', 'API Ingestion', 'SQL Analytics', 'Data Modeling'],
    points: [
      'Built a Snowflake analytics workflow for ingesting, cleaning, and analyzing multi-country YouTube Trending data.',
      'Applied API ingestion, SQL-based data modeling, repeatable trend analysis, country-level comparisons, and warehouse-ready documentation.'
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
    stack: copy?.stack || (stack.length ? stack : ['GitHub', 'Project']),
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
