import { codeToHtml } from "shiki";
import { MarkdownAsync } from "react-markdown";
import rehypeKatex from "rehype-katex";
import rehypeSanitize from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { MarkdownCodeBlock } from "./markdown-code-block";
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

            return <MarkdownCodeBlock code={code} html={html} />;
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
