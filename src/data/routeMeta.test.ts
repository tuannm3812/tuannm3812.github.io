import { describe, expect, it } from 'vitest';
import { NOT_FOUND_TITLE, staticRoutes, titleFor } from './routeMeta';

describe('titleFor', () => {
  it('returns the title of each static route', () => {
    for (const route of staticRoutes) {
      expect(titleFor(route.path)).toBe(route.title);
    }
  });

  it('ignores a trailing slash', () => {
    expect(titleFor('/projects/')).toBe(titleFor('/projects'));
  });

  it('leaves blog post titles to the Blog page', () => {
    expect(titleFor('/blog/some-post')).toBeNull();
  });

  it('returns the not-found title for an unknown path', () => {
    expect(titleFor('/does-not-exist')).toBe(NOT_FOUND_TITLE);
  });
});

describe('staticRoutes', () => {
  it('covers all five site routes with a description', () => {
    expect(staticRoutes.map((r) => r.path)).toEqual([
      '/',
      '/experience',
      '/projects',
      '/blog',
      '/contact',
    ]);
    for (const route of staticRoutes) {
      expect(route.description.length).toBeGreaterThan(40);
    }
  });
});
