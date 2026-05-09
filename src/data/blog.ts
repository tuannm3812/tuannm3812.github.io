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
    id: "mlops-feedback-loops",
    title: "MLOps Starts With Feedback Loops",
    excerpt: "A practical note on why production ML is less about one perfect model and more about monitoring, retraining, and ownership.",
    date: "2026-04-10",
    content: "The most useful MLOps systems I have worked on are not built around a single heroic model. They are built around feedback loops: data quality checks, performance monitoring, retraining triggers, deployment gates, and clear ownership when something drifts. A model can look strong in a notebook and still fail quietly in production if the surrounding system does not explain what changed, who should respond, and how to recover safely.",
    author: "Tuan Nguyen"
  },
  {
    id: "analytics-that-ships",
    title: "Analytics That Ships",
    excerpt: "What e-commerce analytics taught me about moving from dashboards to decisions.",
    date: "2026-03-25",
    content: "In high-volume e-commerce work, a dashboard is only valuable when it changes the next decision. That means the metric has to be trusted, refreshed at the right cadence, and connected to an action someone can actually take. The best analytics products reduce translation work: they make the trade-off visible, show the expected impact, and give business teams enough context to move without waiting for another ad-hoc analysis.",
    author: "Tuan Nguyen"
  }
];
