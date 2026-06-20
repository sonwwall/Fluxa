"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "fluxa.locale";
const COOKIE_MAX_AGE_SECONDS = 60 * 60 * 24 * 365;

export type Locale = "en" | "zh";

type TranslationKey =
  | "about"
  | "about.author"
  | "article"
  | "articles"
  | "articles.browse"
  | "articles.intro"
  | "articles.manage"
  | "articles.manageAction"
  | "articles.new"
  | "articles.recent"
  | "articles.related"
  | "articles.viewAll"
  | "author.studio"
  | "category"
  | "categories"
  | "code.copied"
  | "code.copy"
  | "comments"
  | "content"
  | "currentlyIn"
  | "dashboard"
  | "dashboard.draftsWaiting"
  | "dashboard.hero"
  | "dashboard.publishedThisMonth"
  | "drafts"
  | "editor.checklist"
  | "editor.completeBeforePublish"
  | "editor.completeRequired"
  | "editor.delete"
  | "editor.deleteFailed"
  | "editor.draftSaved"
  | "editor.edit"
  | "editor.excerpt"
  | "editor.excerptPlaceholder"
  | "editor.new"
  | "editor.publishFailed"
  | "editor.published"
  | "editor.publishing"
  | "editor.publishingDescription"
  | "editor.publishingTitle"
  | "editor.saveDraft"
  | "editor.saveFailed"
  | "editor.saving"
  | "editor.tags"
  | "editor.title"
  | "editor.titlePlaceholder"
  | "editor.visibility"
  | "editor.withdraw"
  | "editor.withdrawFailed"
  | "editor.withdrawn"
  | "email"
  | "error.recorded"
  | "error.retry"
  | "error.retryLater"
  | "error.summary"
  | "error.title"
  | "font.collapse"
  | "font.compact"
  | "font.expand"
  | "font.loose"
  | "font.size"
  | "font.small"
  | "font.standard"
  | "home"
  | "journey"
  | "journey.title"
  | "language.toggle"
  | "loading"
  | "markdown"
  | "media"
  | "navigation.themeSettings"
  | "newsletter.description"
  | "newsletter.title"
  | "next.article"
  | "notFound.back"
  | "notFound.description"
  | "notFound.title"
  | "pages"
  | "previous.article"
  | "profile"
  | "preview"
  | "projects"
  | "publish"
  | "published"
  | "public"
  | "read.article"
  | "read.latest"
  | "readyRoutes"
  | "search"
  | "search.generic"
  | "sections"
  | "settings"
  | "skills"
  | "skills.title"
  | "status"
  | "status.archived"
  | "status.draft"
  | "status.published"
  | "status.scheduled"
  | "subscribe"
  | "traffic"
  | "updated"
  | "visibility.inherit"
  | "visibility.registered"
  | "viewSite";

const translations: Record<Locale, Record<TranslationKey, string>> = {
  en: {
    about: "About",
    "about.author": "About the author",
    article: "Article",
    articles: "Articles",
    "articles.browse": "Browse articles",
    "articles.intro": "Thoughts, experiments, and shipping in public.",
    "articles.manage": "Manage drafts, scheduled work, and published writing.",
    "articles.manageAction": "Manage articles",
    "articles.new": "New article",
    "articles.recent": "Recent articles",
    "articles.related": "Related articles",
    "articles.viewAll": "View all",
    "author.studio": "Author studio",
    category: "Category",
    categories: "Categories",
    "code.copied": "Code copied",
    "code.copy": "Copy code",
    comments: "Comments",
    content: "Contents",
    currentlyIn: "Currently in",
    dashboard: "Dashboard",
    "dashboard.draftsWaiting": "drafts waiting for your next pass",
    "dashboard.hero": "Keep writing. The system is ready.",
    "dashboard.publishedThisMonth": "published this month",
    drafts: "Drafts",
    "editor.checklist": "Publish checklist",
    "editor.completeBeforePublish": "Please complete title, excerpt, content, and category before publishing.",
    "editor.completeRequired": "Please complete title, excerpt, content, and category.",
    "editor.delete": "Delete",
    "editor.deleteFailed": "Delete failed.",
    "editor.draftSaved": "Draft saved.",
    "editor.edit": "Edit Article",
    "editor.excerpt": "Excerpt",
    "editor.excerptPlaceholder": "Short summary",
    "editor.new": "New Article",
    "editor.publishFailed": "Publish failed.",
    "editor.published": "Article published.",
    "editor.publishing": "Publishing...",
    "editor.publishingDescription": "Changes are saved through the author service and reflected in the public blog after publish.",
    "editor.publishingTitle": "Publishing",
    "editor.saveDraft": "Save draft",
    "editor.saveFailed": "Save failed.",
    "editor.saving": "Saving...",
    "editor.tags": "Tags",
    "editor.title": "Title",
    "editor.titlePlaceholder": "Article title",
    "editor.visibility": "Visibility",
    "editor.withdraw": "Withdraw",
    "editor.withdrawFailed": "Withdraw failed.",
    "editor.withdrawn": "Article withdrawn.",
    email: "Email address",
    "error.recorded": "The error has been recorded. Please try again later.",
    "error.retry": "Retry",
    "error.retryLater": "Please refresh the page or try again later.",
    "error.summary": "Something went wrong",
    "error.title": "Page temporarily unavailable",
    "font.collapse": "Collapse font settings",
    "font.compact": "Compact",
    "font.expand": "Expand font settings",
    "font.loose": "Loose",
    "font.size": "Font size",
    "font.small": "Small",
    "font.standard": "Standard",
    home: "Home",
    journey: "Journey",
    "journey.title": "How the path is unfolding",
    "language.toggle": "Switch language",
    loading: "Loading Fluxa...",
    markdown: "Markdown",
    media: "Media",
    "navigation.themeSettings": "Theme settings coming soon",
    "newsletter.description": "Occasional notes on systems, frontend craft, and product engineering.",
    "newsletter.title": "Stay in the loop",
    "next.article": "Next article",
    "notFound.back": "Back to UI Lab",
    "notFound.description": "This address does not have a page yet. You can return to UI Lab for now.",
    "notFound.title": "Page not found",
    pages: "Pages",
    "previous.article": "Previous article",
    preview: "Preview",
    profile: "Profile",
    projects: "Projects",
    publish: "Publish",
    published: "Published",
    public: "Public",
    "read.article": "Read",
    "read.latest": "Read latest",
    readyRoutes: "Ready routes",
    search: "Search articles",
    "search.generic": "Search...",
    sections: "Sections",
    settings: "Settings",
    skills: "Skills",
    "skills.title": "Tools I reach for",
    status: "Status",
    "status.archived": "Archived",
    "status.draft": "Draft",
    "status.published": "Published",
    "status.scheduled": "Scheduled",
    subscribe: "Subscribe",
    traffic: "Traffic shape",
    updated: "Updated",
    "visibility.inherit": "Inherit category",
    "visibility.registered": "Registered users",
    viewSite: "View site",
  },
  zh: {
    about: "关于",
    "about.author": "关于作者",
    article: "文章",
    articles: "文章",
    "articles.browse": "浏览文章",
    "articles.intro": "关于代码、系统和公开构建的想法、实验与记录。",
    "articles.manage": "管理草稿、定时内容和已发布文章。",
    "articles.manageAction": "管理文章",
    "articles.new": "新建文章",
    "articles.recent": "最近文章",
    "articles.related": "相关文章",
    "articles.viewAll": "查看全部",
    "author.studio": "作者工作台",
    category: "分类",
    categories: "分类",
    "code.copied": "代码已复制",
    "code.copy": "复制代码",
    comments: "评论",
    content: "目录",
    currentlyIn: "当前所在地",
    dashboard: "仪表盘",
    "dashboard.draftsWaiting": "篇草稿等待继续处理",
    "dashboard.hero": "继续写作，系统已准备好。",
    "dashboard.publishedThisMonth": "篇本月发布",
    drafts: "草稿",
    "editor.checklist": "发布检查清单",
    "editor.completeBeforePublish": "发布前请补全标题、摘要、正文和分类。",
    "editor.completeRequired": "请补全标题、摘要、正文和分类。",
    "editor.delete": "删除",
    "editor.deleteFailed": "删除失败。",
    "editor.draftSaved": "草稿已保存。",
    "editor.edit": "编辑文章",
    "editor.excerpt": "摘要",
    "editor.excerptPlaceholder": "简短摘要",
    "editor.new": "新建文章",
    "editor.publishFailed": "发布失败。",
    "editor.published": "文章已发布。",
    "editor.publishing": "发布中...",
    "editor.publishingDescription": "变更会通过作者服务保存，并在发布后同步到公开博客。",
    "editor.publishingTitle": "发布",
    "editor.saveDraft": "保存草稿",
    "editor.saveFailed": "保存失败。",
    "editor.saving": "保存中...",
    "editor.tags": "标签",
    "editor.title": "标题",
    "editor.titlePlaceholder": "文章标题",
    "editor.visibility": "可见性",
    "editor.withdraw": "撤回",
    "editor.withdrawFailed": "撤回失败。",
    "editor.withdrawn": "文章已撤回。",
    email: "邮箱地址",
    "error.recorded": "错误已记录，请稍后重试。",
    "error.retry": "重试",
    "error.retryLater": "请刷新页面或稍后重试。",
    "error.summary": "出现错误",
    "error.title": "页面暂时无法显示",
    "font.collapse": "收起字号设置",
    "font.compact": "紧凑",
    "font.expand": "展开字号设置",
    "font.loose": "宽松",
    "font.size": "字号",
    "font.small": "小号",
    "font.standard": "标准",
    home: "首页",
    journey: "经历",
    "journey.title": "路径如何展开",
    "language.toggle": "切换语言",
    loading: "正在加载 Fluxa...",
    markdown: "Markdown",
    media: "媒体",
    "navigation.themeSettings": "主题设置即将推出",
    "newsletter.description": "不定期分享系统、前端工艺和产品工程相关笔记。",
    "newsletter.title": "订阅更新",
    "next.article": "下一篇",
    "notFound.back": "返回 UI Lab",
    "notFound.description": "这个地址还没有对应页面，当前可先回到 UI Lab 继续调整视觉方向。",
    "notFound.title": "页面不存在",
    pages: "页面",
    "previous.article": "上一篇",
    preview: "预览",
    profile: "个人资料",
    projects: "项目",
    publish: "发布",
    published: "已发布",
    public: "公开",
    "read.article": "阅读",
    "read.latest": "阅读最新文章",
    readyRoutes: "可用路由",
    search: "搜索文章",
    "search.generic": "搜索...",
    sections: "分区",
    settings: "设置",
    skills: "技能",
    "skills.title": "常用工具与能力",
    status: "状态",
    "status.archived": "已归档",
    "status.draft": "草稿",
    "status.published": "已发布",
    "status.scheduled": "已定时",
    subscribe: "订阅",
    traffic: "流量走势",
    updated: "更新于",
    "visibility.inherit": "继承分类",
    "visibility.registered": "注册用户",
    viewSite: "查看站点",
  },
};

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
  toggleLocale: () => void;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function isLocale(value: string | null): value is Locale {
  return value === "en" || value === "zh";
}

function writeLocaleCookie(locale: Locale) {
  document.cookie = `${STORAGE_KEY}=${locale}; path=/; max-age=${COOKIE_MAX_AGE_SECONDS}; SameSite=Lax`;
}

export function I18nProvider({
  children,
  initialLocale = "en",
  shouldDelayRender = false,
}: {
  children: ReactNode;
  initialLocale?: Locale;
  shouldDelayRender?: boolean;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);
  const [isLocaleReady, setIsLocaleReady] = useState(!shouldDelayRender);

  useEffect(() => {
    const savedLocale = window.localStorage.getItem(STORAGE_KEY);

    if (shouldDelayRender && isLocale(savedLocale)) {
      setLocaleState(savedLocale);
    }

    setIsLocaleReady(true);
  }, [shouldDelayRender]);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, locale);
    writeLocaleCookie(locale);
  }, [locale]);

  const value = useMemo<I18nContextValue>(() => {
    function setLocale(nextLocale: Locale) {
      setLocaleState(nextLocale);
    }

    return {
      locale,
      setLocale,
      t(key) {
        return translations[locale][key];
      },
      toggleLocale() {
        setLocale(locale === "en" ? "zh" : "en");
      },
    };
  }, [locale]);

  return (
    <I18nContext.Provider value={value}>
      <div style={isLocaleReady ? undefined : { visibility: "hidden" }}>{children}</div>
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const value = useContext(I18nContext);

  if (!value) {
    throw new Error("useI18n must be used inside I18nProvider");
  }

  return value;
}

export function LocalizedText({ k }: { k: TranslationKey }) {
  const { t } = useI18n();

  return t(k);
}
