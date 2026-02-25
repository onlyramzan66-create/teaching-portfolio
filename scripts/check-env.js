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
