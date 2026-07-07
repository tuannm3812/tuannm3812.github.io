# Project: UNSW MA Hackathon 2026

## 📋 Overview
A data analysis and predictive modeling repository for the UNSW Marketing Analytics Hackathon Challenge 2026. The project analyzes loan-level data from the Kiva micro-lending platform (2016-2025) to identify factors driving prosocial crowdfunding speed in subsistence markets.

* **GitHub Repository:** https://github.com/tuannm3812/unsw-ma-hackathon-2026
* **Tier:** Tier 2 (Strong Applied Project)
* **Target Roles:** Marketing Analytics Specialist, Data Scientist, Quantitative Researcher, Business Intelligence Analyst

---

## 🛠️ Technical Stack
* **Language:** Python
* **Models:** Ridge Regression, Random Forest, Linear Regression
* **NLP Features:** Text length, readability indices, sentiment/emotion intensity
* **Data Processing:** pandas, scikit-learn

---

## ⚙️ Architecture & Implementation details
1. **NLP Text Framing Features:**
   - Extracts semantic features from the borrower's written stories (`description`, `use`, `whySpecial`).
   - Tests whether social impact themes (family, children, health) increase funding speed compared to business-only themes.
2. **Demographic & Financial Controls:**
   - Featurizes borrower count (group vs. individual), gender splits, requested loan amount, and repayment term structures.
3. **Modeling & Hypothesis Testing:**
   - Trains Ridge regression and Random Forest pipelines to predict the target variable `funding_speed_days`.
   - Incorporates country purchasing power parity (`country_ppp`) to control for geographic differences.

---

## 💡 Key Challenges & Solutions
* **Challenge: High Cardinality & Incomplete Narratives.** Text fields in early years (e.g. 2016) had missing values or varied language quality.
  * **Solution:** Applied robust fallback values, standardized language detection, and normalized text lengths to avoid feature scaling issues during regression.

---

## 📈 Impact & Key Metrics
* **Feature Discovery:** Confirmed statistically significant acceleration in funding speed for collective, female-led social-impact loans.
* **Pipeline Delivery:** Modularized codebase with dedicated modules for data loading, feature engineering, and model training.
