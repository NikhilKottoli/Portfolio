import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Contact from '../../src/app/components/Contact';
import { expectKnownExternalLinks, expectSafeExternalLinks } from '../helpers/assertions';

describe('Contact', () => {
    it('links to every profile', () => {
        render(<Contact />);

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
        render(<Contact />);

        const github = screen.getByRole('link', { name: /GitHub/i });
        expect(github).toHaveAttribute('target', '_blank');
        expect(github).toHaveAttribute('rel', 'noopener noreferrer');

        expect(screen.getByRole('link', { name: /Email/i })).not.toHaveAttribute('target');
    });

    it('shows the email address', () => {
        render(<Contact />);

        expect(screen.getByText('nikhilkottoli2005@gmail.com')).toBeInTheDocument();
    });

    it('keeps every external link safe', () => {
        const { container } = render(<Contact />);

        expectSafeExternalLinks(container);
        expectKnownExternalLinks(container);
    });
});
