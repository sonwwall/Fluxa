import Link from "next/link";

import { LocalizedText } from "@/features/i18n/i18n";

import type { ArticleDetail, ArticleSummary } from "../types";
import { ArticleReadingFontControls } from "./article-reading-font-controls";
import { ArticleTocClient, type TocTreeItem } from "./article-toc-client";
import { formatArticleDate } from "./format";
import { MarkdownRenderer } from "./markdown-renderer";
import { extractMarkdownHeadings, type MarkdownHeading } from "./markdown-renderer-core";
import { TopNavigation } from "./top-navigation";

type ArticleDetailPageProps = {
  article: ArticleDetail;
  relatedArticles: ArticleSummary[];
};

export async function ArticleDetailPage({
  article,
  relatedArticles,
}: ArticleDetailPageProps) {
  return (
    <main className="dark min-h-screen bg-[#050b18] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <TopNavigation active="Articles" />
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 space-y-7">
            <ArticleDetailHeader article={article} />
            <ArticleReadingFontControls>
              <MarkdownRenderer content={article.content} />
            </ArticleReadingFontControls>
            <ArticleRelated articles={relatedArticles} />
          </div>
          <ArticleToc article={article} />
        </div>
      </div>
    </main>
  );
}

function ArticleDetailHeader({ article }: { article: ArticleDetail }) {
  return (
    <header className="space-y-5">
      <nav className="flex flex-wrap items-center gap-3 text-sm text-white/52">
        <Link className="hover:text-white/80" href="/">
          <LocalizedText k="home" />
        </Link>
        <span>/</span>
        <Link className="hover:text-white/80" href="/articles">
          <LocalizedText k="articles" />
        </Link>
        <span>/</span>
        <span>{article.category}</span>
      </nav>
      <div className="flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span
            className={
              tag === "Architecture"
                ? "rounded-full bg-violet-400/18 px-3 py-1 text-sm text-violet-100"
                : "rounded-full bg-sky-400/12 px-3 py-1 text-sm text-sky-100"
            }
            key={tag}
          >
            {tag}
          </span>
        ))}
      </div>
      <div>
        <h1 className="max-w-5xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-3 max-w-3xl text-lg leading-7 text-white/62">
          {article.subtitle}
        </p>
      </div>
      <div className="flex flex-wrap gap-5 text-sm text-white/58">
        <span>{formatArticleDate(article.publishedAt)}</span>
        <span>{article.readTime}</span>
        <span>{article.views}</span>
      </div>
      <div className="relative h-44 overflow-hidden rounded-lg border border-white/10 bg-[#081120]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_52%,rgba(96,165,250,0.36),transparent_18%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(30,41,59,0.42)),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,auto,42px_42px]" />
        <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-blue-200/30 bg-blue-300/10 shadow-[0_0_70px_rgba(96,165,250,0.65)]" />
      </div>
    </header>
  );
}

function ArticleRelated({ articles }: { articles: ArticleSummary[] }) {
  const [previousArticle, nextArticle, ...moreArticles] = articles;

  return (
    <section className="space-y-3">
      <div className="grid overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] md:grid-cols-2">
        {previousArticle ? (
          <Link
            className="border-b border-white/10 p-4 transition hover:bg-white/[0.04] md:border-b-0 md:border-r"
            href={`/articles/${previousArticle.slug}`}
          >
            <p className="text-sm text-white/42"><LocalizedText k="previous.article" /></p>
            <p className="font-medium">{previousArticle.title}</p>
          </Link>
        ) : null}
        {nextArticle ? (
          <Link
            className="p-4 text-right transition hover:bg-white/[0.04]"
            href={`/articles/${nextArticle.slug}`}
          >
            <p className="text-sm text-white/42"><LocalizedText k="next.article" /></p>
            <p className="font-medium">{nextArticle.title}</p>
          </Link>
        ) : null}
      </div>
      <h2 className="text-lg font-semibold"><LocalizedText k="articles.related" /></h2>
      <div className="grid gap-3 md:grid-cols-3">
        {[previousArticle, nextArticle, ...moreArticles].filter(Boolean).map((article, index) => (
          <Link href={`/articles/${article.slug}`} key={article.slug}>
            <div className="rounded-lg border border-white/10 bg-white/[0.035] p-3 transition hover:border-sky-300/30">
              <div className="flex gap-3">
                <div
                  className={`h-14 w-20 shrink-0 rounded-md bg-[radial-gradient(circle_at_50%_40%,rgba(96,165,250,0.42),transparent_45%),linear-gradient(135deg,#0f172a,#1e293b)] ${
                    index === 0 ? "shadow-[0_0_18px_rgba(139,92,246,0.22)]" : ""
                  }`}
                />
                <div>
                  <p className="text-sm font-medium leading-5">{article.title}</p>
                  <p className="mt-1 text-xs text-white/42">
                    {formatArticleDate(article.publishedAt)} · {article.readTime}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

function ArticleToc({ article }: { article: ArticleDetail }) {
  const tocTree = buildTocTree(extractMarkdownHeadings(article.content).filter(isArticleTocHeading));

  if (tocTree.length === 0) {
    return null;
  }

  return (
    <aside className="sticky top-5 hidden max-h-[calc(100vh-2.5rem)] self-start overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-7 xl:block">
      <h2 className="text-lg font-semibold"><LocalizedText k="content" /></h2>
      <ArticleTocClient items={tocTree} />
    </aside>
  );
}

function isArticleTocHeading(heading: MarkdownHeading) {
  return heading.level > 1;
}

function buildTocTree(headings: MarkdownHeading[]) {
  const tree: TocTreeItem[] = [];
  const stack: TocTreeItem[] = [];

  for (const heading of headings) {
    const item: TocTreeItem = { children: [], heading };

    while (stack.length > 0 && stack[stack.length - 1].heading.level >= heading.level) {
      stack.pop();
    }

    const parent = stack[stack.length - 1];
    if (parent) {
      parent.children.push(item);
    } else {
      tree.push(item);
    }

    stack.push(item);
  }

  return tree;
}
