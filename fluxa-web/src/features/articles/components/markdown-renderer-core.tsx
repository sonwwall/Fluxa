import type { ReactNode } from "react";

export type MarkdownBlock =
  | { id: string; level: number; text: string; type: "heading" }
  | { items: string[]; type: "list" }
  | { text: string; type: "paragraph" }
  | { text: string; type: "quote" }
  | { code: string; lang: string; type: "code" };

export function parseMarkdown(content: string): MarkdownBlock[] {
  const lines = content.trim().split("\n");
  const blocks: MarkdownBlock[] = [];
  const headingIds = new Map<string, number>();

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
          id: getUniqueHeadingId(match[2], headingIds),
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

function getUniqueHeadingId(text: string, usedIds: Map<string, number>) {
  const baseId = slugifyHeading(text);
  const usedCount = usedIds.get(baseId) ?? 0;
  usedIds.set(baseId, usedCount + 1);

  return usedCount === 0 ? baseId : `${baseId}-${usedCount + 1}`;
}

export function slugifyHeading(text: string) {
  const slug = text
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");

  return slug || "section";
}

export function getHeadingClass(level: number) {
  return level === 1
    ? "scroll-mt-8 text-2xl font-semibold text-white"
    : level === 2
      ? "scroll-mt-8 pt-2 text-2xl font-semibold text-white"
      : "scroll-mt-8 text-xl font-semibold text-white";
}

export function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return <strong key={`${part}-${index}`}>{part.slice(2, -2)}</strong>;
    }

    return part;
  });
}
