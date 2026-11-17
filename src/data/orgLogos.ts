// Logos shown on Experience and on project cards. Files live in
// public/assets/logos/. Organisations with no logo file in the repo get a
// monogram tile instead. To swap one for the real mark, drop an SVG or WebP
// into public/assets/logos/ and set `src`.

export interface OrgLogo {
  name: string;
  /** Logo file. When missing, the monogram is drawn. */
  src?: string;
  /** Tile background; logos with their own background use 'transparent'. */
  bg: string;
  /** Monogram text and colour, used when there is no `src`. */
  monogram?: string;
  ink?: string;
  /** Padding inside the tile, as a fraction of its size. */
  inset?: number;
}

export const ORG_LOGOS: Record<string, OrgLogo> = {
  shopee: { name: 'Shopee', src: '/assets/logos/shopee.svg', bg: '#ee4d2d', inset: 0.22 },
  fpt: { name: 'FPT', bg: '#f37021', monogram: 'FPT', ink: '#ffffff' },
  pwc: { name: 'PwC', bg: '#fff4e5', monogram: 'pwc', ink: '#d04a02' },
  uts: { name: 'UTS', src: '/assets/logos/uts.svg', bg: '#000000', inset: 0 },
  ftu: { name: 'Foreign Trade University', bg: '#e8f0ff', monogram: 'FTU', ink: '#1d4ed8' },
  unsw: { name: 'UNSW', src: '/assets/logos/unsw.webp', bg: '#ffffff', inset: 0.08 },
  kaggle: { name: 'Kaggle', src: '/assets/logos/kaggle.svg', bg: '#20beff', inset: 0.24 },
  'meal-planner': {
    name: 'AI Meal Planner',
    src: '/assets/logos/meal-planner.svg',
    bg: '#ffffff',
    inset: 0.12,
  },
  circleu: { name: 'CircleU', src: '/assets/logos/circleu.webp', bg: '#ffffff', inset: 0.1 },
};

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
