"use client";

import { Button, Card, Chip, Tabs } from "@heroui/react";
import Link from "next/link";

import type { ArticleHomeData } from "../types";
import { formatArticleDate } from "./format";
import { TopNavigation } from "./top-navigation";

type BlogHomeProps = {
  data: ArticleHomeData;
};

export function BlogHome({ data }: BlogHomeProps) {
  return (
    <main className="dark min-h-screen bg-[#060913] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <TopNavigation active="Home" />
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section className="flex min-w-0 flex-col gap-5">
            <BlogHero topics={data.topics} />
            <FeaturedArticle article={data.featured} />
            <ArticleRail data={data} />
          </section>
          <ProfileSidebar articleCount={data.latest.length + 1} />
        </div>
      </div>
    </main>
  );
}

function BlogHero({ topics }: { topics: string[] }) {
  return (
    <section className="grid min-h-[360px] overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(11,18,35,0.96),rgba(6,9,19,0.98))] p-5 shadow-[0_22px_80px_rgba(0,0,0,0.38)] lg:grid-cols-[1fr_360px] lg:p-8">
      <div className="flex flex-col justify-center gap-6">
        <Chip className="w-fit bg-white/[0.06] text-sky-200">
          Thoughts, experiments, and shipping in public.
        </Chip>
        <div className="space-y-4">
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            Modern notes on{" "}
            <span className="bg-[linear-gradient(90deg,#65e9ff,#5e8cff,#a883ff)] bg-clip-text text-transparent">
              code, systems,
            </span>{" "}
            and building
          </h1>
          <p className="max-w-2xl text-base leading-7 text-white/62">
            A personal space for sharing ideas, deep dives, and practical lessons
            from building products and exploring technology.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/articles/designing-resilient-systems">
            <Button className="shadow-[0_0_28px_rgba(68,150,255,0.45)]" variant="primary">
              Read latest
            </Button>
          </Link>
          <Link href="/articles">
            <Button variant="secondary">Browse articles</Button>
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {topics.map((topic) => (
            <Chip className="bg-white/[0.045] text-white/70" key={topic}>
              {topic}
            </Chip>
          ))}
        </div>
      </div>

      <div className="relative hidden items-center justify-center lg:flex">
        <div className="absolute h-64 w-64 rounded-full bg-sky-400/12 blur-3xl" />
        <div className="relative h-64 w-64">
          <div className="absolute left-12 top-16 h-32 w-44 rotate-[-24deg] rounded-[28px] border border-sky-300/30 bg-sky-400/15 shadow-[0_0_50px_rgba(56,189,248,0.35)]" />
          <div className="absolute left-20 top-24 h-32 w-44 rotate-[-24deg] rounded-[28px] border border-violet-300/30 bg-violet-500/25 shadow-[0_0_50px_rgba(124,77,255,0.35)]" />
          <div className="absolute left-8 top-32 h-32 w-44 rotate-[-24deg] rounded-[28px] border border-blue-300/30 bg-blue-500/20" />
        </div>
      </div>
    </section>
  );
}

function FeaturedArticle({ article }: { article: ArticleHomeData["featured"] }) {
  return (
    <Card className="overflow-hidden border-white/10 bg-white/[0.035] shadow-[0_20px_70px_rgba(0,0,0,0.34)]">
      <div className="grid md:grid-cols-[42%_1fr]">
        <div className="relative min-h-56 overflow-hidden bg-[#07111f]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(82,196,255,0.32),transparent_42%),linear-gradient(180deg,transparent,rgba(0,0,0,0.65))]" />
          <div className="absolute left-1/2 top-1/2 h-20 w-12 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-sky-200/50 bg-sky-300/10 shadow-[0_0_45px_rgba(56,189,248,0.65)]" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-[radial-gradient(ellipse_at_center,rgba(65,160,255,0.32),transparent_65%)]" />
        </div>
        <div className="flex flex-col justify-between p-5">
          <Card.Header className="p-0">
            <Chip className="mb-4 w-fit bg-sky-400/15 text-sky-200">Featured</Chip>
            <Card.Title className="text-2xl leading-snug text-white">
              {article.title}
            </Card.Title>
            <Card.Description className="mt-3 max-w-xl text-sm leading-6 text-white/58">
              {article.excerpt}
            </Card.Description>
          </Card.Header>
          <Card.Footer className="mt-6 flex items-center justify-between gap-4 p-0 text-sm text-white/45">
            <span>
              {formatArticleDate(article.publishedAt)} · {article.readTime}
            </span>
            <Link href={`/articles/${article.slug}`}>
              <Button size="sm" variant="secondary">
                Read article
              </Button>
            </Link>
          </Card.Footer>
        </div>
      </div>
    </Card>
  );
}

function ArticleRail({ data }: { data: ArticleHomeData }) {
  return (
    <Card className="border-white/10 bg-white/[0.035] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.3)]">
      <Tabs aria-label="Article groups" defaultSelectedKey="latest">
        <Tabs.List>
          <Tabs.Tab id="latest">Latest</Tabs.Tab>
          <Tabs.Tab id="popular">Popular</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel id="latest">
          <ArticleGrid articles={data.latest} />
        </Tabs.Panel>
        <Tabs.Panel id="popular">
          <ArticleGrid articles={data.popular} />
        </Tabs.Panel>
      </Tabs>
      <div className="mt-4 flex justify-center">
        <Link href="/articles">
          <Button size="sm" variant="ghost">
            View all articles
          </Button>
        </Link>
      </div>
    </Card>
  );
}

function ArticleGrid({ articles }: { articles: ArticleHomeData["latest"] }) {
  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {articles.map((article) => (
        <Link href={`/articles/${article.slug}`} key={article.slug}>
          <Card className="min-h-52 border-white/10 bg-[#0c111d] p-4 transition hover:border-sky-300/30">
            <div className="mb-5 h-20 rounded-xl bg-[linear-gradient(135deg,rgba(56,189,248,0.22),rgba(124,77,255,0.16)),radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.22),transparent_32%)]" />
            <Chip className="mb-4 w-fit bg-white/[0.06] text-white/60" size="sm">
              {article.category}
            </Chip>
            <Card.Title className="text-base leading-snug text-white">
              {article.title}
            </Card.Title>
            <Card.Footer className="mt-auto p-0 pt-4 text-xs text-white/42">
              {formatArticleDate(article.publishedAt)} · {article.readTime}
            </Card.Footer>
          </Card>
        </Link>
      ))}
    </div>
  );
}

function ProfileSidebar({ articleCount }: { articleCount: number }) {
  return (
    <aside className="flex flex-col gap-5">
      <Card className="border-white/10 bg-white/[0.045] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.32)]">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-full bg-sky-400/15 text-lg font-semibold text-sky-100">
            AD
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Arjun Dev</h2>
            <p className="text-sm text-white/45">@arjundev</p>
          </div>
        </div>
        <p className="mt-5 text-sm leading-6 text-white/58">
          Builder, learner, and occasional writer. I explore systems, developer
          tools, and the craft of shipping.
        </p>
        <div className="mt-5 grid grid-cols-3 text-center">
          <Metric label="Articles" value={String(articleCount)} />
          <Metric label="Sections" value="4" />
          <Metric label="Public" value="100%" />
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.045] p-5">
        <h2 className="text-lg font-semibold text-white">Stay in the loop</h2>
        <p className="mt-2 text-sm leading-6 text-white/55">
          Occasional notes on systems, frontend craft, and product engineering.
        </p>
        <div className="mt-4 flex gap-2">
          <input
            aria-label="Email address"
            className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm text-white/50"
            disabled
            placeholder="you@example.com"
          />
          <Button isDisabled variant="primary">
            Subscribe
          </Button>
        </div>
      </Card>
    </aside>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xl font-semibold text-sky-300">{value}</p>
      <p className="mt-1 text-xs text-white/42">{label}</p>
    </div>
  );
}
