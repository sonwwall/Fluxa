import { notFound } from "next/navigation";

import {
  getAuthorArticleDraft,
  getAuthorCategories,
} from "@/features/author/api/author";
import { ArticleEditorPage } from "@/features/author/components/article-editor-page";

export const dynamic = "force-dynamic";

type EditAuthorArticleRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditAuthorArticleRoute({
  params,
}: EditAuthorArticleRouteProps) {
  const { id } = await params;
  const [draft, categories] = await Promise.all([
    getAuthorArticleDraft(id),
    getAuthorCategories(),
  ]);

  if (!draft) {
    notFound();
  }

  return <ArticleEditorPage categories={categories} draft={draft} mode="edit" />;
}
