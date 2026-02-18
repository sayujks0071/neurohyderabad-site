import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createSandbox, runSandboxCommand, destroySandbox } from '../../../lib/sandbox/client';
import { Sandbox } from '@vercel/sandbox';

vi.mock('@vercel/sandbox', () => ({
  Sandbox: {
    create: vi.fn(),
    get: vi.fn(),
  },
}));

describe('Sandbox Client', () => {
  const mockSandboxInstance = {
    runCommand: vi.fn(),
    destroy: vi.fn(),
    id: 'mock-sandbox-id',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (Sandbox.create as any).mockResolvedValue(mockSandboxInstance);
    (Sandbox.get as any).mockResolvedValue(mockSandboxInstance);
  });

  describe('createSandbox', () => {
    it('should create a sandbox with default options', async () => {
      await createSandbox();
      expect(Sandbox.create).toHaveBeenCalledWith(expect.objectContaining({
        runtime: 'node',
        // timeout is optional
      }));
    });

    it('should create a sandbox with provided options', async () => {
      await createSandbox({
        timeoutMs: 60000,
        vcpus: 2,
        network: { allow: ['example.com'], deny: [] },
      });
      expect(Sandbox.create).toHaveBeenCalledWith(expect.objectContaining({
        timeout: 60000,
        vcpus: 2,
        networkPolicy: {
          type: 'restricted',
          allowedDomains: ['example.com'],
          deniedCIDRs: [],
        },
      }));
    });
  });

  describe('runSandboxCommand', () => {
    it('should run a command and return output', async () => {
      mockSandboxInstance.runCommand.mockResolvedValue({
        stdout: 'output',
        stderr: '',
        exitCode: 0,
        cmdId: 'cmd-1',
      });

      const result = await runSandboxCommand({
        sandbox: mockSandboxInstance as any,
        cmd: 'echo',
        args: ['hello'],
      });

      expect(mockSandboxInstance.runCommand).toHaveBeenCalledWith(expect.objectContaining({
        cmd: 'echo',
        args: ['hello'],
        detached: false,
      }));
      expect(result).toEqual({
        stdout: 'output',
        stderr: '',
        exitCode: 0,
        cmdId: 'cmd-1',
      });
    });

    it('should handle detached command', async () => {
      const mockCommand = { id: 'cmd-detached' };
      mockSandboxInstance.runCommand.mockResolvedValue(mockCommand);

      const result = await runSandboxCommand({
        sandbox: mockSandboxInstance as any,
        cmd: 'sleep',
        detached: true,
      });

      expect(mockSandboxInstance.runCommand).toHaveBeenCalledWith(expect.objectContaining({
        detached: true,
      }));
      expect(result).toEqual(mockCommand);
    });

    it('should truncate output if too large', async () => {
      const longOutput = 'a'.repeat(300 * 1024); // 300KB
      mockSandboxInstance.runCommand.mockResolvedValue({
        stdout: longOutput,
        stderr: '',
        exitCode: 0,
        cmdId: 'cmd-1',
      });

      const result = await runSandboxCommand({
        sandbox: mockSandboxInstance as any,
        cmd: 'cat',
        maxOutputBytes: 10,
      });

      expect(result.stdout.length).toBe(10);
      expect(result.stdout).toBe('a'.repeat(10));
    });
  });

  describe('destroySandbox', () => {
    it('should call destroy on sandbox', async () => {
      await destroySandbox(mockSandboxInstance as any);
      expect(mockSandboxInstance.destroy).toHaveBeenCalled();
    });
  });
});
