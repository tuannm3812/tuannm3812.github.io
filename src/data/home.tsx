import React from 'react';
import SketchIcon from '../components/artwork/SketchIcon';

export interface WorkingStyle {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export const workingStyle: WorkingStyle[] = [
  {
    icon: <SketchIcon name="database" size={40} />,
    title: 'Start With the Data Contract',
    desc: 'I define the source, schema, validation, and review path before chasing model complexity.',
  },
  {
    icon: <SketchIcon name="package" size={40} />,
    title: 'Ship a Usable Workflow',
    desc: 'The strongest project evidence is runnable: APIs, dashboards, tests, demos, and documented trade-offs.',
  },
  {
    icon: <SketchIcon name="eye" size={40} />,
    title: 'Make Decisions Explainable',
    desc: 'I keep retrieval, metrics, diagnostics, and business context visible so reviewers can trust the result.',
  },
];

// Proof strip under the hero (mock, 24 Nov). Facts must match the Experience
// page and the project posters; no client or sponsor names.
export const proofEmployers = ['shopee', 'fpt', 'pwc', 'uts'] as const;

export const proofFacts: { value: string; label: string }[] = [
  { value: '7+ years', label: 'in data, analytics and consulting' },
  { value: 'Finalist', label: 'UNSW Marketing Analytics Hackathon 2026' },
  { value: 'Award winner', label: 'UTS Tech Festival 2026 GenAI Hackathon' },
];
