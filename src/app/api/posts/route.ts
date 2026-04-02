import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { isAdminSession } from "@/lib/auth";
import { getPosts, createPost, slugify } from "@/lib/posts";

export async function GET() {
  const posts = await getPosts();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const cookieStore = await cookies();
  const session = await getServerSession(authOptions);
  if (!isAdminSession(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json()) as {
    title: string;
    excerpt?: string;
    thumbnail?: string;
    body: string;
    category_id?: string | null;
  };
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
    category_id: body.category_id || null,
  });
  return NextResponse.json(post);
}
