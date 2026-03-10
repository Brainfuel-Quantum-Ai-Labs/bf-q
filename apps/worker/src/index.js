"use strict";

/**
 * Worker service — processes sandbox jobs from a BullMQ Redis queue
 * and delegates execution to the sandbox-runner HTTP service.
 */

const { Worker, Queue } = require("bullmq");
const { Pool } = require("pg");

const REDIS_URL = process.env.REDIS_URL || "redis://redis:6379";
const SANDBOX_RUNNER_URL =
  process.env.SANDBOX_RUNNER_URL || "http://sandbox-runner:8080";
const DATABASE_URL = process.env.DATABASE_URL;
const QUEUE_NAME = process.env.QUEUE_NAME || "sandbox-jobs";
const PORT = parseInt(process.env.WORKER_PORT || "3001", 10);

// ── Redis connection config parsed from URL ───────────────────────────────────
function parseRedisUrl(url) {
  const parsed = new URL(url);
  return {
    host: parsed.hostname,
    port: parseInt(parsed.port || "6379", 10),
    ...(parsed.password ? { password: parsed.password } : {}),
  };
}

const redisConnection = parseRedisUrl(REDIS_URL);

// ── Postgres connection (optional — for job result persistence) ───────────────
const db = DATABASE_URL ? new Pool({ connectionString: DATABASE_URL }) : null;

// ── Sandbox job processor ─────────────────────────────────────────────────────
async function processSandboxJob(job) {
  const { repo, branch = "main", command } = job.data;

  console.log(`[worker] Processing job ${job.id}: repo=${repo} cmd=${command}`);

  const response = await fetch(`${SANDBOX_RUNNER_URL}/run`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ repo, branch, command, jobId: job.id }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`sandbox-runner responded ${response.status}: ${text}`);
  }

  const result = await response.json();
  console.log(`[worker] Job ${job.id} completed. exit=${result.exitCode}`);
  return result;
}

// ── BullMQ Worker ─────────────────────────────────────────────────────────────
const worker = new Worker(QUEUE_NAME, processSandboxJob, {
  connection: redisConnection,
  concurrency: parseInt(process.env.WORKER_CONCURRENCY || "2", 10),
});

worker.on("completed", (job) => {
  console.log(`[worker] Job ${job.id} succeeded`);
});

worker.on("failed", (job, err) => {
  console.error(`[worker] Job ${job?.id} failed:`, err.message);
});

// ── Health-check HTTP server ──────────────────────────────────────────────────
const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/health" && req.method === "GET") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "ok", queue: QUEUE_NAME }));
    return;
  }
  res.writeHead(404);
  res.end();
});

server.listen(PORT, () => {
  console.log(`[worker] Health endpoint listening on port ${PORT}`);
  console.log(`[worker] Consuming queue "${QUEUE_NAME}" from ${REDIS_URL}`);
});

// ── Graceful shutdown ─────────────────────────────────────────────────────────
async function shutdown() {
  console.log("[worker] Shutting down…");
  await worker.close();
  server.close();
  if (db) await db.end();
  process.exit(0);
}

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);
