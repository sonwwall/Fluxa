import type {
  AuthorArticleDraft,
  AuthorArticleRow,
  AuthorArticlesData,
  AuthorCategory,
  AuthorDashboardData,
  AuthorDashboardStat,
} from "../types";

const SERVER_API_BASE_URL = process.env.API_BASE_URL ?? "http://127.0.0.1:8080";

type ApiResponse<T> = {
  code: number;
  data: T;
  msg: string;
};

type ApiAuthorCategory = {
  id: string;
  name: string;
  slug: string;
  visibility: AuthorCategory["visibility"];
};

type ApiAuthorArticleRow = {
  category: ApiAuthorCategory;
  excerpt: string;
  id: string;
  published_at: string | null;
  scheduled_at: string | null;
  status: AuthorArticleRow["status"];
  tags: string[];
  title: string;
  updated_at: string;
  views: string;
  visibility: AuthorArticleRow["visibility"];
};

type ApiAuthorArticleDraft = {
  category_id: string;
  content: string;
  excerpt: string;
  id: string | null;
  status: AuthorArticleDraft["status"];
  tags: string[];
  title: string;
  visibility: AuthorArticleDraft["visibility"];
};

type ApiDashboardData = {
  chart_points: number[];
  recent_articles: ApiAuthorArticleRow[];
  stats: AuthorDashboardStat[];
  summary: {
    greeting: string;
    pending_drafts: number;
    published_this_month: number;
  };
};

type ApiAuthorArticlesData = {
  categories: ApiAuthorCategory[];
  list: ApiAuthorArticleRow[];
  overview: AuthorArticlesData["overview"];
  page: number;
  page_size: number;
  total: number;
};

type ApiDraftPageData = {
  categories: ApiAuthorCategory[];
  draft: ApiAuthorArticleDraft;
};

type SaveAuthorArticlePayload = {
  categoryId: string;
  content: string;
  excerpt: string;
  tags: string[];
  title: string;
  visibility: AuthorArticleDraft["visibility"];
};

type ArticleStatusResult = {
  id: string;
  status: AuthorArticleDraft["status"];
};

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const apiBaseUrl = typeof window === "undefined" ? SERVER_API_BASE_URL : "";
  const response = await fetch(`${apiBaseUrl}${path}`, {
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  const body = (await response.json()) as ApiResponse<T>;
  if (!response.ok || body.code !== 0) {
    throw new Error(body.msg || "Request failed");
  }
  return body.data;
}

export async function getAuthorDashboard(): Promise<AuthorDashboardData> {
  const data = await request<ApiDashboardData>("/api/v1/author/dashboard");

  return {
    chartPoints: data.chart_points,
    recentArticles: data.recent_articles.map(toArticleRow),
    stats: data.stats,
    summary: {
      greeting: data.summary.greeting,
      pendingDrafts: data.summary.pending_drafts,
      publishedThisMonth: data.summary.published_this_month,
    },
  };
}

export async function getAuthorArticles(): Promise<AuthorArticlesData> {
  const data = await request<ApiAuthorArticlesData>("/api/v1/author/articles");

  return {
    articles: data.list.map(toArticleRow),
    categories: data.categories.map(toCategory),
    overview: data.overview,
  };
}

export async function getAuthorArticleDraft(id: string): Promise<AuthorArticleDraft | null> {
  try {
    const data = await request<ApiDraftPageData>(`/api/v1/author/articles/${id}`);
    return toDraft(data.draft);
  } catch {
    return null;
  }
}

export async function getNewAuthorArticleDraft(): Promise<AuthorArticleDraft> {
  const data = await request<ApiDraftPageData>("/api/v1/author/articles/new");
  return toDraft(data.draft);
}

export async function getAuthorCategories(): Promise<AuthorCategory[]> {
  const categories = await request<ApiAuthorCategory[]>("/api/v1/author/categories");
  return categories.map(toCategory);
}

export async function saveAuthorArticle(
  payload: SaveAuthorArticlePayload,
  id?: string | null,
): Promise<string> {
  const data = await request<{ id: string }>(id ? `/api/v1/author/articles/${id}` : "/api/v1/author/articles", {
    body: JSON.stringify(toSavePayload(payload)),
    method: id ? "PATCH" : "POST",
  });
  return data.id;
}

export async function publishAuthorArticle(id: string): Promise<ArticleStatusResult> {
  return request<ArticleStatusResult>(`/api/v1/author/articles/${id}/publish`, {
    body: JSON.stringify({ scheduled_at: null }),
    method: "POST",
  });
}

export async function withdrawAuthorArticle(id: string): Promise<ArticleStatusResult> {
  return request<ArticleStatusResult>(`/api/v1/author/articles/${id}/withdraw`, {
    method: "POST",
  });
}

export async function deleteAuthorArticle(id: string): Promise<void> {
  await request(`/api/v1/author/articles/${id}`, {
    method: "DELETE",
  });
}

function toArticleRow(article: ApiAuthorArticleRow): AuthorArticleRow {
  return {
    category: toCategory(article.category),
    excerpt: article.excerpt,
    id: article.id,
    publishedAt: article.published_at,
    scheduledAt: article.scheduled_at,
    status: article.status,
    tags: article.tags,
    title: article.title,
    updatedAt: article.updated_at,
    views: article.views,
    visibility: article.visibility,
  };
}

function toDraft(draft: ApiAuthorArticleDraft): AuthorArticleDraft {
  return {
    categoryId: draft.category_id,
    content: draft.content,
    excerpt: draft.excerpt,
    id: draft.id,
    status: draft.status,
    tags: draft.tags,
    title: draft.title,
    visibility: draft.visibility,
  };
}

function toCategory(category: ApiAuthorCategory): AuthorCategory {
  return {
    id: category.id,
    name: category.name,
    slug: category.slug,
    visibility: category.visibility,
  };
}

function toSavePayload(payload: SaveAuthorArticlePayload) {
  return {
    category_id: payload.categoryId,
    content: payload.content,
    excerpt: payload.excerpt,
    tags: payload.tags,
    title: payload.title,
    visibility: payload.visibility,
  };
}
