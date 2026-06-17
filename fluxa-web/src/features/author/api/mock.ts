import type {
  AuthorArticleDraft,
  AuthorArticleRow,
  AuthorArticlesData,
  AuthorCategory,
  AuthorDashboardData,
} from "../types";

const categories: AuthorCategory[] = [
  { id: "cat_go", name: "Go", slug: "go", visibility: "public" },
  { id: "cat_systems", name: "System Design", slug: "system-design", visibility: "public" },
  { id: "cat_frontend", name: "Frontend", slug: "frontend", visibility: "public" },
  { id: "cat_notes", name: "Thoughts", slug: "thoughts", visibility: "registered" },
  { id: "cat_security", name: "Security", slug: "security", visibility: "registered" },
];

const articles: AuthorArticleRow[] = [
  {
    category: categories[0],
    excerpt: "探索 Go 微服务架构的设计原则与实践",
    id: "art_1001",
    publishedAt: "2026-05-20T14:32:00Z",
    scheduledAt: null,
    status: "published",
    tags: ["微服务", "架构"],
    title: "构建一个现代化的 Go 微服务架构",
    updatedAt: "2026-05-20T14:32:00Z",
    views: "12.5K",
    visibility: "public",
  },
  {
    category: categories[1],
    excerpt: "如何在微服务中优雅地处理分布式事务",
    id: "art_1002",
    publishedAt: "2026-05-18T09:15:00Z",
    scheduledAt: null,
    status: "published",
    tags: ["分布式", "事务"],
    title: "分布式事务：Saga 模式实践",
    updatedAt: "2026-05-18T09:15:00Z",
    views: "8.7K",
    visibility: "public",
  },
  {
    category: categories[1],
    excerpt: "从架构设计到高吞吐的消息系统",
    id: "art_1003",
    publishedAt: null,
    scheduledAt: null,
    status: "draft",
    tags: ["消息队列", "Kafka"],
    title: "基于 Kafka 的实时消息系统",
    updatedAt: "2026-05-15T16:45:00Z",
    views: "-",
    visibility: "registered",
  },
  {
    category: categories[3],
    excerpt: "分享我的学习策略和工程实践心得",
    id: "art_1004",
    publishedAt: "2026-05-10T11:20:00Z",
    scheduledAt: null,
    status: "published",
    tags: ["学习", "方法论"],
    title: "我的学习方法与工程思维",
    updatedAt: "2026-05-10T11:20:00Z",
    views: "7.1K",
    visibility: "registered",
  },
  {
    category: categories[2],
    excerpt: "现代化博客前端架构与实践",
    id: "art_1005",
    publishedAt: "2026-05-05T13:08:00Z",
    scheduledAt: null,
    status: "published",
    tags: ["Next.js", "HeroUI"],
    title: "使用 Next.js 和 HeroUI 构建博客",
    updatedAt: "2026-05-05T13:08:00Z",
    views: "9.3K",
    visibility: "public",
  },
  {
    category: categories[1],
    excerpt: "从源码角度剖析 CFS 调度算法",
    id: "art_1006",
    publishedAt: null,
    scheduledAt: "2026-05-25T09:00:00Z",
    status: "scheduled",
    tags: ["内核", "调度器"],
    title: "深入理解 Linux 内核调度器",
    updatedAt: "2026-05-19T10:22:00Z",
    views: "-",
    visibility: "public",
  },
  {
    category: categories[2],
    excerpt: "如何构建可扩展的微前端应用体系",
    id: "art_1007",
    publishedAt: "2026-04-28T10:22:00Z",
    scheduledAt: null,
    status: "archived",
    tags: ["微前端", "架构"],
    title: "微前端架构的设计与实践",
    updatedAt: "2026-04-28T10:22:00Z",
    views: "3.2K",
    visibility: "public",
  },
];

const editorMarkdown = `# 构建一个现代化的 Go 微服务架构实践

在云原生和 DevOps 成为主流的今天，微服务架构已经成为构建可扩展、高可用应用的首选方案。Go 语言凭借其高性能、并发模型和丰富的生态，非常适合用于构建微服务。

## 为什么选择 Go？

- 高性能：编译型语言，执行效率接近 C/C++
- 并发友好：Goroutine + Channel 让并发编程变得简单
- 轻量部署：静态编译，部署镜像小
- 丰富生态：gRPC、Kitex、Kratos 等框架成熟稳定

## 架构设计原则

在设计微服务架构时，我们遵循单一职责、松耦合、可观测性和可扩展性。
`;

export async function getAuthorDashboard(): Promise<AuthorDashboardData> {
  const published = articles.filter((article) => article.status === "published").length;
  const drafts = articles.filter((article) => article.status === "draft").length;
  const scheduled = articles.filter((article) => article.status === "scheduled").length;

  return {
    chartPoints: [720, 540, 680, 760, 720, 840, 930, 1120, 1540, 1390, 1040, 880],
    recentArticles: articles.slice(0, 5),
    stats: [
      { detail: "4 live now", label: "Published", tone: "violet", value: String(published) },
      { detail: "needs review", label: "Drafts", tone: "amber", value: String(drafts) },
      { detail: "next 7 days", label: "Scheduled", tone: "blue", value: String(scheduled) },
      { detail: "public traffic", label: "Total Views", tone: "emerald", value: "40.8K" },
    ],
    summary: {
      greeting: "Welcome back, Arjun",
      pendingDrafts: drafts,
      publishedThisMonth: published,
    },
  };
}

export async function getAuthorArticles(): Promise<AuthorArticlesData> {
  return {
    articles,
    categories,
    overview: {
      archived: articles.filter((article) => article.status === "archived").length,
      drafts: articles.filter((article) => article.status === "draft").length,
      published: articles.filter((article) => article.status === "published").length,
      scheduled: articles.filter((article) => article.status === "scheduled").length,
    },
  };
}

export async function getAuthorArticleDraft(id: string): Promise<AuthorArticleDraft | null> {
  const article = articles.find((item) => item.id === id);

  if (!article) return null;

  return {
    categoryId: article.category.id,
    content: editorMarkdown,
    excerpt: article.excerpt,
    id: article.id,
    status: article.status,
    tags: article.tags,
    title: article.title,
    visibility: article.visibility,
  };
}

export async function getNewAuthorArticleDraft(): Promise<AuthorArticleDraft> {
  return {
    categoryId: categories[0].id,
    content: "# Untitled article\n\nStart writing in Markdown...",
    excerpt: "",
    id: null,
    status: "draft",
    tags: [],
    title: "",
    visibility: "inherit",
  };
}

export async function getAuthorCategories(): Promise<AuthorCategory[]> {
  return categories;
}
