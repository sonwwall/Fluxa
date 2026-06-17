import { notFound } from "next/navigation";

import {
  getArticleBySlug,
  getPublicArticles,
  getRelatedArticles,
} from "@/features/articles/api/articles";
import { ArticleDetailPage } from "@/features/articles/components/article-detail-page";

type PublicArticleDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  const articles = await getPublicArticles();

  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function PublicArticleDetailPage({
  params,
}: PublicArticleDetailPageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(slug);

  return <ArticleDetailPage article={article} relatedArticles={relatedArticles} />;
}
