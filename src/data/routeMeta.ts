// Per-route title and description. Read by useDocumentTitle in the app and by
// scripts/generate-route-pages.mjs at build time, which writes one HTML file per
// route so direct requests get HTTP 200 and route-specific metadata.
// Keep this file import-free: the build script loads it with Node's type stripping.

export const SITE_URL = 'https://tuannm3812.github.io';
export const SITE_NAME = 'Tuan Nguyen';
export const NOT_FOUND_TITLE = 'Page Not Found | Tuan Nguyen';

export interface RouteMeta {
  path: string;
  title: string;
  description: string;
}

export const staticRoutes: RouteMeta[] = [
  {
    path: '/',
    title: 'Tuan Nguyen | ML & Engineering',
    description:
      'Personal portfolio of Tuan Nguyen (Mike), Senior Data Professional specializing in Machine Learning, Data Engineering, and MLOps.',
  },
  {
    path: '/experience',
    title: 'Experience & Skill Matrix | Tuan Nguyen',
    description:
      'Work history, education and skill matrix of Tuan Nguyen across machine learning, data engineering and analytics, with a downloadable resume.',
  },
  {
    path: '/projects',
    title: 'Technical Project Portfolio | Tuan Nguyen',
    description:
      'Selected machine learning, data engineering and applied AI projects by Tuan Nguyen, each with source code and measured results.',
  },
  {
    path: '/blog',
    title: 'Reflections & Insights | Tuan Nguyen',
    description:
      'Short notes on MLOps, data engineering, and applied AI from projects and practice.',
  },
  {
    path: '/contact',
    title: 'Get in Touch | Tuan Nguyen',
    description:
      'Contact Tuan Nguyen about machine learning, data engineering and MLOps roles or collaborations.',
  },
];

/** Title for a pathname, or null when the page sets its own (blog posts). */
export function titleFor(pathname: string): string | null {
  const path = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (path.startsWith('/blog/')) return null;
  return staticRoutes.find((route) => route.path === path)?.title ?? NOT_FOUND_TITLE;
}
