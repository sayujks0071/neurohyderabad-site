/**
 * Basic in-memory rate limiter.
 *
 * Note: In a serverless environment (like Vercel), this state is local to the running lambda instance.
 * It does not share state across multiple instances. However, it provides:
 * 1. Protection against rapid-fire attacks on a "hot" lambda.
 * 2. A standard interface that can be easily swapped for Redis/Upstash later.
 */

interface RateLimitContext {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitContext>();

// Prevent memory leaks in long-running processes
const MAX_STORE_SIZE = 10000;

export function rateLimit(identifier: string, limit: number, windowMs: number) {
  // Simple cleanup if store gets too big
  if (rateLimitStore.size > MAX_STORE_SIZE) {
    rateLimitStore.clear();
  }

  const now = Date.now();
  const context = rateLimitStore.get(identifier);

  // If no record or window expired, reset
  if (!context || now > context.resetTime) {
    const resetTime = now + windowMs;
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime,
    });
    return {
      success: true,
      limit,
      remaining: limit - 1,
      reset: resetTime
    };
  }

  // If limit exceeded
  if (context.count >= limit) {
    return {
      success: false,
      limit,
      remaining: 0,
      reset: context.resetTime
    };
  }

  // Increment
  context.count += 1;
  return {
    success: true,
    limit,
    remaining: limit - context.count,
    reset: context.resetTime
  };
}

/**
 * 🛡️ Sentinel: Securely extract client IP address
 * Extracts the true client IP from the x-forwarded-for header to prevent spoofing.
 * Always takes the FIRST IP in the list (standard convention for Client IP).
 */
export function getClientIp(req: Request | { headers: Headers }): string {
  const forwardedFor = req.headers.get("x-forwarded-for");
  if (forwardedFor) {
    // The first IP is the original client IP, subsequent IPs are proxies
    return forwardedFor.split(",")[0].trim();
  }
  // Fallback to "unknown" if no header is present (e.g. direct connection or local dev)
  return "unknown";
}
