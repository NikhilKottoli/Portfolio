import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import SiteFooter from '../../src/app/components/SiteFooter';

describe('SiteFooter', () => {
    it('credits the maker', () => {
        render(<SiteFooter />);

        expect(screen.getByText('Nikhil Kottoli')).toBeInTheDocument();
        expect(screen.getByText(/NITK Surathkal/)).toBeInTheDocument();
    });

    it('shows the current year', () => {
        render(<SiteFooter />);

        expect(screen.getByText(new RegExp(`© ${new Date().getFullYear()}`))).toBeInTheDocument();
    });

    it('offers a way back to the top of the page', () => {
        render(<SiteFooter />);

        expect(screen.getByRole('link', { name: /back to home/i })).toHaveAttribute('href', '/');
    });

    it('repeats every destination so the footer is a second way in', () => {
        render(<SiteFooter />);

        expect(screen.getByRole('link', { name: 'POKÉDEX' })).toHaveAttribute('href', '/Projects');
        expect(screen.getByRole('link', { name: 'INVENTORY' })).toHaveAttribute('href', '/Inventory');
        expect(screen.getByRole('link', { name: 'BADGES' })).toHaveAttribute('href', '/Badges');
        expect(screen.getByRole('link', { name: 'JOURNEY' })).toHaveAttribute('href', '/Experience');
        expect(screen.getByRole('link', { name: 'CONTACT' })).toHaveAttribute('href', '/Contact');
    });
});
