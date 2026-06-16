"use client";

import { Chip } from "@heroui/react";

import { articleDetail } from "./article-detail-data";

export function ArticleDetailHeader() {
  return (
    <header className="space-y-5">
      <nav className="flex flex-wrap items-center gap-3 text-sm text-white/52">
        <span>⌂</span>
        <span>Articles</span>
        <span>›</span>
        <span>Systems</span>
        <span>›</span>
        <span className="text-white/72">{articleDetail.title}</span>
      </nav>
      <div className="flex flex-wrap gap-2">
        {articleDetail.tags.map((tag) => (
          <Chip
            className={tag === "Architecture" ? "bg-violet-400/18 text-violet-100" : "bg-sky-400/12 text-sky-100"}
            key={tag}
          >
            {tag}
          </Chip>
        ))}
      </div>
      <div>
        <h1 className="max-w-5xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {articleDetail.title}
        </h1>
        <p className="mt-3 max-w-3xl text-lg leading-7 text-white/62">
          {articleDetail.subtitle}
        </p>
      </div>
      <div className="flex flex-wrap gap-5 text-sm text-white/58">
        <span>□ {articleDetail.date}</span>
        <span>◷ {articleDetail.readTime}</span>
        <span>◉ {articleDetail.views}</span>
      </div>
      <div className="relative h-44 overflow-hidden rounded-lg border border-white/10 bg-[#081120]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_52%,rgba(96,165,250,0.36),transparent_18%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(30,41,59,0.42)),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:auto,auto,42px_42px]" />
        <div className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-lg border border-blue-200/30 bg-blue-300/10 shadow-[0_0_70px_rgba(96,165,250,0.65)]" />
      </div>
    </header>
  );
}
