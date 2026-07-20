export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  /** Post body as sanitized-by-authorship HTML (never user input), rendered via
   * dangerouslySetInnerHTML inside a `.blog-article` (Tailwind Typography) container. */
  content: string;
  author: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'twelve-rejected-experiments-and-a-model-ceiling',
    title: 'Twelve Rejected Experiments and a Model Ceiling',
    excerpt:
      'A Kaggle health-risk classifier plateaued at 0.94959 balanced accuracy after twelve straight failed experiments. Reading five competitors’ notebooks explained why, and why stopping there was the right call.',
    date: '2026-07-20',
    content: `
      <p>On a recent Kaggle competition — a three-class student health-risk classifier scored on
      <strong>balanced accuracy</strong> under a 15:1 class imbalance — the first serious model
      reached <strong>0.94959</strong> on the public leaderboard within the first week. It was a
      class-balanced LightGBM/XGBoost blend over domain-ordered lifestyle features, and it felt
      like a solid opening move. What happened over the following two weeks taught me more than
      the model itself.</p>

      <h2>Twelve ways to fail the same bar</h2>
      <p>Every candidate after that first model had to clear one fixed rule: improve out-of-fold
      balanced accuracy by at least <strong>0.0002</strong> with no drop in macro F1, or it
      doesn't ship. Twelve ideas were tested against that bar, each targeting a different,
      specific hypothesis:</p>
      <ul>
        <li><strong>More blending, more models.</strong> Probability calibration,
        HGB/LGBM/XGBoost/CatBoost stacking, five-fold cross-validation, multi-seed averaging —
        the tree ensembles agreed with each other almost perfectly. A logistic meta-learner
        stacked over all four <em>lost</em> accuracy.</li>
        <li><strong>New feature surfaces.</strong> Interaction features, synthetic
        rank/quantile geometry, fold-safe target encoding, rounding-precision artifacts — three
        structurally different ways of adding new information, all landing within 0.00005 of
        zero.</li>
        <li><strong>Genuine model diversity.</strong> Not just another tree — a linear model
        with a fundamentally different decision boundary. The blend-weight sweep itself chose
        <strong>zero</strong> weight for it. Not a near miss: the optimizer actively rejected the
        diversity.</li>
        <li><strong>Encoding strategy.</strong> Replacing hand-picked ordinal category maps with
        native categorical splits produced the largest gain of the whole project — still short
        of the bar, but real, not noise.</li>
      </ul>
      <p>Zero for twelve. The easy read is that the project stalled.</p>

      <h2>Reading the competition instead of guessing at #13</h2>
      <p>Rather than run a thirteenth variant, I pulled and read the source of five top-scoring
      public notebooks for the same competition. All five — different architectures, different
      authors, XGBoost, RepLeafGBM, RealMLP, LightGBM — converged on the same balanced-accuracy
      band this project had already reached. That was the moment the story changed. This wasn't
      a modeling gap. It was a documented ceiling.</p>

      <blockquote>The visible leaderboard sat roughly 0.0015 higher — but tracing why showed
      that gap was mostly shared submission files and hand-edited leaderboard corrections, not
      better models.</blockquote>

      <p>One of the highest-scoring notebooks said as much about itself, in its own header:
      <em>"This is a public-LB post-processing notebook, not a standalone honest ML model."</em>
      It loaded someone else's shared submission file and hand-edited sixty-five specific row
      IDs. That's the same pattern that had already cost a public #1 team its private ranking in
      an earlier round of the same competition series — a public score built on probing, not
      signal, that quietly falls apart once the hidden test split opens.</p>

      <h2>The decision that actually mattered</h2>
      <p>Closing the project there, instead of chasing the higher number, was the real decision
      — not any of the twelve experiments. It meant trusting two independent lines of evidence
      over the temptation of one more tweak: twelve internal attempts converging to nothing, and
      five external notebooks converging to the same place from the outside.</p>
      <p>The skill worth practicing isn't finding the next tweak. It's building the discipline
      to check outside evidence before assuming there's always one more tweak worth finding.</p>
    `,
    author: 'Tuan Nguyen',
  },
];
