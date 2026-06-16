export type BlogNavItem = {
  label: "Home" | "Articles" | "Projects" | "About";
  href: string;
};

export const navItems: BlogNavItem[] = [
  { label: "Home", href: "/ui-lab/blog-home" },
  { label: "Articles", href: "/ui-lab/articles" },
  { label: "Projects", href: "/ui-lab/blog-home" },
  { label: "About", href: "/ui-lab/about" },
];

export const topics = ["Go", "Next.js", "Systems", "Notes", "AI"];

export const articles = [
  {
    category: "Go",
    title: "Context in Go: Beyond the Basics",
    date: "May 10, 2024",
    readTime: "6 min read",
  },
  {
    category: "Next.js",
    title: "Advanced Next.js: Patterns for Production",
    date: "May 8, 2024",
    readTime: "9 min read",
  },
  {
    category: "Systems",
    title: "Observability 101: Logs, Metrics, Traces",
    date: "May 5, 2024",
    readTime: "8 min read",
  },
  {
    category: "AI",
    title: "Building LLM Apps That Don't Break",
    date: "May 2, 2024",
    readTime: "10 min read",
  },
];

export const activityItems = [
  {
    color: "bg-sky-400",
    title: 'Published "Designing Resilient Systems"',
    date: "May 12, 2024",
  },
  {
    color: "bg-emerald-400",
    title: 'Updated project "Fluxa CLI"',
    date: "May 9, 2024",
  },
  {
    color: "bg-violet-400",
    title: 'Commented on "The Future of Edge"',
    date: "May 7, 2024",
  },
];

export const timelineArticles = [
  {
    accent: "sky",
    category: "Systems",
    date: "May 12, 2024",
    excerpt:
      "A practical look at boundaries, observability, and patterns that keep production systems understandable as they scale.",
    readTime: "12 min read",
    tags: ["Architecture", "Reliability"],
    title: "Designing Resilient Systems: Patterns That Scale",
  },
  {
    accent: "emerald",
    category: "Go",
    date: "May 10, 2024",
    excerpt:
      "Explore context internals, cancellation patterns, and real-world pitfalls that can make or break services.",
    readTime: "6 min read",
    tags: ["Go", "Backend", "Concurrency"],
    title: "Context in Go: Beyond the Basics",
  },
  {
    accent: "violet",
    category: "Next.js",
    date: "May 8, 2024",
    excerpt:
      "Route groups, server components, cache strategy, and the small composition choices that make larger apps easier to change.",
    readTime: "9 min read",
    tags: ["Frontend", "Next.js"],
    title: "Advanced Next.js: Patterns for Production",
  },
  {
    accent: "sky",
    category: "Observability",
    date: "May 5, 2024",
    excerpt:
      "Build visibility into your systems with structured logs, meaningful metrics, and distributed tracing.",
    readTime: "8 min read",
    tags: ["OpenTelemetry", "SRE"],
    title: "Observability 101: Logs, Metrics, Traces",
  },
  {
    accent: "amber",
    category: "AI",
    date: "May 2, 2024",
    excerpt:
      "What breaks in LLM apps first, how to design recovery paths, and where to keep humans in the loop.",
    readTime: "10 min read",
    tags: ["AI", "Product"],
    title: "Building LLM Apps That Don't Break",
  },
  {
    accent: "violet",
    category: "DevOps",
    date: "Apr 30, 2024",
    excerpt:
      "Blue-green, canary, feature flags, and rollback habits for modern distributed systems.",
    readTime: "7 min read",
    tags: ["Kubernetes", "Delivery"],
    title: "Deploying Distributed Systems with Confidence",
  },
  {
    accent: "emerald",
    category: "Productivity",
    date: "Apr 28, 2024",
    excerpt:
      "Workflows, tools, and habits that help developers move faster without sacrificing quality.",
    readTime: "6 min read",
    tags: ["AI Tools", "Workflow"],
    title: "Developer Productivity in the AI Era",
  },
  {
    accent: "sky",
    category: "Engineering",
    date: "Apr 25, 2024",
    excerpt:
      "How small trade-offs compound over time and strategies to pay technical debt down sustainably.",
    readTime: "5 min read",
    tags: ["Tech Debt", "Process"],
    title: "The Hidden Costs of Technical Debt",
  },
];
