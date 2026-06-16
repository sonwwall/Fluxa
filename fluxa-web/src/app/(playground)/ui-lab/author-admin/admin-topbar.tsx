"use client";

import { Button, Input, Kbd } from "@heroui/react";

type AdminTopbarProps = {
  breadcrumb?: string[];
  searchPlaceholder?: string;
};

export function AdminTopbar({
  breadcrumb = ["Dashboard"],
  searchPlaceholder = "Search...",
}: AdminTopbarProps) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 px-5 py-5 lg:px-8">
      <div className="flex items-center gap-3 text-white/78">
        <span>⌂</span>
        {breadcrumb.map((item, index) => (
          <span className="flex items-center gap-3" key={item}>
            {index > 0 ? <span className="text-white/30">›</span> : null}
            <span className="font-medium">{item}</span>
          </span>
        ))}
      </div>
      <div className="flex min-w-0 items-center gap-3">
        <Input
          aria-label="Search dashboard"
          className="hidden w-72 md:block"
          placeholder={searchPlaceholder}
        />
        <Kbd className="hidden md:inline-flex">⌘K</Kbd>
        <Button aria-label="Notifications" isIconOnly variant="ghost">
          ♢
        </Button>
        <div className="flex items-center gap-3 rounded-full bg-white/[0.04] px-3 py-2">
          <div className="grid h-9 w-9 place-items-center rounded-full bg-[linear-gradient(135deg,#818cf8,#111827)]">
            外
          </div>
          <span className="hidden text-sm font-medium sm:inline">外城</span>
        </div>
      </div>
    </header>
  );
}
