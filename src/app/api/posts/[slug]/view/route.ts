import { NextResponse } from "next/server";
import { incrementViewCount } from "@/lib/posts";

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const viewCount = await incrementViewCount(slug);
  if (viewCount === null) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ viewCount });
}
