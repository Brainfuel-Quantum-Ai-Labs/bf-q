/**
 * useEvolutionEngine.ts
 *
 * Primary React hook that wires together all evolution engine modules and
 * exposes a stable, memoised public API to consuming components.
 *
 * Usage:
 *   const { userCluster, activeMutation, rewardScore, ... } = useEvolutionEngine();
 */

"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import {
  ingestEvent,
  getSessionMetrics,
  type BehaviorEvent,
} from "@/lib/evolution/multiUserAggregator";
import { clusterFromMetrics, type BehaviorCluster } from "@/lib/evolution/behaviorClustering";
import {
  computeReward,
  type RewardInputs,
} from "@/lib/evolution/reinforcementEngine";
import {
  initEvolutionController,
  attemptMutation,
  feedReward,
  getControllerState,
  type EvolutionConfig,
} from "@/lib/evolution/evolutionController";
import {
  trackClusterAssigned,
  trackRewardSample,
  trackStabilityUpdate,
  trackMutationApplied,
} from "@/lib/evolution/evolutionAnalytics";
import {
  getBaselineCssVars,
  type LayoutMutation,
} from "@/lib/evolution/mutationEngine";
import { CLUSTER_PERSONALIZATION } from "@/lib/evolution/behaviorClustering";

/** What the hook exposes to consumers. */
export interface EvolutionEngineState {
  /** Anonymised session ID (crypto.randomUUID or fallback). */
  sessionId: string;
  /** Classified behavioural cluster for this session. */
  userCluster: BehaviorCluster;
  /** Currently active layout mutation (null if none). */
  activeMutation: LayoutMutation | null;
  /** Current composite reward score (0-1). */
  rewardScore: number;
  /** Stability score across all mutations this session (0-1). */
  stabilityScore: number;
  /** Personalisation hints derived from the cluster. */
  personalizationMode: (typeof CLUSTER_PERSONALIZATION)[BehaviorCluster];
  /** True while the engine is safe to run mutations. */
  performanceSafe: boolean;
  /**
   * Emit a raw behavioural event (click, scroll, conversion, etc.).
   * The hook handles debouncing and metric aggregation internally.
   */
  emitEvent: (event: Omit<BehaviorEvent, "timestamp">) => void;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function generateSessionId(): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return `evo-${Date.now()}-${Math.random().toString(36).slice(2)}`;
}

/** Debounce utility (returns a debounced version of fn). */
function debounce<T extends (...args: Parameters<T>) => void>(
  fn: T,
  ms: number
): (...args: Parameters<T>) => void {
  let timer: ReturnType<typeof setTimeout>;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

/**
 * Options passed to `useEvolutionEngine`.
 */
export interface UseEvolutionEngineOptions {
  /** Override default evolution controller config. */
  controllerConfig?: EvolutionConfig;
  /**
   * How often (ms) to compute a new reward observation and potentially
   * attempt a mutation.  Defaults to 30 000 (30 s).
   */
  evaluationIntervalMs?: number;
  /**
   * Maximum time (ms) between scroll / click events before the engine
   * treats the page as idle.  Defaults to 500 ms.
   */
  eventDebounceMs?: number;
}

export function useEvolutionEngine(
  options: UseEvolutionEngineOptions = {}
): EvolutionEngineState {
  const {
    controllerConfig,
    evaluationIntervalMs = 30_000,
    eventDebounceMs = 500,
  } = options;

  // Stable session ID – initialised once per component mount
  const sessionIdRef = useRef<string>(generateSessionId());
  const sessionId = sessionIdRef.current;

  const [cluster, setCluster] = useState<BehaviorCluster>("passiveScroller");
  const [activeMutation, setActiveMutation] = useState<LayoutMutation | null>(null);
  const [rewardScore, setRewardScore] = useState(0);
  const [stabilityScore, setStabilityScore] = useState(1);
  const [performanceSafe, setPerformanceSafe] = useState(true);

  // Seed CSS baseline vars once on mount
  useEffect(() => {
    if (typeof document === "undefined") return;
    const vars = getBaselineCssVars();
    for (const [k, v] of Object.entries(vars)) {
      document.documentElement.style.setProperty(k, v);
    }
    initEvolutionController(controllerConfig);
  }, [controllerConfig]);

  // ---------------------------------------------------------------------------
  // Event emitter (debounced)
  // ---------------------------------------------------------------------------

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const emitEvent = useCallback(
    debounce((event: Omit<BehaviorEvent, "timestamp">) => {
      ingestEvent(sessionId, { ...event, timestamp: Date.now() });
    }, eventDebounceMs),
    [sessionId, eventDebounceMs]
  );

  // ---------------------------------------------------------------------------
  // Periodic evaluation loop
  // ---------------------------------------------------------------------------

  useEffect(() => {
    let frameId: number;
    let startTime = Date.now();

    const evaluate = () => {
      const metrics = getSessionMetrics(sessionId);
      if (!metrics) {
        frameId = window.setTimeout(evaluate, evaluationIntervalMs);
        return;
      }

      // --- Determine cluster ---
      const newCluster = clusterFromMetrics(metrics);
      if (newCluster !== cluster) {
        setCluster(newCluster);
        trackClusterAssigned(sessionId, newCluster);
      }

      // --- Compute reward ---
      const elapsed = (Date.now() - startTime) / 60_000;
      const rewardInputs: RewardInputs = {
        conversionRate: metrics.conversionRate,
        engagementTime: Math.min(1, elapsed / 30),
        navigationEfficiency: metrics.navigationEfficiency,
        bounceReduction: metrics.bounced ? 0 : 1,
      };
      const reward = computeReward(rewardInputs);
      setRewardScore(reward);
      trackRewardSample(
        getControllerState().activeMutation?.id ?? null,
        reward,
        newCluster
      );

      // --- Feed reward to active mutation ---
      feedReward(rewardInputs);

      // --- Attempt a new mutation ---
      const applied = attemptMutation(newCluster, reward);
      if (applied) {
        setActiveMutation(applied);
        trackMutationApplied(applied.id, applied.label);
      }

      // --- Stability & active mutation refresh ---
      const ctrlState = getControllerState();
      setStabilityScore(ctrlState.stabilityScore);
      setActiveMutation(ctrlState.activeMutation);
      trackStabilityUpdate(ctrlState.stabilityScore);

      // --- Performance guard: disable further mutations if stability is low ---
      setPerformanceSafe(ctrlState.stabilityScore >= 0.4);

      frameId = window.setTimeout(evaluate, evaluationIntervalMs);
    };

    // Kick off the loop when the browser is idle
    if (typeof requestIdleCallback !== "undefined") {
      requestIdleCallback(() => {
        startTime = Date.now();
        frameId = window.setTimeout(evaluate, evaluationIntervalMs);
      });
    } else {
      frameId = window.setTimeout(evaluate, evaluationIntervalMs);
    }

    return () => {
      clearTimeout(frameId);
    };
  // Only re-create the loop if the interval or sessionId changes
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, evaluationIntervalMs]);

  return {
    sessionId,
    userCluster: cluster,
    activeMutation,
    rewardScore,
    stabilityScore,
    personalizationMode: CLUSTER_PERSONALIZATION[cluster],
    performanceSafe,
    emitEvent,
  };
}
