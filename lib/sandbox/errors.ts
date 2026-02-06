export class SandboxError extends Error {
  constructor(message: string, public readonly code?: string) {
    super(message);
    this.name = 'SandboxError';
  }
}

export class SandboxTimeoutError extends SandboxError {
  constructor(message: string = 'Sandbox execution timed out') {
    super(message, 'SANDBOX_TIMEOUT');
  }
}

export class SandboxOIDCError extends SandboxError {
  constructor(message: string = 'Missing or invalid OIDC credentials') {
    super(message, 'SANDBOX_OIDC_MISSING');
  }
}
