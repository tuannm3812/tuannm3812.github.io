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
    id: 'debugging-my-way-to-a-better-kaggle-score',
    title: 'Debugging My Way to a Better Kaggle Score',
    excerpt:
      'A 3D cell-tracking Kaggle competition improved from 0.810 to 0.827 not through a better model, but through reading the scoring code closely enough to catch a bug that looked like a regression, a small-sample miss that reversed itself, and two negative results worth publishing.',
    date: '2026-07-31',
    content: `
      <p><em>A field note from an ongoing entry in Kaggle&rsquo;s <a href="https://www.kaggle.com/competitions/biohub-cell-tracking-during-development" target="_blank" rel="noreferrer">Biohub &ndash; Cell Tracking During Development</a> competition (deadline: September 29, 2026). Public leaderboard score at time of writing: <strong>0.827</strong>, up from an initial 0.810 &mdash; a modest-sounding number that took four real submissions and a dozen local experiments to earn honestly.</em></p>


      <figure class="not-prose my-10">
        <div class="rounded-xl border border-slate-200 bg-white/60 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
          <svg viewBox="0 0 640 340" class="w-full" role="img" aria-label="Line chart of public leaderboard score across four submissions: 0.810 baseline, 0.817 after a graph-repair fix, 0.795 after a detection-threshold regression that was reverted, 0.827 after trajectory smoothing (current best).">
            <line x1="60" y1="276" x2="600" y2="276" class="stroke-slate-200 dark:stroke-slate-700" stroke-width="1"></line>
            <line x1="60" y1="196" x2="600" y2="196" class="stroke-slate-200 dark:stroke-slate-700" stroke-width="1"></line>
            <line x1="60" y1="116" x2="600" y2="116" class="stroke-slate-200 dark:stroke-slate-700" stroke-width="1"></line>
            <line x1="60" y1="36" x2="600" y2="36" class="stroke-slate-200 dark:stroke-slate-700" stroke-width="1"></line>
            <text x="52" y="279" text-anchor="end" class="fill-slate-500 dark:fill-slate-400 font-mono text-[11px]">0.78</text>
            <text x="52" y="199" text-anchor="end" class="fill-slate-500 dark:fill-slate-400 font-mono text-[11px]">0.80</text>
            <text x="52" y="119" text-anchor="end" class="fill-slate-500 dark:fill-slate-400 font-mono text-[11px]">0.82</text>
            <text x="52" y="39" text-anchor="end" class="fill-slate-500 dark:fill-slate-400 font-mono text-[11px]">0.84</text>
            <line x1="60" y1="276" x2="600" y2="276" class="stroke-slate-300 dark:stroke-slate-600" stroke-width="1.4"></line>

            <path d="M 60,156 L 240,128 L 420,216 L 600,88" class="stroke-slate-300 dark:stroke-slate-600" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"></path>

            <circle cx="60" cy="156" r="8" class="fill-white dark:fill-slate-900"></circle>
            <circle cx="60" cy="156" r="6" class="fill-brand dark:fill-brand-light"><title>Submission #1, 2026-07-21: 0.810 public score, no repair yet</title></circle>
            <text x="60" y="136" text-anchor="middle" class="fill-slate-700 dark:fill-slate-200 font-mono text-[14px] font-bold">0.810</text>
            <text x="60" y="300" text-anchor="middle" class="fill-slate-600 dark:fill-slate-300 font-mono text-[11.5px] font-bold">#1</text>
            <text x="60" y="316" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[11px]">no repair yet</text>

            <circle cx="240" cy="128" r="8" class="fill-white dark:fill-slate-900"></circle>
            <circle cx="240" cy="128" r="6" class="fill-emerald-500 dark:fill-emerald-400"><title>Submission #2, 2026-07-22: 0.817 public score, +0.007 -- graph repair bug fixed and shipped</title></circle>
            <text x="240" y="108" text-anchor="middle" class="fill-slate-700 dark:fill-slate-200 font-mono text-[14px] font-bold">0.817</text>
            <text x="240" y="146" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">+0.007</text>
            <text x="240" y="300" text-anchor="middle" class="fill-slate-600 dark:fill-slate-300 font-mono text-[11.5px] font-bold">#2</text>
            <text x="240" y="316" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[11px]">graph repair fixed</text>

            <circle cx="420" cy="216" r="8" class="fill-white dark:fill-slate-900"></circle>
            <circle cx="420" cy="216" r="6" class="fill-red-500 dark:fill-red-400"><title>Submission #3, 2026-07-22: 0.795 public score, -0.022 -- a DET_THRESHOLD regression, reverted</title></circle>
            <text x="420" y="242" text-anchor="middle" class="fill-slate-700 dark:fill-slate-200 font-mono text-[14px] font-bold">0.795</text>
            <text x="420" y="198" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">-0.022</text>
            <text x="420" y="300" text-anchor="middle" class="fill-slate-600 dark:fill-slate-300 font-mono text-[11.5px] font-bold">#3</text>
            <text x="420" y="316" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[11px]">reverted</text>

            <circle cx="600" cy="88" r="8" class="fill-white dark:fill-slate-900"></circle>
            <circle cx="600" cy="88" r="6" class="fill-emerald-500 dark:fill-emerald-400"><title>Submission #4, 2026-07-24: 0.827 public score, +0.010 -- trajectory smoothing shipped, current best</title></circle>
            <text x="600" y="68" style="text-anchor:end" class="fill-slate-700 dark:fill-slate-200 font-mono text-[14px] font-bold">0.827</text>
            <text x="600" y="106" style="text-anchor:end" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">+0.010 &#183; current best</text>
            <text x="600" y="300" style="text-anchor:end" class="fill-slate-600 dark:fill-slate-300 font-mono text-[11.5px] font-bold">#4</text>
            <text x="600" y="316" style="text-anchor:end" class="fill-slate-500 dark:fill-slate-400 font-mono text-[11px]">smoothing</text>
          </svg>
          <div class="mt-3 flex flex-wrap gap-x-5 gap-y-2 border-t border-slate-200 pt-3 text-xs text-slate-500 dark:border-slate-800 dark:text-slate-400">
            <span class="flex items-center gap-1.5"><span class="inline-block h-2.5 w-2.5 rounded-full bg-brand dark:bg-brand-light"></span>baseline</span>
            <span class="flex items-center gap-1.5"><span class="inline-block h-2.5 w-2.5 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>shipped, real gain</span>
            <span class="flex items-center gap-1.5"><span class="inline-block h-2.5 w-2.5 rounded-full bg-red-500 dark:bg-red-400"></span>reverted, real regression</span>
          </div>
        </div>
        <figcaption class="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
          Public leaderboard score across four submissions. Hover a point for what shipped.
        </figcaption>
      </figure>


      <h2>The task, in one paragraph</h2>
      <p>The competition asks you to track every cell nucleus, in 3D, through 100 timepoints of light-sheet microscopy video of a developing zebrafish embryo &mdash; including labeling the moments a cell divides in two. You get 199 training videos with <em>sparse</em> ground truth (only a fraction of visible cells are annotated) and just 4 held-out test videos. Scoring blends an edge-matching Jaccard score (did you link the right cell to the right cell across consecutive frames?) with a division-matching score, weighted 10:1 in favor of edges.</p>
      <p>I started from the competition&rsquo;s own official baseline architecture &mdash; a 3D U-Net detector, a transformer that scores candidate links between detected cells, and an integer linear program (ILP) that turns those scores into a single globally-consistent tracking graph. That stack is vendored, tested, and not something I touched. What this post is actually about is everything <em>after</em> it: the deterministic repair layer I built on top, and &mdash; more importantly &mdash; the process I used to decide what belonged in that layer and what didn&rsquo;t.</p>

      <h2>The one finding that reframed the whole project</h2>
      <p>Before writing any repair code, I pulled six public reference notebooks from the competition and read them properly &mdash; not skimmed for hyperparameters, actually read the source. The pattern was stark: <strong>every top-scoring public solution, learned or purely classical, converges on the same shape of pipeline</strong> &mdash; detect, link, then a deterministic repair pass (close small gaps, prune short spurious tracks, smooth trajectories), optionally recover divisions last. One of the highest public scores I found used <em>no trained model at all</em> &mdash; pure classical blob detection plus a well-engineered repair stage.</p>
      <p>That told me something specific: on this task, the repair layer is worth more than the detector, up to a point. So instead of trying to out-model the baseline, I set out to build the best repair layer I could, and &mdash; this turned out to matter more than the repair code itself &mdash; validate every piece of it the way an engineer validates a change to a payment system, not the way a Kaggle notebook usually gets bolted together.</p>

      <h2>The methodology, stated plainly</h2>
      <p>Three rules, adopted after the first one bit me:</p>
      <ol>
        <li><strong>Unit-test new logic against synthetic data before it ever touches a real submission.</strong> Every repair technique below &mdash; gap-closing, trajectory smoothing, motion extrapolation, test-time augmentation &mdash; got a synthetic test first: hand-built graphs where I knew the correct answer, checking the code did the geometrically obvious thing before trusting it on real, unlabelable data.</li>
        <li><strong>Validate against the actual competition metric, on held-out real data, before spending a submission.</strong> The vendored baseline ships the organizers&rsquo; own scoring code. I built a validation path that predicts on a held-out slice of the <em>training</em> set (which does have ground truth) and scores it with that exact code &mdash; not a proxy metric, not an approximation.</li>
        <li><strong>Trust a single, mechanism-backed hypothesis test more than picking the best of several candidates on a small sample.</strong> This one I learned the hard way &mdash; see below.</li>
      </ol>
      <p>None of this is exotic. It&rsquo;s just the difference between &ldquo;I ran an experiment&rdquo; and &ldquo;I ran an experiment I can trust the sign of.&rdquo;</p>

      <h2>Case study 1: a bug that looked exactly like a regression</h2>
      <p>The first repair techniques I implemented were short-track pruning (drop tiny isolated track fragments) and gap-closing (bridge a track across 1&ndash;2 frames where detection likely just missed a dim cell). I turned them on, validated, and the score <em>dropped</em> &mdash; edge Jaccard 0.8031 &rarr; 0.7897. By every surface signal, both techniques were net-harmful. The easy, wrong move here is to conclude &ldquo;gap-closing doesn&rsquo;t work for this dataset&rdquo; and delete the code.</p>
      <p>Instead I went back to the metric spec instead of trusting my mental model of it: ground-truth edges only ever connect <em>consecutive</em> timepoints. My gap-closing implementation was bridging a 2-frame gap with a single edge spanning <code>t</code> to <code>t+2</code> directly &mdash; an edge shape that literally cannot ever match a ground-truth edge, by construction. Every bridge I added was guaranteed noise, no matter how geometrically sensible the bridge was.</p>
      <p>The fix was mechanical once diagnosed: insert <code>gap</code> interpolated intermediate nodes joined by ordinary single-frame edges, instead of one long edge. Re-validated, and both techniques turned out to be genuinely useful on their own, and <em>more than additive</em> combined (edge Jaccard +0.0065 at the 60-video validation sample). This shipped as a real submission and gained <strong>+0.007</strong> on the actual leaderboard &mdash; close enough to the local prediction to tell me the validation harness was trustworthy, not just optimistic.</p>
      <p>The lesson wasn&rsquo;t &ldquo;test more.&rdquo; It was: <strong>when a metric behaves in a way that contradicts your intuition, re-derive the metric&rsquo;s actual rules from its spec before concluding your idea is bad.</strong> The idea was fine. My understanding of what counts as a matchable edge wasn&rsquo;t.</p>

      <h2>Case study 2: a local win that didn&rsquo;t survive contact with the real test set</h2>
      <p>Later, I swept a detection-confidence threshold across four candidate values on a 19-video held-out slice of the training set. The result was clean and monotonic: a lower threshold scored better at every point tested, with the best candidate beating the current default by +0.0025. I set it as the new default and submitted.</p>
      <p><strong>Public score: 0.795 &mdash; an 0.022 regression</strong>, worse than even my very first, unrepaired submission. Not a smaller-than-predicted win. A real, directional miss.</p>
      <p>I had two competing hypotheses for why: (a) picking the best of four candidates on a small held-out sample is a multiple-comparisons problem &mdash; you&rsquo;d expect some regression to the mean even with zero real distribution shift; (b) this specific parameter directly controls total predicted node count, which the scoring formula penalizes based on a <em>provided estimate</em> of true node count &mdash; and that provided estimate turned out to not exist at all on the real test videos (confirmed by reading the raw metadata files directly), which would make any calibration built around it fundamentally non-transferable.</p>
      <p>I ruled out (b) first, since it was checkable directly and would have been the more interesting, harder-to-fix explanation. Then I re-ran the exact same sweep at three times the sample size &mdash; 60 videos instead of 19, narrowed to just the two candidates that mattered. <strong>The ranking flipped.</strong> At the larger sample, the original default won by roughly the same margin the smaller sample had claimed the <em>other</em> candidate won by. The first sweep&rsquo;s signal was small-sample noise from picking an arg-max over several candidates, not a real effect that failed to generalize.</p>


      <figure class="not-prose my-10">
        <div class="rounded-xl border border-slate-200 bg-white/60 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
          <svg viewBox="0 0 640 340" class="w-full" role="img" aria-label="Two lines crossing: at 19 validation videos DET_THRESHOLD=0.90 scores higher than 0.99; at 60 validation videos the ranking flips and 0.99 wins, matching the real leaderboard result.">
            <line x1="60" y1="228" x2="600" y2="228" class="stroke-slate-200 dark:stroke-slate-700" stroke-width="1"></line>
            <line x1="60" y1="132" x2="600" y2="132" class="stroke-slate-200 dark:stroke-slate-700" stroke-width="1"></line>
            <line x1="60" y1="36" x2="600" y2="36" class="stroke-slate-200 dark:stroke-slate-700" stroke-width="1"></line>
            <text x="52" y="231" text-anchor="end" class="fill-slate-500 dark:fill-slate-400 font-mono text-[11px]">0.810</text>
            <text x="52" y="135" text-anchor="end" class="fill-slate-500 dark:fill-slate-400 font-mono text-[11px]">0.820</text>
            <text x="52" y="39" text-anchor="end" class="fill-slate-500 dark:fill-slate-400 font-mono text-[11px]">0.830</text>
            <line x1="60" y1="276" x2="600" y2="276" class="stroke-slate-300 dark:stroke-slate-600" stroke-width="1.4"></line>

            <circle cx="230" cy="18" r="5" class="fill-brand dark:fill-brand-light"></circle>
            <text x="242" y="22" class="fill-slate-600 dark:fill-slate-300 font-mono text-[12px]">DET_THRESHOLD = 0.90</text>
            <circle cx="410" cy="18" r="5" class="fill-orange-500 dark:fill-orange-400"></circle>
            <text x="422" y="22" class="fill-slate-600 dark:fill-slate-300 font-mono text-[12px]">DET_THRESHOLD = 0.99</text>

            <path d="M 180,208 L 480,88" class="stroke-brand dark:stroke-brand-light" stroke-width="2" fill="none" stroke-linecap="round"></path>
            <circle cx="180" cy="208" r="8" class="fill-white dark:fill-slate-900"></circle>
            <circle cx="180" cy="208" r="6" class="fill-brand dark:fill-brand-light"><title>DET_THRESHOLD=0.90 at n=19: repaired score 0.8121</title></circle>
            <circle cx="480" cy="88" r="8" class="fill-white dark:fill-slate-900"></circle>
            <circle cx="480" cy="88" r="6" class="fill-brand dark:fill-brand-light"><title>DET_THRESHOLD=0.90 at n=60: repaired score 0.8246</title></circle>
            <text x="150" y="200" text-anchor="end" class="fill-slate-700 dark:fill-slate-200 font-mono text-[12.5px] font-bold">0.8121</text>
            <text x="492" y="92" class="fill-slate-700 dark:fill-slate-200 font-mono text-[12.5px] font-bold">0.8246</text>

            <path d="M 180,232 L 480,67" class="stroke-orange-500 dark:stroke-orange-400" stroke-width="2" fill="none" stroke-linecap="round"></path>
            <circle cx="180" cy="232" r="8" class="fill-white dark:fill-slate-900"></circle>
            <circle cx="180" cy="232" r="6" class="fill-orange-500 dark:fill-orange-400"><title>DET_THRESHOLD=0.99 at n=19: repaired score 0.8096</title></circle>
            <circle cx="480" cy="67" r="8" class="fill-white dark:fill-slate-900"></circle>
            <circle cx="480" cy="67" r="6" class="fill-orange-500 dark:fill-orange-400"><title>DET_THRESHOLD=0.99 at n=60: repaired score 0.8268 -- wins, matches the real submission</title></circle>
            <text x="150" y="252" text-anchor="end" class="fill-slate-700 dark:fill-slate-200 font-mono text-[12.5px] font-bold">0.8096</text>
            <text x="492" y="71" class="fill-slate-700 dark:fill-slate-200 font-mono text-[12.5px] font-bold">0.8268 &#183; wins</text>

            <text x="180" y="300" text-anchor="middle" class="fill-slate-600 dark:fill-slate-300 font-mono text-[12.5px] font-bold">n = 19 videos</text>
            <text x="180" y="316" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[11px]">0.90 "wins" -- the miss</text>
            <text x="480" y="300" text-anchor="middle" class="fill-slate-600 dark:fill-slate-300 font-mono text-[12.5px] font-bold">n = 60 videos</text>
            <text x="480" y="316" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[11px]">0.99 wins -- matches real result</text>
          </svg>
        </div>
        <figcaption class="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
          The same experiment, a different amount of noise -- 19 videos vs. 60. Hover a point for the exact score.
        </figcaption>
      </figure>


      <p>This produced a concrete, durable rule I applied to every experiment after it: a single hypothesis test (&ldquo;does X help, yes or no&rdquo;) is trustworthy at a modest sample size; <em>selecting the best of several candidates</em> needs a meaningfully larger one, because you&rsquo;re now fighting the max of several noisy estimates instead of one. I never made that mistake again in this project &mdash; every subsequent parameter-sweep-style experiment used the larger, validated sample size from the start.</p>

      <h2>Case study 3: the win that actually shipped</h2>
      <p>Reading the scoring spec closely paid off a second time. The edge-matching step only pairs a predicted cell with its ground-truth counterpart if they&rsquo;re within <strong>7 microns</strong> of each other &mdash; meaning a cell that&rsquo;s linked into exactly the right track can still score as a miss purely on detected position, if the raw detection was a few microns off.</p>
      <p>That&rsquo;s a geometrically local problem with a geometrically local fix: for each node, locally line-fit its z/y/x coordinates against time, using a small window of unambiguous single-parent/single-child neighbors along its own track (stopping at any division point, so the fit never crosses an ambiguous branch). Topology untouched &mdash; only coordinates move.</p>
      <p>Verified against synthetic data first (does it actually reduce error against a known-true line under injected noise; does it leave an isolated node alone; does it avoid bleeding information across a division branch), then validated at the 60-video sample: <strong>edge Jaccard 0.8268 &rarr; 0.8391, +0.0123</strong> &mdash; roughly double the earlier repair fix&rsquo;s gain, on a single, pre-committed hypothesis (not a swept parameter). Shipped as a real submission: <strong>+0.010 on the actual leaderboard</strong>, current best of 0.827.</p>
      <p>The mechanism (a metric with a hard distance cutoff; a fix that only moves coordinates within that cutoff&rsquo;s neighborhood) is the kind of thing that&rsquo;s obvious once you&rsquo;ve actually read the scoring code and not obvious if you haven&rsquo;t.</p>
      <p>By this point I had three techniques with both a local prediction and a real leaderboard result to check it against &mdash; worth lining up side by side, since it&rsquo;s the clearest evidence for whether the validation harness itself could be trusted:</p>


      <figure class="not-prose my-10">
        <div class="rounded-xl border border-slate-200 bg-white/60 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
          <svg viewBox="0 0 640 340" class="w-full" role="img" aria-label="Grouped bar chart comparing locally predicted score change against real leaderboard change for three techniques: graph repair (+0.0065 predicted, +0.007 actual, close agreement), DET_THRESHOLD lowering (+0.0025 predicted, -0.022 actual, opposite signs), trajectory smoothing (+0.0123 predicted, +0.010 actual, close agreement).">
            <line x1="60" y1="46" x2="600" y2="46" class="stroke-slate-200 dark:stroke-slate-700" stroke-width="1"></line>
            <line x1="60" y1="86" x2="600" y2="86" class="stroke-slate-200 dark:stroke-slate-700" stroke-width="1"></line>
            <line x1="60" y1="166" x2="600" y2="166" class="stroke-slate-200 dark:stroke-slate-700" stroke-width="1"></line>
            <line x1="60" y1="206" x2="600" y2="206" class="stroke-slate-200 dark:stroke-slate-700" stroke-width="1"></line>
            <line x1="60" y1="246" x2="600" y2="246" class="stroke-slate-200 dark:stroke-slate-700" stroke-width="1"></line>
            <text x="52" y="49" text-anchor="end" class="fill-slate-500 dark:fill-slate-400 font-mono text-[11px]">+0.010</text>
            <text x="52" y="89" text-anchor="end" class="fill-slate-500 dark:fill-slate-400 font-mono text-[11px]">+0.005</text>
            <text x="52" y="169" text-anchor="end" class="fill-slate-500 dark:fill-slate-400 font-mono text-[11px]">-0.005</text>
            <text x="52" y="209" text-anchor="end" class="fill-slate-500 dark:fill-slate-400 font-mono text-[11px]">-0.010</text>
            <text x="52" y="249" text-anchor="end" class="fill-slate-500 dark:fill-slate-400 font-mono text-[11px]">-0.020</text>
            <line x1="60" y1="126" x2="600" y2="126" class="stroke-slate-300 dark:stroke-slate-600" stroke-width="1"></line>

            <circle cx="220" cy="18" r="5" class="fill-brand dark:fill-brand-light"></circle>
            <text x="232" y="22" class="fill-slate-600 dark:fill-slate-300 font-mono text-[12px]">Predicted locally</text>
            <circle cx="370" cy="18" r="5" class="fill-orange-500 dark:fill-orange-400"></circle>
            <text x="382" y="22" class="fill-slate-600 dark:fill-slate-300 font-mono text-[12px]">Actual on leaderboard</text>

            <path d="M137,126 L137,91 Q137,87 141,87 L155,87 Q159,87 159,91 L159,126 Z" class="fill-brand dark:fill-brand-light"><title>Graph repair, predicted locally: +0.0065 edge_jaccard</title></path>
            <path d="M161,126 L161,88 Q161,84 165,84 L179,84 Q183,84 183,88 L183,126 Z" class="fill-orange-500 dark:fill-orange-400"><title>Graph repair, actual leaderboard delta: +0.007</title></path>
            <text x="142" y="70" style="text-anchor:end" class="fill-slate-700 dark:fill-slate-200 font-mono text-[12.5px] font-bold">+0.0065</text>
            <text x="178" y="70" style="text-anchor:start" class="fill-slate-700 dark:fill-slate-200 font-mono text-[12.5px] font-bold">+0.007</text>
            <text x="160" y="300" text-anchor="middle" class="fill-slate-600 dark:fill-slate-300 font-mono text-[12px] font-bold">Graph repair</text>
            <text x="160" y="316" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[11px]">agrees closely</text>

            <path d="M297,126 L297,115 Q297,111 301,111 L315,111 Q319,111 319,115 L319,126 Z" class="fill-brand dark:fill-brand-light"><title>DET_THRESHOLD lowering, predicted locally (n=19): +0.0025 edge_jaccard</title></path>
            <path d="M321,126 L321,254 Q321,258 325,258 L339,258 Q343,258 343,254 L343,126 Z" class="fill-orange-500 dark:fill-orange-400"><title>DET_THRESHOLD lowering, actual leaderboard delta: -0.022 -- a real regression</title></path>
            <text x="308" y="104" text-anchor="middle" class="fill-slate-700 dark:fill-slate-200 font-mono text-[12.5px] font-bold">+0.0025</text>
            <text x="332" y="272" text-anchor="middle" class="fill-slate-700 dark:fill-slate-200 font-mono text-[12.5px] font-bold">-0.022</text>
            <text x="320" y="300" text-anchor="middle" class="fill-slate-600 dark:fill-slate-300 font-mono text-[12px] font-bold">DET_THRESHOLD</text>
            <text x="320" y="316" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[11px]">opposite signs -- a real miss</text>

            <path d="M457,126 L457,56 Q457,52 461,52 L475,52 Q479,52 479,56 L479,126 Z" class="fill-brand dark:fill-brand-light"><title>Trajectory smoothing, predicted locally: +0.0123 edge_jaccard</title></path>
            <path d="M481,126 L481,70 Q481,66 485,66 L499,66 Q503,66 503,70 L503,126 Z" class="fill-orange-500 dark:fill-orange-400"><title>Trajectory smoothing, actual leaderboard delta: +0.010</title></path>
            <text x="462" y="46" style="text-anchor:end" class="fill-slate-700 dark:fill-slate-200 font-mono text-[12.5px] font-bold">+0.0123</text>
            <text x="498" y="60" style="text-anchor:start" class="fill-slate-700 dark:fill-slate-200 font-mono text-[12.5px] font-bold">+0.010</text>
            <text x="480" y="300" text-anchor="middle" class="fill-slate-600 dark:fill-slate-300 font-mono text-[12px] font-bold">Trajectory smoothing</text>
            <text x="480" y="316" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[11px]">agrees closely</text>
          </svg>
        </div>
        <figcaption class="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
          Local prediction vs. real leaderboard delta, three techniques. Hover a bar for the exact number.
        </figcaption>
      </figure>


      <p>Two out of three, the local number and the real number landed close enough to trust the sign <em>and</em> roughly the magnitude. The one exception is exactly the multi-candidate sweep case study 2 just walked through &mdash; which is the point: the harness wasn&rsquo;t unreliable in general, it was unreliable for one specific <em>kind</em> of question.</p>

      <h2>Case study 4: two negative results that were still worth running</h2>
      <p>Not every validated hypothesis pans out, and I think the negative results are worth publishing alongside the positive ones &mdash; a null result you reached rigorously is still information, and burying it just means someone (possibly future-me) re-runs the same experiment later.</p>
      <ul>
        <li><strong>Motion-aware gap bridging.</strong> The existing gap-closing logic matches a dangling track&rsquo;s end against nearby candidates using its last known position &mdash; which under-serves a fast-moving cell whose true continuation a few frames later may be farther away than a slower, unrelated cell nearby. I implemented constant-velocity extrapolation as an alternative matching signal, verified it against a synthetic fast-moving-cell case where the naive version provably picks the wrong candidate, and A/B-tested it on real data. <strong>Result: no measurable effect</strong> (-0.0007, inside the noise floor). Most likely explanation: the ILP linker already does global, flow-consistent assignment, and the gap window is capped at 1&ndash;2 frames &mdash; not enough time for the naive-vs-motion distinction to matter much in practice.</li>
        <li><strong>Full 8-way test-time augmentation.</strong> The detector already averaged predictions across 4 symmetric views of each frame (identity plus three flips). I extended this to the full 8-element symmetry group of a square image by adding the two 90-degree rotation variants, on the reasoning that more independent views should average out more detector noise. Verified the transform math against synthetic tensors (all 8 variants pairwise distinct, each exactly invertible) before ever spending Kaggle GPU time on it. <strong>Result: no measurable effect</strong> (-0.0010). The extra views apparently don&rsquo;t cancel any detection noise beyond what the existing 4-way default already catches.</li>
      </ul>
      <p>Neither change shipped. Both took real implementation effort &mdash; the TTA change in particular required standing up a small piece of infrastructure (publishing my own modified inference code as a private Kaggle dataset, since the pretrained-checkpoint kernel otherwise runs the original author&rsquo;s unmodified copy). I don&rsquo;t consider either a wasted afternoon: a synthetic-verified, real-data-tested &ldquo;no&rdquo; closes a question permanently, which is worth more than an untested hunch sitting on a roadmap forever.</p>
      <p>Zooming out to every repair/detection technique this project tested, not just the two negative ones above, the batting average looks like this:</p>


      <figure class="not-prose my-10">
        <div class="rounded-xl border border-slate-200 bg-white/60 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/40">
          <svg viewBox="0 0 640 340" class="w-full" role="img" aria-label="Diverging bar chart of six tested techniques' local edge_jaccard delta. Shipped to production: gap-closing plus pruning +0.0065, trajectory smoothing +0.0123. Tested and not adopted: lowering DET_THRESHOLD -0.0022, raising ILP division weight +0.0003, motion-aware gap closing -0.0007, D4 detection TTA -0.0010.">
            <line x1="60" y1="223" x2="600" y2="223" class="stroke-slate-300 dark:stroke-slate-600" stroke-width="1"></line>

            <rect x="170" y="12" width="12" height="12" rx="3" class="fill-emerald-500 dark:fill-emerald-400"></rect>
            <text x="188" y="22" class="fill-slate-600 dark:fill-slate-300 font-mono text-[12px]">Shipped to production</text>
            <rect x="360" y="12" width="12" height="12" rx="3" class="fill-slate-400 dark:fill-slate-500"></rect>
            <text x="378" y="22" class="fill-slate-600 dark:fill-slate-300 font-mono text-[12px]">Tested, not adopted</text>

            <path d="M94,223 L94,140 Q94,136 98,136 L112,136 Q116,136 116,140 L116,223 Z" class="fill-emerald-500 dark:fill-emerald-400"><title>Short-track pruning + gap-closing: +0.0065 edge_jaccard, shipped (+0.007 real)</title></path>
            <text x="105" y="130" text-anchor="middle" class="fill-slate-700 dark:fill-slate-200 font-mono text-[11.5px] font-bold">+0.0065</text>
            <text x="105" y="300" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">Gap-closing +</text>
            <text x="105" y="313" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">pruning</text>

            <path d="M184,223 L184,248 Q184,252 188,252 L202,252 Q206,252 206,248 L206,223 Z" class="fill-slate-400 dark:fill-slate-500"><title>Lower DET_THRESHOLD (0.90 vs 0.99), re-validated at n=60: -0.0022 edge_jaccard, not adopted</title></path>
            <text x="195" y="266" text-anchor="middle" class="fill-slate-700 dark:fill-slate-200 font-mono text-[11.5px] font-bold">-0.0022</text>
            <text x="195" y="300" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">Lower DET_</text>
            <text x="195" y="313" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">THRESHOLD</text>

            <path d="M274,223 Q274,219 278,219 L292,219 Q296,219 296,223 Z" class="fill-slate-400 dark:fill-slate-500"><title>ILP_DIVISION_WEIGHT 10x: +0.0003 edge_jaccard, negligible, not adopted</title></path>
            <text x="285" y="213" text-anchor="middle" class="fill-slate-700 dark:fill-slate-200 font-mono text-[11.5px] font-bold">+0.0003</text>
            <text x="285" y="300" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">Div. weight</text>
            <text x="285" y="313" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">10x</text>

            <path d="M364,223 L364,63 Q364,59 368,59 L382,59 Q386,59 386,63 L386,223 Z" class="fill-emerald-500 dark:fill-emerald-400"><title>Trajectory smoothing: +0.0123 edge_jaccard, shipped (+0.010 real), current best</title></path>
            <text x="375" y="53" text-anchor="middle" class="fill-slate-700 dark:fill-slate-200 font-mono text-[11.5px] font-bold">+0.0123</text>
            <text x="375" y="300" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">Trajectory</text>
            <text x="375" y="313" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">smoothing</text>

            <path d="M454,223 L454,228 Q454,232 458,232 L472,232 Q476,232 476,228 L476,223 Z" class="fill-slate-400 dark:fill-slate-500"><title>Motion-aware gap closing: -0.0007 edge_jaccard, not adopted</title></path>
            <text x="465" y="246" text-anchor="middle" class="fill-slate-700 dark:fill-slate-200 font-mono text-[11.5px] font-bold">-0.0007</text>
            <text x="465" y="300" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">Motion-aware</text>
            <text x="465" y="313" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">gap close</text>

            <path d="M544,223 L544,232 Q544,236 548,236 L562,236 Q566,236 566,232 L566,223 Z" class="fill-slate-400 dark:fill-slate-500"><title>D4 detection test-time augmentation: -0.0010 edge_jaccard, not adopted</title></path>
            <text x="555" y="250" text-anchor="middle" class="fill-slate-700 dark:fill-slate-200 font-mono text-[11.5px] font-bold">-0.0010</text>
            <text x="555" y="300" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">D4 detection</text>
            <text x="555" y="313" text-anchor="middle" class="fill-slate-500 dark:fill-slate-400 font-mono text-[10.5px]">TTA</text>
          </svg>
        </div>
        <figcaption class="mt-2 text-center text-sm text-slate-500 dark:text-slate-400">
          Every repair and detection hypothesis tested. Two shipped, four didn't, all six trusted. Hover a bar for detail.
        </figcaption>
      </figure>


      <p>Two shipped, four didn&rsquo;t &mdash; and every single one of those six bars is a number I trust, because each got the same synthetic-test-then-real-data-A/B treatment before I believed it either way.</p>

      <h2>What I&rsquo;d tell someone starting a similar project</h2>
      <ul>
        <li><strong>Read the actual scoring code, not a description of it.</strong> Two of my biggest findings &mdash; the multi-frame-edge bug and the trajectory-smoothing win &mdash; both came directly from re-deriving behavior from the metric&rsquo;s real rules, not from intuition about what &ldquo;should&rdquo; score well.</li>
        <li><strong>Small-sample local validation is not free of the risks it&rsquo;s meant to prevent.</strong> A held-out validation set still needs enough size to support the kind of comparison you&rsquo;re making &mdash; single hypothesis vs. multi-candidate selection have very different sample-size requirements, and conflating them cost me a real, negative submission before I noticed.</li>
        <li><strong>A negative result, reached rigorously, is a deliverable.</strong> Two of the five techniques in this post&rsquo;s repair layer didn&rsquo;t make the cut &mdash; and I&rsquo;m more confident in the three that did <em>because</em> I know exactly why the other two failed, rather than just not having tried them.</li>
        <li><strong>Time-box the expensive option before committing to it.</strong> Before building anything, I ran a small bounded timing test on training a custom model checkpoint from scratch: measured per-batch and per-video costs, extrapolated to the baseline author&rsquo;s own recommended 50-epoch recipe, and got roughly 110 hours &mdash; not a viable use of a competition compute budget. That five-minute extrapolation redirected the whole project toward the repair-layer work this post describes, instead of a multi-day training run that likely wouldn&rsquo;t have finished in time anyway.</li>
      </ul>
      <p>The competition is still open, and there may be more of this ahead &mdash; possibly a cheaper training setup, possibly nothing, if the cheap wins really are exhausted. Either way, the score at the top of this post is worth less to me than the process that produced it, which is exactly why I wrote this up instead of just screenshotting a leaderboard rank.</p>

      <div class="not-prose mt-10 flex flex-wrap gap-2 border-t border-slate-200 pt-6 dark:border-slate-800">
        <a
          href="https://github.com/tuannm3812/kaggle-biohub-cell-tracking-during-development"
          target="_blank"
          rel="noreferrer"
          class="flex items-center gap-2 rounded-lg bg-slate-950 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.14em] text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand/40 dark:bg-white dark:text-slate-950 dark:hover:bg-brand dark:hover:text-white"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
          Source Code
        </a>
        <a
          href="https://www.kaggle.com/code/tuannm3812/biohub-baseline-modeling"
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
