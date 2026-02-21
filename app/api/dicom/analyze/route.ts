import { NextResponse } from "next/server";
import { rateLimit } from "@/src/lib/rate-limit";
import { extractDicomMetadataInSandbox } from "@/lib/dicom/extract";

// Validation constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
// DICOM usually has .dcm extension. MIME type varies (application/dicom or application/octet-stream).
// We'll rely on extension and magic bytes.

export const runtime = "nodejs";
export const maxDuration = 60;

export async function POST(request: Request) {
  // Rate Limiting
  const ip = request.headers.get("x-forwarded-for")?.split(',')[0] || "127.0.0.1";
  const limit = rateLimit(ip, 5, 10 * 60 * 1000); // 5 requests per 10 mins

  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil((limit.reset - Date.now()) / 1000)),
          "X-RateLimit-Limit": String(limit.limit),
          "X-RateLimit-Remaining": String(limit.remaining),
          "X-RateLimit-Reset": String(limit.reset)
        }
      }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "File too large. Max size is 10MB." }, { status: 413 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Check magic bytes: 'DICM' at offset 128
    if (buffer.length < 132) {
       return NextResponse.json({ error: "Invalid file format. Too small for DICOM." }, { status: 400 });
    }
    // Read 4 bytes at offset 128
    const magic = buffer.subarray(128, 132).toString('ascii');
    if (magic !== 'DICM') {
       return NextResponse.json({ error: "Invalid file format. Not a valid DICOM file." }, { status: 400 });
    }

    const metadata = await extractDicomMetadataInSandbox(buffer);

    return NextResponse.json({ metadata });

  } catch (error: any) {
    console.error("[DICOM Analyzer] Error:", error);
    return NextResponse.json({ error: error.message || "An unexpected error occurred." }, { status: 500 });
  }
}
