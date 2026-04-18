# Deployment to GitHub Pages (Option A)

You have chosen to host your portfolio at **tuannm3812.github.io**. This is a great choice for a developer portfolio!

## 1. Prepare your GitHub Repository
1. Create a new repository on GitHub named exactly **`tuannm3812.github.io`**.
2. Download this project as a ZIP (Settings > Download ZIP) and push the content to your new repository's `main` branch.

## 2. GitHub Actions Setup
I have already created `.github/workflows/deploy.yml` in this project. GitHub will automatically:
*   Install dependencies
*   Build your Vite site
*   Deploy it to your domain

## 3. Enable Deployment on GitHub
1. Go to your repository on GitHub.com.
2. Click **Settings** > **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions** from the dropdown menu.
4. Your site will be live at `https://tuannm3812.github.io` within a few minutes!

## 4. Firebase Configuration
Your portfolio still uses Firebase for the Contact messages and Blog comments. Ensure you have:
1. Created the Firestore Database in your Firebase Console.
2. Added `https://tuannm3812.github.io` to your **Authorized Domains** in the Firebase Authentication settings.
