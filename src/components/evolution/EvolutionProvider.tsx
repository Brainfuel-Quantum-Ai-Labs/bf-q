"use client";

/**
 * EvolutionProvider.tsx
 *
 * React context provider that runs the Evolution Intelligence Engine at the
 * top of the component tree and makes its state available to any descendant
 * via `useEvolutionContext()`.
 *
 * Wrap your layout (or a specific page) with this component:
 *
 *   <EvolutionProvider>
 *     {children}
 *   </EvolutionProvider>
 */

import React, {
  createContext,
  useContext,
  type ReactNode,
} from "react";

import {
  useEvolutionEngine,
  type EvolutionEngineState,
  type UseEvolutionEngineOptions,
} from "@/hooks/useEvolutionEngine";

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

const EvolutionContext = createContext<EvolutionEngineState | null>(null);

// ---------------------------------------------------------------------------
// Provider
// ---------------------------------------------------------------------------

export interface EvolutionProviderProps {
  children: ReactNode;
  options?: UseEvolutionEngineOptions;
}

/**
 * Mounts the evolution engine and provides its state to the subtree.
 * Safe to render server-side (the engine is client-only and guards itself).
 */
export function EvolutionProvider({ children, options }: EvolutionProviderProps) {
  const engineState = useEvolutionEngine(options);

  return (
    <EvolutionContext.Provider value={engineState}>
      {children}
    </EvolutionContext.Provider>
  );
}

// ---------------------------------------------------------------------------
// Consumer hook
// ---------------------------------------------------------------------------

/**
 * Access the evolution engine state from any component inside
 * `<EvolutionProvider>`.
 *
 * Throws if called outside a provider so bugs are caught early.
 */
export function useEvolutionContext(): EvolutionEngineState {
  const ctx = useContext(EvolutionContext);
  if (!ctx) {
    throw new Error(
      "useEvolutionContext must be used inside <EvolutionProvider>."
    );
  }
  return ctx;
}
