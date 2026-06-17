"use client";

import {
  getHeadingClass,
  parseMarkdown,
  renderInline,
} from "./markdown-renderer-core";

type MarkdownPreviewProps = {
  className?: string;
  content: string;
};

export function MarkdownPreview({ className, content }: MarkdownPreviewProps) {
  const blocks = parseMarkdown(content);

  return (
    <article className={className}>
      {blocks.map((block, index) => {
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
          return (
            <pre
              className="overflow-x-auto rounded-lg border border-white/10 bg-[#070d1d] p-5 text-sm text-white/78"
              key={`code-${index}`}
            >
              <code>{block.code}</code>
            </pre>
          );
        }

        return <p key={`${block.text}-${index}`}>{renderInline(block.text)}</p>;
      })}
    </article>
  );
}
