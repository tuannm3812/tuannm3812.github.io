# tuannm3812.github.io

Tuan Nguyen's personal portfolio — React 19 + Vite + TypeScript + Tailwind,
deployed to GitHub Pages, with Firebase backing the contact form and blog
comments. **This is the public-facing site**; anything committed here is live at
https://tuannm3812.github.io within about a minute of a push.

## Standards

Follow the master standard at `~/Documents/GitHub/coding-standards/`.
Documentation map and update workflow: @docs/00-documentation-index.md

## Deltas from the master

**Doc naming here is `NN-name.md`, not the master's `N_name.md`.** This is a
deliberate local convention for a long, mostly-flat doc set, recorded in master
standard §2. It does not generalise to other repos, and other repos' convention
does not apply here.

**Project cards are generated, not hand-written.** `src/data/githubProjects.ts`
is produced by `scripts/sync-github-projects.mjs` and overwritten on every sync
— edit the `PROJECT_COPY_OVERRIDES` map in the script, never the generated file.
A repo with no GitHub description falls back to placeholder copy
(`impact: 'Public Python project from GitHub'`), which is how four placeholder
cards once reached production.

**Run `npm run check` before committing anything.** It chains link validation,
ESLint, `tsc --noEmit`, the test suite and a production build. Link validation
warns about a project missing a `projectPriority.ts` entry, which otherwise
sorts the card silently to the bottom.

**Firebase must stay off the critical path.** `Layout` only enables the health
poll on `/blog` and `/contact`, and `firebaseHealth.ts` imports the SDK
dynamically. A static import anywhere in the Layout chain puts ~668 kB back in
front of first paint.

## Evidence locations

- `docs/00-documentation-index.md` — the map; start here
- `docs/02-portfolio-project-update-guide.md` — how a project becomes a card
- `docs/08-agent-collaboration-log.md` — **append an entry after meaningful
  work**; newest first
- `docs/11-pending-tasks.md` — the running checklist of open work

## Adding a project

Full sequence in `docs/11-pending-tasks.md` §6. In short: give the GitHub repo a
real description, run `npm run sync:github-projects`, add a
`PROJECT_COPY_OVERRIDES` entry, add any acronym rule to `toTitle()` with a test,
add a `projectPriority.ts` entry, then `npm run check`.

## Open risks

- **Pushing to `main` deploys.** There is no staging environment.
- `firestore.rules` allows contact creation with no authentication check, and
  blog comments have no stored `uid`, no post allowlist and no update/delete
  rule — so `authorName` is client-supplied and unverified. Tracked in
  `docs/11-pending-tasks.md` §2; do not treat the contact form as hardened.
- `public/assets/tuan-nguyen-resume.pdf` is publicly downloadable and generated
  from `scripts/resume/resume.html`. The published copy deliberately omits the
  phone number that `docs/09-master-resume.md` carries.
- The weekly sync workflow commits generated cards straight to `main` with no
  review step.
