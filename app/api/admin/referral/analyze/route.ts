import { NextResponse } from "next/server";
import { rateLimit } from "@/src/lib/rate-limit";
import { verifyAdminAccess } from "@/src/lib/security";
import { extractPdfTextInSandbox } from "@/lib/pdf/extract-sandbox";
import { validatePdf } from "@/lib/pdf/validation";
import { analyzeReferralText } from "@/lib/referral/analyze";

export const runtime = "nodejs";
export const maxDuration = 60; // 60 seconds

export async function POST(request: Request) {
  // 1. Admin Verification
  const { isAuthorized, response } = await verifyAdminAccess(request);
  if (!isAuthorized) return response!;

  // 2. Rate Limiting (Generous for admin)
  const ip = request.headers.get("x-forwarded-for")?.split(',')[0] || "127.0.0.1";
  const limit = rateLimit(ip, 10, 60 * 1000); // 10 requests per minute

  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many requests" },
      { status: 429 }
    );
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // 3. Validate PDF
    const validation = await validatePdf(file);
    if (!validation.isValid) {
      return NextResponse.json({ error: validation.error }, { status: validation.status || 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // 4. Extract Text (Sandbox)
    const extraction = await extractPdfTextInSandbox(buffer);

    // 5. Analyze Text (AI)
    const analysis = await analyzeReferralText(extraction.text);

    return NextResponse.json({
      extraction: {
        numpages: extraction.numpages,
        extractedChars: extraction.text.length,
        truncated: extraction.truncated
      },
      referral: analysis
    });

  } catch (error: any) {
    console.error("[Referral Analyzer] Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
