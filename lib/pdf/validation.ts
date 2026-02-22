
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_MIME = 'application/pdf';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  status?: number;
}

export async function validatePdf(file: File): Promise<ValidationResult> {
  if (!file) {
    return { isValid: false, error: "No file uploaded", status: 400 };
  }

  if (file.type !== ALLOWED_MIME) {
    return { isValid: false, error: "Invalid file type. Only PDF is allowed.", status: 400 };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { isValid: false, error: "File too large. Max size is 10MB.", status: 413 };
  }

  // Basic magic bytes check (best effort)
  try {
    // Read only first 5 bytes
    const headerChunk = file.slice(0, 5);
    const buffer = Buffer.from(await headerChunk.arrayBuffer());
    const header = buffer.toString();
    if (!header.startsWith('%PDF-')) {
       return { isValid: false, error: "Invalid file format. Not a PDF.", status: 400 };
    }
  } catch (e) {
    return { isValid: false, error: "Failed to read file content.", status: 500 };
  }

  return { isValid: true };
}
