"use client";

import { useEffect, useState } from 'react';
import { analytics } from '../lib/analytics';

interface GoogleOAuthProps {
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
  buttonText?: string;
  className?: string;
}

export default function GoogleOAuth({ 
  onSuccess, 
  onError, 
  buttonText = "Verify with Google",
  className = "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 transition-all duration-300 hover:shadow-blue-500/50 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-blue-500/30 disabled:active:scale-100"
}: GoogleOAuthProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Load Google OAuth2 script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      setIsLoaded(true);
    };
    script.onerror = () => {
      console.error('Failed to load Google OAuth2 script');
      onError?.({ error: 'Failed to load Google OAuth2 script' });
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [onError]);

  const handleGoogleAuth = () => {
    if (!isLoaded || isLoading) return;
    
    setIsLoading(true);
    
    try {
      const client = (window as any).google?.accounts?.oauth2?.initCodeClient({
        client_id: '568785727095-ro3c0n1om83ahqut7j28vobmnhn8h5m2.apps.googleusercontent.com',
        scope: 'openid email profile',
        ux_mode: 'popup',
        redirect_uri: 'https://www.drsayuj.info/auth/callback',
        callback: (response: any) => {
          setIsLoading(false);
          
          // Track successful authentication
          analytics.track('Google_OAuth_Success', {
            page_slug: window.location.pathname,
            user_agent: navigator.userAgent,
            timestamp: Date.now()
          });
          
          // Handle the response
          onSuccess?.(response);
          
          // You can send the authorization code to your backend here
          console.log('Google OAuth response:', response);
        },
        error_callback: (error: any) => {
          setIsLoading(false);
          
          // Track authentication errors
          analytics.track('Google_OAuth_Error', {
            page_slug: window.location.pathname,
            error_message: error?.error || 'Unknown error',
            timestamp: Date.now()
          });
          
          onError?.(error);
          console.error('Google OAuth error:', error);
        }
      });

      if (client) {
        client.requestCode();
      } else {
        throw new Error('Google OAuth2 client not available');
      }
    } catch (error) {
      setIsLoading(false);
      onError?.(error);
      console.error('Error initializing Google OAuth:', error);
    }
  };

  if (!isLoaded) {
    return (
      <button 
        disabled 
        className={className}
        aria-label="Loading Google authentication"
      >
        Loading...
      </button>
    );
  }

  return (
    <button
      onClick={handleGoogleAuth}
      disabled={isLoading}
      className={className}
      aria-label={isLoading ? 'Verifying with Google...' : buttonText}
    >
      {isLoading ? 'Verifying...' : buttonText}
    </button>
  );
}
