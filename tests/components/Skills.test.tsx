import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Skills from '../../src/app/components/Skills';
import { expectDecorativeImagesAreHidden } from '../helpers/assertions';

const DISCIPLINES = ['Languages', 'Frameworks', 'Databases', 'Developer Tools'];

describe('Skills', () => {
    it('lists every discipline', () => {
        render(<Skills />);

        for (const discipline of DISCIPLINES) {
            expect(screen.getByRole('heading', { level: 3, name: discipline })).toBeInTheDocument();
        }
    });

    it('renders a chip for every skill', () => {
        const { container } = render(<Skills />);

        expect(container.querySelectorAll('.pk-chip')).toHaveLength(22);
    });

    it('reports a total that matches the number of chips', () => {
        const { container } = render(<Skills />);

        const chips = container.querySelectorAll('.pk-chip').length;

        expect(screen.getByText(new RegExp(`${chips} skills`))).toBeInTheDocument();
    });

    it('names the technologies it lists', () => {
        render(<Skills />);

        expect(screen.getByText('Ruby on Rails')).toBeInTheDocument();
        expect(screen.getByText('.NET')).toBeInTheDocument();
        expect(screen.getByText('LangChain')).toBeInTheDocument();
        expect(screen.getByText('Qdrant')).toBeInTheDocument();
    });

    it('hides the decorative logos from assistive technology', () => {
        const { container } = render(<Skills />);

        expectDecorativeImagesAreHidden(container);
    });

    it('uses a unique name for every skill', () => {
        render(<Skills />);

        const names = screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);

        expect(new Set(names).size).toBe(names.length);
    });
});
