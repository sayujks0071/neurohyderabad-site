"use client";

import { useExperiment } from "@statsig/react-bindings";

export function useSafeExperiment<TValue = unknown>(
  experimentName: string,
  fallback: TValue
): TValue {
  try {
    const result = useExperiment(experimentName);
    return (result?.value ?? fallback) as TValue;
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[Statsig] Falling back to experiment '${experimentName}' with default '${String(
          fallback
        )}'`,
        error
      );
    }
    return fallback;
  }
}
