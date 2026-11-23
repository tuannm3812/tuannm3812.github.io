import React from 'react';
import SketchIcon from '../components/artwork/SketchIcon';

export interface WorkingStyle {
  icon: React.ReactNode;
  title: string;
  desc: string;
}

export const workingStyle: WorkingStyle[] = [
  {
    icon: <SketchIcon name="database" size={32} />,
    title: 'Start With the Data Contract',
    desc: 'I define the source, schema, validation, and review path before chasing model complexity.',
  },
  {
    icon: <SketchIcon name="package" size={32} />,
    title: 'Ship a Usable Workflow',
    desc: 'The strongest project evidence is runnable: APIs, dashboards, tests, demos, and documented trade-offs.',
  },
  {
    icon: <SketchIcon name="eye" size={32} />,
    title: 'Make Decisions Explainable',
    desc: 'I keep retrieval, metrics, diagnostics, and business context visible so reviewers can trust the result.',
  },
];
