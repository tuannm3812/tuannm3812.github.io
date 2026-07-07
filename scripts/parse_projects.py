#!/usr/bin/env python3
import os
import sys
import re
import shutil
from pathlib import Path

# Force UTF-8 encoding for stdout/stderr to prevent encoding issues on Windows
if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

SOURCE_FILE = Path("docs/03-resume-content-guide.md")
DEST_DIR = Path("docs/database/projects")

def sanitize_filename(name):
    # Remove special characters and replace spaces/hyphens with underscores
    name = re.sub(r"[^\w\s-]", "", name).strip().lower()
    return re.sub(r"[-\s]+", "_", name)

def main():
    if not SOURCE_FILE.exists():
        print(f"Error: Source file {SOURCE_FILE} not found.")
        return

    # Clean destination directory to avoid stale files
    if DEST_DIR.exists():
        print(f"Cleaning existing directory: {DEST_DIR}")
        shutil.rmtree(DEST_DIR)
    
    DEST_DIR.mkdir(parents=True, exist_ok=True)
    content = SOURCE_FILE.read_text(encoding="utf-8")

    # We want to find all segments starting with "### " and ending before the next "### " or "## "
    segments = content.split("\n### ")
    
    # The first segment is the file header before any "### "
    project_segments = segments[1:]
    
    count = 0
    for seg in project_segments:
        # Stop if we hit a main section like "## " (which marks the end of projects)
        if seg.strip().startswith("## "):
            seg = seg.split("\n## ")[0]
            
        lines = seg.strip().split("\n")
        if not lines:
            continue
            
        header = lines[0].strip()
        
        # Parse title and category from header, e.g. "Title (Category)" or just "Title"
        header_match = re.match(r"^(.*?)\s*\((.*?)\)$", header)
        if header_match:
            title = header_match.group(1).strip()
            category = header_match.group(2).strip()
        else:
            title = header
            category = "Uncategorized"
            
        # Ignore sections that are not actual projects
        title_lower = title.lower()
        ignore_terms = [
            "option", "tier", "replaced by", "compact", "keyword bank", 
            "resume version", "skills section", "resume projects", "headline", 
            "formatting recommendation", "short resume summary"
        ]
        if any(term in title_lower for term in ignore_terms):
            continue
            
        # Also filter out generic non-project titles containing "resume"
        if "resume" in title_lower and not any(kw in title_lower for kw in ["agent", "planner", "pipeline", "forecasting", "model"]):
            continue

        # Parse fields
        recommended_for = ""
        tags = ""
        github = ""
        demo = ""
        bullets = []
        
        current_section = None
        for line in lines[1:]:
            line_str = line.strip()
            if line_str.startswith("Recommended for:"):
                current_section = "rec"
                continue
            elif line_str.startswith("Tags:"):
                current_section = "tags"
                continue
            elif line_str.startswith("GitHub:"):
                github = line_str.replace("GitHub:", "").strip()
                current_section = None
                continue
            elif line_str.startswith("Live demo:"):
                demo = line_str.replace("Live demo:", "").strip()
                current_section = None
                continue
            elif line_str.startswith("- "):
                bullets.append(line_str)
                current_section = None
                continue
                
            if current_section == "rec" and line_str:
                recommended_for = line_str
            elif current_section == "tags" and line_str:
                tags = line_str

        # Format markdown template
        filename = sanitize_filename(title) + ".md"
        filepath = DEST_DIR / filename
        
        # If no bullets were found, it's probably not a project
        if not bullets and not github:
            continue
            
        markdown_body = f"""# Project: {title}

## 📋 Overview
* **Category:** {category}
* **Tier:** (Auto-parsed from Resume Content Guide)
* **Target Roles:** {recommended_for}
* **GitHub Repository:** {github}
"""
        if demo:
            markdown_body += f"* **Live Demo:** {demo}\n"
            
        markdown_body += f"""
---

## 🛠️ Technical Stack
* **Key Skills/Tools:** {tags}

---

## ⚙️ Architecture & Implementation details
### Core Contributions
"""
        for bullet in bullets:
            markdown_body += f"{bullet}\n"
            
        markdown_body += """
---

## 💡 Key Challenges & Solutions
* **Challenge:** (Add details about technical challenges encountered and how they were resolved)
* **Solution:** (Add solution details)

---

## 📈 Impact & Key Metrics
* (Add metrics, optimization details, or performance results)
"""
        filepath.write_text(markdown_body, encoding="utf-8")
        print(f"Parsed: {title} -> {filepath.name}")
        count += 1
        
    print(f"Successfully parsed {count} projects and wrote them to {DEST_DIR}")

if __name__ == "__main__":
    main()
