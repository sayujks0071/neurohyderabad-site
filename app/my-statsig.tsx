"use client";

import React from "react";
import { LogLevel, StatsigProvider } from "@statsig/react-bindings";

export default function MyStatsig({ children }: { children: React.ReactNode }) {
  // Generate a randomized user ID for better analytics
  const generateUserId = () => {
    if (typeof window !== 'undefined') {
      // Try to get existing user ID from localStorage
      let userId = localStorage.getItem('statsig-user-id');
      if (!userId) {
        // Generate new random user ID
        userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('statsig-user-id', userId);
      }
      return userId;
    }
    // Fallback for SSR
    return `ssr_user_${Date.now()}`;
  };

  const id = generateUserId();

  const user = {
    userID: id,
    custom: {
      session_id: typeof window !== 'undefined' ? Date.now().toString() : 'ssr',
      user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : 'ssr',
      timestamp: new Date().toISOString(),
    }
  };

  return (
    <StatsigProvider
      sdkKey={process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY!}
      user={user}
      options={{ logLevel: LogLevel.Debug }}
    >
      {children}
    </StatsigProvider>
  );
}
