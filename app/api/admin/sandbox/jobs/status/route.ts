import { NextResponse } from "next/server";
import { verifyAdminAccess } from "@/src/lib/security";
import { getSandbox } from "@/lib/sandbox/client";

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
    const sandbox = await getSandbox(sandboxId);
    if (!sandbox) {
      return NextResponse.json({ error: "Sandbox not found" }, { status: 404 });
    }

    const command = await (sandbox as any).getCommand(cmdId);

    // Safety check for command output
    let stdout = "";
    let stderr = "";

    if (typeof command.stdout === 'string') {
        stdout = command.stdout;
    } else if (typeof command.stdout === 'function') {
        stdout = await command.stdout();
    }

    if (typeof command.stderr === 'string') {
        stderr = command.stderr;
    } else if (typeof command.stderr === 'function') {
        stderr = await command.stderr();
    }

    return NextResponse.json({
        status: command.status,
        exitCode: command.exitCode,
        stdoutTail: stdout.slice(-16384),
        stderrTail: stderr.slice(-16384),
    });

  } catch (error: any) {
    console.error("Job status error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
