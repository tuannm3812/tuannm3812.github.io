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
      'Schema-aware analytics agent with hybrid retrieval, SQL validation, repair loops, and safe local execution.',
    stack: ['Gemini/Ollama', 'Schema RAG', 'SQLGlot', 'SQLite'],
    href: 'https://github.com/tuannm3812/aipa-text-to-sql-agent',
  },
  {
    icon: <PackageCheck size={22} />,
    title: 'AI Meal Planner',
    category: 'AI Product Engineering',
    outcome:
      'Multi-agent meal planning workflow with FastAPI, structured schemas, nutrition checks, and CI-tested backend contracts.',
    stack: ['FastAPI', 'Pydantic', 'Local RAG', 'Streamlit'],
    href: 'https://github.com/tuannm3812/ai-meal-planner',
  },
  {
    icon: <Brain size={22} />,
    title: 'Bioacoustic Species Classification',
    category: 'Deep Learning Research',
    outcome:
      'BirdCLEF+ 2026 audio-classification workspace with reusable PyTorch modules, Perch probes, EDA, and CPU-safe inference packaging.',
    stack: ['Perch v2', 'EfficientNet-B0', 'PyTorch', 'Audio ML'],
    href: 'https://github.com/tuannm3812/kaggle-birdclef-2026',
  },
  {
    icon: <Warehouse size={22} />,
    title: 'Production-Grade ELT Pipeline',
    category: 'Data Engineering Architecture',
    outcome:
      'Sydney Airbnb and Census warehouse with Airflow orchestration, dbt marts, PostgreSQL, and SCD Type 2 history.',
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
