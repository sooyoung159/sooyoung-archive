import { compare, hash } from "bcryptjs";

export const COMMENT_FIELDS = "id, post_slug, nickname, content, created_at";

export function validateComment(value: unknown) {
  if (!value || typeof value !== "object") return null;
  const input = value as Record<string, unknown>;
  if (!["nickname", "password", "content", "post_slug"].every((key) => typeof input[key] === "string")) return null;
  const nickname = (input.nickname as string).trim();
  const password = input.password as string;
  const content = (input.content as string).trim();
  const post_slug = (input.post_slug as string).trim();
  if (!nickname || nickname.length > 30 || nickname.startsWith("__")) return null;
  if (password.trim().length < 8 || Buffer.byteLength(password, "utf8") > 72) return null;
  if (!content || content.length > 3000 || !post_slug || post_slug.length > 500) return null;
  return { nickname, password, content, post_slug };
}

export function hashCommentPassword(password: string) { return hash(password, 12); }

export function verifyCommentPassword(password: string, storedHash: string) {
  // Unmigrated plaintext values must never be accepted.
  if (!/^\$2[aby]\$\d{2}\$/.test(storedHash) || Buffer.byteLength(password, "utf8") > 72) return Promise.resolve(false);
  return compare(password, storedHash);
}
