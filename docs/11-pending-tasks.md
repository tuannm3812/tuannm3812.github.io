# Pending Tasks

Single running checklist for the portfolio and the GitHub account behind it.
Tick items off as you go and add new ones under the matching section.

**Last reviewed:** 2026-10-06 (site sections re-verified against Codex's
2026-09-23 review; §5 re-checked from local clones)
**Legend:** `[ ]` open · `[x]` done · **Decide** = needs your call, not just execution

---

## 1. Decisions Only You Can Make

These are blocked on judgement, not effort. Nothing else in this file depends on
them.

- [x] ~~**Decide — `kaggriculture` has diverged.**~~ Resolved by 2026-10-06:
      the clone now has `origin` configured, and local `feat/task-teacher-v21`
      is 8 commits ahead of `origin/main` with **0 remote-only commits** on any
      remote branch. Nothing left to reconcile; it just needs pushing (§5).

- [ ] **Decide — the flagship project is a fork.** `aipa-text-to-sql-agent` is
      ranked `score: 100`, sits top of the homepage and first in the profile
      README, but is a fork of `huyducv/aipa-text-to-sql-agent` described as
      *"Text-to-SQL Enterprise Agent for university assignment"*. You wrote 19 of
      its 35 commits, so the work is genuinely majority yours — but a recruiter
      clicking your top project lands on "forked from…". Options: ask the owner
      about transferring ownership, name the collaboration on the card, or move
      it out of the number-one slot.

- [ ] **Decide — nine clutter forks on the public profile.** `NLP-progress`,
      `Prompt-Engineering-Guide`, `TF_JAX_tutorials`, `vertex-ai-samples`,
      `training-data-analyst`, `golang-samples`, `generative-ai`, `claude-howto`,
      `Ai-C-Suite-GDG-Sydney`. All zero stars. Deleting a fork is irreversible, so
      this is left to you.

- [ ] **Review the public resume PDF.** `public/assets/tuan-nguyen-resume.pdf` is
      live and downloadable by anyone. The phone number in
      [09-master-resume.md](09-master-resume.md) was deliberately left out of the
      public copy; email and profile links remain. Add it back in
      `scripts/resume/resume.html` if you want it public.

- [ ] **Decide — the phone number is already public on `/contact`.**
      `Contact.tsx` renders `resumeData.phone` as a `tel:` link, so it ships in
      the JS bundle and on the live page whatever the PDF does. Either remove it
      from `resume.ts` + `Contact.tsx` (keeping it only in the private master
      resume), or accept it as public and stop treating the PDF omission as
      meaningful. (Codex 2026-09-23.)

- [ ] **Decide — rename "Production-Grade ELT Pipeline".** The repo's own README
      calls it "local-first… designed to grow into a portfolio-grade analytics
      platform"; nothing is deployed. Suggested title: **"Airbnb & Census ELT
      Warehouse"**. Changes `src/data/home.tsx`, `src/data/resume.ts` and the
      `projectPriority.ts` key together.

- [ ] **Confirm how contact messages reach you.** The form writes to Firestore
      `contacts`; nothing in this repo reads them or sends a notification. If
      nobody checks the Firebase console, messages are silently lost. Consider
      a Firebase "Trigger Email" extension or a scheduled digest.

---

## 2. Security & Firebase

Verified against `firestore.rules` on 2026-08-30. Both client write paths
(`Contact.tsx`, `Blog.tsx`) send exactly the keys the rules allow, so nothing is
silently broken today — these are hardening items, not outages.

- [ ] **Check whether the old GitHub PAT is still live.** Carried forward from an
      earlier agent log entry. Scanning this repo's full git history and working
      tree found **no token** — the repo is clean, so any exposure happened
      elsewhere. Only you can confirm the account state at
      [github.com/settings/tokens](https://github.com/settings/tokens).

- [ ] **Harden contact writes.** `firestore.rules:28` allows contact creation with
      **no authentication check**. Fields and lengths are validated and reads are
      admin-only, but a public form can be scripted for spam and Firestore write
      cost. Add App Check, CAPTCHA friction, or a rate-limited backend endpoint.

- [ ] **Fix comment authorship and moderation.** `firestore.rules:37-45`:
      - `authorName` is client-supplied and never checked against the auth token,
        so a signed-in user can post under **any display name**.
      - No `uid` is stored, so comments have no owner and nobody can delete their
        own.
      - `postId` is an unconstrained wildcard — comments can be created under
        arbitrary post IDs.
      - No `update`/`delete` rules exist at all, so moderation needs the console
        or Admin SDK.

- [ ] **Bound comment reads.** `useBlogComments.ts` subscribes to a post's
      entire comment collection with no `limit()`. Add a limit + "load more" in
      the same pass as moderation, so a spammed thread doesn't grow every
      visitor's read cost.

- [ ] **Deploy the rules** — they are written locally but deployment to the live
      project is unconfirmed: `firebase deploy --only firestore:rules`
- [ ] **Deploy composite indexes** — needed for comment ordering:
      `firebase deploy --only firestore:indexes`
- [ ] **Authorize the domain** — add `tuannm3812.github.io` under Firebase Console
      → Authentication → Settings → Authorized Domains, or Google sign-in fails
      live.

---

## 3. Portfolio Site

- [x] Resume PDF download repaired — was serving a 404 HTML page under a `.pdf`
      name; now a real 2-page PDF, verified `200 application/pdf` in production
- [x] Initial JS cut from ~1,146 kB to ~636 kB (~320→200 kB gzipped) by moving
      Firebase off the critical path
- [x] Hero image 2.31 MB → 156 kB WebP with JPEG fallback
- [x] Dark-mode flash-of-white removed
- [x] Projects page tiered into "Selected work" / "More projects"
- [x] Skip link, `<main id>`, Escape-to-close menu, `<h1>` on Projects and
      Contact, stack tags 9px → 11px
- [x] Placeholder copy replaced for the four newest synced projects
- [x] Descriptions added to all 7 public repos that were missing them
- [x] Placeholder guard in both the sync and `npm run check` (2026-09-14); first
      real CI catch was S6E10 on 2026-10-04, fixed by an override, card live
- [x] All five Streamlit demos reachable, 200 with cookies (2026-10-06; app
      wake-state not checked)

### Codex 2026-09-23 review — all eight fixed and deployed (2026-10-06/07)

All eight findings verified against source on 2026-10-06; see the agent log
entry of that date. Suggested order is top to bottom.

- [x] **Run `npm run check` in `deploy.yml`** (finding 2). Done 2026-10-06. The deploy build skips
      `validate:links`, so the placeholder gate can be bypassed by a direct push.
- [x] **Remove `worksFor: Shopee` from the JSON-LD in `index.html`** (finding 8).
      Done 2026-10-06. Sitemap and per-route metadata done with finding 1.
      The role ended in Jan 2025.
- [x] **Guard `localStorage` in `useTheme.ts` and the Blog draft** (finding 4).
      Done 2026-10-06 via `src/lib/safeStorage.ts`.
      A storage-denied browser currently crashes every route, above the error
      boundary.
- [x] **Direct route URLs return HTTP 404** (finding 1). Done 2026-10-06:
      `scripts/generate-route-pages.mjs` writes per-route HTML, a noindex
      `404.html` and the sitemap from `src/data/routeMeta.ts`; `*` NotFound route.
      Was: Only `/` is 200 live.
      Emit per-route `index.html` with route metadata, add a `*` NotFound route,
      and extend `public/sitemap.xml`.
- [x] **Blog posts: real URLs + keyboard access** (findings 5 + 6). Done
      2026-10-06: `/blog/:postId`, title is a real `<Link>`. Was: Add a
      `/blog/:postId` route and make the card title a `<Link>`. Today the cards
      are click-only and a post can't be linked, refreshed or reached with Back.
- [x] **Show sign-in failures** (finding 7). Done 2026-10-07. Was: `handleLogin` only logs to the
      console.
- [x] **Offline submit stuck on "Sending…/Posting…"** (finding 3). Done
      2026-10-07: client-generated ID, queued state, no retry. Was: Pre-generate
      the doc ID so a retry can't duplicate, and show a queued state instead of a
      locked button.

- [ ] **Verify rich results.** Run the live URL through
      [Google's Rich Results Test](https://search.google.com/test/rich-results) to
      confirm the Person JSON-LD parses.
- [ ] **Verify offline resilience.** `npm run dev`, open Blog, set the network to
      Offline, and confirm the status banner appears and draft comments persist in
      `localStorage`.
- [ ] **Keep an eye on the async Firebase chunk.** It is out of the initial route
      but still ~668 kB when Blog or Contact load. Worth splitting further only if
      those pages become central.
- [ ] **Add interaction tests.** Current suite (7 files, 65 tests) covers
      reliability helpers and the sync script only — no Firestore rules tests and
      no browser smoke test for contact submit, sign-in failure, or route
      fallback.

---

## 4. GitHub Account Hygiene

- [ ] **Archive 24 dormant 2025 coursework repos.** All private, untouched since
      2025. Archiving is reversible. This was blocked by a permission gate in the
      agent session, so it needs running by you:

      ```bash
      for r in adv_mla_lab_1 adv_mla_lab_2 adv_mla_lab_3 adv_mla_lab_3_sgd_api \
               adv_mla_lab_4 adv_mla_lab_4_app adv_mla_lab_5 adv_mla_lab_6 \
               adv_mla_lab_7 adv_mla_lab_8 advmla_assignment_1 advmla_assignment_2 \
               advmla_assignment_2_api advmla_assignment_3_group_10 \
               advmla_assignment_3_group_10_api_25739083 \
               advmla_assignment_3_group_10_streamlit assignment2_25739083 \
               assignment_2_api assignment_2_packages assignment_2_ui \
               group24_25739083 my_krml_25739083 my_krml_tuannm3812 \
               mypkg_25739083_assignment_2; do
        gh api -X PATCH "repos/tuannm3812/$r" -F archived=true --jq '.name'
      done
      ```

- [ ] **Push `coding-standards` to GitHub — it has no remote.** (Still no
      remote as of 2026-10-06.) The master
      standard is now 380+ lines across 4 commits and exists on one disk only.
      It is the most reused thing you own and the least backed up. Needs a
      public/private decision: public makes it citable from the repos that
      already reference "the personal master standard", private still solves
      the backup problem.

- [ ] **Activate the personal layer** (still a `.draft` on 2026-10-06): `mv ~/.claude/CLAUDE.md.draft ~/.claude/CLAUDE.md`
      (drafted 2026-08-30, ~1k tokens/session, inert until renamed).

- [ ] **Add root `AGENTS.md` (+ one-line `CLAUDE.md`) to the ~10 active repos** from
      `coding-standards/templates/AGENTS.md.template`. Only 2 of 40 repos have a
      hand-written one (`36126-active-fire-research`, `project-15-strategy`), so
      almost no project standard is being auto-loaded anywhere.

- [ ] **Consider renaming `coding-standards` → `0. Standards`** so it sorts first
      with the numbered `1. Study` / `2. Kaggle` / `3. Personal` / `4. Training`
      folders. Check for hardcoded paths in project docs first — several repos
      refer to a "personal master standard".

- [ ] **Consider making the scheduled sync open a PR** instead of committing
      generated project metadata straight to `main`
      (`.github/workflows/sync-github-projects.yml`). Generated cards currently
      go live with no review step — which is how four placeholder cards reached
      production.

---

## 5. Repo Sync Status

Update this as you work. Everything not listed is clean and pushed.

Re-checked 2026-10-06 from the local clones (`git status` + `rev-list` against
the upstream; `project-15-strategy` and `kaggriculture` freshly fetched).

| Repo | State | Action |
|---|---|---|
| `project-15-strategy` | **206 unpushed** | push. Largest backlog, one disk only |
| `kaggle-rsna-knee-abnormality-detection` | 9 unpushed | push |
| `kaggriculture` | 8 ahead of `origin/main`, branch `feat/task-teacher-v21` has no upstream | `git push -u origin feat/task-teacher-v21` |
| 8 × `kaggle-*` repos | 1 unpushed each | same docs commit in all eight, safe to push together (below) |
| `aiml-youtube-lectures` | 588 uncommitted | review. Likely generated output; check `.gitignore` before committing |
| `unsw-ma-hackathon-2026` | 5 uncommitted | review and commit |
| `kaggle-s6e10-predicting-airline-satisfaction` | 4 uncommitted | review and commit |
| `NYC-Taxi-Databricks` | 3 uncommitted | review and commit |
| `aipa-text-to-sql-agent` | 2 uncommitted (devcontainer, agent log) | review and commit. Previous unpushed commit is now pushed |
| `airbnb-ELT-warehouse` | 2 uncommitted | review and commit |
| `36126-active-fire-research`, `ai-meal-planner`, `foodlens-calibrated-food-recognition`, `kaggle-s6e9-…`, `ScriptClean-AI` | 1 uncommitted each | review and commit |
| `coding-standards` | no remote | see §4 |

`uts-mdsi` is now clean and pushed.

The eight Kaggle repos share one identical docs commit and can be pushed in one
pass:

```bash
cd ~/Documents/GitHub/"2. Kaggle"
for r in kaggle-birdclef-2026 kaggle-maze-crawler kaggle-nfl-player-contact-detection \
         kaggle-orbit-wars kaggle-pokemon-tcg-ai-battle kaggle-s6e4-predict-irrigation-need \
         kaggle-s6e5-predict-f1-pit-stops kaggle-s6e6-predicting-stellar-class; do
  git -C "$r" push
done
```

**Recently pushed** (2026-08-27): `kaggle-rsna-knee-abnormality-detection` (103
commits), `project-15-strategy` (80), `Insta-tracking` (31),
`interview-voice-copilot` (7), `unsw-ma-hackathon-2026` (6).

---

## 6. Adding a New Project

For starting a repo from scratch — structure, `.gitignore`, agent instruction
layering, and the collaboration-log convention — follow **§13 of the master
standard** (`~/Documents/GitHub/coding-standards/coding_standards.md`), with the
root file template at `coding-standards/templates/AGENTS.md.template`. That is
the single source; don't restate it here.

The steps below are the portfolio-specific part — getting an existing repo to
show up as a card:

1. Give the repo a **real GitHub description** — the sync script falls back to it,
   and a missing description is what produces `impact: 'Public Python project
   from GitHub'` placeholder cards.
2. Run `npm run sync:github-projects`.
3. Add a `PROJECT_COPY_OVERRIDES` entry in `scripts/sync-github-projects.mjs`
   following [02-portfolio-project-update-guide.md](02-portfolio-project-update-guide.md).
4. Add an acronym rule to `toTitle()` if the name needs one, plus a test case.
5. Add a `projectPriority.ts` entry, or the card sorts to the bottom.
6. Run `npm run check` — link validation warns about any missing priority entry.
