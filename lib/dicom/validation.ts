export interface ValidationResult {
  isValid: boolean;
  error?: string;
  status?: number;
}

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_MIME = 'application/dicom'; // Note: Browsers might not detect this correctly

export async function validateDicom(file: File): Promise<ValidationResult> {
    if (!file) {
      return { isValid: false, error: "No file uploaded", status: 400 };
    }

    if (file.size > MAX_FILE_SIZE) {
      return { isValid: false, error: "File too large. Max size is 10MB.", status: 413 };
    }

    // Basic magic bytes check
    // DICOM files have a 128-byte preamble followed by 'DICM'
    try {
        const buffer = Buffer.from(await file.arrayBuffer());
        if (buffer.length < 132) {
             return { isValid: false, error: "Invalid file format. Too small.", status: 400 };
        }
        const magic = buffer.subarray(128, 132).toString();
        if (magic !== 'DICM') {
           return { isValid: false, error: "Invalid file format. Not a DICOM file.", status: 400 };
        }
    } catch (e) {
        return { isValid: false, error: "Failed to read file.", status: 500 };
    }

    return { isValid: true };
}
