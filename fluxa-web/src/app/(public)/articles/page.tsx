import { getPublicArticles } from "@/features/articles/api/articles";
import { ArticlesPage } from "@/features/articles/components/articles-page";

export default async function PublicArticlesPage() {
  const articles = await getPublicArticles();

  return <ArticlesPage articles={articles} />;
}
