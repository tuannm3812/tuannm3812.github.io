export interface PriorityDetails {
  score: number;
  stars: number;
}

export const projectPriority: Record<string, PriorityDetails> = {
  // Ranked to Mike's tiers (21 Nov). Flagships: Text-to-SQL, Agent Harness,
  // Wildfire, Transit Lakehouse (big data engineering), AI Meal Planner, Dinksight.
  'Enterprise Text-to-SQL Agent': { score: 100, stars: 3 },
  'Terminal-Bench Agent Harness': { score: 98, stars: 3 },
  'Sydney Transit Live Lakehouse': { score: 97, stars: 3 },
  'Wildfire Occurrence Prediction': { score: 96, stars: 3 },
  'AI Meal Planner': { score: 95, stars: 3 },
  Dinksight: { score: 94, stars: 3 },
  'UNSW MA Hackathon 2026': { score: 93, stars: 2 },
  'FarmLens: NSW Crop Suitability Explorer': { score: 92, stars: 3 },
  'Pocket Dojo': { score: 88, stars: 2 },
  // Weak (Mike, 18 Nov): off Home and out of Selected Work (21 Nov).
  CircleU: { score: 76, stars: 2 },
  'UTS Tech Festival 2026 GenAI Hackathon': { score: 80, stars: 2 },
  // Kaggle entry, not a flagship (Mike, 17 Nov).
  'Bioacoustic Species Classification': { score: 89, stars: 2 },
  'Half-time Briefing: Microsoft x Premier League Hackathon': { score: 86, stars: 2 },
  'Kaggle CSIRO Image2Biomass': { score: 88, stars: 2 },
  // Weak output, not featured (Mike, 18 Nov).
  'Spatial Brain: UNSW AiSoc Hackathon 2026': { score: 70, stars: 1 },
  'FoodLens: Calibrated Food Recognition': { score: 87, stars: 2 },
  'Kaggle ROGII Wellbore Geology Prediction': { score: 86, stars: 2 },
  'Kaggle AI Agent Security': { score: 85, stars: 2 },
  'Kaggle RSNA Knee Abnormality Detection': { score: 85, stars: 2 },
  'TikTok Semantic': { score: 85, stars: 2 },
  'Kaggle Biohub Cell Tracking During Development': { score: 84, stars: 2 },
  'Kaggriculture Farm Economy Agent': { score: 84, stars: 2 },
  'Kaggle Pokémon TCG AI Battle': { score: 84, stars: 2 },
  'Kaggle NFL Player Contact Detection': { score: 84, stars: 2 },
  'VisionVoice: Image Captioning': { score: 83, stars: 2 },
  'Kaggle NeuroGolf 2026': { score: 82, stars: 2 },
  'NYC Taxi Databricks': { score: 81, stars: 2 },
  // Set assignments, not self-initiated: Mike moved them out of flagship 16-17 Nov.
  'Solana Price Forecasting': { score: 80, stars: 2 },
  'Production-Grade ELT Pipeline': { score: 80, stars: 2 },
  'Airbnb ELT Warehouse': { score: 80, stars: 2 },
  'YouTube Trending Snowflake Lakehouse': { score: 79, stars: 2 },
  'Flickr8k Image Captioning': { score: 78, stars: 2 },
  'Kaggle S6E5 Predict F1 Pit Stops': { score: 77, stars: 2 },
  'Kaggle S6E7 Predicting Student Health Risk': { score: 77, stars: 2 },
  'Kaggle S6E8 Predicting Smartphone Addiction': { score: 77, stars: 2 },
  'Kaggle S6E9 Predicting Electric Vehicle Purchases': { score: 77, stars: 2 },
  'Kaggle S6E10 Predicting Airline Satisfaction': { score: 77, stars: 2 },
  'Kaggle Maze Crawler': { score: 76, stars: 2 },
  'Kaggle S6E6 Predicting Stellar Class': { score: 75, stars: 2 },
  'Kaggle Orbit Wars': { score: 74, stars: 2 },
  'Kaggle S6E4 Predict Irrigation Need': { score: 73, stars: 2 },
  'Sydney Rainfall Forecasting': { score: 71, stars: 2 },
  'Gender Equality Policy NLP': { score: 69, stars: 2 },
  'UTS MDSI LLM Wiki': { score: 68, stars: 2 },
  'FAOSTAT Food Price Shock Dashboard': { score: 67, stars: 2 },
  'ScriptClean AI': { score: 65, stars: 2 },
  AfriWeave: { score: 60, stars: 1 },
  'Deep Learning Group 10': { score: 58, stars: 1 },
  'Apple Foundation Agent': { score: 55, stars: 1 },
};
