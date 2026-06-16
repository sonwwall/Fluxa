"use client";

import { Button, Card } from "@heroui/react";
import Link from "next/link";

export function PostsHeader() {
  return (
    <Card className="border-white/10 bg-white/[0.035] p-5">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="grid h-14 w-14 place-items-center rounded-xl bg-violet-500/22 text-2xl text-violet-200">
            ▣
          </div>
          <div>
            <h1 className="text-3xl font-semibold">Posts</h1>
            <p className="mt-1 text-white/58">Manage and organize your blog posts.</p>
          </div>
        </div>
        <Link href="/ui-lab/author-admin/posts/edit">
          <Button className="shadow-[0_0_28px_rgba(139,92,246,0.42)]" variant="primary">
            + New Post
          </Button>
        </Link>
      </div>
    </Card>
  );
}
