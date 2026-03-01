/**
 * reinforcementEngine.ts
 *
 * Reward-based optimisation model that scores layout mutations and
 * decides whether to reinforce or roll back each one.
 */

/** Weighted reward signal for a single measurement epoch. */
export interface RewardInputs {
  conversionRate: number;       // 0-1
  engagementTime: number;       // 0-1 (normalised, e.g. minutes / 30)
  navigationEfficiency: number; // 0-1
  bounceReduction: number;      // 0-1 (1 = no bounces this epoch)
}

/**
 * Composite reward score.
 *
 * reward = (conversionRate × 0.4) + (engagementTime × 0.25)
 *        + (navigationEfficiency × 0.2) + (bounceReduction × 0.15)
 */
export function computeReward(inputs: RewardInputs): number {
  const { conversionRate, engagementTime, navigationEfficiency, bounceReduction } =
    inputs;
  return (
    conversionRate * 0.4 +
    engagementTime * 0.25 +
    navigationEfficiency * 0.2 +
    bounceReduction * 0.15
  );
}

/** Trial lifecycle state — mutually exclusive stages. */
export type MutationStatus = "pending" | "reinforced" | "rolledBack";

/** Outcome record for a single mutation trial. */
export interface MutationRecord {
  mutationId: string;
  action: string;
  appliedAt: number;
  baselineReward: number;
  currentReward: number;
  /** Samples observed since the mutation was applied */
  sampleCount: number;
  status: MutationStatus;
  /** @deprecated Use `status === "reinforced"` instead. */
  reinforced: boolean;
  /** @deprecated Use `status === "rolledBack"` instead. */
  rolledBack: boolean;
}

/** In-memory ledger of all mutation trials this session. */
const ledger = new Map<string, MutationRecord>();

/** Register a new mutation trial against its baseline reward. */
export function registerMutation(
  mutationId: string,
  action: string,
  baselineReward: number
): void {
  ledger.set(mutationId, {
    mutationId,
    action,
    appliedAt: Date.now(),
    baselineReward,
    currentReward: baselineReward,
    sampleCount: 0,
    status: "pending",
    get reinforced() { return this.status === "reinforced"; },
    get rolledBack() { return this.status === "rolledBack"; },
  });
}

/**
 * Record a new reward observation for a running trial.
 *
 * - If the reward improves → reinforce.
 * - If the reward regresses → roll back.
 *
 * Returns the updated record.
 */
export function observeReward(
  mutationId: string,
  newReward: number,
  minSamplesBeforeDecision = 3
): MutationRecord | undefined {
  const record = ledger.get(mutationId);
  if (!record || record.status === "rolledBack") return record;

  record.currentReward = newReward;
  record.sampleCount += 1;

  if (record.sampleCount >= minSamplesBeforeDecision) {
    const delta = newReward - record.baselineReward;
    record.status = delta >= 0 ? "reinforced" : "rolledBack";
  }

  return record;
}

/** Retrieve a mutation record by ID. */
export function getMutationRecord(
  mutationId: string
): MutationRecord | undefined {
  return ledger.get(mutationId);
}

/** Return all active (not rolled-back) reinforced mutation IDs. */
export function getReinforcedMutations(): MutationRecord[] {
  return Array.from(ledger.values()).filter((r) => r.status === "reinforced");
}

/** Return all mutations pending a rollback decision. */
export function getPendingMutations(): MutationRecord[] {
  return Array.from(ledger.values()).filter((r) => r.status === "pending");
}

/** Overall stability score: ratio of reinforced to total decided mutations (0-1). */
export function computeStabilityScore(): number {
  const decided = Array.from(ledger.values()).filter(
    (r) => r.status !== "pending"
  );
  if (decided.length === 0) return 1;
  const reinforced = decided.filter((r) => r.status === "reinforced").length;
  return reinforced / decided.length;
}

/** Clear the ledger (useful in tests). */
export function clearLedger(): void {
  ledger.clear();
}
