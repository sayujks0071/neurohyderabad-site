export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_MIME_TYPE = 'application/pdf';

export interface ValidationResult {
  isValid: boolean;
  error?: string;
}

export async function validateReferralFile(file: File): Promise<ValidationResult> {
  if (!file) {
    return { isValid: false, error: 'No file provided' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { isValid: false, error: 'File size exceeds 10MB limit' };
  }

  if (file.type !== ALLOWED_MIME_TYPE) {
    // Also check extension just in case
    if (!file.name.toLowerCase().endsWith('.pdf')) {
        return { isValid: false, error: 'Only PDF files are allowed' };
    }
  }

  // Magic bytes check (optional but recommended)
  // Read first 5 bytes
  try {
      const arrayBuffer = await file.slice(0, 5).arrayBuffer();
      const header = new Uint8Array(arrayBuffer);
      // %PDF- is 0x25 0x50 0x44 0x46 0x2D
      if (header[0] !== 0x25 || header[1] !== 0x50 || header[2] !== 0x44 || header[3] !== 0x46 || header[4] !== 0x2D) {
          return { isValid: false, error: 'Invalid PDF file header' };
      }
  } catch (e) {
      console.error("Error reading file header", e);
      return { isValid: false, error: 'Could not read file header' };
  }

  return { isValid: true };
}
