# Project: CircleU

## 📋 Overview
A premium, local-first, and privacy-focused iOS voice journaling and reflection companion app. The system allows users to record spoken reflections, receive real-time AI-assisted emotional analysis, and commit to wellbeing goals while keeping data private.

* **GitHub Repository:** https://github.com/tuannm3812/CircleU
* **Tier:** Tier 2 (Strong Applied Project)
* **Target Roles:** iOS Developer, Mobile AI Product Engineer, Swift Developer, Applied AI Product Developer

---

## 🛠️ Technical Stack
* **Language/Framework:** SwiftUI, Swift 6.0
* **Device Target:** iOS 17.0+ (iPhone)
* **Audio & Speech Engine:** Apple Speech Framework (native transcription)
* **AI Cognitive Extraction:** Apple Intelligence & LLM Schemas
* **Database & Sharing:** Firebase Firestore (group circles)

---

## ⚙️ Architecture & Implementation details
1. **Ambient Voice Reflection:**
   - Captures spoken thoughts via microphone-integrated voice check-ins.
   - Leverages Apple's native Speech framework for local real-time transcription, with a fallback keyboard input.
2. **AI Emotional Analysis:**
   - Distills transcriptions into primary emotions, summary cards, and inspirational quotes using standard LLM schemas and Apple Intelligence frameworks.
   - Generates daily relationship and communication challenges (Growth Quests) dynamically based on transcription context.
3. **Firewalled Circle Sharing:**
   - Enforces a privacy-first model: all journaling reflections and insights are kept local on the device.
   - Users can explicitly opt to share select updates inside secure, firewalled group directories backed by Firestore (trusted "Circles").

---

## 💡 Key Challenges & Solutions
* **Challenge: Speech Transcription under Low-Signal/Offline States.** Mobile devices frequently lose network connections, breaking external API-based transcription.
  * **Solution:** Used Apple's local on-device Speech recognizer with local fallback engines to process speech and generate local check-ins without hitting network services.

---

## 📈 Impact & Key Metrics
* **Privacy Enforced:** 100% on-device processing by default; zero reflection data sent to servers without user permission.
* **Modern Tooling:** Fully written in Swift 6.0 utilizing modern concurrency models and SwiftUI layouts.
