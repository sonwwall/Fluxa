"use client";

import { Card } from "@heroui/react";

import { relatedArticles } from "./article-detail-data";

export function ArticleRelated() {
  return (
    <section className="space-y-3">
      <div className="grid overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] md:grid-cols-2">
        <div className="border-b border-white/10 p-4 md:border-b-0 md:border-r">
          <p className="text-sm text-white/42">← Previous article</p>
          <p className="font-medium">Observability 101: Logs, Metrics, Traces</p>
        </div>
        <div className="p-4 text-right">
          <p className="text-sm text-white/42">Next article →</p>
          <p className="font-medium">Building LLM Apps That Don&apos;t Break</p>
        </div>
      </div>
      <h2 className="text-lg font-semibold">Related articles</h2>
      <div className="grid gap-3 md:grid-cols-3">
        {relatedArticles.map(([title, meta], index) => (
          <Card className="border-white/10 bg-white/[0.035] p-3" key={title}>
            <div className="flex gap-3">
              <div className={`h-14 w-20 shrink-0 rounded-md bg-[radial-gradient(circle_at_50%_40%,rgba(96,165,250,0.42),transparent_45%),linear-gradient(135deg,#0f172a,#1e293b)] ${index === 0 ? "shadow-[0_0_18px_rgba(139,92,246,0.22)]" : ""}`} />
              <div>
                <p className="text-sm font-medium leading-5">{title}</p>
                <p className="mt-1 text-xs text-white/42">{meta}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
