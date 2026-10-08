import { NextResponse } from "next/server";
import { getServerSupabase } from "@/lib/supabase-server";
import { verifyCommentPassword } from "@/lib/comment-security";
import { protectMutation } from "@/lib/api-protection";

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let password: unknown;
  try { ({ password } = await request.json()); }
  catch { return NextResponse.json({ error: "잘못된 요청입니다." }, { status: 400 }); }
  if (!/^[0-9a-f-]{36}$/i.test(id) || typeof password !== "string" || !password || Buffer.byteLength(password) > 72) {
    return NextResponse.json({ error: "댓글과 비밀번호를 확인해 주세요." }, { status: 400 });
  }
  try {
    const blocked = await protectMutation(request, "comment-delete", 10);
    if (blocked) return blocked;
    const db = getServerSupabase();
    const { data: comment, error } = await db.from("comments").select("password, nickname").eq("id", id).single();
    if (error || !comment || comment.nickname === "__like__") return NextResponse.json({ error: "댓글을 찾을 수 없습니다." }, { status: 404 });
    if (!await verifyCommentPassword(password, comment.password)) return NextResponse.json({ error: "비밀번호가 일치하지 않습니다." }, { status: 403 });
    const { error: deleteError } = await db.from("comments").delete().eq("id", id);
    if (deleteError) throw deleteError;
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "잠시 후 다시 시도해 주세요." }, { status: 503 });
  }
}
