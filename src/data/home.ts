export interface WorkingStyle {
  title: string;
  desc: string;
}

export const workingStyle: WorkingStyle[] = [
  {
    title: 'Start with the data contract',
    desc: 'I define the source, schema, validation, and review path before chasing model complexity.',
  },
  {
    title: 'Ship a usable workflow',
    desc: 'The strongest project evidence is runnable: APIs, dashboards, tests, demos, and documented trade-offs.',
  },
  {
    title: 'Make decisions explainable',
    desc: 'I keep retrieval, metrics, diagnostics, and business context visible so reviewers can trust the result.',
  },
];
