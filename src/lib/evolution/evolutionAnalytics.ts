/**
 * evolutionAnalytics.ts
 *
 * Tracks mutation impact, reward trends, cluster performance, stability
 * scores, and UI health metrics.  Designed as a lightweight, zero-dependency
 * in-memory analytics layer — swap the `flush()` method to send data to any
 * analytics backend (Segment, PostHog, custom API, etc.).
 */

import type { BehaviorCluster } from "./behaviorClustering";

/** A single analytics event in the evolution pipeline. */
export interface EvolutionEvent {
  kind:
    | "mutation_applied"
    | "mutation_reinforced"
    | "mutation_rolled_back"
    | "reward_sampled"
    | "cluster_assigned"
    | "stability_update"
    | "ui_health_check";
  payload: Record<string, unknown>;
  timestamp: number;
}

/** Aggregated stats for a named cluster. */
export interface ClusterStats {
  cluster: BehaviorCluster;
  sessions: number;
  avgReward: number;
  avgStability: number;
}

const eventLog: EvolutionEvent[] = [];
const clusterStats = new Map<BehaviorCluster, ClusterStats>();

// ---------------------------------------------------------------------------
// Event ingestion
// ---------------------------------------------------------------------------

function record(kind: EvolutionEvent["kind"], payload: Record<string, unknown>): void {
  eventLog.push({ kind, payload, timestamp: Date.now() });
}

/** Track that a mutation was applied. */
export function trackMutationApplied(mutationId: string, action: string): void {
  record("mutation_applied", { mutationId, action });
}

/** Track that a mutation was reinforced (reward improved). */
export function trackMutationReinforced(
  mutationId: string,
  deltaReward: number
): void {
  record("mutation_reinforced", { mutationId, deltaReward });
}

/** Track that a mutation was rolled back. */
export function trackMutationRolledBack(
  mutationId: string,
  deltaReward: number
): void {
  record("mutation_rolled_back", { mutationId, deltaReward });
}

/** Record a reward sample. */
export function trackRewardSample(
  mutationId: string | null,
  reward: number,
  cluster: BehaviorCluster
): void {
  record("reward_sampled", { mutationId, reward, cluster });
  updateClusterReward(cluster, reward);
}

/** Record a cluster assignment for a session. */
export function trackClusterAssigned(
  sessionId: string,
  cluster: BehaviorCluster
): void {
  record("cluster_assigned", { sessionId, cluster });
  ensureClusterStats(cluster);
  clusterStats.get(cluster)!.sessions += 1;
}

/** Record a stability score update. */
export function trackStabilityUpdate(score: number): void {
  record("stability_update", { score });
}

/** Record a UI health check result. */
export function trackUiHealthCheck(healthy: boolean, details?: string): void {
  record("ui_health_check", { healthy, details: details ?? "" });
}

// ---------------------------------------------------------------------------
// Cluster helpers
// ---------------------------------------------------------------------------

function ensureClusterStats(cluster: BehaviorCluster): void {
  if (!clusterStats.has(cluster)) {
    clusterStats.set(cluster, {
      cluster,
      sessions: 0,
      avgReward: 0,
      avgStability: 0,
    });
  }
}

function updateClusterReward(cluster: BehaviorCluster, reward: number): void {
  ensureClusterStats(cluster);
  const stats = clusterStats.get(cluster)!;
  // Running average (EMA with α = 0.3)
  stats.avgReward = stats.avgReward * 0.7 + reward * 0.3;
}

// ---------------------------------------------------------------------------
// Query API
// ---------------------------------------------------------------------------

/** Return all events (optionally filtered by kind). */
export function getEvents(
  kind?: EvolutionEvent["kind"]
): readonly EvolutionEvent[] {
  return kind ? eventLog.filter((e) => e.kind === kind) : eventLog;
}

/** Return all cluster performance stats. */
export function getClusterStats(): ClusterStats[] {
  return Array.from(clusterStats.values());
}

/**
 * Compute a rolling reward trend over the last `window` reward samples.
 * Returns an array of reward values, most recent last.
 */
export function getRewardTrend(window = 20): number[] {
  const samples = eventLog
    .filter((e) => e.kind === "reward_sampled")
    .slice(-window)
    .map((e) => e.payload.reward as number);
  return samples;
}

/**
 * Compute the overall UI health score (0-1):
 * ratio of healthy checks to total checks.
 */
export function getUiHealthScore(): number {
  const checks = eventLog.filter((e) => e.kind === "ui_health_check");
  if (checks.length === 0) return 1;
  const healthy = checks.filter((e) => e.payload.healthy === true).length;
  return healthy / checks.length;
}

// ---------------------------------------------------------------------------
// Flush / export
// ---------------------------------------------------------------------------

/**
 * Flush analytics to an external endpoint.
 * Replace the body with your own sink (PostHog, Segment, custom API).
 */
export async function flush(endpoint?: string): Promise<void> {
  if (!endpoint) return;
  try {
    await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ events: eventLog }),
    });
  } catch {
    // Silently fail – analytics must never break the product
  }
}

/** Clear the log (tests / page transitions). */
export function clearAnalytics(): void {
  eventLog.length = 0;
  clusterStats.clear();
}
