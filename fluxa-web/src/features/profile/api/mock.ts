import type { AuthorProfile } from "../types";

const authorProfile: AuthorProfile = {
  bio: "我喜欢把复杂系统拆开看清楚，再用写作把这些理解沉淀下来。Fluxa 是我的个人博客系统，也是持续打磨工程能力的地方。",
  displayName: "Arjun Dev",
  headline: "Writing about backend systems, product engineering, and the quiet craft of building.",
  journey: [
    {
      description: "Started learning backend development and built my first web backend.",
      period: "2024",
      title: "Start the Journey",
    },
    {
      description: "Explored Go, microservices, and high-performance system design.",
      period: "2025.03",
      title: "Go Deeper",
    },
    {
      description: "Built multiple projects including LiveLive, ALLesson, and more.",
      period: "2025.08",
      title: "Build & Ship",
    },
    {
      description: "Creating Fluxa and preparing for internships.",
      period: "2026 · Now",
      title: "Building Fluxa",
    },
  ],
  links: [
    { href: "https://github.com", label: "GitHub" },
    { href: "mailto:hello@example.com", label: "Email" },
  ],
  location: "Bengaluru, India",
  now: [
    {
      color: "violet",
      status: "In progress",
      text: "Digging deeper into Go, system design, and distributed systems.",
      title: "Learning",
    },
    {
      color: "emerald",
      status: "In progress",
      text: "Building Fluxa, a modern blog system to record ideas and share knowledge.",
      title: "Building",
    },
    {
      color: "blue",
      status: "Ongoing",
      text: "Writing technical articles about backend, systems, and engineering growth.",
      title: "Writing",
    },
    {
      color: "purple",
      status: "Ongoing",
      text: "Preparing for internships and looking for opportunities to grow and contribute.",
      title: "Preparing",
    },
  ],
  principles: [
    {
      description: "先让东西跑起来，再慢慢打磨细节。",
      title: "Build first, polish later.",
    },
    {
      description: "用写作整理混乱的想法，让知识真正属于自己。",
      title: "Write to think.",
    },
    {
      description: "不仅仅关注代码片段，更关心系统如何运行。",
      title: "Systems over snippets.",
    },
    {
      description: "对技术、工具和世界保持好奇和热情。",
      title: "Stay curious.",
    },
  ],
  skills: [
    { group: "Backend", items: ["Go", "Java", "Hertz", "Kitex", "GORM", "Spring Boot"] },
    { group: "Data & Cache", items: ["MySQL", "Redis", "MongoDB", "PostgreSQL", "Elasticsearch"] },
    { group: "Messaging & Infra", items: ["Kafka", "RabbitMQ", "Docker", "Nginx", "Linux", "Git"] },
    { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "HeroUI"] },
    { group: "AI & Tools", items: ["LLM API", "Eino", "Prompt Engineering", "API Integration"] },
  ],
};

export async function getAuthorProfile(): Promise<AuthorProfile> {
  return authorProfile;
}
