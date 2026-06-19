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
      return "scroll-mt-24 pt-3 text-4xl font-semibold leading-tight text-white sm:text-5xl";
    case 2:
      return "scroll-mt-24 pt-5 text-3xl font-semibold leading-snug text-white sm:text-4xl";
    case 3:
      return "scroll-mt-24 pt-4 text-2xl font-semibold leading-snug text-white sm:text-3xl";
    case 4:
      return "scroll-mt-24 pt-3 text-xl font-semibold leading-snug text-white sm:text-2xl";
    case 5:
      return "scroll-mt-24 pt-2 text-lg font-semibold leading-snug text-white/90 sm:text-xl";
    default:
      return "scroll-mt-24 pt-1 text-base font-semibold leading-snug text-white/76 sm:text-lg";
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
