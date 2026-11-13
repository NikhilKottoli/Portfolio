import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from '../../src/app/page';
import ExperiencePage from '../../src/app/Experience/page';
import ProjectsPage from '../../src/app/Projects/page';
import ContactPage from '../../src/app/Contact/page';
import ResumePage from '../../src/app/resume/page';

describe('routes', () => {
    it('renders the home page with the hero, the status, the skills and the awards', () => {
        render(<Home />);

        expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Nikhil');
        expect(screen.getByRole('heading', { level: 2, name: 'Status Report' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: 'Technical Arsenal' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: 'Honors & Awards' })).toBeInTheDocument();
    });

    it('renders the experience page', () => {
        render(<ExperiencePage />);

        expect(screen.getByRole('heading', { level: 2, name: 'Journey' })).toBeInTheDocument();
    });

    it('renders the projects page', () => {
        render(<ProjectsPage />);

        const heading = screen.getByRole('heading', { level: 2 });
        expect(heading).toHaveTextContent('Pokédex');
    });

    it('renders the contact page', () => {
        render(<ContactPage />);

        expect(screen.getByRole('heading', { level: 2, name: "Let's Connect" })).toBeInTheDocument();
        expect(screen.getByRole('link', { name: /CodeChef/i })).toBeInTheDocument();
    });

    it('renders the resume page', () => {
        render(<ResumePage />);

        expect(screen.getByRole('heading', { level: 2, name: 'Nikhil Kottoli' })).toBeInTheDocument();
    });
});
