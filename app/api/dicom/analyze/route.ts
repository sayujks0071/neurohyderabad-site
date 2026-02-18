import { NextResponse } from "next/server";
import { rateLimit } from "@/src/lib/rate-limit";
import { extractDicomMetadataInSandbox } from "@/lib/dicom/extract";
import { validateDicom } from "@/lib/dicom/validation";

export const runtime = "nodejs"; // Sandbox SDK requires nodejs runtime
export const maxDuration = 60; // 60 seconds

export async function POST(request: Request) {
  // Rate Limiting: 3 requests per 10 minutes per IP
  const ip = request.headers.get("x-forwarded-for")?.split(',')[0] || "127.0.0.1";
  const limit = rateLimit(ip, 3, 10 * 60 * 1000);

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

    const validation = await validateDicom(file);
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: validation.status || 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Extract metadata in sandbox
    const metadata = await extractDicomMetadataInSandbox(buffer);

    return NextResponse.json({
      metadata
    });

  } catch (error: any) {
    console.error("[DICOM Analyzer] Error:", error);
    const message = error.message || "An unexpected error occurred.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
