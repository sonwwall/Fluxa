import { notFound } from "next/navigation";

import {
  getArticleBySlug,
  getRelatedArticles,
} from "@/features/articles/api/articles";
import { ArticleDetailPage } from "@/features/articles/components/article-detail-page";

export const dynamic = "force-dynamic";

type PublicArticleDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

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
