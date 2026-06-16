"use client";

import { Button, Card, Checkbox, Chip } from "@heroui/react";

import { postRows } from "../admin-data";

const statusClass: Record<string, string> = {
  Archived: "bg-white/[0.07] text-white/58",
  Draft: "bg-amber-400/12 text-amber-200",
  Published: "bg-emerald-400/12 text-emerald-200",
  Scheduled: "bg-blue-400/12 text-blue-200",
};

export function PostsTable() {
  return (
    <Card className="overflow-hidden border-white/10 bg-white/[0.035]">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <Checkbox aria-label="Select all posts" />
          <span className="text-sm text-white/50">0 selected</span>
          <Button variant="secondary">Bulk Edit</Button>
          <Button variant="secondary">Change Status⌄</Button>
          <Button variant="secondary">Add to Category⌄</Button>
          <Button className="text-red-300" variant="secondary">Delete</Button>
        </div>
        <Button variant="ghost">Clear</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[980px] text-left text-sm">
          <thead className="text-white/54">
            <tr className="border-b border-white/10">
              <th className="px-5 py-3 font-medium"><Checkbox aria-label="Select visible posts" /></th>
              <th className="py-3 font-medium">Post</th>
              <th className="py-3 font-medium">Status</th>
              <th className="py-3 font-medium">Category</th>
              <th className="py-3 font-medium">Tags</th>
              <th className="py-3 font-medium">Updated</th>
              <th className="py-3 font-medium">Views</th>
              <th className="py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {postRows.map(([title, subtitle, status, category, tags, date, time, views], index) => (
              <tr className="border-b border-white/[0.07] last:border-0" key={title}>
                <td className="px-5 py-4"><Checkbox aria-label={`Select ${title}`} /></td>
                <td className="py-4">
                  <div className="flex items-center gap-4">
                    <div className={`h-14 w-18 rounded-md bg-[radial-gradient(circle_at_50%_35%,rgba(96,165,250,0.42),transparent_45%),linear-gradient(135deg,#0f172a,#1e293b)] ${index % 3 === 1 ? "shadow-[0_0_18px_rgba(20,184,166,0.18)]" : ""}`} />
                    <div>
                      <p className="font-medium text-white">{title}</p>
                      <p className="mt-1 text-white/42">{subtitle}</p>
                    </div>
                  </div>
                </td>
                <td><Chip className={statusClass[status]}>{status}</Chip></td>
                <td><Chip className="bg-violet-400/12 text-violet-200">{category}</Chip></td>
                <td>
                  <div className="flex gap-2">
                    {tags.map((tag) => (
                      <Chip className="bg-white/[0.055] text-white/64" key={tag}>{tag}</Chip>
                    ))}
                    <Chip className="bg-white/[0.055] text-white/64">+1</Chip>
                  </div>
                </td>
                <td className="text-white/68">
                  <span className="block">{date}</span>
                  <span className="text-white/42">{time}</span>
                </td>
                <td className="text-white/74">{views}</td>
                <td>
                  <div className="flex gap-2">
                    {["◉", "✎", "▢", "…"].map((icon) => (
                      <Button aria-label={`${icon} action for ${title}`} isIconOnly key={icon} size="sm" variant="secondary">
                        {icon}
                      </Button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 p-4">
        <p className="text-white/68">Total 42 posts</p>
        <div className="flex gap-2">
          {["‹", "1", "2", "3", "…", "6", "›", "10 / page⌄"].map((item, index) => (
            <Button className={item === "1" ? "bg-violet-500/22 text-violet-100" : ""} key={`${item}-${index}`} size="sm" variant="secondary">
              {item}
            </Button>
          ))}
        </div>
      </div>
    </Card>
  );
}
