import type { ArticleDetail, ArticleHomeData, ArticleSummary, ArticleTocItem } from "../types";

const API_BASE_URL = process.env.API_BASE_URL ?? "http://127.0.0.1:8080";

type ApiResponse<T> = {
  code: number;
  data: T;
  msg: string;
};

type ApiCategory = {
  id: string;
  slug: string;
  name: string;
};

type ApiCover = {
  accent: ArticleSummary["accent"];
  image_url: string | null;
  alt: string;
};

type ApiArticleSummary = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: ApiCategory;
  tags: string[];
  status: ArticleSummary["status"];
  visibility: ArticleSummary["visibility"];
  published_at: string;
  read_time: string;
  cover: ApiCover;
};

type ApiArticleDetail = ApiArticleSummary & {
  subtitle: string;
  views: string;
  toc: ArticleTocItem[];
  content: string;
};

type ApiPage<T> = {
  list: T[];
  page: number;
  page_size: number;
  total: number;
};

type ApiArticleHomeData = {
  featured: ApiArticleSummary;
  latest: ApiArticleSummary[];
  popular: ApiArticleSummary[];
  topics: string[];
};

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, { cache: "no-store" });
  const body = (await response.json()) as ApiResponse<T>;

  if (!response.ok || body.code !== 0) {
    throw new Error(body.msg || "Request failed");
  }

  return body.data;
}

export async function getArticleHomeData(): Promise<ArticleHomeData> {
  const data = await request<ApiArticleHomeData>("/api/v1/articles/home");

  return {
    featured: toSummary(data.featured),
    latest: data.latest.map(toSummary),
    popular: data.popular.map(toSummary),
    topics: data.topics,
  };
}

export async function getPublicArticles(): Promise<ArticleSummary[]> {
  const data = await request<ApiPage<ApiArticleSummary>>("/api/v1/articles?page=1&page_size=50");
  return data.list.map(toSummary);
}

export async function getArticleBySlug(slug: string): Promise<ArticleDetail | null> {
  try {
    const article = await request<ApiArticleDetail>(`/api/v1/articles/${slug}`);
    return toDetail(article);
  } catch {
    return null;
  }
}

export async function getRelatedArticles(slug: string): Promise<ArticleSummary[]> {
  const articles = await request<ApiArticleSummary[]>(`/api/v1/articles/${slug}/related`);
  return articles.map(toSummary);
}

function toSummary(article: ApiArticleSummary): ArticleSummary {
  return {
    accent: article.cover.accent,
    category: article.category.name,
    excerpt: article.excerpt,
    publishedAt: toDateOnly(article.published_at),
    readTime: article.read_time,
    slug: article.slug,
    status: article.status,
    tags: article.tags,
    title: article.title,
    visibility: article.visibility,
  };
}

function toDetail(article: ApiArticleDetail): ArticleDetail {
  return {
    ...toSummary(article),
    content: article.content,
    subtitle: article.subtitle,
    toc: article.toc,
    views: article.views,
  };
}

function toDateOnly(value: string) {
  if (!value) {
    return "";
  }

  return value.slice(0, 10);
}
