import Link from "next/link";

import type { AuthorArticlesData } from "../types";
import { AdminShell } from "./admin-shell";
import { formatAdminDate, getStatusClass, getStatusLabel } from "./format";

type AuthorArticlesPageProps = {
  data: AuthorArticlesData;
};

export function AuthorArticlesPage({ data }: AuthorArticlesPageProps) {
  return (
    <AdminShell
      active="Articles"
      breadcrumb={["Dashboard", "Articles"]}
      searchPlaceholder="Search articles..."
    >
      <div className="grid gap-5 p-5 xl:grid-cols-[minmax(0,1fr)_340px] lg:p-8">
        <div className="flex min-w-0 flex-col gap-5">
          <section className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-semibold">Articles</h2>
              <p className="mt-1 text-sm text-white/48">
                Manage drafts, scheduled work, and published writing.
              </p>
            </div>
            <Link
              className="w-fit rounded-lg bg-sky-400 px-4 py-2 text-sm font-medium text-slate-950"
              href="/author/articles/new"
            >
              New article
            </Link>
          </section>

          <section className="grid gap-3 md:grid-cols-4">
            <OverviewItem label="Published" value={data.overview.published} />
            <OverviewItem label="Drafts" value={data.overview.drafts} />
            <OverviewItem label="Scheduled" value={data.overview.scheduled} />
            <OverviewItem label="Archived" value={data.overview.archived} />
          </section>

          <section className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.035]">
            <div className="grid grid-cols-[minmax(280px,1.7fr)_120px_120px_120px] border-b border-white/10 px-4 py-3 text-xs uppercase tracking-[0.14em] text-white/34">
              <span>Article</span>
              <span>Status</span>
              <span>Category</span>
              <span>Updated</span>
            </div>
            <div className="divide-y divide-white/10">
              {data.articles.map((article) => (
                <Link
                  className="grid grid-cols-[minmax(280px,1.7fr)_120px_120px_120px] gap-3 px-4 py-4 transition hover:bg-white/[0.035]"
                  href={`/author/articles/${article.id}/edit`}
                  key={article.id}
                >
                  <div className="min-w-0">
                    <h3 className="truncate font-medium">{article.title}</h3>
                    <p className="mt-1 truncate text-sm text-white/42">{article.excerpt}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span className="rounded-full bg-white/[0.05] px-2 py-0.5 text-xs text-white/45" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <span className={`h-fit w-fit rounded-full px-2.5 py-1 text-xs ${getStatusClass(article.status)}`}>
                    {getStatusLabel(article.status)}
                  </span>
                  <span className="text-sm text-white/54">{article.category.name}</span>
                  <span className="text-sm text-white/42">{formatAdminDate(article.updatedAt)}</span>
                </Link>
              ))}
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-5">
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h2 className="text-lg font-semibold">Categories</h2>
            <div className="mt-4 space-y-3">
              {data.categories.map((category) => (
                <div className="flex items-center justify-between gap-3 text-sm" key={category.id}>
                  <span>{category.name}</span>
                  <span className="text-white/38">{category.visibility}</span>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </AdminShell>
  );
}

function OverviewItem({ label, value }: { label: string; value: number }) {
  return (
    <article className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-2xl font-semibold text-sky-200">{value}</p>
      <p className="mt-1 text-sm text-white/46">{label}</p>
    </article>
  );
}
