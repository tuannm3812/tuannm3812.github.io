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
    stack: ['ExtraTrees', 'HistGradientBoosting', 'GroupKFold', 'EfficientNet-B0', 'PCA', 'Weighted R2'],
    points: [
      'Tuned a grouped-CV biomass regression workflow with metadata/color features, ExtraTrees and HistGradientBoosting sweeps, OOF blending, and weighted R2 diagnostics.',
      'Tested EfficientNet-B0 image embeddings, PCA-reduced embeddings, Ridge/log-Ridge variants, and validated biomass constraint post-processing before promotion.'
    ]
  },
  'kaggle-maze-crawler': {
    impact: 'Kaggle simulation agent with replay-driven BFS experiments',
    stack: ['Jump BFS', 'Wall Memory', 'Simulation/RL', 'Replay Analysis', 'Submission Packaging'],
    points: [
      'Built starter and jump-preferred BFS agents with wall memory, mirrored-wall handling, active replacement scouting, replay diagnostics, and generated main.py/submission.py workflows.',
      'Improved the public score from 217.0 to 1062.4, then documented scout and wall-memory ablations after a one-lifetime-scout variant regressed to 895.3.'
    ]
  },
  'kaggle-ROGII-Wellbore-Geology-Prediction': {
    impact: 'Kaggle wellbore TVT reconstruction with Beam/PF trajectory modeling',
    stack: ['Beam Search', 'Particle Filter', 'LightGBM', 'CatBoost', 'Numba', 'Masked Validation'],
    points: [
      'Developed a TVT reconstruction workflow with masked-tail validation, typewell GR alignment, feature-tree residuals, spatial formation imputation, and Beam/PF trajectory candidates.',
      'Moved public score from 15.883 to 15.049 with typewell alignment, then to 9.941 using Beam/PF reconstruction, LightGBM/CatBoost blending, and smoothing.'
    ]
  },
  'kaggle-neurogolf-2026': {
    impact: 'Kaggle NeuroGolf 2026 ARC-style solver and ONNX submission workflow',
    stack: ['ONNX', 'ARC Solvers', 'Connected Components', 'Rule Diagnostics', 'Submission Archive'],
    points: [
      'Built a structured solver workflow across 400 ARC-style tasks with EDA, shape/palette diagnostics, connected-component routing, and simple same-shape/shape-changing solver buckets.',
      'Validated a complete ONNX submission pipeline with one model per task, input-equality selectors for multi-test tasks, fallback archives, and first input-derived solver exports.'
    ]
  },
  'kaggle-s6e4-predict-irrigation-need': {
    impact: 'Kaggle Playground S6E4 irrigation-need prediction workflow',
    stack: ['CatBoost', 'Stratified CV', 'Macro F1', 'Feature Interactions', 'Class Weighting', 'EDA Diagnostics'],
    points: [
      'Compared dummy, logistic regression, random forest, histogram gradient boosting, and CatBoost baselines, then selected CatBoost using holdout and stratified CV macro F1.',
      'Ran CatBoost tuning with agronomic interaction features, threshold features, class-weight experiments, feature importance review, and reusable submission validation.'
    ]
  },
  'kaggle-s6e5-predict-f1-pit-stops': {
    impact: 'Kaggle F1 pit-stop prediction with model diagnostics',
    stack: ['LightGBM', 'XGBoost', 'CatBoost', 'Stratified CV', 'Calibration', 'Feature Engineering'],
    points: [
      'Engineered race, stint, tyre-life, race-progress, lap-time, and ratio features, then benchmarked logistic, tree, LightGBM, XGBoost, and CatBoost models with stratified CV.',
      'Promoted tuned LightGBM after feature-set validation, XGBoost/CatBoost blend checks, calibration diagnostics, top-slice precision analysis, and race-level error review.'
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
