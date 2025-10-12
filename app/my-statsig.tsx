"use client";

import React, { useEffect, useMemo, useState } from "react";

type StatsigModule = typeof import("@statsig/react-bindings");

export default function MyStatsig({ children }: { children: React.ReactNode }) {
  const [statsig, setStatsig] = useState<StatsigModule | null>(null);

  useEffect(() => {
    let mounted = true;

    if (!process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY) {
      return () => {
        mounted = false;
      };
    }

    import("@statsig/react-bindings")
      .then((module) => {
        if (mounted) {
          setStatsig(module);
        }
      })
      .catch((error) => {
        if (process.env.NODE_ENV !== "production") {
          console.warn("Failed to load Statsig provider", error);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  const user = useMemo(() => {
    if (typeof window === "undefined") {
      return {
        userID: `ssr_user_${Date.now()}`,
        custom: {
          session_id: "ssr",
          user_agent: "ssr",
          timestamp: new Date().toISOString(),
        },
      };
    }

    let userId = localStorage.getItem("statsig-user-id");
    if (!userId) {
      userId = `user_${Date.now()}_${Math.random().toString(36).slice(2, 11)}`;
      localStorage.setItem("statsig-user-id", userId);
    }

    return {
      userID: userId,
      custom: {
        session_id: Date.now().toString(),
        user_agent: window.navigator.userAgent,
        timestamp: new Date().toISOString(),
      },
    };
  }, []);

  if (!process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY || !statsig) {
    return <>{children}</>;
  }

  const { StatsigProvider, LogLevel } = statsig;

  return (
    <StatsigProvider
      sdkKey={process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY}
      user={user}
      options={{ logLevel: LogLevel.Error }}
    >
      {children}
    </StatsigProvider>
  );
}
