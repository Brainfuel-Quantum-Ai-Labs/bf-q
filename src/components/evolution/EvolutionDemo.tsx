"use client";

/**
 * EvolutionDemo.tsx
 *
 * Example React integration for the Evolution Intelligence Engine v4.
 *
 * This component demonstrates:
 *   - Wrapping content with <EvolutionProvider>
 *   - Reading cluster / reward / stability from useEvolutionContext
 *   - Emitting behavioural events (click, scroll)
 *   - Applying cluster-specific CSS classes for personalisation
 *   - Showing a live stability badge
 *
 * Drop this into any page to see the engine in action.
 */

import React, { useEffect, useRef } from "react";
import { EvolutionProvider, useEvolutionContext } from "./EvolutionProvider";
import "@/styles/evolutionIntelligence.css";

// ---------------------------------------------------------------------------
// Inner demo (reads context)
// ---------------------------------------------------------------------------

function EvolutionDemoInner() {
  const {
    userCluster,
    activeMutation,
    rewardScore,
    stabilityScore,
    personalizationMode,
    performanceSafe,
    emitEvent,
  } = useEvolutionContext();

  const sectionRef = useRef<HTMLDivElement>(null);

  // Emit scroll events as the user scrolls the demo section
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          emitEvent({ type: "scroll", value: entry.intersectionRatio });
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [emitEvent]);

  // Map stability to badge class
  const stabilityClass =
    stabilityScore >= 0.7
      ? "evo-stability-badge--healthy"
      : stabilityScore >= 0.4
        ? "evo-stability-badge--degraded"
        : "evo-stability-badge--critical";

  const stabilityLabel =
    stabilityScore >= 0.7
      ? "Stable"
      : stabilityScore >= 0.4
        ? "Monitoring"
        : "Critical";

  // Derive CSS class from cluster
  const clusterClass = `evo-cluster-${userCluster}`;

  const ctaClass =
    personalizationMode.ctaStrength === "strong"
      ? "evo-cta evo-cta--strong"
      : personalizationMode.ctaStrength === "subtle"
        ? "evo-cta evo-cta--subtle"
        : "evo-cta";

  return (
    <div
      ref={sectionRef}
      className={`evo-transition-guard ${clusterClass}`}
    >
      {/* ── Engine Status Panel ── */}
      <div className="evo-card rounded-xl border border-gray-200 bg-white shadow-sm mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <h2 className="evo-heading text-foreground">
            Evolution Intelligence Engine{" "}
            <span className="gradient-text">v4</span>
          </h2>

          {/* Stability badge */}
          <span className={`evo-stability-badge ${stabilityClass}`}>
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                stabilityScore >= 0.7
                  ? "bg-green-500"
                  : stabilityScore >= 0.4
                    ? "bg-amber-500"
                    : "bg-red-500"
              } animate-pulse`}
            />
            {stabilityLabel} ({(stabilityScore * 100).toFixed(0)}%)
          </span>
        </div>

        {/* Metrics grid */}
        <div className="evo-grid grid-cols-2 sm:grid-cols-4">
          <Metric
            label="Cluster"
            value={userCluster}
            color="text-quantum-600"
          />
          <Metric
            label="Reward Score"
            value={(rewardScore * 100).toFixed(1) + "%"}
            color="text-green-600"
          />
          <Metric
            label="Stability"
            value={(stabilityScore * 100).toFixed(0) + "%"}
            color={stabilityScore >= 0.7 ? "text-green-600" : "text-amber-600"}
          />
          <Metric
            label="Perf Safe"
            value={performanceSafe ? "✓ Yes" : "⚠ No"}
            color={performanceSafe ? "text-green-600" : "text-red-600"}
          />
        </div>

        {activeMutation && (
          <div className="mt-4 px-3 py-2 rounded-lg bg-quantum-50 border border-quantum-200 text-sm text-quantum-700">
            <strong>Active Mutation:</strong> {activeMutation.label}
          </div>
        )}
      </div>

      {/* ── Personalised Content Cards ── */}
      <div className="evo-grid grid-cols-1 sm:grid-cols-3">
        {[
          {
            title: "Reinforcement Learning",
            desc: "Each layout action is scored against a weighted reward function covering conversion, engagement, navigation efficiency, and bounce reduction.",
            highlight: personalizationMode.featureHighlights,
          },
          {
            title: "Safe A/B Mutations",
            desc: "Every mutation is validated against WCAG contrast ratios, CLS budgets, and overlap guardrails before it is applied.",
            highlight: false,
          },
          {
            title: "Cluster Personalisation",
            desc: "Users are classified into six behavioural clusters. Each cluster receives a tailored layout: density, CTA weight, line-height, and navigation focus.",
            highlight: personalizationMode.featureHighlights,
          },
        ].map(({ title, desc, highlight }) => (
          <div
            key={title}
            className={`evo-card rounded-xl border border-gray-200 bg-white shadow-sm ${
              highlight ? "evo-feature-highlight" : ""
            }`}
          >
            <h3 className="font-semibold mb-2 text-foreground evo-text">
              {title}
            </h3>
            <p className="text-sm text-muted-foreground evo-text">{desc}</p>
          </div>
        ))}
      </div>

      {/* ── CTA (personalised strength) ── */}
      <div className="mt-8 text-center">
        <button
          onClick={() => emitEvent({ type: "click", target: "demo-cta" })}
          className={`${ctaClass} inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-quantum-600 to-quantum-500 text-white hover:from-quantum-500 hover:to-quantum-400 transition-all`}
        >
          Explore the Engine
        </button>
        <p className="mt-2 text-xs text-muted-foreground">
          Clicking this button emits a behavioural event that trains the engine.
        </p>
      </div>

      {/* ── Personalisation Hints Debug ── */}
      <details className="mt-8">
        <summary className="text-xs text-muted-foreground cursor-pointer select-none hover:text-foreground transition-colors">
          Personalisation hints for cluster: <strong>{userCluster}</strong>
        </summary>
        <pre className="mt-2 p-4 rounded-lg bg-gray-50 border border-gray-200 text-xs overflow-auto">
          {JSON.stringify(personalizationMode, null, 2)}
        </pre>
      </details>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Small helper component
// ---------------------------------------------------------------------------

function Metric({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="text-center">
      <div className={`text-xl font-bold ${color}`}>{value}</div>
      <div className="text-xs text-muted-foreground mt-1">{label}</div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Public export (wraps with provider)
// ---------------------------------------------------------------------------

/**
 * Self-contained demo component with its own EvolutionProvider.
 * Import directly into any page or layout.
 */
export function EvolutionDemo() {
  return (
    <EvolutionProvider>
      <EvolutionDemoInner />
    </EvolutionProvider>
  );
}
