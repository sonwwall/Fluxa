"use client";

import { Button } from "@heroui/react";
import { useMemo, useState } from "react";

import type { AuthorArticleDraft, AuthorCategory } from "../types";
import { AdminShell } from "./admin-shell";

type ArticleEditorPageProps = {
  categories: AuthorCategory[];
  draft: AuthorArticleDraft;
  mode: "create" | "edit";
};

export function ArticleEditorPage({ categories, draft, mode }: ArticleEditorPageProps) {
  const [title, setTitle] = useState(draft.title);
  const [excerpt, setExcerpt] = useState(draft.excerpt);
  const [content, setContent] = useState(draft.content);
  const [categoryId, setCategoryId] = useState(draft.categoryId);
  const [visibility, setVisibility] = useState(draft.visibility);
  const [tagInput, setTagInput] = useState(draft.tags.join(", "));

  const preview = useMemo(() => {
    return content
      .split("\n")
      .filter((line) => line.trim())
      .slice(0, 8);
  }, [content]);

  const titleLabel = mode === "create" ? "New Article" : "Edit Article";

  return (
    <AdminShell
      active="Articles"
      breadcrumb={["Dashboard", "Articles", titleLabel]}
      searchPlaceholder="Search articles..."
    >
      <div className="grid gap-5 p-5 xl:grid-cols-[minmax(0,1fr)_360px] lg:p-8">
        <div className="flex min-w-0 flex-col gap-5">
          <section className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-5 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm text-sky-200">{draft.status}</p>
              <h2 className="mt-1 text-2xl font-semibold">{titleLabel}</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button isDisabled variant="secondary">
                Save draft
              </Button>
              <Button isDisabled variant="primary">
                Publish
              </Button>
            </div>
          </section>

          <section className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-5 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Title
              <input
                className="h-10 rounded-lg border border-white/10 bg-[#081120] px-3 text-sm text-white outline-none focus:border-sky-300/40"
                onChange={(event) => setTitle(event.target.value)}
                placeholder="Article title"
                value={title}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Category
              <select
                className="h-10 rounded-lg border border-white/10 bg-[#081120] px-3 text-sm text-white"
                onChange={(event) => setCategoryId(event.target.value)}
                value={categoryId}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Tags
              <input
                className="h-10 rounded-lg border border-white/10 bg-[#081120] px-3 text-sm text-white outline-none focus:border-sky-300/40"
                onChange={(event) => setTagInput(event.target.value)}
                placeholder="Go, Architecture"
                value={tagInput}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              Visibility
              <select
                className="h-10 rounded-lg border border-white/10 bg-[#081120] px-3 text-sm text-white"
                onChange={(event) =>
                  setVisibility(event.target.value as AuthorArticleDraft["visibility"])
                }
                value={visibility}
              >
                <option value="inherit">Inherit category</option>
                <option value="public">Public</option>
                <option value="registered">Registered users</option>
              </select>
            </label>
            <div className="md:col-span-2">
              <label className="flex flex-col gap-2 text-sm text-white/70">
                Excerpt
                <textarea
                  className="min-h-24 rounded-lg border border-white/10 bg-[#081120] px-3 py-2 text-sm text-white outline-none focus:border-sky-300/40"
                  onChange={(event) => setExcerpt(event.target.value)}
                  placeholder="Short summary"
                  value={excerpt}
                />
              </label>
            </div>
          </section>

          <section className="grid gap-5 xl:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <h3 className="text-lg font-semibold">Markdown</h3>
              <textarea
                className="mt-4 min-h-[520px] w-full resize-y rounded-xl border border-white/10 bg-[#07101f] p-4 font-mono text-sm leading-6 text-white outline-none focus:border-sky-300/40"
                onChange={(event) => setContent(event.target.value)}
                value={content}
              />
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <h3 className="text-lg font-semibold">Preview</h3>
              <article className="mt-4 min-h-[520px] space-y-4 rounded-xl border border-white/10 bg-[#07101f] p-5 text-sm leading-7 text-white/70">
                {preview.map((line, index) => {
                  if (line.startsWith("# ")) {
                    return (
                      <h1 className="text-2xl font-semibold text-white" key={`${line}-${index}`}>
                        {line.replace("# ", "")}
                      </h1>
                    );
                  }
                  if (line.startsWith("## ")) {
                    return (
                      <h2 className="text-xl font-semibold text-white" key={`${line}-${index}`}>
                        {line.replace("## ", "")}
                      </h2>
                    );
                  }
                  if (line.startsWith("- ")) {
                    return (
                      <p className="pl-4" key={`${line}-${index}`}>
                        {line}
                      </p>
                    );
                  }

                  return <p key={`${line}-${index}`}>{line}</p>;
                })}
              </article>
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-5">
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h3 className="text-lg font-semibold">Publish checklist</h3>
            <div className="mt-4 space-y-3 text-sm text-white/56">
              <p>{title ? "✓" : "○"} Title</p>
              <p>{excerpt ? "✓" : "○"} Excerpt</p>
              <p>{content.length > 80 ? "✓" : "○"} Content</p>
              <p>{categoryId ? "✓" : "○"} Category</p>
            </div>
          </section>
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h3 className="text-lg font-semibold">Publishing</h3>
            <p className="mt-3 text-sm leading-6 text-white/52">
              Draft actions will become available when the author service is connected.
            </p>
          </section>
        </aside>
      </div>
    </AdminShell>
  );
}
