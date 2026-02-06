/**
 * Vercel Flags Explorer — Discovery Endpoint
 *
 * Exposes all feature-flag definitions so the Vercel Toolbar can list,
 * inspect, and override them at runtime.  Protected by FLAGS_SECRET.
 *
 * Endpoint: GET /.well-known/vercel/flags
 *
 * Environment variable required:
 *   FLAGS_SECRET — set in Vercel Project Settings → Environment Variables.
 *                  The Toolbar reads this to encrypt/decrypt overrides.
 */

import { createFlagsDiscoveryEndpoint, getProviderData } from "flags/next";

// Standalone feature flags (SEO, UX, Performance, Content)
import * as flags from "@/flags";

// Hypertune-backed flags (ctaVariant, exampleFlag)
// Import individual flag exports only — skip the `flags` convenience object
// which is a nested Record and breaks getProviderData's type signature.
import { ctaVariantFlag, exampleFlagFlag } from "@/hypertune-flags";

// Merge both sets so every flag is visible in the Explorer
const allFlags = { ...flags, ctaVariantFlag, exampleFlagFlag };

export const GET = createFlagsDiscoveryEndpoint(
  async () => getProviderData(allFlags),
  { secret: process.env.FLAGS_SECRET },
);
