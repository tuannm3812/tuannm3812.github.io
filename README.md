# Tuan Nguyen Portfolio

Personal portfolio for Tuan Nguyen, focused on machine learning, data engineering, MLOps, and selected project work.

The frontend was generated in Google AI Studio and is kept mostly intact. The surrounding project files are maintained for local development, deployment, and Firebase-backed contact/comment features.

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
