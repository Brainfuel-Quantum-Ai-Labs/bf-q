/**
 * multiUserAggregator.ts
 *
 * Collects and aggregates anonymised per-user behavioural metrics across
 * multiple sessions.  All data is keyed by a random session-scoped token –
 * no PII is stored.
 */

/** Raw event emitted by the page-level instrumentation layer. */
export interface BehaviorEvent {
  type:
    | "click"
    | "scroll"
    | "session_end"
    | "conversion"
    | "feature_use"
    | "navigation"
    | "drop_off";
  /** Path / component name where the event happened */
  target?: string;
  /** Optional numeric payload (e.g. scroll depth 0-1, time-on-page ms) */
  value?: number;
  timestamp: number;
}

/** Aggregated metrics for a single anonymous session. */
export interface SessionMetrics {
  sessionId: string;
  /** Click-through rate: clicks / impressions (0-1) */
  ctr: number;
  /** Raw click count — used for CTR computation */
  clickCount: number;
  /** Raw impression count — incremented by `trackImpression()` */
  impressionCount: number;
  /** Scroll completion rate (0-1) */
  scrollCompletion: number;
  /** Total session duration in milliseconds */
  sessionDuration: number;
  /** Whether the user bounced (left without interaction) */
  bounced: boolean;
  /** Conversion completion (0-1) */
  conversionRate: number;
  /** Feature-usage frequency: total hits per elapsed minute */
  featureUsageFreq: number;
  /** Raw feature-use count — used for frequency computation */
  featureUseCount: number;
  /** Navigation efficiency: goal reached / total steps (0-1) */
  navigationEfficiency: number;
  /** Drop-off targets with their occurrence counts */
  dropOffZones: Record<string, number>;
  /** Average time-to-action in milliseconds */
  timeToAction: number;
  startedAt: number;
  updatedAt: number;
}

/** Lightweight in-memory store. Replace with IndexedDB / remote sink in prod. */
const sessionStore = new Map<string, SessionMetrics>();

function emptyMetrics(sessionId: string): SessionMetrics {
  return {
    sessionId,
    ctr: 0,
    clickCount: 0,
    impressionCount: 0,
    scrollCompletion: 0,
    sessionDuration: 0,
    bounced: true,
    conversionRate: 0,
    featureUsageFreq: 0,
    featureUseCount: 0,
    navigationEfficiency: 0,
    dropOffZones: {},
    timeToAction: 0,
    startedAt: Date.now(),
    updatedAt: Date.now(),
  };
}

/**
 * Record an impression (page view / component render) for a session.
 * Call this once per meaningful page-level render to keep CTR accurate.
 */
export function trackImpression(sessionId: string): void {
  if (!sessionStore.has(sessionId)) {
    sessionStore.set(sessionId, emptyMetrics(sessionId));
  }
  const m = sessionStore.get(sessionId)!;
  m.impressionCount += 1;
  m.ctr = m.clickCount / m.impressionCount;
}

/** Ingest a single behavioural event and update the session snapshot. */
export function ingestEvent(sessionId: string, event: BehaviorEvent): void {
  if (!sessionStore.has(sessionId)) {
    sessionStore.set(sessionId, emptyMetrics(sessionId));
  }
  const m = sessionStore.get(sessionId)!;
  const now = Date.now();

  switch (event.type) {
    case "click":
      m.clickCount += 1;
      m.ctr = m.impressionCount > 0 ? m.clickCount / m.impressionCount : 0;
      m.bounced = false;
      if (m.timeToAction === 0) m.timeToAction = now - m.startedAt;
      break;

    case "scroll":
      if (event.value !== undefined) {
        m.scrollCompletion = Math.max(m.scrollCompletion, event.value);
      }
      m.bounced = false;
      break;

    case "session_end":
      m.sessionDuration = now - m.startedAt;
      break;

    case "conversion":
      m.conversionRate = event.value ?? 1;
      m.bounced = false;
      break;

    case "feature_use": {
      m.featureUseCount += 1;
      const elapsedMin = (now - m.startedAt) / 60_000 || 1;
      m.featureUsageFreq = m.featureUseCount / elapsedMin;
      m.bounced = false;
      break;
    }

    case "navigation":
      if (event.value !== undefined) {
        // event.value = 1 if efficient path, 0 if suboptimal
        m.navigationEfficiency =
          (m.navigationEfficiency + event.value) / 2;
      }
      m.bounced = false;
      break;

    case "drop_off":
      if (event.target) {
        m.dropOffZones[event.target] =
          (m.dropOffZones[event.target] ?? 0) + 1;
      }
      break;
  }

  m.updatedAt = now;
}

/** Retrieve the current snapshot for a session (or null if unknown). */
export function getSessionMetrics(
  sessionId: string
): SessionMetrics | undefined {
  return sessionStore.get(sessionId);
}

/** Return a snapshot of all active sessions (read-only view). */
export function getAllSessionMetrics(): SessionMetrics[] {
  return Array.from(sessionStore.values());
}

/**
 * Compute a lightweight cross-session aggregate.
 * Returns averaged numeric dimensions that the clustering step consumes.
 */
export function computeAggregateVector(): number[] {
  const all = getAllSessionMetrics();
  if (all.length === 0)
    return [0, 0, 0, 0, 0, 0, 0];

  const avg = (fn: (m: SessionMetrics) => number) =>
    all.reduce((s, m) => s + fn(m), 0) / all.length;

  return [
    avg((m) => m.ctr),
    avg((m) => m.scrollCompletion),
    avg((m) => m.sessionDuration / 60_000), // normalised to minutes
    avg((m) => (m.bounced ? 1 : 0)),
    avg((m) => m.conversionRate),
    avg((m) => m.featureUsageFreq),
    avg((m) => m.navigationEfficiency),
  ];
}

/** Remove a session (e.g. after processing to keep memory bounded). */
export function evictSession(sessionId: string): void {
  sessionStore.delete(sessionId);
}

/** Clear all sessions (useful in tests / SSR reset). */
export function clearAllSessions(): void {
  sessionStore.clear();
}
