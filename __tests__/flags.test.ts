import { describe, it, expect, vi } from 'vitest';

// Mock posthog adapter
vi.mock('@flags-sdk/posthog', () => ({
  postHogAdapter: {
    isFeatureEnabled: () => ({
      decide: async () => false,
    }),
  },
}));

// We need to import flags AFTER mocking because flags.ts evaluates top-level code (flag definitions)
// But standard imports are hoisted. So we rely on vi.mock hoisting.
// However, flags.ts uses `postHogAdapter.isFeatureEnabled()` immediately.
// vi.mock is hoisted, so checking if the mock is correct.

import { myFlag, identify } from '@/flags';

describe('flags', () => {
  it('should export myFlag', () => {
    expect(myFlag).toBeDefined();
  });

  it('should export identify', () => {
    expect(identify).toBeDefined();
  });
});
