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
- Replace placeholder cover images with generated project-specific covers:
  - `public/assets/projects/text-to-sql.jpg`
  - `public/assets/projects/ai-meal-planner.jpg`
  - `public/assets/projects/bird-classification.jpg`
  - `public/assets/projects/airbnb-elt.jpg`
- Consider reviewing `tuannm3812/aipa-text-to-sql-agent`: default branch was
  reported as `tuannm3812/main-refinement`, which is unusual for a polished
  public portfolio repository.
- Add priority scores for newly synced projects if they should appear above the
  bottom of the generated project list:
  - Kaggle Rsna Knee Abnormality Detection
  - Kaggle S6e8 Predicting Smartphone Addiction
  - Kaggriculture
  - Unsw Aisoc Hack 2026
- Do not commit ignored private career material from `jobs/` or
  `docs/database/` to this public repository unless it is intentionally
  sanitized for publication.
