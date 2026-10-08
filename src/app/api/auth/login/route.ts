import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "GitHub 로그인을 이용해 주세요." }, { status: 410 });
}
