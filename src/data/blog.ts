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

      <figure class="not-prose my-10">
        <div class="rounded-xl border border-slate-200 bg-white/60 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
          <svg viewBox="0 0 940 260" class="w-full" role="img" aria-label="Bar chart of out-of-fold balanced-accuracy gain versus the champion model, for twelve rejected experiments v10 through v23. All twelve stay below the promotion gate line; four are negative regressions; one sits exactly at zero; v23 is the closest miss.">
            <line x1="60" y1="140" x2="920" y2="140" class="stroke-slate-300 dark:stroke-slate-600" stroke-width="1.4"></line>
            <line x1="60" y1="92" x2="920" y2="92" class="stroke-slate-400 dark:stroke-slate-500" stroke-width="1.4" stroke-dasharray="4 3"></line>
            <text x="926" y="96" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px] font-bold">gate +0.0002</text>
            <text x="926" y="144" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">0</text>

            <g>
              <rect x="66" y="136.6" width="48" height="3.4" rx="2" class="fill-brand dark:fill-brand-light"><title>v10, calibration sweep: +0.00014 balanced accuracy</title></rect>
              <text x="90" y="128.6" text-anchor="middle" class="fill-slate-700 dark:fill-slate-200 font-mono text-[10px] font-bold">+0.14</text>
              <text x="90" y="156" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">v10</text>
            </g>
            <g>
              <rect x="130" y="139.3" width="48" height="0.7" rx="1" class="fill-brand dark:fill-brand-light"><title>v13, HGB probability blend: +0.00003 balanced accuracy</title></rect>
              <text x="154" y="131.3" text-anchor="middle" class="fill-slate-700 dark:fill-slate-200 font-mono text-[10px] font-bold">+0.03</text>
              <text x="154" y="156" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">v13</text>
            </g>
            <g>
              <rect x="194" y="139.3" width="48" height="0.7" rx="1" class="fill-brand dark:fill-brand-light"><title>v14, targeted interaction features: +0.00003 balanced accuracy</title></rect>
              <text x="218" y="131.3" text-anchor="middle" class="fill-slate-700 dark:fill-slate-200 font-mono text-[10px] font-bold">+0.03</text>
              <text x="218" y="156" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">v14</text>
            </g>
            <g>
              <rect x="258" y="130.2" width="48" height="9.8" rx="2" class="fill-brand dark:fill-brand-light"><title>v15, GPU hyperparameter search: +0.00041 balanced accuracy</title></rect>
              <text x="282" y="122.2" text-anchor="middle" class="fill-slate-700 dark:fill-slate-200 font-mono text-[10px] font-bold">+0.41</text>
              <text x="282" y="156" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">v15</text>
            </g>
            <g>
              <rect x="322" y="133" width="48" height="7" rx="2" class="fill-brand dark:fill-brand-light"><title>v16, multi-seed averaging: +0.00029 balanced accuracy</title></rect>
              <text x="346" y="125" text-anchor="middle" class="fill-slate-700 dark:fill-slate-200 font-mono text-[10px] font-bold">+0.29</text>
              <text x="346" y="156" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">v16</text>
            </g>
            <g>
              <rect x="386" y="133.3" width="48" height="6.7" rx="2" class="fill-brand dark:fill-brand-light"><title>v17, five-fold CV and CatBoost diversity: +0.00028 balanced accuracy</title></rect>
              <text x="410" y="125.3" text-anchor="middle" class="fill-slate-700 dark:fill-slate-200 font-mono text-[10px] font-bold">+0.28</text>
              <text x="410" y="156" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">v17</text>
            </g>
            <g>
              <rect x="450" y="140" width="48" height="30.7" rx="2" class="fill-red-500 dark:fill-red-400"><title>v18, OOF stacking over four models: -0.00128 balanced accuracy (regression)</title></rect>
              <text x="474" y="184.7" text-anchor="middle" class="fill-slate-700 dark:fill-slate-200 font-mono text-[10px] font-bold">−1.28</text>
              <text x="474" y="200" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">v18</text>
            </g>
            <g>
              <rect x="514" y="140" width="48" height="5.4" rx="2" class="fill-red-500 dark:fill-red-400"><title>v19, synthetic-geometry features: -0.0000227 balanced accuracy (regression)</title></rect>
              <text x="538" y="159.4" text-anchor="middle" class="fill-slate-700 dark:fill-slate-200 font-mono text-[10px] font-bold">−0.23</text>
              <text x="538" y="174" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">v19</text>
            </g>
            <g>
              <rect x="578" y="140" width="48" height="11.5" rx="2" class="fill-red-500 dark:fill-red-400"><title>v20, fold-safe target encoding: -0.0000481 balanced accuracy (regression)</title></rect>
              <text x="602" y="165.5" text-anchor="middle" class="fill-slate-700 dark:fill-slate-200 font-mono text-[10px] font-bold">−0.48</text>
              <text x="602" y="180" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">v20</text>
            </g>
            <g>
              <rect x="642" y="140" width="48" height="5.8" rx="2" class="fill-red-500 dark:fill-red-400"><title>v21, rounding/precision artifact features: -0.0000243 balanced accuracy (regression)</title></rect>
              <text x="666" y="159.8" text-anchor="middle" class="fill-slate-700 dark:fill-slate-200 font-mono text-[10px] font-bold">−0.24</text>
              <text x="666" y="174" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">v21</text>
            </g>
            <g>
              <circle cx="730" cy="140" r="4" class="fill-none stroke-slate-500 dark:stroke-slate-400" stroke-width="1.6"><title>v22, logistic-regression blend: 0.00000 balanced accuracy (blend sweep chose 0% weight)</title></circle>
              <text x="730" y="128" text-anchor="middle" class="fill-slate-700 dark:fill-slate-200 font-mono text-[10px] font-bold">0.00</text>
              <text x="730" y="156" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">v22</text>
            </g>
            <g>
              <rect x="770" y="113.4" width="48" height="26.6" rx="2" class="fill-amber-500 dark:fill-amber-400"><title>v23, native categorical splits: +0.000111 balanced accuracy (closest miss)</title></rect>
              <text x="794" y="105.4" text-anchor="middle" class="fill-slate-700 dark:fill-slate-200 font-mono text-[10px] font-bold">+1.11</text>
              <text x="794" y="156" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">v23</text>
            </g>
          </svg>
          <div class="mt-3 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-200 pt-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span class="flex items-center gap-1.5"><span class="inline-block h-2.5 w-2.5 rounded-sm bg-brand dark:bg-brand-light"></span>positive, still below gate</span>
            <span class="flex items-center gap-1.5"><span class="inline-block h-2.5 w-2.5 rounded-sm bg-red-500 dark:bg-red-400"></span>regression</span>
            <span class="flex items-center gap-1.5"><span class="inline-block h-2.5 w-2.5 rounded-sm bg-amber-500 dark:bg-amber-400"></span>closest miss (v23)</span>
            <span class="flex items-center gap-1.5"><span class="inline-block h-2.5 w-2.5 rounded-full border-[1.5px] border-slate-500 dark:border-slate-400"></span>exactly zero (v22)</span>
          </div>
        </div>
        <figcaption class="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
          Bars in ×10⁻⁴ balanced accuracy, one per rejected experiment. Hover a bar for what it tested.
        </figcaption>
      </figure>

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

      <div class="not-prose mt-10 flex flex-wrap gap-2 border-t border-slate-200 pt-6 dark:border-slate-800">
        <a
          href="https://github.com/tuannm3812/kaggle-predicting-student-health-risk"
          target="_blank"
          rel="noreferrer"
          class="flex items-center gap-2 rounded-lg bg-slate-950 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 dark:bg-white dark:text-slate-950 dark:hover:bg-brand dark:hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          Source Code
        </a>
        <a
          href="https://www.kaggle.com/code/tuannm3812/student-health-risk-baseline-modeling"
          target="_blank"
          rel="noreferrer"
          class="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-slate-700 transition-all hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6"></path><path d="M10 14 21 3"></path><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path></svg>
          Kaggle Notebook
        </a>
      </div>
    `,
    author: 'Tuan Nguyen',
  },
];
