# Repository Next Steps

Use this as the working checklist after each portfolio, resume, or GitHub-profile
refresh.

## Immediate Maintenance

- Keep `src/data/resume.ts` as the curated source for flagship projects,
  headline copy, experience, education, skills, and homepage highlights.
- Keep `src/data/githubProjects.ts` generated from public GitHub metadata with
  `npm run sync:github-projects`.
- Add high-signal generated project copy to `PROJECT_COPY_OVERRIDES` in
  `scripts/sync-github-projects.mjs` so future syncs preserve polished wording.
- Run `npm run check` before committing portfolio changes.
- Review GitHub Pages after each push and confirm the latest bundle contains the
  expected project names.

## Content Improvements

- Update `docs/03-resume-content-guide.md` whenever a new project becomes strong
  enough for resume use.
- Keep project cards to two bullets: one overview sentence and one technical
  technique/skill sentence.
- Avoid generic stack labels such as `Jupyter Notebook`, `Python`, or `Kaggle`
  when a concrete algorithm, model family, validation method, or system exists.
- Keep leaderboard scores and detailed metric tables in repository READMEs, not
  portfolio cards.
- Revisit the homepage summary after major project waves so it matches the
  strongest current evidence.
- Keep `docs/04-github-profile-readme.md` shorter and more selective than the
  full portfolio. It should lead with a recruiter-friendly narrative, then use
  selected projects as proof.

## GitHub Project Hygiene

- Make every portfolio-facing repo easy to scan with a README containing:
  overview, problem, workflow, techniques, repository map, and run instructions.
- Keep notebook outputs small unless an assignment or project explanation
  requires executed outputs.
- Prefer stable folder names across project repos:
  `notebooks/`, `src/`, `docs/`, `data/`, `models/`, `artifacts/`, `reports/`.
- Add repository descriptions and topics on GitHub so project sync metadata is
  meaningful.
- Pin large datasets and trained model files outside Git when they are not
  needed for review.

## Portfolio Engineering

- Run `npm run test` (Vitest) to check the reliability lib
  (`src/lib/reliability/*.test.ts`) and the GitHub project sync helpers
  (`scripts/sync-github-projects.test.mjs`); `npm run check` already runs it.
  Add new unit tests alongside any new pure logic in those areas.
- Add a lightweight visual smoke test for `/`, `/projects`, `/blog`, and
  `/contact` before future UI-heavy changes.
- Add a small script that compares public GitHub project URLs against portfolio
  project URLs and reports missing or extra entries.
- Keep Firebase web config, reliability wrappers, and Firebase-dependent pages
  aligned when contact or blog behavior changes.

## Resume And Profile

- Keep 4-6 role-specific projects in a resume version rather than listing every
  strong project.
- For ML / deep learning roles, lead with Bioacoustic Species Classification,
  FoodLens, NFL Contact Detection, ROGII, NeuroGolf, CSIRO, and image captioning.
- For data engineering roles, lead with Production-Grade ELT Pipeline, NYC Taxi
  Databricks, YouTube Snowflake Lakehouse, FAOSTAT, and TikTok Semantic.
- For AI agent / applied AI roles, lead with Enterprise Text-to-SQL Agent,
  AI Meal Planner, AfriWeave, ScriptClean AI, and Apple Foundation Agent.
- For MLOps roles, lead with Solana Price Forecasting, Sydney Rainfall
  Forecasting, and the portfolio itself as a deployed CI/CD artifact.
- Refresh `docs/04-github-profile-readme.md` after major portfolio changes,
  keeping it focused on narrative, strongest evidence, and clear contact links.
- Keep the `PROFILE_README_TOKEN` repository secret configured so the profile
  README workflow can publish that source into `tuannm3812/tuannm3812`.

## Career Copilot & RAG Database

- Periodically sync your public GitHub repositories using `npm run sync:github-projects`.
- Add custom text overrides to `PROJECT_COPY_OVERRIDES` in `scripts/sync-github-projects.mjs` for newly synced projects to avoid generic copy.
- Keep your raw database files in `docs/database/` updated with your latest education, experiences, skills, and STAR stories.
- Run `Initialize career copilot for [company-role]` in Antigravity to prepare for new job applications.
- Run `Run career copilot tailoring for [company-role]` in Antigravity to tailor resumes, cover letters, and interview preparation materials natively.

## Reliability smoke checks (post-change)

- Run `npm run check`.
- Verify `/`, `/experience`, `/projects` load with no Firebase path dependency.
- Simulate Firebase offline and confirm `/contact` shows actionable error, retains values, and allows retry.
- Simulate Firebase offline on `/blog`, open a post, and verify post body renders while comments show fallback.
- Confirm Google sign-in prompt path on `/blog` still works after retries.
- Confirm layout banner appears only as informative status and does not block routing.
