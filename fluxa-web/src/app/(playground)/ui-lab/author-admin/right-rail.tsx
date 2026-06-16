"use client";

import { Button, Card } from "@heroui/react";

import { chartPoints, mediaItems, quickActions } from "./admin-data";

export function RightRail() {
  const points = chartPoints
    .map((value, index) => {
      const x = (index / (chartPoints.length - 1)) * 100;
      const y = 100 - (value / 1700) * 100;
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <aside className="flex flex-col gap-5">
      <Card className="border-white/10 bg-white/[0.035] p-5">
        <h2 className="mb-5 flex items-center gap-3 text-xl font-semibold">
          <span className="text-violet-300">ϟ</span>
          Quick Actions
        </h2>
        <div className="grid gap-3">
          {quickActions.map(([icon, label, color]) => (
            <Button className="justify-start" key={label} variant="secondary">
              <span className={color}>{icon}</span>
              {label}
            </Button>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.035] p-5">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Site Overview</h2>
          <Button size="sm" variant="secondary">Last 7 days</Button>
        </div>
        <div className="h-40 rounded-lg bg-white/[0.025] p-3">
          <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="admin-chart" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.55" />
                <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
              </linearGradient>
            </defs>
            <polyline fill="none" points={points} stroke="#a78bfa" strokeWidth="2" />
            <polygon fill="url(#admin-chart)" points={`0,100 ${points} 100,100`} />
          </svg>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-4 border-t border-white/10 pt-4">
          {[
            ["Visitors", "8.2K", "↑ 12.5%"],
            ["Page Views", "12.5K", "↑ 18.6%"],
            ["Avg. Time", "3m 24s", "↑ 8.3%"],
          ].map(([label, value, delta]) => (
            <div key={label}>
              <p className="text-xs text-white/46">{label}</p>
              <p className="mt-2 text-xl font-semibold">{value}</p>
              <p className="mt-1 text-xs text-emerald-300">{delta}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.035] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Media Storage</h2>
          <Button size="sm" variant="ghost">View all</Button>
        </div>
        <div className="flex items-center justify-between text-sm text-white/64">
          <span>2.4 GB / 10 GB used</span>
          <span>24%</span>
        </div>
        <div className="mt-3 h-2 rounded-full bg-white/10">
          <div className="h-full w-[24%] rounded-full bg-violet-500" />
        </div>
        <div className="mt-5 grid grid-cols-5 gap-2">
          {mediaItems.map((item) => (
            <div className={`h-14 rounded-md ${item}`} key={item} />
          ))}
          <div className="grid h-14 place-items-center rounded-md bg-white/[0.06] text-white/70">+24</div>
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.035] p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Recent Drafts</h2>
          <Button size="sm" variant="ghost">View all</Button>
        </div>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-medium">AI 时代的编程学习</p>
            <p className="mt-1 text-sm text-white/46">Last edited: May 20, 2026</p>
          </div>
          <div className="flex gap-2">
            <Button aria-label="Edit draft" isIconOnly size="sm" variant="secondary">✎</Button>
            <Button aria-label="More draft actions" isIconOnly size="sm" variant="secondary">…</Button>
          </div>
        </div>
      </Card>
    </aside>
  );
}
