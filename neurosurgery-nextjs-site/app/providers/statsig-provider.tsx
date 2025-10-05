"use client";
import { StatsigProvider } from '@statsig/react-bindings';

export default function StatsigClientProvider({ children }: { children: React.ReactNode }) {
  const user = { userID: "anon" };
  
  return (
    <StatsigProvider
      sdkKey={process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY!}
      user={user}
    >
      {children}
    </StatsigProvider>
  );
}
