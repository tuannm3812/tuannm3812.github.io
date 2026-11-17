import { describe, expect, it } from 'vitest';
import { blogPosts } from './blog';
import { getTagGroup, isKnownTag } from './tagVocabulary';

describe('blog posts', () => {
  it.each(blogPosts.map((post) => [post.id, post] as const))(
    '%s follows the card rules',
    (_, post) => {
      expect(new Set(post.tags).size).toBe(3);
      for (const tag of post.tags) expect(isKnownTag(tag)).toBe(true);
      expect(getTagGroup(post.tags[0])).not.toBe('tools');
      expect(post.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(post.excerpt.split(/\s+/).length).toBeLessThanOrEqual(40);
    },
  );

  it('has unique ids', () => {
    expect(new Set(blogPosts.map((post) => post.id)).size).toBe(blogPosts.length);
  });
});
