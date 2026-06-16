export type LabEntry = {
  title: string;
  description: string;
  href: string;
  status: "draft" | "active";
  tags: string[];
};

export const labEntries: LabEntry[] = [
  {
    title: "博客主页",
    description: "参考暗色科技博客视觉稿，用 HeroUI 组件搭出的首页概念稿。",
    href: "/ui-lab/blog-home",
    status: "active",
    tags: ["Blog", "HeroUI", "Dark"],
  },
  {
    title: "博客文章主页",
    description: "参考暗色时间线视觉稿，用 HeroUI 组件搭出的文章归档页概念稿。",
    href: "/ui-lab/articles",
    status: "active",
    tags: ["Articles", "Timeline", "HeroUI"],
  },
  {
    title: "博客文章详情页",
    description: "参考暗色阅读页视觉稿，使用 Markdown 内容和 Shiki 代码高亮渲染正文。",
    href: "/ui-lab/articles/resilient-systems",
    status: "active",
    tags: ["Article", "Markdown", "Shiki"],
  },
  {
    title: "关于我页面",
    description: "参考暗色个人主页视觉稿，用 HeroUI 组件搭出的 About 页面概念稿。",
    href: "/ui-lab/about",
    status: "active",
    tags: ["About", "Profile", "HeroUI"],
  },
  {
    title: "作者后台 Dashboard",
    description: "参考暗色后台工作台视觉稿，用 HeroUI 组件搭出的作者管理首页。",
    href: "/ui-lab/author-admin",
    status: "active",
    tags: ["Admin", "Dashboard", "HeroUI"],
  },
];
