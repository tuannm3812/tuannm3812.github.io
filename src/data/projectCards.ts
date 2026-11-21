// Display copy for every project card, written to the card rules in
// docs/12-design-guideline.md ("Project cards", Mike, 17 Nov):
//   title       the project, not the event; Title Case
//   description one sentence, 8 to 14 words, no model, library or client names
//   tags        exactly 3 from tagVocabulary.ts, main skill first
// Keyed by the project's source title (resume.ts or githubProjects.ts), which
// priority, origin, logo and poster lookups still use. Tests fail when a
// project has no entry here, so a newly synced repo cannot ship unreviewed copy.
import type { Tag } from './tagVocabulary';

export interface ProjectCardCopy {
  title: string;
  description: string;
  tags: [Tag, Tag, Tag];
}

export const PROJECT_CARDS: Record<string, ProjectCardCopy> = {
  // Selected Work
  'Enterprise Text-to-SQL Agent': {
    title: 'Text-to-SQL Agent',
    description: 'Lets business users ask a database questions in plain English and check the SQL.',
    tags: ['Text-to-SQL', 'RAG', 'Python'],
  },
  CircleU: {
    title: 'CircleU',
    description: 'A private iOS journal that turns voice check-ins into reflections.',
    tags: ['Speech & Voice AI', 'Generative AI', 'SwiftUI'],
  },
  'Terminal-Bench Agent Harness': {
    title: 'Agent Harness Evaluation',
    description: "Tests how much an agent's harness, not its model, changes its results.",
    tags: ['LLM Agents', 'Agent Evaluation', 'Python'],
  },
  'AI Meal Planner': {
    title: 'AI Meal Planner',
    description: 'Plans meals sized to your goals and builds the shopping list.',
    tags: ['Multi-Agent Systems', 'RAG', 'FastAPI'],
  },
  'Wildfire Occurrence Prediction': {
    title: 'Wildfire Prediction',
    description: 'Forecasts daily fire risk and tests it on regions the model never saw.',
    tags: ['Machine Learning', 'Geospatial Analysis', 'Python'],
  },
  // Flagship for big data engineering (Mike, 21 Nov). Phase 0 collector is live;
  // the lakehouse tables come next, so the copy says "live feeds", not results.
  'Sydney Transit Live Lakehouse': {
    title: 'Sydney Transit Lakehouse',
    description: "Collects Sydney's live bus, train and metro feeds into a lakehouse.",
    tags: ['Lakehouse', 'Big Data', 'Python'],
  },
  // Flagship, nearly complete (Mike, 21 Nov). Private repo.
  Dinksight: {
    title: 'Dinksight',
    description: 'Turns pickleball doubles footage into court positions, movement and speed.',
    tags: ['Computer Vision', 'Dashboards', 'Python'],
  },
  // Built at OpenAI Builder Days; the more complete of Mike's two products
  // there (18 Nov). The other, FireLens 3D, is an unfinished draft and stays off.
  'FarmLens: NSW Crop Suitability Explorer': {
    title: 'FarmLens',
    description: 'Screens any NSW land point for crop fit and shows the reasons.',
    tags: ['Geospatial Analysis', 'Data Pipelines', 'Python'],
  },

  // Hackathons & events
  // From the repo README (17 Nov): won the State Asphalts Intelligent Transport
  // Solutions Award. A GenAI-assisted design proposal; no runnable controller.
  'UTS Tech Festival 2026 GenAI Hackathon': {
    title: 'Smart Intersection Concept',
    description:
      'Award-winning GenAI concept for adaptive signals, bus priority and recycled pavement.',
    tags: ['Generative AI', 'Prompt Engineering', 'Python'],
  },
  'Half-time Briefing: Microsoft x Premier League Hackathon': {
    title: 'Half-time Briefing',
    description: 'Agents turn first-half match events into coaching calls and fan stories.',
    tags: ['Multi-Agent Systems', 'LLM Agents', 'Python'],
  },
  // Projects page only, not Home (Mike, 21 Nov). Private repo.
  'Pocket Dojo': {
    title: 'Pocket Dojo',
    description: 'Adapts household fixes to what you have and revises after each try.',
    tags: ['Generative AI', 'LLM Agents', 'React'],
  },
  // Weak output (Mike, 18 Nov): listed as a plain row under Other Projects.
  'Spatial Brain: UNSW AiSoc Hackathon 2026': {
    title: 'Spatial Brain',
    description: 'A shared canvas where agents link documents into reviewable context.',
    tags: ['Multi-Agent Systems', 'RAG', 'Python'],
  },
  'UNSW MA Hackathon 2026': {
    title: 'Kiva Loan Funding Speed',
    description: 'Predicts which micro-loans fund slowly, so lenders can step in early.',
    tags: ['Machine Learning', 'NLP', 'Python'],
  },

  // Kaggle
  'Bioacoustic Species Classification': {
    title: 'Bird Sound Classification',
    description: 'Identifies bird species from field recordings for ecological monitoring.',
    tags: ['Audio ML', 'Deep Learning', 'Python'],
  },
  'Kaggle CSIRO Image2Biomass': {
    title: 'Pasture Biomass Prediction',
    description: 'Estimates pasture biomass from field photos to support grazing decisions.',
    tags: ['Computer Vision', 'Gradient Boosting', 'Python'],
  },
  'Kaggle ROGII Wellbore Geology Prediction': {
    title: 'Wellbore Geology Prediction',
    description: 'Reconstructs underground rock layers along a drilled well from sensor logs.',
    tags: ['Machine Learning', 'Gradient Boosting', 'Python'],
  },
  'Kaggle AI Agent Security': {
    title: 'AI Agent Security',
    description: 'Designs attacks that make LLM agents misuse their tools, to test defences.',
    tags: ['LLM Agents', 'Agent Evaluation', 'Python'],
  },
  'Kaggle RSNA Knee Abnormality Detection': {
    title: 'Knee MRI Abnormality Detection',
    description: 'Flags knee abnormalities from MRI scans paired with radiology reports.',
    tags: ['Computer Vision', 'NLP', 'Deep Learning'],
  },
  'Kaggle Biohub Cell Tracking During Development': {
    title: '3D Cell Tracking',
    description: 'Tracks dividing cells through 3D microscopy of a developing embryo.',
    tags: ['Computer Vision', 'Deep Learning', 'Python'],
  },
  'Kaggle NFL Player Contact Detection': {
    title: 'NFL Player Contact Detection',
    description: 'Detects player-to-player contact from tracking data to support player safety.',
    tags: ['Machine Learning', 'Gradient Boosting', 'Computer Vision'],
  },
  'Kaggle Pokémon TCG AI Battle': {
    title: 'Pokémon TCG Battle Agent',
    description: 'A card-game agent that rates its own skill through self-play.',
    tags: ['Simulation Agents', 'Statistics', 'Python'],
  },
  'Kaggriculture Farm Economy Agent': {
    title: 'Farm Economy Agent',
    description:
      'A game agent for a two-player farm economy, promoted only on statistical evidence.',
    tags: ['Simulation Agents', 'Model Evaluation', 'Python'],
  },
  'Kaggle NeuroGolf 2026': {
    title: 'NeuroGolf Puzzle Solver',
    description: 'Solves abstract visual puzzles with small, exportable neural networks.',
    tags: ['Machine Learning', 'Deep Learning', 'Python'],
  },
  'Kaggle Maze Crawler': {
    title: 'Maze Crawler Agent',
    description: 'A game agent that explores mazes, tuned by replaying past matches.',
    tags: ['Simulation Agents', 'Model Evaluation', 'Python'],
  },
  'Kaggle Orbit Wars': {
    title: 'Orbit Wars Agent',
    description: 'A strategy agent for an orbital game, improved by replaying matches.',
    tags: ['Simulation Agents', 'Model Evaluation', 'Python'],
  },

  // Kaggle Playground Series, season 6
  'Kaggle S6E4 Predict Irrigation Need': {
    title: 'Irrigation Need',
    description: 'Predicts how much irrigation a field needs from soil and weather.',
    tags: ['Gradient Boosting', 'Machine Learning', 'Python'],
  },
  'Kaggle S6E5 Predict F1 Pit Stops': {
    title: 'F1 Pit Stops',
    description: 'Predicts Formula 1 pit stop decisions from lap-by-lap race data.',
    tags: ['Gradient Boosting', 'Machine Learning', 'Python'],
  },
  'Kaggle S6E6 Predicting Stellar Class': {
    title: 'Stellar Class',
    description: 'Classifies stars, galaxies and quasars from telescope measurements.',
    tags: ['Machine Learning', 'Model Evaluation', 'Python'],
  },
  'Kaggle S6E7 Predicting Student Health Risk': {
    title: 'Student Health Risk',
    description: 'Classifies student health risk from lifestyle and survey data.',
    tags: ['Gradient Boosting', 'Machine Learning', 'Python'],
  },
  'Kaggle S6E8 Predicting Smartphone Addiction': {
    title: 'Smartphone Addiction',
    description: 'Predicts smartphone addiction risk from behavioural survey data.',
    tags: ['Gradient Boosting', 'Model Evaluation', 'Python'],
  },
  'Kaggle S6E9 Predicting Electric Vehicle Purchases': {
    title: 'Electric Vehicle Purchases',
    description: 'Predicts who buys an electric vehicle from customer data.',
    tags: ['Gradient Boosting', 'Model Evaluation', 'Python'],
  },
  'Kaggle S6E10 Predicting Airline Satisfaction': {
    title: 'Airline Satisfaction',
    description: 'Predicts airline passenger satisfaction from survey and flight data.',
    tags: ['Gradient Boosting', 'Model Evaluation', 'Python'],
  },

  // Other projects
  'TikTok Semantic': {
    title: 'TikTok Climate Messaging',
    description: 'Maps how climate-action TikToks frame their message and which themes connect.',
    tags: ['Graph Analytics', 'NLP', 'Python'],
  },
  'VisionVoice: Image Captioning': {
    title: 'VisionVoice Image Captioning',
    description: 'Writes captions for photos taken by blind and low-vision users.',
    tags: ['Computer Vision', 'NLP', 'Deep Learning'],
  },
  'Flickr8k Image Captioning': {
    title: 'Flickr8k Image Captioning',
    description: 'Compares image captioning models on a compact everyday photo dataset.',
    tags: ['Computer Vision', 'NLP', 'Deep Learning'],
  },
  'YouTube Trending Snowflake Lakehouse': {
    title: 'YouTube Trends Lakehouse',
    description: 'Collects trending YouTube videos across countries into a Snowflake model.',
    tags: ['Data Pipelines', 'Data Modelling', 'Snowflake'],
  },
  'Sydney Rainfall Forecasting': {
    title: 'Sydney Rainfall Forecasting',
    description: 'Forecasts Sydney rainfall from weather data and serves it in an app.',
    tags: ['Forecasting', 'Gradient Boosting', 'Streamlit'],
  },
  AfriWeave: {
    title: 'AfriWeave',
    description: 'A culturally focused language prototype with its own trained tokenizer.',
    tags: ['NLP', 'Deep Learning', 'Streamlit'],
  },
  'Apple Foundation Agent': {
    title: 'Apple Foundation Agent',
    description: 'An interactive diagnostic that guides developers through workflow decisions.',
    tags: ['Generative AI', 'Streamlit', 'Python'],
  },

  // Coursework
  'FoodLens: Calibrated Food Recognition': {
    title: 'FoodLens',
    description: 'A food recognition app that says when it is unsure of a dish.',
    tags: ['Computer Vision', 'Deep Learning', 'FastAPI'],
  },
  'NYC Taxi Databricks': {
    title: 'NYC Taxi Lakehouse',
    description: 'Analyses millions of NYC taxi trips at scale in a Databricks lakehouse.',
    tags: ['Lakehouse', 'Big Data', 'Databricks'],
  },
  'Production-Grade ELT Pipeline': {
    title: 'Airbnb and Census Warehouse',
    description: 'Builds a Sydney Airbnb and Census data warehouse that keeps full history.',
    tags: ['Data Warehousing', 'Data Pipelines', 'dbt'],
  },
  'Solana Price Forecasting': {
    title: 'Solana Price Forecasting',
    description: 'Forecasts next-day Solana prices from live market data in a dashboard.',
    tags: ['Forecasting', 'API Ingestion', 'Streamlit'],
  },
  'Gender Equality Policy NLP': {
    title: 'Gender Equality Policy Analysis',
    description: 'Finds the main themes in public submissions on gender equality policy.',
    tags: ['NLP', 'Data Analysis', 'Python'],
  },
  'FAOSTAT Food Price Shock Dashboard': {
    title: 'Food Price Shock Dashboard',
    description: 'Shows which countries are most exposed to global food price shocks.',
    tags: ['Dashboards', 'Data Visualisation', 'Streamlit'],
  },
};
