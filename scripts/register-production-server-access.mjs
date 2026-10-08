import { execFileSync } from "node:child_process";

const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!key) throw new Error("Load the local server-only configuration first");
execFileSync("npm", ["exec", "--yes", "--package=vercel", "--", "vercel", "env", "add", "SUPABASE_SERVICE_ROLE_KEY", "production", "--sensitive", "--yes"], {
  input: `${key}\n`, stdio: ["pipe", "inherit", "inherit"],
});
console.log("Registered a Production-only server secret through the official Vercel CLI.");
