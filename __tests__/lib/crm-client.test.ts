
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { queryDb, createPatient, findPatientByEmail, updatePatient } from '@/lib/crm-client';

// Mock process.env
const originalEnv = process.env;

describe('CRM Client', () => {
  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv, CRM_DATABASE_URL: 'postgresql://user:password@host/database' };
    global.fetch = vi.fn();
  });

  afterEach(() => {
    process.env = originalEnv;
    vi.clearAllMocks();
  });

  describe('queryDb', () => {
    it('should throw error if CRM_DATABASE_URL is missing', async () => {
      delete process.env.CRM_DATABASE_URL;
      await expect(queryDb('SELECT 1')).rejects.toThrow('CRM_DATABASE_URL environment variable is not set');
    });

    it('should throw error if CRM_DATABASE_URL format is invalid', async () => {
      process.env.CRM_DATABASE_URL = 'invalid-url';
      await expect(queryDb('SELECT 1')).rejects.toThrow('Invalid CRM_DATABASE_URL format');
    });

    it('should execute query successfully', async () => {
      const mockResponse = { rows: [{ id: 1 }], rowCount: 1 };
      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await queryDb('SELECT * FROM patients');

      expect(global.fetch).toHaveBeenCalledWith(
        'https://host/sql',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Authorization': 'Bearer password',
          }),
          body: JSON.stringify({
            query: 'SELECT * FROM patients',
            params: [],
          }),
        })
      );
      expect(result).toEqual(mockResponse);
    });

    it('should handle API errors', async () => {
      (global.fetch as any).mockResolvedValue({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
        text: async () => 'Database error',
      });

      await expect(queryDb('SELECT 1')).rejects.toThrow('Database query failed: 500 Internal Server Error');
    });
  });

  describe('createPatient', () => {
    it('should construct correct SQL for patient creation', async () => {
      const mockPatient = {
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        phone: '1234567890',
        city: 'New York',
      };

      const mockResponse = { rows: [{ id: 1, ...mockPatient }], rowCount: 1 };
      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await createPatient(mockPatient);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: expect.stringContaining('INSERT INTO patients'),
        })
      );

      // Verify parameters are passed correctly
      const callBody = JSON.parse((global.fetch as any).mock.calls[0][1].body);
      expect(callBody.params[0]).toBe(mockPatient.email);
      expect(callBody.params[1]).toBe(mockPatient.firstName);
      expect(callBody.params[2]).toBe(mockPatient.lastName);

      expect(result).toEqual(mockResponse.rows[0]);
    });
  });

  describe('findPatientByEmail', () => {
    it('should return patient if found', async () => {
      const mockPatient = { id: 1, email: 'test@example.com' };
      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => ({ rows: [mockPatient], rowCount: 1 }),
      });

      const result = await findPatientByEmail('test@example.com');
      expect(result).toEqual(mockPatient);
    });

    it('should return null if not found', async () => {
      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => ({ rows: [], rowCount: 0 }),
      });

      const result = await findPatientByEmail('notfound@example.com');
      expect(result).toBeNull();
    });
  });

  describe('updatePatient', () => {
    it('should update patient fields correctly', async () => {
      const updates = { phone: '9876543210', city: 'Boston' };
      const mockUpdatedPatient = { id: 1, ...updates };

      (global.fetch as any).mockResolvedValue({
        ok: true,
        json: async () => ({ rows: [mockUpdatedPatient], rowCount: 1 }),
      });

      const result = await updatePatient(1, updates);

      const callBody = JSON.parse((global.fetch as any).mock.calls[0][1].body);
      expect(callBody.query).toContain('UPDATE patients');
      expect(callBody.query).toContain('phone = $1');
      expect(callBody.query).toContain('city = $2');
      expect(callBody.query).toContain('updated_at = NOW()');

      expect(result).toEqual(mockUpdatedPatient);
    });

    it('should throw error if no updates provided', async () => {
      await expect(updatePatient(1, {})).rejects.toThrow('No fields to update');
    });
  });
});
