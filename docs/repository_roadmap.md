# 🗺️ Repository Roadmap: Frontend & Backend Tasks

This roadmap outlines the pending tasks, setup steps, and next-phase improvements required to fully activate the frontend UI assets and lock down your Firebase backend services.

---

## 🎨 Frontend Pending Tasks & Improvements

### 1. Place the Physical Resume PDF Asset (High Priority)
*   **The Issue:** The "Download Resume (PDF)" button on the `/experience` page currently links to `/assets/tuan-nguyen-resume.pdf`. However, the physical PDF file does not exist in the folder yet.
*   **Action Needed:** 
    1.  Compile/Export your latest resume into a PDF.
    2.  Save it as `tuan-nguyen-resume.pdf` inside your `/public/assets/` directory.
*   **Impact:** Fixes the download link for recruiters visiting the `/experience` tab.

### 2. Supply Flagship Project Screenshots (Medium Priority)
*   **The Issue:** The homepage featured projects currently render fallback CSS blue/dark blueprint illustrations. 
*   **Action Needed:**
    1.  Take screenshots of your deployed projects (or create placeholder graphic cards) at a `16:9` aspect ratio.
    2.  Save them in `/public/assets/projects/` as:
        *   `text-to-sql.jpg` (Enterprise Text-to-SQL)
        *   `meal-planner.jpg` (AI Meal Planner)
        *   `bird-classification.jpg` (Bioacoustic sound classifier)
        *   `airbnb-elt.jpg` (Production ELT Pipeline)
    3.  Add the `coverImage` properties pointing to these paths in `src/data/home.tsx` (e.g., `coverImage: '/assets/projects/text-to-sql.jpg'`).
*   **Impact:** Displays high-fidelity visual representations of your actual applications on hover.

### 3. Verify Rich Schema Results (Low Priority)
*   **Action Needed:** Once your changes are live on GitHub Pages, copy your portfolio URL and run it through [Google's Rich Results Test tool](https://search.google.com/test/rich-results) to confirm the Person JSON-LD schema metadata is correctly parsed.

---

## ⚙️ Backend (Firebase) Pending Tasks & Improvements

### 1. Deploy Firestore Security Rules (High Priority)
*   **The Issue:** Security rules have been optimized locally in `firestore.rules` (limiting contact writes, blocking unauthorized reads, enforcing length/validations) but must be deployed to the live Firebase console.
*   **Action Needed:** Run the following command in your terminal:
    ```bash
    firebase deploy --only firestore:rules
    ```
*   **Impact:** Secures the database against malicious write sizes and blocks public access to contact records.

### 2. Authorize Domain in Firebase Console (High Priority)
*   **The Issue:** Google Authentication will fail on the live website unless your domain is explicitly authorized.
*   **Action Needed:**
    1.  Open the [Firebase Console](https://console.firebase.google.com/).
    2.  Navigate to **Authentication** > **Settings** > **Authorized Domains**.
    3.  Add `tuannm3812.github.io` to the list.
*   **Impact:** Enables Google Sign-In for comments on the live blog page.

### 3. Deploy Composite Indexes (Medium Priority)
*   **The Issue:** Sorting blog comments by timestamp requires Firestore composite indexes.
*   **Action Needed:** Run the following command:
    ```bash
    firebase deploy --only firestore:indexes
    ```

### 4. Verify Resilience in Sandbox Mode (Medium Priority)
*   **Action Needed:** Start your local dev server (`npm run dev`), open the Blog page, and toggle your browser's network tab to "Offline". Confirm that:
    1.  The layout status bar banner appears indicating the database is offline.
    2.  You can type comments, and they persist in `localStorage` without resetting.
