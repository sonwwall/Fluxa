import Link from "next/link";

import type { ArticleDetail, ArticleSummary } from "../types";
import { formatArticleDate } from "./format";
import { MarkdownRenderer } from "./markdown-renderer";
import { parseMarkdown, type MarkdownBlock } from "./markdown-renderer-core";
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
            <MarkdownRenderer content={article.content} />
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
          Home
        </Link>
        <span>/</span>
        <Link className="hover:text-white/80" href="/articles">
          Articles
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
            <p className="text-sm text-white/42">Previous article</p>
            <p className="font-medium">{previousArticle.title}</p>
          </Link>
        ) : null}
        {nextArticle ? (
          <Link
            className="p-4 text-right transition hover:bg-white/[0.04]"
            href={`/articles/${nextArticle.slug}`}
          >
            <p className="text-sm text-white/42">Next article</p>
            <p className="font-medium">{nextArticle.title}</p>
          </Link>
        ) : null}
      </div>
      <h2 className="text-lg font-semibold">Related articles</h2>
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
  const headings = parseMarkdown(article.content).filter(isArticleTocHeading);

  if (headings.length === 0) {
    return null;
  }

  return (
    <aside className="sticky top-5 hidden max-h-[calc(100vh-2.5rem)] self-start overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] p-7 xl:block">
      <h2 className="text-lg font-semibold">On this page</h2>
      <div className="relative mt-6 max-h-[calc(100vh-9rem)] overflow-y-auto pr-1">
        <div className="absolute bottom-2 left-1.5 top-2 w-px bg-white/20" />
        <div className="space-y-4">
          {headings.map((item, index) => (
            <a
              className="group relative flex gap-4"
              href={`#${item.id}`}
              key={`${item.id}-${index}`}
            >
              <span
                className={`mt-1 h-3 w-3 shrink-0 rounded-full ${
                  index === 0 ? "bg-sky-300 shadow-[0_0_18px_rgba(56,189,248,0.95)]" : "bg-white/42"
                } transition group-hover:bg-sky-200`}
              />
              <p
                className={`text-sm transition group-hover:text-sky-200 ${
                  index === 0 ? "text-sky-300" : "text-white/72"
                } ${item.level > 2 ? "pl-5 text-white/58" : ""}`}
              >
                {item.text}
              </p>
            </a>
          ))}
        </div>
      </div>
    </aside>
  );
}

function isArticleTocHeading(
  block: MarkdownBlock,
): block is Extract<MarkdownBlock, { type: "heading" }> {
  return block.type === "heading" && block.level > 1;
}
