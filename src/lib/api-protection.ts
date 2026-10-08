import "server-only";
import { createHmac } from "node:crypto";
import { NextResponse } from "next/server";
import { getServerSupabase } from "./supabase-server";

export async function protectMutation(request: Request, action: string, maxRequests: number, windowSeconds = 900) {
  const origin = request.headers.get("origin");
  const requestOrigin = new URL(request.url).origin;
  if (request.headers.get("sec-fetch-site") === "cross-site" ||
      (origin && origin !== requestOrigin && origin !== "https://sooyoung.pe.kr")) {
    return NextResponse.json({ error: "허용되지 않은 요청입니다." }, { status: 403 });
  }
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!key) return NextResponse.json({ error: "잠시 후 다시 시도해 주세요." }, { status: 503 });
  const forwarded = process.env.VERCEL ? request.headers.get("x-vercel-forwarded-for") : request.headers.get("x-forwarded-for");
  const address = forwarded?.split(",")[0].trim() || "unknown";
  const actionKey = createHmac("sha256", key).update(`${action}:${address}`).digest("hex");
  const { data, error } = await getServerSupabase().rpc("consume_api_limit", {
    action_key: actionKey, window_seconds: windowSeconds, max_requests: maxRequests,
  });
  if (error) return NextResponse.json({ error: "잠시 후 다시 시도해 주세요." }, { status: 503 });
  if (!data) return NextResponse.json({ error: "요청이 많습니다. 잠시 후 다시 시도해 주세요." }, {
    status: 429, headers: { "Retry-After": String(windowSeconds) },
  });
  return null;
}
