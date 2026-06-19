"use client";

import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { createMarkdownComponents } from "./markdown-components";
import { splitMarkdownDetails, type MarkdownSegment } from "./markdown-renderer-core";

type MarkdownPreviewProps = {
  className?: string;
  content: string;
};

export function MarkdownPreview({ className, content }: MarkdownPreviewProps) {
  return (
    <article
      className={`prose prose-invert max-w-none prose-headings:tracking-normal prose-a:no-underline prose-pre:bg-transparent prose-pre:p-0 ${
        className ?? ""
      }`}
    >
      {splitMarkdownDetails(content).map((segment, index) => (
        <MarkdownPreviewSegment index={index} key={`${segment.type}-${index}`} segment={segment} />
      ))}
    </article>
  );
}

function MarkdownPreviewSegment({ index, segment }: { index: number; segment: MarkdownSegment }) {
  if (segment.type === "details") {
    return (
      <details className="not-prose my-6 rounded-xl border border-sky-200/20 bg-white/[0.035] p-5 text-white/78">
        <summary className="cursor-pointer select-none text-base font-semibold text-white">
          {segment.summary}
        </summary>
        <div className="prose prose-invert mt-4 max-w-none text-[calc(1rem*var(--article-font-scale,1))] leading-[calc(1.75rem*var(--article-font-scale,1))] prose-headings:tracking-normal prose-a:no-underline prose-pre:bg-transparent prose-pre:p-0">
          <MarkdownPreviewContent content={segment.content} />
        </div>
      </details>
    );
  }

  return <MarkdownPreviewContent content={segment.content} key={`markdown-${index}`} />;
}

function MarkdownPreviewContent({ content }: { content: string }) {
  return (
    <Markdown
      components={createMarkdownComponents()}
      rehypePlugins={[rehypeSanitize, rehypeSlug, rehypeKatex]}
      remarkPlugins={[remarkGfm, remarkMath]}
      skipHtml
    >
      {content}
    </Markdown>
  );
}
