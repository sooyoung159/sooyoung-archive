import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

test("public schema has no permissive insert/update/delete policies", () => {
  const schema = readFileSync("supabase-schema.sql", "utf8");
  assert.doesNotMatch(schema, /CREATE POLICY[\s\S]*?FOR\s+(INSERT|UPDATE|DELETE)/i);
  assert.match(schema, /REVOKE ALL ON comments FROM PUBLIC, anon, authenticated/);
});
test("production migration closes direct writes and locks private RPCs", () => {
  const sql = readFileSync("supabase/migrations/202610080001_secure_public_access.sql", "utf8");
  assert.match(sql, /^BEGIN;/);
  assert.match(sql, /COMMIT;/);
  assert.match(sql, /REVOKE ALL ON public.posts, public.categories, public.comments FROM PUBLIC, anon, authenticated/);
  assert.match(sql, /GRANT SELECT ON public.posts, public.categories TO anon, authenticated/);
  for (const name of ["consume_api_limit", "increment_post_views"]) {
    assert.match(sql, new RegExp(`REVOKE ALL ON FUNCTION public\\.${name}.*FROM PUBLIC, anon, authenticated`));
  }
  assert.match(sql, /extensions.crypt\(password, extensions.gen_salt\('bf', 12\)\)/);
});
test("server credentials cannot enter the public client", () => {
  const publicClient = readFileSync("src/lib/supabase.ts", "utf8");
  const serverClient = readFileSync("src/lib/supabase-server.ts", "utf8");
  assert.doesNotMatch(publicClient, /SERVICE_ROLE/);
  assert.match(serverClient, /import "server-only"/);
  assert.doesNotMatch(serverClient, /NEXT_PUBLIC_SUPABASE_SERVICE/);
  assert.match(readFileSync("src/app/api/auth/login/route.ts", "utf8"), /status: 410/);
  assert.doesNotMatch(readFileSync("src/app/api/auth/me/route.ts", "utf8"), /session === "true"/);
});

test("advertising is disabled unless explicitly enabled", () => {
  const loader = readFileSync("src/components/adsense-loader.tsx", "utf8");
  assert.match(loader, /if \(process.env.NEXT_PUBLIC_ADSENSE_ENABLED !== "true"\) return/);
  assert.ok(loader.indexOf("NEXT_PUBLIC_ADSENSE_ENABLED") < loader.indexOf("document.head.appendChild"));
});
