"use client";

import { Button, Card, Input, TextArea } from "@heroui/react";

export function EditorSidePanel() {
  return (
    <aside className="flex flex-col gap-5">
      <Card className="border-white/10 bg-white/[0.035] p-5">
        <h2 className="mb-5 text-xl font-semibold">发布</h2>
        <div className="grid gap-4">
          {[
            ["状态", "已发布"],
            ["可见性", "公开"],
            ["发布时间", "May 20, 2026 14:32"],
            ["阅读时长", "4 分钟"],
          ].map(([label, value]) => (
            <div className="grid grid-cols-[90px_1fr] items-center gap-3" key={label}>
              <span className="text-sm text-white/58">{label}</span>
              <Button className="justify-between" variant="secondary">
                {value}
                <span>⌄</span>
              </Button>
            </div>
          ))}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <Button variant="secondary">保存草稿</Button>
            <Button variant="secondary">预览文章</Button>
          </div>
          <Button className="shadow-[0_0_28px_rgba(139,92,246,0.42)]" variant="primary">
            更新文章
          </Button>
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.035] p-5">
        <h2 className="mb-5 text-xl font-semibold">特色图片</h2>
        <div className="h-32 rounded-lg bg-[radial-gradient(circle_at_35%_45%,rgba(96,165,250,0.45),transparent_38%),linear-gradient(135deg,#111827,#312e81)]" />
        <div className="mt-4 flex gap-3">
          <Button variant="secondary">更换图片</Button>
          <Button aria-label="Remove featured image" isIconOnly variant="secondary">⌫</Button>
        </div>
      </Card>

      <Card className="border-white/10 bg-white/[0.035] p-5">
        <h2 className="mb-5 text-xl font-semibold">SEO 设置</h2>
        <label className="block">
          <span className="mb-2 block text-sm text-white/70">SEO 标题</span>
          <Input
            aria-label="SEO title"
            defaultValue="构建现代化 Go 微服务架构的完整指南"
          />
        </label>
        <label className="mt-4 block">
          <span className="mb-2 block text-sm text-white/70">Meta 描述</span>
          <TextArea
            aria-label="Meta description"
            defaultValue="从架构设计到落地实践，全面讲解如何使用 Go 构建高性能、可扩展的微服务系统。"
          />
        </label>
      </Card>

      <Card className="border-white/10 bg-white/[0.035] p-5">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">其他设置</h2>
          <span className="text-white/46">⌄</span>
        </div>
      </Card>
    </aside>
  );
}
