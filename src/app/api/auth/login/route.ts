import { NextResponse } from "next/server";

// 간단한 단일 비밀번호 인증. 나중에 NextAuth 등으로 교체 가능
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";

export async function POST(request: Request) {
  const body = await request.json();
  const password = typeof body === "object" && body !== null && "password" in body ? (body as { password?: string }).password : undefined;
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }
  const res = NextResponse.json({ ok: true });
  res.cookies.set("admin", "true", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7, // 7일
    path: "/",
  });
  return res;
}
