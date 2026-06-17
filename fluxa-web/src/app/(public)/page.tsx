import { getArticleHomeData } from "@/features/articles/api/articles";
import { BlogHome } from "@/features/articles/components/blog-home";

export default async function HomePage() {
  const data = await getArticleHomeData();

  return <BlogHome data={data} />;
}
