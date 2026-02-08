import { Sandbox } from '@vercel/sandbox';
import { SandboxError, SandboxOIDCError, SandboxTimeoutError } from './errors';

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
      runtime: (options.runtime || 'node') as any,
      timeout: options.timeoutMs,
      networkPolicy: options.network ? {
        type: 'restricted',
        allowedDomains: options.network.allow,
        deniedCIDRs: options.network.deny,
      } : undefined,
      source: options.source,
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

export async function destroySandbox(sandbox: Sandbox) {
  try {
    const s = sandbox as any;
    if (typeof s.destroy === 'function') {
      await s.destroy();
    } else if (typeof s.close === 'function') {
      await s.close();
    } else {
      console.warn('Sandbox instance does not have a destroy/close method');
    }
  } catch (err: any) {
    console.warn('Failed to destroy sandbox:', err.message);
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
    const command = await sandbox.runCommand({
      cmd,
      args,
      env,
      cwd,
      detached,
    }) as any;

    if (detached) {
      return command;
    }

    const collectOutput = async () => {
        const stdoutPromise = typeof command.stdout === 'function' ? command.stdout() : Promise.resolve(String(command.stdout || ''));
        const stderrPromise = typeof command.stderr === 'function' ? command.stderr() : Promise.resolve(String(command.stderr || ''));
        return Promise.all([stdoutPromise, stderrPromise]);
    };

    let stdoutStr = '';
    let stderrStr = '';

    if (timeoutMs) {
         const results = await Promise.race([
             collectOutput(),
             new Promise<never>((_, reject) =>
               setTimeout(() => reject(new SandboxTimeoutError(`Command timed out after ${timeoutMs}ms`)), timeoutMs)
             )
         ]);
         stdoutStr = results[0];
         stderrStr = results[1];
    } else {
         const results = await collectOutput();
         stdoutStr = results[0];
         stderrStr = results[1];
    }

    return {
      stdout: stdoutStr.slice(0, maxOutputBytes),
      stderr: stderrStr.slice(0, maxOutputBytes),
      exitCode: command.exitCode,
      cmdId: command.cmdId,
    };
  } catch (err: any) {
    if (err instanceof SandboxTimeoutError) {
      throw err;
    }
    throw new SandboxError(`Command execution failed: ${err.message}`);
  }
}
