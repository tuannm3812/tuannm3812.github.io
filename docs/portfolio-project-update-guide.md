# Portfolio Project Update Guide

Use this guide when translating GitHub repository progress into portfolio cards.
The goal is consistency: every card should show the actual engineering,
modeling, validation, and product signal behind the work, not the repository's
detected language.

## Source Of Truth

Prefer evidence in this order:

1. Repository `README.md`
2. Repository `docs/` files, especially result summaries and instructions
3. Notebook headings, imports, model definitions, metrics, and submission cells
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
- `points`: two bullets, each focused on evidence

For Kaggle cards, the two bullets should usually follow this pattern:

1. What was built: validation design, model family, solver, feature engineering,
   submission workflow, or artifact workflow.
2. What improved or was learned: score movement, selected model, failed
   experiment, diagnostic lesson, or next controlled experiment.

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

Weak stack labels:

- `Jupyter Notebook`
- `Python`
- `Kaggle`
- `Data Science`
- `Machine Learning`

Generic labels are acceptable only when paired with more specific techniques.

## Copy Rules

Write cards as compact evidence, not sales copy.

- Lead with the technique or workflow.
- Include metrics only when the repo documents them.
- Mention negative results when they show judgment.
- Do not overclaim private leaderboard performance.
- Say `public score` when the number is from the public leaderboard.
- Use `selected` when the best score is from an earlier version than the latest
  rerun.
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
- Evidence signal: public score moved from `217.0` to `1171.5`
- Lesson signal: leaderboard episodes are stronger than a single local replay

### ROGII Wellbore Geology Prediction

- Stack signal: `Beam Search`, `Particle Filter`, `LightGBM`, `CatBoost`,
  `Artifact Replay`, `Masked Validation`
- Evidence signal: selected Beam/PF V1 public score `9.941`
- Lesson signal: later artifact reruns improved reproducibility but did not beat
  selected public score

### NeuroGolf 2026

- Stack signal: `ONNX`, `ARC Solvers`, `Connected Components`,
  `One-Hot Tensors`, `Rule Diagnostics`
- Evidence signal: `400 / 400` tasks profiled and scorer-compatible one-hot
  ONNX export path
- Lesson signal: local ONNX Runtime validation is not enough; Kaggle scorer
  interface matters

## Update Checklist

Before committing:

1. Run `git diff --check`.
2. Search for stale `Jupyter Notebook` stack labels in generated cards.
3. Confirm new project titles appear in `projectPriority` when needed.
4. Confirm copied scores and metrics match repository docs.
5. Push and check the GitHub Pages deploy result.

If local Node/npm is unavailable, note that local build checks were skipped and
use the GitHub Pages workflow result as the deployment verification.
