import { neon } from '@neondatabase/serverless';

// Type for the Neon SQL client
type NeonClient = ReturnType<typeof neon>;

// Lazy-initialize the SQL client
let sql: NeonClient | null = null;

function getSql(): NeonClient | null {
  if (!sql) {
    // Check multiple possible env var names (Vercel/Neon integration uses storage_ prefix)
    const connectionString = 
      process.env.POSTGRES_URL || 
      process.env.DATABASE_URL ||
      process.env.storage_POSTGRES_URL ||
      process.env.storage_DATABASE_URL;
    
    if (!connectionString) {
      console.warn('Database URL not set. Checked: POSTGRES_URL, DATABASE_URL, storage_POSTGRES_URL, storage_DATABASE_URL');
      return null;
    }
    sql = neon(connectionString);
  }
  return sql;
}

// Type-safe query result
type QueryResultRow = Record<string, unknown>;

// Mock result for when DB is not configured
const EMPTY_RESULT = { rows: [], rowCount: 0 };

/**
 * Safely escape SQL identifiers (table names, column names)
 * wrapping them in double quotes and escaping any existing double quotes.
 *
 * 🛡️ Sentinel: Prevents SQL injection via identifier names.
 */
function escapeIdentifier(identifier: string): string {
  return `"${identifier.replace(/"/g, '""')}"`;
}

export const db = {
  /**
   * Execute a SQL query with optional parameters
   * Uses Neon serverless driver - optimized for edge/serverless
   * Note: Uses sql.query() for parameterized queries (Neon v1.0+ API)
   */
  query: async <T extends QueryResultRow = QueryResultRow>(
    text: string,
    params?: unknown[]
  ): Promise<{ rows: T[]; rowCount: number }> => {
    const client = getSql();
    if (!client) {
      console.debug('Database not configured, skipping query:', text.substring(0, 100));
      return EMPTY_RESULT as { rows: T[]; rowCount: number };
    }
    // Use sql.query() for parameterized queries (v1.0+ API)
    const rows = await client.query(text, params ?? []) as T[];
    return { rows, rowCount: rows.length };
  },

  /**
   * Execute a query and return just the rows
   */
  queryRows: async <T extends QueryResultRow = QueryResultRow>(
    text: string,
    params?: unknown[]
  ): Promise<T[]> => {
    const client = getSql();
    if (!client) {
      console.debug('Database not configured, skipping query');
      return [];
    }
    // Use sql.query() for parameterized queries (v1.0+ API)
    return client.query(text, params ?? []) as Promise<T[]>;
  },

  /**
   * Execute a query and return the first row or null
   */
  queryOne: async <T extends QueryResultRow = QueryResultRow>(
    text: string,
    params?: unknown[]
  ): Promise<T | null> => {
    const rows = await db.queryRows<T>(text, params);
    return rows[0] ?? null;
  },

  /**
   * Insert a record and return the inserted row
   */
  insert: async <T extends QueryResultRow = QueryResultRow>(
    table: string,
    data: Record<string, unknown>
  ): Promise<T | null> => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    // 🛡️ Sentinel: Escape identifiers to prevent SQL injection
    const columns = keys.map(escapeIdentifier).join(', ');

    const query = `INSERT INTO ${escapeIdentifier(table)} (${columns}) VALUES (${placeholders}) RETURNING *`;
    return db.queryOne<T>(query, values);
  },

  /**
   * Update records by ID
   */
  update: async <T extends QueryResultRow = QueryResultRow>(
    table: string,
    id: string | number,
    data: Record<string, unknown>,
    idColumn = 'id'
  ): Promise<T | null> => {
    const keys = Object.keys(data);
    const values = Object.values(data);
    // 🛡️ Sentinel: Escape identifiers to prevent SQL injection
    const setClause = keys.map((key, i) => `${escapeIdentifier(key)} = $${i + 1}`).join(', ');

    const query = `UPDATE ${escapeIdentifier(table)} SET ${setClause} WHERE ${escapeIdentifier(idColumn)} = $${keys.length + 1} RETURNING *`;
    return db.queryOne<T>(query, [...values, id]);
  },

  /**
   * Check if database is configured
   */
  isConfigured: (): boolean => {
    return !!(
      process.env.POSTGRES_URL || 
      process.env.DATABASE_URL ||
      process.env.storage_POSTGRES_URL ||
      process.env.storage_DATABASE_URL
    );
  },

  /**
   * Health check - verify database connection
   */
  healthCheck: async (): Promise<{ ok: boolean; latencyMs: number; error?: string }> => {
    const start = Date.now();
    try {
      await db.queryOne('SELECT 1 as check');
      return { ok: true, latencyMs: Date.now() - start };
    } catch (error) {
      return {
        ok: false,
        latencyMs: Date.now() - start,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  },

  /**
   * Reset connection (neon serverless handles this automatically)
   */
  close: async (): Promise<void> => {
    sql = null;
  },
};

// =====================================================
// Domain-specific helpers
// =====================================================

export const appointments = {
  create: async (data: {
    patient_name: string;
    patient_email: string;
    patient_phone: string;
    preferred_date: string;
    preferred_time?: string;
    appointment_type?: string;
    chief_complaint: string;
    intake_notes?: string;
    patient_age?: number;
    patient_gender?: string;
    pain_score?: number;
    mri_scan_available?: boolean;
    has_emergency_symptoms?: boolean;
    source?: string;
    workflow_run_id?: string;
    confirmation_message?: string;
    used_ai_confirmation?: boolean;
  }) => {
    return db.insert('appointments', data);
  },

  updateStatus: async (id: string, status: string, additionalData?: Record<string, unknown>) => {
    const data: Record<string, unknown> = { status, ...additionalData };
    if (status === 'confirmed') data.confirmed_at = new Date().toISOString();
    if (status === 'completed') data.completed_at = new Date().toISOString();
    return db.update('appointments', id, data);
  },

  findByEmail: async (email: string) => {
    return db.queryRows(
      'SELECT * FROM appointments WHERE patient_email = $1 ORDER BY created_at DESC',
      [email]
    );
  },

  findByPhone: async (phone: string) => {
    return db.queryRows(
      'SELECT * FROM appointments WHERE patient_phone = $1 ORDER BY created_at DESC',
      [phone]
    );
  },

  getRecent: async (limit = 50) => {
    return db.queryRows(
      'SELECT * FROM appointments ORDER BY created_at DESC LIMIT $1',
      [limit]
    );
  },

  getStats: async () => {
    return db.queryOne<{
      total: string;
      pending: string;
      confirmed: string;
      completed: string;
      cancelled: string;
    }>(`
      SELECT 
        COUNT(*) as total,
        COUNT(*) FILTER (WHERE status = 'pending') as pending,
        COUNT(*) FILTER (WHERE status = 'confirmed') as confirmed,
        COUNT(*) FILTER (WHERE status = 'completed') as completed,
        COUNT(*) FILTER (WHERE status = 'cancelled') as cancelled
      FROM appointments
    `);
  },

  checkSlot: async (date: string, time: string) => {
    const result = await db.queryOne<{ count: string }>(
      "SELECT COUNT(*) as count FROM appointments WHERE preferred_date = $1 AND preferred_time = $2 AND status != 'cancelled'",
      [date, time]
    );
    return Number(result?.count || 0);
  },

  findByWorkflowRunId: async (workflowRunId: string) => {
    return db.queryOne(
      'SELECT * FROM appointments WHERE workflow_run_id = $1',
      [workflowRunId]
    );
  },
};

export const patients = {
  upsert: async (data: {
    email: string;
    name: string;
    phone?: string;
    age?: number;
    gender?: string;
    primary_condition?: string;
    acquisition_source?: string;
    pain_score?: number;
    mri_scan_available?: boolean;
    notes?: string;
  }) => {
    // Insert or update based on email
    return db.queryOne(`
      INSERT INTO patients (email, name, phone, age, gender, primary_condition, acquisition_source, latest_pain_score, mri_scan_available, notes)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
      ON CONFLICT (email) DO UPDATE SET
        name = COALESCE(EXCLUDED.name, patients.name),
        phone = COALESCE(EXCLUDED.phone, patients.phone),
        age = COALESCE(EXCLUDED.age, patients.age),
        gender = COALESCE(EXCLUDED.gender, patients.gender),
        primary_condition = COALESCE(EXCLUDED.primary_condition, patients.primary_condition),
        latest_pain_score = COALESCE(EXCLUDED.latest_pain_score, patients.latest_pain_score),
        mri_scan_available = COALESCE(EXCLUDED.mri_scan_available, patients.mri_scan_available),
        notes = CASE
            WHEN patients.notes IS NOT NULL AND EXCLUDED.notes IS NOT NULL THEN patients.notes || E'\n\n' || EXCLUDED.notes
            ELSE COALESCE(patients.notes, EXCLUDED.notes)
        END,
        last_contact_date = CURRENT_TIMESTAMP,
        total_appointments = patients.total_appointments + 1
      RETURNING *
    `, [
      data.email,
      data.name,
      data.phone,
      data.age,
      data.gender,
      data.primary_condition,
      data.acquisition_source,
      data.pain_score ?? null,
      data.mri_scan_available ?? null,
      data.notes ?? null
    ]);
  },

  findByEmail: async (email: string) => {
    return db.queryOne('SELECT * FROM patients WHERE email = $1', [email]);
  },

  updateLeadScore: async (id: string, score?: number, status?: string) => {
    const data: Record<string, unknown> = {};
    if (score !== undefined) data.lead_score = score;
    if (status) data.lead_status = status;
    if (Object.keys(data).length === 0) return null;
    return db.update('patients', id, data);
  },

  getRecent: async (limit = 50) => {
    return db.queryRows(
      'SELECT * FROM patients ORDER BY last_contact_date DESC LIMIT $1',
      [limit]
    );
  },
};

export const analytics = {
  track: async (event: {
    event_type: string;
    page_path: string;
    session_id?: string;
    user_agent?: string;
    referrer?: string;
    is_mobile?: boolean;
    page_category?: string;
    user_intent?: string;
    meta?: Record<string, unknown>;
  }) => {
    return db.insert('analytics_events', {
      ...event,
      meta: event.meta ? JSON.stringify(event.meta) : '{}',
    });
  },

  getPageViews: async (path: string, days = 30) => {
    return db.queryOne<{ count: string }>(`
      SELECT COUNT(*) as count 
      FROM analytics_events 
      WHERE page_path = $1 
        AND event_type = 'page-view'
        AND timestamp > NOW() - INTERVAL '${days} days'
    `, [path]);
  },
};

export const workflowRuns = {
  create: async (data: {
    id: string;
    workflow_name: string;
    triggered_by: string;
    input_data?: Record<string, unknown>;
  }) => {
    return db.insert('workflow_runs', {
      ...data,
      input_data: data.input_data ? JSON.stringify(data.input_data) : null,
    });
  },

  complete: async (id: string, output_data?: Record<string, unknown>, error_message?: string) => {
    const status = error_message ? 'failed' : 'completed';
    return db.query(`
      UPDATE workflow_runs 
      SET status = $1, 
          output_data = $2, 
          error_message = $3, 
          completed_at = CURRENT_TIMESTAMP,
          duration_ms = EXTRACT(EPOCH FROM (CURRENT_TIMESTAMP - started_at)) * 1000
      WHERE id = $4
    `, [status, output_data ? JSON.stringify(output_data) : null, error_message, id]);
  },

  getRecent: async (workflowName?: string, limit = 20) => {
    if (workflowName) {
      return db.queryRows(
        'SELECT * FROM workflow_runs WHERE workflow_name = $1 ORDER BY started_at DESC LIMIT $2',
        [workflowName, limit]
      );
    }
    return db.queryRows(
      'SELECT * FROM workflow_runs ORDER BY started_at DESC LIMIT $1',
      [limit]
    );
  },
};

export const siteHealth = {
  record: async (check: {
    check_type: string;
    endpoint?: string;
    status: string;
    response_time_ms?: number;
    status_code?: number;
    ttfb_ms?: number;
    fcp_ms?: number;
    lcp_ms?: number;
    error_message?: string;
    meta?: Record<string, unknown>;
  }) => {
    return db.insert('site_health_checks', {
      ...check,
      meta: check.meta ? JSON.stringify(check.meta) : '{}',
    });
  },

  getLatest: async (checkType?: string) => {
    if (checkType) {
      return db.queryOne(
        'SELECT * FROM site_health_checks WHERE check_type = $1 ORDER BY checked_at DESC LIMIT 1',
        [checkType]
      );
    }
    return db.queryRows(
      `SELECT DISTINCT ON (check_type) * 
       FROM site_health_checks 
       ORDER BY check_type, checked_at DESC`
    );
  },
};
