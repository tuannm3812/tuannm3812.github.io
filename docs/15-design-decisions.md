# Design Decisions

Dated decisions by Mike about how the site looks and what it features, newest
first. Each entry says what it supersedes. Rules live in
[12](12-design-guideline.md) and [13](13-ui-patterns.md); this file records who
decided and when.

## 17 November 2026 — Blog and Contact follow the card rules

Defaults taken while Mike asked to "continue next work": blog posts use the
same 3-tag vocabulary as project cards and a kind label (Field Note,
Achievement, Event) so his LinkedIn posts can join as Achievements and Events;
meta lines use sentence case, not uppercase tracking. Contact drops the phone
number (as the resume PDF already does) and lists Email, LinkedIn, GitHub,
Kaggle and location. Awaiting his confirmation on the phone number.

## 17 November 2026 — Card content rules and colour-grouped tags

Mike approved the "Project card content guideline" doc: fixed card slots,
project-named titles, one-sentence descriptions with no model names, and
exactly 3 generic tags from a fixed list of 40 in five colour groups (down from
163 tags). The Home gallery uses the same tags. Defaults taken where he did not
pick: 3 tags per card (2 on index rows), the five groups as drafted, and Python
as the third UTS Tech Festival tag until he confirms the tools. Supersedes the
per-project stack lists on cards and the old category filter.

## 17 November 2026 — Option E type and the Selected work gallery

Mike chose option E from the type studies, and then refined the gallery over
several rounds.

- Figtree replaces Outfit. It is the closest licensable match to the Google Sans
  in his decks. Caveat handwriting plus an amber hand-drawn underline is the
  accent ("messy data", "working answer", gallery labels).
- Positioning: AI builder, ML engineer, AI consultant. The hero copy is
  business-facing.
- Home "Featured projects" became the Selected work gallery: a filter, a
  numbered project index, a poster thumbnail with arrows, and a fixed story
  block. Public content rules are in [12](12-design-guideline.md#public-content-mike-17-nov).
- Mike removed in review: client names, "UTS HPC", the metrics row, the
  "Poster and deck" caption, Poster and Deck buttons, and the "Tech stack" and
  "My role" labels. He chose role titles over team size.
- The Terminal-Bench harness and wildfire research are flagship (3 stars) and
  tagged self-initiated. They are private repos, so they link their posters.

## 17 November 2026 — Keep the original look; flagship is self-initiated work

Mike, after seeing the Swiss index build: refine the original site instead of
changing so much. He prefers its modern font (Outfit).

- Reverted to the original styling: Outfit, rounded cards, cover images on
  Home, the original header and footer. Supersedes "Swiss index" (16 Nov).
- `ui-audit` keeps only the static-Firebase rule; the Swiss style rules are gone.
- Kept from Phases 0–1, in the original style: origin groups on Projects,
  Playground Series as one table, a Download Resume button, the roles eyebrow,
  and the content fixes.
- Flagship: BirdCLEF is a Kaggle entry; Solana and Airbnb ELT were coursework.
  None of the three is flagship now.
- Mike has newer free-scope work to feature, such as the Terminal-Bench agent
  harness and the active-fire research. He wants slide decks or previews shown
  for them. Those repos are private, so how they appear is still open.

## 17 November 2026 — Phase 1 defaults (partly superseded above)

Mike said "ok" to Phase 1 without answering the roles and lineup questions, so
these drafts are live on the branch and easy to change.

- Hero roles line: "Applied AI Engineer · ML Engineer · Data Engineer". Work
  rights are left out until Mike gives the wording.
- Flagship order: Text-to-SQL, CircleU, AI Meal Planner, BirdCLEF, FarmLens
  (shows once its card syncs), UTS TechFest, Solana. Airbnb ELT drops to the
  Coursework group, per Mike on 16 Nov.
- Origin comes from the Mac folders. Text-to-SQL and Meal Planner sit in
  "1. Study" but count as self-initiated because their topics were free.
  Repos not on the Mac (Solana, Sydney Rainfall, TikTok Semantic, AfriWeave,
  Apple Foundation Agent, VisionVoice, Flickr8k, YouTube Snowflake) show under
  "Other projects" until Mike says where they came from.
- Playground Series episodes are one table, not seven cards.

## 17 November 2026 — Phase 0 defaults (awaiting confirmation)

Mike said "start now" on the recruiter hub plan without answering the open
guideline questions, so Phase 0 uses the recommended defaults. Each can be
reversed.

- Keep the site's own Swiss look; share only the method (workflow, patterns,
  decisions log) with the deck kits, not their palette or Google Sans.
- Four numbered docs (12–15) plus `ui-audit`, rather than one long file.
- Show the live project count on the site.
- Review lessons go to `docs/working/ui-lessons/` and become rules only after
  approval.

## 16 November 2026 — Recruiter hub and content priorities

- The site is a hub for recruiters, hiring managers and technical interviewers.
- Self-initiated work leads. Coursework is not the priority.
- Text-to-SQL Agent and AI Meal Planner were free-topic and stay flagship.
  Airbnb ELT was a set assignment and leaves the flagship list once a
  replacement is chosen.
- Kaggle projects are classified (featured, simulation, Playground Series).
- LinkedIn posts are to be reused as short blog notes.

## 16 November 2026 — Swiss index chosen

Mike picked "Swiss index" from three hero mocks (Swiss index, Notebook, Model
card). Paper white, near-black, the brand blue as the only accent, Archivo
display type, hairline rules, a visible column grid, flagship work as a ranked
index. Supersedes the October Aurora proposal.

## 22 October 2026 — Aurora rejected

PR #2's dark-first style with gradients, glow blobs and glass cards was
rejected. Glow, gradients and glass are not to be offered again. Flagship
projects on top, ranked by `projectPriority.ts`, was kept.
