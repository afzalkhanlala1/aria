/**
 * Tiny in-memory rate limiter. Per-process state, which means in serverless
 * deployments each cold instance starts fresh — that's intentional. For a
 * public sandbox demo, this is enough to slow down casual abuse. Pair it with
 * the per-session turn limit enforced in the chat route for the real ceiling.
 *
 * For production hardening, swap this for an external store (Upstash Redis,
 * Vercel KV, etc.).
 */

type Bucket = {
  /** Window start timestamp (ms). */
  start: number;
  /** Request count inside the current window. */
  count: number;
};

type LimiterOptions = {
  /** Window length in ms. */
  windowMs: number;
  /** Max requests allowed within the window. */
  max: number;
};

const stores = new Map<string, Map<string, Bucket>>();

function getStore(name: string): Map<string, Bucket> {
  let s = stores.get(name);
  if (!s) {
    s = new Map();
    stores.set(name, s);
  }
  return s;
}

/**
 * Returns `{ allowed: true }` and increments the counter, or `{ allowed: false, retryAfter }`
 * when the bucket is exhausted.
 */
export function rateLimit(
  storeName: string,
  key: string,
  { windowMs, max }: LimiterOptions,
): { allowed: boolean; retryAfter: number } {
  const store = getStore(storeName);
  const now = Date.now();
  const bucket = store.get(key);

  if (!bucket || now - bucket.start >= windowMs) {
    store.set(key, { start: now, count: 1 });
    return { allowed: true, retryAfter: 0 };
  }

  if (bucket.count >= max) {
    return { allowed: false, retryAfter: Math.ceil((bucket.start + windowMs - now) / 1000) };
  }

  bucket.count += 1;
  return { allowed: true, retryAfter: 0 };
}

/** Best-effort caller IP. Works behind Vercel and most reverse proxies. */
export function getClientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  const real = req.headers.get("x-real-ip");
  if (real) return real;
  return "unknown";
}

// Lightweight periodic cleanup so the maps don't grow forever on a hot instance.
const CLEANUP_INTERVAL_MS = 10 * 60 * 1000;
const cleanupTimer: ReturnType<typeof setInterval> | null =
  typeof setInterval === "function"
    ? setInterval(() => {
        const now = Date.now();
        for (const store of stores.values()) {
          for (const [key, bucket] of store) {
            if (now - bucket.start > 60 * 60 * 1000) store.delete(key);
          }
        }
      }, CLEANUP_INTERVAL_MS)
    : null;

if (cleanupTimer && typeof cleanupTimer === "object" && "unref" in cleanupTimer) {
  // Don't keep the process alive in dev for this housekeeping timer.
  (cleanupTimer as unknown as { unref: () => void }).unref();
}
