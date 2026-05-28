# Documentation Index

This folder keeps portfolio maintenance notes, content guidance, and operating
checklists separate from the application source code.

## Core Docs

- [Deployment Guide](deployment.md): GitHub Pages and Firebase deployment checks.
- [Portfolio Project Update Guide](portfolio-project-update-guide.md): Rules for
  turning GitHub and Kaggle work into consistent project cards.
- [Resume Content Guide](resume-content-guide.md): Resume-ready summaries,
  project bullets, keyword banks, and role-specific project groupings.
- [GitHub Profile README Draft](github-profile-readme.md): Suggested content for
  the profile repository README.
- [Repository Next Steps](repository-next-steps.md): Maintenance roadmap and
  practical improvement checklist.

## Update Workflow

1. Refresh or add project details in GitHub repositories.
2. Run `npm run sync:github-projects`.
3. Review generated cards in `src/data/githubProjects.ts`.
4. Keep curated cards in `src/data/resume.ts` aligned with the project guide.
5. Run `npm run check` before committing meaningful changes.
