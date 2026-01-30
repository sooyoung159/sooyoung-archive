import type { Post } from "./types";

const DATA_PATH = "data/posts.json";

async function getDataPath(): Promise<string> {
  const path = await import("path");
  const { promises: fs } = await import("fs");
  const cwd = process.cwd();
  const dir = path.join(cwd, "data");
  try {
    await fs.mkdir(dir, { recursive: true });
  } catch {
    // ignore
  }
  return path.join(cwd, DATA_PATH);
}

export async function getPosts(): Promise<Post[]> {
  const path = await import("path");
  const { promises: fs } = await import("fs");
  const filePath = await getDataPath();
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const data = JSON.parse(raw) as Post[];
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export async function createPost(post: Omit<Post, "id" | "createdAt" | "updatedAt">): Promise<Post> {
  const { promises: fs } = await import("fs");
  const filePath = await getDataPath();
  const posts = await getPosts();
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const newPost: Post = {
    ...post,
    id,
    createdAt: now,
    updatedAt: now,
  };
  posts.unshift(newPost);
  await fs.writeFile(filePath, JSON.stringify(posts, null, 2), "utf-8");
  return newPost;
}

function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-가-힣]+/g, "");
}

export { slugify };
