import React from 'react';
import SketchIcon from '../components/SketchIcon';

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
    icon: <SketchIcon name="database" />,
    title: 'Start With the Data Contract',
    desc: 'I define the source, schema, validation, and review path before chasing model complexity.',
  },
  {
    icon: <SketchIcon name="package" />,
    title: 'Ship a Usable Workflow',
    desc: 'The strongest project evidence is runnable: APIs, dashboards, tests, demos, and documented trade-offs.',
  },
  {
    icon: <SketchIcon name="eye" />,
    title: 'Make Decisions Explainable',
    desc: 'I keep retrieval, metrics, diagnostics, and business context visible so reviewers can trust the result.',
  },
];
