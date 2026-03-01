/**
 * mutationEngine.ts
 *
 * Generates controlled layout variations ("actions") for the A/B mutation
 * loop and applies / reverts them via CSS custom properties so that
 * no DOM reorder occurs (zero CLS risk).
 *
 * All numeric values are expressed in relative units (em / rem / %) —
 * never in hardcoded px.
 */

import { mutationGuardrail, MutationPayload } from "./mutationGuardrail";
import type { BehaviorCluster } from "./behaviorClustering";

/** All dimensions that a single mutation may adjust. */
export interface LayoutMutation {
  id: string;
  label: string;
  /** CSS custom-property patch to apply at the :root level */
  cssVars: Record<string, string>;
  /** Payload forwarded to the guardrail before activation */
  payload: MutationPayload;
}

/** Map CSS custom properties to their baseline (reset) values. */
const BASELINE_CSS_VARS: Record<string, string> = {
  "--evo-font-scale": "1",
  "--evo-spacing-scale": "1",
  "--evo-line-height": "1.6",
  "--evo-card-padding": "1.5rem",
  "--evo-nav-order": "0",
  "--evo-cta-weight": "600",
  "--evo-content-gap": "1.5rem",
};

/**
 * Predefined mutation catalogue.
 * Each entry is a named "action" that the reinforcement engine can try.
 */
export const MUTATION_CATALOGUE: LayoutMutation[] = [
  {
    id: "density-compact",
    label: "Compact density",
    cssVars: {
      "--evo-font-scale": "0.9",
      "--evo-spacing-scale": "0.8",
      "--evo-card-padding": "1rem",
      "--evo-content-gap": "1rem",
    },
    payload: { fontScale: 0.9, spacingScale: 0.8, density: "compact" },
  },
  {
    id: "density-comfortable",
    label: "Comfortable density",
    cssVars: {
      "--evo-font-scale": "1.05",
      "--evo-spacing-scale": "1.25",
      "--evo-card-padding": "2rem",
      "--evo-content-gap": "2rem",
    },
    payload: { fontScale: 1.05, spacingScale: 1.25, density: "comfortable" },
  },
  {
    id: "line-height-loose",
    label: "Increased line height for slow readers",
    cssVars: { "--evo-line-height": "1.9" },
    payload: { spacingScale: 1 },
  },
  {
    id: "cta-prominent",
    label: "Strong CTA weight",
    cssVars: { "--evo-cta-weight": "700" },
    payload: { density: "default" },
  },
  {
    id: "content-gap-wide",
    label: "Wider content gaps for explorers",
    cssVars: {
      "--evo-content-gap": "2.5rem",
      "--evo-card-padding": "2rem",
    },
    payload: { spacingScale: 1.4, density: "comfortable" },
  },
  {
    id: "font-scale-large",
    label: "Slightly larger base font",
    cssVars: { "--evo-font-scale": "1.1" },
    payload: { fontScale: 1.1 },
  },
];

/**
 * Pick a mutation from the catalogue appropriate for the given cluster,
 * filtered to ones the guardrail deems safe.
 */
export function selectMutation(
  cluster: BehaviorCluster,
  alreadyApplied: Set<string>
): LayoutMutation | null {
  // Cluster-to-preferred-mutation mapping
  const preferences: Record<BehaviorCluster, string[]> = {
    explorer: ["content-gap-wide", "density-comfortable"],
    decisiveBuyer: ["density-compact", "cta-prominent"],
    slowReader: ["line-height-loose", "font-scale-large"],
    mobileHeavy: ["density-compact", "cta-prominent"],
    powerUser: ["density-compact", "cta-prominent"],
    passiveScroller: ["density-comfortable", "line-height-loose"],
  };

  const preferred = preferences[cluster] ?? [];
  const ordered = [
    ...preferred,
    ...MUTATION_CATALOGUE.map((m) => m.id).filter((id) => !preferred.includes(id)),
  ];

  for (const id of ordered) {
    if (alreadyApplied.has(id)) continue;
    const mutation = MUTATION_CATALOGUE.find((m) => m.id === id);
    if (!mutation) continue;
    const check = mutationGuardrail(mutation.payload);
    if (check.safe) return mutation;
  }

  return null;
}

/**
 * Apply a mutation by patching CSS custom properties on a target element
 * (defaults to `document.documentElement` on the client).
 *
 * Safe to call in SSR – returns immediately when `document` is unavailable.
 */
export function applyMutation(
  mutation: LayoutMutation,
  target?: HTMLElement
): void {
  if (typeof document === "undefined") return;
  const el = target ?? document.documentElement;

  // Use requestIdleCallback when available to avoid blocking the main thread
  const schedule =
    typeof requestIdleCallback !== "undefined"
      ? requestIdleCallback
      : (cb: () => void) => setTimeout(cb, 0);

  schedule(() => {
    for (const [prop, value] of Object.entries(mutation.cssVars)) {
      el.style.setProperty(prop, value);
    }
  });
}

/**
 * Revert a mutation by resetting its CSS vars to their baseline values.
 */
export function revertMutation(
  mutation: LayoutMutation,
  target?: HTMLElement
): void {
  if (typeof document === "undefined") return;
  const el = target ?? document.documentElement;

  const schedule =
    typeof requestIdleCallback !== "undefined"
      ? requestIdleCallback
      : (cb: () => void) => setTimeout(cb, 0);

  schedule(() => {
    for (const prop of Object.keys(mutation.cssVars)) {
      const baseline = BASELINE_CSS_VARS[prop] ?? "";
      el.style.setProperty(prop, baseline);
    }
  });
}

/** Return the baseline CSS vars (used for initial seeding). */
export function getBaselineCssVars(): Record<string, string> {
  return { ...BASELINE_CSS_VARS };
}
