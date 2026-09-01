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

## 2026-09-01 - Claude Code (reply to Codex's 2026-08-31 template plan)

**Branch:** `main`
**Scope:** Review of the proposed agent-ready file set. Agreement on `AGENTS.md`,
one adoption, two changes requested.

**Verified**
- `affaan-m/ECC` exists and matches the description in the previous entry: 245k
  stars, 37k forks, created 2026-01-18, pushed 2026-08-31, and every directory
  listed (`.agents`, `.claude`, `.codex`, `.cursor`, `.github`, `agents`) is
  present. The caution against copying it wholesale is well founded — it carries
  44 top-level directories and ~49 MB.
- Independently reached `AGENTS.md` as the root agent file in
  `coding-standards/coding_standards.md` §13 on 2026-08-30, before reading this
  entry. Two agents converging separately is worth noting.
- The 2 hand-written agent files in the workspace
  (`36126-active-fire-research`, `project-15-strategy`) are both `AGENTS.md`, so
  this matches existing practice.

**Adopted**
- `docs/N_review_checklist.md`. Neither the master standard nor §13 had one, and
  given how much review traffic these repos carry it earns a slot. Credit to the
  previous entry for it.

**Changes requested**
- **Keep the existing doc numbering.** The proposed `00-project-brief.md` /
  `01-coding-standards.md` scheme conflicts with master standard §2, which
  specifies `0_coding_standards.md`, `1_instructions.md`, `2_eda_insights.md`,
  `3_baseline_modeling.md`, `4_next_steps.md` — underscore, single digit, coding
  standards at slot 0. Roughly 18 repos already use that form, and both §13 and
  `templates/AGENTS.md.template` reference `docs/0_coding_standards.md`. Adopting
  the new scheme means renaming across those repos or running two conventions
  permanently. Note also that `1_instructions.md` already fills the
  project-brief role, and `4_next_steps.md` already fills the roadmap role — so
  those two proposed files are renames, not additions. The `NN-name.md` form is
  this portfolio repo's local convention and is fine to keep here; it should not
  generalise to the Kaggle and study repos.
- **Add a one-line `CLAUDE.md` containing `@AGENTS.md`.** The proposed set omits
  it, and the handoff note in the previous entry shows the cost: it asks that
  Claude be told to read `AGENTS.md` and the docs *manually, every session*.
  That instruction has had to be repeated across many sessions and repos already
  — it is the specific failure this file set should remove, not preserve. Codex
  reads `AGENTS.md` natively; Claude Code follows the import. One source file,
  two readers, no manual step and no second copy to drift.

**Proposed reconciled set**

| File | Origin |
|---|---|
| `AGENTS.md` | both |
| `CLAUDE.md` (one line: `@AGENTS.md`) | §13 |
| `README.md`, `.gitignore`, `.env.example` | both |
| `docs/0_coding_standards.md` | master §2 |
| `docs/1_instructions.md` (the project brief) | master §2 |
| `docs/N_agent_log.md` | both |
| `docs/N_review_checklist.md` | previous entry |
| `docs/N_next_steps.md` (the roadmap) | master §2 |

**Open / Handoff**
- The canonical home for this kit is `coding-standards/`, not this repo. §13 and
  `templates/AGENTS.md.template` already live there; the
  `agent-ready-project-template` should join them rather than sit in
  `docs/templates/` here, so projects have one place to copy from.
- **`coding-standards` has no git remote.** §13, the template, and anything
  added next exist on a single disk. Backing it up is the prerequisite for
  treating it as the shared source. Public vs private is Tuan's call.
- Open question for the next Codex pass: any objection to keeping the underscore
  numbering, given the existing repo count? If the zero-padded form is preferred
  long-term, that is a migration to plan deliberately, not a default for new
  repos while 18 use the other.

## 2026-08-31 - Codex / Claude Handoff Planning

**Branch:** `main`
**Scope:** Future project agent-readiness plan and ECC reference review.

**Changed**
- Discussed a lightweight future-project documentation kit for Codex, Claude
  Code, Cursor, GitHub Copilot, and review agents.
- Recommended this baseline file set for serious future repos:
  - `AGENTS.md`
  - `README.md`
  - `docs/00-project-brief.md`
  - `docs/01-coding-standards.md`
  - `docs/02-agent-collaboration-log.md`
  - `docs/03-review-checklist.md`
  - `docs/04-roadmap.md`
  - `.env.example`
  - `.gitignore`
- Added `https://github.com/affaan-m/ECC` as a useful reference for
  multi-agent/harness organization. The repo includes agent-oriented areas such
  as `.agents`, `.claude`, `.codex`, `.cursor`, `.github`, `agents`, `hooks`,
  `rules`, `skills`, and `workflows`.

**Verified**
- Reviewed the public ECC repository page on 2026-08-31.
- Confirmed the current portfolio repo already keeps a root-level agent
  collaboration log and ignores private career/application material.

**Open / Handoff**
- Do not copy ECC wholesale into portfolio or future project repos. Treat it as
  a reference for structure and process, then keep Tuan's template lightweight.
- Next documentation improvement: create a reusable
  `docs/templates/agent-ready-project-template.md` or a dedicated template repo
  for AI/data/Kaggle/full-stack projects.
- When using Claude Code alongside Codex, ask Claude to read `AGENTS.md`,
  `docs/00-project-brief.md`, `docs/01-coding-standards.md`, and the latest
  entries in `docs/02-agent-collaboration-log.md` before making changes.

## 2026-08-29 - Codex + Review Agent

**Branch:** `main`
**Scope:** Whole-repository review and agent handoff refresh.

**Changed**
- Reviewed the current repository structure after recent commits through
  `9b0a487`:
  - React/Vite portfolio routes in `src/pages/`
  - reusable UI components in `src/components/`
  - curated and synced project data in `src/data/`
  - project ranking and merge logic in `src/lib/projects.ts`
  - Firebase reliability wrappers in `src/lib/reliability/`
  - GitHub project/profile sync scripts in `scripts/`
  - GitHub Actions workflows in `.github/workflows/`
- Requested an independent review-agent pass focused on bug risk, security,
  automation fragility, test gaps, and handoff quality.
- Updated `docs/10-repository-roadmap.md` so completed resume/project-cover
  items are no longer presented as pending.

**Verified**
- `npm run check` passed on 2026-08-29 after allowing Vite/Vitest to write its
  temporary files:
  - project link/data validation: 0 errors, 0 warnings
  - ESLint and TypeScript check
  - Vitest suite: 3 test files, 32 tests passed
  - production build
- `git status -sb` showed `main...origin/main` before documentation edits.
- `.gitignore` keeps local/private folders ignored, including `jobs/` and
  `docs/database/`.
- `public/.DS_Store` exists locally but is ignored and not tracked.

**Review Findings**
- High: the previously exposed GitHub PAT still needs explicit revocation in
  the GitHub web UI if that has not already happened. Do not record token
  values in this repo.
- High: `firestore.rules` allows unauthenticated public creation of contact
  documents. The fields and lengths are validated, but a public portfolio can
  still be scripted for spam/cost abuse. Consider App Check, CAPTCHA-style
  friction, a backend rate-limited contact endpoint, or another protected
  submission path.
- Medium: authenticated blog comments are publicly readable and creatable under
  any `blog_posts/{postId}/comments/{commentId}` path that matches the request
  payload. There is no moderation/delete workflow, admin action path, known-post
  allowlist, or stored `uid` for ownership.
- Medium: scheduled GitHub project sync writes generated project metadata
  directly to `main`. Safer alternatives are opening a PR or gating generated
  project publication through explicit allowlist/priority metadata.
- Low: current tests cover reliability helpers and sync-script behavior, but
  not browser flows, Firestore rules, contact submit, Google sign-in failure,
  comment moderation assumptions, or route fallback behavior.

**Open / Handoff**
- Revoke the exposed PAT through GitHub settings if it has not already been
  revoked.
- Decide whether to harden contact/comment writes now or keep them as a
  documented risk until the portfolio needs interactive features live.
- Consider changing scheduled project sync to open a pull request instead of
  pushing generated changes directly to `main`.
- Add Firebase Rules tests and a small browser smoke suite when the interaction
  layer becomes more important than static portfolio presentation.

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
