"use client";

import { Button, Card, Chip } from "@heroui/react";
import Link from "next/link";

import type { ArticleSummary } from "../types";
import { formatArticleDate } from "./format";

type ArticleCardProps = {
  article: ArticleSummary;
  imagePosition?: "left" | "right";
};

const accentClasses: Record<ArticleSummary["accent"], string> = {
  amber: "from-amber-300/32 via-orange-400/18 to-transparent",
  emerald: "from-emerald-300/30 via-teal-400/18 to-transparent",
  sky: "from-sky-300/35 via-blue-500/20 to-transparent",
  violet: "from-violet-300/35 via-fuchsia-500/18 to-transparent",
};

export function ArticleCard({ article, imagePosition = "right" }: ArticleCardProps) {
  const imageOrder = imagePosition === "left" ? "md:order-1" : "md:order-2";
  const contentOrder = imagePosition === "left" ? "md:order-2" : "md:order-1";
  const gridColumns =
    imagePosition === "left" ? "md:grid-cols-[150px_1fr]" : "md:grid-cols-[1fr_150px]";

  return (
    <Card className="overflow-hidden border-white/10 bg-white/[0.045] shadow-[0_16px_45px_rgba(0,0,0,0.28)]">
      <div className={`grid ${gridColumns}`}>
        <div className={`relative min-h-36 overflow-hidden bg-[#08101f] ${imageOrder}`}>
          <div
            className={`absolute inset-0 bg-[radial-gradient(circle_at_50%_26%,var(--tw-gradient-stops))] ${accentClasses[article.accent]}`}
          />
          <div className="absolute left-1/2 top-1/2 h-14 w-10 -translate-x-1/2 -translate-y-1/2 rounded-xl border border-white/35 bg-white/10 shadow-[0_0_36px_rgba(125,211,252,0.5)]" />
          <div className="absolute bottom-0 left-0 right-0 h-20 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.62))]" />
        </div>
        <Card.Content className={`flex min-h-36 flex-col justify-between p-5 ${contentOrder}`}>
          <div>
            <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-white/42">
              <Chip className="bg-white/[0.06] text-sky-100" size="sm">
                {article.category}
              </Chip>
              <span>{formatArticleDate(article.publishedAt)}</span>
              <span>{article.readTime}</span>
            </div>
            <Card.Title className="text-xl leading-snug text-white">
              {article.title}
            </Card.Title>
            <Card.Description className="mt-3 text-sm leading-6 text-white/56">
              {article.excerpt}
            </Card.Description>
          </div>
          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Chip className="bg-white/[0.04] text-white/58" key={tag} size="sm">
                  {tag}
                </Chip>
              ))}
            </div>
            <Link href={`/articles/${article.slug}`}>
              <Button aria-label={`Read ${article.title}`} isIconOnly size="sm" variant="secondary">
                →
              </Button>
            </Link>
          </div>
        </Card.Content>
      </div>
    </Card>
  );
}
