import React from 'react';
import { Bot, PackageCheck, Smartphone, Map as MapIcon, Database, ArrowRight } from 'lucide-react';

export interface FocusArea {
  title: string;
  desc: string;
}

export interface FeaturedProject {
  icon: React.ReactNode;
  title: string;
  category: string;
  outcome: string;
  stack: string[];
  href: string;
  coverImage?: string;
}

export interface WorkingStyle {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export const focusAreas: FocusArea[] = [
  {
    title: 'Applied AI',
    desc: 'Agents, RAG, validation, and useful interfaces.',
  },
  {
    title: 'ML Systems',
    desc: 'Models with diagnostics, tests, and deployment paths.',
  },
  {
    title: 'Data Engineering',
    desc: 'Pipelines, warehouses, and trustworthy analytical layers.',
  },
];

export const featuredProjects: FeaturedProject[] = [
  {
    icon: <Bot size={22} />,
    title: 'Enterprise Text-to-SQL Agent',
    category: 'Enterprise AI',
    outcome:
      'Secure schema-RAG Text-to-SQL agent with query-repair loops and SQLite authorizer sandboxing to prevent DDL injection.',
    stack: ['Gemini/Ollama', 'Schema RAG', 'SQLGlot', 'SQLite'],
    href: 'https://github.com/tuannm3812/text-to-sql-agent',
    coverImage: '/assets/projects/text-to-sql.jpg',
  },
  {
    icon: <PackageCheck size={22} />,
    title: 'AI Meal Planner',
    category: 'AI Product Engineering',
    outcome:
      'Multi-agent wellness planner with FastAPI contract checking, Pydantic type safety, and parallelized USDA constraint checks.',
    stack: ['FastAPI', 'Pydantic', 'Local RAG', 'Streamlit'],
    href: 'https://github.com/tuannm3812/ai-meal-planner',
    coverImage: '/assets/projects/meal-planner.jpg',
  },
  // Interim pair while Mike picks the new flagship lineup (17 Nov): BirdCLEF is
  // a Kaggle entry and the Airbnb ELT warehouse was coursework, so both left.
  // Neither of these has cover art yet; the card falls back to the grid cover.
  {
    icon: <Smartphone size={22} />,
    title: 'CircleU',
    category: 'AI Product Engineering',
    outcome:
      'Privacy-first iOS reflection journal with ambient voice check-ins, on-device speech and LLM-structured emotion insights.',
    stack: ['SwiftUI', 'Apple Intelligence', 'Firebase', 'Speech'],
    href: 'https://github.com/tuannm3812/CircleU',
  },
  {
    icon: <MapIcon size={22} />,
    title: 'FarmLens: NSW Crop Suitability Explorer',
    category: 'Geospatial Data Product',
    outcome:
      'Map-first land explorer that scores crops for any NSW point from eight open climate, soil and imagery sources, with visible per-factor reasons.',
    stack: ['Python', 'Leaflet', 'Open-Meteo', 'Streamlit'],
    href: 'https://github.com/tuannm3812/FarmLens',
  },
];

export const workingStyle: WorkingStyle[] = [
  {
    icon: <Database size={18} />,
    title: 'Start with the data contract',
    desc: 'I define the source, schema, validation, and review path before chasing model complexity.',
  },
  {
    icon: <PackageCheck size={18} />,
    title: 'Ship a usable workflow',
    desc: 'The strongest project evidence is runnable: APIs, dashboards, tests, demos, and documented trade-offs.',
  },
  {
    icon: <ArrowRight size={18} />,
    title: 'Make decisions explainable',
    desc: 'I keep retrieval, metrics, diagnostics, and business context visible so reviewers can trust the result.',
  },
];
