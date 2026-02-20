
export interface ValidationResult {
  isValid: boolean;
  error?: string;
  status?: number;
}

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
// DICOM usually has application/dicom but sometimes application/octet-stream or others
export const ALLOWED_EXTENSIONS = ['.dcm'];

export async function validateDicom(file: File): Promise<ValidationResult> {
    if (!file) {
      return { isValid: false, error: "No file uploaded", status: 400 };
    }

    if (file.size > MAX_FILE_SIZE) {
      return { isValid: false, error: "File too large. Max size is 10MB.", status: 413 };
    }

    // Basic magic bytes check
    // DICOM file format: 128 bytes preamble + 4 bytes 'DICM'
    try {
        const buffer = Buffer.from(await file.arrayBuffer());

        if (buffer.length < 132) {
            return { isValid: false, error: "Invalid file format. File too small.", status: 400 };
        }

        const magic = buffer.subarray(128, 132).toString();
        if (magic !== 'DICM') {
             // Some DICOM files (Part 10 compliant) must have DICM.
             // Non-compliant ones might not, but for security we enforce it for now.
           return { isValid: false, error: "Invalid file format. Missing DICM header.", status: 400 };
        }
    } catch (e) {
        return { isValid: false, error: "Failed to read file.", status: 500 };
    }

    return { isValid: true };
}
