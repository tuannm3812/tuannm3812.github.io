import React from 'react';
import { Bot, PackageCheck, Brain, Warehouse, Database, ArrowRight } from 'lucide-react';

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
    href: 'https://github.com/tuannm3812/aipa-text-to-sql-agent',
  },
  {
    icon: <PackageCheck size={22} />,
    title: 'AI Meal Planner',
    category: 'AI Product Engineering',
    outcome:
      'Multi-agent wellness planner with FastAPI contract checking, Pydantic type safety, and parallelized USDA constraint checks.',
    stack: ['FastAPI', 'Pydantic', 'Local RAG', 'Streamlit'],
    href: 'https://github.com/tuannm3812/ai-meal-planner',
  },
  {
    icon: <Brain size={22} />,
    title: 'Bioacoustic Species Classification',
    category: 'Deep Learning Research',
    outcome:
      'PyTorch audio classifier using Google Perch v2 embeddings and EfficientNet-B0, optimized to run under CPU memory constraints.',
    stack: ['Perch v2', 'EfficientNet-B0', 'PyTorch', 'Audio ML'],
    href: 'https://github.com/tuannm3812/kaggle-birdclef-2026',
  },
  {
    icon: <Warehouse size={22} />,
    title: 'Production-Grade ELT Pipeline',
    category: 'Data Engineering Architecture',
    outcome:
      'Medallion-architecture data warehouse for Sydney Airbnb/Census datasets with dbt SCD Type 2 tracking and Airflow scheduling.',
    stack: ['Airflow', 'dbt', 'PostgreSQL', 'Medallion'],
    href: 'https://github.com/tuannm3812/airbnb-ELT-warehouse',
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
