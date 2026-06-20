"use client";

import { Button, Input, Kbd } from "@heroui/react";
import Link from "next/link";

import { useI18n } from "@/features/i18n/i18n";

type NavLabel = "Home" | "Articles" | "Projects" | "About";
type NavKey = "about" | "articles" | "home" | "projects";

type TopNavigationProps = {
  active?: NavLabel;
};

const navItems: { href: string; key: NavKey; label: NavLabel; ready: boolean }[] = [
  { href: "/", key: "home", label: "Home", ready: true },
  { href: "/articles", key: "articles", label: "Articles", ready: true },
  { href: "#", key: "projects", label: "Projects", ready: false },
  { href: "/about", key: "about", label: "About", ready: true },
];

export function TopNavigation({ active = "Home" }: TopNavigationProps) {
  const { locale, t, toggleLocale } = useI18n();

  return (
    <header className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-md">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Link className="flex items-center gap-3" href="/">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[radial-gradient(circle_at_30%_20%,#78f0ff,#3977ff_45%,#7c4dff)] shadow-[0_0_28px_rgba(80,145,255,0.55)]">
            <span className="text-lg font-bold">F</span>
          </div>
          <span className="text-2xl font-semibold tracking-tight">Fluxa</span>
        </Link>

        <nav className="flex flex-wrap gap-2">
          {navItems.map((item) =>
            item.ready ? (
              <Link href={item.href} key={item.label}>
                <Button
                  className={
                    item.label === active
                      ? "bg-sky-400/15 text-sky-200"
                      : "text-white/70"
                  }
                  size="sm"
                  variant={item.label === active ? "secondary" : "ghost"}
                >
                  {t(item.key)}
                </Button>
              </Link>
            ) : (
              <Button
                className="text-white/32"
                isDisabled
                key={item.label}
                size="sm"
                variant="ghost"
              >
                {t(item.key)}
              </Button>
            ),
          )}
        </nav>

        <div className="flex items-center gap-3 lg:w-[360px]">
          <Input
            aria-label={t("search")}
            className="min-w-0 flex-1"
            disabled
            placeholder={t("search")}
          />
          <Kbd>⌘ K</Kbd>
          <button
            aria-label={t("language.toggle")}
            aria-pressed={locale === "zh"}
            className="group relative h-8 w-[86px] shrink-0 rounded-xl border border-white/18 bg-[#0d1224]/80 p-0.5 text-[10px] font-semibold leading-none text-white/48 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05),0_8px_24px_rgba(0,0,0,0.22)] outline-none transition-colors hover:border-white/28 hover:bg-[#111831]/90 focus-visible:ring-2 focus-visible:ring-sky-300/70"
            onClick={toggleLocale}
            type="button"
          >
            <span className="absolute left-1/2 top-1/2 h-[22px] w-px -translate-y-1/2 bg-white/10" />
            <span
              className={`absolute left-0.5 top-0.5 h-7 w-[41px] rounded-[10px] bg-[linear-gradient(135deg,#39b7ff_0%,#5268ff_48%,#b83dff_100%)] shadow-[0_0_18px_rgba(82,104,255,0.42),inset_0_1px_0_rgba(255,255,255,0.35)] transition-transform duration-200 ease-out motion-reduce:transition-none ${
                locale === "zh" ? "translate-x-0" : "translate-x-[41px]"
              }`}
            />
            <span className="relative grid h-full grid-cols-2 items-center">
              <span
                className={
                  locale === "zh"
                    ? "text-white"
                    : "text-white/42 transition-colors group-hover:text-white/58"
                }
              >
                cn
              </span>
              <span
                className={
                  locale === "en"
                    ? "text-white"
                    : "text-white/42 transition-colors group-hover:text-white/58"
                }
              >
                en
              </span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
