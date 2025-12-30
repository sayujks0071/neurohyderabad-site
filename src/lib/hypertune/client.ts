/**
 * Hypertune Client Initialization
 * Creates and manages the Hypertune client instance
 */

import { getHypertuneToken } from './edge-config';
import { createHypertuneSource } from './source';

let hypertuneClient: ReturnType<typeof createHypertuneSource> | null = null;

/**
 * Initialize Hypertune client
 * This should be called once during app initialization
 */
export function initializeHypertune() {
  if (hypertuneClient) {
    return hypertuneClient;
  }

  const token = getHypertuneToken();
  
  if (!token) {
    console.warn('Hypertune token not found. Feature flags will use fallback values.');
    hypertuneClient = createHypertuneSource();
    return hypertuneClient;
  }

  try {
    hypertuneClient = createHypertuneSource();

    return hypertuneClient;
  } catch (error) {
    console.error('Failed to initialize Hypertune client:', error);
    hypertuneClient = createHypertuneSource();
    return hypertuneClient;
  }
}

/**
 * Get the Hypertune client instance
 * Initializes if not already initialized
 */
export function getHypertune() {
  if (!hypertuneClient) {
    return initializeHypertune();
  }
  return hypertuneClient;
}

/**
 * Wait for Hypertune to initialize
 * Useful for ensuring flags are ready before rendering
 */
export async function waitForHypertune(): Promise<void> {
  // If there is no token configured, do not attempt remote initialization.
  // This avoids noisy console errors (and failed network requests) in local/dev environments.
  const token = getHypertuneToken();
  if (!token) {
    return;
  }

  const client = getHypertune();
  if (client && typeof client.initIfNeeded === 'function') {
    try {
      await client.initIfNeeded();
    } catch (error) {
      console.warn('Hypertune initialization failed; using fallback values.', error);
    }
  }
}
