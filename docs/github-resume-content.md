# GitHub-Sourced Resume Content

Generated from the latest resume draft and current public GitHub project metadata.

Sources checked:
- Latest resume source: `F:\Downloads\MikeNguyen_Resume.pptx`
- GitHub profile: https://github.com/tuannm3812
- Portfolio: https://tuannm3812.github.io
- Kaggle: https://www.kaggle.com/tuannm3812
- AIPA README: https://github.com/tuannm3812/aipa-text-to-sql-agent

Last refreshed: 2026-05-11

## Formatting Recommendation

For a resume, keep the bullet text normal rather than bolding keywords inside every bullet. Bold can look good in a designed PDF, but it may become noisy and can be inconsistent after ATS parsing. Better pattern:

- Keep bullets plain and action-oriented.
- Put keywords in project titles, tag lines, skills sections, and stack lines.
- Use bold only for section headers or role titles if the resume template already supports it.

## AIPA Repository Update

### Recommended GitHub Repo Description

Secure enterprise text-to-SQL agent using Gemini, schema-grounded prompting, read-only SQL validation, local SQLite execution, and a Streamlit UI.

### Short Version

Enterprise Text-to-SQL Agent using Gemini, Streamlit, SQLite, schema injection, and deterministic SQL safety validation for local data execution.

### Portfolio / Resume Positioning

AIPA is strongest for Applied AI, AI Agent, NLP, and Data Product roles. Its strongest differentiator is not simply "LLM converts text to SQL"; it is the architecture: the LLM receives schema context but never receives the actual database records, while Python validates generated SQL before local execution.

Recommended tags:
AI Agent, Text-to-SQL, Gemini, Prompt Engineering, SQL Safety, Streamlit, SQLite, Local Execution, Data Privacy, Applied AI

## Short Resume Summary Options

### Option A: ML Engineer / Data Professional

Machine Learning Engineer and Data Professional with 7+ years of experience building analytics workflows, predictive models, data pipelines, and deployable ML applications. Skilled across Python, SQL, cloud data platforms, computer vision, NLP, time-series modelling, MLOps, and stakeholder-facing analytics. Public project portfolio includes deep learning systems, Streamlit dashboards, FastAPI services, ELT pipelines, and AI agent prototypes.

### Option B: Engineering-Focused

Machine Learning Engineer focused on turning messy data into reliable ML systems, analytics products, and production-ready workflows. Experienced in Python, SQL, PyTorch, scikit-learn, Airflow, dbt, BigQuery, FastAPI, Streamlit, and CI/CD. Built public projects across bioacoustic classification, image captioning, time-series forecasting, cloud ELT, NLP analysis, and AI agents.

### Option C: Short Profile Header

Machine Learning Engineer and Data Professional building practical ML systems, data pipelines, MLOps workflows, NLP tools, computer vision models, and AI product prototypes.

## Resume Headline Options

- Machine Learning Engineer | Data Engineering | MLOps | NLP and AI Agents
- Machine Learning Engineer and Data Professional | Python, SQL, PyTorch, GCP, MLOps
- Data and ML Engineer | Production ML, Analytics Engineering, AI Applications
- Machine Learning Engineer | Computer Vision, NLP, Time-Series, Data Engineering

## Paste-Ready Project Section

Each project below has two resume-ready bullets and recommended tags. Pick 4-6 projects based on the job post.

### Bioacoustic Species Classification

Recommended for:
ML Engineer, Deep Learning, Audio ML, Computer Vision-adjacent ML, Edge ML, Kaggle, Research Engineering

Tags:
PyTorch, EfficientNet, Google Perch, PCEN, SpecAugment, Bioacoustics, Audio Classification, Edge Inference

- Architected a BirdCLEF+ 2026 bioacoustic classification workspace using EfficientNet-B0, Google Perch v2, PCEN preprocessing, and SpecAugment to model noisy multi-species ecological audio.
- Developed reusable training utilities, exploratory notebooks, and validation workflows for robust species classification across high-noise environmental recordings.

GitHub: https://github.com/tuannm3812/birdclef-2026

### VisionVoice: Image Captioning

Recommended for:
Computer Vision, Deep Learning, Accessibility AI, PyTorch, Image Captioning, Applied ML

Tags:
PyTorch, ResNet, LSTM, Attention, Beam Search, VizWiz, Image Captioning

- Developed an accessibility-focused image captioning system using PyTorch, ResNet-LSTM baselines, attention-based encoder-decoder modelling, and beam search.
- Built exploratory analysis and model experimentation workflows on VizWiz data to improve caption generation quality for real-world image understanding.

GitHub: https://github.com/tuannm3812/VisionVoice

### Flickr8k Image Captioning

Recommended for:
Computer Vision, Deep Learning, Sequence Modelling, Kaggle, PyTorch

Tags:
PyTorch, ResNet50, CNN-LSTM, Attention, BLEU, Kaggle, Model Artifacts

- Built a CNN-LSTM image captioning model with attention using ResNet50 feature extraction, custom PyTorch data loading, and BLEU-based evaluation.
- Systematized a Kaggle-to-GitHub workflow for experiment tracking, saved model artifacts, metadata synchronization, and reproducible notebook development.

GitHub: https://github.com/tuannm3812/flickr-image-captioning

### Production-Grade ELT Pipeline: Airbnb Market Analytics

Recommended for:
Data Engineer, Analytics Engineer, Cloud Data, ELT, dbt, Airflow, Warehouse Modelling

Tags:
Python, Airflow, dbt, PostgreSQL, Medallion Architecture, ELT, Data Lineage, SCD Type 2

- Designed an end-to-end ELT analytics warehouse for Sydney Airbnb and Census data using Apache Airflow, dbt, PostgreSQL, and Bronze-Silver-Gold modelling.
- Automated transformation workflows and historical modelling patterns to support pricing analysis, longitudinal market trends, and reproducible analytical marts.

GitHub: https://github.com/tuannm3812/airbnb-ELT-warehouse

### Solana Price Forecasting Dashboard

Recommended for:
ML Engineer, Time-Series, MLOps, Data Apps, Streamlit, FastAPI, Financial Analytics

Tags:
Python, Streamlit, FastAPI, scikit-learn, Kraken API, Time-Series, Technical Indicators, pytest

- Built a live Solana next-day high prediction system using Kraken OHLCV data, feature engineering, anchored residual modelling, and Streamlit dashboarding.
- Packaged data loading, training, inference, testing, and optional FastAPI serving components for reproducible time-series forecasting workflows.

GitHub: https://github.com/tuannm3812/solana-price-prediction  
Live demo: https://solana-price-prediction-tuannm3812.streamlit.app/

### AIPA: Enterprise Text-to-SQL Agent

Recommended for:
AI Engineer, Applied AI, AI Agent, NLP, Data Product, LLM Application, Secure Analytics

Tags:
Gemini, Text-to-SQL, Streamlit, SQLite, Schema Injection, SQL Safety, Prompt Engineering, Local Execution

- Built a secure text-to-SQL agent that translates natural-language questions into SQLite queries using Gemini while keeping database records in the local execution environment.
- Implemented schema-grounded prompting and deterministic read-only SQL validation to reduce hallucination risk and block destructive commands before query execution.

GitHub: https://github.com/tuannm3812/aipa-text-to-sql-agent  
Live demo: https://aipa-text-to-sql-agent.streamlit.app/

### Gender Equality Policy NLP

Recommended for:
NLP, Policy Analytics, Text Mining, Unstructured Data, Social Impact Analytics

Tags:
Python, NLP, TF-IDF, LDA, K-Means, Clustering, Topic Modelling, Policy Analysis

- Analyzed Australian parliamentary submissions on workplace gender equality policy using text cleaning, TF-IDF feature extraction, topic modelling, clustering, and visualization.
- Compared stakeholder language across unions, industry groups, advocacy bodies, academics, and government sources to identify policy framing patterns.

GitHub: https://github.com/tuannm3812/gender-equality-policy-nlp

### AfriWeave

Recommended for:
NLP, Generative AI, Streamlit Prototype, Tokenization, Cultural Data Products

Tags:
Streamlit, Keras, JAX, BPE, N-gram Models, Transformers, Text Generation, NLP Prototype

- Created an interactive NLP prototype for culturally focused text generation with corpus exploration, N-gram phrase analysis, BPE tokenization, and transformer components.
- Built a lightweight Streamlit interface with deterministic fallback data and testable modules to support demos, portfolio review, and iterative experimentation.

GitHub: https://github.com/tuannm3812/AfriWeave

### FAOSTAT Food Price Shock Dashboard

Recommended for:
Data Analytics, Dashboarding, Data Visualization, Food Security, Public Data, Streamlit

Tags:
Streamlit, Pandas, Plotly, FAOSTAT, World Bank, Food Price Index, Scenario Analysis

- Built a Streamlit dashboard analyzing global food price shocks and import-dependency risk using FAOSTAT producer prices, FAO Food Price Index, Global Hunger Index, and World Bank indicators.
- Added interactive views for commodity trends, volatility, vulnerability mapping, and what-if shock scenarios to support food security risk exploration.

GitHub: https://github.com/tuannm3812/assignment3-faostat-viz  
Live demo: https://assignment3-faostat-viz.streamlit.app/

### Apple Foundation Agent

Recommended for:
Applied AI, Streamlit App, Human-Centered AI, Product Prototype, UX for AI

Tags:
Streamlit, Python, AI Agent, Diagnostic Flow, Scoring Logic, Product Prototype

- Built an interactive Streamlit diagnostic that maps user decisions across recovery, iteration, deployment, legacy systems, and delivery pressure into developer workflow profiles.
- Designed dynamic scoring logic and a polished portfolio-ready interface to demonstrate resilience, creative problem-solving, and applied AI product thinking.

GitHub: https://github.com/tuannm3812/apple-foundation-agent

### AI Meal Planner

Recommended for:
Applied AI, Full-Stack AI, FastAPI, React, Agentic Workflow, Product Engineering

Tags:
FastAPI, React, Gemini, Pydantic, Nutrition Estimation, Agent Workflow, Tailwind

- Built a multi-agent meal-planning prototype that converts a user craving into a structured meal plan, nutrition summary, and supermarket shopping list.
- Implemented FastAPI endpoints, deterministic fallback logic, file-backed user profiles, meal history storage, and a React dashboard for reviewing generated plans.

GitHub: https://github.com/tuannm3812/ai-meal-planner

### Personal Portfolio

Recommended for:
Frontend, Personal Branding, React, TypeScript, GitHub Pages, Portfolio Automation

Tags:
React, TypeScript, Tailwind, Firebase, GitHub Actions, Portfolio, Automation

- Built and maintained a React and TypeScript portfolio showcasing machine learning, data engineering, MLOps, applied AI projects, and profile links.
- Added Firebase-backed contact/comment features, GitHub Pages deployment, and a scheduled GitHub Actions workflow to sync public project metadata.

GitHub: https://github.com/tuannm3812/tuannm3812.github.io  
Live demo: https://tuannm3812.github.io

## Latest Resume Projects Without Public GitHub Links

These appear in the latest resume PPTX but were not found as current public GitHub repositories. Keep them if they are strong for a target role, but use GitHub-backed projects first when employers may click through.

### High-Performance CNN Workflow

Recommended for:
Computer Vision, Deep Learning, Transfer Learning, Model Evaluation

Tags:
MobileNetV3, Transfer Learning, MLP Head, Smart Resizing, F1 Analysis, Image Augmentation

- Developed a two-phase transfer learning workflow using MobileNetV3 and a custom MLP head to reduce catastrophic forgetting during fine-tuning.
- Optimized image ingestion with aspect-ratio-preserving resizing and built per-category F1 diagnostics to debug performance across visually similar classes.

### TikTok Sentiment and Stance Analysis

Recommended for:
NLP, Social Media Analytics, Sentiment Analysis, Classification, Climate Analytics

Tags:
TextBlob, VADER, Sentiment Analysis, Stance Detection, Social Media Text, Classification

- Engineered an NLP pipeline to process high-velocity social media captions and comments, classifying sentiment and stance toward climate change narratives.
- Trained custom classifiers to distinguish awareness-driven support from climate skepticism and extract actionable insights from unstructured youth-demographic data.

### Big Data Lakehouse Pipeline: NYC Taxi

Recommended for:
Big Data, Data Engineering, Distributed ML, Databricks, PySpark

Tags:
PySpark, Databricks, Delta Lake, Feature Engineering, Data Leakage Control, Ridge Regression, Decision Trees

- Developed distributed PySpark workflows in Databricks for ingestion and feature engineering across multi-gigabyte NYC taxi datasets.
- Applied Winsorization, leakage controls, Delta Lake versioning, and supervised models to improve scalable fare prediction workflows.

### Electricity Demand Forecasting

Recommended for:
Time-Series, Forecasting, Energy Analytics, Predictive Modelling

Tags:
HistGradientBoosting, Hyperopt, Weather Features, SILO Data, RMSE Reduction, Energy Demand

- Built an ML pipeline using HistGradientBoosting and Hyperopt to forecast day-ahead electricity demand with meteorological feature integration.
- Engineered seasonal and weather-dependent features that reduced RMSE by 60% compared with baseline forecasting approaches.

### NBA Draft Probability Modeling

Recommended for:
Classification, Sports Analytics, Imbalanced Learning, Model Interpretation

Tags:
XGBoost, LightGBM, SMOTE, AUROC, Feature Importance, Classification, Sports Analytics

- Developed high-precision classification models on 14,000+ NCAA player records to predict professional draft success.
- Achieved AUROC above 0.99 using SMOTE oversampling, cost-sensitive class weighting, and feature-importance analysis for interpretable talent evaluation.

## Compact One-Line Bullet Bank

- Built a BirdCLEF+ 2026 bioacoustic classification workspace using PyTorch, EfficientNet-B0, Google Perch v2, PCEN, and SpecAugment for noisy multi-species audio modelling.
- Developed VisionVoice, a PyTorch image-captioning system using ResNet-LSTM baselines, attention mechanisms, beam search, and accessibility-focused VizWiz data.
- Implemented a CNN-LSTM Flickr8k captioning workflow with ResNet50 features, attention, BLEU evaluation, Kaggle notebooks, and saved model artifacts.
- Designed an ELT analytics warehouse using Airflow, dbt, PostgreSQL, and Bronze-Silver-Gold modelling for Sydney Airbnb market analysis.
- Deployed a Streamlit Solana forecasting dashboard using live Kraken OHLCV data, engineered technical indicators, anchored residual modelling, and optional FastAPI inference.
- Built a Gemini-powered text-to-SQL agent with schema-grounded prompting, deterministic read-only SQL validation, local SQLite execution, and Streamlit delivery.
- Analyzed workplace gender equality policy submissions using NLP, TF-IDF, topic modelling, clustering, and stakeholder language comparison.
- Created AfriWeave, a Streamlit NLP prototype for culturally focused text generation using N-gram baselines, BPE tokenization, and transformer components.
- Built a FAOSTAT food-price shock dashboard combining producer prices, global hunger indicators, import dependency, and interactive what-if analysis.
- Created an Apple Foundation Streamlit diagnostic agent with multi-step scoring logic and polished product-style interaction flows.
- Built an AI meal planner prototype with FastAPI, React, Gemini, structured meal generation, nutrition estimation, and supermarket shopping-list logic.
- Built a React and TypeScript portfolio with Firebase contact/comment features, GitHub Pages deployment, and automated GitHub project sync.

## Technical Skills Section

### Compact Resume Version

Programming: Python, SQL, PySpark, TypeScript, OOP, unit testing, package development  
Data Engineering: Airflow, dbt, BigQuery, PostgreSQL, Snowflake, Databricks, Delta Lake, ELT/ETL, Medallion Architecture  
Machine Learning: scikit-learn, PyTorch, CNN/LSTM, transfer learning, XGBoost, LightGBM, SMOTE, model evaluation  
NLP and AI: text classification, TF-IDF, topic modelling, clustering, text-to-SQL, prompt engineering, AI agents, Gemini  
MLOps and Deployment: FastAPI, Streamlit, Docker, CI/CD, model versioning, pytest, reproducible project structure  
Visualization and Analytics: Plotly, Looker Studio, dashboards, A/B testing, stakeholder reporting

### ATS-Friendly Keyword Bank

Python, SQL, PySpark, PyTorch, scikit-learn, XGBoost, LightGBM, CNN, LSTM, transfer learning, computer vision, image captioning, bioacoustics, NLP, TF-IDF, LDA, K-Means, text-to-SQL, prompt engineering, AI agents, Gemini, schema injection, SQL safety, BigQuery, Airflow, dbt, PostgreSQL, Snowflake, Databricks, Delta Lake, FastAPI, Streamlit, Docker, CI/CD, MLOps, pytest, data pipelines, ELT, ETL, dashboarding, time-series forecasting, API integration, feature engineering, model evaluation, stakeholder communication.

## Refined Experience Add-On Bullets

- Translated ambiguous business problems into structured analytics workflows, predictive models, dashboards, and decision-support tools.
- Built automated data pipelines and reporting workflows to improve repeatability, reduce manual analysis, and support faster stakeholder decisions.
- Developed machine learning approaches for clustering, churn prediction, forecasting, anomaly detection, and recommendation-style decision support.
- Combined business context with technical implementation across Python, SQL, cloud data platforms, dashboarding, and model evaluation.
- Communicated model outputs and analytical trade-offs to non-technical stakeholders, connecting technical work to operational decisions.

## Project Grouping For Resume Versions

### ML Engineer Resume

Prioritize:
- Bioacoustic Species Classification
- VisionVoice
- Flickr8k Image Captioning
- Solana Price Forecasting Dashboard
- Electricity Demand Forecasting
- NBA Draft Probability Modeling

Positioning:
Emphasize modelling choices, feature engineering, validation, evaluation, leakage control, and deployment readiness.

### Data Engineer / Analytics Engineer Resume

Prioritize:
- Production-Grade ELT Pipeline: Airbnb Market Analytics
- Big Data Lakehouse Pipeline: NYC Taxi
- FAOSTAT Food Price Shock Dashboard
- Personal Portfolio automation
- Solana data pipeline and inference workflow

Positioning:
Emphasize orchestration, data modelling, warehouse/lakehouse architecture, API ingestion, dashboarding, lineage, and reproducibility.

### Applied AI / AI Agent Resume

Prioritize:
- AIPA: Enterprise Text-to-SQL Agent
- AI Meal Planner
- AfriWeave
- Apple Foundation Agent
- Gender Equality Policy NLP

Positioning:
Emphasize natural-language interfaces, agents, prompt engineering, local execution, safety validation, user workflows, and structured outputs.

### NLP / Text Analytics Resume

Prioritize:
- AIPA: Enterprise Text-to-SQL Agent
- Gender Equality Policy NLP
- AfriWeave
- TikTok Sentiment and Stance Analysis

Positioning:
Emphasize text processing, schema grounding, sentiment/stance detection, topic modelling, clustering, and applied language systems.

## GitHub Project Inventory

Current public project inventory, including AIPA even though GitHub marks it as a fork.

| Project | Category | Resume Use |
| --- | --- | --- |
| birdclef-2026 | Deep Learning / Audio ML | Strong ML project |
| VisionVoice | Computer Vision / Captioning | Strong ML project |
| flickr-image-captioning | Computer Vision / Captioning | Supporting ML project |
| airbnb-ELT-warehouse | Data Engineering | Strong data engineering project |
| solana-price-prediction | Time-Series / MLOps | Strong deployed ML project |
| aipa-text-to-sql-agent | Applied AI / Text-to-SQL | Strong AI agent project |
| gender-equality-policy-nlp | NLP / Policy Analytics | Strong NLP project |
| AfriWeave | NLP / Generative Prototype | Applied AI project |
| assignment3-faostat-viz | Data Visualization | Dashboard and analytics project |
| apple-foundation-agent | AI / Streamlit Prototype | Product prototype |
| ai-meal-planner | AI Product / Full Stack | Product prototype |
| tuannm3812.github.io | Portfolio / Frontend | Supporting portfolio evidence |

## Resume Links Section

Portfolio: https://tuannm3812.github.io  
GitHub: https://github.com/tuannm3812  
Kaggle: https://www.kaggle.com/tuannm3812  
LinkedIn: https://linkedin.com/in/tuan-m-nguyen

## Notes For Resume Editing

- Keep 4-6 projects in the main resume; move the rest to portfolio/GitHub.
- Match projects to the job post rather than listing every strong project.
- For ML roles, lead with modelling, validation, evaluation, and reproducibility.
- For data engineering roles, lead with ELT, orchestration, warehousing/lakehouse, and dashboards.
- For applied AI roles, lead with AIPA, AI Meal Planner, AfriWeave, and agent-style user workflows.
- Keep bullets normal in the resume body; use project titles, tags, and stack lines for keyword emphasis.
- Use live demo links only when the app is stable and publicly accessible.
