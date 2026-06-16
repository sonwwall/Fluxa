import { ArticleTimeline } from "./article-timeline";
import { TopNavigation } from "./top-navigation";

export function ArticlesPage() {
  return (
    <main className="dark min-h-screen bg-[#060913] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <TopNavigation active="Articles" />
        <ArticleTimeline />
      </div>
    </main>
  );
}
