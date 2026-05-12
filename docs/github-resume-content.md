# GitHub-Sourced Resume Content

Generated from the latest resume draft and current public GitHub project metadata.

Sources checked:
- Latest resume source: `F:\Downloads\MikeNguyen_Resume.pptx`
- GitHub profile: https://github.com/tuannm3812
- Portfolio: https://tuannm3812.github.io
- Kaggle: https://www.kaggle.com/tuannm3812
- AIPA default branch README: https://github.com/tuannm3812/aipa-text-to-sql-agent/tree/tuannm3812/main-refinement
- Current public GitHub repository descriptions, languages, and README summaries for all listed projects

Last refreshed: 2026-05-11

## Formatting Recommendation

For a designed PDF resume, use selective bolding inside project bullets to guide the reader's eye. Keep the emphasis restrained so the bullets stay professional and ATS-readable:

- Highlight only 2-4 high-signal terms per bullet.
- Put keywords in project titles, tag lines, skills sections, and stack lines.
- Avoid bolding full clauses or entire sentences.

## AIPA Repository Update

### Recommended GitHub Repo Description

Enterprise text-to-SQL agent using hybrid schema RAG, Gemini/Ollama backends, SQLGlot-assisted read-only validation, local SQLite execution, Streamlit UI, and evaluation tests.

### Short Version

Enterprise Text-to-SQL Agent using Gemini/Ollama, hybrid schema RAG, Streamlit, SQLite, SQLGlot-assisted safety validation, local execution, tests, and evaluation workflows.

### Portfolio / Resume Positioning

AIPA is strongest for Applied AI, AI Agent, NLP, and Data Product roles. Its strongest differentiator is not simply "LLM converts text to SQL"; it is the architecture: the LLM receives only retrieved schema metadata, never raw database rows, while Python validates generated SQL before local read-only execution. The default branch implements hybrid schema RAG using lexical, semantic, value-hint, and foreign-key graph signals.

Recommended tags:
AI Agent, Text-to-SQL, Gemini, Ollama, Schema RAG, Hybrid Retrieval, Prompt Engineering, SQLGlot, SQL Safety, Streamlit, SQLite, Local Execution, Data Privacy, Applied AI

## Short Resume Summary Options

### Option A: ML Engineer / Data Professional

Machine Learning Engineer and Data Professional with 7+ years of experience building analytics workflows, predictive models, data pipelines, and deployable ML applications. Skilled across Python, SQL, cloud data platforms, computer vision, NLP, time-series modelling, MLOps, and stakeholder-facing analytics. Public project portfolio includes deep learning systems, Streamlit dashboards, FastAPI services, ELT/lakehouse pipelines, and AI agent prototypes.

### Option B: Engineering-Focused

Machine Learning Engineer focused on turning messy data into reliable ML systems, analytics products, and production-ready workflows. Experienced in Python, SQL, PyTorch, scikit-learn, Airflow, dbt, Snowflake, Databricks, FastAPI, Streamlit, and CI/CD. Built public projects across bioacoustic classification, image captioning, time-series forecasting, lakehouse analytics, NLP analysis, and AI agents.

### Option C: Short Profile Header

Machine Learning Engineer and Data Professional building practical ML systems, lakehouse pipelines, MLOps workflows, NLP tools, computer vision models, and AI product prototypes.

## Resume Headline Options

- Machine Learning Engineer | Data Engineering | MLOps | NLP and AI Agents
- Machine Learning Engineer and Data Professional | Python, SQL, PyTorch, Snowflake, MLOps
- Data and ML Engineer | Production ML, Lakehouse Analytics, AI Applications
- Machine Learning Engineer | Computer Vision, NLP, Time-Series, Data Engineering

## Paste-Ready Project Section

Each project below has two resume-ready bullets and recommended tags. Pick 4-6 projects based on the job post.

### Tier 1: Flagship And Most Complex Projects

Use these first when a resume needs the strongest technical evidence.

### AIPA: Enterprise Text-to-SQL Agent

Recommended for:
AI Engineer, Applied AI, AI Agent, NLP, Data Product, LLM Application, Secure Analytics

Tags:
Gemini/Ollama, Text-to-SQL, Streamlit, SQLite, Schema RAG, Hybrid Retrieval, SQLGlot, SQL Safety, Local Execution, Evaluation

- Built a **text-to-SQL agent** that retrieves relevant schema chunks using **hybrid retrieval**, value-hint, and foreign-key graph signals before prompting Gemini or Ollama.
- Implemented **local SQLite execution** with **SQLGlot-assisted validation**, SQLite authorizer controls, query repair, Streamlit delivery, tests, and an evaluation harness.

GitHub: https://github.com/tuannm3812/aipa-text-to-sql-agent  
Live demo: https://aipa-text-to-sql-agent.streamlit.app/

### Production-Grade ELT Pipeline: Airbnb Market Analytics

Recommended for:
Data Engineer, Analytics Engineer, Cloud Data, ELT, dbt, Airflow, Warehouse Modelling

Tags:
Python, Airflow, dbt, PostgreSQL, Medallion Architecture, ELT, Data Lineage, SCD Type 2

- Designed an **end-to-end ELT analytics warehouse** combining Sydney Airbnb listings, ABS Census data, and NSW LGA mapping using **Airflow**, **dbt**, PostgreSQL, and Bronze-Silver-Gold modelling.
- Automated **sequential monthly processing** and **SCD Type 2 snapshots** to preserve historical host, property, neighbourhood, and LGA state for longitudinal market analysis.

GitHub: https://github.com/tuannm3812/airbnb-ELT-warehouse

### NYC Taxi Databricks

Recommended for:
Data Engineering, Big Data, Databricks, PySpark, Lakehouse Analytics

Tags:
PySpark, Databricks, Delta Lake, Feature Engineering, Taxi Analytics, Lakehouse

- Built a **PySpark and Delta Lake** workflow for NYC green and yellow taxi trip analytics in **Databricks**.
- Developed **lakehouse-ready ingestion** and analytical processing for scalable urban mobility data exploration.

GitHub: https://github.com/tuannm3812/NYC-Taxi-Databricks

### Solana Price Forecasting Dashboard

Recommended for:
ML Engineer, Time-Series, MLOps, Data Apps, Streamlit, FastAPI, Financial Analytics

Tags:
Python, Streamlit, FastAPI, scikit-learn, Kraken API, Time-Series, Technical Indicators, pytest

- Built a **live Solana forecasting** system using **Kraken OHLCV data**, feature engineering, anchored residual modelling, and Streamlit dashboarding.
- Packaged **data loading**, training, inference, testing, and optional **FastAPI serving** components for reproducible time-series forecasting workflows.

GitHub: https://github.com/tuannm3812/solana-price-prediction  
Live demo: https://solana-price-prediction-tuannm3812.streamlit.app/

### Bioacoustic Species Classification

Recommended for:
ML Engineer, Deep Learning, Audio ML, Computer Vision-adjacent ML, Edge ML, Kaggle, Research Engineering

Tags:
PyTorch, EfficientNet, Google Perch, PCEN, SpecAugment, Bioacoustics, Audio Classification, Edge Inference

- Architected a **BirdCLEF+ 2026** bioacoustic classification workspace using **EfficientNet-B0**, **Google Perch v2**, PCEN preprocessing, and SpecAugment to model noisy multi-species ecological audio.
- Developed **reusable training utilities**, exploratory notebooks, and **validation workflows** for robust species classification across high-noise environmental recordings.

GitHub: https://github.com/tuannm3812/birdclef-2026

### Tier 2: Strong Applied ML, Data, And AI Projects

Use these to tailor toward ML, analytics, dashboarding, or applied AI roles.

### VisionVoice: Image Captioning

Recommended for:
Computer Vision, Deep Learning, Accessibility AI, PyTorch, Image Captioning, Applied ML

Tags:
PyTorch, ResNet-LSTM, Bahdanau Attention, Beam Search, VizWiz, Image Captioning

- Built an **accessibility-focused VizWiz** image captioning system with rerunnable EDA and modelling notebooks for **leakage-free** internal train/validation/test splits.
- Compared **ResNet-LSTM** and **Bahdanau-style attention** models through reproducible evaluation and qualitative caption review.

GitHub: https://github.com/tuannm3812/VisionVoice

### Flickr8k Image Captioning

Recommended for:
Computer Vision, Deep Learning, Sequence Modelling, Kaggle, PyTorch

Tags:
PyTorch, VGG16, ResNet50, CNN-LSTM, Additive Attention, Beam Search, Kaggle, Model Artifacts

- Compared baseline **CNN-LSTM**, attention CNN-LSTM, and **ResNet50 attention** captioning systems with tracked Kaggle artifacts and qualitative inference examples.
- Refined caption quality using **ResNet50 spatial features**, additive attention, mixed precision, scheduling, and beam-search decoding.

GitHub: https://github.com/tuannm3812/flickr-image-captioning

### YouTube Trending Snowflake Lakehouse

Recommended for:
Data Engineering, Snowflake, Analytics Engineering, API Ingestion, Media Analytics

Tags:
Python, Snowflake, YouTube Data API, Lakehouse, Data Cleaning, Analytics

- Built a **Snowflake workflow** for ingesting, cleaning, and analyzing multi-country **YouTube Trending** data.
- Supported optional **YouTube Data API** refreshes for repeatable trend analysis across country-level datasets.

GitHub: https://github.com/tuannm3812/youtube-trending-snowflake-lakehouse

### Gender Equality Policy NLP

Recommended for:
NLP, Policy Analytics, Text Mining, Unstructured Data, Social Impact Analytics

Tags:
Python, NLP, TF-IDF, LDA, K-Means, Clustering, Topic Modelling, Policy Analysis

- Analyzed **Australian parliamentary submissions** on workplace gender equality policy using text cleaning, **TF-IDF**, topic modelling, clustering, and visualization.
- Compared **stakeholder language** across unions, industry groups, advocacy bodies, academics, and government sources to identify **policy framing patterns**.

GitHub: https://github.com/tuannm3812/gender-equality-policy-nlp

### AI Meal Planner

Recommended for:
Applied AI, Full-Stack AI, FastAPI, React, Agentic Workflow, Product Engineering

Tags:
FastAPI, React, Gemini, Pydantic, Nutrition Estimation, Agent Workflow, Tailwind

- Built a **multi-agent meal-planning** prototype that converts a user craving into a structured meal plan, **nutrition summary**, and supermarket shopping list.
- Implemented **FastAPI endpoints**, deterministic fallback logic, file-backed user profiles, meal history storage, and a **React dashboard** for reviewing generated plans.

GitHub: https://github.com/tuannm3812/ai-meal-planner

### FAOSTAT Food Price Shock Dashboard

Recommended for:
Data Analytics, Dashboarding, Data Visualization, Food Security, Public Data, Streamlit

Tags:
Streamlit, Pandas, Plotly, FAOSTAT, World Bank, Food Price Index, Scenario Analysis

- Built a **Streamlit dashboard** analyzing global food price shocks and **import-dependency risk** using FAOSTAT, FAO, Global Hunger Index, and World Bank indicators.
- Added **interactive views** for commodity trends, volatility, vulnerability mapping, and **what-if shock scenarios** to support food security risk exploration.

GitHub: https://github.com/tuannm3812/assignment3-faostat-viz  
Live demo: https://assignment3-faostat-viz.streamlit.app/

### Tier 3: Focused Supporting Projects

### Sydney Rainfall Forecasting

Recommended for:
ML Engineer, Time-Series, Forecasting, Streamlit, Weather Analytics

Tags:
Python, Streamlit, scikit-learn, joblib, Open-Meteo, Forecasting

- Built a **rainfall forecasting app** with Open-Meteo data, **scikit-learn** models, and joblib artifacts.
- Deployed a **Streamlit dashboard** for reviewing Sydney rainfall forecasts through a simple portfolio-ready interface.

GitHub: https://github.com/tuannm3812/sydney-rainfall-forecasting  
Live demo: https://sydney-rainfall-forecasting.streamlit.app/

### AfriWeave

Recommended for:
NLP, Generative AI, Streamlit Prototype, Tokenization, Cultural Data Products

Tags:
Streamlit, Keras, JAX, BPE, N-gram Models, Transformers, Text Generation, NLP Prototype

- Created an **interactive NLP prototype** for culturally focused text generation with corpus exploration, **BPE tokenization**, and transformer components.
- Built a lightweight **Streamlit interface** with deterministic fallback data and **testable modules** to support demos, portfolio review, and iterative experimentation.

GitHub: https://github.com/tuannm3812/AfriWeave

### Apple Foundation Agent

Recommended for:
Applied AI, Streamlit App, Human-Centered AI, Product Prototype, UX for AI

Tags:
Streamlit, Python, AI Agent, Diagnostic Flow, Scoring Logic, Product Prototype

- Built an **interactive Streamlit diagnostic** that maps user decisions across recovery, iteration, deployment, legacy systems, and delivery pressure into developer workflow profiles.
- Designed **dynamic scoring logic** and a polished portfolio-ready interface to demonstrate resilience, creative problem-solving, and **applied AI product thinking**.

GitHub: https://github.com/tuannm3812/apple-foundation-agent

### Personal Portfolio

Recommended for:
Frontend, Personal Branding, React, TypeScript, GitHub Pages, Portfolio Automation

Tags:
React, TypeScript, Tailwind, Firebase, GitHub Actions, Portfolio, Automation

- Built and maintained a **React and TypeScript portfolio** showcasing machine learning, data engineering, **MLOps**, applied AI projects, and profile links.
- Added **Firebase-backed contact/comment** features, GitHub Pages deployment, and a scheduled **GitHub Actions** workflow to sync public project metadata.

GitHub: https://github.com/tuannm3812/tuannm3812.github.io  
Live demo: https://tuannm3812.github.io

## Latest Resume Projects Without Public GitHub Links

These appear in the latest resume PPTX but were not found as current public GitHub repositories. Keep them if they are strong for a target role, but use GitHub-backed projects first when employers may click through.

### High-Performance CNN Workflow

Recommended for:
Computer Vision, Deep Learning, Transfer Learning, Model Evaluation

Tags:
MobileNetV3, Transfer Learning, MLP Head, Smart Resizing, F1 Analysis, Image Augmentation

- Developed a two-phase **transfer learning workflow** using MobileNetV3 and a custom MLP head to reduce **catastrophic forgetting** during fine-tuning.
- Optimized **image ingestion** with aspect-ratio-preserving resizing and built per-category **F1 diagnostics** to debug performance across visually similar classes.

### TikTok Sentiment and Stance Analysis

Recommended for:
NLP, Social Media Analytics, Sentiment Analysis, Classification, Climate Analytics

Tags:
TextBlob, VADER, Sentiment Analysis, Stance Detection, Social Media Text, Classification

- Engineered an **NLP pipeline** to process high-velocity social media captions and comments, classifying **sentiment and stance** toward climate change narratives.
- Trained **custom classifiers** to distinguish awareness-driven support from climate skepticism and extract actionable insights from unstructured youth-demographic data.

### Electricity Demand Forecasting

Recommended for:
Time-Series, Forecasting, Energy Analytics, Predictive Modelling

Tags:
HistGradientBoosting, Hyperopt, Weather Features, SILO Data, Forecasting, Energy Demand

- Built an **ML pipeline** using HistGradientBoosting and Hyperopt to forecast **day-ahead electricity demand** with meteorological feature integration.
- Engineered **seasonal and weather-dependent features** to strengthen forecasting performance compared with baseline approaches.

### NBA Draft Probability Modeling

Recommended for:
Classification, Sports Analytics, Imbalanced Learning, Model Interpretation

Tags:
XGBoost, LightGBM, SMOTE, Feature Importance, Classification, Sports Analytics

- Developed **high-precision classification models** on NCAA player records to predict professional draft success.
- Applied **SMOTE oversampling**, cost-sensitive class weighting, and **feature-importance analysis** for interpretable talent evaluation.

## Compact One-Line Bullet Bank

- Built a BirdCLEF+ 2026 bioacoustic classification workspace using PyTorch, EfficientNet-B0, Google Perch v2, PCEN, and SpecAugment for noisy multi-species audio modelling.
- Developed VisionVoice, a PyTorch image-captioning system using Bahdanau-style attention and leakage-free VizWiz data splits.
- Implemented a Flickr8k captioning workflow with ResNet50 spatial features, additive attention, and beam-search decoding.
- Designed an ELT analytics warehouse using Airflow, dbt, PostgreSQL, Bronze-Silver-Gold modelling, and SCD Type 2 snapshots for Sydney Airbnb and Census analysis.
- Deployed a Streamlit Solana forecasting dashboard using live Kraken OHLCV data, engineered technical indicators, anchored residual modelling, and optional FastAPI inference.
- Built a Gemini/Ollama text-to-SQL agent with hybrid schema RAG, SQLGlot-assisted read-only validation, local SQLite execution, Streamlit delivery, and evaluation workflows.
- Analyzed workplace gender equality policy submissions using NLP, TF-IDF, topic modelling, clustering, and stakeholder language comparison.
- Created AfriWeave, a Streamlit NLP prototype for culturally focused text generation using N-gram baselines, BPE tokenization, and transformer components.
- Built a FAOSTAT food-price shock dashboard combining producer prices, global hunger indicators, import dependency, and interactive what-if analysis.
- Created an Apple Foundation Streamlit diagnostic agent with multi-step scoring logic and polished product-style interaction flows.
- Built an AI meal planner prototype with FastAPI, React, Gemini, structured meal generation, nutrition estimation, and supermarket shopping-list logic.
- Built a React and TypeScript portfolio with Firebase contact/comment features, GitHub Pages deployment, and automated GitHub project sync.
- Built a NYC Taxi Databricks workflow with PySpark, Delta Lake processing, and scalable trip analytics.
- Deployed a Sydney rainfall forecasting dashboard using Open-Meteo data, scikit-learn models, joblib artifacts, and Streamlit.
- Built a Snowflake lakehouse workflow for ingesting, cleaning, and analyzing multi-country YouTube Trending data.

## Technical Skills Section

### Compact Resume Version

Programming: Python, SQL, PySpark, TypeScript, OOP, unit testing, package development  
Data Engineering: Airflow, dbt, BigQuery, PostgreSQL, Snowflake, Databricks, Delta Lake, ELT/ETL, Medallion Architecture, API ingestion  
Machine Learning: scikit-learn, PyTorch, CNN/LSTM, transfer learning, time-series forecasting, feature engineering, model evaluation  
NLP and AI: text classification, TF-IDF, topic modelling, clustering, text-to-SQL, prompt engineering, AI agents, Gemini/Ollama, schema RAG, SQL safety  
MLOps and Deployment: FastAPI, Streamlit, Docker, GitHub Actions, model versioning, pytest, joblib artifacts, reproducible project structure  
Visualization and Analytics: Plotly, Looker Studio, Streamlit dashboards, vulnerability mapping, what-if scenarios, stakeholder reporting

### ATS-Friendly Keyword Bank

Python, SQL, PySpark, TypeScript, PyTorch, scikit-learn, CNN, LSTM, transfer learning, computer vision, image captioning, bioacoustics, NLP, TF-IDF, LDA, K-Means, text-to-SQL, prompt engineering, AI agents, Gemini, Ollama, schema RAG, hybrid retrieval, SQLGlot, SQL safety, BPE tokenization, BigQuery, Airflow, dbt, PostgreSQL, Snowflake, Databricks, Delta Lake, FastAPI, Streamlit, Docker, GitHub Actions, pytest, joblib, data pipelines, ELT, ETL, lakehouse analytics, dashboarding, time-series forecasting, API ingestion, feature engineering, model evaluation, stakeholder communication.

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
- NYC Taxi Databricks
- YouTube Trending Snowflake Lakehouse
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
Emphasize natural-language interfaces, agents, prompt engineering, schema RAG, local execution, SQL safety validation, user workflows, and structured outputs.

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
| NYC-Taxi-Databricks | Data Engineering / Databricks | Big data lakehouse project |
| sydney-rainfall-forecasting | Time-Series / Weather Analytics | Supporting forecasting project |
| youtube-trending-snowflake-lakehouse | Data Engineering / Snowflake | Supporting analytics engineering project |
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
- Use selective bolding for high-signal project keywords, but avoid bolding full clauses or entire bullets.
- Use live demo links only when the app is stable and publicly accessible.
