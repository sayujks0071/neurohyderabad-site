/**
 * @vitest-environment node
 */
import { POST as POST_JOBS } from '@/app/api/admin/sandbox/jobs/route';
import { GET as GET_STATUS } from '@/app/api/admin/sandbox/jobs/status/route';
import { POST as POST_STOP } from '@/app/api/admin/sandbox/jobs/stop/route';
import { NextRequest } from 'next/server';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Use vi.hoisted to share variables with mocks
const { mockSandbox, mockCommand } = vi.hoisted(() => {
  const mockCommand = {
    id: 'cmd-123',
    cmdId: 'cmd-123',
    exitCode: null,
    output: vi.fn(),
    stdout: 'mock-stdout',
    stderr: 'mock-stderr',
  };

  const mockSandbox = {
    id: 'sandbox-123',
    sandboxId: 'sandbox-123',
    status: 'running',
    getCommand: vi.fn().mockResolvedValue(mockCommand),
  };

  return { mockSandbox, mockCommand };
});

vi.mock('@/lib/sandbox/client', () => ({
  createSandbox: vi.fn().mockResolvedValue(mockSandbox),
  runSandboxCommand: vi.fn().mockResolvedValue({
    stdout: '',
    stderr: '',
    exitCode: null,
    cmdId: 'cmd-123',
  }),
  destroySandbox: vi.fn().mockResolvedValue(undefined),
}));

vi.mock('@vercel/sandbox', () => ({
  Sandbox: {
    get: vi.fn().mockResolvedValue(mockSandbox),
  }
}));

// Mock rate limit to always succeed except when we want it to fail
vi.mock('@/src/lib/rate-limit', () => ({
  rateLimit: vi.fn().mockReturnValue({ success: true, limit: 10, remaining: 9, reset: Date.now() + 1000 }),
}));

describe('Admin Sandbox Jobs API', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = { ...originalEnv };
    process.env.ADMIN_ACCESS_KEY = 'test-secret';
    vi.clearAllMocks();
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe('POST /api/admin/sandbox/jobs', () => {
    it('should return 401 if unauthorized', async () => {
      const req = new NextRequest('http://localhost/api/admin/sandbox/jobs', {
        method: 'POST',
        body: JSON.stringify({ job: 'seo-audit' }),
      });
      const res = await POST_JOBS(req);
      expect(res.status).toBe(401);
    });

    it('should return 400 for invalid job name', async () => {
      const req = new NextRequest('http://localhost/api/admin/sandbox/jobs', {
        method: 'POST',
        headers: { 'x-admin-key': 'test-secret' },
        body: JSON.stringify({ job: 'invalid-job' }),
      });
      const res = await POST_JOBS(req);
      expect(res.status).toBe(400);
      const data = await res.json();
      expect(data.error).toBe('Invalid job name');
    });

    it('should return 200 and start job for valid job', async () => {
      const req = new NextRequest('http://localhost/api/admin/sandbox/jobs', {
        method: 'POST',
        headers: { 'x-admin-key': 'test-secret' },
        body: JSON.stringify({ job: 'seo-audit' }),
      });
      const res = await POST_JOBS(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.sandboxId).toBe('sandbox-123');
      expect(data.cmdId).toBe('cmd-123');
    });
  });

  describe('GET /api/admin/sandbox/jobs/status', () => {
    it('should return 401 if unauthorized', async () => {
      const req = new NextRequest('http://localhost/api/admin/sandbox/jobs/status?sandboxId=1&cmdId=1');
      const res = await GET_STATUS(req);
      expect(res.status).toBe(401);
    });

    it('should return 400 if params missing', async () => {
      const req = new NextRequest('http://localhost/api/admin/sandbox/jobs/status?sandboxId=1', {
         headers: { 'x-admin-key': 'test-secret' },
      });
      const res = await GET_STATUS(req);
      expect(res.status).toBe(400);
    });

    it('should return 200 with status', async () => {
      mockSandbox.getCommand.mockResolvedValue(mockCommand);
      mockCommand.output.mockImplementation(async (type) => type === 'stdout' ? 'out' : 'err');

      const req = new NextRequest('http://localhost/api/admin/sandbox/jobs/status?sandboxId=sb1&cmdId=cmd1', {
         headers: { 'x-admin-key': 'test-secret' },
      });
      const res = await GET_STATUS(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.status).toBe('running');
      expect(data.stdoutTail).toBe('out');
    });
  });

  describe('POST /api/admin/sandbox/jobs/stop', () => {
    it('should return 401 if unauthorized', async () => {
      const req = new NextRequest('http://localhost/api/admin/sandbox/jobs/stop', {
        method: 'POST',
        body: JSON.stringify({ sandboxId: 'sb1' }),
      });
      const res = await POST_STOP(req);
      expect(res.status).toBe(401);
    });

    it('should return 200 on success', async () => {
      const req = new NextRequest('http://localhost/api/admin/sandbox/jobs/stop', {
        method: 'POST',
        headers: { 'x-admin-key': 'test-secret' },
        body: JSON.stringify({ sandboxId: 'sb1' }),
      });
      const res = await POST_STOP(req);
      expect(res.status).toBe(200);
      const data = await res.json();
      expect(data.success).toBe(true);
    });
  });
});
