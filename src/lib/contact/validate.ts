/**
 * Validation helpers for the contact endpoint.
 *
 * Every rule is deliberately strict and side-effect free so the same logic can
 * be unit tested without HTTP. Error messages are fixed and generic: they are
 * safe to return to the client and never echo the submitted input back.
 */

export type ContactPayload = {
    name: string;
    email: string;
    message: string;
    subject: string;
};

const NAME_MAX_CHARS = 80;
const EMAIL_MAX_CHARS = 254;
const MESSAGE_MIN_CHARS = 10;
const MESSAGE_MAX_CHARS = 5000;
const SUBJECT_MAX_CHARS = 120;

const CONTROL_CHARS = /[\x00-\x1F\x7F]/g;

const encoder = new TextEncoder();

/** Strip CR/LF, tabs and every other ASCII control character (header injection defence). */
export function sanitizeHeader(value: string): string {
    return value.replace(CONTROL_CHARS, '');
}

function byteLength(value: string): number {
    return encoder.encode(value).length;
}

function asTrimmedString(input: unknown): string {
    return typeof input === 'string' ? input.trim() : '';
}

/**
 * An email is valid when it is non-empty, within 254 characters (by char count
 * and by UTF-8 byte length), contains exactly one '@', and the domain part
 * after the '@' contains at least one dot.
 */
function isValidEmail(email: string): boolean {
    if (email.length < 1 || email.length > EMAIL_MAX_CHARS) return false;
    if (byteLength(email) > EMAIL_MAX_CHARS) return false;

    const firstAt = email.indexOf('@');
    if (firstAt < 0) return false;
    if (email.indexOf('@', firstAt + 1) !== -1) return false;

    const local = email.slice(0, firstAt);
    const domain = email.slice(firstAt + 1);
    if (local.length < 1) return false;
    if (!domain.includes('.')) return false;

    return true;
}

export type ContactValidationResult = { ok: true; value: ContactPayload } | { ok: false; fields: Record<string, string> };

export function validateContact(input: unknown): ContactValidationResult {
    const fields: Record<string, string> = {};

    const raw = (typeof input === 'object' && input !== null ? input : {}) as Record<string, unknown>;

    const name = asTrimmedString(raw.name);
    const email = asTrimmedString(raw.email).toLowerCase();
    const message = asTrimmedString(raw.message);
    const subject = asTrimmedString(raw.subject);

    if (name.length < 1 || name.length > NAME_MAX_CHARS || byteLength(name) > NAME_MAX_CHARS) {
        fields.name = 'Name must be between 1 and 80 characters.';
    }

    if (!isValidEmail(email)) {
        fields.email = 'Enter a valid email address.';
    }

    if (
        message.length < MESSAGE_MIN_CHARS ||
        message.length > MESSAGE_MAX_CHARS ||
        byteLength(message) > MESSAGE_MAX_CHARS
    ) {
        fields.message = 'Message must be between 10 and 5000 characters.';
    }

    if (subject.length > SUBJECT_MAX_CHARS || byteLength(subject) > SUBJECT_MAX_CHARS) {
        fields.subject = 'Subject must be at most 120 characters.';
    }

    if (Object.keys(fields).length > 0) {
        return { ok: false, fields };
    }

    return { ok: true, value: { name, email, message, subject } };
}
