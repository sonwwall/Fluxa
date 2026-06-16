"use client";

import { Button, Chip, Input, TextArea } from "@heroui/react";

import { editorTags } from "./edit-data";

export function PostMetaForm() {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.035] p-5">
      <div className="grid gap-5 lg:grid-cols-[1fr_180px_260px_300px]">
        <label className="block">
          <span className="mb-2 block text-sm text-white/70">Slug</span>
          <Input
            aria-label="Slug"
            defaultValue="go-microservice-architecture"
          />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-white/70">Category</span>
          <Input aria-label="Category" defaultValue="Go" />
        </label>
        <div>
          <p className="mb-2 text-sm text-white/70">Tags</p>
          <div className="flex min-h-10 flex-wrap items-center gap-2 rounded-lg border border-white/10 bg-white/[0.025] px-3 py-2">
            {editorTags.map((tag) => (
              <Chip className="bg-white/[0.06] text-white/74" key={tag}>
                {tag} ×
              </Chip>
            ))}
          </div>
        </div>
        <div>
          <p className="mb-2 text-sm text-white/70">Cover Image</p>
          <div className="flex items-center gap-3">
            <div className="h-12 w-24 rounded-md bg-[radial-gradient(circle_at_35%_45%,rgba(96,165,250,0.45),transparent_38%),linear-gradient(135deg,#111827,#312e81)]" />
            <Button variant="secondary">更换图片</Button>
            <Button aria-label="Remove cover image" isIconOnly variant="secondary">⌫</Button>
          </div>
        </div>
      </div>
      <label className="mt-5 block">
        <span className="mb-2 block text-sm text-white/70">Excerpt</span>
        <TextArea
          aria-label="Excerpt"
          defaultValue="本文将深入探讨如何使用 Go 语言构建一个高可用、可扩展的微服务架构，涵盖服务拆分、通信机制、配置管理、监控与链路追踪等关键实践。"
        />
      </label>
    </section>
  );
}
