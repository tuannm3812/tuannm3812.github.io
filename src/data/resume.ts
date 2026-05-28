export interface Project {
  title: string;
  category: string;
  github?: string;
  demo?: string;
  impact?: string;
  stack: string[];
  points: string[];
}

export interface ResumeData {
  name: string;
  title: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  kaggle: string;
  summary: string;
  highlights: { value: string; label: string }[];
  education: {
    institution: string;
    location: string;
    degree: string;
    period: string;
    points: string[];
  }[];
  experience: {
    company: string;
    location: string;
    role: string;
    period: string;
    points: string[];
  }[];
  projects: Project[];
  reflections: {
    title: string;
    category: string;
    points: string[];
  }[];
  technologyStack: {
    title: string;
    description: string;
    tools: string[];
  }[];
  skills: Record<string, string[]>;
}

export const resumeData: ResumeData = {
  name: "Tuan Nguyen (Mike)",
  title: "Machine Learning Engineer & Data Professional",
  email: "tuannm3812@gmail.com",
  phone: "+61 433 466 749",
  location: "Sydney, NSW",
  linkedin: "https://linkedin.com/in/tuan-m-nguyen",
  github: "https://github.com/tuannm3812",
  kaggle: "https://www.kaggle.com/tuannm3812",
  summary: "Data and machine learning professional with 7+ years of experience turning ambiguous business problems into reliable analytics products, predictive models, and production-ready data workflows. I combine stakeholder-facing judgment from consulting and e-commerce with hands-on engineering across Python, SQL, cloud data platforms, MLOps, computer vision, and Kaggle-style experimentation.",
  highlights: [
    { value: "7+", label: "Years building analytics and ML workflows" },
    { value: "25", label: "Technical projects across ML, data, and AI" },
    { value: "6", label: "Core domains from CV to Kaggle ML and MLOps" },
    { value: "Full-stack", label: "From data pipelines to deployed apps" }
  ],
  education: [
    {
      institution: "University of Technology Sydney",
      location: "Sydney, Australia",
      degree: "Master of Data Science and Innovation (High Distinction)",
      period: "Feb 2025 - Feb 2027 (expected)",
      points: [
        "Coursework includes machine learning, big data engineering, statistical modelling, deep learning, computer vision, natural language processing, and applied AI systems.",
        "Completed academic and portfolio projects in full-stack ML systems, Databricks and Snowflake analytics, MLOps pipelines, Kaggle competition workflows, computer vision, NLP, and AI-driven decision support."
      ]
    },
    {
      institution: "Foreign Trade University",
      location: "Hanoi, Vietnam",
      degree: "Bachelor of International Economics and Business (Distinction)",
      period: "Aug 2013 - Jun 2017",
      points: [
        "Completed a selective program emphasizing analytical thinking, applied economics, and professional communication, with foundations in econometrics, international trade, finance, and strategic management."
      ]
    }
  ],
  experience: [
    {
      company: "Shopee Vietnam",
      location: "HCMC, Vietnam",
      role: "Data Optimization | Seller Investment",
      period: "Dec 2021 - Jan 2025",
      points: [
        "Architected automated BigQuery pipelines for high-volume e-commerce data, powering investment tracking and commercial decision-making.",
        "Developed predictive models including churn prediction and K-means seller clustering to personalize seller support and allocate resources more effectively.",
        "Led a cross-functional analytics team of 5, translating model outputs into investment actions that improved ROI by 15%.",
        "Designed self-service dashboards in Looker Studio, reducing ad-hoc reporting load and improving stakeholder visibility."
      ]
    },
    {
      company: "FPT Software",
      location: "Hanoi, Vietnam",
      role: "Senior Digital Transformation Consultant",
      period: "Dec 2020 - Dec 2021",
      points: [
        "Led CRM implementation workstreams and delivered predictive analytics modules for lead scoring and pipeline forecasting.",
        "Coached client teams on AI-enabled workflows and data-driven operating models, contributing to measurable productivity gains.",
        "Translated operational bottlenecks into implementation roadmaps, agile delivery plans, and scalable data architecture recommendations."
      ]
    },
    {
      company: "PwC Vietnam",
      location: "Hanoi, Vietnam",
      role: "Senior Assurance Associate",
      period: "Aug 2017 - Dec 2020",
      points: [
        "Built Python and SQL scripts to automate anomaly testing and improve the repeatability of fraud and risk assessments.",
        "Extracted, cleaned, and analyzed financial datasets across 40+ banking and capital markets clients.",
        "Introduced code-based data manipulation techniques into traditional audit workflows, improving analytical rigor and reviewability."
      ]
    }
  ],
  projects: [
    {
      title: "Bioacoustic Species Classification",
      category: "Deep Learning & Computer Vision",
      github: "https://github.com/tuannm3812/kaggle-birdclef-2026",
      impact: "Active BirdCLEF+ 2026 bioacoustic classification workspace",
      stack: ["Perch v2", "EfficientNet-B0", "PyTorch", "Audio ML", "CPU Inference"],
      points: [
        "Built a BirdCLEF+ 2026 bioacoustic classification workspace for noisy multi-species ecological audio experiments and Kaggle submission workflows.",
        "Applied curated EDA, EfficientNet-B0 baselines, Google Perch v2 probe training, CPU-safe inference packaging, reusable PyTorch modules, and lightweight model artifacts."
      ]
    },
    {
      title: "VisionVoice: Image Captioning",
      category: "Deep Learning & Computer Vision",
      github: "https://github.com/tuannm3812/VisionVoice",
      impact: "Accessible VizWiz captioning with visual attention",
      stack: ["PyTorch", "ResNet-LSTM", "Bahdanau Attention", "Beam Search", "VizWiz"],
      points: [
        "Built an accessibility-focused VizWiz image captioning system for generating captions from images captured in assistive settings.",
        "Applied ResNet-LSTM baselines, Bahdanau-style attention, beam search, leakage-aware splits, qualitative review, and reproducible PyTorch experiments."
      ]
    },
    {
      title: "Flickr8k Image Captioning",
      category: "Deep Learning & Computer Vision",
      github: "https://github.com/tuannm3812/flickr-image-captioning",
      impact: "Reproducible Flickr8k captioning workflow",
      stack: ["PyTorch", "VGG16", "ResNet50", "Attention", "Beam Search"],
      points: [
        "Built a Flickr8k image captioning workflow for comparing CNN-LSTM caption generation approaches on a compact vision-language dataset.",
        "Applied VGG16 and ResNet50 encoders, additive attention, beam search, mixed precision, tracked artifacts, qualitative inference examples, and reusable PyTorch training structure."
      ]
    },
    {
      title: "Production-Grade ELT Pipeline",
      category: "Data Engineering & Analytics",
      github: "https://github.com/tuannm3812/airbnb-ELT-warehouse",
      impact: "Airbnb and Census warehouse with dimensional marts",
      stack: ["Airflow", "dbt", "PostgreSQL", "Medallion", "SCD Type 2"],
      points: [
        "Built an ELT warehouse for Sydney Airbnb, Census, and LGA analytics with dimensional marts for market and locality analysis.",
        "Applied Airflow orchestration, dbt transformations, PostgreSQL modeling, Bronze-Silver-Gold layers, sequential monthly processing, and SCD Type 2 history."
      ]
    },
    {
      title: "FAOSTAT Food Price Shock Dashboard",
      category: "Data Engineering & Analytics",
      github: "https://github.com/tuannm3812/assignment3-faostat-viz",
      demo: "https://assignment3-faostat-viz.streamlit.app/",
      impact: "Live Streamlit dashboard for global food-price risk",
      stack: ["Streamlit", "Pandas", "Plotly", "FAOSTAT", "World Bank"],
      points: [
        "Built a Streamlit dashboard for exploring global food-price shocks, import dependency, and food-security risk across countries and commodities.",
        "Applied FAOSTAT, FAO, Global Hunger Index, and World Bank data integration with Pandas, Plotly commodity trends, volatility views, maps, and what-if scenarios."
      ]
    },
    {
      title: "Solana Price Forecasting",
      category: "Time-Series & MLOps",
      github: "https://github.com/tuannm3812/solana-price-prediction",
      demo: "https://solana-price-prediction-tuannm3812.streamlit.app/",
      impact: "Real-time forecasting and Streamlit dashboard",
      stack: ["Anchored Residual ML", "Kraken API", "Scikit-learn", "FastAPI", "Streamlit"],
      points: [
        "Built a Solana price forecasting workflow and dashboard for turning live market data into a repeatable next-day prediction experience.",
        "Applied Kraken OHLCV ingestion, technical-indicator feature engineering, anchored residual modeling, scikit-learn training, optional FastAPI serving, Streamlit delivery, and pytest checks."
      ]
    },
    {
      title: "Sydney Rainfall Forecasting",
      category: "Time-Series & MLOps",
      github: "https://github.com/tuannm3812/sydney-rainfall-forecasting",
      demo: "https://sydney-rainfall-forecasting.streamlit.app/",
      impact: "Sydney rainfall forecasting pipeline with Streamlit delivery",
      stack: ["HistGradientBoosting", "Open-Meteo", "Scikit-learn", "joblib", "Streamlit"],
      points: [
        "Built a Sydney rainfall forecasting pipeline and Streamlit app for weather-driven classification and regression workflows.",
        "Applied Open-Meteo ingestion, histogram gradient boosting models, joblib artifacts, model metadata, feature-order checks, future-weather target handling, and dashboard-ready inference tests."
      ]
    },
    {
      title: "Gender Equality Policy NLP",
      category: "NLP & Generative AI",
      github: "https://github.com/tuannm3812/gender-equality-policy-nlp",
      impact: "Policy discourse analysis from parliamentary submissions",
      stack: ["NLP", "TF-IDF", "LDA", "K-Means", "Policy Analytics"],
      points: [
        "Built an NLP workflow for analyzing Australian parliamentary submissions on workplace gender equality policy and stakeholder framing.",
        "Applied text cleaning, TF-IDF, LDA topic modeling, K-Means clustering, visualization, and cross-stakeholder comparison across unions, industry groups, advocacy bodies, academics, and government sources."
      ]
    },
    {
      title: "TikTok Semantic",
      category: "NLP & Generative AI",
      github: "https://github.com/tuannm3812/tiktok-semantic",
      impact: "Semantic marketing analytics for climate-action TikToks",
      stack: ["Pandas", "scikit-learn", "NetworkX", "NLP", "Graph Analytics"],
      points: [
        "Built a semantic marketing analytics pipeline for climate-action TikTok content across posts, creators, comments, hashtags, and multimodal summaries.",
        "Applied Pandas, scikit-learn, NetworkX, NLP theme extraction, comment intent analysis, sentiment/emotion review, recommendation tables, and creator bridge metrics."
      ]
    },
    {
      title: "AfriWeave",
      category: "NLP & Generative AI",
      github: "https://github.com/tuannm3812/AfriWeave",
      impact: "Culturally focused Streamlit NLP prototype",
      stack: ["Streamlit", "Keras", "JAX", "BPE", "Transformers"],
      points: [
        "Built an interactive NLP prototype for culturally focused text generation and corpus exploration through a lightweight Streamlit interface.",
        "Applied Keras/JAX components, BPE tokenization, N-gram baselines, transformer-style modeling, deterministic fallback data, testable modules, and demo-oriented UX."
      ]
    },
    {
      title: "AIPA: Enterprise Text-to-SQL Agent",
      category: "NLP & Generative AI",
      github: "https://github.com/tuannm3812/aipa-text-to-sql-agent",
      demo: "https://aipa-text-to-sql-agent.streamlit.app/",
      impact: "Enterprise-style schema RAG agent with safe local SQL execution",
      stack: ["Gemini/Ollama", "Hybrid Schema RAG", "Streamlit", "SQLite", "SQLGlot"],
      points: [
        "Built an enterprise-style text-to-SQL agent for answering natural-language questions over local SQLite databases while keeping data execution local.",
        "Applied hybrid lexical, semantic, value-hint, and foreign-key schema retrieval with Gemini/Ollama generation, SQLGlot validation, SQLite authorizer controls, result caps, query repair, tests, and evaluation outputs."
      ]
    },
    {
      title: "Apple Foundation Agent",
      category: "Applied AI Products",
      github: "https://github.com/tuannm3812/apple-foundation-agent",
      impact: "Interactive Streamlit diagnostic for developer workflows",
      stack: ["Streamlit", "Scoring Logic", "Streamlit UX", "Decision Flow", "Deployment"],
      points: [
        "Built an interactive diagnostic app for mapping developer workflow decisions into profile outcomes across delivery and recovery scenarios.",
        "Applied Streamlit UX, scoring logic, decision-flow design, deployment packaging, and product-style prompts covering iteration, legacy systems, deployment pressure, and recovery patterns."
      ]
    },
    {
      title: "AI Meal Planner",
      category: "Applied AI Products",
      github: "https://github.com/tuannm3812/ai-meal-planner",
      demo: "https://tuannm3812-ai-meal-planner.streamlit.app/",
      impact: "Multi-agent meal planning app with live Streamlit demo",
      stack: ["FastAPI", "Streamlit", "scikit-learn", "Local RAG", "USDA API"],
      points: [
        "Built a multi-agent AI meal planner for generating nutrition-aware meal plans, shopping lists, and user-specific recommendations.",
        "Applied FastAPI, Streamlit, Pydantic schemas, calorie expenditure prediction, local RAG, allergy and health-condition filtering, USDA/FatSecret nutrition checks, feedback capture, and CI-tested backend contracts."
      ]
    },
    {
      title: "Personal Portfolio",
      category: "Applied AI Products",
      github: "https://github.com/tuannm3812/tuannm3812.github.io",
      demo: "https://tuannm3812.github.io",
      impact: "React portfolio deployed with GitHub Pages",
      stack: ["React", "TypeScript", "Tailwind", "Firebase", "GitHub Actions"],
      points: [
        "Built and maintained a React portfolio for presenting machine learning, data engineering, MLOps, and applied AI project evidence.",
        "Applied TypeScript, Tailwind, Firebase contact/comment flows, Google Analytics tagging, GitHub Actions deployment, accessible routing, and automated GitHub project sync."
      ]
    }
  ],
  reflections: [
    {
      title: "Bridging the Gap",
      category: "Career Evolution",
      points: [
        "Moving from professional services at PwC to data optimization at Shopee taught me that strong models start with strong domain understanding.",
        "The work that matters usually speaks two languages: business ROI and technical scalability."
      ]
    },
    {
      title: "Product-Centric ML",
      category: "Philosophy",
      points: [
        "Model quality only matters when the workflow around it is reproducible, inspectable, and useful to a real decision.",
        "Choosing the right tool means balancing signal, latency, cost, maintainability, and the shape of the user problem."
      ]
    },
    {
      title: "The Lifelong Beta",
      category: "Mindset",
      points: [
        "The shift from batch analytics to real-time ML, vision systems, and AI agents rewards structured experimentation.",
        "Competitions, academic projects, and open-source work keep my practice sharp because every notebook needs a clear story, artifact, and next step."
      ]
    }
  ],
  technologyStack: [
    {
      title: "Languages & Engineering",
      description: "Daily tools for analysis, modelling, automation, and maintainable project structure.",
      tools: ["Python", "SQL", "PySpark", "TypeScript", "OOP", "Testing"]
    },
    {
      title: "Data Platforms",
      description: "Cloud warehouse and lakehouse patterns for reliable analytics, ingestion, and historical modelling.",
      tools: ["BigQuery", "Snowflake", "Databricks", "Delta Lake", "PostgreSQL", "Medallion"]
    },
    {
      title: "Orchestration & Analytics",
      description: "Pipelines, transformation layers, and stakeholder-facing reporting workflows.",
      tools: ["Apache Airflow", "dbt", "ETL/ELT", "API Ingestion", "Looker Studio", "Data Quality"]
    },
    {
      title: "Machine Learning",
      description: "Classical ML, deep learning, computer vision, audio ML, and time-series experimentation.",
      tools: ["PyTorch", "scikit-learn", "LightGBM", "CatBoost", "ResNet50", "Perch v2"]
    },
    {
      title: "Production & MLOps",
      description: "Deployment patterns for moving models, agents, and data products beyond notebooks.",
      tools: ["FastAPI", "Streamlit", "GitHub Actions", "pytest", "Model Artifacts", "Submission Workflows"]
    },
    {
      title: "AI, NLP & Agents",
      description: "Applied language systems for text understanding, schema reasoning, and natural-language interfaces.",
      tools: ["LLMs", "Hybrid Retrieval", "Text-to-SQL", "SQLGlot", "Semantic Analytics", "Topic Modelling"]
    }
  ],
  skills: {
    programming: ["Python", "SQL", "PySpark", "TypeScript", "OOP", "Unit Testing", "Package Development", "Reusable Project Structure"],
    dataEngineering: ["Medallion Architecture", "dbt", "Apache Airflow", "PostgreSQL", "Snowflake", "Databricks", "Delta Lake", "API Ingestion"],
    machineLearning: ["Supervised Learning", "Deep Learning", "Transfer Learning", "Forecasting", "Feature Engineering", "CatBoost", "LightGBM", "Model Evaluation", "joblib Artifacts"],
    nlp: ["Text-to-SQL", "Hybrid Schema RAG", "Topic Modelling", "Semantic Clustering", "Sentiment Analysis", "BPE Tokenization", "SQL Safety"],
    mlops: ["Docker", "FastAPI", "Streamlit", "GitHub Actions", "pytest", "Model Metadata", "Reproducible Artifacts", "Deployment Documentation"],
    languages: ["English (Professional)", "Vietnamese (Native)"]
  }
};
