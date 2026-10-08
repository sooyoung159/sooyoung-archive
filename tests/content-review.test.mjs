import test from "node:test";
import assert from "node:assert/strict";
import { removeInaccessibleSourceLinks } from "../scripts/lib/review-markdown.mjs";

test("local and private source links become identifiers without damaging public links", () => {
  const source = "[Feed](file:///Users/user/my-camp-log/src/app/%28main%29/feed/page.tsx#8-30) and [Nav](https://github.com/sooyoung159/my-camp-log/blob/main/src/app/(main)/nav.tsx), [Docs](https://nextjs.org/docs).";
  assert.equal(removeInaccessibleSourceLinks(source), "`Feed` and `Nav`, [Docs](https://nextjs.org/docs).");
  assert.equal(removeInaccessibleSourceLinks("```text\n[Feed](file:///example)\n```"), "```text\n[Feed](file:///example)\n```");
});
