import test from "node:test";
import assert from "node:assert/strict";
import { COMMENT_FIELDS, hashCommentPassword, validateComment, verifyCommentPassword } from "../src/lib/comment-security.ts";

const input = { nickname: "tester", password: "testing-secret", content: "test comment", post_slug: "first-meeting" };
test("comment validation rejects reserved names, invalid types and oversized input", () => {
  assert.ok(validateComment(input));
  for (const value of [null, {}, { ...input, nickname: "__like__" }, { ...input, password: "short" }, { ...input, password: "        " }, { ...input, password: "가".repeat(25) }, { ...input, content: "x".repeat(3001) }, { ...input, post_slug: 123 }]) assert.equal(validateComment(value), null);
  assert.equal(COMMENT_FIELDS.includes("password"), false);
});
test("hashes are salted and verify without accepting plaintext", async () => {
  const first = await hashCommentPassword(input.password);
  const second = await hashCommentPassword(input.password);
  assert.notEqual(first, input.password);
  assert.notEqual(first, second);
  assert.equal(await verifyCommentPassword(input.password, first), true);
  assert.equal(await verifyCommentPassword("wrong-secret", first), false);
  assert.equal(await verifyCommentPassword(input.password, input.password), false);
  assert.equal(await verifyCommentPassword("x".repeat(73), first), false);
  const postgresHash = first.replace(/^\$2b\$/, "$2a$");
  assert.equal(await verifyCommentPassword(input.password, postgresHash), true);
});
