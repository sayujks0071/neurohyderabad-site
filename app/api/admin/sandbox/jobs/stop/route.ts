import { NextResponse } from "next/server";
import { verifyAdminAccess } from "@/src/lib/security";
import { getSandbox, destroySandbox } from "@/lib/sandbox/client";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { isAuthorized, response } = await verifyAdminAccess(request);
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
    const sandbox = await getSandbox(sandboxId);
    if (!sandbox) {
      return NextResponse.json({ error: "Sandbox not found" }, { status: 404 });
    }

    await destroySandbox(sandbox);

    return NextResponse.json({ success: true, message: "Sandbox stopped" });

  } catch (error: any) {
    console.error("Stop job error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
