export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export function validateReferralFile(file: File | Blob): { valid: boolean; error?: string } {
  if (!file) {
    return { valid: false, error: 'No file provided' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { valid: false, error: 'File size exceeds 10MB limit' };
  }

  if (file.type !== 'application/pdf') {
    return { valid: false, error: 'Only PDF files are supported' };
  }

  return { valid: true };
}
