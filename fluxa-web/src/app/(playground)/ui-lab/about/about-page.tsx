import { TopNavigation } from "../blog/top-navigation";
import { AboutCta } from "./about-cta";
import { AboutHero } from "./about-hero";
import { JourneySection } from "./journey-section";
import { NowSection } from "./now-section";
import { SkillsSection } from "./skills-section";
import { WorkSection } from "./work-section";

export function AboutPage() {
  return (
    <main className="dark min-h-screen overflow-hidden bg-[#030914] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(99,102,241,0.18),transparent_28%),radial-gradient(circle_at_78%_52%,rgba(14,165,233,0.12),transparent_26%)]" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-9">
        <TopNavigation active="About" />
        <AboutHero />
        <NowSection />
        <SkillsSection />
        <JourneySection />
        <WorkSection />
        <AboutCta />
      </div>
    </main>
  );
}
