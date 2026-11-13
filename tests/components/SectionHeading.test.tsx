import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import SectionHeading from '../../src/app/components/SectionHeading';

describe('SectionHeading', () => {
    it('renders the eyebrow, the title and the description', () => {
        render(
            <SectionHeading
                eyebrow="The Wanderer's Arsenal"
                title="Technical Arsenal"
                description="The languages and tools I use to build software."
            />,
        );

        expect(screen.getByText("The Wanderer's Arsenal")).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 2, name: 'Technical Arsenal' })).toBeInTheDocument();
        expect(screen.getByText('The languages and tools I use to build software.')).toBeInTheDocument();
    });

    it('leaves out the description when there is none', () => {
        const { container } = render(<SectionHeading eyebrow="Eyebrow" title="Title" />);

        expect(container.querySelectorAll('p')).toHaveLength(0);
    });

    it('lines the heading up on the left by default', () => {
        const { container } = render(<SectionHeading eyebrow="Eyebrow" title="Title" />);

        expect(container.firstElementChild?.className).not.toContain('items-center');
    });

    it('centres the heading when it is asked to', () => {
        const { container } = render(<SectionHeading eyebrow="Eyebrow" title="Title" align="center" />);

        expect(container.firstElementChild?.className).toContain('items-center');
        expect(container.firstElementChild?.className).toContain('text-center');
    });

    it('renders an optional action', () => {
        render(<SectionHeading eyebrow="Eyebrow" title="Title" action={<span>22 skills</span>} />);

        expect(screen.getByText('22 skills')).toBeInTheDocument();
    });

    it('renders a title that is not a plain string', () => {
        render(<SectionHeading eyebrow="Eyebrow" title={<span>Nested title</span>} />);

        expect(screen.getByRole('heading', { level: 2, name: 'Nested title' })).toBeInTheDocument();
    });
});
