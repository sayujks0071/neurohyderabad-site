"use client";

import React from "react";
import { StatsigProvider, useClientAsyncInit } from '@statsig/react-bindings';
import { StatsigAutoCapturePlugin } from '@statsig/web-analytics';
import { StatsigSessionReplayPlugin } from '@statsig/session-replay';

export default function MyStatsig({ children }: { children: React.ReactNode }) {
  const { client } = useClientAsyncInit(
    "client-6rsFaE0Of4SIMTVQ5J4l560K8ciY7v4wkWTXqPjD5RP",
    { 
      userID: 'anonymous', // You can customize this based on user authentication
      custom: {
        medicalSpecialty: 'neurosurgery',
        location: 'hyderabad',
        practiceType: 'private'
      }
    }, 
    { 
      plugins: [ 
        new StatsigAutoCapturePlugin(), 
        new StatsigSessionReplayPlugin() 
      ] 
    },
  );

  return (
    <StatsigProvider client={client} loadingComponent={<div>Loading...</div>}>
      {children}
    </StatsigProvider>
  );
}
