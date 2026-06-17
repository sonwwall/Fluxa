import type { ArticleDetail, ArticleHomeData, ArticleSummary } from "../types";

const articleContent = `# Why Resilience Matters

Systems fail. Networks partition. Dependencies slow down. The only question is whether your system can adapt to those failures without cascading into an outage.

> Resilience is not about preventing failure. It is about ensuring failure is contained, recovered from, and learned from.

Designing for resilience from the beginning saves you from painful rewrites and builds confidence with your users.

## Core Principles

Resilient systems are built on a few foundational principles. These are not concrete rules, but guidance that helps shape better architectural decisions.

- **Isolate Failure:** Limit the blast radius so one failure does not bring down everything.
- **Embrace Redundancy:** Add capacity across services and regions.
- **Design for Recovery:** Build fast, safe recovery paths and test them.
- **Make It Observable:** You cannot fix what you cannot see.
- **Automate Operations:** Reduce manual steps and human error.

## Architectural Patterns

Certain architectural patterns consistently lead to resilient, scalable systems.

### Circuit Breaker

Prevent cascading failures by stopping calls to a failing dependency.

\`\`\`go
if failureRate > threshold {
    openCircuit()
    return fallbackResponse()
}

try {
    return callDependency()
} catch err {
    recordFailure(err)
    throw err
}
\`\`\`

Circuit breakers give dependencies time to recover and keep your system responsive.

### Bulkhead Isolation

Separate resources by workload so one overloaded path cannot exhaust the entire application.

### Timeouts & Retries

Every network call should have a timeout. Retries should use backoff and jitter so recovery does not create more traffic than the original failure.

### Idempotency

Operations that may be retried should be safe to run more than once. Idempotency keys are often the simplest practical solution.

## Observability at Scale

Resilience depends on feedback. Metrics show trends, logs tell stories, and traces reveal the shape of user requests across service boundaries.

- Metrics answer what is changing.
- Logs explain what happened.
- Traces show where time is spent.
- Alerts tell the team when action is needed.

## Bringing It Together

The strongest systems are designed around expected failure. They keep core paths small, isolate unstable dependencies, and create enough visibility for engineers to make calm decisions under pressure.

## Key Takeaways

Resilience is a product quality, not just an infrastructure concern. Users feel it every time a product continues to work while the world around it is messy.
`;

const articleSummaries: ArticleSummary[] = [
  {
    accent: "sky",
    category: "Systems",
    excerpt:
      "A practical look at boundaries, observability, and patterns that keep production systems understandable as they scale.",
    publishedAt: "2026-05-12",
    readTime: "12 min read",
    slug: "designing-resilient-systems",
    status: "published",
    tags: ["Architecture", "Reliability"],
    title: "Designing Resilient Systems: Patterns That Scale",
    visibility: "public",
  },
  {
    accent: "emerald",
    category: "Go",
    excerpt:
      "Explore context internals, cancellation patterns, and real-world pitfalls that can make or break services.",
    publishedAt: "2026-05-10",
    readTime: "6 min read",
    slug: "context-in-go-beyond-the-basics",
    status: "published",
    tags: ["Go", "Backend", "Concurrency"],
    title: "Context in Go: Beyond the Basics",
    visibility: "public",
  },
  {
    accent: "violet",
    category: "Next.js",
    excerpt:
      "Route groups, server components, cache strategy, and the small composition choices that make larger apps easier to change.",
    publishedAt: "2026-05-08",
    readTime: "9 min read",
    slug: "advanced-nextjs-patterns-for-production",
    status: "published",
    tags: ["Frontend", "Next.js"],
    title: "Advanced Next.js: Patterns for Production",
    visibility: "public",
  },
  {
    accent: "sky",
    category: "Observability",
    excerpt:
      "Build visibility into your systems with structured logs, meaningful metrics, and distributed tracing.",
    publishedAt: "2026-05-05",
    readTime: "8 min read",
    slug: "observability-101",
    status: "published",
    tags: ["OpenTelemetry", "SRE"],
    title: "Observability 101: Logs, Metrics, Traces",
    visibility: "public",
  },
  {
    accent: "amber",
    category: "AI",
    excerpt:
      "What breaks in LLM apps first, how to design recovery paths, and where to keep humans in the loop.",
    publishedAt: "2026-05-02",
    readTime: "10 min read",
    slug: "building-llm-apps-that-do-not-break",
    status: "published",
    tags: ["AI", "Product"],
    title: "Building LLM Apps That Don't Break",
    visibility: "public",
  },
  {
    accent: "violet",
    category: "DevOps",
    excerpt:
      "Blue-green, canary, feature flags, and rollback habits for modern distributed systems.",
    publishedAt: "2026-04-30",
    readTime: "7 min read",
    slug: "deploying-distributed-systems-with-confidence",
    status: "published",
    tags: ["Kubernetes", "Delivery"],
    title: "Deploying Distributed Systems with Confidence",
    visibility: "public",
  },
];

const details: ArticleDetail[] = articleSummaries.map((article) => ({
  ...article,
  content:
    article.slug === "designing-resilient-systems"
      ? articleContent
      : `# ${article.title}

${article.excerpt}

## Notes

This public reading page is already wired through the article data boundary. The content here is mock data and can be replaced by the backend response without changing the page structure.

## Next Steps

- Keep the route stable.
- Replace mock data with the real API client.
- Preserve loading, empty, and not-found states as the backend comes online.
`,
  subtitle: article.excerpt,
  toc:
    article.slug === "designing-resilient-systems"
      ? [
          { active: true, label: "Why Resilience Matters", number: "1." },
          { label: "Core Principles", number: "2." },
          { label: "Architectural Patterns", number: "3." },
          { label: "Circuit Breaker", number: "3.1" },
          { label: "Bulkhead Isolation", number: "3.2" },
          { label: "Timeouts & Retries", number: "3.3" },
          { label: "Idempotency", number: "3.4" },
          { label: "Observability at Scale", number: "4." },
          { label: "Bringing It Together", number: "5." },
          { label: "Key Takeaways", number: "6." },
        ]
      : [
          { active: true, label: article.title, number: "1." },
          { label: "Notes", number: "2." },
          { label: "Next Steps", number: "3." },
        ],
  views: article.slug === "designing-resilient-systems" ? "3.2K views" : "Preview",
}));

export async function getArticleHomeData(): Promise<ArticleHomeData> {
  return {
    featured: articleSummaries[0],
    latest: articleSummaries.slice(1, 5),
    popular: [articleSummaries[0], articleSummaries[2], articleSummaries[3]],
    topics: ["Go", "Next.js", "Systems", "Notes", "AI"],
  };
}

export async function getPublicArticles(): Promise<ArticleSummary[]> {
  return articleSummaries;
}

export async function getArticleBySlug(slug: string): Promise<ArticleDetail | null> {
  return details.find((article) => article.slug === slug) ?? null;
}

export async function getRelatedArticles(slug: string): Promise<ArticleSummary[]> {
  return articleSummaries.filter((article) => article.slug !== slug).slice(0, 3);
}
