import { describe, it, expect, vi, beforeEach } from 'vitest';
import { extractPdfTextInSandbox } from '@/lib/mri/pdfExtract';
import * as sandboxClient from '@/lib/sandbox/client';
import { NETWORK_POLICIES } from '@/lib/sandbox/network';

// Mock dependencies
vi.mock('@/lib/sandbox/client', () => ({
  createSandbox: vi.fn(),
  runSandboxCommand: vi.fn(),
  destroySandbox: vi.fn(),
}));

describe('extractPdfTextInSandbox', () => {
  const mockSandbox = {
    writeFiles: vi.fn(),
    id: 'mock-sandbox-id',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (sandboxClient.createSandbox as any).mockResolvedValue(mockSandbox);
  });

  it('should successfully extract text from PDF', async () => {
    const mockOutput = JSON.stringify({
      text: 'Extracted text content',
      numpages: 5,
      truncated: false,
    });

    (sandboxClient.runSandboxCommand as any).mockResolvedValue({
      stdout: mockOutput,
      stderr: '',
      exitCode: 0,
    });

    const pdfBuffer = Buffer.from('fake-pdf-content');
    const result = await extractPdfTextInSandbox(pdfBuffer);

    expect(sandboxClient.createSandbox).toHaveBeenCalledWith({
      runtime: 'node',
      timeoutMs: 120000,
      vcpus: 1,
      network: NETWORK_POLICIES.PDF_EXTRACTION,
    });

    expect(mockSandbox.writeFiles).toHaveBeenCalledWith([
      { path: 'input.pdf', content: pdfBuffer },
      expect.objectContaining({ path: 'extract.mjs' }),
    ]);

    expect(sandboxClient.runSandboxCommand).toHaveBeenCalledWith(expect.objectContaining({
      cmd: 'sh',
      timeoutMs: 120000,
    }));

    expect(result).toEqual({
      text: 'Extracted text content',
      numpages: 5,
      truncated: false,
    });

    expect(sandboxClient.destroySandbox).toHaveBeenCalledWith(mockSandbox);
  });

  it('should handle JSON parsing errors', async () => {
    (sandboxClient.runSandboxCommand as any).mockResolvedValue({
      stdout: 'Invalid JSON output',
      stderr: '',
      exitCode: 0,
    });

    const pdfBuffer = Buffer.from('fake-pdf-content');

    await expect(extractPdfTextInSandbox(pdfBuffer)).rejects.toThrow('Invalid JSON from sandbox');
    expect(sandboxClient.destroySandbox).toHaveBeenCalledWith(mockSandbox);
  });

  it('should handle sandbox command failure', async () => {
    (sandboxClient.runSandboxCommand as any).mockResolvedValue({
      stdout: '',
      stderr: 'Error occurred',
      exitCode: 1,
    });

    const pdfBuffer = Buffer.from('fake-pdf-content');

    await expect(extractPdfTextInSandbox(pdfBuffer)).rejects.toThrow('PDF extraction failed inside sandbox');
    expect(sandboxClient.destroySandbox).toHaveBeenCalledWith(mockSandbox);
  });
});
