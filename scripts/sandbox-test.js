/* eslint-disable no-console */

/**
 * Vercel Sandbox Orchestrator
 *
 * Creates a sandbox and runs `scripts/sandbox/test-runner.js` inside it.
 *
 * Usage:
 *   TARGET_URL=https://www.drsayuj.info node scripts/sandbox-test.js
 *   node scripts/sandbox-test.js https://www.drsayuj.info
 */

const fs = require("node:fs/promises");
const path = require("node:path");
const { Sandbox } = require("@vercel/sandbox");

function normalizeBaseUrl(input) {
  const raw = (input || process.env.TARGET_URL || "https://www.drsayuj.info").trim();
  const u = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
  return u.origin;
}

async function main() {
  const target = normalizeBaseUrl(process.argv[2]);
  const runnerPath = path.join(process.cwd(), "scripts", "sandbox", "test-runner.js");
  const runner = await fs.readFile(runnerPath);

  console.log(`Creating sandbox (target=${target})...`);
  const sandbox = await Sandbox.create({
    timeout: 5 * 60 * 1000,
    runtime: "node24",
  });

  try {
    const remoteRunner = "/vercel/sandbox/test-runner.js";
    await sandbox.writeFiles([{ path: remoteRunner, content: runner }]);

    console.log("Running tests inside sandbox...");
    const result = await sandbox.runCommand({
      cmd: "node",
      args: [remoteRunner],
      env: {
        TARGET_URL: target,
      },
      stdout: process.stdout,
      stderr: process.stderr,
    });

    if (result.exitCode !== 0) {
      process.exitCode = result.exitCode;
    }
  } finally {
    await sandbox.stop().catch(() => {});
    console.log("Stopped sandbox.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
