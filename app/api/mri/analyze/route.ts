import { NextResponse } from "next/server";
import { rateLimit } from "@/src/lib/rate-limit";
import { extractPdfTextInSandbox } from "@/lib/mri/pdfExtract";
import { interpretReportText } from "@/lib/interpretReport";
import { validatePdf } from "@/lib/mri/validation";

export const runtime = "nodejs"; // Sandbox SDK requires nodejs runtime
export const maxDuration = 60; // 60 seconds

export async function POST(request: Request) {
  // Feature Flag Check
  if (process.env.MRI_ANALYZER_ENABLED !== '1') {
    return NextResponse.json({ error: "Feature disabled" }, { status: 404 });
  }

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

    const validation = await validatePdf(file);
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: validation.status || 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // Extract text in sandbox
    const extraction = await extractPdfTextInSandbox(buffer);

    // Interpret text
    const analysis = await interpretReportText(extraction.text);

    return NextResponse.json({
      extraction: {
        numpages: extraction.numpages,
        extractedChars: extraction.text.length,
        truncated: extraction.truncated
      },
      analysis
    });

  } catch (error: any) {
    console.error("[MRI Analyzer] Error:", error);
    const message = error.message || "An unexpected error occurred.";

    // Don't leak internal details if possible, but for debugging V1 we return message
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
