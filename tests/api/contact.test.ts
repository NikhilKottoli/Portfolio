/** @vitest-environment node */
// The shared setup (tests/setup.ts) installs a canvas mock and a matchMedia
// stub in beforeAll, both of which dereference browser globals. The node
// environment has neither, so provide minimal stand-ins before those hooks run.
if (typeof globalThis.window === 'undefined') {
    globalThis.window = globalThis as unknown as Window & typeof globalThis;
}
if (typeof globalThis.HTMLCanvasElement === 'undefined') {
    globalThis.HTMLCanvasElement = class HTMLCanvasElement {} as unknown as typeof HTMLCanvasElement;
}

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { POST } from '../../src/app/api/contact/route';
import * as contactRoute from '../../src/app/api/contact/route';
import { __resetRateLimitForTests } from '../../src/lib/contact/rate-limit';

const VALID_BODY = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    message: 'Hello, I would like to work with you.',
    subject: 'Internship',
};

const REQUEST_URL = 'http://localhost/api/contact';
const TEST_RESEND_KEY = 'test-' + 'resend-key';

let fetchMock: ReturnType<typeof vi.fn>;

function buildRequest(body: unknown, headers: Record<string, string> = {}): Request {
    return new Request(REQUEST_URL, {
        method: 'POST',
        headers: { 'content-type': 'application/json', origin: 'http://localhost:3000', ...headers },
        body: typeof body === 'string' ? body : JSON.stringify(body),
    });
}

async function jsonOf(response: Response): Promise<{ ok: boolean; error?: { code: string; message: string; fields?: Record<string, string> }; delivery?: string }> {
    return (await response.json()) as {
        ok: boolean;
        error?: { code: string; message: string; fields?: Record<string, string> };
        delivery?: string;
    };
}

/** Error bodies must be fixed and generic: no keys, hosts or upstream text. */
function expectNoSecrets(raw: string): void {
    expect(raw).not.toContain('test-resend-key');
    expect(raw).not.toContain('RESEND_API_KEY');
    expect(raw).not.toContain('api.resend.com');
    expect(raw).not.toContain('UPSTASH');
}

describe('POST /api/contact', () => {
    beforeEach(() => {
        __resetRateLimitForTests();
        vi.stubEnv('NODE_ENV', 'test');
        vi.stubEnv('RESEND_API_KEY', 'test-resend-key');
        vi.stubEnv('CONTACT_TO_EMAIL', 'nikhilkottoli2005@gmail.com');
        vi.stubEnv('CONTACT_FROM_EMAIL', 'Portfolio <onboarding@resend.dev>');
        vi.stubEnv('CONTACT_ALLOWED_ORIGINS', '');
        vi.stubEnv('VERCEL_URL', '');
        vi.stubEnv('UPSTASH_REDIS_REST_URL', '');
        vi.stubEnv('UPSTASH_REDIS_REST_TOKEN', '');
        vi.spyOn(console, 'info').mockImplementation(() => {});
        vi.spyOn(console, 'error').mockImplementation(() => {});
        vi.spyOn(console, 'warn').mockImplementation(() => {});
        fetchMock = vi.fn();
        vi.stubGlobal('fetch', fetchMock);
    });

    afterEach(() => {
        vi.unstubAllGlobals();
        vi.unstubAllEnvs();
        vi.restoreAllMocks();
    });

    it('delivers a valid message through resend and asserts the payload', async () => {
        fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ id: 're_123' }), { status: 200 }));

        const response = await POST(buildRequest(VALID_BODY));

        expect(response.status).toBe(200);
        const json = await jsonOf(response);
        expect(json.ok).toBe(true);
        expect(json.delivery).toBeUndefined();

        expect(fetchMock).toHaveBeenCalledTimes(1);
        const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
        expect(url).toBe('https://api.resend.com/emails');
        expect(init.method).toBe('POST');
        expect(init.cache).toBe('no-store');
        const headers = init.headers as Record<string, string>;
        expect(headers['Authorization']).toBe('Bearer ' + TEST_RESEND_KEY);
        expect(headers['Content-Type']).toBe('application/json');

        const payload = JSON.parse(String(init.body)) as Record<string, string>;
        expect(payload.from).toBe('Portfolio <onboarding@resend.dev>');
        expect(payload.to).toBe('nikhilkottoli2005@gmail.com');
        expect(payload.subject).toBe('New message from Jane Doe');
        expect(payload.reply_to).toBe('jane.doe@example.com');
        expect(payload.text).toContain('Jane Doe');
        expect(payload.text).toContain('jane.doe@example.com');
        expect(payload.text).toContain('Hello, I would like to work with you.');
    });

    it('trims input, lowercases the email and defaults subject to empty string', async () => {
        fetchMock.mockResolvedValueOnce(new Response(JSON.stringify({ id: 're_9' }), { status: 200 }));

        const response = await POST(
            buildRequest({ name: ' Jane Doe ', email: ' Jane@Example.COM ', message: 'Hello there, this is a valid message.' }),
        );

        expect(response.status).toBe(200);
        const [, init] = fetchMock.mock.calls[0] as [string, RequestInit];
        const payload = JSON.parse(String(init.body)) as Record<string, string>;
        expect(payload.subject).toBe('New message from Jane Doe');
        expect(payload.reply_to).toBe('jane@example.com');
    });

    it('accepts honeypot submissions with 200 and never calls fetch', async () => {
        const response = await POST(
            buildRequest({ name: '', email: 'not-an-email', message: 'short', website: 'http://spam.example.com' }),
        );

        expect(response.status).toBe(200);
        expect(await jsonOf(response)).toEqual({ ok: true });
        expect(fetchMock).not.toHaveBeenCalled();

        // An empty website field is ignored and flows through normal delivery.
        fetchMock.mockResolvedValueOnce({ ok: true, status: 200, json: async () => ({ id: 're_123' }) });
        const clean = await POST(buildRequest({ ...VALID_BODY, website: '' }));
        expect(clean.status).toBe(200);
        expect(fetchMock).toHaveBeenCalledTimes(1);
    });

    it('rejects origins outside the allowlist but always allows localhost and VERCEL_URL in production', async () => {
        vi.stubEnv('CONTACT_ALLOWED_ORIGINS', 'https://example.com');
        fetchMock.mockResolvedValue(new Response('{}', { status: 200 }));

        const blocked = await POST(buildRequest(VALID_BODY, { origin: 'http://evil.example.com' }));
        const blockedRaw = await blocked.clone().text();
        expect(blocked.status).toBe(403);
        const blockedJson = await jsonOf(blocked);
        expect(blockedJson.error?.code).toBe('ORIGIN_REJECTED');
        expectNoSecrets(blockedRaw);
        expect(fetchMock).not.toHaveBeenCalled();

        const local = await POST(buildRequest(VALID_BODY, { origin: 'http://localhost:3000' }));
        expect(local.status).toBe(200);

        vi.stubEnv('CONTACT_ALLOWED_ORIGINS', '');
        vi.stubEnv('NODE_ENV', 'production');
        vi.stubEnv('VERCEL_URL', 'portfolio-abc.vercel.app');

        const vercel = await POST(buildRequest(VALID_BODY, { origin: 'https://portfolio-abc.vercel.app' }));
        expect(vercel.status).toBe(200);

        const evil = await POST(buildRequest(VALID_BODY, { origin: 'https://evil.example.com' }));
        const evilRaw = await evil.clone().text();
        expect(evil.status).toBe(403);
        const evilJson = await jsonOf(evil);
        expect(evilJson.error?.code).toBe('ORIGIN_REJECTED');
        expectNoSecrets(evilRaw);
    });

    it('rejects non-json content types with 415', async () => {
        const response = await POST(
            new Request(REQUEST_URL, {
                method: 'POST',
                headers: { 'content-type': 'text/plain', origin: 'http://localhost:3000' },
                body: 'hello',
            }),
        );

        expect(response.status).toBe(415);
        const json = await jsonOf(response);
        expect(json.error?.code).toBe('UNSUPPORTED_MEDIA_TYPE');
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it('rejects bodies larger than 10KB using the declared content-length', async () => {
        const oversized = JSON.stringify({ name: 'Jane Doe', email: 'jane@example.com', message: 'x'.repeat(10001) });
        const response = await POST(buildRequest(oversized));

        expect(response.status).toBe(413);
        const json = await jsonOf(response);
        expect(json.error?.code).toBe('PAYLOAD_TOO_LARGE');
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it('rejects bodies larger than 10KB even without a content-length header', async () => {
        const oversized = JSON.stringify({ name: 'Jane Doe', email: 'jane@example.com', message: 'x'.repeat(10001) });
        const stream = new ReadableStream({
            start(controller) {
                controller.enqueue(new TextEncoder().encode(oversized));
                controller.close();
            },
        });
        const init = {
            method: 'POST',
            headers: { 'content-type': 'application/json', origin: 'http://localhost:3000' },
            body: stream,
            duplex: 'half',
        } as RequestInit & { duplex: string };
        const response = await POST(new Request(REQUEST_URL, init));

        expect(response.status).toBe(413);
        const json = await jsonOf(response);
        expect(json.error?.code).toBe('PAYLOAD_TOO_LARGE');
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it('rejects unparseable bodies with 400 INVALID_JSON', async () => {
        const response = await POST(buildRequest('not-json{'));

        expect(response.status).toBe(400);
        const json = await jsonOf(response);
        expect(json.error?.code).toBe('INVALID_JSON');
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it('exposes only POST, so GET is answered with 405 by the framework', () => {
        expect(contactRoute.runtime).toBe('nodejs');
        expect(typeof contactRoute.POST).toBe('function');
        const httpVerbs = contactRoute as unknown as Record<string, unknown>;
        expect(httpVerbs.GET).toBeUndefined();
        expect(httpVerbs.PUT).toBeUndefined();
        expect(httpVerbs.PATCH).toBeUndefined();
        expect(httpVerbs.DELETE).toBeUndefined();
        expect(httpVerbs.HEAD).toBeUndefined();
        expect(httpVerbs.OPTIONS).toBeUndefined();
    });

    it('reports every invalid field in error.fields', async () => {
        const response = await POST(
            buildRequest({ name: '', email: 'not-an-email', message: 'short', subject: 's'.repeat(121) }),
        );
        const raw = await response.clone().text();

        expect(response.status).toBe(400);
        const json = await jsonOf(response);
        expect(json.error?.code).toBe('VALIDATION_FAILED');
        expect(Object.keys(json.error?.fields ?? {}).sort()).toEqual(['email', 'message', 'name', 'subject']);
        for (const [field, reason] of Object.entries(json.error?.fields ?? {})) {
            expect(field).toBeTruthy();
            expect(typeof reason).toBe('string');
            expect(reason.length).toBeGreaterThan(0);
        }
        expectNoSecrets(raw);
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it('rejects fields whose UTF-8 byte length exceeds the character limit', async () => {
        const response = await POST(buildRequest({ ...VALID_BODY, name: 'é'.repeat(80) }));

        expect(response.status).toBe(400);
        const json = await jsonOf(response);
        expect(json.error?.code).toBe('VALIDATION_FAILED');
        expect(json.error?.fields?.name).toBeTruthy();
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it('denies the sixth request inside the window with 429 and Retry-After', async () => {
        fetchMock.mockResolvedValue(new Response(JSON.stringify({ id: 're_1' }), { status: 200 }));

        for (let attempt = 0; attempt < 5; attempt += 1) {
            const response = await POST(buildRequest(VALID_BODY));
            expect(response.status).toBe(200);
        }

        const limited = await POST(buildRequest(VALID_BODY));
        const limitedRaw = await limited.clone().text();
        expect(limited.status).toBe(429);

        const retryAfter = limited.headers.get('Retry-After');
        expect(retryAfter).not.toBeNull();
        expect(Number(retryAfter)).toBeGreaterThan(0);

        const json = await jsonOf(limited);
        expect(json.error?.code).toBe('RATE_LIMITED');
        expectNoSecrets(limitedRaw);
        expect(fetchMock).toHaveBeenCalledTimes(5);
    });

    it('keys the sliding window separately per hashed client ip', async () => {
        fetchMock.mockResolvedValue(new Response('{}', { status: 200 }));

        for (let attempt = 0; attempt < 5; attempt += 1) {
            const response = await POST(buildRequest(VALID_BODY, { 'x-forwarded-for': '203.0.113.7, proxy' }));
            expect(response.status).toBe(200);
        }

        const otherIp = await POST(buildRequest(VALID_BODY, { 'x-forwarded-for': '198.51.100.9' }));
        expect(otherIp.status).toBe(200);
    });

    it('returns 503 NOT_CONFIGURED in production without a resend key', async () => {
        vi.stubEnv('RESEND_API_KEY', '');
        vi.stubEnv('NODE_ENV', 'production');

        const response = await POST(buildRequest(VALID_BODY));
        const raw = await response.clone().text();

        expect(response.status).toBe(503);
        const json = await jsonOf(response);
        expect(json.error?.code).toBe('NOT_CONFIGURED');
        expectNoSecrets(raw);
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it('simulates delivery in development without a key', async () => {
        vi.stubEnv('RESEND_API_KEY', '');

        const response = await POST(buildRequest(VALID_BODY));

        expect(response.status).toBe(200);
        const json = await jsonOf(response);
        expect(json.ok).toBe(true);
        expect(json.delivery).toBe('dev');
        expect(console.info).toHaveBeenCalledWith('[contact:dev]', expect.objectContaining({ name: 'Jane Doe' }));
        expect(fetchMock).not.toHaveBeenCalled();
    });

    it('maps upstream failures to 502 without leaking upstream text or secrets', async () => {
        fetchMock.mockResolvedValueOnce(new Response('boom: secret upstream internals', { status: 500 }));

        const response = await POST(buildRequest(VALID_BODY));
        const raw = await response.clone().text();

        expect(response.status).toBe(502);
        const json = await jsonOf(response);
        expect(json.error?.code).toBe('DELIVERY_FAILED');

        expect(raw).not.toContain('boom');
        expect(raw).not.toContain('secret upstream internals');
        expectNoSecrets(raw);
    });
});
