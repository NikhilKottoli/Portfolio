import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../../src/app/page';
import ExperiencePage from '../../src/app/Experience/page';
import ProjectsPage from '../../src/app/Projects/page';
import ContactPage from '../../src/app/Contact/page';
import ResumePage from '../../src/app/resume/page';
import { SoundProvider } from '../../src/app/components/SoundProvider';

vi.mock('next/navigation', () => ({
    useRouter: () => ({ replace: vi.fn() }),
}));

describe('routes', () => {
    it('renders the home page with the hero, the status, the skills and the awards', () => {
        render(<SoundProvider><Home /></SoundProvider>);

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Nikhil');
        expect(screen.getByRole('heading', { level: 2, name: 'Status Report' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: 'Move Set' })).toBeInTheDocument();
    });

    it('renders the experience page', () => {
        render(<SoundProvider><ExperiencePage /></SoundProvider>);

        expect(screen.getByRole('heading', { level: 2, name: 'Journey' })).toBeInTheDocument();
    });

    it('renders the projects list with deep links', () => {
        render(<SoundProvider><ProjectsPage /></SoundProvider>);

        expect(screen.getByRole('heading', { level: 2, name: 'Pokédex' })).toBeInTheDocument();
        expect(screen.getByRole('list', { name: 'Pokédex entries' })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /IRIS ERP/i })).toHaveAttribute(
            'href',
            '/Projects/iris-erp',
        );
    });

    it('renders the contact page', () => {
        render(<SoundProvider><ContactPage /></SoundProvider>);

        expect(screen.getByRole('heading', { level: 2, name: "Let's Connect" })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /CodeChef/i })).toBeInTheDocument();
    });

    it('renders the resume page', () => {
        render(<SoundProvider><ResumePage /></SoundProvider>);

        expect(screen.getByRole('heading', { level: 2, name: 'Nikhil Kottoli' })).toBeInTheDocument();
    });
});
