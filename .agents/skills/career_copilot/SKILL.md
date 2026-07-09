---
name: career-copilot
description: Commands and procedures to manage the Career database, analyze JDs, tailor resumes/cover letters, and generate interview prep materials using local python automation and Gemini.
---

# Career Copilot & Resume Tailoring Skill

This skill allows Antigravity to act as your Career Assistant. It integrates with your career database in `docs/database/` to automate job application tasks directly in your chat sessions, removing the need for a separate Gemini API key.

## Native Workflows (Executed by Antigravity)

You can ask Antigravity to perform these tasks directly in the chat:

1. **Initialize a Job Application:**
   - **User Command:** "Initialize career copilot for [company-role]"
   - **Antigravity Action:** Creates `jobs/active/[company-role]/jd.txt` with instructions to paste the JD.

2. **Tailor Application Assets (Full Pipeline):**
   - **User Command:** "Run career copilot tailoring for [company-role]"
   - **Antigravity Action:**
     1. Reads `jobs/active/[company-role]/jd.txt`.
     2. Reads the files in `docs/database/` (experience, education, skills, projects, and story bank).
     3. Performs the matching logic natively.
     4. Writes the following files to `jobs/active/[company-role]/`:
        - `analysis.md` (Strategy and keyword analysis)
        - `tailored_resume.md` (Tailored markdown resume)
        - `cover_letter.md` (Tailored cover letter)
        - `interview_prep.md` (Expected Q&A and STAR mappings)

3. **Run Specific Tasks:**
   - "Antigravity, generate interview prep for [company-role]"
   - "Antigravity, write a cover letter for [company-role]"
   - "Antigravity, tailor my resume for [company-role]"

## Assistant Guidelines for executing Career Copilot:

* **Direct Execution:** When the user requests a career copilot action, do NOT run `scripts/career_copilot.py` if they do not have a `GEMINI_API_KEY` set. Instead, read the raw files under `docs/database/` and write the customized markdown outputs yourself using `write_to_file`.
* **Output Structure:** Adhere strictly to the generation formats (e.g., 2-bullet points per project on tailored resumes, STAR method for interview prep) outlined in the database.
* **Keep Database Raw:** Never modify the files in `docs/database/` directly during a tailoring run. All tailored outputs must be saved in `jobs/active/{company-role}/`.
* **Honesty & Integrity:** Ensure that the generated resumes and letters remain truthful to the raw facts inside `docs/database/`.

