# Agent Collaboration Log

Use this file as a lightweight handoff record for Codex, Cursor, Claude Code,
GitHub Copilot, and any other coding agent working in this repository.

The goal is not to narrate every prompt. The goal is to make the next agent
quickly understand what changed, what was verified, what is still open, and
what should not be touched.

## Logging Rules

- Add one entry per meaningful work session.
- Keep entries concise and factual.
- Do not record secrets, tokens, private job descriptions, private recruiter
  notes, or personal application content from ignored folders.
- Link to public files, branches, commits, pull requests, or workflow runs when
  useful.
- If work touches ignored local folders such as `jobs/` or `docs/database/`,
  mention only the folder-level intent, not private content.

## Entry Template

```md
## YYYY-MM-DD - Agent / Tool

**Branch:** `branch-name`
**Scope:** Short summary of the work.

**Changed**
- File or area changed.

**Verified**
- Command or manual check.

**Open / Handoff**
- Follow-up, risk, or blocker for the next agent.
```

## 2026-08-20 - Codex

**Branch:** `main`
**Scope:** Portfolio asset refresh, project ranking cleanup, and GitHub hygiene.

**Changed**
- Added priority scores for four newly synced GitHub repositories so project
  validation no longer reports missing ranking metadata.
- Replaced the four homepage flagship project cover images with generated
  project-specific 1280x720 JPEG assets:
  - `public/assets/projects/text-to-sql.jpg`
  - `public/assets/projects/meal-planner.jpg`
  - `public/assets/projects/bird-classification.jpg`
  - `public/assets/projects/airbnb-elt.jpg`
- Refreshed the `PROFILE_README_TOKEN` repository secret without recording or
  exposing the token value.
- Changed `tuannm3812/aipa-text-to-sql-agent` default branch from
  `tuannm3812/main-refinement` to `main`.

**Verified**
- Visually inspected all four generated project covers after installing them in
  the workspace.
- Confirmed `PROFILE_README_TOKEN` works by running the **Sync Profile README**
  workflow successfully via `workflow_dispatch`.
- Confirmed `tuannm3812/aipa-text-to-sql-agent` now reports `main` as the
  default branch.

**Open / Handoff**
- The previously exposed GitHub PAT still needs to be revoked from the GitHub
  web UI if it has not already been revoked.
- Review the generated covers in the live homepage after deployment and replace
  any image whose visual direction should be more project-literal.

## 2026-08-20 - Codex

**Branch:** `main`
**Scope:** Homepage content refinement and portfolio coordination review.

**Changed**
- Tightened the homepage presentation around senior-level flagship projects.
- Selected four homepage flagship projects:
  - Enterprise Text-to-SQL Agent
  - AI Meal Planner
  - Bioacoustic Species Classification
  - Production-Grade ELT Pipeline
- Kept project cover visuals as professional placeholders while waiting for
  generated cover images.
- Updated GitHub Actions workflow action versions for Node 24 compatibility,
  including GitHub Pages upload/deploy actions.
- Added an early validation step for `PROFILE_README_TOKEN` so profile README
  sync failures clearly identify a missing, expired, or under-scoped token.
- Reviewed GitHub repository inventory through the GitHub connector.
- Rebased this coordination update over remote automated GitHub project sync
  commits before pushing.

**Verified**
- `npm run check` passed on 2026-08-20 after rebasing onto the latest
  `origin/main`:
  - project link/data validation
  - lint and TypeScript check
  - Vitest suite
  - production build
- Project link/data validation exited successfully with four warning-level
  missing priority scores from newly synced GitHub repositories.
- Confirmed this repository is public and private career folders remain ignored
  via `.gitignore`.

**Open / Handoff**
- Do not commit ignored private career material from `jobs/` or
  `docs/database/` to this public repository unless it is intentionally
  sanitized for publication.
