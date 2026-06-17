import { getAuthorProfile } from "@/features/profile/api/profile";
import { AboutPage } from "@/features/profile/components/about-page";

export default async function PublicAboutPage() {
  const profile = await getAuthorProfile();

  return <AboutPage profile={profile} />;
}
