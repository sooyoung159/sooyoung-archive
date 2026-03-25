import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  if (!slug) {
    return NextResponse.json({ error: "post_slug is required" }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("comments")
    .select("id, post_slug, nickname, content, user_id, created_at")
    .eq("post_slug", slug)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const { nickname, password, content, post_slug } = await request.json();

    if (!nickname || !password || !content || !post_slug) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("comments")
      .insert([{ nickname, password, content, post_slug }])
      .select("id, post_slug, nickname, content, user_id, created_at")
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
