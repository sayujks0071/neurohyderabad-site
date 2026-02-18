import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/admin/sandbox/jobs/route';
import { createSandbox, runSandboxCommand, getSandbox, destroySandbox } from '@/lib/sandbox/client';
import { verifyAdminAccess } from '@/src/lib/security';
import { rateLimit } from '@/src/lib/rate-limit';
import { NextResponse } from 'next/server';

// Mock dependencies
vi.mock('@/lib/sandbox/client', () => ({
  createSandbox: vi.fn(),
  runSandboxCommand: vi.fn(),
  getSandbox: vi.fn(),
  destroySandbox: vi.fn(),
}));

vi.mock('@/src/lib/security', () => ({
  verifyAdminAccess: vi.fn(),
}));

vi.mock('@/src/lib/rate-limit', () => ({
  rateLimit: vi.fn(),
}));

// Mock NextRequest and NextResponse (implicitly by checking result)

describe('Admin Job Runner API', () => {
  const mockRequest = (body: any) => ({
    json: () => Promise.resolve(body),
    headers: {
      get: (key: string) => key === 'x-forwarded-for' ? '127.0.0.1' : null,
    },
    url: 'http://localhost/api/admin/sandbox/jobs',
  } as unknown as Request);

  beforeEach(() => {
    vi.clearAllMocks();
    (rateLimit as any).mockReturnValue({ success: true, limit: 10, remaining: 9, reset: Date.now() + 1000 });
  });

  describe('POST /jobs', () => {
    it('should return 401 if unauthorized', async () => {
      (verifyAdminAccess as any).mockResolvedValue({
        isAuthorized: false,
        response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }),
      });

      const req = mockRequest({});
      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(401);
      expect(json.error).toBe('Unauthorized');
      expect(createSandbox).not.toHaveBeenCalled();
    });

    it('should return 400 if invalid job name', async () => {
      (verifyAdminAccess as any).mockResolvedValue({ isAuthorized: true });

      const req = mockRequest({ job: 'invalid-job' });
      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(400);
      expect(json.error).toBe('Invalid job name');
      expect(createSandbox).not.toHaveBeenCalled();
    });

    it('should start a valid job', async () => {
      (verifyAdminAccess as any).mockResolvedValue({ isAuthorized: true });
      (createSandbox as any).mockResolvedValue({ id: 'sandbox-123' });
      (runSandboxCommand as any).mockResolvedValue({ cmdId: 'cmd-123' });

      const req = mockRequest({ job: 'reindex-gemini-rag' });
      const res = await POST(req);
      const json = await res.json();

      expect(res.status).toBe(200);
      expect(json.sandboxId).toBe('sandbox-123');
      expect(json.cmdId).toBe('cmd-123');

      expect(createSandbox).toHaveBeenCalledWith(expect.objectContaining({
        network: expect.objectContaining({ allow: expect.arrayContaining(['registry.npmjs.org']) }),
        source: expect.objectContaining({ url: 'https://github.com/sayujks0071/neurohyderabad-site' }),
      }));

      expect(runSandboxCommand).toHaveBeenCalledWith(expect.objectContaining({
        cmd: 'sh',
        detached: true,
      }));
    });
  });
});
