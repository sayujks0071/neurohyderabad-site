import { Sandbox } from '@vercel/sandbox';
import { SandboxError, SandboxOIDCError } from './errors';

export interface CreateSandboxOptions {
  runtime?: string;
  timeoutMs?: number;
  vcpus?: number;
  network?: { allow: string[]; deny: string[] };
  env?: Record<string, string>;
  source?: any; // For git source
}

export async function createSandbox(options: CreateSandboxOptions = {}) {
  try {
    const sandbox = await Sandbox.create({
      runtime: (options.runtime || 'node') as any, // Cast if necessary to satisfy type check
      timeout: options.timeoutMs,
      networkPolicy: options.network,
      source: options.source,
      // Pass vcpus, casting if not in published types
      vcpus: options.vcpus,
    } as any);

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
    const result = await sandbox.runCommand({
      cmd,
      args,
      env,
      cwd,
      detached,
    });

    if (detached) {
      return result;
    }

    const command = result as any;

    // Note: If timeoutMs is provided, we can race the command execution if the SDK supported it.
    // Currently relying on Sandbox level timeout or SDK behavior.

    // Future improvement: Wrap in Promise.race with a timeout rejection if needed.

    let stdoutStr = '';
    let stderrStr = '';

    if (!detached) {
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
