import { articleMarkdown } from "./article-detail-data";
import { ArticleDetailHeader } from "./article-detail-header";
import { ArticleRelated } from "./article-related";
import { ArticleToc } from "./article-toc";
import { MarkdownRenderer } from "./markdown-renderer";
import { TopNavigation } from "./top-navigation";

export async function ArticleDetailPage() {
  return (
    <main className="dark min-h-screen bg-[#050b18] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
        <TopNavigation active="Articles" />
        <div className="grid gap-10 xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="min-w-0 space-y-7">
            <ArticleDetailHeader />
            <MarkdownRenderer content={articleMarkdown} />
            <ArticleRelated />
          </div>
          <ArticleToc />
        </div>
      </div>
    </main>
  );
}
