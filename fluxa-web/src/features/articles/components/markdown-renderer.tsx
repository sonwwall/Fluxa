import { codeToHtml } from "shiki";

import {
  getHeadingClass,
  parseMarkdown,
  renderInline,
} from "./markdown-renderer-core";

type MarkdownRendererProps = {
  content: string;
};

export async function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const blocks = parseMarkdown(content);

  return (
    <article className="space-y-6 text-[15px] leading-7 text-white/72">
      {await Promise.all(
        blocks.map(async (block, index) => {
          if (block.type === "heading") {
            return (
              <h2 className={getHeadingClass(block.level)} key={`${block.text}-${index}`}>
                {block.text}
              </h2>
            );
          }

          if (block.type === "quote") {
            return (
              <blockquote
                className="rounded-r-lg border-l-4 border-sky-400 bg-sky-400/8 px-5 py-4 text-white/78"
                key={`${block.text}-${index}`}
              >
                {block.text}
              </blockquote>
            );
          }

          if (block.type === "list") {
            return (
              <ul className="list-disc space-y-1 pl-6" key={`list-${index}`}>
                {block.items.map((item) => (
                  <li key={item}>{renderInline(item)}</li>
                ))}
              </ul>
            );
          }

          if (block.type === "code") {
            const html = await codeToHtml(block.code, {
              lang: block.lang,
              theme: "github-dark",
            });

            return (
              <div
                className="overflow-hidden rounded-lg border border-white/10 bg-[#070d1d] text-sm [&_pre]:overflow-x-auto [&_pre]:p-5"
                dangerouslySetInnerHTML={{ __html: html }}
                key={`code-${index}`}
              />
            );
          }

          return <p key={`${block.text}-${index}`}>{renderInline(block.text)}</p>;
        }),
      )}
    </article>
  );
}
