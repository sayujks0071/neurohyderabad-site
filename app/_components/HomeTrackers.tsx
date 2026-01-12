'use client';

import dynamic from 'next/dynamic';

const TrustBridgeTracker = dynamic(() => import("./TrustBridgeTracker"), { ssr: false });
const TrustSignalViewportTracker = dynamic(() => import("./TrustSignalViewportTracker"), { ssr: false });
const UserJourneyTracker = dynamic(() => import("./UserJourneyTracker"), { ssr: false });

export default function HomeTrackers() {
  return (
    <>
      <TrustBridgeTracker />
      <TrustSignalViewportTracker />
      <UserJourneyTracker />
    </>
  );
}
