# 🚀 Flagship Project Refinement Protocol

Use this step-by-step guide to apply your multi-agent workflow (Claude Pro, Cursor, Claude Code, and Antigravity) to systematically optimize, test, and document your four flagship projects.

---

## 🎯 Target Flagship Projects
1.  **AI Meal Planner** (FastAPI, Streamlit, scikit-learn, USDA API, local RAG)
2.  **Enterprise Text-to-SQL Agent** (Gemini/Ollama, schema RAG, SQLGlot, SQLite)
3.  **Bioacoustic Species Classification** (PyTorch, Google Perch v2, EfficientNet-B0)
4.  **Production-Grade ELT Pipeline** (Airflow, dbt, PostgreSQL, Medallion Architecture)

---

## 🔄 Step-by-Step Execution Playbook

Apply this protocol to one project at a time (e.g., starting with **AI Meal Planner**):

### Phase 1: Audit & Diagnostic (Claude Pro Web & Claude Code CLI)
1.  **Map the Codebase:**
    Open the project directory in your terminal and launch **Claude Code**:
    ```bash
    claudecode
    ```
    Ask Claude Code to summarize the entry points and file architecture:
    > *"Show me the project file tree and identify where the main logic, route handlers, and ML models are loaded."*
2.  **Critique for Performance & Security (Claude Pro Web):**
    Zip your core source files (e.g. `/src`, `main.py`, `agent.py`) and upload them to the **Claude Pro Web** interface:
    > *"Analyze these files for code quality, resource leaks (e.g., unclosed connections), security concerns (e.g., prompt injections, database access), and error handling. Provide a list of recommended code improvements."*

---

### Phase 2: Refactoring & UI Polish (Cursor Pro)
1.  **Implement Code Fixes:**
    Open the project in **Cursor**. Use Cursor Composer (`Cmd+I`) to implement the changes proposed in Phase 1.
    *   *For AI Meal Planner:* Add strict Pydantic payload models, add query caching to USDA API fetches, or optimize scikit-learn calorie forecasting latency.
    *   *For Text-to-SQL Agent:* Add SQLGlot AST validation checks for query security, and refine the prompt formatting.
2.  **Refine User Interfaces:**
    Use Cursor to polish your Streamlit or React UI layout (adding visual indicators, hover states, and clear loading messages).

---

### Phase 3: Testing, Containerization & Git Commit (Claude Code CLI)
1.  **Write and Run Tests:**
    In **Claude Code**, run the project tests and ask it to write new test cases for edge cases:
    > *"Run our test suite. Write 3 new unit tests to cover error-handling paths and input validation parameters."*
2.  **Add/Verify Containerization:**
    If missing, ask Claude Code to write a clean `Dockerfile` and `docker-compose.yml` to make the project fully reproducible:
    > *"Create a multi-stage Dockerfile and docker-compose.yml to containerize this FastAPI and Streamlit app."*
3.  **Stage & Commit:**
    Let Claude Code review the diff and commit the changes:
    > *"Review our changes, write a conventional commit message detailing these optimizations, and push to main."*

---

### Phase 4: Portfolio Integration (Antigravity)
1.  **Sync Portfolio Metadata:**
    Return to your portfolio directory and open the **Antigravity** chat:
    ```bash
    npm run sync:github-projects
    ```
2.  **Lock Wording Overrides:**
    Ask Antigravity to verify that your polished project copy is saved under `PROJECT_COPY_OVERRIDES` in [sync-github-projects.mjs](file:///Users/tuannm3812/Library/CloudStorage/GoogleDrive-tuannm3812@gmail.com/My%20Drive/10_Github/3.%20Personal/tuannm3812.github.io/scripts/sync-github-projects.mjs) so subsequent runs don't overwrite your descriptions.
3.  **Re-verify and Build:**
    Run `npm run check` in Antigravity to build and verify your live portfolio page is fully up-to-date.
