import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import HeroSection from '../../src/app/components/HeroSection';
import { expectKnownExternalLinks, expectSafeExternalLinks } from '../helpers/assertions';

describe('HeroSection', () => {
    it('introduces the developer by name', () => {
        render(<HeroSection />);

        const heading = screen.getByRole('heading', { level: 1 });

        expect(heading).toHaveTextContent('Nikhil');
        expect(heading).toHaveTextContent('Kottoli');
    });

    it('states the role and the university', () => {
        render(<HeroSection />);

        expect(screen.getByText('Software Engineering Intern at Microsoft')).toBeInTheDocument();
        expect(screen.getAllByText(/NITK Surathkal/).length).toBeGreaterThan(0);
    });

    it('shows the trainer card with the details that identify him', () => {
        render(<HeroSection />);

        const card = screen.getByLabelText('Trainer card');

        expect(card).toHaveTextContent('Trainer Card');
        expect(card).toHaveTextContent('No. 2048');
        expect(card).toHaveTextContent('Surathkal, Karnataka, India');
    });

    it('opens with a dialogue box that carries the whole line', () => {
        render(<HeroSection />);

        expect(
            screen.getByText(
                "Hey there! I'm Nikhil. I'm a software engineer who enjoys building systems, exploring new technologies, and contributing to open source.",
            ),
        ).toBeInTheDocument();
    });

    it('links to the primary destinations', () => {
        render(<HeroSection />);

        expect(screen.getByRole('link', { name: /view my projects/i })).toHaveAttribute(
            'href',
            '/Projects',
        );
        expect(screen.getByRole('link', { name: /download resume/i })).toHaveAttribute(
            'href',
            '/resume',
        );
    });

    it('links to each profile', () => {
        render(<HeroSection />);

        expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
            'href',
            'https://github.com/NikhilKottoli',
        );
        expect(screen.getByRole('link', { name: 'LinkedIn' })).toHaveAttribute(
            'href',
            'https://www.linkedin.com/in/nikhil-kottoli-92552128a/',
        );
        expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute(
            'href',
            'mailto:nikhilkottoli2005@gmail.com',
        );
    });

    it('opens remote profiles in a new tab but not the mail client', () => {
        render(<HeroSection />);

        const github = screen.getByRole('link', { name: 'GitHub' });
        expect(github).toHaveAttribute('target', '_blank');
        expect(github).toHaveAttribute('rel', 'noopener noreferrer');

        expect(screen.getByRole('link', { name: 'Email' })).not.toHaveAttribute('target');
    });

    it('keeps every external link safe', () => {
        const { container } = render(<HeroSection />);

        expectSafeExternalLinks(container);
        expectKnownExternalLinks(container);
    });

    it('hides the decorative scenery from assistive technology', () => {
        const { container } = render(<HeroSection />);

        const scenery = container.querySelector('[aria-hidden="true"]');

        expect(scenery).toBeInTheDocument();
    });
});
