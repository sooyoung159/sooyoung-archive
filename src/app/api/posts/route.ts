import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getPosts, createPost, slugify } from "@/lib/posts";

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin")?.value;
  if (!session || session !== "true") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as { title: string; excerpt?: string; thumbnail?: string; body: string };
  if (!body.title?.trim() || !body.body?.trim()) {
    return NextResponse.json(
      { error: "title and body are required" },
      { status: 400 }
    );
  }
  const slug = slugify(body.title) || `post-${Date.now()}`;
  const post = await createPost({
    title: body.title.trim(),
    slug,
    excerpt: body.excerpt?.trim(),
    thumbnail: body.thumbnail?.trim() || undefined,
    body: body.body.trim(),
  });
  return NextResponse.json(post);
}
