// Post-build step: write one HTML entry page per route into dist/.
//
// GitHub Pages only serves files, so before this step every direct request except
// `/` hit 404.html and returned HTTP 404 (Codex review 2026-09-23, finding 1).
// Pages serves `/projects` from `projects.html` with a 200, so each route gets a
// copy of the built index.html carrying its own title, description, canonical
// and social tags. The React app still renders the page; this only fixes the
// status code and the metadata crawlers see.
//
// Also writes 404.html (noindex, for unknown URLs) and sitemap.xml.
// Route metadata lives in src/data/routeMeta.ts, loaded via Node type stripping.

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { NOT_FOUND_TITLE, SITE_NAME, SITE_URL, staticRoutes } from '../src/data/routeMeta.ts';

const escapeHtml = (value) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

export function buildRoutes(posts) {
  return [
    ...staticRoutes,
    ...posts.map((post) => ({
      path: `/blog/${post.id}`,
      title: `${post.title} | ${SITE_NAME}`,
      description: post.excerpt,
    })),
  ];
}

export function routeFile(routePath) {
  return routePath === '/' ? 'index.html' : `${routePath.slice(1)}.html`;
}

const absoluteUrl = (routePath) => (routePath === '/' ? `${SITE_URL}/` : `${SITE_URL}${routePath}`);

function replaceTag(html, name, pattern, replacement) {
  if (!pattern.test(html)) {
    throw new Error(`generate-route-pages: template has no ${name} tag to replace`);
  }
  return html.replace(pattern, replacement);
}

function setTitleAndDescription(html, title, description) {
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  html = replaceTag(html, 'title', /<title>[^<]*<\/title>/, `<title>${t}</title>`);
  for (const attr of ['name="description"', 'property="og:description"', 'name="twitter:description"']) {
    html = replaceTag(html, attr, new RegExp(`<meta ${attr} content="[^"]*" />`), `<meta ${attr} content="${d}" />`);
  }
  for (const attr of ['property="og:title"', 'name="twitter:title"']) {
    html = replaceTag(html, attr, new RegExp(`<meta ${attr} content="[^"]*" />`), `<meta ${attr} content="${t}" />`);
  }
  return html;
}

export function renderRoutePage(template, route) {
  const url = absoluteUrl(route.path);
  let html = replaceTag(
    template,
    'canonical',
    /<link rel="canonical" href="[^"]*" \/>/,
    `<link rel="canonical" href="${url}" />`,
  );
  html = replaceTag(
    html,
    'og:url',
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${url}" />`,
  );
  return setTitleAndDescription(html, route.title, route.description);
}

export function renderNotFoundPage(template) {
  let html = template.replace(/\s*<link rel="canonical" href="[^"]*" \/>/, '');
  html = replaceTag(
    html,
    'robots',
    /<meta name="robots" content="[^"]*" \/>/,
    '<meta name="robots" content="noindex" />',
  );
  return setTitleAndDescription(html, NOT_FOUND_TITLE, 'This page does not exist.');
}

export function renderSitemap(routes) {
  const urls = routes.map((route) => `  <url>\n    <loc>${absoluteUrl(route.path)}</loc>\n  </url>`);
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`;
}

async function main() {
  const distDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist');
  const { blogPosts } = await import('../src/data/blog.ts');
  const template = await readFile(path.join(distDir, 'index.html'), 'utf8');
  const routes = buildRoutes(blogPosts);

  for (const route of routes) {
    const file = path.join(distDir, routeFile(route.path));
    await mkdir(path.dirname(file), { recursive: true });
    await writeFile(file, renderRoutePage(template, route));
  }
  await writeFile(path.join(distDir, '404.html'), renderNotFoundPage(template));
  await writeFile(path.join(distDir, 'sitemap.xml'), renderSitemap(routes));
  console.log(`generate-route-pages: wrote ${routes.length} route pages, 404.html and sitemap.xml`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}
