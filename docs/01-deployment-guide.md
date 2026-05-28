# Deployment

This repository is configured for GitHub Pages at:

```text
https://tuannm3812.github.io
```

## GitHub Pages

1. Open the repository on GitHub.
2. Go to **Settings** > **Pages**.
3. Set **Build and deployment** > **Source** to **GitHub Actions**.
4. Push to the `main` branch.

The workflow in `.github/workflows/deploy.yml` installs dependencies with `npm ci`, builds the Vite app, adds a `404.html` fallback for client-side routing, and deploys the `dist` folder.

## Firebase

The site uses Firebase for contact messages and blog comments. Deploy Firestore rules after changes:

```bash
firebase deploy --only firestore:rules
```

In Firebase Console, confirm:

- Firestore Database has been created.
- Google sign-in is configured if blog comments require authentication.
- `tuannm3812.github.io` is listed under Authentication authorized domains.

## Pre-Deployment Checks

Run these locally before publishing meaningful changes:

```bash
npm ci
npm run lint
npm run build
```
