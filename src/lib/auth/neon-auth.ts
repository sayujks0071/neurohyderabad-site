/**
 * Neon Auth Configuration
 * Provides authentication for admin dashboard and patient portal
 */

// import { NeonClient } from '@neondatabase/neon-js';
import { neon } from '@neondatabase/serverless';

// Initialize Neon client with auth
const neonAuthUrl = process.env.NEXT_PUBLIC_NEON_AUTH_URL || process.env.VITE_NEON_AUTH_URL;

if (!neonAuthUrl && typeof window !== 'undefined') {
  console.warn('NEXT_PUBLIC_NEON_AUTH_URL is not set. Authentication will not work.');
}

// Create Neon client instance
export const neonClient = null;

// Auth helper functions
export const auth = {
  /**
   * Get current session
   */
  getSession: async () => {
    if (!neonClient) return null;
    try {
      const session = await neonClient.auth.getSession();
      return session;
    } catch (error) {
      console.error('Failed to get session:', error);
      return null;
    }
  },

  /**
   * Get current user
   */
  getUser: async () => {
    if (!neonClient) return null;
    try {
      const session = await neonClient.auth.getSession();
      return session?.user ?? null;
    } catch (error) {
      console.error('Failed to get user:', error);
      return null;
    }
  },

  /**
   * Sign in with email and password
   */
  signIn: async (email: string, password: string) => {
    if (!neonClient) throw new Error('Auth not configured');
    return neonClient.auth.signIn.email({
      email,
      password,
    });
  },

  /**
   * Sign up with email and password
   */
  signUp: async (email: string, password: string, name?: string) => {
    if (!neonClient) throw new Error('Auth not configured');
    return neonClient.auth.signUp.email({
      email,
      password,
      name: name || email.split('@')[0],
    });
  },

  /**
   * Sign out
   */
  signOut: async () => {
    if (!neonClient) return;
    return neonClient.auth.signOut();
  },

  /**
   * Check if user is authenticated
   */
  isAuthenticated: async (): Promise<boolean> => {
    const session = await auth.getSession();
    return !!session?.user;
  },

  /**
   * Check if user has admin role
   */
  isAdmin: async (): Promise<boolean> => {
    const session = await auth.getSession();
    // Check for admin role in user metadata
    const roles = session?.user?.user_metadata?.roles as string[] | undefined;
    return roles?.includes('admin') ?? false;
  },
};

// Type definitions
export interface NeonUser {
  id: string;
  email: string;
  name?: string;
  user_metadata?: {
    roles?: string[];
    [key: string]: unknown;
  };
  created_at?: string;
}

export interface NeonSession {
  user: NeonUser | null;
  access_token?: string;
  expires_at?: number;
}
