"use client";

import Markdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { createMarkdownComponents } from "./markdown-components";

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
      <Markdown
        components={createMarkdownComponents()}
        rehypePlugins={[rehypeSanitize, rehypeSlug, rehypeKatex]}
        remarkPlugins={[remarkGfm, remarkMath]}
        skipHtml
      >
        {content}
      </Markdown>
    </article>
  );
}
