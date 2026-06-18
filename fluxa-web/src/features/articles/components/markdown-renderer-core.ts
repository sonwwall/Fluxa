import GithubSlugger from "github-slugger";

export type MarkdownHeading = {
  id: string;
  level: number;
  text: string;
  type: "heading";
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

export function getHeadingClass(level: number) {
  return level === 1
    ? "scroll-mt-8 text-2xl font-semibold text-white"
    : level === 2
      ? "scroll-mt-8 pt-2 text-2xl font-semibold text-white"
      : "scroll-mt-8 text-xl font-semibold text-white";
}
