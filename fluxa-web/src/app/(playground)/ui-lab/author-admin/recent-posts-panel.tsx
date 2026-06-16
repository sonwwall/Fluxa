"use client";

import { Button, Card, Chip } from "@heroui/react";
import Link from "next/link";

import { recentPosts } from "./admin-data";

export function RecentPostsPanel() {
  return (
    <Card className="overflow-hidden border-white/10 bg-white/[0.035] p-6">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Recent Posts</h2>
        <Link href="/ui-lab/author-admin/posts">
          <Button size="sm" variant="secondary">View all →</Button>
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="text-white/58">
            <tr className="border-b border-white/10">
              <th className="pb-4 font-medium">Title</th>
              <th className="pb-4 font-medium">Status</th>
              <th className="pb-4 font-medium">Category</th>
              <th className="pb-4 font-medium">Updated</th>
              <th className="pb-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentPosts.map(([title, subtitle, status, category, updated], index) => (
              <tr className="border-b border-white/8 last:border-0" key={title}>
                <td className="py-4">
                  <div className="flex items-center gap-4">
                    <div className={`h-12 w-16 rounded-md bg-[radial-gradient(circle_at_50%_40%,rgba(96,165,250,0.42),transparent_45%),linear-gradient(135deg,rgba(15,23,42,1),rgba(30,41,59,1))] ${index % 2 === 0 ? "shadow-[0_0_18px_rgba(96,165,250,0.16)]" : ""}`} />
                    <div>
                      <p className="font-medium text-white">{title}</p>
                      <p className="mt-1 text-white/46">{subtitle}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <Chip className={status === "Draft" ? "bg-amber-400/12 text-amber-200" : "bg-emerald-400/12 text-emerald-200"}>
                    {status}
                  </Chip>
                </td>
                <td>
                  <Chip className="bg-violet-400/12 text-violet-200">{category}</Chip>
                </td>
                <td className="text-white/72">{updated}</td>
                <td>
                  <div className="flex gap-2">
                    <Button aria-label="Edit post" isIconOnly size="sm" variant="secondary">✎</Button>
                    <Button aria-label="Preview post" isIconOnly size="sm" variant="secondary">◉</Button>
                    <Button aria-label="More actions" isIconOnly size="sm" variant="secondary">…</Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
