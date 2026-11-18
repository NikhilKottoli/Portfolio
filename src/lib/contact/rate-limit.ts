/**
 * Rate limiting for the contact endpoint.
 *
 * Two independent limits protect the upstream email provider:
 *   1. A per-key sliding window: at most 5 requests per 10 minutes.
 *   2. A process-wide hourly cap: at most 25 requests per hour.
 *
 * The per-key window always lives in memory. When both UPSTASH_REDIS_REST_URL
 * and UPSTASH_REDIS_REST_TOKEN are configured, the hourly counter is mirrored
 * to Upstash via its REST pipeline endpoint on a best-effort basis: any failure
 * silently falls back to the in-process counter so the endpoint never breaks.
 */

const WINDOW_MS = 10 * 60 * 1000;
const WINDOW_MAX = 5;
const HOURLY_MS = 60 * 60 * 1000;
const HOURLY_MAX = 25;
const UPSTASH_HOURLY_KEY = 'contact:hourly';

export type RateLimitBackend = 'memory' | 'upstash';

export type RateLimitResult = {
    allowed: boolean;
    retryAfterSec: number;
    backend: RateLimitBackend;
};

type Bucket = { times: number[] };

const buckets = new Map<string, Bucket>();

let hourlyCount = 0;
let hourlyWindowStart = 0;
let upstashCount = 0;
let upstashHealthy = false;

function isUpstashConfigured(): boolean {
    return Boolean(process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN);
}

/** Push the in-process hourly counter to Upstash; never throws, never blocks the request path. */
async function syncUpstashCounter(): Promise<void> {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    const restToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    if (!url || !restToken) {
        upstashHealthy = false;
        return;
    }

    try {
        const response = await fetch(`${url.replace(/\/+$/, '')}/pipeline`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${restToken}`, 'Content-Type': 'application/json' },
            cache: 'no-store',
            body: JSON.stringify([
                ['INCR', UPSTASH_HOURLY_KEY],
                ['EXPIRE', UPSTASH_HOURLY_KEY, HOURLY_MS / 1000],
            ]),
        });

        if (!response.ok) {
            upstashHealthy = false;
            return;
        }

        const data = (await response.json()) as { result?: unknown };
        if (Array.isArray(data.result) && typeof data.result[0] === 'number') {
            upstashCount = data.result[0];
            upstashHealthy = true;
        } else {
            upstashHealthy = false;
        }
    } catch (error) {
        console.warn('[contact:rate-limit] Upstash sync failed, using memory backend', error);
        upstashHealthy = false;
    }
}

export function checkRateLimit(key: string): RateLimitResult {
    const now = Date.now();
    let backend: RateLimitBackend = 'memory';

    const bucket = buckets.get(key) ?? { times: [] };
    buckets.set(key, bucket);
    bucket.times = bucket.times.filter((timestamp) => now - timestamp < WINDOW_MS);

    if (now >= hourlyWindowStart + HOURLY_MS) {
        hourlyCount = 0;
        hourlyWindowStart = now;
    }

    let hourlyUsed = hourlyCount;
    if (isUpstashConfigured() && upstashHealthy) {
        hourlyUsed = upstashCount;
        backend = 'upstash';
    }

    if (hourlyUsed >= HOURLY_MAX) {
        const retryAfterSec = Math.max(1, Math.ceil((hourlyWindowStart + HOURLY_MS - now) / 1000));
        return { allowed: false, retryAfterSec, backend };
    }

    if (bucket.times.length >= WINDOW_MAX) {
        const oldest = bucket.times[0] ?? now;
        const retryAfterSec = Math.max(1, Math.ceil((oldest + WINDOW_MS - now) / 1000));
        return { allowed: false, retryAfterSec, backend };
    }

    bucket.times.push(now);
    hourlyCount += 1;
    upstashCount += 1;

    if (isUpstashConfigured()) {
        void syncUpstashCounter();
    }

    return { allowed: true, retryAfterSec: 0, backend };
}

/** Test hook: wipe all limiter state so each test starts from a clean window. */
export function __resetRateLimitForTests(): void {
    buckets.clear();
    hourlyCount = 0;
    hourlyWindowStart = 0;
    upstashCount = 0;
    upstashHealthy = false;
}
