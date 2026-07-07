# Career Copilot Operations & Workflow Guide

This document records the exact workflow and command templates to operate your local **Career Copilot & RAG Database** using the Antigravity assistant. 

---

## 📂 System Directory Structure

All of your raw career assets and active job applications are structured as follows:

```text
├── docs/
│   └── database/                       <-- Your Raw Career Knowledge Base
│       ├── experience.md               <-- Professional history (Shopee, FPT, PwC)
│       ├── education_certs.md          <-- Degrees and credentials (UTS, FTU)
│       ├── skills_matrix.md            <-- Technical skill and technology mapping
│       ├── story_bank.md               <-- Behavioral interview stories (STAR method)
│       └── projects/                   <-- Detailed catalog of your 30+ projects
│           ├── ai_meal_planner.md
│           ├── airbnb_elt_warehouse.md
│           └── ... (other markdown project files)
├── jobs/
│   └── active/                         <-- Active Job Applications
│       └── [company-role]/             <-- Subfolder for a specific application
│           ├── jd.txt                  <-- (Input) The raw job description
│           ├── analysis.md             <-- (Output) Match analysis & application strategy
│           ├── tailored_resume.md      <-- (Output) Customized ATS-ready resume
│           ├── cover_letter.md         <-- (Output) Tailored cover letter
│           └── interview_prep.md       <-- (Output) Tailored interview Q&A guide
└── scripts/
    └── parse_projects.py               <-- Utility script to regenerate project files
```

---

## 🔄 The 4-Step Job Application Workflow

When you find a job you want to apply for, follow these steps with Antigravity:

### Step 1: Initialize the Job Workspace
Ask Antigravity to set up the directory:
> **Prompt:** *Initialize career copilot for [company-role]*
* (Example: "Initialize career copilot for google-mle")
* **What happens:** Antigravity creates `jobs/active/[company-role]/` and an empty `jd.txt` file.

### Step 2: Paste the Job Description
Open the created [jd.txt](file:///F:/drive_tuannm3812/My%20Drive/10_Github/3.%20Personal/tuannm3812.github.io/jobs/active/) and paste the target job description text inside.

### Step 3: Run the Tailoring Pipeline
Once the JD is pasted, ask Antigravity to run the tailoring:
> **Prompt:** *Run career copilot tailoring for [company-role]*
* **What happens:** Antigravity reads the JD and all files in `docs/database/` (experience, education, projects, story bank), processes the data, and writes the output files (`analysis.md`, `tailored_resume.md`, `cover_letter.md`, and `interview_prep.md`) to the folder.

### Step 4: Review and Refine
You can ask Antigravity to edit or refine specific outputs directly in the chat:
> **Prompt:** *Antigravity, make the Shopee experience bullets in the tailored resume for [company-role] focus more heavily on MLOps and less on product metrics.*

---

## 💬 Specific Command Copy-Paste Reference

You can copy and paste the following commands to ask Antigravity for specific individual tasks next time:

* **To tailor ONLY the resume:**
  > *Tailor my resume for [company-role]*
* **To generate ONLY the cover letter:**
  > *Write a cover letter for [company-role]*
* **To generate ONLY the interview prep guide:**
  > *Generate interview prep for [company-role]*
* **To add a new project to your database:**
  > *Help me add a new project named "[Project Name]" to my career database. Here are the raw details: [paste details]*

---

## 🛠️ Maintenace: Adding new Projects or Stories
* **To add a project:** Create a new markdown file under `docs/database/projects/` named `project_name.md` using the standard header outline.
* **To add an interview story:** Open [story_bank.md](file:///F:/drive_tuannm3812/My%20Drive/10_Github/3.%20Personal/tuannm3812.github.io/docs/database/story_bank.md) and append a new story block structured with Situation, Task, Action, and Result (STAR).
