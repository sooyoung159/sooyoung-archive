import { NextResponse } from "next/server";
import { getServerAuthSession } from "@/auth";
import { isAdminSession } from "@/lib/auth";

export async function GET() {
  return NextResponse.json({ isAdmin: isAdminSession(await getServerAuthSession()) }, { headers: { "Cache-Control": "no-store" } });
}
