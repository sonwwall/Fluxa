export type AuthorArticleStatus = "archived" | "draft" | "published" | "scheduled";

export type AuthorVisibility = "public" | "registered";

export type AuthorCategory = {
  id: string;
  name: string;
  slug: string;
  visibility: AuthorVisibility;
};

export type AuthorArticleRow = {
  category: AuthorCategory;
  excerpt: string;
  id: string;
  publishedAt: string | null;
  scheduledAt: string | null;
  status: AuthorArticleStatus;
  tags: string[];
  title: string;
  updatedAt: string;
  views: string;
  visibility: AuthorVisibility;
};

export type AuthorArticleDraft = {
  categoryId: string;
  content: string;
  excerpt: string;
  id: string | null;
  status: AuthorArticleStatus;
  tags: string[];
  title: string;
  visibility: AuthorVisibility | "inherit";
};

export type AuthorDashboardStat = {
  detail: string;
  label: string;
  tone: "amber" | "blue" | "emerald" | "violet";
  value: string;
};

export type AuthorDashboardData = {
  chartPoints: number[];
  recentArticles: AuthorArticleRow[];
  stats: AuthorDashboardStat[];
  summary: {
    greeting: string;
    pendingDrafts: number;
    publishedThisMonth: number;
  };
};

export type AuthorArticlesData = {
  articles: AuthorArticleRow[];
  categories: AuthorCategory[];
  overview: {
    archived: number;
    drafts: number;
    published: number;
    scheduled: number;
  };
};
