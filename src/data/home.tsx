import React from 'react';
import { PackageCheck, Database, ArrowRight } from 'lucide-react';

export interface FocusArea {
  title: string;
  desc: string;
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
