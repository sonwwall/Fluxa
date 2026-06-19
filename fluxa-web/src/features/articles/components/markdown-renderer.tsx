import { codeToHtml } from "shiki";
import { MarkdownAsync } from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { MarkdownCodeBlock } from "./markdown-code-block";
import { createMarkdownComponents } from "./markdown-components";
import { splitMarkdownDetails, type MarkdownSegment } from "./markdown-renderer-core";

type MarkdownRendererProps = {
  content: string;
};

export async function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="prose prose-invert max-w-none text-[calc(15px*var(--article-font-scale,1))] leading-[calc(1.75rem*var(--article-font-scale,1))] prose-headings:tracking-normal prose-a:no-underline prose-pre:bg-transparent prose-pre:p-0">
      {splitMarkdownDetails(content).map((segment, index) => (
        <MarkdownSegmentRenderer index={index} key={`${segment.type}-${index}`} segment={segment} />
      ))}
    </article>
  );
}

function MarkdownSegmentRenderer({ index, segment }: { index: number; segment: MarkdownSegment }) {
  if (segment.type === "details") {
    return (
      <details className="not-prose my-6 rounded-xl border border-sky-200/20 bg-white/[0.035] p-5 text-white/78">
        <summary className="cursor-pointer select-none text-base font-semibold text-white">
          {segment.summary}
        </summary>
        <div className="prose prose-invert mt-4 max-w-none text-[calc(15px*var(--article-font-scale,1))] leading-[calc(1.75rem*var(--article-font-scale,1))] prose-headings:tracking-normal prose-a:no-underline prose-pre:bg-transparent prose-pre:p-0">
          <MarkdownContent content={segment.content} />
        </div>
      </details>
    );
  }

  return <MarkdownContent content={segment.content} key={`markdown-${index}`} />;
}

function MarkdownContent({ content }: { content: string }) {
  return (
    <MarkdownAsync
      components={createMarkdownComponents({
        async renderCodeBlock(code, lang) {
          const html = await codeToHtml(code, {
            lang,
            theme: "github-dark",
          });

          return <MarkdownCodeBlock code={code} html={html} />;
        },
      })}
      rehypePlugins={[rehypeSanitize, rehypeSlug, rehypeKatex]}
      remarkPlugins={[remarkGfm, remarkMath]}
      skipHtml
    >
      {content}
    </MarkdownAsync>
  );
}
