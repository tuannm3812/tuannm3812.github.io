export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
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
    content:
      'On a recent Kaggle competition — a three-class student health-risk classifier scored on balanced accuracy under a 15:1 class imbalance — the first serious model, a balanced LightGBM/XGBoost blend, reached 0.94959 on the public leaderboard. What came next was more instructive than the model itself: twelve further ideas — synthetic feature engineering, fold-safe target encoding, five-fold cross-validation, logistic-regression blending, native categorical splits, hyperparameter search — all failed the same promotion bar in a row, each by a smaller and more specific margin than the last. Rather than run a thirteenth variant, I pulled and read the source of five top-scoring public notebooks for the same competition. All five, using different architectures and different authors, converged on the same balanced-accuracy band this project had already reached — a documented ceiling, not a gap in the modeling. The visible leaderboard sat roughly 0.0015 higher, but tracing why showed that gap was mostly shared submission files and hand-edited leaderboard corrections, not better models — the same pattern that had already cost a public #1 team its private ranking in an earlier round of the same competition series. Closing the project there, instead of chasing the higher number, was the decision that actually mattered. The skill worth practicing is not finding the next tweak — it is building the discipline to check outside evidence before assuming there is always one more tweak worth finding.',
    author: 'Tuan Nguyen',
  },
];
