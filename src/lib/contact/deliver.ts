/**
 * Delivery of validated contact messages via the Resend HTTP API.
 *
 * Security rules honoured here:
 *   - Upstream error bodies are never read into the response path; thrown
 *     errors carry only an HTTP status code so no upstream text can leak.
 *   - Header-facing values (the subject line) are sanitized against CR/LF
 *     injection before being sent.
 */

import { sanitizeHeader, type ContactPayload } from './validate';

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

export class DeliveryError extends Error {
    readonly status: number;

    constructor(status: number) {
        super('Email delivery failed.');
        this.name = 'DeliveryError';
        this.status = status;
    }
}

export async function deliverContact(payload: ContactPayload): Promise<{ delivered: boolean; id?: string }> {
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey) {
        if (process.env.NODE_ENV !== 'production') {
            console.info('[contact:dev]', payload);
            return { delivered: true };
        }
        throw new DeliveryError(503);
    }

    const response = await fetch(RESEND_ENDPOINT, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        cache: 'no-store',
        body: JSON.stringify({
            from: process.env.CONTACT_FROM_EMAIL || 'Portfolio <onboarding@resend.dev>',
            to: process.env.CONTACT_TO_EMAIL || 'nikhilkottoli2005@gmail.com',
            subject: `New message from ${sanitizeHeader(payload.name).slice(0, 60)}`,
            reply_to: payload.email,
            text: `Name: ${payload.name}\nEmail: ${payload.email}\n\n${payload.message}`,
        }),
    });

    if (!response.ok) {
        throw new DeliveryError(response.status);
    }

    let data: unknown = null;
    try {
        data = await response.json();
    } catch {
        data = null;
    }

    const id =
        data && typeof data === 'object' && 'id' in data && typeof (data as { id?: unknown }).id === 'string'
            ? (data as { id: string }).id
            : undefined;

    return { delivered: true, id };
}
