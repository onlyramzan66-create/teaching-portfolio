const { spawn } = require("node:child_process");
const http = require("node:http");

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

// Ensure backend and frontend env are available during build (especially on CI/Hostinger).
loadEnvFile(path.join(process.cwd(), ".env.local"));
loadEnvFile(path.join(process.cwd(), ".env.local2"));
loadEnvFile(path.join(process.cwd(), "backend", ".env.backend"));
loadEnvFile(path.join(process.cwd(), "backend", ".env"));

if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "production";
}

const BACKEND_PORT = process.env.PORT || 5000;
const BACKEND_URL = `http://localhost:${BACKEND_PORT}/posts?limit=1`;
const STARTUP_TIMEOUT_MS = 120000;
const POLL_INTERVAL_MS = 1500;

function waitForBackend(url, timeoutMs) {
  return new Promise((resolve, reject) => {
    const start = Date.now();

    const tick = () => {
      const req = http.get(url, (res) => {
        res.resume();
        if (res.statusCode && res.statusCode >= 200 && res.statusCode < 500) {
          resolve();
          return;
        }
        retry();
      });

      req.on("error", retry);
    };

    const retry = () => {
      if (Date.now() - start > timeoutMs) {
        reject(new Error("Backend did not start in time"));
        return;
      }
      setTimeout(tick, POLL_INTERVAL_MS);
    };

    tick();
  });
}

async function run() {
  const backend = spawn("node", ["backend/dist/main.js"], {
    stdio: "inherit",
    env: process.env,
  });

  const cleanup = () => {
    if (!backend.killed) {
      backend.kill("SIGTERM");
    }
  };

  process.on("exit", cleanup);
  process.on("SIGINT", () => {
    cleanup();
    process.exit(1);
  });
  process.on("SIGTERM", () => {
    cleanup();
    process.exit(1);
  });

  try {
    await waitForBackend(BACKEND_URL, STARTUP_TIMEOUT_MS);
  } catch (error) {
    cleanup();
    throw error;
  }

  const nextBuild = spawn("npx", ["next", "build"], {
    stdio: "inherit",
    env: process.env,
  });

  const exitCode = await new Promise((resolve) => {
    nextBuild.on("exit", resolve);
  });

  cleanup();

  if (exitCode !== 0) {
    process.exit(exitCode ?? 1);
  }
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
