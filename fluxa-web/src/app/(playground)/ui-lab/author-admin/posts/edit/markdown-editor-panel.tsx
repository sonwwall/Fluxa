"use client";

import { Button, Card } from "@heroui/react";

import { editorMarkdown } from "./edit-data";

export function MarkdownEditorPanel() {
  return (
    <Card className="overflow-hidden border-white/10 bg-white/[0.035]">
      <div className="flex items-center gap-4 border-b border-white/10 px-5">
        <button className="border-b-2 border-violet-400 px-2 py-4 text-sm font-medium text-violet-300" type="button">
          Write
        </button>
        <button className="px-2 py-4 text-sm text-white/58" type="button">
          Preview
        </button>
      </div>
      <div className="flex flex-wrap items-center gap-1 border-b border-white/10 px-5 py-3 text-white/56">
        {["H1", "+", "H2", "H3", "|", "B", "I", "S", "|", "≡", "☷", "|", "❝", "</>", "⌁", "⌗", "▧", "▦", "|", "↶", "↷"].map((item, index) => (
          <Button
            aria-label={`Editor toolbar ${item}`}
            className={item === "|" ? "pointer-events-none text-white/16" : ""}
            isIconOnly
            key={`${item}-${index}`}
            size="sm"
            variant="ghost"
          >
            {item}
          </Button>
        ))}
        <Button className="ml-auto" size="sm" variant="ghost">…</Button>
      </div>
      <div className="min-h-[500px] p-5">
        <pre className="whitespace-pre-wrap font-sans text-[15px] leading-7 text-white/78">
          {editorMarkdown}
        </pre>
      </div>
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-3 text-sm text-white/52">
        <div className="flex flex-wrap gap-5">
          <span>字数: 1,248</span>
          <span>词数: 832</span>
          <span>预计阅读: 4 分钟</span>
          <span>Markdown</span>
        </div>
        <span>行数: 56 ?</span>
      </footer>
    </Card>
  );
}
