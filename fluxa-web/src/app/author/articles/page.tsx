import { getAuthorArticles } from "@/features/author/api/author";
import { AuthorArticlesPage } from "@/features/author/components/articles-page";

export default async function AuthorArticlesRoute() {
  const data = await getAuthorArticles();

  return <AuthorArticlesPage data={data} />;
}
