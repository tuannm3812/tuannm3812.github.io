export const resumeData = {
  name: "Tuan Nguyen (Mike)",
  title: "Senior Data Professional | Machine Learning & Engineering",
  email: "tuannm3812@gmail.com",
  phone: "+61 433 466 749",
  location: "Sydney, NSW",
  linkedin: "https://linkedin.com/in/tuan-m-nguyen",
  summary: "Data Scientist and Machine Learning Engineer with 7+ years of experience delivering high-impact analytics solutions, predictive models, and data-driven insights across diverse industries. Expert in building scalable machine learning systems, cloud-native data pipelines, and end-to-end MLOps workflows using modern engineering best practices to bridge the gap between complex data and strategic business value. Strong technical foundation in distributed computing, advanced data orchestration, and production-grade deployment for sophisticated AI architectures.",
  education: [
    {
      institution: "University of Technology Sydney",
      location: "Sydney, Australia",
      degree: "Master of Data Science and Innovation (High Distinction)",
      period: "Feb 2025 – Feb 2027 (expected)",
      points: [
        "Courseworks include Machine Learning, Big Data Engineering, Statistical Modelling, Deep Learning, Computer Vision and Natural Language Processing.",
        "Completed academic projects in full-stack ML systems, cloud data engineering, MLOps pipelines, predictive modelling, statistical analysis, and AI-driven decision support."
      ]
    },
    {
      institution: "Foreign Trade University",
      location: "Hanoi, Vietnam",
      degree: "Bachelor of International Economics and Business (Distinction)",
      period: "Aug 2013 – Jun 2017",
      points: [
        "Completed a high-quality program emphasised Analytical Thinking, Applied Economics, and Professional Communication, providing a strong foundation in Econometrics, International Trade, Finance, and Strategic Management."
      ]
    }
  ],
  experience: [
    {
      company: "Shopee Vietnam",
      location: "HCMC, Vietnam",
      role: "Data Optimization Manager | Seller Investment Analytics Lead",
      period: "Dec 2021 – Jan 2025",
      points: [
        "Engineered End-to-End Data Pipelines: Architected and maintained automated data pipelines in Google BigQuery, processing high-volume e-commerce data to power real-time tracking and commercial strategy.",
        "Deployed Predictive ML Models: Developed and deployed machine learning models (including customer churn prediction and K-means seller clustering) to personalize user support and optimize resource allocation.",
        "Driven Data-Informed ROI: Led a cross-functional analytics team of 5, translating complex predictive insights into actionable investment strategies that achieved a 15% uplift in ROI.",
        "Built Scalable Analytics Products: Designed interactive dashboards in Google Data Studio, enabling self-service analytics and reducing ad-hoc data requests from non-technical stakeholders."
      ]
    },
    {
      company: "FPT Software",
      location: "Hanoi, Vietnam",
      role: "Senior Digital Transformation Consultant",
      period: "Dec 2020 – Dec 2021",
      points: [
        "Spearheaded Predictive CRM Integration: Led the technical implementation of enterprise CRM systems, specifically engineering predictive analytics modules for automated lead scoring and pipeline forecasting.",
        "Orchestrated Enterprise AI Adoption: Acted as the technical bridge for client teams, coaching them on leveraging AI tools and data-driven workflows, resulting in a 50% boost in operational productivity.",
        "Translated Strategy to Architecture: Partnered with business leaders to map operational bottlenecks, designing Agile digital transformation strategies underpinned by scalable data architecture."
      ]
    },
    {
      company: "PwC Vietnam",
      location: "Hanoi, Vietnam",
      role: "Senior Assurance Associate",
      period: "Aug 2017 – Dec 2020",
      points: [
        "Automated Anomaly Detection: Programmed custom Python and SQL scripts to automate fraud detection and anomaly testing, significantly reducing manual effort and increasing the accuracy of risk assessments.",
        "Executed Large-Scale Data Audits: Extracted, cleaned, and analyzed massive financial datasets across 40+ Banking and Capital Markets clients, ensuring strict data integrity and regulatory compliance.",
        "Pioneered Technical Upskilling: Stood out within the assurance practice by applying advanced data manipulation techniques to traditional financial audits, paving the way for more rigorous, code-based risk management."
      ]
    }
  ],
  projects: [
    {
      title: "Bioacoustic Species Classification",
      category: "Edge ML & Deep Learning",
      points: [
        "Architected a robust deep learning pipeline utilizing EfficientNet-B0 and Google Perch_v2 to classify 206 species, applying PCEN and SpecAugment to isolate audio signals in high-noise environments.",
        "Engineered a Stratified Group K-Fold validation framework to eliminate data leakage and optimized a sliding-window inference engine for deployment on low-power edge hardware."
      ]
    },
    {
      title: "High-Performance CNN Workflow",
      category: "Computer Vision",
      points: [
        "Developed a custom two-phase transfer learning protocol using MobileNetV3 and a 3-layer MLP head, leveraging warm-started weights to prevent catastrophic forgetting during fine-tuning.",
        "Optimized image ingestion pipelines with smart resizing (bicubic + aspect ratio preservation) and built a diagnostic evaluation suite for per-category F1-score analysis to debug model performance on visually similar classes."
      ]
    },
    {
      title: "Production-Grade ELT Pipeline – Airbnb",
      category: "Data Engineering",
      points: [
        "Designed a cloud-native ELT workflow in GCP implementing the Medallion Architecture (Bronze-Silver-Gold), utilizing Apache Airflow and dbt Cloud to transform raw data into scalable analytical marts.",
        "Automated Slowly Changing Dimensions (SCD Type 2) snapshots to maintain historical state, enabling longitudinal pricing analysis with 100% data lineage and integrity."
      ]
    },
    {
      title: "Cryptocurrency Price Forecasting System",
      category: "Time-Series & MLOps",
      points: [
        "Engineered a real-time forecasting engine integrating XGBoost and CNN-LSTM architectures for real-time BTC, ETH, and SOL prediction.",
        "Deployed a containerized FastAPI backend and an interactive Streamlit dashboard featuring live decision-support analytics and dynamic model interpretability charts."
      ]
    }
  ],
  skills: {
    programming: ["Python (Expert)", "SQL (Advanced)", "PySpark", "OOP", "Unit Testing", "Package Development"],
    dataEngineering: ["Medallion Architecture", "Bronze-Silver-Gold", "dbt Cloud", "Apache Airflow", "Snowflake", "Databricks", "Delta Lake", "ETL/ELT Orchestration"],
    machineLearning: ["Supervised/Unsupervised Learning", "Deep Learning (CNN, LSTM, DNN)", "Transfer Learning", "XGBoost", "LightGBM", "SMOTE"],
    nlp: ["Sentiment Analysis (VADER, TextBlob)", "Stance Detection", "Social Media Analytics", "Data Cleaning", "Feature Engineering"],
    mlops: ["Docker", "FastAPI", "Streamlit", "CI/CD", "Model Versioning", "TPU/GPU strategy optimization", "Sliding-Window Inference"],
    languages: ["English (Professional)", "Vietnamese (Native)"]
  }
};
