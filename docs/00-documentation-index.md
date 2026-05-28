# Documentation Index

This folder keeps portfolio maintenance notes, content guidance, and operating
checklists separate from the application source code.

## Core Docs

- [Deployment Guide](01-deployment-guide.md): GitHub Pages and Firebase deployment checks.
- [Portfolio Project Update Guide](02-portfolio-project-update-guide.md): Rules for
  turning GitHub and Kaggle work into consistent project cards.
- [Resume Content Guide](03-resume-content-guide.md): Resume-ready summaries,
  project bullets, keyword banks, and role-specific project groupings.
- [GitHub Profile README Draft](04-github-profile-readme.md): Suggested content for
  the profile repository README.
- [Repository Next Steps](05-repository-next-steps.md): Maintenance roadmap and
  practical improvement checklist.

## Update Workflow

1. Refresh or add project details in GitHub repositories.
2. Run `npm run sync:github-projects`.
3. Review generated cards in `src/data/githubProjects.ts`.
4. Keep curated cards in `src/data/resume.ts` aligned with the project guide.
5. Run `npm run check` before committing meaningful changes.
