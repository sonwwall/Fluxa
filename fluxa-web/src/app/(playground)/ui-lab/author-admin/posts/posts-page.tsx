import { AdminSidebar } from "../admin-sidebar";
import { AdminTopbar } from "../admin-topbar";
import { PostsFilterBar } from "./posts-filter-bar";
import { PostsHeader } from "./posts-header";
import { PostsRightRail } from "./posts-right-rail";
import { PostsTable } from "./posts-table";

export function PostsPage() {
  return (
    <main className="dark min-h-screen bg-[#040b18] text-white">
      <div className="flex">
        <AdminSidebar active="Posts" />
        <section className="min-w-0 flex-1">
          <AdminTopbar
            breadcrumb={["Dashboard", "Posts"]}
            searchPlaceholder="Search posts..."
          />
          <div className="grid gap-5 p-5 xl:grid-cols-[minmax(0,1fr)_360px] lg:p-8">
            <div className="flex min-w-0 flex-col gap-5">
              <PostsHeader />
              <PostsFilterBar />
              <PostsTable />
            </div>
            <PostsRightRail />
          </div>
        </section>
      </div>
    </main>
  );
}
