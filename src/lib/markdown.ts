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
