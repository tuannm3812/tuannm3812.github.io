import { describe, expect, it } from 'vitest';
import {
  buildProject,
  findPlaceholderProjects,
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

  it('corrects institution and competition-series acronyms', () => {
    expect(toTitle('kaggle-rsna-knee-abnormality-detection')).toBe(
      'Kaggle RSNA Knee Abnormality Detection',
    );
    expect(toTitle('kaggle-s6e8-predicting-smartphone-addiction')).toBe(
      'Kaggle S6E8 Predicting Smartphone Addiction',
    );
    expect(toTitle('kaggle-s6e9-predicting-electric-vehicle-purchases')).toBe(
      'Kaggle S6E9 Predicting Electric Vehicle Purchases',
    );
    expect(toTitle('unsw-aisoc-hack-2026')).toBe('UNSW AiSoc Hack 2026');
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

describe('findPlaceholderProjects', () => {
  // The repo shape that slipped a placeholder card into production on
  // 2026-09-06: a real description, but no topics and no overrides entry.
  // Deliberately a name that is NOT in PROJECT_COPY_OVERRIDES — the real S6E9
  // repo now has an entry, so using it here would test the override, not the guard.
  const unwrittenRepo = {
    name: 'kaggle-s7e1-some-new-competition',
    description: 'Kaggle Playground Series S7E1: a competition nobody has written copy for yet.',
    language: 'Jupyter Notebook',
    topics: [],
    html_url: 'https://github.com/tuannm3812/kaggle-s7e1-some-new-competition',
  };

  it('flags a described repo that has no topics and no overrides entry', () => {
    const [flagged] = findPlaceholderProjects([buildProject(unwrittenRepo)]);

    expect(flagged).toBeDefined();
    expect(flagged.reasons).toContain('points[0] duplicates impact verbatim');
    expect(flagged.reasons).toContain('placeholder points[1]');
    expect(
      flagged.reasons.some((reason) =>
        reason.includes('inferStack matched nothing, no stack override'),
      ),
    ).toBe(true);
  });


  // Regression guard for a wrong diagnosis this message used to carry. It read
  // "repo has no topics", but inferStack() reads only name, description,
  // homepage and language - never repo.topics - so topics can be present and
  // the fallback still fires. Adding topics to a repo does nothing for its card.
  it('still flags a repo that has topics, since inferStack ignores them', () => {
    const withTopics = {
      ...unwrittenRepo,
      topics: ['python', 'pandas', 'machine-learning'],
    };

    expect(inferStack(withTopics)).toEqual([]);
    const [flagged] = findPlaceholderProjects([buildProject(withTopics)]);
    expect(flagged).toBeDefined();
    expect(flagged.reasons.join(' ')).not.toContain('topics');
  });

  it('flags a repo with no description at all', () => {
    const [flagged] = findPlaceholderProjects([
      buildProject({ ...unwrittenRepo, description: null }),
    ]);

    expect(flagged.reasons).toContain('placeholder impact (repo has no description)');
    expect(flagged.reasons).toContain('placeholder points[0]');
  });

  it('passes a card that has hand-written copy', () => {
    expect(
      findPlaceholderProjects([
        {
          title: 'Kaggle S7E1 Some New Competition',
          github: unwrittenRepo.html_url,
          impact: 'Kaggle Playground S7E1 classification with gated promotion',
          stack: ['Target Encoding', 'ROC AUC'],
          points: ['Built a gated experiment workflow.', 'Target-encoded value identities.'],
        },
      ]),
    ).toEqual([]);
  });

  it('reports every card that needs copy, not just the first', () => {
    const flagged = findPlaceholderProjects([
      buildProject(unwrittenRepo),
      buildProject({ ...unwrittenRepo, name: 'another-repo', html_url: 'https://github.com/x/y' }),
    ]);

    expect(flagged).toHaveLength(2);
  });
});
