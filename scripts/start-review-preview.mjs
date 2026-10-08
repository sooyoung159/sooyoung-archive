import { randomBytes } from "node:crypto";
import { spawn } from "node:child_process";

// An ephemeral local session secret does not change production credentials.
const port = process.argv[2] || "3108";
const child = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "--port", port], {
  env: { ...process.env, NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || randomBytes(32).toString("hex"), NEXTAUTH_URL: `http://localhost:${port}` },
  stdio: "inherit",
});
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => child.kill(signal));
child.on("exit", (code) => process.exit(code || 0));
