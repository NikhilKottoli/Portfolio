import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import FeaturedInfo from '../../src/app/components/FeaturedInfo';
import { expectKnownExternalLinks, expectSafeExternalLinks } from '../helpers/assertions';

describe('FeaturedInfo', () => {
    it('reports the current status', () => {
        render(<FeaturedInfo />);

        expect(screen.getByRole('heading', { name: 'Current Status' })).toBeInTheDocument();
        expect(screen.getByText('Software Engineering Intern')).toBeInTheDocument();
        expect(screen.getAllByText('Microsoft — Extensions Security').length).toBeGreaterThan(0);
    });

    it('lists the recent adventures', () => {
        render(<FeaturedInfo />);

        expect(screen.getByRole('heading', { name: 'Recent Adventures' })).toBeInTheDocument();
        expect(screen.getByText('ETH Global Mumbai 2026')).toBeInTheDocument();
        expect(screen.getByText('Upstream contributions')).toBeInTheDocument();
    });

    it('previews a handful of projects', () => {
        render(<FeaturedInfo />);

        expect(screen.getByRole('heading', { name: 'Featured Projects' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'RupeeRail' })).toBeInTheDocument();
        expect(screen.getAllByRole('link', { name: /explore project/i })).toHaveLength(3);
    });

    it('keeps every external link safe', () => {
        const { container } = render(<FeaturedInfo />);

        expectSafeExternalLinks(container);
        expectKnownExternalLinks(container);
    });
});
