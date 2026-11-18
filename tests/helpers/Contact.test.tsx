import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '../../src/app/components/Contact';
import { expectKnownExternalLinks, expectSafeExternalLinks } from '../helpers/assertions';
import { SoundProvider } from '../../src/app/components/SoundProvider';

const fetchMock = vi.fn();

describe('Contact', () => {
    it('links to every profile', () => {
        render(<SoundProvider><Contact /></SoundProvider>);

        expect(screen.getByRole('link', { name: /GitHub/i })).toHaveAttribute('href', 'https://github.com/NikhilKottoli');
        expect(screen.getByRole('link', { name: /LinkedIn/i })).toHaveAttribute(
            'href',
            'https://www.linkedin.com/in/nikhil-kottoli-92552128a/',
        );
        expect(screen.getByRole('link', { name: /Email/i })).toHaveAttribute(
            'href',
            'mailto:nikhilkottoli2005@gmail.com',
        );
        expect(screen.getByRole('link', { name: /CodeChef/i })).toHaveAttribute(
            'href',
            'https://www.codechef.com/users/nikhil_k0tt0li',
        );
    });

    it('opens remote profiles in a new tab but not the mail client', () => {
        render(<SoundProvider><Contact /></SoundProvider>);

        const github = screen.getByRole('link', { name: /GitHub/i });
        expect(github).toHaveAttribute('target', '_blank');
        expect(github).toHaveAttribute('rel', 'noopener noreferrer');

        expect(screen.getByRole('link', { name: /Email/i })).not.toHaveAttribute('target');
    });

    it('shows the email address', () => {
        render(<SoundProvider><Contact /></SoundProvider>);

        expect(screen.getByText('nikhilkottoli2005@gmail.com')).toBeInTheDocument();
    });

    it('keeps every external link safe', () => {
        const { container } = render(<SoundProvider><Contact /></SoundProvider>);

        expectSafeExternalLinks(container);
        expectKnownExternalLinks(container);
    });

    describe('contact form', () => {
        beforeEach(() => {
            fetchMock.mockReset();
            vi.stubGlobal('fetch', fetchMock);
        });

        afterEach(() => {
            vi.unstubAllGlobals();
        });

        it('submits the form and shows a success message', async () => {
            fetchMock.mockResolvedValueOnce({
                status: 200,
                json: async () => ({ ok: true }),
            });
            const user = userEvent.setup();
            render(<SoundProvider><Contact /></SoundProvider>);

            await user.type(screen.getByLabelText('Name'), 'Ash Ketchum');
            await user.type(screen.getByLabelText('Email'), 'ash@example.com');
            await user.type(screen.getByLabelText('Subject'), 'A new adventure');
            await user.type(screen.getByLabelText('Message'), 'I would like to talk about a new project.');
            await user.click(screen.getByRole('button', { name: 'Send message' }));

            await waitFor(() => {
                expect(screen.getByText('Message sent — thanks for reaching out!')).toBeInTheDocument();
            });
            expect(fetchMock).toHaveBeenCalledWith('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: 'Ash Ketchum',
                    email: 'ash@example.com',
                    message: 'I would like to talk about a new project.',
                    subject: 'A new adventure',
                    website: '',
                }),
            });
        });

        it('shows a retry message when too many messages are sent', async () => {
            fetchMock.mockResolvedValueOnce({
                status: 429,
                json: async () => ({ ok: false }),
            });
            const user = userEvent.setup();
            render(<SoundProvider><Contact /></SoundProvider>);

            await user.type(screen.getByLabelText('Name'), 'Ash Ketchum');
            await user.type(screen.getByLabelText('Email'), 'ash@example.com');
            await user.type(screen.getByLabelText('Message'), 'I would like to talk about a new project.');
            await user.click(screen.getByRole('button', { name: 'Send message' }));

            await waitFor(() => {
                expect(screen.getByText('Too many messages — please try again later.')).toBeInTheDocument();
            });
        });

        it('shows field errors returned by the endpoint', async () => {
            fetchMock.mockResolvedValueOnce({
                status: 400,
                json: async () => ({
                    ok: false,
                    error: { fields: { email: 'Enter a valid email address.' } },
                }),
            });
            const user = userEvent.setup();
            render(<SoundProvider><Contact /></SoundProvider>);

            await user.type(screen.getByLabelText('Name'), 'Ash Ketchum');
            await user.type(screen.getByLabelText('Email'), 'not-an-email');
            await user.type(screen.getByLabelText('Message'), 'I would like to talk about a new project.');
            await user.click(screen.getByRole('button', { name: 'Send message' }));

            expect(await screen.findByText('Enter a valid email address.')).toBeInTheDocument();
            expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
        });

        it('disables the submit button while the request is in flight', async () => {
            fetchMock.mockImplementationOnce(() => new Promise(() => undefined));
            const user = userEvent.setup();
            render(<SoundProvider><Contact /></SoundProvider>);

            await user.type(screen.getByLabelText('Name'), 'Ash Ketchum');
            await user.type(screen.getByLabelText('Email'), 'ash@example.com');
            await user.type(screen.getByLabelText('Message'), 'I would like to talk about a new project.');
            const submitButton = screen.getByRole('button', { name: 'Send message' });

            await user.click(submitButton);

            expect(submitButton).toBeDisabled();
            expect(fetchMock).toHaveBeenCalledTimes(1);
        });
    });
});
