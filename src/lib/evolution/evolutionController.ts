/**
 * evolutionController.ts
 *
 * Global orchestrator that decides WHEN to mutate, enforces frequency
 * limits, monitors reward delta, auto-rolls back unstable mutations,
 * and maintains an overall stability score.
 */

import {
  selectMutation,
  applyMutation,
  revertMutation,
  type LayoutMutation,
} from "./mutationEngine";
import {
  registerMutation,
  observeReward,
  computeStabilityScore,
  getMutationRecord,
  type RewardInputs,
} from "./reinforcementEngine";
import { computeReward } from "./reinforcementEngine";
import type { BehaviorCluster } from "./behaviorClustering";

/** Controller configuration options. */
export interface EvolutionConfig {
  /** Maximum number of mutations applied per session (default 3). */
  maxMutationsPerSession?: number;
  /** Minimum milliseconds between mutation attempts (default 60 000 = 1 min). */
  mutationCooldownMs?: number;
  /**
   * Stability score below which no new mutations are attempted (default 0.4).
   * Prevents a runaway mutation spiral.
   */
  stabilityFloor?: number;
  /**
   * Minimum samples observed before a rollback decision is made (default 3).
   */
  minSamplesBeforeDecision?: number;
}

const DEFAULT_CONFIG: Required<EvolutionConfig> = {
  maxMutationsPerSession: 3,
  mutationCooldownMs: 60_000,
  stabilityFloor: 0.4,
  minSamplesBeforeDecision: 3,
};

export interface EvolutionControllerState {
  activeMutation: LayoutMutation | null;
  appliedMutationIds: Set<string>;
  lastMutationAt: number;
  totalMutationsThisSession: number;
  stabilityScore: number;
  baselineReward: number;
}

function makeState(): EvolutionControllerState {
  return {
    activeMutation: null,
    appliedMutationIds: new Set(),
    lastMutationAt: 0,
    totalMutationsThisSession: 0,
    stabilityScore: 1,
    baselineReward: 0,
  };
}

let state: EvolutionControllerState = makeState();
let config: Required<EvolutionConfig> = { ...DEFAULT_CONFIG };

/** Initialise (or re-initialise) the controller with optional config overrides. */
export function initEvolutionController(overrides?: EvolutionConfig): void {
  state = makeState();
  config = { ...DEFAULT_CONFIG, ...overrides };
}

/** Read-only snapshot of current controller state. */
export function getControllerState(): Readonly<EvolutionControllerState> {
  return state;
}

/**
 * Attempt to apply the next mutation for the given user cluster.
 *
 * Respects:
 *   - mutation cooldown
 *   - session cap
 *   - stability floor
 *
 * Returns the applied mutation, or null if conditions are not met.
 */
export function attemptMutation(
  cluster: BehaviorCluster,
  currentReward: number
): LayoutMutation | null {
  const now = Date.now();

  // --- Guards ---
  if (state.totalMutationsThisSession >= config.maxMutationsPerSession) {
    return null;
  }
  if (now - state.lastMutationAt < config.mutationCooldownMs) {
    return null;
  }
  if (state.stabilityScore < config.stabilityFloor) {
    return null;
  }

  // If there's an active mutation waiting for a decision, skip for now
  if (state.activeMutation) {
    const record = getMutationRecord(state.activeMutation.id);
    if (record && record.status === "pending") {
      return null;
    }
  }

  const mutation = selectMutation(cluster, state.appliedMutationIds);
  if (!mutation) return null;

  applyMutation(mutation);
  registerMutation(mutation.id, mutation.label, currentReward);

  state.activeMutation = mutation;
  state.appliedMutationIds.add(mutation.id);
  state.lastMutationAt = now;
  state.totalMutationsThisSession += 1;
  state.baselineReward = currentReward;

  return mutation;
}

/**
 * Feed a new reward observation to the active mutation's trial.
 * If the trial decision is rollback, reverts the CSS changes automatically.
 */
export function feedReward(rewardInputs: RewardInputs): void {
  if (!state.activeMutation) return;

  const newReward = computeReward(rewardInputs);
  const record = observeReward(
    state.activeMutation.id,
    newReward,
    config.minSamplesBeforeDecision
  );

  if (!record) return;

  if (record.status === "rolledBack") {
    revertMutation(state.activeMutation);
    state.activeMutation = null;
  }

  // Refresh stability score
  state.stabilityScore = computeStabilityScore();
}

/** Reset everything (e.g. on page unload or test teardown). */
export function resetController(): void {
  if (state.activeMutation) {
    revertMutation(state.activeMutation);
  }
  state = makeState();
}
