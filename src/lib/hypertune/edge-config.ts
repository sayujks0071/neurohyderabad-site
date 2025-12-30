/**
 * Hypertune Edge Config Integration
 * Handles Hypertune configuration from environment variables and Edge Config
 */

export interface HypertuneConfig {
  token?: string;
  [key: string]: any;
}

/**
 * Gets the Hypertune token from environment variables
 * Priority: NEXT_PUBLIC_HYPERTUNE_TOKEN > EXPERIMENTATION_CONFIG URL token
 */
export function getHypertuneToken(): string | null {
  // First try direct environment variable (preferred for client-side)
  const token = process.env.NEXT_PUBLIC_HYPERTUNE_TOKEN;
  if (token) {
    return token;
  }

  // Fallback: extract from EXPERIMENTATION_CONFIG URL if needed
  // Format: https://edge-config.vercel.com/ecfg_xxx?token=yyy
  // Supports both prefixed (Vercel) and non-prefixed versions
  const configUrl = getExperimentationConfig();
  if (configUrl) {
    try {
      const url = new URL(configUrl);
      const extractedToken = url.searchParams.get('token');
      if (extractedToken) {
        return extractedToken;
      }
    } catch (error) {
      console.warn('Failed to parse EXPERIMENTATION_CONFIG URL:', error);
    }
  }

  return null;
}

/**
 * Gets the Edge Config connection string
 * Supports both prefixed (Vercel) and non-prefixed versions
 */
export function getExperimentationConfig(): string | null {
  return (
    process.env.EXPERIMENTATION_CONFIG ||
    process.env.drsayuj_EXPERIMENTATION_CONFIG ||
    null
  );
}

/**
 * Gets the Edge Config item key for Hypertune
 * Supports both prefixed (Vercel) and non-prefixed versions
 */
export function getHypertuneConfigKey(): string {
  return (
    process.env.EXPERIMENTATION_CONFIG_ITEM_KEY ||
    process.env.drsayuj_EXPERIMENTATION_CONFIG_ITEM_KEY ||
    'hypertune_7233'
  );
}

/**
 * Fetches Hypertune configuration from Edge Config (server-side only)
 * Note: This requires @vercel/edge-config and should be used in API routes or server components
 */
export async function getHypertuneConfigFromEdgeConfig(): Promise<HypertuneConfig | null> {
  // Only run on server
  if (typeof window !== 'undefined') {
    return null;
  }

  try {
    const { get } = await import('@vercel/edge-config');
    const itemKey = getHypertuneConfigKey();
    const config = await get(itemKey);

    if (!config) {
      console.warn(`Hypertune config not found at key: ${itemKey}`);
      return null;
    }

    return config as HypertuneConfig;
  } catch (error) {
    // Edge Config might not be available in all environments
    console.warn('Edge Config not available or failed to fetch Hypertune config:', error);
    return null;
  }
}

