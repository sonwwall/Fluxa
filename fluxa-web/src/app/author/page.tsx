import { getAuthorDashboard } from "@/features/author/api/author";
import { DashboardPage } from "@/features/author/components/dashboard-page";

export default async function AuthorDashboardRoute() {
  const data = await getAuthorDashboard();

  return <DashboardPage data={data} />;
}
