import { notFound } from "next/navigation";

import {
  getAuthorArticleDraft,
  getAuthorArticles,
  getAuthorCategories,
} from "@/features/author/api/author";
import { ArticleEditorPage } from "@/features/author/components/article-editor-page";

type EditAuthorArticleRouteProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateStaticParams() {
  const data = await getAuthorArticles();

  return data.articles.map((article) => ({
    id: article.id,
  }));
}

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
