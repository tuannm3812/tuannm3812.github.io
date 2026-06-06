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

## Update Workflow

1. Refresh or add project details in GitHub repositories.
2. Run `npm run sync:github-projects`.
3. Review generated cards in `src/data/githubProjects.ts`.
4. Keep curated cards in `src/data/resume.ts` aligned with the project guide.
5. Refresh the profile README source when the portfolio narrative changes.
6. Run `npm run sync:profile-readme` to copy the profile source locally, or let
   the profile README workflow publish it after the change lands on `main`.
7. Run `npm run check` before committing meaningful changes.
