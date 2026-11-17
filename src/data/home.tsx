import React from 'react';
import SketchIcon from '../components/artwork/SketchIcon';

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
    icon: <SketchIcon name="database" size={28} />,
    title: 'Start With the Data Contract',
    desc: 'I define the source, schema, validation, and review path before chasing model complexity.',
  },
  {
    icon: <SketchIcon name="package" size={28} />,
    title: 'Ship a Usable Workflow',
    desc: 'The strongest project evidence is runnable: APIs, dashboards, tests, demos, and documented trade-offs.',
  },
  {
    icon: <SketchIcon name="eye" size={28} />,
    title: 'Make Decisions Explainable',
    desc: 'I keep retrieval, metrics, diagnostics, and business context visible so reviewers can trust the result.',
  },
];
