"use client";
import { StatsigProvider } from '@statsig/react-bindings';

export default function StatsigClientProvider({ children }: { children: React.ReactNode }) {
  const user = { userID: "anon" };
  const clientKey = process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY;
  
  // If no client key is provided, render children without Statsig
  if (!clientKey) {
    console.warn('Statsig client key not found. Analytics and A/B testing will be disabled.');
    return <>{children}</>;
  }
  
  return (
    <StatsigProvider
      sdkKey={clientKey}
      user={user}
    >
      {children}
    </StatsigProvider>
  );
}
