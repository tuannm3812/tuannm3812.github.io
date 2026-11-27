// The fixed tag list for project cards and the Home gallery (Mike, 17 Nov).
// Tags name a skill area at the level of a job ad, never the exact model.
// A tag is added here first, by decision, then used; tests fail on any other.
// Rules: docs/12-design-guideline.md, "Project cards".

export type TagGroup = 'ai' | 'ml' | 'data' | 'analytics' | 'tools';

export const TAG_GROUPS: Record<TagGroup, { label: string; chip: string }> = {
  ai: {
    label: 'AI & Agents',
    chip: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  },
  ml: {
    label: 'Machine Learning',
    chip: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  },
  data: {
    label: 'Data Engineering',
    chip: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  },
  analytics: {
    label: 'Analytics & Viz',
    chip: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  },
  tools: {
    label: 'Tools',
    chip: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
  },
};

export const TAG_VOCABULARY = {
  ai: [
    'LLM Agents',
    'Multi-Agent Systems',
    'RAG',
    'Generative AI',
    'Agent Evaluation',
    'Text-to-SQL',
    'Speech & Voice AI',
    'Prompt Engineering',
  ],
  ml: [
    'Machine Learning',
    'Deep Learning',
    'Gradient Boosting',
    'Forecasting',
    'NLP',
    'Computer Vision',
    'Audio ML',
    'Simulation Agents',
    'Model Evaluation',
  ],
  data: [
    'Data Pipelines',
    'Lakehouse',
    'Data Warehousing',
    'Data Modelling',
    'Big Data',
    'API Ingestion',
  ],
  analytics: [
    'Data Analysis',
    'Dashboards',
    'Data Visualisation',
    'Geospatial Analysis',
    'Statistics',
    'Graph Analytics',
  ],
  tools: [
    'Python',
    'SQL',
    'Spark',
    'Databricks',
    'Snowflake',
    'Airflow',
    'dbt',
    'FastAPI',
    'Streamlit',
    'React',
    'SwiftUI',
    'Firebase',
  ],
} as const satisfies Record<TagGroup, readonly string[]>;

export type Tag = (typeof TAG_VOCABULARY)[TagGroup][number];

const TAG_GROUP = new Map<string, TagGroup>(
  (Object.entries(TAG_VOCABULARY) as [TagGroup, readonly string[]][]).flatMap(([group, tags]) =>
    tags.map((tag) => [tag, group] as const),
  ),
);

export function isKnownTag(tag: string): tag is Tag {
  return TAG_GROUP.has(tag);
}

export function getTagGroup(tag: string): TagGroup {
  return TAG_GROUP.get(tag) ?? 'tools';
}

/** Groups offered as the Projects filter. Tools is never a card's main skill. */
export const FILTER_GROUPS: TagGroup[] = ['ai', 'ml', 'data', 'analytics'];
