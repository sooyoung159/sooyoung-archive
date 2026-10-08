import { createClient } from "@supabase/supabase-js";
import { readFileSync, writeFileSync } from "node:fs";

const path = process.argv[2];
if (!path || !process.env.SUPABASE_SERVICE_ROLE_KEY) throw new Error("Provide review file and server credentials");
const changes = JSON.parse(readFileSync(path, "utf8")).filter((change) =>
  !process.argv.includes("--text-only") || !change.body.includes("/images/mycamp/"));
const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } });
const receiptPath = "/private/tmp/sooyoung-content-review-receipts-20261008.json";
let receipts = [];
try { receipts = JSON.parse(readFileSync(receiptPath, "utf8")); } catch { /* First run. */ }
for (const { id, slug, previousBody, previousUpdatedAt, ...update } of changes) {
  const { data: current, error: readError } = await db.from("posts").select("body, updatedAt, title, excerpt").eq("id", id).single();
  if (readError) throw new Error(`Read failed: ${slug}`);
  if (Object.entries(update).every(([key, value]) => current[key] === value)) continue;
  if (current.body !== previousBody || current.updatedAt !== previousUpdatedAt) throw new Error(`Post changed since backup: ${slug}`);
  let query = db.from("posts").update({ ...update, updatedAt: new Date().toISOString() }).eq("id", id);
  query = previousUpdatedAt ? query.eq("updatedAt", previousUpdatedAt) : query.is("updatedAt", null);
  const { data, error } = await query.select("id, slug, updatedAt").single();
  if (error || !data) throw new Error(`Update failed: ${slug}: ${error?.message || "no row"}`);
  receipts.push(data);
  writeFileSync(receiptPath, JSON.stringify(receipts, null, 2), { mode: 0o600 });
  console.log(`Updated: ${slug}`);
}
