/**
 * optimizeNavigationTree.ts
 *
 * Analyses recorded navigation events to shorten action depth,
 * elevate high-usage routes, and demote low-traffic ones.
 */

/** A node in the navigation tree. */
export interface NavNode {
  path: string;
  label: string;
  /** Relative usage weight (0-1) – updated by the optimizer. */
  weight: number;
  /** Current depth in the rendered nav (lower = more prominent). */
  depth: number;
  children?: NavNode[];
}

/** Raw navigation event recorded by the aggregator. */
export interface NavEvent {
  from: string;
  to: string;
  timestamp: number;
}

/** Internal hit-counter keyed by path. */
const hitCounts = new Map<string, number>();

/** Record a navigation hop. */
export function recordNavEvent(event: NavEvent): void {
  hitCounts.set(event.to, (hitCounts.get(event.to) ?? 0) + 1);
}

/** Reset all recorded hits (tests / SSR). */
export function clearNavHits(): void {
  hitCounts.clear();
}

/**
 * Compute optimised weights for a flat list of paths based on hit counts.
 * Returns a map of path → normalised weight (0-1).
 */
function computeWeights(paths: string[]): Map<string, number> {
  const max = Math.max(1, ...paths.map((p) => hitCounts.get(p) ?? 0));
  const weights = new Map<string, number>();
  for (const path of paths) {
    weights.set(path, (hitCounts.get(path) ?? 0) / max);
  }
  return weights;
}

/**
 * Optimise a navigation tree in place.
 *
 * Rules applied:
 *   1. Nodes with weight ≥ 0.7 are promoted (depth -= 1, min 0).
 *   2. Nodes with weight < 0.2 are demoted (depth += 1, max 3).
 *   3. Children are sorted descending by weight (most used first).
 *
 * @param nodes  Flat or nested navigation nodes to optimise.
 * @returns      A new (cloned) array with updated weights and depths.
 */
export function optimizeNavigationTree(nodes: NavNode[]): NavNode[] {
  const allPaths = flattenPaths(nodes);
  const weights = computeWeights(allPaths);

  return cloneAndOptimize(nodes, weights);
}

function flattenPaths(nodes: NavNode[]): string[] {
  const result: string[] = [];
  for (const node of nodes) {
    result.push(node.path);
    if (node.children) result.push(...flattenPaths(node.children));
  }
  return result;
}

function cloneAndOptimize(
  nodes: NavNode[],
  weights: Map<string, number>
): NavNode[] {
  const updated = nodes.map((node): NavNode => {
    const w = weights.get(node.path) ?? node.weight;
    let depth = node.depth;

    if (w >= 0.7) depth = Math.max(0, depth - 1);
    else if (w < 0.2) depth = Math.min(3, depth + 1);

    return {
      ...node,
      weight: w,
      depth,
      children: node.children
        ? cloneAndOptimize(node.children, weights)
        : undefined,
    };
  });

  // Sort: promoted (lower depth, higher weight) first
  updated.sort((a, b) => a.depth - b.depth || b.weight - a.weight);

  return updated;
}

/**
 * Build a flat ordered navigation list from an optimised tree
 * (depth-first, respecting new weights).
 * Useful for rendering a dynamic nav component.
 */
export function flattenOptimizedNav(nodes: NavNode[]): NavNode[] {
  const result: NavNode[] = [];
  for (const node of nodes) {
    result.push(node);
    if (node.children) {
      result.push(...flattenOptimizedNav(node.children));
    }
  }
  return result;
}
