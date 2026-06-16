"use client";

import { Avatar, Button, Card, Input, Separator } from "@heroui/react";

import { activityItems } from "./blog-data";

export function ProfileSidebar() {
  return (
    <aside className="flex flex-col gap-5">
      <Card className="border-white/10 bg-white/[0.045] p-5 shadow-[0_20px_70px_rgba(0,0,0,0.32)]">
        <div className="flex items-center gap-4">
          <Avatar color="accent" size="lg">
            <Avatar.Fallback>AD</Avatar.Fallback>
          </Avatar>
          <div>
            <h2 className="text-lg font-semibold text-white">Arjun Dev</h2>
            <p className="text-sm text-white/45">@arjundev</p>
          </div>
        </div>
        <p className="mt-5 text-sm leading-6 text-white/58">
          Builder, learner, and occasional writer. I explore systems, developer
          tools, and the craft of shipping.
        </p>
        <p className="mt-4 text-sm text-white/45">Bengaluru, India</p>
        <Separator className="my-5" />
        <div className="grid grid-cols-3 text-center">
          <Metric label="Articles" value="42" />
          <Metric label="Projects" value="12" />
          <Metric label="Followers" value="5.3K" />
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.045] p-5">
        <h2 className="text-lg font-semibold text-white">Stay in the loop</h2>
        <p className="mt-2 text-sm leading-6 text-white/55">
          Get new articles, notes, and updates straight to your inbox.
        </p>
        <div className="mt-4 flex gap-2">
          <Input aria-label="Email address" placeholder="you@example.com" />
          <Button variant="primary">Subscribe</Button>
        </div>
        <p className="mt-3 text-xs text-white/35">No spam. Unsubscribe anytime.</p>
      </Card>

      <Card className="border-white/10 bg-white/[0.045] p-5">
        <h2 className="text-lg font-semibold text-white">Recent Activity</h2>
        <div className="mt-5 space-y-5">
          {activityItems.map((item) => (
            <div className="flex gap-3" key={item.title}>
              <span className={`mt-1 h-2.5 w-2.5 rounded-full ${item.color}`} />
              <div>
                <p className="text-sm text-white/72">{item.title}</p>
                <p className="mt-1 text-xs text-white/38">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
        <Button className="mt-5 w-fit" size="sm" variant="secondary">
          View all activity
        </Button>
      </Card>
    </aside>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xl font-semibold text-sky-300">{value}</p>
      <p className="mt-1 text-xs text-white/42">{label}</p>
    </div>
  );
}
