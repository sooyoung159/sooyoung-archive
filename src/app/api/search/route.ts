import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q") || "";

    let supabaseQuery = supabase
      .from("posts")
      .select("id, title, slug, excerpt, createdAt, viewCount, category:categories(name)")
      .order("createdAt", { ascending: false });

    if (query.trim()) {
      supabaseQuery = supabaseQuery.or(
        `title.ilike.%${query.trim()}%,excerpt.ilike.%${query.trim()}%`
      );
    } else {
      supabaseQuery = supabaseQuery.limit(20);
    }

    const { data: posts, error } = await supabaseQuery;

    if (error) {
      console.error("Search API Error:", error);
      return NextResponse.json({ posts: [] }, { status: 500 });
    }

    return NextResponse.json({ posts: posts || [] });
  } catch (err) {
    console.error("Search API Exception:", err);
    return NextResponse.json({ posts: [] }, { status: 500 });
  }
}
