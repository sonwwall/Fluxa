export type ArticleStatus = "published";

export type ArticleVisibility = "public" | "registered";

export type ArticleSummary = {
  accent: "amber" | "emerald" | "sky" | "violet";
  category: string;
  excerpt: string;
  publishedAt: string;
  readTime: string;
  slug: string;
  status: ArticleStatus;
  tags: string[];
  title: string;
  visibility: ArticleVisibility;
};

export type ArticleDetail = ArticleSummary & {
  content: string;
  subtitle: string;
  toc: ArticleTocItem[];
  views: string;
};

export type ArticleTocItem = {
  active?: boolean;
  label: string;
  number: string;
};

export type ArticleHomeData = {
  featured: ArticleSummary;
  latest: ArticleSummary[];
  popular: ArticleSummary[];
  topics: string[];
};
