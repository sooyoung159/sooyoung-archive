import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import { isAdminSession } from "@/lib/auth";
import { updateCategory, deleteCategory } from "@/lib/categories";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!isAdminSession(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();
  
  const updated = await updateCategory(id, {
    name: body.name,
    slug: body.slug,
    parent_id: body.parent_id,
    order: body.order,
  });

  if (!updated) {
    return NextResponse.json({ error: "Not found or update failed" }, { status: 404 });
  }
  return NextResponse.json(updated);
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!isAdminSession(session)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const ok = await deleteCategory(id);
  
  if (!ok) return NextResponse.json({ error: "Not found or delete failed" }, { status: 404 });
  return NextResponse.json({ ok: true });
}
