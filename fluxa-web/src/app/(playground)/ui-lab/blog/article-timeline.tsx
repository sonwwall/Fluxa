"use client";

import { Button, Chip } from "@heroui/react";

import { timelineArticles } from "./blog-data";
import { TimelineArticleCard } from "./timeline-article-card";

export function ArticleTimeline() {
  const leftArticles = timelineArticles.filter((_, index) => index % 2 === 1);
  const rightArticles = timelineArticles.filter((_, index) => index % 2 === 0);
  const timelineDates = timelineArticles.map((article) => article.date);

  return (
    <section className="relative grid gap-4 py-6 md:grid-cols-[minmax(0,1fr)_96px_minmax(0,1fr)] md:items-start">
      <div className="absolute bottom-0 left-1/2 top-6 hidden w-px -translate-x-1/2 bg-[linear-gradient(180deg,transparent,rgba(125,211,252,0.82),rgba(139,92,246,0.64),rgba(125,211,252,0.28))] md:block" />
      <div className="flex flex-col gap-5">
        <TimelineIntro />
        {leftArticles.map((article) => (
          <TimelineArticleCard
            article={article}
            imagePosition="left"
            key={article.title}
          />
        ))}
      </div>

      <TimelineAxis dates={timelineDates} />

      <div className="flex flex-col gap-5 md:pt-5">
        {rightArticles.map((article) => (
          <TimelineArticleCard
            article={article}
            imagePosition="right"
            key={article.title}
          />
        ))}
      </div>
      <div className="md:col-span-3 mt-5 flex justify-center">
        <Button className="shadow-[0_0_28px_rgba(68,150,255,0.35)]" variant="primary">
          Load more articles
        </Button>
      </div>
    </section>
  );
}

function TimelineIntro() {
  return (
    <header className="px-2 py-8 md:min-h-[220px] md:px-5 md:py-10">
      <Chip className="bg-sky-400/12 text-sky-100">
        Thoughts, experiments, and shipping in public.
      </Chip>
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

function TimelineAxis({ dates }: { dates: string[] }) {
  return (
    <div
      className="relative hidden md:block"
      style={{ minHeight: `${Math.max(1100, dates.length * 150)}px` }}
    >
      <div className="absolute inset-x-0 inset-y-16 flex flex-col justify-between">
        {dates.map((date) => {
          const [day, year] = date.split(", ");

          return (
            <div className="relative flex items-center justify-center" key={date}>
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
