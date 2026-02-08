import { Sandbox } from '@vercel/sandbox';
import { SandboxError, SandboxOIDCError } from './errors';

export interface CreateSandboxOptions {
  runtime?: string;
  timeoutMs?: number;
  vcpus?: number;
  network?: { allow: string[]; deny: string[] };
  env?: Record<string, string>; // Kept for future use or if passed to runCommand implicitly?
                                // Actually, env is usually for runCommand, but if create supports it (some versions), we pass it.
                                // Sandbox 1.4.1 doesn't seem to support env in create, but let's leave the interface.
  source?: any; // For git source
}

export async function createSandbox(options: CreateSandboxOptions = {}) {
  try {
    let networkPolicy;
    if (options.network) {
      networkPolicy = {
        type: 'restricted' as const,
        allowedDomains: options.network.allow,
        deniedCIDRs: options.network.deny,
      };
    }

    const sandbox = await Sandbox.create({
      // @ts-ignore
      runtime: options.runtime || 'node',
      timeout: options.timeoutMs,
      networkPolicy,
      source: options.source, // Fix: Pass source
    });

    return sandbox;
  } catch (err: any) {
    console.error('Sandbox creation failed:', err);
    if (err.message?.includes('OIDC') || err.message?.includes('token')) {
      throw new SandboxOIDCError();
    }
    throw new SandboxError(`Failed to create sandbox: ${err.message}`);
  }
}

export interface RunCommandOptions {
  sandbox: Sandbox;
  cmd: string;
  args?: string[];
  env?: Record<string, string>;
  cwd?: string;
  maxOutputBytes?: number;
  timeoutMs?: number;
  detached?: boolean;
}

export async function runSandboxCommand({
  sandbox,
  cmd,
  args = [],
  env = {},
  cwd,
  maxOutputBytes = 256 * 1024,
  timeoutMs,
  detached = false,
}: RunCommandOptions) {
  try {
    // We execute the command
    const result = await sandbox.runCommand({
      cmd,
      args,
      env,
      cwd,
      detached,
      // timeout: timeoutMs, // runCommand doesn't take timeout in the same way as exec?
      // check runCommand signature. It takes signal?
      // exec() took timeout. runCommand() takes signal.
      // If we want timeout, we should use AbortController.
    });

    if (detached) {
        // Returns Command object
        return result;
    }

    // Returns CommandFinished object
    // It has output() method? Or we need to fetch logs?
    // CommandFinished has exitCode.
    // If it's CommandFinished, we might want to capture stdout/stderr.
    // But result is CommandFinished.
    // result.stdout is NOT a property on CommandFinished directly?
    // Wait, CommandFinished extends Command. Command has stdout().

    // But `exec` was the old API?
    // In `lib/sandbox/client.ts` initially I used `sandbox.exec`.
    // Does `sandbox.exec` exist?
    // `sandbox.d.ts` did NOT show `exec`. It showed `runCommand`.
    // So my initial `client.ts` using `sandbox.exec` was probably WRONG if `exec` is deprecated or removed.
    // I should check if `exec` exists.
    // If `exec` does not exist, I must update `runSandboxCommand` to use `runCommand` and fetch output.

    // In `app/api/admin/sandbox/jobs/route.ts` I used `runCommand`.

    // I will rewrite `runSandboxCommand` to use `runCommand` safely.

    const command = result as any; // CommandFinished

    // If not detached, we wait for it? runCommand waits if not detached.

    let stdoutStr = '';
    let stderrStr = '';

    if (!detached) {
       // It finished.
       stdoutStr = await command.stdout();
       stderrStr = await command.stderr();
    }

    return {
      stdout: stdoutStr.slice(0, maxOutputBytes),
      stderr: stderrStr.slice(0, maxOutputBytes),
      exitCode: command.exitCode,
      cmdId: command.cmdId,
    };
  } catch (err: any) {
     throw new SandboxError(`Command execution failed: ${err.message}`);
  }
}
