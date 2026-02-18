import { describe, it, expect, vi, beforeEach } from "vitest";
import { uploadFileBufferToGemini } from "../file-handler";

// Mock dependencies
vi.mock("fs/promises", () => ({
  default: {
    writeFile: vi.fn().mockResolvedValue(undefined),
    unlink: vi.fn().mockResolvedValue(undefined),
    readFile: vi.fn().mockResolvedValue(Buffer.from("test data")),
  },
  writeFile: vi.fn().mockResolvedValue(undefined),
  unlink: vi.fn().mockResolvedValue(undefined),
  readFile: vi.fn().mockResolvedValue(Buffer.from("test data")),
}));

// Mock global fetch
global.fetch = vi.fn().mockResolvedValue({
  ok: true,
  json: async () => ({
    file: {
      name: "files/123",
      displayName: "test.txt",
      uri: "https://example.com/file",
      state: "ACTIVE",
    },
  }),
});

// Mock os
vi.mock("os", async (importOriginal) => {
  const actual = await importOriginal<typeof import("os")>();
  return {
    ...actual,
    tmpdir: () => "/tmp",
    default: {
      ...actual.default,
      tmpdir: () => "/tmp",
    },
  };
});

describe("uploadFileBufferToGemini", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.GEMINI_API_KEY = "test-key";
  });

  it("should sanitize malicious filenames to prevent path traversal", async () => {
    const maliciousFileName = "../../../../etc/passwd";
    const buffer = Buffer.from("test content");

    // We spy on fs.writeFile
    const fs = await import("fs/promises");

    await uploadFileBufferToGemini(buffer, maliciousFileName, "text/plain");

    expect(fs.writeFile).toHaveBeenCalled();
    const callArgs = vi.mocked(fs.writeFile).mock.calls[0];
    const filePath = callArgs[0] as string;

    // Check that the file path does NOT contain ../../
    expect(filePath).not.toContain("../");
    expect(filePath).toContain("/tmp/gemini-upload-");
    expect(filePath).toContain("-passwd"); // basename kept 'passwd'
  });

  it("should handle normal filenames correctly", async () => {
    const fileName = "normal-file.txt";
    const buffer = Buffer.from("test content");
    const fs = await import("fs/promises");

    await uploadFileBufferToGemini(buffer, fileName, "text/plain");

    expect(fs.writeFile).toHaveBeenCalled();
    const filePath = vi.mocked(fs.writeFile).mock.calls[0][0] as string;

    expect(filePath).toContain("normal-file.txt");
    expect(filePath).toContain("/tmp/gemini-upload-");
  });
});
