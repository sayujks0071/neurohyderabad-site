import { NextResponse } from "next/server";
import { rateLimit } from "@/src/lib/rate-limit";
import { extractPdfTextInSandbox } from "@/lib/op-notes/pdfExtract";
import { validateOpNoteFile, validateOpNoteMagicBytes } from "@/lib/op-notes/validation";
import { interpretOpNoteText } from "@/lib/interpretOpNote";

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
    const contentType = request.headers.get("content-type") || "";

    let text = "";
    let numpages = 0;
    let truncated = false;

    // Handle JSON body (extracted text from client)
    if (contentType.includes("application/json")) {
      const body = await request.json();
      if (!body.text) {
         return NextResponse.json({ error: "No text provided in request body" }, { status: 400 });
      }
      text = body.text;
      numpages = body.numpages || 0;
      truncated = body.truncated || false;

    } else {
      // Handle FormData (fallback for server-side extraction)
      const formData = await request.formData();
      const file = formData.get("file") as File | null;

      const validation = validateOpNoteFile(file as File);
      if (!validation.isValid) {
        return NextResponse.json({ error: validation.error }, { status: 400 });
      }

      const fileObj = file as File;

      // Basic magic bytes check (best effort)
      const buffer = Buffer.from(await fileObj.arrayBuffer());
      if (!validateOpNoteMagicBytes(buffer)) {
         return NextResponse.json({ error: "Invalid file format. Not a valid PDF." }, { status: 400 });
      }

      // Extract text in sandbox
      const extraction = await extractPdfTextInSandbox(buffer);
      text = extraction.text;
      numpages = extraction.numpages;
      truncated = extraction.truncated;
    }

    // Interpret text
    const analysis = await interpretOpNoteText(text);

    return NextResponse.json({
      extraction: {
        numpages: numpages,
        extractedChars: text.length,
        truncated: truncated
      },
      analysis
    });

  } catch (error: any) {
    console.error("[Op Note Analyzer] Error:", error);
    const message = error.message || "An unexpected error occurred.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}
