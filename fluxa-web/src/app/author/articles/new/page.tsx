import {
  getAuthorCategories,
  getNewAuthorArticleDraft,
} from "@/features/author/api/author";
import { ArticleEditorPage } from "@/features/author/components/article-editor-page";

export default async function NewAuthorArticleRoute() {
  const [draft, categories] = await Promise.all([
    getNewAuthorArticleDraft(),
    getAuthorCategories(),
  ]);

  return <ArticleEditorPage categories={categories} draft={draft} mode="create" />;
}
