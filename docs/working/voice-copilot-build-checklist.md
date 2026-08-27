# 🛠️ Build Checklist: Live Voice Interview Copilot

Use this step-by-step checklist to build and configure your **Live Voice Interview Copilot** as a standalone local application.

---

## 📂 Step 1: Initialize the Project Workspace

1.  Create a new directory named `interview-voice-copilot` in your Personal folder (next to your portfolio directory).
2.  Inside the folder, set up this directory tree:
    ```text
    interview-voice-copilot/
    ├── backend/
    │   ├── app/
    │   │   ├── __init__.py
    │   │   ├── main.py
    │   │   ├── database.py
    │   │   ├── audio.py
    │   │   └── copilot.py
    │   └── requirements.txt
    ├── frontend/
    │   ├── src/
    │   │   ├── App.tsx
    │   │   ├── main.tsx
    │   │   ├── index.css
    │   │   └── hooks/
    │   │       └── useAudioStream.ts
    │   ├── package.json
    │   └── vite.config.ts
    ├── .env
    └── README.md
    ```

---

## ⚙️ Step 2: Configure Environment Variables

Create a `.env` file in the root of the project with the following configuration:
```env
# Path to your portfolio career database files
PORTFOLIO_DIR=/Users/tuannm3812/Library/CloudStorage/GoogleDrive-tuannm3812@gmail.com/My Drive/10_Github/3. Personal/tuannm3812.github.io

# API Credentials
GEMINI_API_KEY=your_gemini_api_key_here
DEEPGRAM_API_KEY=your_deepgram_api_key_here
```

---

## 🐍 Step 3: Set Up the FastAPI Backend

### 1. Requirements (`backend/requirements.txt`)
Install dependencies:
```text
fastapi
uvicorn
websockets
python-dotenv
google-generativeai
deepgram-sdk
pydantic
```

### 2. Database Loader (`backend/app/database.py`)
Write a script that reads and parses your local portfolio markdown files:
```python
import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()
PORTFOLIO_DIR = os.getenv("PORTFOLIO_DIR")

def load_career_context() -> str:
    db_path = Path(PORTFOLIO_DIR) / "docs" / "database"
    context_parts = []
    
    # Read core files
    core_files = ["experience.md", "skills_matrix.md", "education_certs.md", "story_bank.md"]
    for filename in core_files:
        filepath = db_path / filename
        if filepath.exists():
            context_parts.append(f"### {filename.upper()}\n{filepath.read_text()}")
            
    # Read individual project details
    projects_path = db_path / "projects"
    if projects_path.exists():
        context_parts.append("### TECHNICAL PROJECTS DETAILS")
        for proj_file in projects_path.glob("*.md"):
            context_parts.append(proj_file.read_text())
            
    return "\n\n".join(context_parts)

def load_job_description(company_role: str) -> str:
    jd_path = Path(PORTFOLIO_DIR) / "jobs" / "active" / company_role / "jd.txt"
    analysis_path = Path(PORTFOLIO_DIR) / "jobs" / "active" / company_role / "analysis.md"
    
    jd_text = jd_path.read_text() if jd_path.exists() else ""
    analysis_text = analysis_path.read_text() if analysis_path.exists() else ""
    
    return f"JOB DESCRIPTION:\n{jd_text}\n\nAPPLICATION STRATEGY:\n{analysis_text}"
```

### 3. Speech-to-Text & Gemini Streaming (`backend/app/copilot.py`)
Define the prompt and streaming connection to Gemini 1.5 Flash:
```python
import os
import google.generativeai as genai
from app.database import load_career_context, load_job_description

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

SYSTEM_PROMPT = """You are an elite real-time Interview Copilot assisting Tuan Nguyen. 
Your goal is to read the transcribed question from the interviewer and instantly draft key bullet points he can reference to answer.

RULES:
1. Keep suggestions ultra-short and readable at a glance (use bold keys and bullet points).
2. Reference specific projects and actual metrics from his background (e.g. 15% ROI increase at Shopee, 90% audit reduction).
3. Do NOT write full sentences or paragraphs. Use structural lists.
"""

def generate_copilot_stream(question: str, company_role: str):
    career_context = load_career_context()
    job_context = load_job_description(company_role)
    
    prompt = f"{SYSTEM_PROMPT}\n\nCAREER HISTORY:\n{career_context}\n\nTARGET JOB:\n{job_context}\n\nQUESTION: {question}"
    
    model = genai.GenerativeModel("gemini-1.5-flash")
    response = model.generate_content(prompt, stream=True)
    for chunk in response:
        yield chunk.text
```

---

## 🎨 Step 4: Build the Frontend (React + Vite)

### 1. Audio Stream Hook (`frontend/src/hooks/useAudioStream.ts`)
Write a custom hook using the MediaRecorder API to stream mic data to the backend:
```typescript
import { useEffect, useRef, useState } from 'react';

export function useAudioStream(onTranscript: (text: string) => void) {
  const [isRecording, setIsRecording] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  const startStream = async () => {
    socketRef.current = new WebSocket('ws://localhost:8000/ws/audio');
    
    socketRef.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.transcript) {
        onTranscript(data.transcript);
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' });
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0 && socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.send(event.data);
      }
    };

    mediaRecorder.start(250); // Stream chunks every 250ms
    setIsRecording(true);
  };

  const stopStream = () => {
    mediaRecorderRef.current?.stop();
    socketRef.current?.close();
    setIsRecording(false);
  };

  return { isRecording, startStream, stopStream };
}
```

### 2. Split-Screen Layout (`frontend/src/App.tsx`)
Render the transcript on the left and the LLM's streaming answer cards on the right.

---

## 🔊 Step 5: System Audio Routing (For Zoom / Google Meet)

To capture the interviewer's voice coming out of Zoom/Meet as well as your own voice:
1.  Install **BlackHole 2ch** (Free macOS virtual audio loopback driver).
2.  In macOS **Audio MIDI Setup**, create a **Multi-Output Device** combining your headphones and **BlackHole 2ch**.
3.  Set Zoom/Meet output to this Multi-Output Device.
4.  Run the Copilot app, set the browser mic source to **BlackHole 2ch** (capturing what is played) or use a Multi-Input setup to capture both your mic and BlackHole.
