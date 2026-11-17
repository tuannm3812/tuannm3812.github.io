// Home-page "Selected work" gallery. Copy rules live in docs/12-design-guideline.md
// (public content): no client names, no internal infrastructure, numbers only
// from the project's own poster, one insight subtitle, role title only.
//
// Key terms are wrapped in [[double brackets]] and rendered with the amber
// marker highlight. Keep it to one or two per sentence.

import type { Tag } from './tagVocabulary';

export type SelectedWorkGroup = 'research' | 'product' | 'event';

export interface SelectedWork {
  id: string;
  group: SelectedWorkGroup;
  /** Short name for the project index row. */
  short: string;
  /** Title Case: "Type of Work · Problem Area". */
  label: string;
  title: string;
  /** One insight line, 15 words or fewer, that does not repeat the question. */
  subtitle: string;
  role: string;
  thumb: string;
  /** Full poster, opened when the thumbnail is clicked. */
  poster: string;
  alt: string;
  question: string;
  built: string;
  answer: string;
  /** Exactly 3 tags from tagVocabulary.ts, the same as the project's card. */
  stack: Tag[];
  demo?: string;
  code?: string;
}

export const SELECTED_WORK_GROUPS: { id: SelectedWorkGroup; label: string }[] = [
  { id: 'research', label: 'Client & research' },
  { id: 'product', label: 'Products' },
  { id: 'event', label: 'Hackathons' },
];

export const selectedWork: SelectedWork[] = [
  {
    id: 'agent-harness',
    group: 'research',
    short: 'Agent harness',
    label: 'Industry Project · AI Agent Evaluation',
    title: 'Terminal-Bench Agent Harness',
    subtitle: 'Same model, different harness: a fair test before any claim of improvement.',
    role: 'Lead AI Engineer',
    thumb: '/assets/posters/harness-thumb.webp',
    poster: '/assets/posters/harness.jpg',
    alt: 'Poster: Same model, different harness, an AI agent harness evaluation on Terminal-Bench',
    question:
      'Can a custom agent harness beat Terminus 2 on Terminal-Bench when [[the model stays the same]]?',
    built:
      'A [[LangGraph harness]] inside Harbor, tested against Terminus 2 in [[paired three-attempt trials]] on a frozen protocol.',
    answer:
      '[[No accuracy advantage]] was established, and the frozen protocol now gives [[a fair way]] to test any future harness change.',
    stack: ['LLM Agents', 'Agent Evaluation', 'Python'],
  },
  {
    id: 'fire-prediction',
    group: 'research',
    short: 'Fire prediction',
    label: 'Applied Research · Wildfire Risk',
    title: 'Wildfire Occurrence Prediction',
    subtitle: 'Where you test a fire model matters more than which model you pick.',
    role: 'ML Researcher',
    thumb: '/assets/posters/fire-thumb.webp',
    poster: '/assets/posters/fire.pdf',
    alt: 'Poster: Which fire-prediction gains survive new regions?',
    question:
      'Which gains in daily fire prediction still hold in [[a region the model has never seen]]?',
    built:
      'Satellite hotspots, weather, fuel moisture and land cover for the Greater Blue Mountains, compared from logistic regression to [[TabPFN and a mixture of experts]] on [[spatially blocked folds]].',
    answer:
      'Newer learners helped, but [[holding a region out moved scores more]] than the choice of model did.',
    stack: ['Machine Learning', 'Geospatial Analysis', 'Python'],
  },
  {
    id: 'text-to-sql',
    group: 'product',
    short: 'Text-to-SQL',
    label: 'AI Product · Live Demo',
    title: 'Enterprise Text-to-SQL Agent',
    subtitle: 'Ask in English. Inspect the SQL before you trust the answer.',
    role: 'AI Engineer',
    thumb: '/assets/posters/t2sql-thumb.webp',
    poster: '/assets/posters/t2sql.jpg',
    alt: 'Poster: Ask in English. Inspect the SQL.',
    question: 'How can business users ask a database questions without trusting [[a black box]]?',
    built:
      'An agent that picks the relevant tables, drafts SQL, and [[checks it before running it read-only]] on SQLite, DuckDB or PostgreSQL.',
    answer: 'People [[see the SQL before the answer]], and [[raw records never reach the model]].',
    stack: ['Text-to-SQL', 'RAG', 'Python'],
    demo: 'https://aipa-text-to-sql-agent.streamlit.app/',
    code: 'https://github.com/tuannm3812/text-to-sql-agent',
  },
  {
    id: 'meal-planner',
    group: 'product',
    short: 'Meal Planner',
    label: 'AI Product · Live Demo',
    title: 'AI Meal Planner',
    subtitle: 'Four agents plan one meal that fits your body and your budget.',
    role: 'AI Engineer',
    thumb: '/assets/posters/meal-thumb.webp',
    poster: '/assets/posters/meal.jpg',
    alt: 'Poster: AI Meal Planner',
    question: 'Can an AI plan one meal that actually fits [[your body and budget]]?',
    built:
      '[[Four agents]] that work like one kitchen: one sets the calories, one picks the meal, one checks the nutrition and one prices the shop.',
    answer: 'Three fixes took plans on target from 10 to [[all 72 of 72]].',
    stack: ['Multi-Agent Systems', 'RAG', 'FastAPI'],
    demo: 'https://tuannm3812-ai-meal-planner.streamlit.app/',
    code: 'https://github.com/tuannm3812/ai-meal-planner',
  },
  {
    id: 'circleu',
    group: 'product',
    short: 'CircleU',
    label: 'Personal Product · iOS',
    title: 'CircleU',
    subtitle: 'Some conversations stay with you. A private place to work through them.',
    role: 'Product Designer and iOS Developer',
    thumb: '/assets/posters/circleu-thumb.webp',
    poster: '/assets/posters/circleu.jpg',
    alt: 'Poster: CircleU, some conversations stay with you',
    question:
      'Where can someone reflect on a hard conversation and find their words, [[privately]]?',
    built:
      'An iOS journal with [[voice check-ins]] and [[Apple Intelligence]]: write it down, find your words, see what comes up.',
    answer: 'Private by design. Everything is [[kept on your iPhone]].',
    stack: ['Speech & Voice AI', 'Generative AI', 'SwiftUI'],
    code: 'https://github.com/tuannm3812/CircleU',
  },
  {
    id: 'kiva',
    group: 'event',
    short: 'Kiva slow loans',
    label: 'Hackathon Finalist · UNSW Marketing Analytics 2026',
    title: 'Kiva Slow-Loan Flag',
    subtitle: 'Spot the loans that will wait for funding on the day they are listed.',
    role: 'Data Scientist',
    thumb: '/assets/posters/kiva-thumb.webp',
    poster: '/assets/posters/kiva.jpg',
    alt: 'Poster: Getting slow loans funded faster',
    question: 'Why do some Kiva loans wait weeks for funding, and can we [[spot them on day one]]?',
    built:
      'Analysed [[1.45 million loans]] and built [[a flag]] that marks likely slow loans when they are listed.',
    answer:
      'The flag at listing caught [[2.6 to 4.0 times as many]] of the slowest loans as a historical lookup, in every year tested.',
    stack: ['Machine Learning', 'NLP', 'Python'],
    code: 'https://github.com/tuannm3812/unsw-ma-hackathon-2026',
  },
];

/** Splits "a [[key]] b" into plain and highlighted segments. */
export function splitKeyTerms(text: string): { text: string; key: boolean }[] {
  return text
    .split(/(\[\[.*?\]\])/)
    .filter(Boolean)
    .map((part) =>
      part.startsWith('[[') && part.endsWith(']]')
        ? { text: part.slice(2, -2), key: true }
        : { text: part, key: false },
    );
}
