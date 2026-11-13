import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BentoGrid, BentoGridItem } from '../../src/components/bento-grid';

describe('BentoGrid', () => {
    it('renders its children', () => {
        render(
            <BentoGrid>
                <p>Child</p>
            </BentoGrid>,
        );

        expect(screen.getByText('Child')).toBeInTheDocument();
    });

    it('lays the children out as a grid', () => {
        const { container } = render(
            <BentoGrid>
                <p>Child</p>
            </BentoGrid>,
        );

        expect(container.firstElementChild).toHaveClass('grid', 'md:grid-cols-3');
    });

    it('keeps the class it is given', () => {
        const { container } = render(
            <BentoGrid className="extra">
                <p>Child</p>
            </BentoGrid>,
        );

        expect(container.firstElementChild).toHaveClass('extra');
    });
});

describe('BentoGridItem', () => {
    it('renders the title, the description, the header and the icon', () => {
        render(
            <BentoGridItem
                title="Title"
                description="Description"
                header={<span>Header</span>}
                icon={<span>Icon</span>}
            />,
        );

        expect(screen.getByText('Title')).toBeInTheDocument();
        expect(screen.getByText('Description')).toBeInTheDocument();
        expect(screen.getByText('Header')).toBeInTheDocument();
        expect(screen.getByText('Icon')).toBeInTheDocument();
    });

    it('keeps the class it is given', () => {
        const { container } = render(
            <BentoGridItem
                title="Title"
                description="Description"
                header={<span>Header</span>}
                icon={<span>Icon</span>}
                className="extra"
            />,
        );

        expect(container.firstElementChild).toHaveClass('extra');
    });
});
