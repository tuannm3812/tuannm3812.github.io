# Project: Kaggle Pokémon TCG AI Battle

## 📋 Overview
A research and agent development repository for the Kaggle "Pokémon TCG AI Battle" simulation competition. The project builds a legal Python decision policy and optimized 60-card decks to play automated ladder matches against other competitive agents.

* **GitHub Repository:** https://github.com/tuannm3812/kaggle-pokemon-tcg-ai-battle
* **Tier:** Tier 2 (Strong Applied Project)
* **Target Roles:** Machine Learning Engineer, Simulation/RL Engineer, Game AI Developer, Policy Optimization Specialist

---

## 🛠️ Technical Stack
* **Language:** Python
* **Modeling:** Simulator Ingestion, Game State Featurization, Rule-based Heuristics, Policy Optimization
* **Evaluation:** Gaussian Skill Estimator, paired self-play matchups

---

## ⚙️ Architecture & Implementation details
1. **Decision Policy Engine:**
   - Interfaces with the official Pokémon TCG simulator binaries.
   - Computes state-action values using legal card actions, energy attachments, and retreat rules.
2. **Local Matchup Evaluation:**
   - Replaces average damage metrics with win/draw/loss tracking.
   - Utilizes a Gaussian skill estimate (with decreasing uncertainty over repeated self-play matches) to score agent revisions.
3. **Action-Sequence Verification:**
   - Implements action-sequence diagnostic notebooks that freeze two specific policies, tracking game histories to flag illegal moves or logical loops.

---

## 💡 Key Challenges & Solutions
* **Challenge: Combinatorial Action Spaces.** Choosing the optimal sequence of cards, attacks, and bench setups is highly complex.
  * **Solution:** Designed a priority-based heuristic hierarchy that ranks critical moves (like attaching energy, evolving Pokémon, and attacking) before analyzing hand-utility cards.

---

## 📈 Impact & Key Metrics
* **Robust Evaluation:** Replaced unreliable sample games with robust statistical self-play evaluation reducing rating estimate uncertainty.
* **Deterministic Validation:** Action-sequence tests programmatically eliminated 100% of infinite loops or illegal play state failures.
