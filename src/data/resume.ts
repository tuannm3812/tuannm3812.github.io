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
    { value: "16", label: "Technical projects across ML, data, and AI" },
    { value: "5+", label: "Core domains from CV to MLOps" },
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
        "Completed academic projects in full-stack ML systems, cloud data engineering, MLOps pipelines, predictive modelling, statistical analysis, and AI-driven decision support."
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
      github: "https://github.com/tuannm3812/birdclef-2026",
      impact: "Kaggle-ready audio classification workspace",
      stack: ["PyTorch", "EfficientNet", "Perch", "PCEN", "SpecAugment"],
      points: [
        "Architected a deep learning workspace for Kaggle BirdCLEF+ 2026, implementing EfficientNet-B0 baselines and Google Perch v2 probe models.",
        "Integrated PCEN preprocessing and SpecAugment for robust classification of 206 species in noisy forest environments.",
        "Developed reusable training utilities and exploratory notebooks for bioacoustic signal processing."
      ]
    },
    {
      title: "VisionVoice: Image Captioning",
      category: "Deep Learning & Computer Vision",
      github: "https://github.com/tuannm3812/VisionVoice",
      impact: "Accessible VizWiz captioning with visual attention",
      stack: ["PyTorch", "ResNet-LSTM", "Bahdanau Attention", "Beam Search", "VizWiz"],
      points: [
        "Built a VizWiz image captioning system with rerunnable EDA and modelling notebooks for leakage-free internal train/validation/test splits.",
        "Compared ResNet-LSTM and attention-based captioning models with qualitative review and reproducible internal evaluation."
      ]
    },
    {
      title: "Flickr8k Image Captioning",
      category: "Deep Learning & Computer Vision",
      github: "https://github.com/tuannm3812/flickr-image-captioning",
      impact: "Reproducible Flickr8k captioning workflow",
      stack: ["PyTorch", "VGG16", "ResNet50", "Attention", "Beam Search"],
      points: [
        "Compared baseline CNN-LSTM, attention CNN-LSTM, and ResNet50 attention captioning systems with tracked Kaggle artifacts.",
        "Refined caption quality using ResNet50 spatial features, additive attention, mixed precision, scheduling, and beam-search decoding."
      ]
    },
    {
      title: "Production-Grade ELT Pipeline",
      category: "Data Engineering & Analytics",
      github: "https://github.com/tuannm3812/airbnb-ELT-warehouse",
      impact: "Airbnb and Census warehouse with dimensional marts",
      stack: ["Airflow", "dbt", "PostgreSQL", "Medallion", "SCD Type 2"],
      points: [
        "Implemented an ELT warehouse combining monthly Sydney Airbnb listing extracts, ABS Census data, and NSW LGA mapping files.",
        "Orchestrated Bronze, Silver, and Gold transformations with Airflow and dbt, including SCD Type 2 snapshots for historical host, property, neighbourhood, and LGA modelling."
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
        "Built an interactive dashboard connecting Australia and New Zealand producer prices with global hunger and import-dependency indicators.",
        "Prepared cleaned analytical tables from FAOSTAT, FAO Food Price Index, Global Hunger Index, and World Bank datasets.",
        "Added what-if shock scenarios and vulnerability views for exploring countries exposed to commodity price pressure."
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
        "Developed a production-ready Solana forecasting project with live Kraken OHLCV data, an anchored residual model, and bundled model inference.",
        "Packaged data loading, feature engineering, training, and prediction code with tests and a deployable Streamlit dashboard.",
        "Documented optional FastAPI serving for separating the dashboard from the prediction service."
      ]
    },
    {
      title: "Gender Equality Policy NLP",
      category: "NLP & Generative AI",
      github: "https://github.com/tuannm3812/gender-equality-policy-nlp",
      impact: "Policy discourse analysis from parliamentary submissions",
      stack: ["NLP", "TF-IDF", "LDA", "K-Means", "Python"],
      points: [
        "Analyzed Australian parliamentary submissions on workplace gender equality reform using cleaning, TF-IDF, topic modelling, and clustering.",
        "Compared stakeholder language across unions, industry groups, government bodies, advocacy organisations, and academics.",
        "Produced reusable package modules, plots, notebooks, and a written analytical report."
      ]
    },
    {
      title: "TikTok Semantic",
      category: "NLP & Generative AI",
      github: "https://github.com/tuannm3812/tiktok-semantic",
      impact: "Semantic marketing analytics for climate-action TikToks",
      stack: ["Python", "Pandas", "scikit-learn", "NetworkX", "NLP"],
      points: [
        "Built a reusable analytics pipeline for UNSW Marketing Analytics Hackathon TikTok data, normalizing nested post, author, comment, hashtag, and multimodal summary objects.",
        "Generated semantic performance tables for climate-action messaging, including theme performance, message recommendations, comment intent, sentiment, and creator bridge metrics.",
        "Packaged scripts, reusable modules, notebooks, and insight documentation so the sample workflow can rerun when the full dataset is available locally."
      ]
    },
    {
      title: "AfriWeave",
      category: "NLP & Generative AI",
      github: "https://github.com/tuannm3812/AfriWeave",
      impact: "Culturally focused Streamlit NLP prototype",
      stack: ["Streamlit", "Keras", "JAX", "BPE", "Transformers"],
      points: [
        "Built an interactive NLP prototype for corpus exploration, N-gram phrase analysis, and culturally focused text generation.",
        "Implemented a transparent N-gram baseline, Byte Pair Encoding tokenizer, and transformer architecture scaffold.",
        "Added tests and fallback sample data so the app remains usable during demos when remote data is unavailable."
      ]
    },
    {
      title: "AIPA: Text-to-SQL Agent",
      category: "NLP & Generative AI",
      github: "https://github.com/tuannm3812/aipa-text-to-sql-agent",
      demo: "https://aipa-text-to-sql-agent.streamlit.app/",
      impact: "Schema RAG text-to-SQL agent with local execution",
      stack: ["Gemini/Ollama", "Schema RAG", "Streamlit", "SQLite", "SQLGlot"],
      points: [
        "Built a text-to-SQL agent that retrieves relevant schema chunks with hybrid lexical, semantic, value-hint, and foreign-key graph signals before prompting Gemini or Ollama.",
        "Implemented local SQLite execution with SQLGlot-backed read-only validation, SQLite authorizer controls, result caps, query repair, tests, and an evaluation harness."
      ]
    },
    {
      title: "Apple Foundation Agent",
      category: "Applied AI Products",
      github: "https://github.com/tuannm3812/apple-foundation-agent",
      impact: "Interactive Streamlit diagnostic for developer workflows",
      stack: ["Streamlit", "Python", "UX", "Scoring Logic", "Deployment"],
      points: [
        "Designed a five-step diagnostic experience that maps recovery and delivery choices to developer workflow profiles.",
        "Built dynamic scoring, local image assets, and a polished Streamlit interface suitable for portfolio review.",
        "Documented a lightweight deployment path for Streamlit Community Cloud or similar Python app hosts."
      ]
    },
    {
      title: "AI Meal Planner",
      category: "Applied AI Products",
      github: "https://github.com/tuannm3812/ai-meal-planner",
      impact: "Multi-agent meal planning product prototype",
      stack: ["FastAPI", "React", "Gemini", "Tailwind", "Pydantic"],
      points: [
        "Built a multi-agent meal-planning app that turns a craving into a meal plan, nutrition summary, and supermarket shopping list.",
        "Implemented FastAPI endpoints, deterministic fallbacks, file-backed user profiles, and meal history storage.",
        "Created a React dashboard for submitting meal requests and reviewing generated nutrition and shopping results."
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
        "Maintained a personal portfolio for machine learning, data engineering, MLOps, and selected project work.",
        "Integrated Firebase-backed contact and comment features with GitHub Pages deployment through GitHub Actions.",
        "Structured the site around resume content, project evidence, writing, and accessible contact paths."
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
      tools: ["PyTorch", "scikit-learn", "CNN/LSTM", "Transfer Learning", "Forecasting", "Model Evaluation"]
    },
    {
      title: "Production & MLOps",
      description: "Deployment patterns for moving models, agents, and data products beyond notebooks.",
      tools: ["FastAPI", "Streamlit", "Docker", "GitHub Actions", "pytest", "Reproducible Artifacts"]
    },
    {
      title: "AI, NLP & Agents",
      description: "Applied language systems for text understanding, schema reasoning, and natural-language interfaces.",
      tools: ["LLMs", "Schema RAG", "Text-to-SQL", "SQLGlot", "BPE Tokenization", "Topic Modelling"]
    }
  ],
  skills: {
    programming: ["Python", "SQL", "PySpark", "TypeScript", "OOP", "Unit Testing", "Package Development"],
    dataEngineering: ["Medallion Architecture", "dbt", "Apache Airflow", "Snowflake", "Databricks", "Delta Lake", "API Ingestion"],
    machineLearning: ["Supervised Learning", "Unsupervised Learning", "Deep Learning", "Transfer Learning", "Forecasting", "Model Evaluation", "Feature Engineering"],
    nlp: ["Text-to-SQL", "Schema RAG", "Topic Modelling", "Sentiment Analysis", "Stance Detection", "BPE Tokenization", "SQL Safety"],
    mlops: ["Docker", "FastAPI", "Streamlit", "GitHub Actions", "pytest", "Model Versioning", "Reproducible Artifacts"],
    languages: ["English (Professional)", "Vietnamese (Native)"]
  }
};
