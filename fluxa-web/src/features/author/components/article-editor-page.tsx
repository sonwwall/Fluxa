"use client";

import { Button } from "@heroui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { MarkdownPreview } from "@/features/articles/components/markdown-preview";
import { useI18n } from "@/features/i18n/i18n";

import {
  deleteAuthorArticle,
  publishAuthorArticle,
  saveAuthorArticle,
  withdrawAuthorArticle,
} from "../api/author";
import type { AuthorArticleDraft, AuthorCategory } from "../types";
import { AdminShell } from "./admin-shell";

type ArticleEditorPageProps = {
  categories: AuthorCategory[];
  draft: AuthorArticleDraft;
  mode: "create" | "edit";
};

export function ArticleEditorPage({ categories, draft, mode }: ArticleEditorPageProps) {
  const { t } = useI18n();
  const router = useRouter();
  const [title, setTitle] = useState(draft.title);
  const [excerpt, setExcerpt] = useState(draft.excerpt);
  const [content, setContent] = useState(draft.content);
  const [categoryId, setCategoryId] = useState(draft.categoryId);
  const [visibility, setVisibility] = useState(draft.visibility);
  const [tagInput, setTagInput] = useState(draft.tags.join(", "));
  const [articleId, setArticleId] = useState(draft.id);
  const [status, setStatus] = useState(draft.status);
  const [editorMode, setEditorMode] = useState(mode);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const titleLabel = editorMode === "create" ? "New Article" : "Edit Article";
  const localizedTitleLabel = editorMode === "create" ? t("editor.new") : t("editor.edit");
  const statusLabel = {
    archived: t("status.archived"),
    draft: t("status.draft"),
    published: t("status.published"),
    scheduled: t("status.scheduled"),
  }[status];
  const canSave = Boolean(title.trim() && excerpt.trim() && content.trim() && categoryId);
  const canPublish = canSave && status !== "published" && status !== "archived";
  const tags = tagInput
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  async function handleSave() {
    if (!canSave) {
      setMessage(t("editor.completeRequired"));
      return;
    }

    setIsSaving(true);
    setMessage(null);
    try {
      const savedId = await saveAuthorArticle(
        {
          categoryId,
          content,
          excerpt,
          tags,
          title,
          visibility,
        },
        articleId,
      );
      setArticleId(savedId);
      setStatus("draft");
      setMessage(t("editor.draftSaved"));
      if (editorMode === "create") {
        setEditorMode("edit");
        router.replace(`/author/articles/${savedId}/edit`);
      } else {
        router.refresh();
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t("editor.saveFailed"));
    } finally {
      setIsSaving(false);
    }
  }

  async function handlePublish() {
    if (!canPublish) {
      setMessage(t("editor.completeBeforePublish"));
      return;
    }

    setIsSaving(true);
    setMessage(null);
    try {
      const savedId =
        articleId ?? (await saveAuthorArticle({ categoryId, content, excerpt, tags, title, visibility }));
      setArticleId(savedId);
      await publishAuthorArticle(savedId);
      setEditorMode("edit");
      setStatus("published");
      setMessage(t("editor.published"));
      if (editorMode === "create") {
        window.history.replaceState(null, "", `/author/articles/${savedId}/edit`);
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t("editor.publishFailed"));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleWithdraw() {
    if (!articleId) return;

    setIsSaving(true);
    setMessage(null);
    try {
      await withdrawAuthorArticle(articleId);
      setStatus("archived");
      setMessage(t("editor.withdrawn"));
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t("editor.withdrawFailed"));
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!articleId) return;

    setIsSaving(true);
    setMessage(null);
    try {
      await deleteAuthorArticle(articleId);
      router.replace("/author/articles");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : t("editor.deleteFailed"));
      setIsSaving(false);
    }
  }

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
              <p className="text-sm text-sky-200">{statusLabel}</p>
              <h2 className="mt-1 text-2xl font-semibold">{localizedTitleLabel}</h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button isDisabled={isSaving || !canSave} onPress={handleSave} variant="secondary">
                {isSaving ? t("editor.saving") : t("editor.saveDraft")}
              </Button>
              {status === "published" ? (
                <Button isDisabled variant="secondary">
                  {t("status.published")}
                </Button>
              ) : (
                <Button isDisabled={isSaving || !canPublish} onPress={handlePublish} variant="primary">
                  {isSaving ? t("editor.publishing") : t("publish")}
                </Button>
              )}
              {articleId ? (
                <>
                  <Button isDisabled={isSaving || status === "archived"} onPress={handleWithdraw} variant="secondary">
                    {t("editor.withdraw")}
                  </Button>
                  <Button isDisabled={isSaving} onPress={handleDelete} variant="secondary">
                    {t("editor.delete")}
                  </Button>
                </>
              ) : null}
            </div>
          </section>
          {message ? (
            <p className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/68">
              {message}
            </p>
          ) : null}

          <section className="grid gap-4 rounded-2xl border border-white/10 bg-white/[0.035] p-5 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-white/70">
              {t("editor.title")}
              <input
                className="h-10 rounded-lg border border-white/10 bg-[#081120] px-3 text-sm text-white outline-none focus:border-sky-300/40"
                onChange={(event) => setTitle(event.target.value)}
                placeholder={t("editor.titlePlaceholder")}
                value={title}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              {t("category")}
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
              {t("editor.tags")}
              <input
                className="h-10 rounded-lg border border-white/10 bg-[#081120] px-3 text-sm text-white outline-none focus:border-sky-300/40"
                onChange={(event) => setTagInput(event.target.value)}
                placeholder="Go, Architecture"
                value={tagInput}
              />
            </label>
            <label className="flex flex-col gap-2 text-sm text-white/70">
              {t("editor.visibility")}
              <select
                className="h-10 rounded-lg border border-white/10 bg-[#081120] px-3 text-sm text-white"
                onChange={(event) =>
                  setVisibility(event.target.value as AuthorArticleDraft["visibility"])
                }
                value={visibility}
              >
                <option value="inherit">{t("visibility.inherit")}</option>
                <option value="public">{t("public")}</option>
                <option value="registered">{t("visibility.registered")}</option>
              </select>
            </label>
            <div className="md:col-span-2">
              <label className="flex flex-col gap-2 text-sm text-white/70">
                {t("editor.excerpt")}
                <textarea
                  className="min-h-24 rounded-lg border border-white/10 bg-[#081120] px-3 py-2 text-sm text-white outline-none focus:border-sky-300/40"
                  onChange={(event) => setExcerpt(event.target.value)}
                  placeholder={t("editor.excerptPlaceholder")}
                  value={excerpt}
                />
              </label>
            </div>
          </section>

          <section className="grid gap-5 xl:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <h3 className="text-lg font-semibold">{t("markdown")}</h3>
              <textarea
                className="mt-4 min-h-[520px] w-full resize-y rounded-xl border border-white/10 bg-[#07101f] p-4 font-mono text-sm leading-6 text-white outline-none focus:border-sky-300/40"
                onChange={(event) => setContent(event.target.value)}
                value={content}
              />
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-5">
              <h3 className="text-lg font-semibold">{t("preview")}</h3>
              <MarkdownPreview
                className="mt-4 min-h-[520px] space-y-6 rounded-xl border border-white/10 bg-[#07101f] p-5 text-[15px] leading-7 text-white/72"
                content={content}
              />
            </div>
          </section>
        </div>

        <aside className="flex flex-col gap-5">
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h3 className="text-lg font-semibold">{t("editor.checklist")}</h3>
            <div className="mt-4 space-y-3 text-sm text-white/56">
              <p>{title ? "✓" : "○"} {t("editor.title")}</p>
              <p>{excerpt ? "✓" : "○"} {t("editor.excerpt")}</p>
              <p>{content.length > 80 ? "✓" : "○"} {t("content")}</p>
              <p>{categoryId ? "✓" : "○"} {t("category")}</p>
            </div>
          </section>
          <section className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
            <h3 className="text-lg font-semibold">{t("editor.publishingTitle")}</h3>
            <p className="mt-3 text-sm leading-6 text-white/52">
              {t("editor.publishingDescription")}
            </p>
          </section>
        </aside>
      </div>
    </AdminShell>
  );
}
