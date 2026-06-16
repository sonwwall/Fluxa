"use client";

import { Button, Input, Kbd } from "@heroui/react";
import Link from "next/link";

import { type BlogNavItem, navItems } from "./blog-data";

type TopNavigationProps = {
  active?: BlogNavItem["label"];
};

export function TopNavigation({ active = "Home" }: TopNavigationProps) {
  return (
    <header className="rounded-2xl border border-white/10 bg-white/[0.035] px-4 py-3 shadow-[0_18px_60px_rgba(0,0,0,0.35)] backdrop-blur-md">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-[radial-gradient(circle_at_30%_20%,#78f0ff,#3977ff_45%,#7c4dff)] shadow-[0_0_28px_rgba(80,145,255,0.55)]">
            <span className="text-lg font-bold">F</span>
          </div>
          <span className="text-2xl font-semibold tracking-tight">Fluxa</span>
        </div>

        <nav className="flex flex-wrap gap-2">
          {navItems.map((item) => (
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
                {item.label}
              </Button>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3 lg:w-[360px]">
          <Input
            aria-label="Search articles"
            className="min-w-0 flex-1"
            placeholder="Search articles..."
          />
          <Kbd>⌘ K</Kbd>
          <Button aria-label="Theme settings" isIconOnly variant="secondary">
            ◌
          </Button>
        </div>
      </div>
    </header>
  );
}
