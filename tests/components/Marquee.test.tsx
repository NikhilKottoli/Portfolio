import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import Marquee from '../../src/components/Marquee';

describe('Marquee', () => {
    it('renders the children once', () => {
        render(
            <Marquee>
                <span>Item</span>
            </Marquee>,
        );

        expect(screen.getAllByText('Item')).toHaveLength(1);
    });

    it('repeats the children when asked', () => {
        render(
            <Marquee repeat={3}>
                <span>Item</span>
            </Marquee>,
        );

        expect(screen.getAllByText('Item')).toHaveLength(3);
    });

    it('scrolls along the row by default', () => {
        const { container } = render(
            <Marquee>
                <span>Item</span>
            </Marquee>,
        );

        expect(container.firstElementChild).toHaveClass('flex-row');
        expect(container.querySelector('.animate-marquee')).toBeInTheDocument();
    });

    it('scrolls down the column when asked', () => {
        const { container } = render(
            <Marquee vertical>
                <span>Item</span>
            </Marquee>,
        );

        expect(container.firstElementChild).toHaveClass('flex-col');
        expect(container.querySelector('.animate-marquee-vertical')).toBeInTheDocument();
    });

    it('pauses on hover by default', () => {
        const { container } = render(
            <Marquee>
                <span>Item</span>
            </Marquee>,
        );

        expect(container.querySelector('.animate-marquee')?.className).toContain('group-hover');
    });

    it('keeps moving on hover when pausing is turned off', () => {
        const { container } = render(
            <Marquee pauseOnHover={false}>
                <span>Item</span>
            </Marquee>,
        );

        expect(container.querySelector('.animate-marquee')?.className).not.toContain('group-hover');
    });

    it('reverses the direction when asked', () => {
        const { container } = render(
            <Marquee reverse>
                <span>Item</span>
            </Marquee>,
        );

        expect(container.querySelector('.animate-marquee')?.className).toContain('reverse');
    });
});
