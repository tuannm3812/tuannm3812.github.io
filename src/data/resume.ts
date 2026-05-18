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
  summary: "Data and machine learning professional with 7+ years of experience turning ambiguous business problems into reliable analytics products, predictive models, and production-ready data workflows. I combine stakeholder-facing judgment from consulting and e-commerce with hands-on engineering across Python, SQL, cloud data platforms, and MLOps.",
  highlights: [
    { value: "7+", label: "Years building analytics and ML workflows" },
    { value: "21", label: "Technical projects across ML, data, and AI" },
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
        "Coursework includes machine learning, big data engineering, statistical modelling, deep learning, computer vision, and natural language processing.",
        "Completed academic projects in full-stack ML systems, cloud data engineering, MLOps pipelines, predictive modelling, statistical analysis, Kaggle-style experimentation, and AI-driven decision support."
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
      stack: ["PyTorch", "EfficientNet-B0", "Perch v2", "Kaggle", "Audio ML"],
      points: [
        "Architected a Kaggle-ready BirdCLEF+ 2026 workspace with curated EDA, EfficientNet-B0 baselines, Google Perch v2 probes, reusable modules, and submission notebooks.",
        "Documented the project with report artifacts, lightweight trained model outputs, and repeatable scripts for noisy multi-species ecological audio experiments."
      ]
    },
    {
      title: "VisionVoice: Image Captioning",
      category: "Deep Learning & Computer Vision",
      github: "https://github.com/tuannm3812/VisionVoice",
      impact: "Accessible VizWiz captioning with visual attention",
      stack: ["PyTorch", "ResNet-LSTM", "Bahdanau Attention", "Beam Search", "VizWiz"],
      points: [
        "Built an accessibility-focused VizWiz image captioning system with PyTorch, ResNet-LSTM baselines, Bahdanau-style attention, and beam search.",
        "Maintained rerunnable EDA, leakage-aware data splits, qualitative review, and reproducible experiments to compare captioning approaches."
      ]
    },
    {
      title: "Flickr8k Image Captioning",
      category: "Deep Learning & Computer Vision",
      github: "https://github.com/tuannm3812/flickr-image-captioning",
      impact: "Reproducible Flickr8k captioning workflow",
      stack: ["PyTorch", "VGG16", "ResNet50", "Attention", "Beam Search"],
      points: [
        "Built a Flickr8k captioning workflow with PyTorch, VGG16/ResNet50 encoders, CNN-LSTM models, additive attention, and beam search.",
        "Improved the experiment workflow with tracked Kaggle artifacts, qualitative inference examples, mixed precision, and reusable training structure."
      ]
    },
    {
      title: "Production-Grade ELT Pipeline",
      category: "Data Engineering & Analytics",
      github: "https://github.com/tuannm3812/airbnb-ELT-warehouse",
      impact: "Airbnb and Census warehouse with dimensional marts",
      stack: ["Airflow", "dbt", "PostgreSQL", "Medallion", "SCD Type 2"],
      points: [
        "Implemented an ELT warehouse with Airflow, dbt, PostgreSQL, Bronze-Silver-Gold modelling, and Sydney Airbnb, Census, and LGA datasets.",
        "Preserved longitudinal market history through sequential monthly processing and SCD Type 2 snapshots across analytical dimensions."
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
        "Built a Streamlit and Plotly dashboard using FAOSTAT, FAO, Global Hunger Index, and World Bank data to analyze global food-price shocks.",
        "Supported food-security risk exploration with commodity trends, volatility views, import-dependency mapping, and what-if shock scenarios."
      ]
    },
    {
      title: "Solana Price Forecasting",
      category: "Time-Series & MLOps",
      github: "https://github.com/tuannm3812/solana-price-prediction",
      demo: "https://solana-price-prediction-tuannm3812.streamlit.app/",
      impact: "Real-time forecasting and Streamlit dashboard",
      stack: ["Streamlit", "FastAPI", "Kraken API", "Scikit-learn", "Pytest"],
      points: [
        "Developed a Solana forecasting workflow with live Kraken OHLCV data, scikit-learn, engineered technical indicators, Streamlit, and optional FastAPI serving.",
        "Packaged data loading, training, inference, tests, and dashboard delivery into a reproducible time-series project."
      ]
    },
    {
      title: "Sydney Rainfall Forecasting",
      category: "Time-Series & MLOps",
      github: "https://github.com/tuannm3812/sydney-rainfall-forecasting",
      demo: "https://sydney-rainfall-forecasting.streamlit.app/",
      impact: "Sydney rainfall forecasting pipeline with Streamlit delivery",
      stack: ["Streamlit", "Scikit-learn", "Open-Meteo", "joblib", "pytest"],
      points: [
        "Built an end-to-end Sydney rainfall forecasting pipeline with Open-Meteo observations, scikit-learn classification/regression models, joblib artifacts, and Streamlit.",
        "Strengthened reliability with refreshed model metadata and tests covering future-weather targets, feature ordering, and dashboard-ready inference assets."
      ]
    },
    {
      title: "Gender Equality Policy NLP",
      category: "NLP & Generative AI",
      github: "https://github.com/tuannm3812/gender-equality-policy-nlp",
      impact: "Policy discourse analysis from parliamentary submissions",
      stack: ["NLP", "TF-IDF", "LDA", "K-Means", "Python"],
      points: [
        "Analyzed Australian parliamentary submissions with Python, TF-IDF, LDA, K-Means clustering, and visualization to study workplace gender equality discourse.",
        "Identified stakeholder framing patterns across unions, industry groups, advocacy bodies, academics, and government sources."
      ]
    },
    {
      title: "TikTok Semantic",
      category: "NLP & Generative AI",
      github: "https://github.com/tuannm3812/tiktok-semantic",
      impact: "Semantic marketing analytics for climate-action TikToks",
      stack: ["Python", "Pandas", "scikit-learn", "NetworkX", "NLP"],
      points: [
        "Built a semantic marketing analytics pipeline with Python, Pandas, scikit-learn, NetworkX, and TikTok post, creator, comment, hashtag, and multimodal summary data.",
        "Produced competition-ready insight tables for climate-action messaging, including themes, recommendations, comment intent, sentiment/emotion, and creator bridge metrics."
      ]
    },
    {
      title: "AfriWeave",
      category: "NLP & Generative AI",
      github: "https://github.com/tuannm3812/AfriWeave",
      impact: "Culturally focused Streamlit NLP prototype",
      stack: ["Streamlit", "Keras", "JAX", "BPE", "Transformers"],
      points: [
        "Created an interactive NLP prototype with Streamlit, Keras/JAX, BPE tokenization, N-gram baselines, and transformer components for culturally focused text generation.",
        "Supported demo reliability with corpus exploration, deterministic fallback data, testable modules, and a lightweight user interface."
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
        "Built an enterprise-style text-to-SQL agent that sends only retrieved schema metadata to Gemini or Ollama, using hybrid lexical, semantic, value-hint, and foreign-key graph retrieval.",
        "Implemented read-only local SQLite execution with SQLGlot-backed validation, SQLite authorizer controls, result caps, query repair, automated tests, and benchmark evaluation outputs."
      ]
    },
    {
      title: "Apple Foundation Agent",
      category: "Applied AI Products",
      github: "https://github.com/tuannm3812/apple-foundation-agent",
      impact: "Interactive Streamlit diagnostic for developer workflows",
      stack: ["Streamlit", "Python", "UX", "Scoring Logic", "Deployment"],
      points: [
        "Built an interactive Streamlit diagnostic app with Python, scoring logic, and product-style UX for mapping developer workflow decisions into profile outcomes.",
        "Demonstrated applied AI product thinking through a polished decision flow covering recovery, iteration, deployment, legacy systems, and delivery pressure."
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
        "Built a multi-agent AI meal planner with FastAPI, Streamlit, Pydantic schemas, scikit-learn calorie expenditure prediction, and retrieval-first meal recommendations.",
        "Delivered a practical product workflow with allergy and health-condition filtering, USDA/FatSecret nutrition verification, shopping-list cost estimates, meal history, feedback capture, and CI-tested backend contracts."
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
        "Maintained a React, TypeScript, Tailwind, Firebase, and GitHub Actions portfolio for machine learning, data engineering, MLOps, and applied AI projects.",
        "Structured the site around resume content, project evidence, writing, accessible contact paths, and automated GitHub project sync."
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
        "Model accuracy is a proxy; production reliability and user adoption are the final tests.",
        "Choosing the right tool means balancing latency, cost, maintainability, and the shape of the user problem."
      ]
    },
    {
      title: "The Lifelong Beta",
      category: "Mindset",
      points: [
        "The shift from batch analytics to real-time ML and AI agents rewards structured experimentation.",
        "Competitions, academic projects, and open-source work keep my practice sharp and honest."
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
      description: "Classical ML, deep learning, computer vision, and time-series experimentation.",
      tools: ["PyTorch", "scikit-learn", "CatBoost", "LightGBM", "Transfer Learning", "Model Evaluation"]
    },
    {
      title: "Production & MLOps",
      description: "Deployment patterns for moving models, agents, and data products beyond notebooks.",
      tools: ["FastAPI", "Streamlit", "Docker", "GitHub Actions", "pytest", "Reproducible Artifacts"]
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
