import { NextResponse } from "next/server";
import { incrementViewCount } from "@/lib/posts";
import { protectMutation } from "@/lib/api-protection";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const blocked = await protectMutation(request, `post-view:${slug}`, 1, 1800);
  if (blocked) return blocked;
  const viewCount = await incrementViewCount(slug);
  if (viewCount === null) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ viewCount });
}
