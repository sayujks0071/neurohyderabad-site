import { NextResponse } from "next/server";
import { createSandbox, runSandboxCommand } from "@/lib/sandbox/client";
import { verifyAdminAccess } from "@/src/lib/security";
import { NETWORK_POLICIES } from "@/lib/sandbox/network";
import { rateLimit } from "@/src/lib/rate-limit";

const ALLOWED_JOBS = {
  "reindex-gemini-rag": {
    cmd: "sh",
    args: ["-lc", "npm i -g pnpm && pnpm -s i --frozen-lockfile && pnpm -s reindex:gemini"],
    envKeys: ["GOOGLE_GENAI_API_KEY", "GEMINI_API_KEY"],
  },
  "seo-audit": {
    cmd: "sh",
    args: ["-lc", "npm i -g pnpm && pnpm -s i --frozen-lockfile && pnpm -s seo:audit"],
    envKeys: [],
  },
  "health-full": {
    cmd: "sh",
    args: ["-lc", "npm i -g pnpm && pnpm -s i --frozen-lockfile && pnpm -s health:full"],
    envKeys: [],
  }
} as const;

export const runtime = "nodejs";

export async function POST(request: Request) {
  const { isAuthorized, response } = await verifyAdminAccess(request);
  if (!isAuthorized) return response!;

  const ip = request.headers.get("x-forwarded-for")?.split(',')[0] || "127.0.0.1";
  const limit = rateLimit(ip, 5, 60 * 60 * 1000); // 5 per hour
  if (!limit.success) {
      return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const jobName = body.job as string;
  if (!Object.keys(ALLOWED_JOBS).includes(jobName)) {
    return NextResponse.json({ error: "Invalid job name" }, { status: 400 });
  }

  const jobConfig = ALLOWED_JOBS[jobName as keyof typeof ALLOWED_JOBS];

  const env: Record<string, string> = {};
  for (const key of jobConfig.envKeys) {
      if (process.env[key]) {
          env[key] = process.env[key]!;
      }
  }

  try {
    const sandbox = await createSandbox({
        runtime: 'node',
        timeoutMs: 1200000, // 20 min
        vcpus: 2,
        network: NETWORK_POLICIES.ADMIN_JOB,
        source: {
            type: 'git',
            url: 'https://github.com/sayujks0071/neurohyderabad-site',
            revision: process.env.VERCEL_GIT_COMMIT_SHA || 'main',
        }
    });

    const cmd = await runSandboxCommand({
        sandbox,
        cmd: jobConfig.cmd,
        args: [...jobConfig.args],
        env,
        detached: true,
    }) as any;

    return NextResponse.json({
        sandboxId: (sandbox as any).id || (sandbox as any).sandboxId,
        cmdId: cmd.cmdId || cmd.id,
        startedAt: Date.now(),
        timeoutMs: 1200000,
    });

  } catch (error: any) {
    console.error("Job start failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
