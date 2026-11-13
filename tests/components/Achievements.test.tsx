import { describe, expect, it } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Achievements from '../../src/app/components/Achievements';
import { expectImagesHaveAltText, expectKnownExternalLinks, expectSafeExternalLinks } from '../helpers/assertions';

describe('Achievements', () => {
    it('lists every award', () => {
        render(<Achievements />);

        expect(screen.getByRole('heading', { level: 3, name: 'ETH Global Mumbai 2026' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 3, name: 'NEARCON Innovation Sandbox' })).toBeInTheDocument();
        expect(screen.getByRole('heading', { level: 3, name: 'Polkadot AssetHub 2025' })).toBeInTheDocument();
    });

    it('uses a unique title for every award', () => {
        render(<Achievements />);

        const titles = screen.getAllByRole('heading', { level: 3 }).map((heading) => heading.textContent);

        expect(new Set(titles).size).toBe(titles.length);
    });

    it('shows the prize and the position that were won', () => {
        render(<Achievements />);

        expect(screen.getByText(/\$7,000 USDC prize/)).toBeInTheDocument();
        expect(screen.getByText('Finalist · Arc Track')).toBeInTheDocument();
    });

    it('opens an award when it is selected', async () => {
        const user = userEvent.setup();
        render(<Achievements />);

        await user.click(screen.getByRole('heading', { level: 3, name: 'ETH Global Mumbai 2026' }));

        const dialog = screen.getByRole('dialog');

        expect(dialog).toHaveAttribute('aria-modal', 'true');
        expect(dialog).toHaveAttribute('aria-label', 'ETH Global Mumbai 2026');
        expect(within(dialog).getByText('ETH Global')).toBeInTheDocument();
    });

    it('closes an award with the escape key', async () => {
        const user = userEvent.setup();
        render(<Achievements />);

        await user.click(screen.getByRole('heading', { level: 3, name: 'ETH Global Mumbai 2026' }));
        expect(screen.getByRole('dialog')).toBeInTheDocument();

        await user.keyboard('{Escape}');

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('closes an award with the close button', async () => {
        const user = userEvent.setup();
        render(<Achievements />);

        await user.click(screen.getByRole('heading', { level: 3, name: 'ETH Global Mumbai 2026' }));
        await user.click(screen.getByRole('button', { name: 'Close' }));

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('stops the page behind the award from scrolling', async () => {
        const user = userEvent.setup();
        render(<Achievements />);

        await user.click(screen.getByRole('heading', { level: 3, name: 'ETH Global Mumbai 2026' }));
        expect(document.body.style.overflow).toBe('hidden');

        await user.keyboard('{Escape}');

        expect(document.body.style.overflow).not.toBe('hidden');
    });

    it('keeps every external link safe', () => {
        const { container } = render(<Achievements />);

        expectSafeExternalLinks(container);
        expectKnownExternalLinks(container);
    });

    it('describes every image it renders', () => {
        const { container } = render(<Achievements />);

        expectImagesHaveAltText(container);
    });
});
