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
    id: "1",
    title: "The Future of MLOps in 2026",
    excerpt: "Exploring the evolution of machine learning operations and how it bridges the gap between research and production.",
    date: "2026-04-10",
    content: "Machine Learning Operations (MLOps) has come a long way. In 2026, we see a complete shift towards automated, self-healing pipelines that manage everything from data drift detection to automatic model retraining...",
    author: "Tuan Nguyen"
  },
  {
    id: "2",
    title: "Scaling Data Pipelines with BigQuery",
    excerpt: "How we managed to process terabytes of e-commerce data efficiently at Shopee.",
    date: "2026-03-25",
    content: "When dealing with high-volume e-commerce data, scalability isn't just a requirement; it's a survival mechanism. This post dives deep into our BigQuery architecture at Shopee...",
    author: "Tuan Nguyen"
  }
];
