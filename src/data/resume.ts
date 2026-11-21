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
  name: 'Tuan Nguyen (Mike)',
  title: 'Machine Learning Engineer & Data Professional',
  email: 'tuannm3812@gmail.com',
  phone: '+61 433 466 749',
  location: 'Sydney, NSW',
  linkedin: 'https://linkedin.com/in/tuan-m-nguyen',
  github: 'https://github.com/tuannm3812',
  kaggle: 'https://www.kaggle.com/tuannm3812',
  summary:
    'Data and machine learning professional with 7+ years of experience turning ambiguous business problems into reliable analytics products, predictive models, and production-ready data workflows. I combine stakeholder-facing judgment from consulting and e-commerce with hands-on engineering across Python, SQL, cloud data platforms, MLOps, computer vision, and Kaggle-style experimentation.',
  highlights: [
    { value: '7+', label: 'Years building analytics and ML workflows' },
    { value: '30', label: 'Technical projects across ML, data, and AI' },
    { value: '5', label: 'Domains: agents, vision, data eng, Kaggle, MLOps' },
    { value: 'Full-stack', label: 'From data pipelines to deployed AI apps' },
  ],
  // [[double brackets]] mark key terms the Experience page highlights.
  education: [
    {
      institution: 'University of Technology Sydney',
      location: 'Sydney, Australia',
      degree: 'Master of Data Science and Innovation (High Distinction)',
      period: 'Feb 2025 – Feb 2027',
      points: [
        'Coursework in [[machine learning]], [[big data engineering]], statistical modelling, [[deep learning]], computer vision, NLP and [[applied AI systems]].',
        'Built projects in [[full-stack ML systems]], [[Databricks and Snowflake]] analytics, [[MLOps pipelines]], Kaggle competitions and AI-driven decision support.',
      ],
    },
    {
      institution: 'Foreign Trade University',
      location: 'Hanoi, Vietnam',
      degree: 'Bachelor of International Economics and Business (High Distinction)',
      period: 'Aug 2013 – Jun 2017',
      points: [
        'Selective program in [[applied economics]] and [[analytical thinking]], with foundations in [[econometrics]], international trade, finance and strategic management.',
      ],
    },
  ],
  // [[double brackets]] mark key terms the Experience page highlights.
  experience: [
    {
      company: 'Shopee Vietnam',
      location: 'HCMC, Vietnam',
      role: 'Lead Data Optimization & Insights Manager · Growth & Acquisition',
      period: 'Dec 2021 – Jan 2025',
      points: [
        'Delivered strategic growth and pricing insights directly to [[senior executives]] to optimize commercial fee structures, ad campaigns, and voucher incentives.',
        'Served as the [[data and strategy lead]] for the acquisition and onboarding team, designing unified datasets mapping the entire partner lifecycle.',
        'Architected automated [[BigQuery data warehousing pipelines]] consolidating transaction and traffic data, reducing manual processing workloads by 80%.',
        'Developed [[predictive modeling workflows]] in Python (churn prediction, growth clustering) that improved partner graduation rates to 85% and increased voucher campaign ROI by 15%.',
      ],
    },
    {
      company: 'FPT Software & FPT Digital',
      location: 'Hanoi, Vietnam',
      role: 'Strategy Lead (Global Affairs) & Transformation Consultant',
      period: 'Dec 2020 – Dec 2021',
      points: [
        'Led technology partnership communication with [[multinational corporations]] for the Global Affairs team, setting up integration channels.',
        'Collaborated with top-tier global consulting firms ([[McKinsey, BCG]]) on enterprise-level digital maturity and data architecture transformation projects.',
        'Co-designed multi-year [[digital transformation roadmaps]] and technology blueprints (relational DWH, cloud migration) for billion-dollar enterprises and regional economic hubs.',
        'Presented digital enablers to client [[steering committees]] to speed up technology adoption.',
      ],
    },
    {
      company: 'PwC Vietnam',
      location: 'Hanoi, Vietnam',
      role: 'Senior Assurance Associate · Financial Services & Capital Markets',
      period: 'Aug 2017 – Dec 2020',
      points: [
        'Acted as [[data champion]], building Python and SQL scripts to automate high-volume transaction matching, reconciliations, and interest rate audits.',
        'Reduced complex transaction testing workloads by over 90%, shrinking 2-day manual verification cycles to [[under 1 hour]].',
        'Ingested and analyzed [[millions of transactional records]] across 40+ commercial banking and securities clients using database querying.',
        'Identified control deficiencies and systemic booking anomalies, presenting audit insights and structural fixes directly to [[client C-levels]].',
      ],
    },
  ],
  projects: [
    {
      title: 'Bioacoustic Species Classification',
      category: 'Deep Learning & Vision',
      github: 'https://github.com/tuannm3812/kaggle-birdclef-2026',
      impact: 'Google Perch v2 and EfficientNet sound classification model',
      stack: ['Perch v2', 'EfficientNet-B0', 'PyTorch', 'Audio ML', 'CPU Inference'],
      points: [
        'Developed a PyTorch audio classification workspace utilizing Google Perch v2 embeddings and EfficientNet-B0 fine-tuning for multi-species ecological monitoring.',
        'Optimized local inference performance to run within CPU-safe memory constraints, addressing potential spectrogram array memory leaks on long audio waveforms.',
      ],
    },
    {
      title: 'VisionVoice: Image Captioning',
      category: 'Deep Learning & Vision',
      github: 'https://github.com/tuannm3812/VisionVoice',
      impact: 'Accessible VizWiz captioning with visual attention',
      stack: ['PyTorch', 'ResNet-LSTM', 'Bahdanau Attention', 'Beam Search', 'VizWiz'],
      points: [
        'Built an accessibility-focused VizWiz image captioning system for generating captions from images captured in assistive settings.',
        'Applied ResNet-LSTM baselines, Bahdanau-style attention, beam search, leakage-aware splits, qualitative review, and reproducible PyTorch experiments.',
      ],
    },
    {
      title: 'Flickr8k Image Captioning',
      category: 'Deep Learning & Vision',
      github: 'https://github.com/tuannm3812/flickr-image-captioning',
      impact: 'Reproducible Flickr8k captioning workflow',
      stack: ['PyTorch', 'VGG16', 'ResNet50', 'Attention', 'Beam Search'],
      points: [
        'Built a Flickr8k image captioning workflow for comparing CNN-LSTM caption generation approaches on a compact vision-language dataset.',
        'Applied VGG16 and ResNet50 encoders, additive attention, beam search, mixed precision, tracked artifacts, qualitative inference examples, and reusable PyTorch training structure.',
      ],
    },
    {
      title: 'Production-Grade ELT Pipeline',
      category: 'Data Engineering & Analytics',
      github: 'https://github.com/tuannm3812/airbnb-ELT-warehouse',
      impact: 'Sydney Airbnb & Census warehouse with Airflow and dbt',
      stack: ['Airflow', 'dbt', 'PostgreSQL', 'Medallion', 'SCD Type 2'],
      points: [
        'Designed a Medallion-architecture ELT data pipeline for Sydney Airbnb and Census logs, automating historical dimensional snapshots via dbt SCD Type 2.',
        'Orchestrated monthly data load schedules using Apache Airflow, managing schema evolution and reducing data drift errors across LGA regional dimensions.',
      ],
    },
    {
      title: 'FAOSTAT Food Price Shock Dashboard',
      category: 'Data Engineering & Analytics',
      github: 'https://github.com/tuannm3812/assignment3-faostat-viz',
      demo: 'https://assignment3-faostat-viz.streamlit.app/',
      impact: 'Live Streamlit dashboard for global food-price risk',
      stack: ['Streamlit', 'Pandas', 'Plotly', 'FAOSTAT', 'World Bank'],
      points: [
        'Built a Streamlit dashboard for exploring global food-price shocks, import dependency, and food-security risk across countries and commodities.',
        'Applied FAOSTAT, FAO, Global Hunger Index, and World Bank data integration with Pandas, Plotly commodity trends, volatility views, maps, and what-if scenarios.',
      ],
    },
    {
      title: 'Solana Price Forecasting',
      category: 'MLOps & Forecasting',
      github: 'https://github.com/tuannm3812/solana-price-prediction',
      demo: 'https://solana-price-prediction-tuannm3812.streamlit.app/',
      impact: 'Real-time forecasting and Streamlit dashboard',
      stack: ['Anchored Residual ML', 'Kraken API', 'Scikit-learn', 'FastAPI', 'Streamlit'],
      points: [
        'Built a Solana price forecasting workflow and dashboard for turning live market data into a repeatable next-day prediction experience.',
        'Applied Kraken OHLCV ingestion, technical-indicator feature engineering, anchored residual modeling, scikit-learn training, optional FastAPI serving, Streamlit delivery, and pytest checks.',
      ],
    },
    {
      title: 'Sydney Rainfall Forecasting',
      category: 'MLOps & Forecasting',
      github: 'https://github.com/tuannm3812/sydney-rainfall-forecasting',
      demo: 'https://sydney-rainfall-forecasting.streamlit.app/',
      impact: 'Sydney rainfall forecasting pipeline with Streamlit delivery',
      stack: ['HistGradientBoosting', 'Open-Meteo', 'Scikit-learn', 'joblib', 'Streamlit'],
      points: [
        'Built a Sydney rainfall forecasting pipeline and Streamlit app for weather-driven classification and regression workflows.',
        'Applied Open-Meteo ingestion, histogram gradient boosting models, joblib artifacts, model metadata, feature-order checks, future-weather target handling, and dashboard-ready inference tests.',
      ],
    },
    {
      title: 'Gender Equality Policy NLP',
      // Coursework, not a Kaggle competition: the Kaggle category drew a Kaggle badge.
      category: 'Data Engineering & Analytics',
      github: 'https://github.com/tuannm3812/gender-equality-policy-nlp',
      impact: 'Policy discourse analysis from parliamentary submissions',
      stack: ['NLP', 'TF-IDF', 'LDA', 'K-Means', 'Policy Analytics'],
      points: [
        'Built an NLP workflow for analyzing Australian parliamentary submissions on workplace gender equality policy and stakeholder framing.',
        'Applied text cleaning, TF-IDF, LDA topic modeling, K-Means clustering, visualization, and cross-stakeholder comparison across unions, industry groups, advocacy bodies, academics, and government sources.',
      ],
    },
    {
      title: 'TikTok Semantic',
      category: 'Data Engineering & Analytics',
      github: 'https://github.com/tuannm3812/tiktok-semantic',
      impact: 'Semantic marketing analytics for climate-action TikToks',
      stack: ['Pandas', 'scikit-learn', 'NetworkX', 'NLP', 'Graph Analytics'],
      points: [
        'Built a semantic marketing analytics pipeline for climate-action TikTok content across posts, creators, comments, hashtags, and multimodal summaries.',
        'Applied Pandas, scikit-learn, NetworkX, NLP theme extraction, comment intent analysis, sentiment/emotion review, recommendation tables, and creator bridge metrics.',
      ],
    },
    {
      title: 'AfriWeave',
      category: 'AI Agents & LLM Products',
      github: 'https://github.com/tuannm3812/AfriWeave',
      impact: 'Culturally focused Streamlit NLP prototype',
      stack: ['Streamlit', 'Keras', 'JAX', 'BPE', 'Transformers'],
      points: [
        'Built an interactive NLP prototype for culturally focused text generation and corpus exploration through a lightweight Streamlit interface.',
        'Applied Keras/JAX components, BPE tokenization, N-gram baselines, transformer-style modeling, deterministic fallback data, testable modules, and demo-oriented UX.',
      ],
    },
    {
      title: 'Sydney Transit Live Lakehouse',
      category: 'Data Engineering & Analytics',
      github: 'https://github.com/tuannm3812/sydney-transit-lakehouse',
      impact: 'Live lakehouse on Transport for NSW real-time feeds',
      stack: ['Python', 'AWS EC2', 'Docker', 'Apache Iceberg', 'DuckDB', 'dbt'],
      points: [
        'Building a live lakehouse on Transport for NSW real-time feeds: an always-on collector on AWS, replayable raw snapshots and Apache Iceberg tables.',
        'Designed to show which scheduled services never ran and where buses bunch, through dbt marts, a public dashboard and a text-to-SQL analyst.',
      ],
    },
    {
      title: 'Dinksight',
      category: 'Deep Learning & Vision',
      // Private repo: no source link.
      impact: 'Pickleball doubles footage turned into court positions, movement and speed',
      stack: ['Python', 'Computer Vision', 'Object Tracking', 'React'],
      points: [
        'Building computer vision for single-camera pickleball doubles footage: four-player tracking, court calibration in metres and ball tracking with uncertainty evidence.',
        'Built an interactive match-analysis dashboard with replay, court maps, shot and bounce analytics, backed by 600+ automated tests.',
      ],
    },
    {
      title: 'Pocket Dojo',
      category: 'AI Agents & LLM Products',
      // Private repo: no source link. Grew out of the OpenAI buildathon team entry.
      impact: 'Household tips adapted to what you have, revised after each attempt',
      stack: ['Next.js', 'TypeScript', 'OpenAI API'],
      points: [
        'Started as a team buildathon entry and now developed solo: a web app that adapts practical household fixes to the items and limits a person has.',
        'Revises the next step from feedback on what failed, while keeping the original restrictions.',
      ],
    },
    {
      title: 'Terminal-Bench Agent Harness',
      category: 'AI Agents & LLM Products',
      // Private repo: no source link. The poster is hosted on the site instead.
      demo: '/assets/posters/harness.jpg',
      impact: 'Custom agent harness tested against Terminus 2 with the model held fixed',
      stack: ['LangGraph', 'Harbor', 'Terminal-Bench', 'Python'],
      points: [
        'Led a team of six building a LangGraph agent harness inside Harbor and testing it against Terminus 2 on Terminal-Bench in paired three-attempt trials on a frozen protocol.',
        'No accuracy advantage was established (0.356 vs 0.422 paired accuracy, same model); the frozen protocol gives a fair way to test any future harness change.',
      ],
    },
    {
      title: 'Wildfire Occurrence Prediction',
      category: 'MLOps & Forecasting',
      // Private repo: no source link. The poster is hosted on the site instead.
      demo: '/assets/posters/fire.pdf',
      impact: 'Daily fire prediction tested on regions the model has never seen',
      stack: ['Python', 'TabPFN', 'Mixture of experts', 'Satellite data'],
      points: [
        'Audited 19,849 satellite hotspots and combined weather, fuel moisture and land cover into 376 predictors for the Greater Blue Mountains.',
        'Compared logistic regression through TabPFN and a mixture of experts on 47 spatially blocked 25 km folds: holding a region out moved scores more than the choice of model.',
      ],
    },
    {
      title: 'Enterprise Text-to-SQL Agent',
      category: 'AI Agents & LLM Products',
      github: 'https://github.com/tuannm3812/text-to-sql-agent',
      demo: 'https://aipa-text-to-sql-agent.streamlit.app/',
      impact: 'Schema RAG agent with AST-validated SQLite execution sandbox',
      stack: ['Gemini/Ollama', 'Hybrid Schema RAG', 'Streamlit', 'SQLite', 'SQLGlot'],
      points: [
        'Built a secure schema-RAG Text-to-SQL agent with query-repair loops, achieving high-fidelity translations without exposing raw client database records to LLM API endpoints.',
        'Enforced database safety using SQLite authorizer controls and SQLGlot AST validation to block malicious prompt injections and unauthorized DDL commands.',
      ],
    },
    {
      title: 'Apple Foundation Agent',
      category: 'AI Agents & LLM Products',
      github: 'https://github.com/tuannm3812/apple-foundation-agent',
      impact: 'Interactive Streamlit diagnostic for developer workflows',
      stack: ['Streamlit', 'Scoring Logic', 'Streamlit UX', 'Decision Flow', 'Deployment'],
      points: [
        'Built an interactive diagnostic app for mapping developer workflow decisions into profile outcomes across delivery and recovery scenarios.',
        'Applied Streamlit UX, scoring logic, decision-flow design, deployment packaging, and product-style prompts covering iteration, legacy systems, deployment pressure, and recovery patterns.',
      ],
    },
    {
      title: 'AI Meal Planner',
      category: 'AI Agents & LLM Products',
      github: 'https://github.com/tuannm3812/ai-meal-planner',
      demo: 'https://tuannm3812-ai-meal-planner.streamlit.app/',
      impact: 'Multi-agent wellness planner with FastAPI contract checks',
      stack: ['FastAPI', 'Streamlit', 'scikit-learn', 'Local RAG', 'USDA API'],
      points: [
        'Architected a multi-agent planning workflow with FastAPI and Pydantic, executing parallelized dietary constraint checks and USDA/FatSecret nutrition lookups.',
        'Enforced type-safe contract validation under automated CI testing, reducing client-server schema mismatch errors on meal suggestion payloads.',
      ],
    },
    {
      title: 'UTS Tech Festival 2026 GenAI Hackathon',
      category: 'AI Agents & LLM Products',
      // The repo is private, so a source link 404s for visitors. Restore
      // `github` once uts-techfest-2026-genai-hackathon is made public.
      demo: '/assets/posters/techfest-deck.pdf',
      impact:
        'Three GenAI solutions for resilient housing, a future worksite and a smart intersection',
      stack: [
        'Generative AI',
        'Austroads Signal Design',
        'Sustainable Asphalt Mix',
        'Telemetry & Fleet Matrix',
        'Prompt Engineering',
      ],
      points: [
        'Developed comprehensive technical submissions for three scenarios: LEGO sustainable urban housing, Caterpillar/WesTrac worksite fleet transition, and Austroads-aligned smart intersection mix design.',
        'Applied generative AI prompting strategy, adaptive signal logic, sustainable mix design, machinery telemetry plans, and automated HTML/PDF document compilation.',
      ],
    },
  ],
  reflections: [
    {
      title: 'Bridging the Gap',
      category: 'Career Evolution',
      points: [
        'Moving from professional services at PwC to data optimization at Shopee taught me that strong models start with strong domain understanding.',
        'The work that matters usually speaks two languages: business ROI and technical scalability.',
      ],
    },
    {
      title: 'Product-Centric ML',
      category: 'Philosophy',
      points: [
        'Model quality only matters when the workflow around it is reproducible, inspectable, and useful to a real decision.',
        'Choosing the right tool means balancing signal, latency, cost, maintainability, and the shape of the user problem.',
      ],
    },
    {
      title: 'The Lifelong Beta',
      category: 'Mindset',
      points: [
        'The shift from batch analytics to real-time ML, vision systems, and AI agents rewards structured experimentation.',
        'Competitions, academic projects, and open-source work keep my practice sharp because every notebook needs a clear story, artifact, and next step.',
      ],
    },
  ],
  technologyStack: [
    {
      title: 'Languages & Engineering',
      description:
        'Daily tools for analysis, modelling, automation, and maintainable project structure.',
      tools: ['Python', 'SQL', 'PySpark', 'TypeScript', 'OOP', 'Testing'],
    },
    {
      title: 'Data Platforms',
      description:
        'Cloud warehouse and lakehouse patterns for reliable analytics, ingestion, and historical modelling.',
      tools: ['BigQuery', 'Snowflake', 'Databricks', 'Delta Lake', 'PostgreSQL', 'Medallion'],
    },
    {
      title: 'Orchestration & Analytics',
      description: 'Pipelines, transformation layers, and stakeholder-facing reporting workflows.',
      tools: ['Apache Airflow', 'dbt', 'ETL/ELT', 'API Ingestion', 'Looker Studio', 'Data Quality'],
    },
    {
      title: 'Machine Learning',
      description:
        'Classical ML, deep learning, computer vision, audio ML, and time-series experimentation.',
      tools: ['PyTorch', 'scikit-learn', 'LightGBM', 'CatBoost', 'ResNet50', 'Perch v2'],
    },
    {
      title: 'Production & MLOps',
      description:
        'Deployment patterns for moving models, agents, and data products beyond notebooks.',
      tools: [
        'FastAPI',
        'Streamlit',
        'GitHub Actions',
        'pytest',
        'Model Artifacts',
        'Submission Workflows',
      ],
    },
    {
      title: 'AI, NLP & Agents',
      description:
        'Applied language systems for text understanding, schema reasoning, and natural-language interfaces.',
      tools: [
        'LLMs',
        'Hybrid Retrieval',
        'Text-to-SQL',
        'SQLGlot',
        'Semantic Analytics',
        'Topic Modelling',
      ],
    },
  ],
  skills: {
    programming: [
      'Python',
      'SQL',
      'PySpark',
      'TypeScript',
      'OOP',
      'Unit Testing',
      'Package Development',
      'Reusable Project Structure',
    ],
    dataEngineering: [
      'Medallion Architecture',
      'dbt',
      'Apache Airflow',
      'PostgreSQL',
      'Snowflake',
      'Databricks',
      'Delta Lake',
      'API Ingestion',
    ],
    machineLearning: [
      'Supervised Learning',
      'Deep Learning',
      'Transfer Learning',
      'Forecasting',
      'Feature Engineering',
      'CatBoost',
      'LightGBM',
      'Model Evaluation',
      'joblib Artifacts',
    ],
    nlp: [
      'Text-to-SQL',
      'Hybrid Schema RAG',
      'Topic Modelling',
      'Semantic Clustering',
      'Sentiment Analysis',
      'BPE Tokenization',
      'SQL Safety',
    ],
    mlops: [
      'Docker',
      'FastAPI',
      'Streamlit',
      'GitHub Actions',
      'pytest',
      'Model Metadata',
      'Reproducible Artifacts',
      'Deployment Documentation',
    ],
    languages: ['English (Professional)', 'Vietnamese (Native)'],
  },
};
