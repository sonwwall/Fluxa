import type { ArticleSummary } from "../types";
import { ArticleCard } from "./article-card";
import { TopNavigation } from "./top-navigation";

type ArticlesPageProps = {
  articles: ArticleSummary[];
};

export function ArticlesPage({ articles }: ArticlesPageProps) {
  const leftArticles = articles.filter((_, index) => index % 2 === 1);
  const rightArticles = articles.filter((_, index) => index % 2 === 0);

  return (
    <main className="dark min-h-screen bg-[#060913] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <TopNavigation active="Articles" />
        <section className="relative grid gap-4 py-6 md:grid-cols-[minmax(0,1fr)_96px_minmax(0,1fr)] md:items-start">
          <div className="absolute bottom-0 left-1/2 top-6 hidden w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(125,211,252,0.82),rgba(139,92,246,0.64),rgba(125,211,252,0.28))] md:block" />
          <div className="flex flex-col gap-5">
            <TimelineIntro />
            {leftArticles.map((article) => (
              <ArticleCard article={article} imagePosition="left" key={article.slug} />
            ))}
          </div>
          <TimelineAxis articles={articles} />
          <div className="flex flex-col gap-5 md:pt-5">
            {rightArticles.map((article) => (
              <ArticleCard article={article} imagePosition="right" key={article.slug} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function TimelineIntro() {
  return (
    <header className="px-2 py-8 md:min-h-[220px] md:px-5 md:py-10">
      <span className="inline-flex rounded-full bg-sky-400/12 px-3 py-1 text-sm text-sky-100">
        Thoughts, experiments, and shipping in public.
      </span>
      <h1 className="mt-6 text-6xl font-semibold leading-none tracking-tight sm:text-7xl">
        Articles
      </h1>
      <p className="mt-5 max-w-md text-base leading-7 text-white/58">
        A chronological journey of ideas on code, systems, AI, and building
        things that matter.
      </p>
    </header>
  );
}

function TimelineAxis({ articles }: { articles: ArticleSummary[] }) {
  return (
    <div
      className="relative hidden md:block"
      style={{ minHeight: `${Math.max(900, articles.length * 150)}px` }}
    >
      <div className="absolute inset-x-0 inset-y-16 flex flex-col justify-between">
        {articles.map((article) => {
          const date = new Date(`${article.publishedAt}T00:00:00Z`);
          const day = new Intl.DateTimeFormat("en", {
            day: "numeric",
            month: "short",
          }).format(date);
          const year = date.getUTCFullYear();

          return (
            <div className="relative flex items-center justify-center" key={article.slug}>
              <time className="absolute right-16 w-16 text-right text-xs font-medium leading-4 text-sky-100/74">
                <span className="block">{day}</span>
                <span className="block text-white/40">{year}</span>
              </time>
              <div className="h-4 w-4 rounded-full border border-sky-100/80 bg-[#07111f] shadow-[0_0_24px_rgba(56,189,248,0.9)]" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
