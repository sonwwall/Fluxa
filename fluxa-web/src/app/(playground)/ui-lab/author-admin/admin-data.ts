export const sidebarItems = [
  ["⌂", "Dashboard", "/ui-lab/author-admin"],
  ["▣", "Posts", "/ui-lab/author-admin/posts"],
  ["□", "Projects", "#"],
  ["▤", "Pages", "#"],
  ["▧", "Media", "#"],
  ["◇", "Comments", "#"],
  ["✧", "Appearance", "#"],
  ["♙", "Profile", "#"],
  ["⚙", "Settings", "#"],
] as const;

export const statItems = [
  ["▤", "42", "Total Posts", "↑ 12 this month", "from-violet-500 to-indigo-500"],
  ["▣", "8", "Projects", "↑ 2 this month", "from-blue-500 to-cyan-500"],
  ["▢", "128", "Comments", "↑ 18 this month", "from-emerald-500 to-teal-500"],
  ["◉", "12.5K", "Total Views", "↑ 1.2K this month", "from-amber-500 to-orange-500"],
] as const;

export const recentPosts = [
  ["构建一个现代化的 Go 微服务架构", "探索 Go 微服务架构的设计原则与实践", "Published", "Go", "May 20, 2026"],
  ["分布式事务：Saga 模式实践", "如何在微服务中优雅地处理分布式事务", "Published", "System Design", "May 18, 2026"],
  ["基于 Kafka 的实时消息系统", "从零构建一个高吞吐的消息系统", "Draft", "Kafka", "May 15, 2026"],
  ["我的学习方法与工程思维", "分享我的学习策略和工程实践心得", "Published", "Thoughts", "May 10, 2026"],
  ["使用 Next.js 和 HeroUI 构建博客", "现代化博客的架构和实现", "Published", "Frontend", "May 5, 2026"],
] as const;

export const quickActions = [
  ["✎", "Create New Post", "text-fuchsia-300"],
  ["▣", "Create New Project", "text-blue-300"],
  ["⌂", "Edit Homepage", "text-emerald-300"],
  ["⇧", "Upload Media", "text-amber-300"],
] as const;

export const chartPoints = [720, 540, 680, 760, 720, 840, 930, 1120, 1540, 1390, 1040, 880, 990];

export const mediaItems = ["bg-sky-300/35", "bg-violet-300/35", "bg-emerald-300/30", "bg-blue-300/35"];

export const postRows = [
  ["构建一个现代化的 Go 微服务架构", "探索 Go 微服务架构的设计原则与实践", "Published", "Go", ["微服务", "架构"], "May 20, 2026", "14:32", "12.5K"],
  ["分布式事务：Saga 模式实践", "如何在微服务中优雅地处理分布式事务", "Published", "System Design", ["分布式", "事务"], "May 18, 2026", "09:15", "8.7K"],
  ["基于 Kafka 的实时消息系统", "从架构设计到高吞吐的消息系统", "Draft", "Kafka", ["消息队列", "Kafka"], "May 15, 2026", "16:45", "—"],
  ["我的学习方法与工程思维", "分享我的学习策略和工程实践心得", "Published", "Thoughts", ["学习", "方法论"], "May 10, 2026", "11:20", "7.1K"],
  ["使用 Next.js 和 HeroUI 构建博客", "现代化博客前端架构与实践", "Published", "Frontend", ["Next.js", "HeroUI"], "May 5, 2026", "13:08", "9.3K"],
  ["深入理解 Linux 内核调度器", "从源码角度剖析 CFS 调度算法", "Scheduled", "Linux", ["内核", "调度器"], "May 25, 2026", "Scheduled", "—"],
  ["微前端架构的设计与实践", "如何构建可扩展的微前端应用体系", "Archived", "Frontend", ["微前端", "架构"], "Apr 28, 2026", "10:22", "3.2K"],
  ["API 安全最佳实践", "从认证授权到防护策略的完整指南", "Draft", "Security", ["API", "安全"], "Apr 20, 2026", "15:30", "—"],
] as const;

export const postOverviewItems = [
  ["28", "Published", "↑ 12%", "bg-emerald-400/12 text-emerald-200"],
  ["8", "Drafts", "↑ 33%", "bg-amber-400/12 text-amber-200"],
  ["3", "Scheduled", "↑ 50%", "bg-blue-400/12 text-blue-200"],
  ["3", "Archived", "—", "bg-white/[0.06] text-white/64"],
] as const;

export const topCategories = [
  ["System Design", 12, "28.6%", "bg-violet-500"],
  ["Go", 9, "21.4%", "bg-indigo-500"],
  ["Frontend", 8, "19.0%", "bg-fuchsia-500"],
  ["Kafka", 5, "11.9%", "bg-blue-500"],
  ["Linux", 4, "9.5%", "bg-sky-500"],
  ["Security", 4, "9.5%", "bg-purple-500"],
] as const;
