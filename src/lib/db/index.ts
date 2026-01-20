import { Pool, QueryResult } from 'pg';

// Use a singleton pattern for the pool
let pool: Pool | undefined;

function getPool(): Pool | null {
  if (!pool) {
    const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;
    if (!connectionString) {
      console.warn('POSTGRES_URL/DATABASE_URL not set. Database operations will be skipped.');
      return null;
    }

    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized: false },
      max: 10, // Max connections in pool
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 10000,
    });

    // Handle pool errors
    pool.on('error', (err) => {
      console.error('Unexpected database pool error:', err);
    });
  }
  return pool;
}

// Type-safe query result
type QueryResultRow = Record<string, unknown>;

export const db = {
  /**
   * Execute a SQL query with optional parameters
   */
  query: async <T extends QueryResultRow = QueryResultRow>(
    text: string,
    params?: unknown[]
  ): Promise<QueryResult<T>> => {
    const p = getPool();
    if (!p) {
      console.debug('Database not configured, skipping query:', text.substring(0, 100));
      return { rows: [], rowCount: 0, command: '', oid: 0, fields: [] };
    }
    return p.query<T>(text, params);
  },

  /**
   * Execute a query and return just the rows
   */
  queryRows: async <T extends QueryResultRow = QueryResultRow>(
    text: string,
    params?: unknown[]
  ): Promise<T[]> => {
    const result = await db.query<T>(text, params);
    return result.rows;
  },

  /**
   * Execute a query and return the first row or null
   */
  queryOne: async <T extends QueryResultRow = QueryResultRow>(
    text: string,
    params?: unknown[]
  ): Promise<T | null> => {
    const result = await db.query<T>(text, params);
    return result.rows[0] ?? null;
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
    const columns = keys.join(', ');

    const query = `INSERT INTO ${table} (${columns}) VALUES (${placeholders}) RETURNING *`;
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
    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');

    const query = `UPDATE ${table} SET ${setClause} WHERE ${idColumn} = $${keys.length + 1} RETURNING *`;
    return db.queryOne<T>(query, [...values, id]);
  },

  /**
   * Check if database is configured and reachable
   */
  isConfigured: (): boolean => {
    return !!(process.env.POSTGRES_URL || process.env.DATABASE_URL);
  },

  /**
   * Health check - verify database connection
   */
  healthCheck: async (): Promise<{ ok: boolean; latencyMs: number; error?: string }> => {
    const start = Date.now();
    try {
      await db.query('SELECT 1');
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
   * Close the pool (for cleanup)
   */
  close: async (): Promise<void> => {
    if (pool) {
      await pool.end();
      pool = undefined;
    }
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
  }) => {
    // Insert or update based on email
    return db.queryOne(`
      INSERT INTO patients (email, name, phone, age, gender, primary_condition, acquisition_source)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      ON CONFLICT (email) DO UPDATE SET
        name = COALESCE(EXCLUDED.name, patients.name),
        phone = COALESCE(EXCLUDED.phone, patients.phone),
        age = COALESCE(EXCLUDED.age, patients.age),
        gender = COALESCE(EXCLUDED.gender, patients.gender),
        primary_condition = COALESCE(EXCLUDED.primary_condition, patients.primary_condition),
        last_contact_date = CURRENT_TIMESTAMP,
        total_appointments = patients.total_appointments + 1
      RETURNING *
    `, [data.email, data.name, data.phone, data.age, data.gender, data.primary_condition, data.acquisition_source]);
  },

  findByEmail: async (email: string) => {
    return db.queryOne('SELECT * FROM patients WHERE email = $1', [email]);
  },

  updateLeadScore: async (id: string, score: number, status?: string) => {
    const data: Record<string, unknown> = { lead_score: score };
    if (status) data.lead_status = status;
    return db.update('patients', id, data);
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
