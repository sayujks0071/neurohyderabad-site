import { Pool } from 'pg';

// Use a singleton pattern for the pool
let pool: Pool | undefined;

function getPool() {
  if (!pool) {
    if (!process.env.POSTGRES_URL) {
      console.warn('POSTGRES_URL environment variable is not set. Analytics storage will be skipped.');
      return null;
    }

    pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
      // In production (e.g. Vercel), SSL is usually required
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
    });
  }
  return pool;
}

export const db = {
  query: async (text: string, params?: any[]) => {
    const p = getPool();
    if (!p) {
      // Return a mock result or throw?
      // Since this is for analytics and we don't want to crash the app if DB is missing locally,
      // we'll log and return a mock result.
      console.debug('Database not configured, skipping query:', text);
      return { rows: [], rowCount: 0 };
    }
    return p.query(text, params);
  },

  // Helper to check if DB is configured
  isConfigured: () => !!process.env.POSTGRES_URL,
};
