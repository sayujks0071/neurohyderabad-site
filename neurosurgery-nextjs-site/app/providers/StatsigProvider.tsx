'use client';

import React, { useEffect, useState } from 'react';
import { StatsigProvider as SSProvider } from '@statsig/react-bindings';
import Cookies from 'js-cookie';

export default function StatsigProvider({ children }: { children: React.ReactNode }) {
  const [uid, setUid] = useState<string>('anon');

  useEffect(() => {
    let id = Cookies.get('uid');
    if (!id) {
      id = Math.random().toString(36).slice(2);
      Cookies.set('uid', id, { sameSite: 'lax', secure: true, expires: 365 });
    }
    setUid(id);
  }, []);

  return (
    <SSProvider
      sdkKey={process.env.NEXT_PUBLIC_STATSIG_CLIENT_SDK_KEY as string}
      user={{ userID: uid, country: 'IN' }}
    >
      {children}
    </SSProvider>
  );
}