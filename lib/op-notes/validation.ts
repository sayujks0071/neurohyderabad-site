const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_MIME = 'application/pdf';

export function validateOpNoteFile(file: File): { isValid: boolean; error?: string } {
  if (!file) {
    return { isValid: false, error: 'No file provided' };
  }

  if (file.type !== ALLOWED_MIME) {
    return { isValid: false, error: 'Invalid file type. Only PDF is allowed.' };
  }

  if (file.size > MAX_FILE_SIZE) {
    return { isValid: false, error: 'File too large. Max size is 10MB.' };
  }

  return { isValid: true };
}

export function validateOpNoteMagicBytes(buffer: Buffer): boolean {
  const header = buffer.subarray(0, 5).toString();
  return header.startsWith('%PDF-');
}
