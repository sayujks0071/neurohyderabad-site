import { NextResponse } from "next/server";
import { Sandbox } from "@vercel/sandbox";
import { verifyAdminAccess } from "@/src/lib/security";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { isAuthorized, response } = verifyAdminAccess(request);
  if (!isAuthorized) return response!;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { sandboxId } = body;
  if (!sandboxId) {
      return NextResponse.json({ error: "Missing sandboxId" }, { status: 400 });
  }

  try {
    const sandbox = await Sandbox.get({ sandboxId });
    await sandbox.stop();
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
