import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../../src/app/page';
import ExperiencePage from '../../src/app/Experience/page';
import ProjectsPage from '../../src/app/Projects/page';
import ContactPage from '../../src/app/Contact/page';
import ResumePage from '../../src/app/resume/page';
import { SoundProvider } from '../../src/app/components/SoundProvider';

describe('routes', () => {
    it('renders the home page with the hero, the status, the skills and the awards', () => {
        render(<SoundProvider><Home /></SoundProvider>);

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Nikhil');
        expect(screen.getByRole('heading', { level: 2, name: 'Status Report' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: 'Technical Arsenal' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: 'Honors & Awards' })).toBeInTheDocument();
    });

    it('renders the experience page', () => {
        render(<SoundProvider><ExperiencePage /></SoundProvider>);

        expect(screen.getByRole('heading', { level: 2, name: 'Journey' })).toBeInTheDocument();
    });

    it('renders the projects page', () => {
        render(<SoundProvider><ProjectsPage /></SoundProvider>);

        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toHaveTextContent('Pokédex');
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
