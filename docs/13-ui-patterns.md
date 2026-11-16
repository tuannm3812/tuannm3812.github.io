# UI Patterns

Choose a layout for the question the reader brings. Rows marked *planned* have no
implementation yet; see the recruiter hub plan for when they land.

| Reader question | Pattern | Content contract | Where |
| --- | --- | --- | --- |
| Who is this and what does he do? | Hero | Kicker (field · location), one-sentence thesis with one accent phrase, one supporting line, two buttons, captioned portrait | Home |
| Is there enough experience here? | Highlights row | 2–4 figures with labels, each computed or sourced | Home |
| What is his best work? | Ranked index | Every 3-star project in rank order: number, title, impact line, two stack tags, link | Home |
| How does a flagship project hold up? | Flagship card | Rank, primary tech, title, impact line, two bullets, tags, source and demo links | Projects |
| What else has he built? | Collapsed archive | Six cards, then "Show all N". Filters show a flat grid of every match | Projects |
| How does he work? | Principles | Three titled short paragraphs, no icons | Home |
| Where has he worked? | Timeline | Role, company, dates in mono, two-column bullets | Experience |
| What can he do technically? | Skill matrix | Tags grouped by area | Experience |
| What does he think about? | Article list and article | Title, date, reading time; long-form body in the typography style | Blog |
| How do I reach him? | Contact form | Labelled fields, one primary button, plain status messages | Contact |
| *planned:* Which roles does he fit? | Roles line | Target roles, location and work rights, resume button | Home hero |
| *planned:* What did a flagship project achieve? | Case study | Summary strip, problem, approach diagram, results with sourced numbers, demo, deck, limits | `/projects/<name>` |
| *planned:* Where did the work come from? | Origin groups | Personal, Hackathons, Kaggle (featured, simulation, Playground as one entry), Coursework | Projects |
| *planned:* Is he active now? | Notes and results strip | Short posts from LinkedIn with date and link back; a ruled row of placings | Blog, Home |

## Adding a pattern

A new layout is mocked first, Mike picks it, and the decision goes into
[design decisions](15-design-decisions.md) before it is built. Record the reader
question and the content contract here in the same PR.
