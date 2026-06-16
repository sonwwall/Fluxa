import { AdminSidebar } from "./admin-sidebar";
import { AdminTopbar } from "./admin-topbar";
import { CommentsPanel } from "./comments-panel";
import { RecentPostsPanel } from "./recent-posts-panel";
import { RightRail } from "./right-rail";
import { StatGrid } from "./stat-grid";
import { WelcomePanel } from "./welcome-panel";

export function AdminPage() {
  return (
    <main className="dark min-h-screen bg-[#040b18] text-white">
      <div className="flex">
        <AdminSidebar active="Dashboard" />
        <section className="min-w-0 flex-1">
          <AdminTopbar />
          <div className="grid gap-5 p-5 xl:grid-cols-[minmax(0,1fr)_430px] lg:p-8">
            <div className="flex min-w-0 flex-col gap-5">
              <WelcomePanel />
              <StatGrid />
              <RecentPostsPanel />
              <CommentsPanel />
            </div>
            <RightRail />
          </div>
        </section>
      </div>
    </main>
  );
}
