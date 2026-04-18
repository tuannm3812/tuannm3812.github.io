# Deployment to mike-nguyen-portfolio.web.app

You already have the domain `mike-nguyen-portfolio.web.app` reserved in Firebase. Here is how to deploy this minimalist portfolio code to your project:

## 1. Firebase Config Applied
I have already updated your `firebase-applet-config.json` with the credentials for your **mike-nguyen-portfolio** project. The application is now ready to use your real database.

## 2. Authorized Domains
To ensure Google Login and Firebase functions work on your production domain:
1.  In the Firebase Console, go to **Authentication** > **Settings** > **Authorized Domains**.
2.  Ensure `mike-nguyen-portfolio.web.app` and `mike-nguyen-portfolio.firebaseapp.com` are listed.

## 3. Deployment Steps
You will need the `firebase-tools` CLI installed on your local machine to deploy.

1.  **Build the project**:
    ```bash
    npm run build
    ```
2.  **Login to Firebase**:
    ```bash
    firebase login
    ```
3.  **Initialize (if not already)**:
    ```bash
    firebase init hosting
    ```
    *   Select your existing project.
    *   When asked for public directory, enter `dist`.
    *   Configure as a single-page app? **Yes**.
4.  **Deploy**:
    ```bash
    firebase deploy
    ```

## 4. Why use the `firebase.json` provided?
I have already added a `firebase.json` and `firestore.indexes.json` to this repository. These are configured for:
*   **SPA Rewrites**: Ensures that if you refresh the page on `/blog` or `/projects`, it correctly loads the React app.
*   **Firestore Rules**: Links correctly to the `firestore.rules` file in this directory.

---
**Minimalist Design Note**: This site is using the "Clean Minimalism" style with the **Outfit** font and **Vibrant Blue** accents to match your professional brand.
