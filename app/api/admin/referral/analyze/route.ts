import { NextResponse } from "next/server";
import { verifyAdminAccess } from "@/src/lib/security";
import { validatePdf } from "@/lib/pdf/validation";
import { extractPdfTextInSandbox } from "@/lib/pdf/extract-sandbox";
import { analyzeReferral } from "@/lib/referral/analyze";

export const runtime = "nodejs";
export const maxDuration = 60; // 60 seconds

export async function POST(request: Request) {
  // 1. Auth Check
  const { isAuthorized, response } = await verifyAdminAccess(request);
  if (!isAuthorized) {
    return response!;
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    // 2. Validate PDF
    const validation = await validatePdf(file!); // safe because validatePdf handles null but TS might complain if we don't assert or check before call. Actually validatePdf signature is `file: File`. If null passed, it might be runtime error if not typed strictly or if validatePdf handles it. My validatePdf handles !file. But here `file` is `File | null`. `validatePdf` expects `File`.
    // I should check null first.
    if (!file) {
         return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const valResult = await validatePdf(file);
    if (!valResult.isValid) {
      return NextResponse.json({ error: valResult.error }, { status: valResult.status || 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // 3. Extract Text (Sandbox)
    const extraction = await extractPdfTextInSandbox(buffer);

    // 4. Analyze (Gemini)
    const analysis = await analyzeReferral(extraction.text);

    return NextResponse.json({
      extraction: {
        numpages: extraction.numpages,
        extractedChars: extraction.text.length,
        truncated: extraction.truncated
      },
      analysis
    });

  } catch (error: any) {
    console.error("[Referral Analyzer] Error:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}
