import { ArticleRail } from "./article-rail";
import { BlogHero } from "./blog-hero";
import { FeaturedArticle } from "./featured-article";
import { ProfileSidebar } from "./profile-sidebar";
import { TopNavigation } from "./top-navigation";

export function BlogHome() {
  return (
    <main className="dark min-h-screen bg-[#060913] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <TopNavigation active="Home" />
        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_340px]">
          <section className="flex min-w-0 flex-col gap-5">
            <BlogHero />
            <FeaturedArticle />
            <ArticleRail />
          </section>
          <ProfileSidebar />
        </div>
      </div>
    </main>
  );
}
