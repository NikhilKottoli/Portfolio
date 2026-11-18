/**
 * Contact API route.
 *
 * Guard order matters and is fixed:
 *   (a) Origin allowlist          -> 403 ORIGIN_REJECTED
 *   (b) JSON content type         -> 415 UNSUPPORTED_MEDIA_TYPE
 *   (c) Declared content-length   -> 413 PAYLOAD_TOO_LARGE
 *   (d) Actual body length        -> 413 PAYLOAD_TOO_LARGE
 *   (e) JSON parsing              -> 400 INVALID_JSON
 *   (f) Honeypot field            -> 200 without delivering
 *   (g) Field validation          -> 400 VALIDATION_FAILED (+ error.fields)
 *   (h) Rate limit by hashed IP   -> 429 RATE_LIMITED (+ Retry-After)
 *   (i) Delivery                  -> 200 | 502 DELIVERY_FAILED | 503 NOT_CONFIGURED
 *
 * Only POST is exported, so any other method is answered with 405 by the
 * framework. Error bodies are fixed and generic; correlation details are
 * logged server-side only.
 */

import { createHash } from 'node:crypto';
import { deliverContact, DeliveryError } from '../../../lib/contact/deliver';
import { checkRateLimit } from '../../../lib/contact/rate-limit';
import { validateContact } from '../../../lib/contact/validate';

export const runtime = 'nodejs';

const MAX_BODY_CHARS = 10000;

type ErrorJson = {
    ok: false;
    error: { code: string; message: string; fields?: Record<string, string> };
};

function errorResponse(code: string, message: string, status: number, fields?: Record<string, string>): Response {
    const error: ErrorJson['error'] = fields ? { code, message, fields } : { code, message };
    return Response.json({ ok: false, error }, { status });
}

function isLocalhostHostname(hostname: string): boolean {
    return hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '[::1]';
}

function isOriginAllowed(origin: string): boolean {
    let hostname: string;
    try {
        hostname = new URL(origin).hostname;
    } catch {
        return false;
    }

    if (isLocalhostHostname(hostname)) return true;

    const configured = process.env.CONTACT_ALLOWED_ORIGINS;
    if (configured) {
        return configured
            .split(',')
            .map((entry) => entry.trim())
            .filter(Boolean)
            .some((entry) => {
                try {
                    return new URL(entry).origin === origin;
                } catch {
                    return entry === origin;
                }
            });
    }

    if (process.env.NODE_ENV === 'production') {
        const vercelUrl = process.env.VERCEL_URL;
        if (!vercelUrl) return false;
        const host = vercelUrl.replace(/^https?:\/\//, '').replace(/\/+$/, '');
        return hostname === host;
    }

    return false;
}

function clientIp(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for');
    if (!forwarded) return 'unknown';
    return forwarded.split(',')[0].trim();
}

export async function POST(incoming: Request): Promise<Response> {
    // (a) Origin allowlist.
    const origin = incoming.headers.get('origin');
    if (origin && !isOriginAllowed(origin)) {
        return errorResponse('ORIGIN_REJECTED', 'Request origin is not allowed.', 403);
    }

    // (b) Content-Type must be JSON.
    const contentType = incoming.headers.get('content-type') ?? '';
    if (!contentType.includes('application/json')) {
        return errorResponse('UNSUPPORTED_MEDIA_TYPE', 'Content type must be application/json.', 415);
    }

    // (c) Declared body size.
    const contentLength = Number(incoming.headers.get('content-length') ?? 0);
    if (contentLength > MAX_BODY_CHARS) {
        return errorResponse('PAYLOAD_TOO_LARGE', 'Payload too large.', 413);
    }

    // (d) Actual body size.
    const text = await incoming.text();
    if (text.length > MAX_BODY_CHARS) {
        return errorResponse('PAYLOAD_TOO_LARGE', 'Payload too large.', 413);
    }

    // (e) JSON parsing.
    let parsed: unknown;
    try {
        parsed = JSON.parse(text);
    } catch {
        return errorResponse('INVALID_JSON', 'Request body must be valid JSON.', 400);
    }

    // (f) Honeypot: bots fill the hidden website field; answer as if it worked.
    const candidate = (parsed !== null && typeof parsed === 'object' ? parsed : {}) as Record<string, unknown>;
    if (typeof candidate.website === 'string' && candidate.website !== '') {
        return Response.json({ ok: true }, { status: 200 });
    }

    // (g) Field validation.
    const validation = validateContact(candidate);
    if ('fields' in validation) {
        return errorResponse('VALIDATION_FAILED', 'Validation failed.', 400, validation.fields);
    }

    // (h) Rate limit keyed by the hashed client IP.
    const ip = clientIp(incoming);
    const limitKey = createHash('sha256').update(ip).digest('hex');
    const limit = checkRateLimit(limitKey);
    if (!limit.allowed) {
        return Response.json(
            { ok: false, error: { code: 'RATE_LIMITED', message: 'Too many requests.' } },
            { status: 429, headers: { 'Retry-After': String(limit.retryAfterSec) } },
        );
    }

    // (i) Delivery.
    try {
        await deliverContact(validation.value);
        const body: { ok: true; delivery?: string } = { ok: true };
        if (!process.env.RESEND_API_KEY && process.env.NODE_ENV !== 'production') {
            body.delivery = 'dev';
        }
        return Response.json(body, { status: 200 });
    } catch (error) {
        const status = error instanceof DeliveryError ? error.status : 502;
        const code = status === 503 ? 'NOT_CONFIGURED' : 'DELIVERY_FAILED';
        console.error('[contact] delivery failure', { code, status, ip });
        if (status === 503) {
            return errorResponse('NOT_CONFIGURED', 'Delivery service is not configured.', 503);
        }
        return errorResponse('DELIVERY_FAILED', 'Delivery failed.', 502);
    }
}
