import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { protectMutation } from "@/lib/api-protection";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);

    const { count, error } = await getServerSupabase()
      .from("comments")
      .select("*", { count: "exact", head: true })
      .eq("post_slug", decodedSlug)
      .eq("nickname", "__like__");

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ count: count || 0 });
  } catch {
    return NextResponse.json({ error: "반응을 불러오지 못했습니다." }, { status: 503 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const blocked = await protectMutation(request, "post-like", 10);
    if (blocked) return blocked;
    const { slug } = await params;
    const decodedSlug = decodeURIComponent(slug);

    const supabase = getServerSupabase();
    const { error: insertError } = await supabase
      .from("comments")
      .insert([
        {
          post_slug: decodedSlug,
          nickname: "__like__",
          password: "__reaction__",
          content: "❤️",
        },
      ]);

    if (insertError) {
      return NextResponse.json({ error: insertError.message }, { status: 500 });
    }

    const { count } = await supabase
      .from("comments")
      .select("*", { count: "exact", head: true })
      .eq("post_slug", decodedSlug)
      .eq("nickname", "__like__");

    return NextResponse.json({ count: count || 1 });
  } catch {
    return NextResponse.json({ error: "반응을 저장하지 못했습니다." }, { status: 503 });
  }
}
