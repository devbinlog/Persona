/**
 * Simple in-memory rate limiter for lounge messages.
 * Limit: N messages per user per window (ms).
 */

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

const WINDOW_MS = 10_000; // 10 seconds
const MAX_MESSAGES = 5;   // per window

export function checkRateLimit(userId: string): { allowed: boolean; retryAfterMs?: number } {
  const now = Date.now();
  const entry = store.get(userId);

  if (!entry || now >= entry.resetAt) {
    store.set(userId, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  if (entry.count >= MAX_MESSAGES) {
    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }

  entry.count += 1;
  return { allowed: true };
}

// Clean up expired entries periodically
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of store.entries()) {
      if (now >= entry.resetAt) store.delete(key);
    }
  }, 60_000);
}
