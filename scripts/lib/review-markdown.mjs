import { unified } from "unified";
import remarkParse from "remark-parse";

export function removeInaccessibleSourceLinks(markdown) {
  const edits = [];
  const text = (node) => node.value || (node.children || []).map(text).join("");
  function visit(node) {
    // The MyCamp repository is private; source identifiers remain useful without a dead link.
    if (node.type === "link" && (node.url.startsWith("file://") || node.url.startsWith("https://github.com/sooyoung159/my-camp-log/"))) {
      const label = text(node).replaceAll("`", "");
      edits.push({ start: node.position.start.offset, end: node.position.end.offset, value: `\`${label}\`` });
    } else for (const child of node.children || []) visit(child);
  }
  visit(unified().use(remarkParse).parse(markdown));
  for (const edit of edits.sort((a, b) => b.start - a.start)) markdown = markdown.slice(0, edit.start) + edit.value + markdown.slice(edit.end);
  return markdown;
}
