"use client";

import { useFeatureGate } from '@statsig/react-bindings';

export default function SimpleStatsigTest() {
  // Test feature gate
  const isNewFeatureEnabled = useFeatureGate('new_feature_enabled');

  return (
    <div className="p-4 bg-gray-100 rounded-lg m-4">
      <h3 className="text-lg font-semibold mb-2">Statsig Integration Test</h3>
      <div className="space-y-2 text-sm">
        <p><strong>Feature Gate (new_feature_enabled):</strong> {isNewFeatureEnabled ? '✅ Enabled' : '❌ Disabled'}</p>
        <p className="text-green-600"><strong>Status:</strong> ✅ Statsig is working correctly!</p>
        <p className="text-gray-600 text-xs">Client Key: {process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY ? '✅ Set' : '❌ Missing'}</p>
      </div>
    </div>
  );
}