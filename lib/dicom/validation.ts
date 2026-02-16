export interface ValidationResult {
  isValid: boolean;
  error?: string;
  status?: number;
}

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_MAGIC_BYTES = 'DICM';
export const MAGIC_BYTES_OFFSET = 128;

export async function validateDicom(file: File): Promise<ValidationResult> {
    if (!file) {
      return { isValid: false, error: "No file uploaded", status: 400 };
    }

    if (file.size > MAX_FILE_SIZE) {
      return { isValid: false, error: "File too large. Max size is 10MB.", status: 413 };
    }

    // Basic magic bytes check
    // DICOM files usually have a 128-byte preamble followed by 'DICM'
    try {
        // Read enough bytes to cover the preamble and magic code
        const headerSize = MAGIC_BYTES_OFFSET + ALLOWED_MAGIC_BYTES.length;
        if (file.size < headerSize) {
             return { isValid: false, error: "Invalid file format. File too small.", status: 400 };
        }

        const buffer = Buffer.from(await file.slice(0, headerSize).arrayBuffer());
        const magic = buffer.subarray(MAGIC_BYTES_OFFSET, headerSize).toString();

        if (magic !== ALLOWED_MAGIC_BYTES) {
           return { isValid: false, error: "Invalid file format. Not a DICOM file.", status: 400 };
        }
    } catch (e) {
        console.error("Validation error:", e);
        return { isValid: false, error: "Failed to read file.", status: 500 };
    }

    return { isValid: true };
}
