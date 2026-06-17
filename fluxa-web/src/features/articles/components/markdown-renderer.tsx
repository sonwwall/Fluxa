import { codeToHtml } from "shiki";

type MarkdownRendererProps = {
  content: string;
};

type MarkdownBlock =
  | { level: number; text: string; type: "heading" }
  | { items: string[]; type: "list" }
  | { text: string; type: "paragraph" }
  | { text: string; type: "quote" }
  | { code: string; lang: string; type: "code" };

function parseMarkdown(content: string): MarkdownBlock[] {
  const lines = content.trim().split("\n");
  const blocks: MarkdownBlock[] = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index] ?? "";

    if (!line.trim()) continue;

    if (line.startsWith("```")) {
      const lang = line.replace("```", "").trim() || "text";
      const codeLines: string[] = [];
      index += 1;
      while (index < lines.length && !lines[index]?.startsWith("```")) {
        codeLines.push(lines[index] ?? "");
        index += 1;
      }
      blocks.push({ code: codeLines.join("\n"), lang, type: "code" });
      continue;
    }

    if (line.startsWith("#")) {
      const match = /^(#{1,4})\s+(.*)$/.exec(line);
      if (match) {
        blocks.push({
          level: match[1].length,
          text: match[2],
          type: "heading",
        });
      }
      continue;
    }

    if (line.startsWith(">")) {
      blocks.push({ text: line.replace(/^>\s?/, ""), type: "quote" });
      continue;
    }

    if (line.startsWith("- ")) {
      const items = [line.replace("- ", "")];
      while (lines[index + 1]?.startsWith("- ")) {
        index += 1;
        items.push((lines[index] ?? "").replace("- ", ""));
      }
      blocks.push({ items, type: "list" });
      continue;
    }

    blocks.push({ text: line, type: "paragraph" });
  }

  return blocks;
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}

export async function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const blocks = parseMarkdown(content);

  return (
    <article className="space-y-6 text-[15px] leading-7 text-white/72">
      {await Promise.all(
        blocks.map(async (block, index) => {
          if (block.type === "heading") {
            const className =
              block.level === 1
                ? "text-2xl font-semibold text-white"
                : block.level === 2
                  ? "pt-2 text-2xl font-semibold text-white"
                  : "text-xl font-semibold text-white";

            return (
              <h2 className={className} key={`${block.text}-${index}`}>
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
