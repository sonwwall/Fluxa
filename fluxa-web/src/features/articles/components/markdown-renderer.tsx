import { codeToHtml } from "shiki";
import { MarkdownAsync } from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { createMarkdownComponents } from "./markdown-components";

type MarkdownRendererProps = {
  content: string;
};

export async function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <article className="prose prose-invert max-w-none text-[15px] leading-7 prose-headings:tracking-normal prose-a:no-underline prose-pre:bg-transparent prose-pre:p-0">
      <MarkdownAsync
        components={createMarkdownComponents({
          async renderCodeBlock(code, lang) {
            const html = await codeToHtml(code, {
              lang,
              theme: "github-dark",
            });

            return (
              <div
                className="markdown-code-block overflow-hidden rounded-xl border border-sky-200/25 bg-[#151c2e] text-sm [&_pre]:!m-0 [&_pre]:!border-0 [&_pre]:!bg-transparent [&_pre]:!p-6 [&_pre]:overflow-x-auto"
                dangerouslySetInnerHTML={{ __html: html }}
              />
            );
          },
        })}
        rehypePlugins={[rehypeSanitize, rehypeSlug, rehypeKatex]}
        remarkPlugins={[remarkGfm, remarkMath]}
        skipHtml
      >
        {content}
      </MarkdownAsync>
    </article>
  );
}
