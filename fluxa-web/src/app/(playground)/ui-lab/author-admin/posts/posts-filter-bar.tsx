"use client";

import { Button, Card, Chip } from "@heroui/react";

const tabs = [["All", "42"], ["Published", "28"], ["Drafts", "8"], ["Scheduled", "3"], ["Archived", "3"]];

export function PostsFilterBar() {
  return (
    <Card className="border-white/10 bg-white/[0.035] p-4">
      <div className="flex flex-wrap gap-3">
        {tabs.map(([label, count], index) => (
          <Button
            className={index === 0 ? "bg-violet-500/20 text-violet-100" : "text-white/70"}
            key={label}
            size="sm"
            variant={index === 0 ? "secondary" : "ghost"}
          >
            {label}
            <Chip className="bg-white/[0.06] text-white/62" size="sm">{count}</Chip>
          </Button>
        ))}
      </div>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
        <div className="flex flex-wrap gap-3">
          {["All Categories", "All Tags", "All Authors"].map((label) => (
            <Button key={label} variant="secondary">{label}⌄</Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="secondary">Sort by: Updated (Newest)⌄</Button>
          <Button variant="secondary">▽ Filters</Button>
        </div>
      </div>
    </Card>
  );
}
