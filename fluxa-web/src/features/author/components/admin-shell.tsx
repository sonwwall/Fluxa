"use client";

import { Button, Input } from "@heroui/react";
import Link from "next/link";

import { useI18n } from "@/features/i18n/i18n";

type AdminShellProps = {
  active: "Articles" | "Dashboard";
  breadcrumb?: string[];
  children: React.ReactNode;
  searchPlaceholder?: string;
};

const sidebarItems = [
  { href: "/author", icon: "⌂", label: "Dashboard", ready: true },
  { href: "/author/articles", icon: "▣", label: "Articles", ready: true },
  { href: "#", icon: "▤", label: "Pages", ready: false },
  { href: "#", icon: "▧", label: "Media", ready: false },
  { href: "#", icon: "◇", label: "Comments", ready: false },
  { href: "#", icon: "♙", label: "Profile", ready: false },
  { href: "#", icon: "⚙", label: "Settings", ready: false },
] as const;

export function AdminShell({
  active,
  breadcrumb = ["Dashboard"],
  children,
  searchPlaceholder = "Search...",
}: AdminShellProps) {
  const { t } = useI18n();

  return (
    <main className="dark min-h-screen bg-[#040b18] text-white">
      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-72 shrink-0 border-r border-white/10 bg-[#060d1a] p-5 lg:block">
          <Link className="mb-8 flex items-center gap-3" href="/author">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-400/15 text-sky-100">
              F
            </div>
            <div>
              <p className="text-lg font-semibold">Fluxa</p>
              <p className="text-xs text-white/40">{t("author.studio")}</p>
            </div>
          </Link>
          <nav className="space-y-2">
            {sidebarItems.map((item) =>
              item.ready ? (
                <Link
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${
                    item.label === active
                      ? "bg-sky-400/12 text-sky-100"
                      : "text-white/58 hover:bg-white/[0.05] hover:text-white"
                  }`}
                  href={item.href}
                  key={item.label}
                >
                  <span>{item.icon}</span>
                  {translateAdminLabel(item.label, t)}
                </Link>
              ) : (
                <button
                  className="flex w-full cursor-not-allowed items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-white/26"
                  disabled
                  key={item.label}
                  type="button"
                >
                  <span>{item.icon}</span>
                  {translateAdminLabel(item.label, t)}
                </button>
              ),
            )}
          </nav>
        </aside>
        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-10 border-b border-white/10 bg-[#040b18]/86 px-4 py-4 backdrop-blur lg:px-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-white/36">
                  {breadcrumb.map((item) => translateAdminLabel(item, t)).join(" / ")}
                </p>
                <h1 className="mt-1 text-2xl font-semibold">
                  {translateAdminLabel(breadcrumb.at(-1) ?? "", t)}
                </h1>
              </div>
              <div className="flex min-w-0 items-center gap-3 md:w-[420px]">
                <Input
                  aria-label={translateAdminLabel(searchPlaceholder, t)}
                  className="min-w-0 flex-1"
                  disabled
                  placeholder={translateAdminLabel(searchPlaceholder, t)}
                />
                <Link href="/">
                  <Button size="sm" variant="secondary">
                    {t("viewSite")}
                  </Button>
                </Link>
              </div>
            </div>
          </header>
          {children}
        </section>
      </div>
    </main>
  );
}

function translateAdminLabel(label: string, t: ReturnType<typeof useI18n>["t"]) {
  const labels: Record<string, ReturnType<typeof useI18n>["t"] extends (key: infer K) => string ? K & string : never> = {
    Articles: "articles",
    Comments: "comments",
    Dashboard: "dashboard",
    "Edit Article": "editor.edit",
    Media: "media",
    "New Article": "editor.new",
    Pages: "pages",
    Profile: "profile",
    "Search...": "search.generic",
    "Search articles...": "search",
    Settings: "settings",
  };
  const key = labels[label];

  return key ? t(key) : label;
}
