import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    
    // next 15+ has issues with request.json() if body is empty, but we expect password
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }
    
    const { password } = body;

    if (!password) {
      return NextResponse.json({ error: "Password is required" }, { status: 400 });
    }

    // 작성자가 입력한 비밀번호가 맞는지 파악
    const { data: comment, error: fetchError } = await supabase
      .from("comments")
      .select("password")
      .eq("id", id)
      .single();

    if (fetchError || !comment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    if (comment.password !== password) {
      return NextResponse.json({ error: "비밀번호가 일치하지 않습니다." }, { status: 403 });
    }

    // 삭제 실행
    const { error: deleteError } = await supabase
      .from("comments")
      .delete()
      .eq("id", id);

    if (deleteError) {
      return NextResponse.json({ error: deleteError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
