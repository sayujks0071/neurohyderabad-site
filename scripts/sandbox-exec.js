/* eslint-disable no-console */

/**
 * Sandbox Execution Utility
 *
 * Executes a specified JS file inside a Vercel Sandbox.
 * Useful for running untrusted code or isolated tests.
 *
 * Usage:
 *   node scripts/sandbox-exec.js path/to/script.js [args...]
 */

const fs = require("node:fs/promises");
const path = require("node:path");
const { Sandbox } = require("@vercel/sandbox");

async function main() {
  const scriptPath = process.argv[2];
  if (!scriptPath) {
    console.error("Usage: node scripts/sandbox-exec.js <script-path> [args...]");
    process.exit(1);
  }

  // Ensure file exists
  try {
    await fs.access(scriptPath);
  } catch {
    console.error(`Error: File not found: ${scriptPath}`);
    process.exit(1);
  }

  const scriptName = path.basename(scriptPath);
  const scriptContent = await fs.readFile(scriptPath, "utf8");

  console.log(`Creating sandbox...`);
  // Note: Sandbox creation requires Vercel credentials (OIDC token or env vars)
  const sandbox = await Sandbox.create({
    timeout: 5 * 60 * 1000, // 5 minutes
  });

  try {
    const remotePath = `/home/user/${scriptName}`;
    await sandbox.writeFiles([{ path: remotePath, content: scriptContent }]);

    console.log(`Running ${scriptName} inside sandbox...`);
    const result = await sandbox.runCommand({
      cmd: "node",
      args: [remotePath, ...process.argv.slice(3)],
      stdout: process.stdout,
      stderr: process.stderr,
    });

    if (result.exitCode !== 0) {
      process.exitCode = result.exitCode;
    }
  } catch (error) {
    console.error("Sandbox execution failed:", error);
    process.exitCode = 1;
  } finally {
    await sandbox.stop().catch(() => {});
    console.log("Stopped sandbox.");
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
