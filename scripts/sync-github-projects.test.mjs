import { describe, expect, it } from 'vitest';
import {
  buildProject,
  getCuratedGithubLinks,
  getDemoUrl,
  inferCategory,
  inferStack,
  toTitle,
} from './sync-github-projects.mjs';

describe('toTitle', () => {
  it('title-cases hyphenated and underscored repo names', () => {
    expect(toTitle('nfl-player-contact-detection')).toBe('NFL Player Contact Detection');
  });

  it('applies acronym corrections after title casing', () => {
    expect(toTitle('kaggle-ai-agent-security')).toBe('Kaggle AI Agent Security');
    expect(toTitle('youtube-trending-snowflake-lakehouse')).toBe(
      'YouTube Trending Snowflake Lakehouse',
    );
  });
});

describe('inferCategory', () => {
  it('detects Kaggle/ML competition repos', () => {
    expect(inferCategory({ name: 'kaggle-playground-s6e6', description: '' })).toBe(
      'Machine Learning & Kaggle',
    );
  });

  it('detects deep learning / vision repos', () => {
    expect(inferCategory({ name: 'foodlens', description: 'PyTorch CNN image classifier' })).toBe(
      'Deep Learning & Vision',
    );
  });

  it('falls back to AI Agents & LLM Products when nothing else matches', () => {
    expect(inferCategory({ name: 'random-repo', description: 'a random project' })).toBe(
      'AI Agents & LLM Products',
    );
  });
});

describe('inferStack', () => {
  it('detects known stack keywords from name/description/homepage', () => {
    const stack = inferStack({
      name: 'nyc-taxi-databricks',
      description: 'PySpark Delta Lake pipeline on Databricks',
      homepage: '',
      language: 'Python',
    });
    expect(stack).toContain('PySpark');
    expect(stack).toContain('Databricks');
    expect(stack).toContain('Delta Lake');
  });

  it('excludes Jupyter Notebook / Python as the sole stack signal', () => {
    const stack = inferStack({ name: 'repo', description: '', homepage: '', language: 'Python' });
    expect(stack).not.toContain('Python');
  });

  it('caps the stack at 6 entries', () => {
    const stack = inferStack({
      name: 'repo',
      description:
        'pyspark databricks delta lake snowflake streamlit fastapi react typescript tailwind',
      homepage: '',
      language: 'Python',
    });
    expect(stack.length).toBeLessThanOrEqual(6);
  });
});

describe('getDemoUrl', () => {
  it('returns undefined when there is no homepage', () => {
    expect(getDemoUrl({ homepage: '' })).toBeUndefined();
    expect(getDemoUrl({ homepage: null })).toBeUndefined();
  });

  it('passes through URLs that already have a protocol', () => {
    expect(getDemoUrl({ homepage: 'https://example.com' })).toBe('https://example.com');
  });

  it('adds https:// to bare hostnames', () => {
    expect(getDemoUrl({ homepage: 'example.com' })).toBe('https://example.com');
  });
});

describe('getCuratedGithubLinks', () => {
  it('extracts and de-duplicates GitHub URLs for the configured user', () => {
    const source = `
      "https://github.com/tuannm3812/foo",
      "https://github.com/tuannm3812/foo/",
      "https://github.com/tuannm3812/bar"
      "https://github.com/someone-else/baz"
    `;
    const links = getCuratedGithubLinks(source);
    expect(links.has('https://github.com/tuannm3812/foo')).toBe(true);
    expect(links.has('https://github.com/tuannm3812/bar')).toBe(true);
    expect(links.has('https://github.com/someone-else/baz')).toBe(false);
    expect(links.size).toBe(2);
  });
});

describe('buildProject', () => {
  it('applies a curated copy override when one exists for the repo name', () => {
    const project = buildProject({
      name: 'NYC-Taxi-Databricks',
      html_url: 'https://github.com/tuannm3812/NYC-Taxi-Databricks',
      description: 'raw github description',
      homepage: '',
      language: 'Python',
    });
    expect(project.title).toBe('NYC Taxi Databricks');
    expect(project.category).toBe('Data Engineering & Analytics');
    expect(project.impact).toBe('Databricks lakehouse analytics for NYC taxi trips');
  });

  it('falls back to inferred title/category/description for repos with no override', () => {
    const project = buildProject({
      name: 'some-new-repo',
      html_url: 'https://github.com/tuannm3812/some-new-repo',
      description: 'A brand new project.',
      homepage: '',
      language: 'TypeScript',
    });
    expect(project.title).toBe('Some New Repo');
    expect(project.impact).toBe('A brand new project.');
    expect(project.points[0]).toBe('A brand new project.');
  });

  it('includes a demo link when the repo has a homepage', () => {
    const project = buildProject({
      name: 'some-new-repo',
      html_url: 'https://github.com/tuannm3812/some-new-repo',
      description: '',
      homepage: 'https://demo.example.com',
      language: 'TypeScript',
    });
    expect(project.demo).toBe('https://demo.example.com');
  });
});
