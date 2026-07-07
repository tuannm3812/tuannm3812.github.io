# Project: Kaggle AI Agent Security

## 📋 Overview
A research and experimentation workspace for the Kaggle "AI Agent Security - Multi-Step Tool Attacks" competition. The project focus is developing attack algorithms that identify reproducible, multi-step failures in tool-using LLM agents (adversarial workflow search).

* **GitHub Repository:** https://github.com/tuannm3812/kaggle-ai-agent-security
* **Tier:** Tier 2 (Strong Applied Project)
* **Target Roles:** AI Security Researcher, LLM Evaluator, AI Safety Engineer, Machine Learning Engineer

---

## 🛠️ Technical Stack
* **Language:** Python 3.12
* **Techniques:** Adversarial Search, Prompt Injection, Adversarial Prompt Engineering, Tool-use Exploitation
* **Environment:** Notebook-first, Kaggle-compatible dependencies

---

## ⚙️ Architecture & Implementation details
1. **Adversarial Tool Exploitation:**
   - Maps agent tool interfaces, system policies, and boundary constraints to identify prompt injection vectors.
2. **Replay Validation:**
   - Replicates the official competition local evaluation environment.
   - Evaluates multi-step tool sequences to check if agent state transitions are deterministic and repeatable.
3. **Attack Manifests:**
   - Tracks candidate attack prompts, model trajectories, and verification results in local JSON/Markdown manifests.

---

## 💡 Key Challenges & Solutions
* **Challenge: Non-Deterministic LLM Behavior.** Adversarial prompts might only trigger failures occasionally, failing the competition's strict replication requirements.
  * **Solution:** Implemented a simulation loop that repeats candidate attacks 5-10 times, filtering out prompts with high variance and selecting only deterministic, 100% replicable attack flows.

---

## 📈 Impact & Key Metrics
* **Local Benchmarking:** Automated local replication suite validating 100% of candidate attacks before submission.
* **Security Auditing:** Uncovered multi-step failure patterns in tool-use policies.
