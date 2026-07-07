#!/usr/bin/env python3
import os
import sys
import json
import re
import urllib.request
import urllib.error
from pathlib import Path

# Force UTF-8 encoding for stdout/stderr to prevent encoding issues on Windows
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

# Try to load env variables from a local .env file if it exists
def load_dotenv():
    env_path = Path(".env")
    if env_path.exists():
        with open(env_path, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line or line.startswith("#") or "=" not in line:
                    continue
                key, val = line.split("=", 1)
                # Strip quotes
                key = key.strip()
                val = val.strip().strip("'\"")
                os.environ[key] = val

load_dotenv()

# Configuration
DATABASE_DIR = Path("docs/database")
JOBS_DIR = Path("jobs/active")
DEFAULT_MODEL = "gemini-1.5-flash"

def get_api_key():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        print("❌ Error: GEMINI_API_KEY environment variable is not set.")
        print("Please set it in your environment or add it to a local .env file:")
        print("GEMINI_API_KEY=your_api_key_here")
        sys.exit(1)
    return api_key

def call_gemini(prompt, system_instruction=None, model=DEFAULT_MODEL):
    api_key = get_api_key()
    url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={api_key}"
    
    headers = {"Content-Type": "application/json"}
    
    # Structure of the request payload
    contents = [{
        "parts": [{"text": prompt}]
    }]
    
    data = {"contents": contents}
    
    if system_instruction:
        data["systemInstruction"] = {
            "parts": [{"text": system_instruction}]
        }
    
    # Configure generation safety and temperature
    data["generationConfig"] = {
        "temperature": 0.2,
        "topP": 0.95,
        "maxOutputTokens": 8192
    }
    
    req = urllib.request.Request(
        url, 
        data=json.dumps(data).encode("utf-8"), 
        headers=headers, 
        method="POST"
    )
    
    try:
        with urllib.request.urlopen(req) as response:
            res = json.loads(response.read().decode("utf-8"))
            if "candidates" in res and res["candidates"]:
                candidate = res["candidates"][0]
                if "content" in candidate and "parts" in candidate["content"]:
                    return candidate["content"]["parts"][0]["text"]
            raise ValueError(f"Unexpected response structure: {res}")
    except urllib.error.HTTPError as e:
        error_content = e.read().decode("utf-8")
        print(f"❌ Gemini API HTTP Error ({e.code}): {e.reason}")
        try:
            err_json = json.loads(error_content)
            print(json.dumps(err_json, indent=2))
        except Exception:
            print(error_content)
        sys.exit(1)
    except Exception as e:
        print(f"❌ Connection error: {e}")
        sys.exit(1)

def load_database():
    if not DATABASE_DIR.exists():
        print(f"❌ Error: Database directory '{DATABASE_DIR}' does not exist.")
        print("Please run the database initialization steps first.")
        sys.exit(1)
        
    db_content = []
    
    # Read files in order of importance
    core_files = ["experience.md", "education_certs.md", "skills_matrix.md", "story_bank.md"]
    for f_name in core_files:
        path = DATABASE_DIR / f_name
        if path.exists():
            db_content.append(f"=== File: {f_name} ===\n" + path.read_text(encoding="utf-8") + "\n")
            
    # Read projects folder
    projects_dir = DATABASE_DIR / "projects"
    if projects_dir.exists():
        for proj_file in projects_dir.glob("*.md"):
            db_content.append(f"=== File: projects/{proj_file.name} ===\n" + proj_file.read_text(encoding="utf-8") + "\n")
            
    return "\n".join(db_content)

def check_job_folder(job_name):
    job_path = JOBS_DIR / job_name
    jd_file = job_path / "jd.txt"
    
    if not job_path.exists():
        print(f"Creating job directory: {job_path}")
        job_path.mkdir(parents=True, exist_ok=True)
        
    if not jd_file.exists():
        # Create an empty jd.txt to prompt the user
        jd_file.write_text("# Paste the target job description (JD) below this line\n", encoding="utf-8")
        print(f"👉 Created empty JD file at: {jd_file}")
        print("Please paste the job description into that file, then run the script again.")
        sys.exit(0)
        
    jd_content = jd_file.read_text(encoding="utf-8").strip()
    if not jd_content or jd_content.startswith("# Paste"):
        print(f"❌ Error: The job description file {jd_file} is empty.")
        print("Please open it, paste the target job description, and rerun.")
        sys.exit(1)
        
    return jd_content, job_path

def cmd_init(args):
    if len(args) < 1:
        print("Usage: python scripts/career_copilot.py init <company-role>")
        sys.exit(1)
    job_name = args[0]
    check_job_folder(job_name)

def cmd_analyze(args):
    if len(args) < 1:
        print("Usage: python scripts/career_copilot.py analyze <company-role>")
        sys.exit(1)
    
    job_name = args[0]
    jd, job_path = check_job_folder(job_name)
    db = load_database()
    
    print(f"🔍 Analyzing Job Description for '{job_name}'...")
    
    system_instruction = "You are an expert technical recruiter and resume consultant. Your job is to analyze a job description (JD) and cross-reference it with a candidate's career database to construct an application strategy."
    
    prompt = f"""
Candidate Career Database:
```markdown
{db}
```

Target Job Description:
```text
{jd}
```

Please perform a thorough analysis and output a markdown document containing:
1. **Target Information**: Extracted Job Title, Company, and Location.
2. **Key Skill Requirements**: Grouped by Technical Skills (languages, libraries, frameworks) and Professional Skills (domain expertise, leadership, methodology).
3. **Application Strategy**:
   - Which 4-5 projects from the database are the absolute best match for this role and why?
   - How should we frame the candidate's experience at Shopee, FPT, and PwC for this role?
   - What are the major keywords and themes in the JD that we MUST highlight?
4. **Gap Analysis**: What technical skills, tools, or domain experience does the JD require that are either missing or weakly documented in the candidate's database? Propose a mitigation strategy (e.g. framing related projects, certifications, UTS coursework).
"""
    
    analysis = call_gemini(prompt, system_instruction)
    out_file = job_path / "analysis.md"
    out_file.write_text(analysis, encoding="utf-8")
    print(f"✅ Analysis saved to: {out_file}")

def cmd_resume(args):
    if len(args) < 1:
        print("Usage: python scripts/career_copilot.py resume <company-role>")
        sys.exit(1)
        
    job_name = args[0]
    jd, job_path = check_job_folder(job_name)
    db = load_database()
    
    analysis_file = job_path / "analysis.md"
    analysis_context = ""
    if analysis_file.exists():
        analysis_context = f"\n\nPrior Job Analysis:\n{analysis_file.read_text(encoding='utf-8')}"
    
    print(f"📄 Tailoring Resume for '{job_name}'...")
    
    system_instruction = "You are an expert resume writer. You craft high-impact, ATS-optimized, professional markdown resumes that match a job description perfectly while maintaining absolute truthfulness to the candidate's database."
    
    prompt = f"""
Candidate Career Database:
{db}{analysis_context}

Target Job Description:
```text
{jd}
```

Task: Write a tailored markdown resume for the candidate. Follow these structural constraints:
1. **Header**: Name, Title (tailored to match JD, e.g., 'Machine Learning Engineer' or 'Data Professional'), and contact details from the database.
2. **Professional Summary**: A 3-4 sentence paragraph that blends the candidate's 7+ years of experience with the exact requirements of the JD.
3. **Technical Skills**: Structured categories matching the JD requirements. List tools the candidate knows that are mentioned in the JD first.
4. **Selected Projects**:
   - Select the 4-5 most relevant projects from the candidate's database.
   - For each project, write exactly 2 bullet points.
   - Bullet 1: Technical overview, tools used, and system architecture.
   - Bullet 2: Concrete impact, outcomes, metrics, or validation results.
   - Use selective bolding on 2-4 high-signal keywords per bullet (e.g. **PyTorch**, **BigQuery**, **SCD Type 2**).
5. **Professional Experience**:
   - List Shopee Vietnam, FPT Software, and PwC Vietnam in order.
   - Tailor the bullet points to emphasize skills, technologies, and achievements that align directly with the JD requirements.
6. **Education**:
   - UTS Master of Data Science and Innovation.
   - FTU Bachelor of International Economics.
"""
    
    resume = call_gemini(prompt, system_instruction)
    out_file = job_path / "tailored_resume.md"
    out_file.write_text(resume, encoding="utf-8")
    print(f"✅ Tailored resume saved to: {out_file}")

def cmd_cover(args):
    if len(args) < 1:
        print("Usage: python scripts/career_copilot.py cover <company-role>")
        sys.exit(1)
        
    job_name = args[0]
    jd, job_path = check_job_folder(job_name)
    db = load_database()
    
    print(f"✉️ Generating Cover Letter for '{job_name}'...")
    
    system_instruction = "You are a professional cover letter writer. You write compelling, tailored cover letters that connect a candidate's background to a company's specific needs, avoiding generic templates or exaggerations."
    
    prompt = f"""
Candidate Career Database:
{db}

Target Job Description:
```text
{jd}
```

Task: Write a standard 1-page cover letter (3-4 paragraphs, roughly 300-400 words) in markdown format. 
Guidelines:
1. **Opening**: Express genuine interest in the specific company and role. State the core value proposition matching the company's domain.
2. **Body Paragraph 1 (Projects/Technical)**: Focus on 1 or 2 specific projects from the candidate's database that directly address a major problem domain described in the JD (e.g., if the JD is for NLP, discuss the Text-to-SQL agent; if MLOps, discuss the Solana pipeline; if Data Engineering, discuss the Airbnb ELT warehouse).
3. **Body Paragraph 2 (Professional/Commercial Impact)**: Discuss the candidate's professional experience (e.g., at Shopee Vietnam) demonstrating data optimization, ROI growth, team collaboration, and client consulting capabilities.
4. **Closing**: Reiterate alignment, mention the online portfolio (https://tuannm3812.github.io), and politely request an interview.
"""
    
    cover_letter = call_gemini(prompt, system_instruction)
    out_file = job_path / "cover_letter.md"
    out_file.write_text(cover_letter, encoding="utf-8")
    print(f"✅ Cover letter saved to: {out_file}")

def cmd_prep(args):
    if len(args) < 1:
        print("Usage: python scripts/career_copilot.py prep <company-role>")
        sys.exit(1)
        
    job_name = args[0]
    jd, job_path = check_job_folder(job_name)
    db = load_database()
    
    resume_file = job_path / "tailored_resume.md"
    resume_context = ""
    if resume_file.exists():
        resume_context = f"\n\nTailored Resume:\n{resume_file.read_text(encoding='utf-8')}"
    
    print(f"🤝 Generating Interview Prep Guide for '{job_name}'...")
    
    system_instruction = "You are an elite interview coach preparing a senior candidate for a technical/behavioral interview in Data Science, ML Engineering, or Data Engineering."
    
    prompt = f"""
Candidate Career Database:
{db}{resume_context}

Target Job Description:
```text
{jd}
```

Task: Generate a comprehensive markdown Interview Prep Guide containing:
1. **Key Expected Technical Questions (5 questions)**:
   - Identify the 5 most probable technical questions (covering system design, algorithms, pipelines, or models) for this specific role.
   - For each question, provide a structured, concise response tailored to the candidate's database projects and experience.
2. **Behavioral Interview Mapping (5 questions)**:
   - Identify 5 key behavioral questions (e.g. handling technical disagreement, dealing with failure, showing leadership, managing stakeholder expectations).
   - Match each question to the most relevant STAR story in the candidate's `story_bank.md` database.
   - Write out exactly how the candidate should customize/tell that story for *this* company.
3. **Questions for the Interviewer (3-4 questions)**:
   - Draft highly strategic, role-specific questions the candidate can ask the interviewers to show depth of engagement (e.g., about engineering practices, scale, metrics, or team dynamics).
"""
    
    prep_guide = call_gemini(prompt, system_instruction)
    out_file = job_path / "interview_prep.md"
    out_file.write_text(prep_guide, encoding="utf-8")
    print(f"✅ Interview prep guide saved to: {out_file}")

def cmd_all(args):
    if len(args) < 1:
        print("Usage: python scripts/career_copilot.py all <company-role>")
        sys.exit(1)
    
    job_name = args[0]
    cmd_analyze([job_name])
    cmd_resume([job_name])
    cmd_cover([job_name])
    cmd_prep([job_name])
    print(f"\n🎉 Career Copilot run finished successfully! All files are generated in: {JOBS_DIR / job_name}")

def main():
    if len(sys.argv) < 2:
        print("Career Copilot - CLI Tool")
        print("Usage:")
        print("  python scripts/career_copilot.py init <company-role>    - Initialize job directory with jd.txt")
        print("  python scripts/career_copilot.py analyze <company-role> - Run JD analysis and keyword check")
        print("  python scripts/career_copilot.py resume <company-role>  - Tailor resume for the JD")
        print("  python scripts/career_copilot.py cover <company-role>   - Generate customized cover letter")
        print("  python scripts/career_copilot.py prep <company-role>    - Generate interview Q&A guide")
        print("  python scripts/career_copilot.py all <company-role>     - Run all of the above steps")
        sys.exit(1)
        
    cmd = sys.argv[1]
    cmd_args = sys.argv[2:]
    
    commands = {
        "init": cmd_init,
        "analyze": cmd_analyze,
        "resume": cmd_resume,
        "cover": cmd_cover,
        "prep": cmd_prep,
        "all": cmd_all
    }
    
    if cmd not in commands:
        print(f"❌ Unknown command: {cmd}")
        sys.exit(1)
        
    commands[cmd](cmd_args)

if __name__ == "__main__":
    main()
