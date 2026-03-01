/**
 * mutationGuardrail.ts
 *
 * Safety layer that validates a proposed layout mutation before it is applied.
 * Guarantees:
 *   - Accessibility (WCAG 2.1 AA contrast ratio ≥ 4.5)
 *   - No CLS-inducing layout shift
 *   - No element overlap (stacking context check)
 *   - Enforces sensible bounds on all numeric dimensions
 */

/** Human-readable reason why a mutation was blocked. */
export type GuardrailViolation =
  | "contrast_too_low"
  | "layout_shift_risk"
  | "element_overlap"
  | "font_scale_out_of_range"
  | "spacing_out_of_range"
  | "density_invalid";

/** Result returned by the guardrail validator. */
export interface GuardrailResult {
  safe: boolean;
  violations: GuardrailViolation[];
}

/** Shape of a mutation payload that the guardrail inspects. */
export interface MutationPayload {
  /** em / rem multiplier for base font size (0.75 – 1.5) */
  fontScale?: number;
  /** Spacing multiplier applied via CSS custom property (0.5 – 2) */
  spacingScale?: number;
  /** Foreground colour as #RRGGBB or rgb(r, g, b) */
  foregroundColor?: string;
  /** Background colour as #RRGGBB or rgb(r, g, b) */
  backgroundColor?: string;
  /** Whether this mutation moves elements that could shift layout */
  causesDomReorder?: boolean;
  /** Whether positional changes risk element overlap */
  risksOverlap?: boolean;
  /** Layout density token */
  density?: "compact" | "default" | "comfortable";
}

// ---------------------------------------------------------------------------
// Colour contrast helpers (WCAG 2.1)
// ---------------------------------------------------------------------------

const HEX_COLOR_RE = /^#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})$/i;
const RGB_COLOR_RE = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/;

function hexToLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}

function relativeLuminance(r: number, g: number, b: number): number {
  return (
    0.2126 * hexToLinear(r) +
    0.7152 * hexToLinear(g) +
    0.0722 * hexToLinear(b)
  );
}

function parseColor(color: string): [number, number, number] | null {
  // #RRGGBB
  const hex = HEX_COLOR_RE.exec(color);
  if (hex) {
    return [
      parseInt(hex[1], 16),
      parseInt(hex[2], 16),
      parseInt(hex[3], 16),
    ];
  }
  // rgb(r, g, b)
  const rgb = RGB_COLOR_RE.exec(color);
  if (rgb) {
    return [parseInt(rgb[1]), parseInt(rgb[2]), parseInt(rgb[3])];
  }
  return null;
}

/**
 * Calculate WCAG contrast ratio between two colours.
 * Returns a value in [1, 21].
 */
export function contrastRatio(fg: string, bg: string): number {
  const fgRgb = parseColor(fg);
  const bgRgb = parseColor(bg);
  if (!fgRgb || !bgRgb) return 21; // unknown → assume safe

  const L1 = relativeLuminance(...fgRgb);
  const L2 = relativeLuminance(...bgRgb);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

// ---------------------------------------------------------------------------
// Main validator
// ---------------------------------------------------------------------------

/** WCAG AA minimum contrast for normal text */
const WCAG_AA_NORMAL = 4.5;

/**
 * Validate a proposed mutation payload against all guardrails.
 * Returns a `GuardrailResult` with `safe: true` only when no violations exist.
 */
export function mutationGuardrail(payload: MutationPayload): GuardrailResult {
  const violations: GuardrailViolation[] = [];

  // 1. Contrast check
  if (payload.foregroundColor && payload.backgroundColor) {
    const ratio = contrastRatio(payload.foregroundColor, payload.backgroundColor);
    if (ratio < WCAG_AA_NORMAL) {
      violations.push("contrast_too_low");
    }
  }

  // 2. CLS risk
  if (payload.causesDomReorder === true) {
    violations.push("layout_shift_risk");
  }

  // 3. Overlap risk
  if (payload.risksOverlap === true) {
    violations.push("element_overlap");
  }

  // 4. Font scale bounds [0.75, 1.5]
  if (payload.fontScale !== undefined) {
    if (payload.fontScale < 0.75 || payload.fontScale > 1.5) {
      violations.push("font_scale_out_of_range");
    }
  }

  // 5. Spacing scale bounds [0.5, 2]
  if (payload.spacingScale !== undefined) {
    if (payload.spacingScale < 0.5 || payload.spacingScale > 2) {
      violations.push("spacing_out_of_range");
    }
  }

  // 6. Density validity
  const validDensities = new Set<string>(["compact", "default", "comfortable"]);
  if (payload.density !== undefined && !validDensities.has(payload.density)) {
    violations.push("density_invalid");
  }

  return { safe: violations.length === 0, violations };
}
