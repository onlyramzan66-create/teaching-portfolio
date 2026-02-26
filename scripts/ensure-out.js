const fs = require("node:fs");
const path = require("node:path");

const outDir = path.join(process.cwd(), "out");

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

const indexPath = path.join(outDir, "index.html");
if (!fs.existsSync(indexPath)) {
  fs.writeFileSync(indexPath, "<!doctype html><title>GoharOnline</title>", "utf8");
}
