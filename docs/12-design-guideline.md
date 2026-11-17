# Design Guideline

> **Superseded in part, 17 Nov 2026.** Mike chose to keep his original look
> (Outfit, rounded cards, cover images) and refine it rather than adopt the
> Swiss index style. The colour, type, corner and shadow rules below describe
> the Swiss style and do not apply. The content and evidence rules still do.
> This file will be rewritten around the original look; see
> [15](15-design-decisions.md).

Status: core standard, 17 November 2026. The "Swiss index" direction Mike chose
on 16 November 2026, written down so later changes can't drift from it. Modelled
on the layered rules in `uts-deck-kit` and `deck-kit`.

## How the rules are layered

1. **This file** holds the rules every page follows.
2. **`src/index.css` `@theme`** holds the tokens. It is the only place a colour,
   font or radius is defined.
3. **[Design decisions](15-design-decisions.md)** records what Mike approved and
   when. Where a decision and this file disagree, the newer decision wins until
   this file is updated.

[UI patterns](13-ui-patterns.md) lists the section layouts by the reader question
each one answers. [UI workflow and QA](14-ui-workflow-and-qa.md) is the process
for changing any of this.

## Who the site is for

A recruiter decides in 10 to 30 seconds whether you fit. A hiring manager spends
3 to 5 minutes deciding whether you can build what the team needs. A technical
interviewer spends longer checking that the work is real. Every section has to
earn its place against one of those three readers.

## Grid and spacing

- Content sits in the `max-w-7xl` (1280 px) container with 16 px gutters, on 12
  columns (4 on phones). A faint column grid is drawn behind the page.
- Section spacing is 64 px on phones and 80 px on desktop. Inside a section, gaps
  are 8, 16 or 24 px.
- Align frames, not glyphs. Cards in a row share top edges and inner padding.

## Colour roles

Colours are named by role, never by hue.

| Role | Light | Dark | Used for |
| --- | --- | --- | --- |
| `paper` | `#fbfbfa` | `#0e0f11` | Page and card background |
| `ink` | `#101114` | slate-100 | Titles, body, primary buttons, section rules |
| `muted` | slate-500 | slate-400 | Labels, captions, metadata |
| `rule` | `#e3e3e0` | `#24262b` | Hairlines between rows and around cards |
| `brand` (accent) | `#0540f2` | `#5b84ff` | Links, the active nav item, one highlighted phrase per screen |

- One accent, used sparingly: at most one blue phrase per screen.
- Status is written in words. Colour never carries meaning on its own.
- No gradients, glow, glass, blur or drop shadows. This is the rule that retired
  the "Aurora" style (PR #2).
- Text and accent reach 4.5:1 contrast on `paper` in both themes.

## Type

- Archivo for headings, Inter for body text, JetBrains Mono for ranks, stack
  tags, captions and code. Headings get the display face globally.
- Scale: display 56 to 88 px, page title 48 to 60, section label 12 caps, card
  title 20 to 24, body 16 to 18, small 14, caption 11 to 12.
- Sentence case everywhere. Uppercase only for section labels and the hero
  kicker.
- Running text stays under about 65 characters a line.

## Components

- Square corners. A card is a hairline box. A flagship card adds a 2 px ink top
  rule and its rank number.
- Buttons are solid ink (primary) or ink outline (secondary). Text links are
  underlined on hover.
- A section heading is an ink rule, the label on the left and at most one quiet
  note on the right, such as "Ranked · 7 of 39" (`.index-heading`).
- Icons only where the meaning is obvious without a legend: GitHub, LinkedIn,
  email, external link.
- Photos are captioned like figures ("Fig. 1 — Sydney, NSW").

## Content and evidence

- Each section answers one reader question ([patterns](13-ui-patterns.md)).
- Self-initiated work leads. Coursework is shown last unless it was a
  free-topic assignment.
- Project titles name the work. The one-line impact says what it does or found,
  with no adjectives.
- Every number on the site is computed from data or traced to a source in the
  repo. No hand-typed counts that can drift.
- Don't repeat: a subtitle never restates its title, and a card's bullets never
  restate its impact line.
- Two or more items are a list or tags, never "a; b; c" in one sentence.

### Public content (Mike, 17 Nov)

These rules apply to the Home "Selected work" gallery (`src/data/selectedWork.ts`)
and to any project copy.

- **No client or sponsor names** anywhere in the copy. Lead with the project's
  topic and its tech stack. Posters may carry the names they already show.
- **No internal details**: no university HPC or internal servers, no private
  repo links (link the hosted poster instead), and no unpublished client numbers.
- **Collaborators** are named only with their consent.
- **The headline block** has four lines, always in this order:
  1. Label: Title Case, `Type of Work · Problem Area`.
  2. Title: the project's name.
  3. Subtitle: one insight sentence, 15 words or fewer, that does not repeat
     the question.
  4. Role: a role title only, such as "Lead AI Engineer". Use "Lead" when Mike
     led the team, and leave out team size.
- **Story**: one sentence each for question, built and answer. Highlight one or
  two `[[key terms]]` per sentence with the amber marker.
- **No metrics block, no format caption, and no Poster or Deck buttons.** The
  poster image opens the full poster. The only buttons are Live demo and Code,
  and they are left out when neither exists.
- **Stack**: 3 or 4 public tools as neutral chips, with no heading, no logos and
  no brand colours. Leave out hosting and compute.

## Project cards (Mike, 17 Nov)

Every project card and Home gallery entry follows these rules. The copy lives in
`src/data/projectCards.ts` (keyed by the source title) and the tag list in
`src/data/tagVocabulary.ts`; `src/data/projectCards.test.ts` fails the build on
any break.

- **Slots, top to bottom:** cover, label, title, description, 3 tags, links.
  Kaggle and Coursework index rows show number, title, description and 2 tags.
- **Label:** `Type of Work · Origin`, built from the first tag's group and
  `projectOrigin.ts` ("Machine Learning · Hackathon").
- **Title:** the project, not the event ("Kiva Loan Funding Speed", not "UNSW
  MA Hackathon 2026"). No "Kaggle", years or course codes. Six words at most.
- **Description:** one sentence, 8 to 14 words, saying what it does or found.
  No model, library, client or sponsor names, no internal infrastructure, no
  jargon a non-ML reader would stop on.
- **Tags:** exactly 3 from the fixed list, main skill first, then method, then
  tool. Generic over specific: "Gradient Boosting", not LightGBM. Named tools
  only when recruiters hire for them by name. No topics, datasets or sponsors.
- **Tag colours:** AI & Agents blue, Machine Learning amber, Data Engineering
  green, Analytics & Viz violet, Tools slate. The Projects filter uses the
  first four groups.
- **New tags** are added to `tagVocabulary.ts` by decision first, then used.
- **New repos** need a `projectCards.ts` entry before they appear; the test
  names any project that has none.

## Motion

- Motion only confirms a change the reader made (filter, expand) or plays once
  on first load. Nothing loops.
- Everything readable is visible without scrolling to trigger it.
- Respect `prefers-reduced-motion`.

## Performance

Firebase stays off the critical path (see `AGENTS.md`). New images ship as WebP
with explicit width and height.
