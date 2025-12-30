// Google OAuth2 configuration and utilities

export const GOOGLE_OAUTH_CONFIG = {
  clientId: '568785727095-ro3c0n1om83ahqut7j28vobmnhn8h5m2.apps.googleusercontent.com',
  redirectUri: 'https://www.drsayuj.info/auth/callback',
  scope: 'openid email profile',
  uxMode: 'popup' as const,
};

export interface GoogleOAuthResponse {
  code: string;
  scope: string;
  authuser: string;
  prompt: string;
}

export interface GoogleOAuthError {
  error: string;
  error_description?: string;
}

// Utility function to handle OAuth response
export function handleOAuthResponse(response: GoogleOAuthResponse) {
  console.log('OAuth response received:', response);
  
  // Here you would typically:
  // 1. Send the authorization code to your backend
  // 2. Exchange it for access/refresh tokens
  // 3. Verify the user's identity
  // 4. Create or update user session
  
  return {
    success: true,
    code: response.code,
    scope: response.scope,
    authuser: response.authuser,
  };
}

// Utility function to handle OAuth errors
export function handleOAuthError(error: GoogleOAuthError) {
  console.error('OAuth error:', error);
  
  return {
    success: false,
    error: error.error,
    description: error.error_description,
  };
}

// Backend API endpoint for exchanging authorization code
export async function exchangeCodeForTokens(code: string) {
  try {
    const response = await fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error exchanging code for tokens:', error);
    throw error;
  }
}
