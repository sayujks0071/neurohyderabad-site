import { rateLimit } from "@/src/lib/rate-limit";

// Rate limiter for 5 requests per hour (60 * 60 * 1000 ms)
export function getRateLimit(ip: string, limit: number = 5, windowMs: number = 60 * 60 * 1000) {
  return rateLimit(ip, limit, windowMs);
}
