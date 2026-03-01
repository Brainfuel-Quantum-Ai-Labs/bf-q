/**
 * /evolution page
 *
 * Live demonstration of the Evolution Intelligence Engine v4.
 */

import { EvolutionDemo } from "@/components/evolution/EvolutionDemo";

export const metadata = {
  title: "Evolution Intelligence Engine v4 | BF-Q",
  description:
    "A reinforcement-driven, self-evolving UI intelligence layer that learns, clusters, and optimises layout in real time.",
};

export default function EvolutionPage() {
  return (
    <main className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-quantum-200 bg-quantum-50 text-quantum-600 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-quantum-400 animate-pulse" />
            Reinforcement Intelligence
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Evolution Intelligence{" "}
            <span className="gradient-text">Engine v4</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
            A self-evolving UI intelligence layer that learns across users,
            clusters behavioural patterns, runs safe A/B mutations, and
            optimises layout in real time — all inside React / Next.js.
          </p>
        </div>

        {/* Live demo */}
        <EvolutionDemo />

        {/* Architecture overview */}
        <section className="mt-24">
          <h2 className="text-2xl font-bold mb-8">
            System <span className="gradient-text">Architecture</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MODULES.map(({ name, desc, file }) => (
              <div
                key={name}
                className="p-5 rounded-xl border border-gray-200 bg-white shadow-sm hover:border-quantum-300 transition-colors"
              >
                <div className="text-xs font-mono text-quantum-600 mb-2 truncate">
                  {file}
                </div>
                <h3 className="font-semibold mb-2">{name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

const MODULES = [
  {
    name: "Multi-User Aggregator",
    file: "multiUserAggregator.ts",
    desc: "Collects anonymised metrics (CTR, scroll depth, session duration, conversions) and exposes aggregate feature vectors.",
  },
  {
    name: "Behavior Clustering",
    file: "behaviorClustering.ts",
    desc: "K-means–style engine that classifies each session into one of six named clusters: Explorer, DecisiveBuyer, SlowReader, MobileHeavy, PowerUser, PassiveScroller.",
  },
  {
    name: "Reinforcement Engine",
    file: "reinforcementEngine.ts",
    desc: "Scores every layout mutation with a weighted reward function. Reinforces improvements; rolls back regressions.",
  },
  {
    name: "Mutation Engine",
    file: "mutationEngine.ts",
    desc: "Generates controlled CSS-var patches (density, line-height, CTA weight, spacing) and applies them via requestIdleCallback — zero CLS.",
  },
  {
    name: "Mutation Guardrail",
    file: "mutationGuardrail.ts",
    desc: "Validates every mutation against WCAG AA contrast ratios, CLS budgets, element overlap, and sensible numeric bounds before application.",
  },
  {
    name: "Navigation Optimizer",
    file: "optimizeNavigationTree.ts",
    desc: "Analyses navigation hit counts, promotes high-traffic routes, demotes unused ones, and re-sorts the nav tree accordingly.",
  },
  {
    name: "Evolution Controller",
    file: "evolutionController.ts",
    desc: "Global orchestrator: enforces mutation cooldowns, session caps, stability floors, and automatic rollback on unstable mutations.",
  },
  {
    name: "Evolution Analytics",
    file: "evolutionAnalytics.ts",
    desc: "Tracks mutation impact, reward trends, cluster performance, stability scores, and UI health metrics. Pluggable flush() for any analytics backend.",
  },
  {
    name: "useEvolutionEngine",
    file: "useEvolutionEngine.ts",
    desc: "React hook that wires all modules together and exposes userCluster, activeMutation, rewardScore, stabilityScore, personalizationMode, and performanceSafe.",
  },
];
