import { NextResponse } from "next/server";
import { Sandbox } from "@vercel/sandbox";
import { verifyAdminAccess } from "@/src/lib/security";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const { isAuthorized, response } = await verifyAdminAccess(request);
  if (!isAuthorized) return response!;

  const { searchParams } = new URL(request.url);
  const sandboxId = searchParams.get("sandboxId");
  const cmdId = searchParams.get("cmdId");

  if (!sandboxId || !cmdId) {
    return NextResponse.json({ error: "Missing sandboxId or cmdId" }, { status: 400 });
  }

  try {
    const sandbox = await Sandbox.get({ sandboxId });

    // Try to get command.
    const sb = sandbox as any;
    const cmd = await sb.getCommand(cmdId);

    let stdout = '';
    let stderr = '';

    if (typeof cmd.output === 'function') {
        stdout = await cmd.output("stdout");
        stderr = await cmd.output("stderr");
    } else {
         stdout = String(cmd.stdout || '');
         stderr = String(cmd.stderr || '');
    }

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
