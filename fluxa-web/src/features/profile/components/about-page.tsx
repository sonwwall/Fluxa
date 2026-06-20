import Link from "next/link";
import type { ReactNode } from "react";

import { LocalizedText } from "@/features/i18n/i18n";
import { TopNavigation } from "@/features/articles/components/top-navigation";

import type { AuthorProfile, ProfileNowItem } from "../types";

type AboutPageProps = {
  profile: AuthorProfile;
};

const nowColors: Record<ProfileNowItem["color"], string> = {
  blue: "bg-blue-400",
  emerald: "bg-emerald-400",
  purple: "bg-purple-400",
  violet: "bg-violet-400",
};

export function AboutPage({ profile }: AboutPageProps) {
  return (
    <main className="dark min-h-screen overflow-hidden bg-[#030914] px-4 py-5 text-white sm:px-6 lg:px-8">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_72%_20%,rgba(99,102,241,0.18),transparent_28%),radial-gradient(circle_at_78%_52%,rgba(14,165,233,0.12),transparent_26%)]" />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-9">
        <TopNavigation active="About" />
        <AboutHero profile={profile} />
        <NowSection profile={profile} />
        <SkillsSection profile={profile} />
        <JourneySection profile={profile} />
        <PrinciplesSection profile={profile} />
      </div>
    </main>
  );
}

function AboutHero({ profile }: AboutPageProps) {
  return (
    <section className="grid min-h-[460px] items-end gap-8 rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(10,17,34,0.94),rgba(5,10,22,0.98))] p-6 shadow-[0_24px_90px_rgba(0,0,0,0.42)] lg:grid-cols-[minmax(0,1fr)_360px] lg:p-9">
      <div className="space-y-7">
        <span className="inline-flex rounded-full bg-sky-400/12 px-3 py-1 text-sm text-sky-100">
          <LocalizedText k="about.author" />
        </span>
        <div className="space-y-4">
          <h1 className="max-w-4xl text-5xl font-semibold leading-none tracking-tight sm:text-6xl lg:text-7xl">
            {profile.displayName}
          </h1>
          <p className="max-w-3xl text-lg leading-8 text-white/62">{profile.headline}</p>
        </div>
        <p className="max-w-2xl text-base leading-7 text-white/58">{profile.bio}</p>
        <div className="flex flex-wrap gap-3">
          {profile.links.map((link) => (
            <Link
              className="rounded-lg border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/72 transition hover:border-sky-300/30 hover:text-white"
              href={link.href}
              key={link.label}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="relative hidden min-h-80 lg:block">
        <div className="absolute inset-0 rounded-[32px] border border-sky-200/20 bg-[radial-gradient(circle_at_50%_20%,rgba(56,189,248,0.22),transparent_38%),linear-gradient(160deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))]" />
        <div className="absolute bottom-8 left-8 right-8 rounded-2xl border border-white/10 bg-black/24 p-5 backdrop-blur">
          <p className="text-sm text-white/42"><LocalizedText k="currentlyIn" /></p>
          <p className="mt-1 text-xl font-semibold">{profile.location}</p>
        </div>
      </div>
    </section>
  );
}

function NowSection({ profile }: AboutPageProps) {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {profile.now.map((item) => (
        <article
          className="rounded-xl border border-white/10 bg-white/[0.045] p-5 shadow-[0_18px_60px_rgba(0,0,0,0.24)]"
          key={item.title}
        >
          <div className={`mb-5 h-2.5 w-2.5 rounded-full ${nowColors[item.color]}`} />
          <p className="text-xs uppercase tracking-[0.18em] text-white/36">{item.status}</p>
          <h2 className="mt-3 text-xl font-semibold">{item.title}</h2>
          <p className="mt-3 text-sm leading-6 text-white/56">{item.text}</p>
        </article>
      ))}
    </section>
  );
}

function SkillsSection({ profile }: AboutPageProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
      <SectionTitle label={<LocalizedText k="skills" />} title={<LocalizedText k="skills.title" />} />
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {profile.skills.map((group) => (
          <div className="rounded-xl border border-white/10 bg-[#091120] p-5" key={group.group}>
            <h3 className="font-semibold text-sky-100">{group.group}</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((skill) => (
                <span className="rounded-full bg-white/[0.06] px-3 py-1 text-sm text-white/62" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function JourneySection({ profile }: AboutPageProps) {
  return (
    <section className="rounded-2xl border border-white/10 bg-white/[0.035] p-6">
      <SectionTitle label={<LocalizedText k="journey" />} title={<LocalizedText k="journey.title" />} />
      <div className="mt-6 space-y-4">
        {profile.journey.map((item) => (
          <article className="grid gap-3 rounded-xl border border-white/10 bg-[#08101f] p-5 md:grid-cols-[140px_1fr]" key={item.period}>
            <time className="text-sm font-medium text-sky-200">{item.period}</time>
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-white/56">{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PrinciplesSection({ profile }: AboutPageProps) {
  return (
    <section className="grid gap-4 pb-8 md:grid-cols-2 xl:grid-cols-4">
      {profile.principles.map((item) => (
        <article className="rounded-xl border border-white/10 bg-white/[0.04] p-5" key={item.title}>
          <h2 className="text-lg font-semibold">{item.title}</h2>
          <p className="mt-3 text-sm leading-6 text-white/56">{item.description}</p>
        </article>
      ))}
    </section>
  );
}

function SectionTitle({ label, title }: { label: ReactNode; title: ReactNode }) {
  return (
    <header>
      <p className="text-xs uppercase tracking-[0.18em] text-sky-200/72">{label}</p>
      <h2 className="mt-2 text-3xl font-semibold tracking-tight">{title}</h2>
    </header>
  );
}
