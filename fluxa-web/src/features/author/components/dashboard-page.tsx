import Link from "next/link";

import type { AuthorDashboardData, AuthorDashboardStat } from "../types";
import { AdminShell } from "./admin-shell";
import { formatAdminDate, getStatusClass, getStatusLabel } from "./format";

type DashboardPageProps = {
  data: AuthorDashboardData;
};

const statTone: Record<AuthorDashboardStat["tone"], string> = {
  amber: "from-amber-500 to-orange-500",
  blue: "from-blue-500 to-cyan-500",
  emerald: "from-emerald-500 to-teal-500",
  violet: "from-violet-500 to-indigo-500",
};

export function DashboardPage({ data }: DashboardPageProps) {
  return (
    <AdminShell active="Dashboard">
      <div className="grid gap-5 p-5 xl:grid-cols-[minmax(0,1fr)_360px] lg:p-8">
        <div className="flex min-w-0 flex-col gap-5">
          <section className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(30,64,175,0.28),rgba(8,13,28,0.98))] p-6 shadow-[0_22px_80px_rgba(0,0,0,0.34)]">
            <p className="text-sm text-sky-100/78">{data.summary.greeting}</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              Keep writing. The system is ready.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-white/58">
              {data.summary.publishedThisMonth} published this month,{" "}
              {data.summary.pendingDrafts} drafts waiting for your next pass.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                className="rounded-lg bg-sky-400 px-4 py-2 text-sm font-medium text-slate-950 shadow-[0_0_28px_rgba(56,189,248,0.32)]"
                href="/author/articles/new"
              >
                New article
              </Link>
              <Link
                className="rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/70"
                href="/author/articles"
              >
                Manage articles
              </Link>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {data.stats.map((stat) => (
              <article className="rounded-xl border border-white/10 bg-white/[0.04] p-5" key={stat.label}>
                <div className={`mb-5 h-10 w-10 rounded-xl bg-gradient-to-br ${statTone[stat.tone]}`} />
                <p className="text-3xl font-semibold">{stat.value}</p>
                <p className="mt-1 text-sm text-white/56">{stat.label}</p>
                <p className="mt-3 text-xs text-white/36">{stat.detail}</p>
              </article>
            ))}
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-xl font-semibold">Recent articles</h2>
              <Link className="text-sm text-sky-200" href="/author/articles">
                View all
              </Link>
            </div>
            <div className="mt-5 space-y-3">
              {data.recentArticles.map((article) => (
                <Link
                  className="grid gap-3 rounded-xl border border-white/10 bg-[#08101f] p-4 transition hover:border-sky-300/30 md:grid-cols-[1fr_auto]"
                  href={`/author/articles/${article.id}/edit`}
                  key={article.id}
                >
                  <div>
                    <h3 className="font-medium">{article.title}</h3>
                    <p className="mt-1 text-sm text-white/46">{article.excerpt}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-white/46 md:justify-end">
                    <span className={`rounded-full px-2.5 py-1 text-xs ${getStatusClass(article.status)}`}>
                      {getStatusLabel(article.status)}
                    </span>
                    <span>{formatAdminDate(article.publishedAt ?? article.updatedAt)}</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-5">
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-lg font-semibold">Traffic shape</h2>
            <div className="mt-5 flex h-44 items-end gap-2">
              {data.chartPoints.map((point, index) => (
                <div
                  className="flex-1 rounded-t-md bg-sky-400/35"
                  key={`${point}-${index}`}
                  style={{ height: `${Math.max(18, (point / 1540) * 100)}%` }}
                />
              ))}
            </div>
          </section>
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-lg font-semibold">Ready routes</h2>
            <div className="mt-4 space-y-3 text-sm text-white/56">
              <p>/author</p>
              <p>/author/articles</p>
              <p>/author/articles/new</p>
              <p>/author/articles/[id]/edit</p>
            </div>
          </section>
        </aside>
      </div>
    </AdminShell>
  );
}
