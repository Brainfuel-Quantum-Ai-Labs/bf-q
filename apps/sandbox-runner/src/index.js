"use strict";

/**
 * Sandbox Runner service
 *
 * Exposes a minimal HTTP API that the worker calls to execute isolated jobs.
 * Each job runs inside THIS container only — no host Docker socket is needed.
 *
 * Endpoints:
 *   POST /run   { repo, branch, command }  → runs command after cloning repo
 *   GET  /health                           → liveness probe
 */

const express = require("express");
const rateLimit = require("express-rate-limit");
const { spawn } = require("child_process");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const os = require("os");

const app = express();
app.use(express.json({ limit: "1mb" }));

const PORT = parseInt(process.env.PORT || "8080", 10);

// ── Rate limiter ──────────────────────────────────────────────────────────────
// Limits each client IP to RATE_LIMIT_MAX /run requests per minute.
const runLimiter = rateLimit({
  windowMs: 60_000,
  max: parseInt(process.env.RATE_LIMIT_MAX || "20", 10),
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Rate limit exceeded — try again later." },
});

// Allowlist of safe commands that the sandbox may execute.
// Patterns are intentionally restrictive — extend carefully.
const ALLOWED_COMMANDS = [
  /^npm (install|ci|run [a-z][a-z0-9:_-]*)$/,
  /^npx prisma [a-z]+(:[a-z]+)?( --[a-z-]+(=[a-z0-9_-]+)?)*$/,
  /^node [a-z][a-z0-9./_ -]*$/,
  /^echo [a-z0-9 _-]+$/,
  /^ls( -[a-zA-Z]+)?( [./a-z0-9_-]+)?$/,
];

// Maximum output lengths returned to the caller (bytes / chars).
const STDOUT_MAX = 10_000;
const STDERR_MAX = 2_000;

function isCommandAllowed(cmd) {
  return ALLOWED_COMMANDS.some((re) => re.test(cmd.trim()));
}

// ── POST /run ─────────────────────────────────────────────────────────────────
app.post("/run", runLimiter, async (req, res) => {
  const { repo, branch = "main", command, jobId } = req.body || {};

  if (!command || typeof command !== "string") {
    return res.status(400).json({ error: "command is required" });
  }

  if (!isCommandAllowed(command)) {
    return res.status(400).json({ error: "command not allowed" });
  }

  // Create an isolated temp workspace for this job
  const workspaceId = crypto.randomBytes(8).toString("hex");
  const workspaceDir = path.join(os.tmpdir(), `sandbox-${workspaceId}`);
  fs.mkdirSync(workspaceDir, { recursive: true });

  try {
    // Clone repo if provided
    if (repo && typeof repo === "string" && repo.startsWith("https://")) {
      await runCommand(
        "git",
        ["clone", "--depth", "1", "--branch", branch, repo, workspaceDir],
        { cwd: os.tmpdir(), timeout: 60_000 }
      );
    }

    // Execute the requested command inside the workspace
    const [bin, ...args] = command.trim().split(/\s+/);
    const result = await runCommand(bin, args, {
      cwd: workspaceDir,
      timeout: 120_000,
      env: {
        ...buildSafeEnv(),
        HOME: workspaceDir,
        TMPDIR: workspaceDir,
      },
    });

    return res.json({
      jobId,
      exitCode: result.exitCode,
      stdout: result.stdout.slice(-STDOUT_MAX),
      stderr: result.stderr.slice(-STDERR_MAX),
    });
  } catch (err) {
    return res.status(500).json({
      jobId,
      error: err.message,
      exitCode: err.exitCode ?? 1,
      stdout: err.stdout ?? "",
      stderr: err.stderr ?? "",
    });
  } finally {
    // Clean up workspace
    fs.rmSync(workspaceDir, { recursive: true, force: true });
  }
});

// ── GET /health ───────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Run a command and collect stdout/stderr. Rejects on non-zero exit. */
function runCommand(bin, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(bin, args, {
      cwd: opts.cwd ?? os.tmpdir(),
      env: opts.env ?? buildSafeEnv(),
      timeout: opts.timeout ?? 60_000,
    });

    let stdout = "";
    let stderr = "";
    proc.stdout?.on("data", (d) => (stdout += d.toString()));
    proc.stderr?.on("data", (d) => (stderr += d.toString()));

    proc.on("close", (code) => {
      if (code === 0) {
        resolve({ exitCode: 0, stdout, stderr });
      } else {
        const err = new Error(`Process exited with code ${code}`);
        err.exitCode = code;
        err.stdout = stdout;
        err.stderr = stderr;
        reject(err);
      }
    });

    proc.on("error", (err) => {
      err.stdout = stdout;
      err.stderr = stderr;
      reject(err);
    });
  });
}

/** Build a minimal, safe environment for sandboxed processes. */
function buildSafeEnv() {
  return {
    PATH: "/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin",
    NODE_ENV: "production",
    npm_config_cache: "/tmp/.npm",
  };
}

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`[sandbox-runner] Listening on port ${PORT}`);
});

// ── Graceful shutdown ─────────────────────────────────────────────────────────
process.on("SIGTERM", () => {
  console.log("[sandbox-runner] Shutting down…");
  process.exit(0);
});
