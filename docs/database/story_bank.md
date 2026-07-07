# STAR Behavioral Story Bank

This file contains behavioral stories structured according to the **STAR framework** (Situation, Task, Action, Result). These stories address common behavioral questions during job interviews (Leadership, Technical Challenge, Handling Failure, Ambiguity).

---

## Story 1: Cross-Functional Team Leadership & ROI Optimization (Leadership)
* **Domain:** E-commerce (Shopee Vietnam)
* **Core Competencies:** Leadership, Data-Driven Decisions, Communication, Commercial Acumen

* **Situation:** 
  At Shopee Vietnam, growth incentive resources for sellers (discount vouchers, subsidized shipping) were allocated based on static rules or ad-hoc requests, leading to inefficient spend and suboptimal Return on Investment (ROI).
* **Task:** 
  I was tasked with leading a cross-functional analytics project to optimize the seller investment budget and improve incentive ROI. I had to direct a team of 5 data analysts and coordinate with commercial and marketing heads.
* **Action:**
  1. **Analytics Development:** Directed the team to develop a seller clustering model (K-means) and seller churn prediction model in Python using BigQuery data. This segmented sellers by lifecycle stage, sales velocity, and retention risk.
  2. **Cross-functional Alignment:** Conducted workshops with commercial team leaders to translate complex clustering segments into intuitive commercial profiles (e.g., "High-Value At-Risk," "Emerging Stars").
  3. **A/B Test Design:** Designed structured pilot tests to compare the model-driven incentive allocation against the traditional manual allocation rules.
  4. **Executive Reporting:** Built real-time dashboards in Looker Studio to track the pilot's performance and present weekly ROI figures to the country manager.
* **Result:**
  The model-driven allocation improved the ROI of seller investment incentives by **15% year-over-year**, reduced manual reporting requests by **40%**, and the seller classification system was adopted as the standard segmentation framework for Shopee Vietnam's seller growth campaigns.

---

## Story 2: Automating Manual Processes under Scale (Technical Challenge)
* **Domain:** Data Engineering / Automation (Shopee Vietnam)
* **Core Competencies:** System Architecture, Python, SQL, Efficiency, Scaling

* **Situation:**
  Every month, the commercial team had to track acquisition and investment performance. The data was spread across multiple internal platforms, requiring analysts to manually download and merge spreadsheets, which took 3 to 4 days of repetitive work and was prone to human errors.
* **Task:**
  I needed to automate this reporting workflow by building a centralized, scheduled data pipeline in BigQuery that could ingest, clean, and model high-volume e-commerce data.
* **Action:**
  1. **Pipeline Architecture:** Designed and wrote SQL scripts in BigQuery to extract, deduplicate, and join seller transaction records, traffic, and campaign engagement.
  2. **Automation Scripting:** Wrote Python scripts to automatically fetch missing metadata from internal API endpoints and load them into BigQuery tables.
  3. **Scheduling & Alerts:** Configured automated queries and integrated Slack alerts to notify the analytics team of pipeline status, data completeness, or runtime errors.
  4. **Documentation:** Created a schema catalog and pipeline execution map so that other engineers could debug and maintain the pipeline.
* **Result:**
  Reduced manual pipeline execution time by **80%** (saving the team 3 days of work every month). Ensured data was refreshed daily rather than monthly, allowing business teams to spot campaign performance issues within 24 hours instead of waiting until the end of the month.

---

## Story 3: Managing Ambiguity & Consulting (Client Facing / Problem Solving)
* **Domain:** Digital Transformation Consulting (FPT Software)
* **Core Competencies:** Consulting, Ambiguity, Stakeholder Management, Solution Design

* **Situation:**
  A large retail enterprise client wanted to deploy an AI-driven personalization engine but did not have a clear understanding of their customer data structures, resulting in gridlocked IT meetings and unclear project scopes.
* **Task:**
  I was brought in as the Senior Consultant to resolve the gridlock, clarify requirements, and design a digital roadmap for the CRM and analytics implementation.
* **Action:**
  1. **Operational Bottleneck Audits:** Conducted 15+ interviews across sales, marketing, and IT departments to document current manual workflows and data silos.
  2. **Interactive Workshops:** Facilitated cross-functional workshops to align business expectations with technical capabilities, showing client executives how simple rule-based models could serve as immediate baselines.
  3. **Implementation Design:** Coached client teams on agile workflows and translated their loose requirements into structured user stories, database schema requirements, and a 12-month delivery roadmap.
  4. **Predictive Modules:** Co-designed the specifications for the predictive analytics modules (lead scoring and pipeline forecasting).
* **Result:**
  Successfully broke the IT/business gridlock, leading to client approval of the project charter. The subsequent CRM rollout and predictive scoring modules led to a **20% increase in lead-to-opportunity conversion rates** within the first six months of deployment.
