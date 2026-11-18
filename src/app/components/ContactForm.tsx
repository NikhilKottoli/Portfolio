'use client';

import React, { useRef, useState } from 'react';

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';
type FieldName = 'name' | 'email' | 'message' | 'subject';
type FieldErrors = Partial<Record<FieldName, string>>;

type ContactErrorResponse = {
    error?: {
        fields?: Record<string, string>;
    };
};

const SUCCESS_MESSAGE = 'Message sent — thanks for reaching out!';
const RATE_LIMIT_MESSAGE = 'Too many messages — please try again later.';
const GENERIC_ERROR_MESSAGE = "Couldn't send right now — email me directly.";

const ContactForm = () => {
    const [status, setStatus] = useState<FormStatus>('idle');
    const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
    const [statusMessage, setStatusMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [subject, setSubject] = useState('');
    const [website, setWebsite] = useState('');
    const submissionInFlight = useRef(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (status === 'submitting' || submissionInFlight.current) return;

        submissionInFlight.current = true;
        setStatus('submitting');
        setFieldErrors({});
        setStatusMessage('');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message, subject, website }),
            });

            if (response.status === 200) {
                setStatus('success');
                setStatusMessage(SUCCESS_MESSAGE);
                setName('');
                setEmail('');
                setMessage('');
                setSubject('');
                setWebsite('');
                return;
            }

            if (response.status === 429) {
                setStatus('error');
                setStatusMessage(RATE_LIMIT_MESSAGE);
                return;
            }

            if (response.status === 400) {
                const payload = (await response.json()) as ContactErrorResponse | null;
                const serverFields = payload?.error?.fields;

                if (serverFields) {
                    const nextFieldErrors: FieldErrors = {};
                    const fieldNames: FieldName[] = ['name', 'email', 'message', 'subject'];

                    fieldNames.forEach((fieldName) => {
                        const fieldMessage = serverFields[fieldName];
                        if (fieldMessage) nextFieldErrors[fieldName] = fieldMessage;
                    });

                    setFieldErrors(nextFieldErrors);
                    setStatus('error');
                    setStatusMessage('Please check the highlighted fields.');
                    return;
                }
            }

            setStatus('error');
            setStatusMessage(GENERIC_ERROR_MESSAGE);
        } catch {
            setStatus('error');
            setStatusMessage(GENERIC_ERROR_MESSAGE);
        } finally {
            submissionInFlight.current = false;
        }
    };

    return (
        <div className="pk-panel bg-cream p-5 text-left sm:p-6">
            <div className="mb-5 border-b-2 border-bark pb-4">
                <h3 className="font-pixel-ui text-[0.9rem] uppercase tracking-[0.12em] text-bark">
                    Send a message
                </h3>
                <p className="mt-2 font-body text-[0.9rem] leading-snug text-stone">
                    Leave a note and it will arrive straight in my inbox.
                </p>
            </div>

            <form className="space-y-4" noValidate onSubmit={handleSubmit}>
                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                        <label
                            className="block font-pixel-ui text-[0.62rem] uppercase tracking-[0.14em] text-bark"
                            htmlFor="contact-name"
                        >
                            Name
                        </label>
                        <input
                            aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
                            aria-invalid={Boolean(fieldErrors.name)}
                            autoComplete="name"
                            className="w-full border-2 border-bark bg-cream px-3 py-2 font-body text-bark"
                            id="contact-name"
                            name="name"
                            onChange={(event) => setName(event.target.value)}
                            required
                            type="text"
                            value={name}
                        />
                        {fieldErrors.name ? (
                            <p className="font-body text-[0.8rem] text-berry" id="contact-name-error">
                                {fieldErrors.name}
                            </p>
                        ) : null}
                    </div>

                    <div className="space-y-1.5">
                        <label
                            className="block font-pixel-ui text-[0.62rem] uppercase tracking-[0.14em] text-bark"
                            htmlFor="contact-email"
                        >
                            Email
                        </label>
                        <input
                            aria-describedby={fieldErrors.email ? 'contact-email-error' : undefined}
                            aria-invalid={Boolean(fieldErrors.email)}
                            autoComplete="email"
                            className="w-full border-2 border-bark bg-cream px-3 py-2 font-body text-bark"
                            id="contact-email"
                            name="email"
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            type="email"
                            value={email}
                        />
                        {fieldErrors.email ? (
                            <p className="font-body text-[0.8rem] text-berry" id="contact-email-error">
                                {fieldErrors.email}
                            </p>
                        ) : null}
                    </div>
                </div>

                <div className="space-y-1.5">
                    <div className="flex items-baseline gap-2">
                        <label
                            className="block font-pixel-ui text-[0.62rem] uppercase tracking-[0.14em] text-bark"
                            htmlFor="contact-subject"
                        >
                            Subject
                        </label>
                        <span className="font-body text-[0.75rem] text-stone">(optional)</span>
                    </div>
                    <input
                        aria-describedby={fieldErrors.subject ? 'contact-subject-error' : undefined}
                        aria-invalid={Boolean(fieldErrors.subject)}
                        autoComplete="off"
                        className="w-full border-2 border-bark bg-cream px-3 py-2 font-body text-bark"
                        id="contact-subject"
                        name="subject"
                        onChange={(event) => setSubject(event.target.value)}
                        type="text"
                        value={subject}
                    />
                    {fieldErrors.subject ? (
                        <p className="font-body text-[0.8rem] text-berry" id="contact-subject-error">
                            {fieldErrors.subject}
                        </p>
                    ) : null}
                </div>

                <div className="space-y-1.5">
                    <label
                        className="block font-pixel-ui text-[0.62rem] uppercase tracking-[0.14em] text-bark"
                        htmlFor="contact-message"
                    >
                        Message
                    </label>
                    <textarea
                        aria-describedby={fieldErrors.message ? 'contact-message-error' : undefined}
                        aria-invalid={Boolean(fieldErrors.message)}
                        className="min-h-32 w-full resize-y border-2 border-bark bg-cream px-3 py-2 font-body text-bark"
                        id="contact-message"
                        name="message"
                        onChange={(event) => setMessage(event.target.value)}
                        required
                        value={message}
                    />
                    {fieldErrors.message ? (
                        <p className="font-body text-[0.8rem] text-berry" id="contact-message-error">
                            {fieldErrors.message}
                        </p>
                    ) : null}
                </div>

                <div
                    aria-hidden="true"
                    style={{ position: 'absolute', left: '-9999px', height: 0, overflow: 'hidden' }}
                >
                    <label htmlFor="contact-website">Website</label>
                    <input
                        autoComplete="off"
                        id="contact-website"
                        name="website"
                        onChange={(event) => setWebsite(event.target.value)}
                        tabIndex={-1}
                        type="text"
                        value={website}
                    />
                </div>

                <div className="flex flex-col items-start gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
                    <button
                        className="pk-btn pk-btn-primary px-5 py-3 font-pixel-ui text-[0.64rem] uppercase tracking-[0.16em] disabled:cursor-not-allowed disabled:opacity-60"
                        disabled={status === 'submitting'}
                        type="submit"
                    >
                        Send message
                    </button>

                    <p
                        aria-atomic="true"
                        aria-live="polite"
                        className={`min-h-5 font-body text-[0.85rem] ${status === 'error' ? 'text-berry' : 'text-leaf'}`}
                        role="status"
                    >
                        {statusMessage}
                    </p>
                </div>
            </form>
        </div>
    );
};

export default ContactForm;
