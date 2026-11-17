// Logos shown on Experience and on project cards, all in one ink colour so they
// read as a set (Mike, 17 Nov). Each file in public/assets/logos/mono/ is an
// alpha mask made from the official logo: dark parts become ink, white parts
// become clear. OrgLogo paints the mask in brand blue (Mike, 17 Nov), so it follows dark mode.

export interface OrgLogo {
  name: string;
  /** Padding inside the tile, as a fraction of its size. */
  inset?: number;
}

export const ORG_LOGOS: Record<string, OrgLogo> = {
  shopee: { name: 'Shopee' },
  fpt: { name: 'FPT', inset: 0.14 },
  pwc: { name: 'PwC', inset: 0.12 },
  uts: { name: 'UTS', inset: 0.1 },
  ftu: { name: 'Foreign Trade University', inset: 0.1 },
  unsw: { name: 'UNSW', inset: 0.1 },
  kaggle: { name: 'Kaggle', inset: 0.12 },
  'meal-planner': { name: 'AI Meal Planner' },
  circleu: { name: 'CircleU' },
};

export const logoMask = (id: string) => `/assets/logos/mono/${id}.webp`;

/** Experience and education entries, keyed by the name used in resume.ts. */
export const EMPLOYER_LOGO: Record<string, string> = {
  'Shopee Vietnam': 'shopee',
  'FPT Software & FPT Digital': 'fpt',
  'PwC Vietnam': 'pwc',
  'University of Technology Sydney': 'uts',
  'Foreign Trade University': 'ftu',
};

/** Project card logos, keyed by card title. Kaggle cards get the Kaggle mark automatically. */
export const PROJECT_LOGO: Record<string, string> = {
  'Terminal-Bench Agent Harness': 'uts',
  'Wildfire Occurrence Prediction': 'uts',
  'UTS Tech Festival 2026 GenAI Hackathon': 'uts',
  'Spatial Brain: UNSW AiSoc Hackathon 2026': 'unsw',
  'UNSW MA Hackathon 2026': 'unsw',
  'AI Meal Planner': 'meal-planner',
  CircleU: 'circleu',
};
