"use client";

import { Button, Card } from "@heroui/react";

import { postOverviewItems, topCategories } from "../admin-data";

export function PostsRightRail() {
  return (
    <aside className="flex flex-col gap-5">
      <Card className="border-white/10 bg-white/[0.035] p-5">
        <h2 className="mb-5 text-xl font-semibold">Post Overview</h2>
        <div className="grid gap-3">
          {postOverviewItems.map(([value, label, delta, tone]) => (
            <div
              className="flex items-center justify-between rounded-lg border border-white/8 bg-white/[0.025] p-4"
              key={label}
            >
              <div className="flex items-center gap-4">
                <div className={`grid h-10 w-10 place-items-center rounded-lg ${tone}`}>
                  ▣
                </div>
                <div>
                  <p className="text-2xl font-semibold">{value}</p>
                  <p className="text-sm text-white/58">{label}</p>
                </div>
              </div>
              <span className={delta === "—" ? "text-white/38" : "text-emerald-300"}>
                {delta}
              </span>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.035] p-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Top Categories</h2>
          <Button size="sm" variant="ghost">View all</Button>
        </div>
        <div className="grid gap-4">
          {topCategories.map(([label, value, percent, color]) => (
            <div key={label}>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>{label}</span>
                <span className="text-white/58">
                  {value} <span className="text-white/38">({percent})</span>
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div className={`h-full rounded-full ${color}`} style={{ width: percent }} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.035] p-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Activity</h2>
          <Button size="sm" variant="ghost">View all</Button>
        </div>
        <div className="grid gap-4">
          {[
            ["构建一个现代化的 Go 微服务架构", "Updated · May 20, 2026 14:32"],
            ["使用 Next.js 和 HeroUI 构建博客", "Updated · May 18, 2026 10:44"],
            ["基于 Kafka 的实时消息系统", "Created · May 15, 2026 16:45"],
            ["深入理解 Linux 内核调度器", "Scheduled · May 12, 2026 09:20"],
            ["微前端架构的设计与实践", "Archived · Apr 28, 2026 10:22"],
          ].map(([title, meta]) => (
            <div className="flex items-start gap-3" key={title}>
              <div className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-violet-200">
                ✎
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm text-white/84">“{title}”</p>
                <p className="mt-1 text-xs text-white/42">{meta}</p>
              </div>
              <div className="h-8 w-8 shrink-0 rounded-full bg-[linear-gradient(135deg,#818cf8,#111827)]" />
            </div>
          ))}
        </div>
      </Card>
    </aside>
  );
}
