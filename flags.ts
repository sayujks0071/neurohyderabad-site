import { Identify } from "flags";
import { dedupe, flag } from "flags/next";
import { createHypertuneAdapter } from "@flags-sdk/hypertune";
import { createHypertuneSource } from "@/src/lib/hypertune/source";
import { hypertuneFlagFallbacks, type HypertuneFlags } from "@/src/lib/hypertune/experiments-config";

// Context type for flag evaluation
export type Context = {
  environment: string;
  user?: {
    id: string;
    name?: string;
    email?: string;
  };
};

// Root flag values type (matches HypertuneFlags)
export type RootFlagValues = HypertuneFlags;

// Flag definitions for Vercel Flags Explorer
export const vercelFlagDefinitions = {
  cta_variant: {
    description: "Controls the CTA button variant shown in hero sections",
    origin: "https://www.hypertune.com",
    options: [
      { value: "control", label: "Control" },
      { value: "teleconsult_first", label: "Teleconsult First" },
      { value: "whatsapp_first", label: "WhatsApp First" },
    ],
  },
  sticky_cta_variant: {
    description: "Controls the sticky CTA variant shown at bottom of page",
    origin: "https://www.hypertune.com",
    options: [
      { value: "control", label: "Control" },
      { value: "mri_review", label: "MRI Review" },
      { value: "coordinator_first", label: "Coordinator First" },
    ],
  },
  // Placeholder for example flag - add to Hypertune dashboard to use
  exampleFlag: {
    description: "Example feature flag for testing",
    origin: "https://www.hypertune.com",
    options: [
      { value: false, label: "Off" },
      { value: true, label: "On" },
    ],
  },
};

// Extended flag fallbacks to include example flag
const extendedFlagFallbacks = {
  ...hypertuneFlagFallbacks,
  exampleFlag: false,
} as const;

// Create source function that wraps existing Hypertune source
function createSource() {
  return createHypertuneSource({ useEdgeConfig: true });
}

// Identify function for flag evaluation context
const identify: Identify<Context> = dedupe(
  async ({ headers, cookies }) => {
    return {
      environment: process.env.NODE_ENV || "development",
      // In production, you'd extract user info from headers/cookies
      user: undefined,
    };
  },
);

// Create Hypertune adapter
const hypertuneAdapter = createHypertuneAdapter<
  RootFlagValues & { exampleFlag: boolean },
  Context
>({
  createSource,
  flagFallbacks: extendedFlagFallbacks as any,
  flagDefinitions: vercelFlagDefinitions,
  identify,
});

// Export flag declarations for use in components
export const ctaVariantFlag = flag(
  hypertuneAdapter.declarations.cta_variant,
);

export const stickyCtaVariantFlag = flag(
  hypertuneAdapter.declarations.sticky_cta_variant,
);

// Example flag - add this to your Hypertune dashboard to use
export const exampleFlagFlag = flag(
  hypertuneAdapter.declarations.exampleFlag,
);

// Export all flags for convenience
export const flags = {
  ctaVariant: ctaVariantFlag,
  stickyCtaVariant: stickyCtaVariantFlag,
  exampleFlag: exampleFlagFlag,
};
