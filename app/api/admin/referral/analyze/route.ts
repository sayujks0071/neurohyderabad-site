import { NextResponse } from "next/server";
import { verifyAdminAccess } from "@/src/lib/security";
import { rateLimit } from "@/src/lib/rate-limit";
import { validateReferralFile } from "@/lib/referral/validation";
import { analyzeReferral } from "@/lib/referral/analyze";

export const runtime = "nodejs";
export const maxDuration = 60; // 60 seconds

export async function POST(request: Request) {
  // 1. Verify Admin Access
  const { isAuthorized, response } = await verifyAdminAccess(request);
  if (!isAuthorized) return response!;

  // 2. Rate Limiting (10 per hour per IP)
  const ip = request.headers.get("x-forwarded-for")?.split(',')[0] || "127.0.0.1";
  const limit = rateLimit(ip, 10, 60 * 60 * 1000);

  if (!limit.success) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  try {
    // 3. Parse and Validate File
    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    const validation = validateReferralFile(file as File);
    if (!validation.valid) {
      return NextResponse.json({ error: validation.error }, { status: 400 });
    }

    // 4. Analyze
    const buffer = Buffer.from(await (file as File).arrayBuffer());
    const analysis = await analyzeReferral(buffer);

    return NextResponse.json(analysis);

  } catch (error: any) {
    console.error("[Referral Analyzer] Error:", error);
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
