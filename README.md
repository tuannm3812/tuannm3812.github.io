# Tuan Nguyen Portfolio

Personal portfolio for Tuan Nguyen, focused on machine learning, data engineering, MLOps, and selected project work.

The site is a React/Vite portfolio with Firebase-backed contact/comment features, GitHub Pages deployment, and automated GitHub project metadata sync.

## Tech Stack

- React 19 with Vite
- TypeScript
- Tailwind CSS
- Firebase Authentication and Firestore
- GitHub Pages deployment via GitHub Actions

## Local Development

Prerequisites:

- Node.js 20 or newer
- npm

Install dependencies:

```bash
npm ci
```

Start the local dev server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
```

Run the TypeScript check:

```bash
npm run lint
```

Run the full local check:

```bash
npm run check
```

## Repository Structure

```text
.github/workflows/   GitHub Pages deployment and project sync workflows
docs/                Portfolio, resume, deployment, and maintenance guides
public/              Static assets, robots.txt, and sitemap.xml
scripts/             Automation scripts such as GitHub project sync
src/                 React application source
```

Key source files:

- `src/data/resume.ts`: curated portfolio, resume, skills, education, and experience content.
- `src/data/githubProjects.ts`: generated GitHub project cards.
- `scripts/sync-github-projects.mjs`: GitHub metadata sync with curated copy overrides.
- `docs/00-documentation-index.md`: documentation index and update workflow.
- `docs/02-portfolio-project-update-guide.md`: project-card writing rules.
- `docs/03-resume-content-guide.md`: resume-ready project and keyword content.
- `docs/05-repository-next-steps.md`: maintenance roadmap.

## Firebase

Firebase is used for contact form submissions and blog comments. The public Firebase web app config lives in `firebase-applet-config.json`; security is enforced through `firestore.rules`.

Before going live, confirm that:

- Firestore is enabled for the Firebase project.
- The deployed domain is added to Firebase Authentication authorized domains.
- Firestore rules are deployed with `firebase deploy --only firestore:rules`.

## Deployment

Pushes to `main` build and publish the site to GitHub Pages using `.github/workflows/deploy.yml`.

The production URL is:

```text
https://tuannm3812.github.io
```

See [docs/01-deployment-guide.md](docs/01-deployment-guide.md) for the deployment checklist.
