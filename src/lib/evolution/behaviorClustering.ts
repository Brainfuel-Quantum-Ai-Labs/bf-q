/**
 * behaviorClustering.ts
 *
 * Lightweight k-means–style clustering that maps a user's behavioural
 * feature vector onto one of six named clusters.
 *
 * Feature vector (7 dimensions, all 0-1 normalised):
 *   [ctr, scrollCompletion, sessionMinutes, bounceRate,
 *    conversionRate, featureUsageFreq, navigationEfficiency]
 */

/** Named behavioral clusters used throughout the engine. */
export type BehaviorCluster =
  | "explorer"
  | "decisiveBuyer"
  | "slowReader"
  | "mobileHeavy"
  | "powerUser"
  | "passiveScroller";

/** A feature vector is exactly 7 floats in [0, 1]. */
export type FeatureVector = [
  number, // 0 ctr
  number, // 1 scrollCompletion
  number, // 2 sessionMinutes (normalised, cap at 1 for ≥30 min)
  number, // 3 bounceRate
  number, // 4 conversionRate
  number, // 5 featureUsageFreq (normalised, cap at 1 for ≥5 / min)
  number  // 6 navigationEfficiency
];

/**
 * Hard-coded cluster centroids derived from domain knowledge.
 * In production these would be trained offline and versioned.
 */
const CENTROIDS: Record<BehaviorCluster, FeatureVector> = {
  explorer:        [0.6, 0.8, 0.7, 0.1, 0.2, 0.7, 0.5],
  decisiveBuyer:   [0.8, 0.5, 0.3, 0.1, 0.9, 0.4, 0.9],
  slowReader:      [0.3, 0.9, 0.9, 0.2, 0.2, 0.2, 0.4],
  mobileHeavy:     [0.5, 0.6, 0.4, 0.3, 0.4, 0.5, 0.5],
  powerUser:       [0.7, 0.7, 0.8, 0.1, 0.6, 0.9, 0.9],
  passiveScroller: [0.2, 0.4, 0.2, 0.7, 0.1, 0.1, 0.2],
};

/** Euclidean distance between two same-length vectors. */
function euclidean(a: number[], b: number[]): number {
  return Math.sqrt(
    a.reduce((sum, ai, i) => sum + (ai - b[i]) ** 2, 0)
  );
}

/**
 * Normalise a raw feature vector so each dimension is in [0, 1].
 *
 * @param ctr                 clicks / impressions (should already be 0-1)
 * @param scrollCompletion    0-1
 * @param sessionMinutes      raw minutes (capped at 30)
 * @param bounced             boolean coerced to 0 / 1
 * @param conversionRate      0-1
 * @param featureUsageFreq    raw hits/min (capped at 5)
 * @param navigationEfficiency 0-1
 */
export function normaliseVector(
  ctr: number,
  scrollCompletion: number,
  sessionMinutes: number,
  bounced: boolean,
  conversionRate: number,
  featureUsageFreq: number,
  navigationEfficiency: number
): FeatureVector {
  return [
    Math.min(1, Math.max(0, ctr)),
    Math.min(1, Math.max(0, scrollCompletion)),
    Math.min(1, sessionMinutes / 30),
    bounced ? 1 : 0,
    Math.min(1, Math.max(0, conversionRate)),
    Math.min(1, featureUsageFreq / 5),
    Math.min(1, Math.max(0, navigationEfficiency)),
  ];
}

/**
 * Classify a normalised feature vector into the nearest named cluster.
 */
export function classifyCluster(vector: FeatureVector): BehaviorCluster {
  let best: BehaviorCluster = "passiveScroller";
  let bestDist = Infinity;

  for (const [cluster, centroid] of Object.entries(CENTROIDS) as [
    BehaviorCluster,
    FeatureVector
  ][]) {
    const d = euclidean(vector, centroid);
    if (d < bestDist) {
      bestDist = d;
      best = cluster;
    }
  }

  return best;
}

/**
 * Derive the cluster label for a single session's metrics snapshot.
 * Convenience wrapper used by the evolution hook.
 */
export function clusterFromMetrics(metrics: {
  ctr: number;
  scrollCompletion: number;
  sessionDuration: number;
  bounced: boolean;
  conversionRate: number;
  featureUsageFreq: number;
  navigationEfficiency: number;
}): BehaviorCluster {
  const vec = normaliseVector(
    metrics.ctr,
    metrics.scrollCompletion,
    metrics.sessionDuration / 60_000,
    metrics.bounced,
    metrics.conversionRate,
    metrics.featureUsageFreq,
    metrics.navigationEfficiency
  );
  return classifyCluster(vec);
}

/**
 * Return a description of personalisation hints for each cluster.
 * Consumed by the personalisation layer in evolutionController.
 */
export const CLUSTER_PERSONALIZATION: Record<
  BehaviorCluster,
  {
    uiDensity: "compact" | "default" | "comfortable";
    ctaStrength: "strong" | "normal" | "subtle";
    lineHeight: "tight" | "normal" | "loose";
    navigationFocus: "top" | "bottom" | "sidebar";
    featureHighlights: boolean;
  }
> = {
  explorer: {
    uiDensity: "comfortable",
    ctaStrength: "normal",
    lineHeight: "normal",
    navigationFocus: "top",
    featureHighlights: true,
  },
  decisiveBuyer: {
    uiDensity: "compact",
    ctaStrength: "strong",
    lineHeight: "tight",
    navigationFocus: "top",
    featureHighlights: false,
  },
  slowReader: {
    uiDensity: "comfortable",
    ctaStrength: "subtle",
    lineHeight: "loose",
    navigationFocus: "top",
    featureHighlights: false,
  },
  mobileHeavy: {
    uiDensity: "default",
    ctaStrength: "strong",
    lineHeight: "normal",
    navigationFocus: "bottom",
    featureHighlights: false,
  },
  powerUser: {
    uiDensity: "compact",
    ctaStrength: "normal",
    lineHeight: "tight",
    navigationFocus: "sidebar",
    featureHighlights: true,
  },
  passiveScroller: {
    uiDensity: "comfortable",
    ctaStrength: "subtle",
    lineHeight: "normal",
    navigationFocus: "top",
    featureHighlights: false,
  },
};
