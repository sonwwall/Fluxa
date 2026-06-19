import GithubSlugger from "github-slugger";

export type MarkdownHeading = {
  id: string;
  level: number;
  text: string;
  type: "heading";
};

export type MarkdownSegment =
  | {
      content: string;
      type: "markdown";
    }
  | {
      content: string;
      summary: string;
      type: "details";
    };

export function extractMarkdownHeadings(content: string): MarkdownHeading[] {
  const slugger = new GithubSlugger();
  const headings: MarkdownHeading[] = [];
  const lines = content.trim().replace(/\r\n/g, "\n").split("\n");
  let inCodeBlock = false;

  for (const line of lines) {
    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      continue;
    }

    if (inCodeBlock) {
      continue;
    }

    const match = /^(#{1,6})\s+(.+)$/.exec(line);
    if (!match) {
      continue;
    }

    const text = match[2].replace(/\s+#+\s*$/, "").trim();
    headings.push({
      id: slugger.slug(text),
      level: match[1].length,
      text,
      type: "heading",
    });
  }

  return headings;
}

export function splitMarkdownDetails(content: string): MarkdownSegment[] {
  const lines = content.replace(/\r\n/g, "\n").split("\n");
  const segments: MarkdownSegment[] = [];
  let markdownLines: string[] = [];
  let inCodeBlock = false;
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];

    if (line.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
    }

    if (!inCodeBlock && line.trim().toLowerCase() === "<details>") {
      const details = readDetailsBlock(lines, index);

      if (details) {
        pushMarkdownSegment(segments, markdownLines);
        markdownLines = [];
        segments.push(details.segment);
        index = details.nextIndex;
        continue;
      }
    }

    markdownLines.push(line);
    index += 1;
  }

  pushMarkdownSegment(segments, markdownLines);
  return segments;
}

export function getHeadingClass(level: number) {
  switch (level) {
    case 1:
      return "scroll-mt-24 !mb-4 !mt-8 pt-2 text-[calc(2rem*var(--article-font-scale,1))] font-semibold leading-tight text-white sm:text-[calc(2.5rem*var(--article-font-scale,1))]";
    case 2:
      return "scroll-mt-24 !mb-3 !mt-7 pt-3 text-[calc(1.625rem*var(--article-font-scale,1))] font-semibold leading-snug text-white sm:text-[calc(2rem*var(--article-font-scale,1))]";
    case 3:
      return "scroll-mt-24 !mb-3 !mt-6 pt-2 text-[calc(1.375rem*var(--article-font-scale,1))] font-semibold leading-snug text-white sm:text-[calc(1.625rem*var(--article-font-scale,1))]";
    case 4:
      return "scroll-mt-24 !mb-2 !mt-5 pt-1 text-[calc(1.125rem*var(--article-font-scale,1))] font-semibold leading-snug text-white sm:text-[calc(1.375rem*var(--article-font-scale,1))]";
    case 5:
      return "scroll-mt-24 !mb-2 !mt-4 text-[calc(1rem*var(--article-font-scale,1))] font-semibold leading-snug text-white/90 sm:text-[calc(1.125rem*var(--article-font-scale,1))]";
    default:
      return "scroll-mt-24 !mb-2 !mt-3 text-[calc(0.9375rem*var(--article-font-scale,1))] font-semibold leading-snug text-white/76 sm:text-[calc(1rem*var(--article-font-scale,1))]";
  }
}

function pushMarkdownSegment(segments: MarkdownSegment[], lines: string[]) {
  const content = lines.join("\n").trim();

  if (!content) {
    return;
  }

  segments.push({
    content,
    type: "markdown",
  });
}

function readDetailsBlock(lines: string[], startIndex: number) {
  const summaryLineIndex = startIndex + 1;
  const summaryMatch = /^<summary>(.*?)<\/summary>$/i.exec(lines[summaryLineIndex]?.trim() ?? "");

  if (!summaryMatch) {
    return null;
  }

  const bodyLines: string[] = [];
  let index = summaryLineIndex + 1;

  while (index < lines.length) {
    const line = lines[index];

    if (line.trim().toLowerCase() === "</details>") {
      return {
        nextIndex: index + 1,
        segment: {
          content: bodyLines.join("\n").trim(),
          summary: summaryMatch[1].trim(),
          type: "details" as const,
        },
      };
    }

    bodyLines.push(line);
    index += 1;
  }

  return null;
}
