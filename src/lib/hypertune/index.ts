/**
 * Hypertune Integration
 * Main export file for Hypertune utilities
 */

// Server-side exports (requires server-only)
export { default as getHypertune } from './server';

// Client-side exports
export { default as getHypertuneClient } from './client-side';

// Legacy exports (for backward compatibility)
export { getHypertune as getHypertuneLegacy, initializeHypertune, waitForHypertune } from './client';
export { 
  getHypertuneToken, 
  getHypertuneConfigKey,
  getHypertuneConfigFromEdgeConfig 
} from './edge-config';
export { useFeatureFlag, useFeatureEnabled, useExperimentVariant } from './hooks';
export type { HypertuneConfig } from './edge-config';

