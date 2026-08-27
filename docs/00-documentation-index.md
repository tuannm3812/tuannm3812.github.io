# Documentation Index

This folder keeps the portfolio's operating notes separate from the application
source: deployment checks, project-card rules, resume copy, GitHub profile copy,
and maintenance priorities.

## Core Docs

- [Deployment Guide](01-deployment-guide.md): GitHub Pages, Firebase, and local
  release checks.
- [Portfolio Project Update Guide](02-portfolio-project-update-guide.md): Rules for
  turning GitHub and Kaggle work into consistent project cards.
- [Resume Content Guide](03-resume-content-guide.md): Resume-ready summaries,
  project bullets, keyword banks, and role-specific project groupings.
- [GitHub Profile README](04-github-profile-readme.md): Polished source copy for
  the GitHub profile repository README.
- [Repository Next Steps](05-repository-next-steps.md): Maintenance roadmap and
  practical improvement checklist.
- [LinkedIn About Draft](06-linkedin-about.md): Recruiter-friendly LinkedIn About
  copy with portfolio link and headline options.
- [Career Copilot Operations & Workflow Guide](07-career-copilot-workflow.md): Workflow guide and commands to operate your career RAG database.
- [Agent Collaboration Log](08-agent-collaboration-log.md): Public-safe coding-agent handoff and work log.
- [Master Resume](09-master-resume.md): Source of truth for resume content, and the
  content source for the downloadable PDF.
- [Repository Roadmap](10-repository-roadmap.md): Frontend and Firebase setup tasks
  and next-phase improvements.

## Working Notes

Project-specific drafts and build notes live in [`working/`](working/). They are
kept out of the numbered series because they track one effort rather than the
portfolio's standing operating rules.

- [Multi-Agent Workflow](working/multi-agent-workflow.md)
- [Project Refinement Guide](working/project-refinement-guide.md)
- [Voice Copilot Proposal](working/voice-copilot-proposal.md)
- [Voice Copilot Build Checklist](working/voice-copilot-build-checklist.md)

## Update Workflow

1. Refresh or add project details in GitHub repositories.
2. Run `npm run sync:github-projects`.
3. Review generated cards in `src/data/githubProjects.ts`.
4. Keep curated cards in `src/data/resume.ts` aligned with the project guide.
5. Refresh the profile README source when the portfolio narrative changes.
6. Run `npm run sync:profile-readme` to copy the profile source locally, or let
   the profile README workflow publish it after the change lands on `main`.
7. Run `npm run check` before committing meaningful changes.

## Regenerating the Resume PDF

`public/assets/tuan-nguyen-resume.pdf` backs the download button on the Experience
page. After editing [Master Resume](09-master-resume.md), mirror the change into
`scripts/resume/resume.html` and re-render:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --no-pdf-header-footer \
  --print-to-pdf="public/assets/tuan-nguyen-resume.pdf" \
  scripts/resume/resume.html
```

The published PDF deliberately omits the phone number that the master resume
carries; add it back to `scripts/resume/resume.html` if you want it public.
