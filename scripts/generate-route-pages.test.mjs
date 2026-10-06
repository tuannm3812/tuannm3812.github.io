import { describe, expect, it } from 'vitest';
import {
  buildRoutes,
  renderNotFoundPage,
  renderRoutePage,
  renderSitemap,
  routeFile,
} from './generate-route-pages.mjs';

const template = `<!doctype html><html><head>
<link rel="canonical" href="https://tuannm3812.github.io/" />
<title>Tuan Nguyen | ML &amp; Engineering</title>
<meta name="description" content="Home description" />
<meta property="og:url" content="https://tuannm3812.github.io/" />
<meta property="og:title" content="Home title" />
<meta property="og:description" content="Home description" />
<meta name="twitter:title" content="Home title" />
<meta name="twitter:description" content="Home description" />
<meta name="robots" content="index, follow" />
</head><body><div id="root"></div></body></html>`;

const posts = [{ id: 'a-post', title: 'A "Quoted" Post', excerpt: 'Short <excerpt> & more.' }];

describe('buildRoutes', () => {
  it('adds one route per blog post after the static routes', () => {
    const routes = buildRoutes(posts);
    expect(routes.map((r) => r.path)).toEqual([
      '/',
      '/experience',
      '/projects',
      '/blog',
      '/contact',
      '/blog/a-post',
    ]);
    expect(routes.at(-1).title).toBe('A "Quoted" Post | Tuan Nguyen');
  });
});

describe('routeFile', () => {
  it('maps paths to extensionless-servable html files', () => {
    expect(routeFile('/')).toBe('index.html');
    expect(routeFile('/projects')).toBe('projects.html');
    expect(routeFile('/blog/a-post')).toBe('blog/a-post.html');
  });
});

describe('renderRoutePage', () => {
  const route = buildRoutes(posts).at(-1);
  const html = renderRoutePage(template, route);

  it('sets route-specific canonical and og:url', () => {
    expect(html).toContain('<link rel="canonical" href="https://tuannm3812.github.io/blog/a-post" />');
    expect(html).toContain('<meta property="og:url" content="https://tuannm3812.github.io/blog/a-post" />');
    expect(html).not.toContain('href="https://tuannm3812.github.io/" />');
  });

  it('sets escaped title and description in every title/description tag', () => {
    expect(html).toContain('<title>A &quot;Quoted&quot; Post | Tuan Nguyen</title>');
    expect(html).toContain('<meta name="twitter:title" content="A &quot;Quoted&quot; Post | Tuan Nguyen" />');
    expect(html).toContain('<meta property="og:description" content="Short &lt;excerpt&gt; &amp; more." />');
    expect(html).not.toContain('Home');
  });

  it('throws if the template is missing a tag it must replace', () => {
    expect(() => renderRoutePage('<html></html>', route)).toThrow(/canonical/);
  });
});

describe('renderNotFoundPage', () => {
  it('is noindex, has the not-found title and no canonical', () => {
    const html = renderNotFoundPage(template);
    expect(html).toContain('<meta name="robots" content="noindex" />');
    expect(html).toContain('<title>Page Not Found | Tuan Nguyen</title>');
    expect(html).not.toContain('rel="canonical"');
  });
});

describe('renderSitemap', () => {
  it('lists every route as an absolute URL', () => {
    const xml = renderSitemap(buildRoutes(posts));
    expect(xml).toContain('<loc>https://tuannm3812.github.io/</loc>');
    expect(xml).toContain('<loc>https://tuannm3812.github.io/projects</loc>');
    expect(xml).toContain('<loc>https://tuannm3812.github.io/blog/a-post</loc>');
  });
});
