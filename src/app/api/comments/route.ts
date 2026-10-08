import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { COMMENT_FIELDS, hashCommentPassword, validateComment } from "@/lib/comment-security";
import { protectMutation } from "@/lib/api-protection";

export async function GET(request: Request) {
  const slug = new URL(request.url).searchParams.get("slug");
  if (!slug || slug.length > 500) return NextResponse.json({ error: "글 주소가 필요합니다." }, { status: 400 });
  try {
    const { data, error } = await getServerSupabase().from("comments")
      .select(COMMENT_FIELDS).eq("post_slug", slug).neq("nickname", "__like__")
      .order("created_at", { ascending: false }).limit(200);
    if (error) throw error;
    return NextResponse.json(data?.reverse(), { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "댓글을 불러오지 못했습니다." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  let input;
  try { input = validateComment(await request.json()); }
  catch { return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 }); }
  if (!input) return NextResponse.json({ error: "닉네임 1~30자, 비밀번호 8자 이상(72바이트 이하), 댓글 1~3,000자로 입력해 주세요." }, { status: 400 });
  try {
    const blocked = await protectMutation(request, "comment-create", 5);
    if (blocked) return blocked;
    const { data, error } = await getServerSupabase().from("comments")
      .insert({ ...input, password: await hashCommentPassword(input.password) })
      .select(COMMENT_FIELDS).single();
    if (error) return NextResponse.json({ error: "댓글을 저장하지 못했습니다. 글 주소를 확인해 주세요." }, { status: 400 });
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({ error: "잠시 후 다시 시도해 주세요." }, { status: 503 });
  }
}
