# Portfolio Project Update Guide

Use this guide when translating GitHub repository progress into portfolio cards.
The goal is consistency: every card should show the actual engineering,
modeling, validation, and product signal behind the work, not the repository's
detected language.

## Source Of Truth

Prefer evidence in this order:

1. Repository `README.md`
2. Repository `docs/` files, especially result summaries and instructions
3. Notebook headings, imports, model definitions, validation design, and submission cells
4. GitHub repository description and metadata

Do not use GitHub language labels such as `Jupyter Notebook` as the portfolio
stack unless the notebook environment itself is the point of the project.

## Portfolio Card Shape

Each project card should have:

- `title`: readable project name, with acronyms corrected
- `category`: one of the portfolio categories already used by the site
- `github`: public repository URL
- `impact`: one short sentence naming the project outcome or workflow
- `stack`: 4-6 high-signal techniques, libraries, model families, or systems
- `points`: two bullets, each focused on a clear portfolio signal

For Kaggle cards, the two bullets should usually follow this pattern:

1. Overview: what the project is, the domain/problem, and the workflow outcome.
2. Techniques: the model families, algorithms, validation design, diagnostics,
   tooling, or skill sets applied.

## Stack Rules

Good stack labels:

- `LightGBM`
- `CatBoost`
- `GroupKFold`
- `Beam Search`
- `Particle Filter`
- `ONNX`
- `One-Hot Tensors`
- `Jump BFS`
- `Calibration`
- `Replay Analysis`
- `Artifact Replay`
- `Feature Engineering`
- `Model Diagnostics`

Weak stack labels:

- `Jupyter Notebook`
- `Python`
- `Kaggle`
- `Data Science`
- `Machine Learning`
- leaderboard metrics such as `Weighted R2`, `Macro F1`, `RMSE`, or `Public Score`

Generic labels are acceptable only when paired with more specific techniques.

## Copy Rules

Write cards as compact evidence, not sales copy.

- Lead with the project domain, problem, or workflow.
- Use the second bullet for techniques and skill sets.
- Avoid leaderboard metrics and validation scores in portfolio cards by default.
- Keep detailed scores, metric tables, and ablation history in repository
  READMEs or docs where technical readers can inspect the context.
- Mention negative results when they show judgment.
- Do not overclaim private leaderboard performance or imply a competition rank
  unless it is verified and important to the role narrative.
- Keep each bullet short enough to scan inside a project card.

## Sync Script Rules

Generated GitHub project cards live in:

```text
src/data/githubProjects.ts
```

Future sync behavior is controlled by:

```text
scripts/sync-github-projects.mjs
```

When adding or improving a generated GitHub card:

1. Add or update the entry in `PROJECT_COPY_OVERRIDES`.
2. Include `impact`, `stack`, and `points`.
3. Update `src/data/githubProjects.ts` to match the override.
4. Add title normalization in `toTitle()` when acronyms need correction.
5. Add ranking in `src/pages/Projects.tsx` for high-signal projects.
6. Update homepage project count in `src/data/resume.ts` if the visible project
   count changes.

## Current Kaggle Portfolio Pattern

Use these examples as style anchors:

### Maze Crawler

- Stack signal: `Jump BFS`, `Wall Memory`, `Danger Gating`, `Replay Analysis`
- Overview signal: turn-based maze-navigation agent workflow with replay review
  and Kaggle-safe submission generation
- Technique signal: graph search, map memory, scout-policy experiments, danger
  gating, and replay diagnostics

### ROGII Wellbore Geology Prediction

- Stack signal: `Beam Search`, `Particle Filter`, `LightGBM`, `CatBoost`,
  `Artifact Replay`, `Masked Validation`
- Overview signal: geoscience workflow for reconstructing hidden wellbore `TVT`
  trajectories from horizontal wells and paired typewells
- Technique signal: masked-tail validation, typewell alignment, trajectory
  candidates, gradient boosting, ensembling, and artifact replay

### NeuroGolf 2026

- Stack signal: `ONNX`, `ARC Solvers`, `Connected Components`,
  `One-Hot Tensors`, `Rule Diagnostics`
- Overview signal: ARC-style grid-reasoning solver workflow with task profiling
  and ONNX submission packaging
- Technique signal: shape/palette diagnostics, connected-component routing,
  scorer-compatible one-hot tensors, and solved-task manifests

## Update Checklist

Before committing:

1. Run `git diff --check`.
2. Search for stale `Jupyter Notebook` stack labels in generated cards.
3. Confirm new project titles appear in `projectPriority` when needed.
4. Confirm portfolio cards avoid confusing score/metric language unless there is
   a deliberate reason to include it.
5. Push and check the GitHub Pages deploy result.

If local Node/npm is unavailable, note that local build checks were skipped and
use the GitHub Pages workflow result as the deployment verification.
