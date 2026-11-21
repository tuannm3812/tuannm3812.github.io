/**
 * Where each project came from, keyed by card title (the same keys as
 * projectPriority.ts). The Projects page groups cards by this, so a recruiter
 * sees self-initiated work before set coursework.
 *
 * Source of truth is how Mike files repos on his Mac:
 *   1. Study    -> coursework (unless the brief was a free topic, see below)
 *   2. Kaggle   -> kaggle
 *   3. Personal -> personal
 *   4. Training -> hackathon (hackathons and industry events)
 *
 * Text-to-SQL and AI Meal Planner live under "1. Study" but were free-topic
 * projects Mike chose and scoped himself, so they count as personal.
 *
 * A title missing here falls into "other". Those are older public repos not on
 * the Mac; ask Mike before moving them into a group.
 */
export type ProjectOrigin = 'personal' | 'hackathon' | 'kaggle' | 'coursework' | 'other';

export const projectOrigin: Record<string, ProjectOrigin> = {
  // 3. Personal, plus free-topic coursework
  'Enterprise Text-to-SQL Agent': 'personal',
  'AI Meal Planner': 'personal',
  CircleU: 'personal',
  'Sydney Transit Live Lakehouse': 'personal',
  Dinksight: 'personal',
  'ScriptClean AI': 'personal',
  // Industry and research projects (UTS Innovation Lab). Mike counts them as his
  // own scoped work, not set coursework (17 Nov).
  'Terminal-Bench Agent Harness': 'personal',
  'Wildfire Occurrence Prediction': 'personal',

  // 4. Training
  // OpenAI Builder Days (Mike, 18 Nov). Still Selected Work by its 3 stars.
  'FarmLens: NSW Crop Suitability Explorer': 'hackathon',
  'UTS Tech Festival 2026 GenAI Hackathon': 'hackathon',
  'Half-time Briefing: Microsoft x Premier League Hackathon': 'hackathon',
  // A hackathon, but its output was weak, so it sits as a plain row in Other
  // Projects rather than a card (Mike, 18 Nov).
  'Spatial Brain: UNSW AiSoc Hackathon 2026': 'other',
  'UNSW MA Hackathon 2026': 'hackathon',
  // Started at the OpenAI buildathon; Mike now develops it solo (21 Nov).
  'Pocket Dojo': 'hackathon',

  // 2. Kaggle
  'Bioacoustic Species Classification': 'kaggle',
  'Kaggriculture Farm Economy Agent': 'kaggle',

  // 1. Study
  'Production-Grade ELT Pipeline': 'coursework',
  'Solana Price Forecasting': 'coursework',
  'Airbnb ELT Warehouse': 'coursework',
  'FoodLens: Calibrated Food Recognition': 'coursework',
  'NYC Taxi Databricks': 'coursework',
  'FAOSTAT Food Price Shock Dashboard': 'coursework',
  'Gender Equality Policy NLP': 'coursework',
  'Deep Learning Group 10': 'coursework',
  'UTS MDSI LLM Wiki': 'coursework',
};
