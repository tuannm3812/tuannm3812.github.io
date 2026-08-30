# 🗺️ Repository Roadmap: Frontend & Backend Tasks

This roadmap outlines the pending tasks, setup steps, and next-phase improvements required to fully activate the frontend UI assets and lock down your Firebase backend services.

---

## 🎨 Frontend Status & Improvements

### 1. Resume PDF Asset (Completed)
*   **Status:** `public/assets/tuan-nguyen-resume.pdf` exists and the
    `/experience` page points to it.
*   **Follow-up:** Regenerate the PDF only when the master resume changes.

### 2. Flagship Project Covers (Completed)
*   **Status:** The homepage featured projects use 16:9 cover assets in
    `public/assets/projects/`:
    *   `text-to-sql.jpg` (Enterprise Text-to-SQL)
    *   `meal-planner.jpg` (AI Meal Planner)
    *   `bird-classification.jpg` (Bioacoustic sound classifier)
    *   `airbnb-elt.jpg` (Production ELT Pipeline)
*   **Follow-up:** Replace any generated cover with a more literal project
    screenshot when a deployed UI or architecture diagram is more persuasive.

### 3. Verify Rich Schema Results (Low Priority)
*   **Action Needed:** Once your changes are live on GitHub Pages, copy your portfolio URL and run it through [Google's Rich Results Test tool](https://search.google.com/test/rich-results) to confirm the Person JSON-LD schema metadata is correctly parsed.

### 4. Keep Initial Bundle Size Under Review (Medium Priority)
*   **Status:** The latest build has moved most Firebase weight out of the
    initial route, but the async Firebase chunk is still large.
*   **Action Needed:** Keep Firebase imports route-scoped and consider further
    code-splitting if Blog/Contact become more central to the portfolio.

---

## ⚙️ Backend (Firebase) Pending Tasks & Improvements

### 1. Harden Contact Writes (High Priority)
*   **The Issue:** `firestore.rules` validates contact fields and blocks public
    reads, but still allows unauthenticated public contact creation. A public
    website can be scripted for spam or Firestore write-cost abuse.
*   **Action Needed:** Add Firebase App Check, CAPTCHA-style friction, a
    backend rate-limited contact endpoint, or another protected submission path.
*   **Impact:** Reduces automated abuse risk for the public contact form.

### 2. Deploy Firestore Security Rules (High Priority)
*   **The Issue:** Security rules have been optimized locally in `firestore.rules` (limiting contact writes, blocking unauthorized reads, enforcing length/validations) but must be deployed to the live Firebase console.
*   **Action Needed:** Run the following command in your terminal:
    ```bash
    firebase deploy --only firestore:rules
    ```
*   **Impact:** Secures the database against malicious write sizes and blocks public access to contact records.

### 3. Authorize Domain in Firebase Console (High Priority)
*   **The Issue:** Google Authentication will fail on the live website unless your domain is explicitly authorized.
*   **Action Needed:**
    1.  Open the [Firebase Console](https://console.firebase.google.com/).
    2.  Navigate to **Authentication** > **Settings** > **Authorized Domains**.
    3.  Add `tuannm3812.github.io` to the list.
*   **Impact:** Enables Google Sign-In for comments on the live blog page.

### 4. Add Comment Moderation Controls (High Priority)
*   **The Issue:** Blog comments can be created by authenticated users and read
    publicly, but there is no moderation, delete/update rule, stored owner
    `uid`, known-post allowlist, or admin action path.
*   **Action Needed:** Store `uid`, restrict valid post IDs, add admin
    moderation/delete rules, and consider hiding comments until approved.
*   **Impact:** Keeps public blog discussion useful without making the portfolio
    a permanent unmoderated surface.

### 5. Deploy Composite Indexes (Medium Priority)
*   **The Issue:** Sorting blog comments by timestamp requires Firestore composite indexes.
*   **Action Needed:** Run the following command:
    ```bash
    firebase deploy --only firestore:indexes
    ```

### 6. Verify Resilience in Sandbox Mode (Medium Priority)
*   **Action Needed:** Start your local dev server (`npm run dev`), open the Blog page, and toggle your browser's network tab to "Offline". Confirm that:
    1.  The layout status bar banner appears indicating the database is offline.
    2.  You can type comments, and they persist in `localStorage` without resetting.

### 7. Add Interaction-Focused Tests (Medium Priority)
*   **Action Needed:** Add Firebase Rules tests plus a lightweight browser smoke
    suite for contact submit, Google sign-in failure, comments, and route
    fallback behavior.

---

## 🤖 Agent Collaboration

### 1. Keep the Agent Collaboration Log Current (High Priority)
*   **Action Needed:** After meaningful coding or review work, append a concise
    entry to `docs/08-agent-collaboration-log.md` covering changed files,
    verification, open risks, and handoff notes.

### 2. Reduce Direct-to-Main Automation Risk (Medium Priority)
*   **The Issue:** Scheduled GitHub project sync currently commits generated
    project metadata directly to `main`.
*   **Action Needed:** Consider changing it to open a pull request or require an
    explicit allowlist/priority entry before a generated project becomes
    publishable.
