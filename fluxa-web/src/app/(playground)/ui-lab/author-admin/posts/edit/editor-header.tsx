"use client";

import { Input } from "@heroui/react";

export function EditorHeader() {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.035] p-5">
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-semibold">Edit Post</h1>
          <p className="mt-1 text-white/56">编辑并发布你的文章内容。</p>
        </div>
        <p className="text-sm text-white/46">
          Last saved 2 分钟前 <span className="text-emerald-300">●</span>
        </p>
      </div>
      <Input
        aria-label="Post title"
        defaultValue="构建一个现代化的 Go 微服务架构实践"
        className="text-xl"
      />
    </section>
  );
}
