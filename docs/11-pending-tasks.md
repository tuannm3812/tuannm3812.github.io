# Pending Tasks

Single running checklist for the portfolio and the GitHub account behind it.
Tick items off as you go and add new ones under the matching section.

**Last reviewed:** 2026-08-31
**Legend:** `[ ]` open · `[x]` done · **Decide** = needs your call, not just execution

---

## 1. Decisions Only You Can Make

These are blocked on judgement, not effort. Nothing else in this file depends on
them.

- [ ] **Decide — `kaggriculture` has diverged and cannot be reconciled safely by
      guessing.** The local clone has no git remote configured, no reflog, and no
      remote-tracking refs, yet the GitHub repo exists and is *ahead*:
      - 62 commits local-only — HEAD `chore: preserve uncommitted v9-v17 work and shared-library WIP`
      - 39 commits remote-only — HEAD `feat: add task_teacher_v8 gated SW land`

      That pattern suggests a second clone on another machine or path. Work out
      which lineage is authoritative before merging; either direction can lose
      work. The portfolio card currently links to the remote (v8) lineage.

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

- [ ] **Verify rich results.** Run the live URL through
      [Google's Rich Results Test](https://search.google.com/test/rich-results) to
      confirm the Person JSON-LD parses.
- [ ] **Verify offline resilience.** `npm run dev`, open Blog, set the network to
      Offline, and confirm the status banner appears and draft comments persist in
      `localStorage`.
- [ ] **Keep an eye on the async Firebase chunk.** It is out of the initial route
      but still ~668 kB when Blog or Contact load. Worth splitting further only if
      those pages become central.
- [ ] **Add interaction tests.** Current suite (3 files, 32 tests) covers
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

- [ ] **Push `coding-standards` to GitHub — it has no remote.** The master
      standard is now 380+ lines across 4 commits and exists on one disk only.
      It is the most reused thing you own and the least backed up. Needs a
      public/private decision: public makes it citable from the repos that
      already reference "the personal master standard", private still solves
      the backup problem.

- [ ] **Activate the personal layer:** `mv ~/.claude/CLAUDE.md.draft ~/.claude/CLAUDE.md`
      (drafted 2026-08-30, ~1k tokens/session, inert until renamed).

- [ ] **Add root `CLAUDE.md` to the ~10 active repos** from
      `coding-standards/templates/CLAUDE.md.template`. Currently 0 of 40 repos
      have one, so no project standard is being auto-loaded anywhere.

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

| Repo | State | Action |
|---|---|---|
| `kaggriculture` | diverged 62 local / 39 remote | see §1 — needs your decision |
| `aiml-youtube-lectures` | 23 uncommitted | review and commit |
| `uts-mdsi` | 1 unpushed, 4 uncommitted | `feat: render the Project 15 capstone document set to PDF` |
| `36126-active-fire-research` | 2 uncommitted | review and commit |
| `project-15-strategy` | 1 unpushed, 1 uncommitted | push |
| `aipa-text-to-sql-agent` | 1 unpushed | `Ignore local Claude Code settings` |
| `unsw-ma-hackathon-2026` | 1 uncommitted | review and commit |
| 8 × `kaggle-*` repos | 1 unpushed each | all the same commit: `docs: add Kaggle submission method guidance to coding standards` — safe to push together |

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
root file template at `coding-standards/templates/CLAUDE.md.template`. That is
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
