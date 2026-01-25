import { Identify } from "flags";
import { dedupe, flag } from "flags/next";
import { createHypertuneAdapter } from "@flags-sdk/hypertune";
import { createSource, flagFallbacks, vercelFlagDefinitions as flagDefinitions, type Context, type FlagValues } from "./generated/hypertune";

// Identify function for flag evaluation context
const identify: Identify<Context> = dedupe(
  async ({ headers, cookies }) => {
    return {
      environment: (process.env.NODE_ENV || "development") as "development" | "production" | "test",
      user: {
        id: "anonymous",
        name: "",
        email: "",
      },
    };
  },
);

// Create Hypertune adapter using generated code
const hypertuneAdapter = createHypertuneAdapter<
  FlagValues,
  Context
>({
  createSource,
  flagFallbacks,
  flagDefinitions,
  identify,
});

// Export flag declarations for use in components
export const ctaVariantFlag = flag(
  hypertuneAdapter.declarations.ctaVariant,
);

export const exampleFlagFlag = flag(
  hypertuneAdapter.declarations.exampleFlag,
);

// Export all flags for convenience
export const flags = {
  ctaVariant: ctaVariantFlag,
  exampleFlag: exampleFlagFlag,
};
