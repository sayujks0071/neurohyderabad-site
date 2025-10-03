"use client";
import { StatsigProvider } from '@statsig/react-bindings';
import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function StatsigClientProvider({ children }: { children: React.ReactNode }) {
  const [uid, setUid] = useState<string>('anon');

  useEffect(() => {
    let id = Cookies.get('uid');
    if (!id) {
      id = Math.random().toString(36).slice(2);
      Cookies.set('uid', id, { sameSite: 'lax', secure: true, expires: 365 });
    }
    setUid(id);
  }, []);

  const user = { 
    userID: uid, 
    country: 'IN',
    // Add city detection if available
    ...(typeof window !== 'undefined' && window.location.search.includes('geo=hyd') && { city: 'Hyderabad' })
  };
  
  return (
    <StatsigProvider
      sdkKey={process.env.NEXT_PUBLIC_STATSIG_CLIENT_KEY!}
      user={user}
      waitForInitialization={false}
      options={{ environment: { tier: process.env.NEXT_PUBLIC_SITE_ENV || 'production' } }}
    >
      {children}
    </StatsigProvider>
  );
}
