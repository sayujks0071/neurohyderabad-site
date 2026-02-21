// CRM Database Client for Neon PostgreSQL
// Uses Neon's HTTP SQL API for serverless-compatible database access

export interface Patient {
    id?: number;
    userId?: number | null;
    email: string;
    firstName: string;
    lastName: string;
    dateOfBirth?: string | null;
    phone?: string | null;
    address?: string | null;
    city?: string | null;
    state?: string | null;
    zipCode?: string | null;
    gender?: 'male' | 'female' | 'other' | null;
    insuranceProvider?: string | null;
    insurancePolicyNumber?: string | null;
    emergencyContactName?: string | null;
    emergencyContactPhone?: string | null;
    allergies?: string[] | null;
    chronicConditions?: string[] | null;
    notes?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface QueryResult {
    rows: any[];
    rowCount: number;
    fields?: any[];
}

/**
 * Execute a SQL query against the Neon database using HTTP API
 * @param sql SQL query string
 * @param params Query parameters (optional)
 * @returns Query result with rows and metadata
 */
export async function queryDb(sql: string, params?: any[]): Promise<QueryResult> {
    const databaseUrl = process.env.CRM_DATABASE_URL;

    if (!databaseUrl) {
        throw new Error('CRM_DATABASE_URL environment variable is not set');
    }

    try {
        // Extract host from the DATABASE_URL for the API endpoint
        // Format: postgresql://user:password@host/database?params
        const urlParts = databaseUrl.split('@');
        if (urlParts.length < 2) {
            throw new Error('Invalid CRM_DATABASE_URL format');
        }

        // Get the host from the URL (remove query parameters)
        const hostPart = urlParts[1];
        const hostWithDb = hostPart.split('?')[0]; // Remove query parameters
        const host = hostWithDb.split('/')[0]; // Extract just the host

        // Construct Neon SQL API endpoint
        const apiUrl = `https://${host}/sql`;

        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'neon-connection-string': databaseUrl,
            },
            body: JSON.stringify({
                query: sql,
                params: params || [],
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('[CRM] Database query failed:', errorText);
            throw new Error(`Database query failed: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('[CRM] Database error:', error);
        throw error;
    }
}

/**
 * Insert a new patient into the CRM database
 * @param patient Patient data
 * @returns Inserted patient with ID
 */
export async function createPatient(patient: Omit<Patient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Patient> {
    const sql = `
    INSERT INTO patients (
      email, first_name, last_name, phone, notes, 
      date_of_birth, address, city, state, zip_code, gender,
      allergies, chronic_conditions
    ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
    RETURNING *
  `;

    const params = [
        patient.email,
        patient.firstName,
        patient.lastName,
        patient.phone || null,
        patient.notes || null,
        patient.dateOfBirth || null,
        patient.address || null,
        patient.city || null,
        patient.state || null,
        patient.zipCode || null,
        patient.gender || null,
        patient.allergies ? JSON.stringify(patient.allergies) : null,
        patient.chronicConditions ? JSON.stringify(patient.chronicConditions) : null,
    ];

    const result = await queryDb(sql, params);
    return result.rows[0];
}

/**
 * Find a patient by email
 * @param email Patient email
 * @returns Patient if found, null otherwise
 */
export async function findPatientByEmail(email: string): Promise<Patient | null> {
    const sql = 'SELECT * FROM patients WHERE email = $1 LIMIT 1';
    const result = await queryDb(sql, [email]);
    return result.rows.length > 0 ? result.rows[0] : null;
}

/**
 * Update an existing patient's information
 * @param id Patient ID
 * @param updates Partial patient data to update
 * @returns Updated patient
 */
export async function updatePatient(id: number, updates: Partial<Patient>): Promise<Patient> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    // Build dynamic UPDATE query based on provided fields
    Object.entries(updates).forEach(([key, value]) => {
        if (key !== 'id' && key !== 'createdAt' && value !== undefined) {
            // Convert camelCase to snake_case for database columns
            const dbKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
            fields.push(`${dbKey} = $${paramIndex}`);
            values.push(value);
            paramIndex++;
        }
    });

    if (fields.length === 0) {
        throw new Error('No fields to update');
    }

    // Add updated_at timestamp
    fields.push(`updated_at = NOW()`);

    const sql = `
    UPDATE patients 
    SET ${fields.join(', ')}
    WHERE id = $${paramIndex}
    RETURNING *
  `;

    values.push(id);

    const result = await queryDb(sql, values);
    return result.rows[0];
}
