const fs = require("node:fs");
const path = require("node:path");

function loadEnvFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  const raw = fs.readFileSync(filePath, "utf8");
  for (const line of raw.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIndex = trimmed.indexOf("=");
    if (eqIndex === -1) continue;
    const key = trimmed.slice(0, eqIndex).trim();
    let value = trimmed.slice(eqIndex + 1).trim();
    value = value.replace(/^['"]|['"]$/g, "");
    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

// Load frontend + backend env files if present.
loadEnvFile(path.join(process.cwd(), ".env.local"));
loadEnvFile(path.join(process.cwd(), ".env.local2"));
loadEnvFile(path.join(process.cwd(), "backend", ".env.backend"));
loadEnvFile(path.join(process.cwd(), "backend", ".env"));

const required = [
  "NEXT_PUBLIC_BACKEND_API_URL",
  "NEXT_PUBLIC_SITE_URL",
  "DB_HOST",
  "DB_NAME",
  "DB_USER",
  "DB_PASS",
  "DB_PORT",
  "JWT_SECRET",
];

const missing = required.filter((key) => !process.env[key] || !String(process.env[key]).trim());

if (missing.length > 0) {
  console.error("Missing required environment variables:");
  for (const key of missing) {
    console.error(`- ${key}`);
  }
  process.exit(1);
}

const dbUser = String(process.env.DB_USER || "").trim().toLowerCase();
if (!dbUser || dbUser === "root") {
  console.error("Invalid DB_USER. Do not use 'root' in production. Set Hostinger MySQL user.");
  process.exit(1);
}
