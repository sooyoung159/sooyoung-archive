const IMAGE_URL_LINE =
  /^\s*(https?:\/\/\S+|\/\S+)\.(?:png|jpe?g|gif|webp|svg)(?:\?\S*)?\s*$/i;

export function normalizeMarkdownImages(markdown: string) {
  if (!markdown.trim()) return markdown;

  return markdown
    .split("\n")
    .map((line) => {
      const trimmed = line.trim();
      if (!trimmed) return line;
      if (!IMAGE_URL_LINE.test(trimmed)) return line;
      return `![](${trimmed})`;
    })
    .join("\n");
}

export function slugifyHeading(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[#*`_\[\]()]/g, "")
    .replace(/[^\w\s\uAC00-\uD7A3-]/g, "") // support Korean & alphanumeric
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function extractToc(markdown: string): TocItem[] {
  if (!markdown) return [];

  const lines = markdown.split("\n");
  const toc: TocItem[] = [];
  const counts: Record<string, number> = {};

  for (const line of lines) {
    const match = line.match(/^(#{2,3})\s+(.+)$/);
    if (!match) continue;

    const level = match[1].length;
    const rawText = match[2].trim();
    // remove markdown links or formatting from heading text
    const cleanText = rawText
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();

    let id = slugifyHeading(cleanText);
    if (!id) id = `heading-${toc.length + 1}`;

    if (counts[id]) {
      counts[id] += 1;
      id = `${id}-${counts[id]}`;
    } else {
      counts[id] = 1;
    }

    toc.push({
      id,
      text: cleanText,
      level,
    });
  }

  return toc;
}

export function calculateReadingTime(content: string): number {
  if (!content) return 1;
  const cleanLength = content.replace(/[#*`_\[\]()]/g, "").length;
  // Average Korean reading speed ~400-500 characters per minute
  return Math.max(1, Math.ceil(cleanLength / 450));
}
