import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync, chmodSync } from "node:fs";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
if (!url) throw new Error("Load .env.local before running this script");
const project = new URL(url).hostname.split(".")[0];
const keys = JSON.parse(execFileSync("supabase", ["projects", "api-keys", "--project-ref", project, "-o", "json"], { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }));
const key = keys.find((item) => item.name === "service_role")?.api_key;
if (!key) throw new Error("Server key unavailable");
const path = ".env.local";
const lines = readFileSync(path, "utf8").split("\n").filter((line) => !line.startsWith("SUPABASE_SERVICE_ROLE_KEY="));
writeFileSync(path, `${lines.join("\n").trimEnd()}\nSUPABASE_SERVICE_ROLE_KEY=${key}\n`, { mode: 0o600 });
chmodSync(path, 0o600);
console.log("Server-only database configuration saved locally. No secret was printed.");
