import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { isAdminSession } from "@/lib/auth";
import { getCategories, createCategory } from "@/lib/categories";

export async function GET() {
  const categories = await getCategories();
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!isAdminSession(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  
  const body = (await request.json()) as {
    name: string;
    slug: string;
    parent_id?: string | null;
    order?: number;
  };
  
  if (!body.name?.trim() || !body.slug?.trim()) {
    return NextResponse.json(
      { error: "name and slug are required" },
      { status: 400 }
    );
  }
  
  const category = await createCategory({
    name: body.name.trim(),
    slug: body.slug.trim(),
    parent_id: body.parent_id || null,
    order: body.order || 0,
  });
  
  if (!category) {
    return NextResponse.json({ error: "Failed to create category" }, { status: 500 });
  }
  
  return NextResponse.json(category);
}
