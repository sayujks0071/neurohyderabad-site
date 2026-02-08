import { NextResponse } from "next/server";
import { Sandbox } from "@vercel/sandbox";
import { verifyAdminAccess } from "@/src/lib/security";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { isAuthorized, response } = verifyAdminAccess(request);
  if (!isAuthorized) return response!;

  const { searchParams } = new URL(request.url);
  const sandboxId = searchParams.get("sandboxId");
  const cmdId = searchParams.get("cmdId");

  if (!sandboxId || !cmdId) {
    return NextResponse.json({ error: "Missing sandboxId or cmdId" }, { status: 400 });
  }

  try {
    const sandbox = await Sandbox.get({ sandboxId });

    // Cast sandbox to any to access potentially experimental getCommand
    const sb = sandbox as any;
    if (typeof sb.getCommand !== 'function') {
         // Fallback or error if SDK doesn't support retrieving command by ID
         throw new Error("Sandbox SDK does not support getCommand");
    }

    const cmd = await sb.getCommand(cmdId);

    const stdout = await cmd.output("stdout");
    const stderr = await cmd.output("stderr");

    const TAIL_SIZE = 16 * 1024; // 16KB

    return NextResponse.json({
        status: sandbox.status,
        exitCode: cmd.exitCode,
        stdoutTail: stdout.slice(-TAIL_SIZE),
        stderrTail: stderr.slice(-TAIL_SIZE),
    });

  } catch (error: any) {
     console.error("Job status check failed:", error);
     return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
