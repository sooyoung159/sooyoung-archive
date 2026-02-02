import type { Post } from "./types";
import { supabase } from "./supabase";

export async function getPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("createdAt", { ascending: false });

  if (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching posts:", error);
    return [];
  }

  return (data as Post[]) || [];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const normalized = normalizeSlug(slug);

  // 정확한 slug로 먼저 찾기
  const { data: direct, error: directError } = await supabase
    .from("posts")
    .select("*")
    .ilike("slug", normalized)
    .limit(1)
    .single();

  if (!directError && direct) {
    return direct as Post;
  }

  // 모든 포스트를 가져와서 정규화된 slug로 비교
  const posts = await getPosts();
  const legacy = posts.find(
    (p) => normalizeSlug(legacySlugify(p.title)) === normalized
  );
  if (legacy) return legacy;

  const byCurrent = posts.find(
    (p) => normalizeSlug(slugify(p.title)) === normalized
  );
  return byCurrent ?? null;
}

export async function createPost(
  post: Omit<Post, "id" | "createdAt" | "updatedAt">
): Promise<Post> {
  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const newPost: Post = {
    ...post,
    id,
    createdAt: now,
    updatedAt: now,
  };

  const { data, error } = await supabase
    .from("posts")
    .insert([newPost])
    .select()
    .single();

  if (error) {
    // eslint-disable-next-line no-console
    console.error("Error creating post:", error);
    throw new Error("Failed to create post");
  }

  return data as Post;
}

export async function updatePostBySlug(
  slug: string,
  update: Pick<Post, "title" | "slug" | "excerpt" | "thumbnail" | "body">
): Promise<Post | null> {
  const normalized = normalizeSlug(slug);
  const now = new Date().toISOString();

  // 정확한 slug로 찾기
  const { data: existing, error: findError } = await supabase
    .from("posts")
    .select("*")
    .ilike("slug", normalized)
    .limit(1)
    .single();

  if (findError || !existing) {
    // legacy slug로 찾기 시도
    const posts = await getPosts();
    const index = findPostIndexBySlug(posts, slug);
    if (index === -1) return null;

    const post = posts[index];
    const updatedPost: Post = {
      ...post,
      ...update,
      updatedAt: now,
    };

    const { data, error } = await supabase
      .from("posts")
      .update(updatedPost)
      .eq("id", post.id)
      .select()
      .single();

    if (error) {
      // eslint-disable-next-line no-console
      console.error("Error updating post:", error);
      return null;
    }

    return data as Post;
  }

  const updatedPost: Post = {
    ...(existing as Post),
    ...update,
    updatedAt: now,
  };

  const { data, error } = await supabase
    .from("posts")
    .update(updatedPost)
    .eq("id", existing.id)
    .select()
    .single();

  if (error) {
    // eslint-disable-next-line no-console
    console.error("Error updating post:", error);
    return null;
  }

  return data as Post;
}

export async function deletePostBySlug(slug: string): Promise<boolean> {
  const normalized = normalizeSlug(slug);

  // 정확한 slug로 찾기
  const { data: existing, error: findError } = await supabase
    .from("posts")
    .select("id")
    .ilike("slug", normalized)
    .limit(1)
    .single();

  if (findError || !existing) {
    // legacy slug로 찾기 시도
    const posts = await getPosts();
    const index = findPostIndexBySlug(posts, slug);
    if (index === -1) return false;

    const post = posts[index];
    const { error } = await supabase.from("posts").delete().eq("id", post.id);

    if (error) {
      // eslint-disable-next-line no-console
      console.error("Error deleting post:", error);
      return false;
    }

    return true;
  }

  const { error } = await supabase.from("posts").delete().eq("id", existing.id);

  if (error) {
    // eslint-disable-next-line no-console
    console.error("Error deleting post:", error);
    return false;
  }

  return true;
}

function slugify(text: string): string {
  return (
    text
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
      // 영문/숫자/한글/하이픈만 남기고 나머지는 제거
      .replace(/[^0-9a-z가-힣-]+/g, "")
  );
}

function legacySlugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w-가-힣]+/g, "");
}

function normalizeSlug(value: string): string {
  try {
    return decodeURIComponent(value).normalize("NFC").toLowerCase();
  } catch {
    return value.normalize("NFC").toLowerCase();
  }
}

function findPostIndexBySlug(posts: Post[], slug: string): number {
  const normalized = normalizeSlug(slug);
  const direct = posts.findIndex((p) => normalizeSlug(p.slug) === normalized);
  if (direct !== -1) return direct;

  const legacy = posts.findIndex(
    (p) => normalizeSlug(legacySlugify(p.title)) === normalized
  );
  if (legacy !== -1) return legacy;

  const byCurrent = posts.findIndex(
    (p) => normalizeSlug(slugify(p.title)) === normalized
  );
  return byCurrent;
}

export { slugify };
