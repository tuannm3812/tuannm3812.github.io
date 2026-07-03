# Resume Content Guide

Use this guide as the source for resume summaries, role-specific project choices,
and keyword-rich bullets. It should stay aligned with the portfolio, public
GitHub repositories, Kaggle profile, and GitHub profile README.

Sources checked:
- Latest resume source: `F:\Downloads\MikeNguyen_Resume.pptx`
- GitHub profile: https://github.com/tuannm3812
- Portfolio: https://tuannm3812.github.io
- Kaggle: https://www.kaggle.com/tuannm3812
- Current public GitHub repository descriptions, languages, and README summaries for all listed projects

Last refreshed: 2026-06-06

## Formatting Recommendation

For a designed PDF resume, use selective bolding inside project bullets to guide
the reader's eye. Keep the emphasis restrained so the bullets stay professional
and ATS-readable:

- Highlight only 2-4 high-signal terms per bullet.
- Put keywords in project titles, tag lines, skills sections, and stack lines.
- Avoid bolding full clauses or entire sentences.

## Short Resume Summary Options

### Option A: ML Engineer / Data Professional

Machine Learning Engineer and Data Professional with **7+ years of experience** building analytics workflows, predictive models, data pipelines, and deployable ML applications. Skilled across Python, SQL, cloud data platforms, computer vision, NLP, time-series modelling, **MLOps**, Kaggle-style experimentation, and stakeholder-facing analytics. Public project portfolio includes deep learning systems, Streamlit dashboards, FastAPI services, **ELT/lakehouse pipelines**, AI agent prototypes, and competition notebooks.

### Option B: Engineering-Focused

Machine Learning Engineer focused on turning messy data into **reliable ML systems**, analytics products, and production-ready workflows. Experienced in Python, SQL, PyTorch, scikit-learn, CatBoost, LightGBM, Airflow, dbt, Snowflake, Databricks, FastAPI, Streamlit, and CI/CD. Built public projects across bioacoustic classification, image captioning, **time-series forecasting**, Kaggle competition workflows, lakehouse analytics, NLP analysis, and AI agents.

### Option C: Short Profile Header

Machine Learning Engineer and Data Professional building **practical ML systems**, Kaggle competition workflows, lakehouse pipelines, MLOps workflows, NLP tools, computer vision models, and AI product prototypes.

## Resume Headline Options

- Machine Learning Engineer | Data Engineering | MLOps | NLP and AI Agents
- Machine Learning Engineer and Data Professional | Python, SQL, PyTorch, Snowflake, MLOps
- Data and ML Engineer | Production ML, Lakehouse Analytics, AI Applications
- Machine Learning Engineer | Computer Vision, NLP, Time-Series, Data Engineering

## Paste-Ready Project Section

Each project below has two resume-ready bullets and recommended tags. Use bullet 1 for project overview plus core tools, and bullet 2 for key takeaway, achievement, or professional evidence without forcing specific evaluation metrics.

### Tier 1: Flagship / Highest-Complexity Projects

Use these first when a resume needs the strongest technical evidence: multi-component systems, production-style architecture, model or data workflow depth, tests, deployment paths, and clear product/storytelling evidence.

### Enterprise Text-to-SQL Agent (Applied AI / Text-to-SQL)

Recommended for:
AI Engineer, Applied AI, AI Agent, NLP, Data Product, LLM Application, Secure Analytics

Tags:
Gemini/Ollama, Text-to-SQL, Streamlit, SQLite, Schema RAG, Hybrid Retrieval, SQLGlot, SQL Safety, Local Execution, Evaluation

- Built an **enterprise text-to-SQL agent** with Gemini/Ollama, Streamlit, SQLite, hybrid schema RAG, and SQLGlot-assisted safety validation.
- Demonstrated a privacy-aware natural-language analytics workflow by sending only schema metadata to the LLM, enforcing read-only local execution, and documenting architecture, deployment, and evaluation evidence.

GitHub: https://github.com/tuannm3812/aipa-text-to-sql-agent  
Live demo: https://aipa-text-to-sql-agent.streamlit.app/

### AI Meal Planner (AI Product / Backend)

Recommended for:
Applied AI, Backend AI Product, FastAPI, Streamlit, RAG, Product Engineering

Tags:
FastAPI, Streamlit, scikit-learn, Local RAG, Pydantic, USDA, Nutrition Verification, Feedback Loop, Shopping Estimates, CI

- Built a **multi-agent AI meal planner** with FastAPI, Streamlit, Pydantic schemas, scikit-learn calorie expenditure prediction, and retrieval-first meal recommendations.
- Delivered a practical product workflow with allergy and health-condition filtering, USDA/FatSecret nutrition verification, shopping-list cost estimates, meal history, feedback capture, deployment config, and CI-tested backend contracts.

GitHub: https://github.com/tuannm3812/ai-meal-planner
Live demo: https://tuannm3812-ai-meal-planner.streamlit.app/

### Production-Grade ELT Pipeline: Airbnb Market Analytics (Data Engineering / ELT)

Recommended for:
Data Engineer, Analytics Engineer, Cloud Data, ELT, dbt, Airflow, Warehouse Modelling

Tags:
Python, Airflow, dbt, PostgreSQL, Medallion Architecture, ELT, Data Lineage, SCD Type 2

- Designed an **end-to-end ELT analytics warehouse** with Airflow, dbt, PostgreSQL, Bronze-Silver-Gold modelling, and Sydney Airbnb, Census, and LGA datasets.
- Preserved longitudinal market history through sequential monthly processing and SCD Type 2 snapshots across host, property, neighbourhood, and LGA dimensions.

GitHub: https://github.com/tuannm3812/airbnb-ELT-warehouse

### Solana Price Forecasting Dashboard (Time-Series / MLOps)

Recommended for:
ML Engineer, Time-Series, MLOps, Data Apps, Streamlit, FastAPI, Financial Analytics

Tags:
Python, Streamlit, FastAPI, scikit-learn, Kraken API, Time-Series, Technical Indicators, pytest

- Built a **live Solana forecasting system** with Kraken OHLCV data, scikit-learn, engineered technical indicators, Streamlit, and optional FastAPI serving.
- Packaged data loading, training, inference, testing, and dashboard delivery into a reproducible time-series workflow suitable for portfolio review and iteration.

GitHub: https://github.com/tuannm3812/solana-price-prediction  
Live demo: https://solana-price-prediction-tuannm3812.streamlit.app/

### Bioacoustic Species Classification (Deep Learning / Audio ML)

Recommended for:
ML Engineer, Deep Learning, Audio ML, Computer Vision-adjacent ML, Edge ML, Kaggle, Research Engineering

Tags:
Perch v2, EfficientNet-B0, PyTorch, Bioacoustics, Audio Classification, CPU Inference, Research Engineering

- Architected a **BirdCLEF+ 2026 bioacoustic classification workspace** with curated EDA, PyTorch EfficientNet-B0 baselines, Google Perch v2 probe training, reusable modules, and CPU-safe inference packaging.
- Documented the project with report artifacts, lightweight trained model outputs, and repeatable submission workflows for noisy multi-species ecological audio experiments.

GitHub: https://github.com/tuannm3812/kaggle-birdclef-2026

### Tier 2: Strong Applied / Resume-Tailoring Projects

Use these to tailor toward ML, NLP, analytics, dashboarding, or data engineering roles. These are strong projects, but either narrower in scope or still waiting on refreshed outputs/notebooks before being treated as flagship evidence.

### FoodLens: Calibrated Food Recognition (Computer Vision / Deployed App)

Recommended for:
Computer Vision, Deep Learning, Transfer Learning, PyTorch, Full-Stack ML, FastAPI, React

Tags:
ResNet50, PyTorch, FastAPI, React, Calibration, Multi-food Detection, Confidence Routing, Food-101

- Built **FoodLens**, a calibrated Food-101 recognition system featuring confidence-based decision routing, multi-food crop detection, and a full-stack FastAPI + React prototype.
- Applied PyTorch ResNet50 fine-tuning, temperature scaling calibration, image/video/URL ingestion pipelines, and confidence-gated routing for reliable multi-class food identification.

GitHub: https://github.com/tuannm3812/foodlens-calibrated-food-recognition

### Kaggle NFL Player Contact Detection (Kaggle / Sports ML)

Recommended for:
ML Engineer, Sports Analytics, Player Safety, Tabular ML, Feature Engineering, Temporal Modelling

Tags:
LightGBM, Tracking Features, Helmet Features, Temporal Smoothing, Type-Specific Models, Video Feature Probes

- Built an **NFL player-contact detection workflow** for identifying player-player and player-ground contact from tracking data, labels, helmet boxes, and video context.
- Applied game-play grouped validation, distance and motion features, type-specific contact modelling, temporal smoothing, blended LightGBM models, and helmet-derived video feature probes.

GitHub: https://github.com/tuannm3812/kaggle-nfl-player-contact-detection

### ROGII Wellbore Geology Prediction (Kaggle / Geoscience ML)

Recommended for:
ML Engineer, Geospatial Analytics, Sequence Modelling, Tabular ML, Competition Workflows

Tags:
Beam Search, Particle Filter, LightGBM, CatBoost, Masked Validation, Artifact Replay

- Built a **wellbore geology workflow** for reconstructing hidden TVT trajectories from horizontal wells, paired typewells, and gamma-ray log signals.
- Applied held-out-well masked-tail validation, typewell GR alignment, feature-tree residuals, spatial formation imputation, Beam/PF trajectory candidates, and artifact replay.

GitHub: https://github.com/tuannm3812/kaggle-ROGII-Wellbore-Geology-Prediction

### NeuroGolf 2026 (Kaggle / ARC-Style Reasoning)

Recommended for:
ML Engineer, Reasoning Systems, ONNX, Rule-Based Solvers, Competition Workflows

Tags:
ONNX, ARC Solvers, Connected Components, One-Hot Tensors, Rule Diagnostics, Solver Routing

- Built a **NeuroGolf 2026 ARC-style solver workflow** for grid reasoning, task profiling, solver routing, and ONNX submission packaging.
- Applied shape and palette diagnostics, connected-component analysis, same-shape and shape-changing solver queues, static one-hot tensors, and solved-task manifests.

GitHub: https://github.com/tuannm3812/kaggle-neurogolf-2026

### CSIRO Image2Biomass (Kaggle / Computer Vision-Adjacent ML)

Recommended for:
ML Engineer, Kaggle, Applied Modelling, Computer Vision-Adjacent ML, Agritech Analytics

Tags:
ExtraTrees, HistGradientBoosting, GroupKFold, EfficientNet-B0, PCA, Constraint Checks, Biomass Prediction

- Built a **CSIRO Image2Biomass workflow** for pasture biomass prediction using image metadata, color features, and submission-ready post-processing.
- Applied grouped validation, ExtraTrees and HistGradientBoosting sweeps, OOF blending, EfficientNet-B0 embedding probes, PCA experiments, and biomass constraint checks.

GitHub: https://github.com/tuannm3812/kaggle-csiro-image2biomass

### Kaggle Playground S6E4: Predict Irrigation Need (Kaggle / Tabular ML)

Recommended for:
ML Engineer, Tabular Modelling, Kaggle, Feature Engineering, CatBoost

Tags:
CatBoost, Stratified CV, Model Diagnostics, Feature Interactions, Class Weighting, EDA Diagnostics

- Built a **Kaggle Playground S6E4 irrigation-need prediction workflow** with EDA, CatBoost baselines, tuning, and reusable submission steps.
- Packaged the notebook process around repeatable feature review, model comparison, and competition-ready prediction outputs.

GitHub: https://github.com/tuannm3812/kaggle-s6e4-predict-irrigation-need

### Kaggle Playground S6E5: Predict F1 Pit Stops (Kaggle / Sports ML)

Recommended for:
ML Engineer, Kaggle, Sports Analytics, Feature Engineering, LightGBM

Tags:
LightGBM, XGBoost, CatBoost, Stratified CV, Calibration, Feature Engineering

- Built a **Kaggle F1 pit-stop prediction workflow** with EDA, feature engineering, LightGBM tuning, and model diagnostics.
- Structured the project as a reusable competition notebook for analysing race-context features and submission-ready predictions.

GitHub: https://github.com/tuannm3812/kaggle-s6e5-predict-f1-pit-stops

### Kaggle S6E6: Predicting Stellar Class (Kaggle / Astronomical ML)

Recommended for:
ML Engineer, Tabular Modelling, Kaggle, Multi-class Classification, Astronomical Data

Tags:
LightGBM, XGBoost, CatBoost, Stratified CV, Feature Engineering, Astronomical Data

- Built a **Kaggle Playground S6E6 stellar class prediction workflow** for classifying stars, galaxies, and quasars from spectroscopic and photometric survey features.
- Applied gradient boosting sweeps, stratified cross-validation, astronomical feature engineering, class-balance diagnostics, and reusable submission validation.

GitHub: https://github.com/tuannm3812/kaggle-s6e6-predicting-stellar-class

### Kaggle Orbit Wars (Kaggle / Simulation Agent)

Recommended for:
ML Engineer, Simulation, Reinforcement Learning, Agent Design, Competition Workflows

Tags:
Simulation/RL, Orbital Mechanics, BFS, Strategy Agents, Replay Analysis

- Built a **Kaggle Orbit Wars simulation agent** for turn-based orbital strategy, combining deterministic solvers with rule-based heuristics and submission-ready packaging.
- Applied orbital physics modeling, BFS-based path planning, agent iteration from replay diagnostics, and Kaggle-safe submission generation workflows.

GitHub: https://github.com/tuannm3812/kaggle-orbit-wars

### TikTok Semantic (NLP / Marketing Analytics)

Recommended for:
NLP, Marketing Analytics, Social Media Analytics, Semantic Analysis, Climate Communication

Tags:
Python, Pandas, scikit-learn, NetworkX, Semantic Clustering, Sentiment, Creator Graphs

- Built a **semantic marketing analytics pipeline** with Python, Pandas, scikit-learn, NetworkX, and TikTok post, creator, comment, hashtag, and multimodal summary data.
- Produced competition-ready insight tables for climate-action messaging, including themes, recommendations, comment intent, sentiment/emotion, and creator bridge metrics.

GitHub: https://github.com/tuannm3812/tiktok-semantic

### NYC Taxi Databricks (Data Engineering / Databricks)

Recommended for:
Data Engineering, Big Data, Databricks, PySpark, Lakehouse Analytics

Tags:
PySpark, Databricks, Delta Lake, Spark SQL, Ridge Regression, Trip Feature Engineering

- Built a **Databricks lakehouse workflow** for large-scale NYC green and yellow taxi trip analytics, borough-level business questions, and fare prediction modelling.
- Applied PySpark, Spark SQL, Delta Lake curation, schema harmonization, trip feature engineering, quality filtering, ridge regression, segment diagnostics, and reusable artifacts.

GitHub: https://github.com/tuannm3812/NYC-Taxi-Databricks

### YouTube Trending Snowflake Lakehouse (Data Engineering / Snowflake)

Recommended for:
Data Engineering, Snowflake, Analytics Engineering, API Ingestion, Media Analytics

Tags:
Python, Snowflake, YouTube Data API, Lakehouse, Data Cleaning, Analytics

- Built a **Snowflake analytics workflow** with Python and YouTube Data API support for ingesting, cleaning, and analyzing multi-country trending video data.
- Enabled repeatable country-level media trend analysis through structured lakehouse-style tables and refreshable data preparation logic.

GitHub: https://github.com/tuannm3812/youtube-trending-snowflake-lakehouse

### VisionVoice: Image Captioning (Computer Vision / Accessibility AI)

Recommended for:
Computer Vision, Deep Learning, Accessibility AI, PyTorch, Image Captioning, Applied ML

Tags:
PyTorch, ResNet-LSTM, Bahdanau Attention, Beam Search, VizWiz, Image Captioning

- Built an **accessibility-focused VizWiz image captioning system** with PyTorch, ResNet-LSTM baselines, Bahdanau-style attention, and beam-search decoding.
- Maintained rerunnable EDA, leakage-aware data splits, qualitative review, and reproducible experiments to compare captioning approaches.

GitHub: https://github.com/tuannm3812/VisionVoice

### Flickr8k Image Captioning (Computer Vision / Image Captioning)

Recommended for:
Computer Vision, Deep Learning, Sequence Modelling, Kaggle, PyTorch

Tags:
PyTorch, VGG16, ResNet50, CNN-LSTM, Additive Attention, Beam Search, Kaggle, Model Artifacts

- Built a **Flickr8k captioning workflow** with PyTorch, VGG16/ResNet50 visual encoders, CNN-LSTM models, additive attention, and beam-search decoding.
- Improved the modelling workflow with tracked Kaggle artifacts, qualitative inference examples, mixed precision, scheduling, and reusable experiment structure.

GitHub: https://github.com/tuannm3812/flickr-image-captioning

### Sydney Rainfall Forecasting (Time-Series / Weather Analytics)

Recommended for:
ML Engineer, Time-Series, Forecasting, Streamlit, Weather Analytics

Tags:
Python, Streamlit, scikit-learn, joblib, Open-Meteo, Forecasting

- Built an **end-to-end Sydney rainfall forecasting pipeline** with Open-Meteo observations, scikit-learn classification/regression models, joblib artifacts, and Streamlit.
- Strengthened reliability through refreshed model metadata and tests covering future-weather targets, feature ordering, and dashboard-ready inference assets.

GitHub: https://github.com/tuannm3812/sydney-rainfall-forecasting  
Live demo: https://sydney-rainfall-forecasting.streamlit.app/

### Gender Equality Policy NLP (NLP / Policy Analytics)

Recommended for:
NLP, Policy Analytics, Text Mining, Unstructured Data, Social Impact Analytics

Tags:
Python, NLP, TF-IDF, LDA, K-Means, Clustering, Topic Modelling, Policy Analysis

- Analyzed **Australian parliamentary submissions** with Python, TF-IDF, LDA, K-Means clustering, and visualization to study workplace gender equality policy discourse.
- Identified stakeholder framing patterns across unions, industry groups, advocacy bodies, academics, and government sources for social-impact text analytics.

GitHub: https://github.com/tuannm3812/gender-equality-policy-nlp

### FAOSTAT Food Price Shock Dashboard (Data Visualization / Food Security)

Recommended for:
Data Analytics, Dashboarding, Data Visualization, Food Security, Public Data, Streamlit

Tags:
Streamlit, Pandas, Plotly, FAOSTAT, World Bank, Food Price Index, Scenario Analysis

- Built a **Streamlit and Plotly dashboard** using FAOSTAT, FAO, Global Hunger Index, and World Bank data to analyze global food-price shocks.
- Supported food-security risk exploration with commodity trends, volatility views, import-dependency mapping, and interactive what-if shock scenarios.

GitHub: https://github.com/tuannm3812/assignment3-faostat-viz  
Live demo: https://assignment3-faostat-viz.streamlit.app/

### Tier 3: Focused Supporting / Prototype Projects

Use these when the role values breadth, prototyping, frontend delivery, or personal brand evidence. They are useful supporting signals but usually should not replace Tier 1 or Tier 2 projects on a short resume.

### ScriptClean AI (AI Product / Frontend)

Recommended for:
Applied AI, Frontend AI Product, Gemini, Study Tools, TypeScript

Tags:
React, TypeScript, Tailwind, Gemini API, Transcript Processing, Rich Text Export

- Built a **React, TypeScript, Tailwind, and Gemini** app that converts raw YouTube transcripts into high-fidelity study guides and lecture notes.
- Added speaker structure, topic headers, bilingual vocabulary support, and formatted rich-text export for Google Docs or Microsoft Word workflows.

GitHub: https://github.com/tuannm3812/ScriptClean-AI

### Kaggle Maze Crawler (Kaggle / Simulation Agent)

Recommended for:
Kaggle, Simulation Agents, Graph Search, Problem Solving, Supporting Portfolio Evidence

Tags:
Jump BFS, Wall Memory, Danger Gating, Simulation/RL, Replay Analysis

- Built a **Kaggle Maze Crawler workflow** for turn-based maze navigation, simulation review, agent iteration, and Kaggle-safe submission generation.
- Applied jump-preferred BFS, known-wall memory, mirrored-wall inference, active scout replacement, south-bound danger gating, and replay diagnostics.

GitHub: https://github.com/tuannm3812/kaggle-maze-crawler

### AfriWeave (NLP / Generative Prototype)

Recommended for:
NLP, Generative AI, Streamlit Prototype, Tokenization, Cultural Data Products

Tags:
Streamlit, Keras, JAX, BPE, N-gram Models, Transformers, Text Generation, NLP Prototype

- Created an **interactive NLP prototype** with Streamlit, Keras/JAX, BPE tokenization, N-gram baselines, and transformer components for culturally focused text generation.
- Supported demo reliability and iteration with corpus exploration, deterministic fallback data, testable modules, and a lightweight user interface.

GitHub: https://github.com/tuannm3812/AfriWeave

### Apple Foundation Agent (Applied AI / Product Prototype)

Recommended for:
Applied AI, Streamlit App, Human-Centered AI, Product Prototype, UX for AI

Tags:
Streamlit, Python, AI Agent, Diagnostic Flow, Scoring Logic, Product Prototype

- Built an **interactive Streamlit diagnostic app** with Python, scoring logic, and product-style UX for mapping developer workflow decisions into profile outcomes.
- Demonstrated applied AI product thinking through a polished decision flow covering recovery, iteration, deployment, legacy systems, and delivery pressure.

GitHub: https://github.com/tuannm3812/apple-foundation-agent

### UTS Tech Festival 2026 GenAI Hackathon (Applied AI / Scenario Response)

Recommended for:
Applied AI, Hackathon, Resilient Infrastructure, Technology Assessment, Smart Intersection

Tags:
Generative AI, Austroads, Sustainable Design, Telemetry, Prompt Engineering, Document Automation

- Developed comprehensive technical responses for three engineering scenarios: LEGO sustainable urban housing, Caterpillar/WesTrac future worksite fleet transition, and Austroads-aligned smart intersection asphalt design.
- Applied generative AI prompting strategy, adaptive signal logic design, sustainable mix design, machinery telemetry plans, and automated HTML/PDF document compilation pipelines.

GitHub: https://github.com/tuannm3812/uts-techfest-2026-genai-hackathon

### Personal Portfolio (Frontend / Portfolio Automation)

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

### High-Performance CNN Workflow (Computer Vision / Transfer Learning)

Recommended for:
Computer Vision, Deep Learning, Transfer Learning, Model Evaluation

Tags:
MobileNetV3, Transfer Learning, MLP Head, Smart Resizing, F1 Analysis, Image Augmentation

- Developed a two-phase **transfer learning workflow** using MobileNetV3 and a custom MLP head to reduce **catastrophic forgetting** during fine-tuning.
- Optimized **image ingestion** with aspect-ratio-preserving resizing and built per-category **F1 diagnostics** to debug performance across visually similar classes.

### Replaced By Public Project: TikTok Semantic

The previous non-public TikTok sentiment/stance resume item should now be replaced by **TikTok Semantic** because the public repository covers the same climate/social-media analytics direction with stronger evidence: reusable scripts, documented sample findings, semantic clusters, comment sentiment/emotion tables, creator bridge metrics, and GitHub-backed project history.

Use the TikTok Semantic project entry above for current resumes and portfolio links.

### Electricity Demand Forecasting (Time-Series / Energy Analytics)

Recommended for:
Time-Series, Forecasting, Energy Analytics, Predictive Modelling

Tags:
HistGradientBoosting, Hyperopt, Weather Features, SILO Data, Forecasting, Energy Demand

- Built an **ML pipeline** using HistGradientBoosting and Hyperopt to forecast **day-ahead electricity demand** with meteorological feature integration.
- Engineered **seasonal and weather-dependent features** to strengthen forecasting performance compared with baseline approaches.

### NBA Draft Probability Modeling (Classification / Sports Analytics)

Recommended for:
Classification, Sports Analytics, Imbalanced Learning, Model Interpretation

Tags:
XGBoost, LightGBM, SMOTE, Feature Importance, Classification, Sports Analytics

- Developed **high-precision classification models** on NCAA player records to predict professional draft success.
- Applied **SMOTE oversampling**, cost-sensitive class weighting, and **feature-importance analysis** for interpretable talent evaluation.

## Compact One-Line Bullet Bank

- Built a BirdCLEF+ 2026 bioacoustic classification workspace using PyTorch, EfficientNet-B0, Google Perch v2, reusable artifacts, and CPU-safe inference packaging for noisy multi-species audio modelling.
- Built a FoodLens calibrated recognition system with ResNet50 fine-tuning, temperature-scaled calibration, confidence-based decision routing, and full-stack FastAPI+React delivery.
- Built an NFL contact-detection workflow using tracking features, helmet-derived video probes, temporal smoothing, type-specific contact modelling, blended LightGBM models, and grouped validation.
- Developed VisionVoice, a PyTorch image-captioning system using Bahdanau-style attention and leakage-free VizWiz data splits.
- Implemented a Flickr8k captioning workflow with ResNet50 spatial features, additive attention, and beam-search decoding.
- Designed an ELT analytics warehouse using Airflow, dbt, PostgreSQL, Bronze-Silver-Gold modelling, and SCD Type 2 snapshots for Sydney Airbnb and Census analysis.
- Deployed a Streamlit Solana forecasting dashboard using live Kraken OHLCV data, engineered technical indicators, anchored residual modelling, and optional FastAPI inference.
- Built a Gemini/Ollama text-to-SQL agent with hybrid schema RAG, SQLGlot-assisted read-only validation, local SQLite execution, Streamlit delivery, and evaluation workflows.
- Analyzed workplace gender equality policy submissions using NLP, TF-IDF, topic modelling, clustering, and stakeholder language comparison.
- Built TikTok Semantic, a marketing analytics pipeline that turns climate-action TikTok data into semantic performance, sentiment, comment intent, and creator graph insight tables.
- Created AfriWeave, a Streamlit NLP prototype for culturally focused text generation using N-gram baselines, BPE tokenization, and transformer components.
- Built a FAOSTAT food-price shock dashboard combining producer prices, global hunger indicators, import dependency, and interactive what-if analysis.
- Created an Apple Foundation Streamlit diagnostic agent with multi-step scoring logic and polished product-style interaction flows.
- Built a multi-agent AI meal planner with FastAPI, Streamlit, scikit-learn calorie expenditure prediction, local meal RAG, nutrition verification, shopping estimates, feedback storage, and CI-tested API contracts.
- Built a React and TypeScript portfolio with Firebase contact/comment features, GitHub Pages deployment, and automated GitHub project sync.
- Built a NYC Taxi Databricks workflow with PySpark, Spark SQL, Delta Lake curation, trip feature engineering, ridge regression, and segment diagnostics.
- Built a Sydney rainfall forecasting pipeline with Open-Meteo data, scikit-learn classification/regression models, joblib artifacts, Streamlit delivery, and pytest coverage for target and feature logic.
- Built a Snowflake lakehouse workflow for ingesting, cleaning, and analyzing multi-country YouTube Trending data.
- Built a CSIRO Image2Biomass Kaggle workflow with grouped validation, ExtraTrees/HistGradientBoosting sweeps, image/color features, OOF blending, and biomass constraint checks.
- Built a ROGII wellbore geology workflow with masked-tail validation, typewell GR alignment, Beam/PF trajectory candidates, LightGBM/CatBoost modelling, and artifact replay.
- Built a NeuroGolf 2026 ARC-style solver workflow with ONNX export, connected-component routing, one-hot tensors, rule diagnostics, and solved-task manifests.
- Built a Kaggle Playground S6E4 irrigation-need prediction workflow with CatBoost baselines, tuning, and reusable submission steps.
- Built a Kaggle S6E5 F1 pit-stop prediction workflow with EDA, feature engineering, LightGBM tuning, and model diagnostics.
- Built ScriptClean AI, a React and TypeScript Gemini app that turns raw transcripts into structured study guides with formatted export.

## Technical Skills Section

### Compact Resume Version

**Programming and Engineering:** Python, SQL, PySpark, TypeScript, OOP, package development, unit testing, reusable project structure  
**Data Engineering and Warehousing:** Airflow, dbt, PostgreSQL, BigQuery, Snowflake, Databricks, Delta Lake, Medallion Architecture, ELT/ETL, API ingestion  
**Machine Learning and Forecasting:** scikit-learn, PyTorch, CatBoost, LightGBM, CNN/LSTM, transfer learning, time-series forecasting, feature engineering, model evaluation, joblib artifacts  
**NLP, LLMs, and AI Agents:** text-to-SQL, schema RAG, hybrid retrieval, prompt engineering, Gemini/Ollama, SQLGlot, SQL safety, TF-IDF, topic modelling, clustering, sentiment analysis  
**MLOps and Productization:** FastAPI, Streamlit, Docker, GitHub Actions, pytest, model metadata, reproducible artifacts, deployment documentation  
**Analytics and Visualization:** Pandas, Plotly, NetworkX, Looker Studio, Streamlit dashboards, semantic analytics, vulnerability mapping, what-if scenarios, stakeholder reporting

### ATS-Friendly Keyword Bank

Python, SQL, PySpark, TypeScript, PyTorch, scikit-learn, CatBoost, LightGBM, Pandas, NetworkX, CNN, LSTM, transfer learning, computer vision, image captioning, bioacoustics, Kaggle, NLP, TF-IDF, LDA, K-Means, semantic clustering, sentiment analysis, text-to-SQL, prompt engineering, AI agents, Gemini, Ollama, schema RAG, hybrid retrieval, SQLGlot, SQL safety, BPE tokenization, BigQuery, Airflow, dbt, PostgreSQL, Snowflake, Databricks, Delta Lake, FastAPI, Streamlit, Docker, GitHub Actions, pytest, joblib, data pipelines, ELT, ETL, lakehouse analytics, dashboarding, time-series forecasting, API ingestion, feature engineering, model evaluation, stakeholder communication.

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
- FoodLens: Calibrated Food Recognition
- Kaggle NFL Player Contact Detection
- ROGII Wellbore Geology Prediction
- NeuroGolf 2026
- CSIRO Image2Biomass
- Kaggle Playground S6E4: Predict Irrigation Need
- Kaggle Playground S6E5: Predict F1 Pit Stops
- Kaggle S6E6: Predicting Stellar Class
- Kaggle Orbit Wars
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
- Enterprise Text-to-SQL Agent
- AI Meal Planner
- AfriWeave
- Apple Foundation Agent
- TikTok Semantic
- Gender Equality Policy NLP

Positioning:
Emphasize natural-language interfaces, agents, prompt engineering, schema RAG, local execution, SQL safety validation, user workflows, and structured outputs.

### NLP / Text Analytics Resume

Prioritize:
- Enterprise Text-to-SQL Agent
- TikTok Semantic
- Gender Equality Policy NLP
- AfriWeave

Positioning:
Emphasize text processing, schema grounding, sentiment/stance detection, topic modelling, clustering, and applied language systems.

## GitHub Project Inventory

Current public project inventory, including the Text-to-SQL agent even though GitHub marks it as a fork.

| Project | Category | Resume Use |
| --- | --- | --- |
| kaggle-birdclef-2026 | Deep Learning / Audio ML | Strong ML project |
| kaggle-csiro-image2biomass | Machine Learning / Kaggle | Strong ML project |
| kaggle-s6e4-predict-irrigation-need | Machine Learning / Kaggle | Supporting tabular ML project |
| kaggle-s6e5-predict-f1-pit-stops | Machine Learning / Kaggle | Supporting sports ML project |
| kaggle-maze-crawler | Machine Learning / Kaggle | Supporting simulation-agent project |
| kaggle-ROGII-Wellbore-Geology-Prediction | Machine Learning / Geoscience | Strong sequence and tabular ML project |
| kaggle-neurogolf-2026 | Machine Learning / Reasoning | Strong ONNX and solver-routing project |
| kaggle-nfl-player-contact-detection | Machine Learning / Sports Analytics | Strong tabular and temporal ML project |
| multi-class-food-recognition | Computer Vision / Transfer Learning | Strong CV project |
| VisionVoice | Computer Vision / Captioning | Strong ML project |
| flickr-image-captioning | Computer Vision / Captioning | Supporting ML project |
| airbnb-ELT-warehouse | Data Engineering | Strong data engineering project |
| solana-price-prediction | Time-Series / MLOps | Strong deployed ML project |
| aipa-text-to-sql-agent | Applied AI / Text-to-SQL | Strong AI agent project |
| gender-equality-policy-nlp | NLP / Policy Analytics | Strong NLP project |
| tiktok-semantic | NLP / Marketing Analytics | Strong semantic analytics project |
| AfriWeave | NLP / Generative Prototype | Applied AI project |
| assignment3-faostat-viz | Data Visualization | Dashboard and analytics project |
| NYC-Taxi-Databricks | Data Engineering / Databricks | Big data lakehouse project |
| sydney-rainfall-forecasting | Time-Series / Weather Analytics | Supporting forecasting project |
| youtube-trending-snowflake-lakehouse | Data Engineering / Snowflake | Supporting analytics engineering project |
| apple-foundation-agent | AI / Streamlit Prototype | Product prototype |
| ai-meal-planner | AI Product / Full Stack | Product prototype |
| ScriptClean-AI | AI Product / Frontend | Supporting AI product project |
| uts-techfest-2026-genai-hackathon | AI / Scenario Response | Hackathon project |
| CircleU | iOS / SwiftUI App | Supporting iOS project |
| kaggle-ai-agent-security | Machine Learning / AI Security | Supporting agent security project |
| kaggle-pokemon-tcg-ai-battle | Machine Learning / Simulation | Supporting simulation-agent project |
| unsw-ma-hackathon-2026 | Data Engineering / Crowdfunding | Supporting hackathon project |
| uts-mdsi | AI / Course Wiki | Supporting documentation project |
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
- For applied AI roles, lead with Enterprise Text-to-SQL Agent, AI Meal Planner, AfriWeave, and agent-style user workflows.
- Use selective bolding for high-signal project keywords, but avoid bolding full clauses or entire bullets.
- Use live demo links only when the app is stable and publicly accessible.
