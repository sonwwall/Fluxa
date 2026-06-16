"use client";

import { Button, Card, Chip } from "@heroui/react";

export function CommentsPanel() {
  return (
    <Card className="border-white/10 bg-white/[0.035] p-6">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold">Comments</h2>
        <Button size="sm" variant="secondary">View all →</Button>
      </div>
      <div className="flex gap-4">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/14">JD</div>
        <div className="min-w-0 flex-1">
          <p className="text-white/82">
            <span className="font-medium text-white">John Doe</span>{" "}
            on 构建一个现代化的 Go 微服务架构
          </p>
          <p className="mt-3 text-white/78">写得非常好！对于初学者来说非常有帮助 👍</p>
          <p className="mt-4 text-sm text-white/42">2 hours ago</p>
        </div>
        <Chip className="bg-emerald-400/12 text-emerald-200">Approved</Chip>
      </div>
    </Card>
  );
}
