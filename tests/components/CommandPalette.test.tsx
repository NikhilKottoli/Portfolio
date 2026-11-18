import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CommandPalette from '../../src/app/components/CommandPalette';

const { pushSpy } = vi.hoisted(() => ({ pushSpy: vi.fn() }));

vi.mock('next/navigation', () => ({
    useRouter: () => ({ push: pushSpy }),
}));

/** Open the palette with the Cmd+K hotkey, the way a visitor would. */
const openPalette = () => {
    fireEvent.keyDown(document, { key: 'k', metaKey: true });
};

/** The visible text of every result currently in the list. */
const optionLabels = () => screen.getAllByRole('option').map((option) => option.textContent ?? '');

describe('CommandPalette', () => {
    it('opens on the Cmd+K hotkey', () => {
        render(<CommandPalette />);

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

        openPalette();

        const dialog = screen.getByRole('dialog', { name: 'Command palette' });
        expect(dialog).toHaveAttribute('aria-modal', 'true');
    });

    it('opens on the Ctrl+K hotkey too', () => {
        render(<CommandPalette />);

        fireEvent.keyDown(document, { key: 'k', ctrlKey: true });

        expect(screen.getByRole('dialog', { name: 'Command palette' })).toBeInTheDocument();
    });

    it('toggles closed again on the hotkey', () => {
        render(<CommandPalette />);

        openPalette();
        expect(screen.getByRole('dialog')).toBeInTheDocument();

        openPalette();
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('puts the focus in the search box when it opens', () => {
        render(<CommandPalette />);

        openPalette();

        expect(screen.getByRole('textbox')).toHaveFocus();
    });

    it('filters the index across projects, skills, badges and journey entries', async () => {
        const user = userEvent.setup();
        render(<CommandPalette />);
        openPalette();

        const input = screen.getByRole('textbox');

        await user.type(input, 'rupeerail');
        expect(optionLabels().some((label) => label.includes('RupeeRail'))).toBe(true);

        await user.clear(input);
        await user.type(input, 'azure');
        expect(optionLabels().some((label) => label.includes('Azure'))).toBe(true);

        await user.clear(input);
        await user.type(input, 'microsoft internship');
        expect(optionLabels().some((label) => label.includes('Microsoft Internship'))).toBe(true);

        await user.clear(input);
        await user.type(input, 'ns-3');
        expect(optionLabels().some((label) => label.includes('ns-3'))).toBe(true);
    });

    it('narrows the results down as the query narrows', async () => {
        const user = userEvent.setup();
        render(<CommandPalette />);
        openPalette();

        const input = screen.getByRole('textbox');

        await user.type(input, 'rupeerail');
        const matches = screen.getAllByRole('option').length;
        expect(matches).toBeGreaterThan(0);

        await user.clear(input);
        await user.type(input, 'zzzzzz');
        expect(screen.queryAllByRole('option')).toHaveLength(0);
        expect(screen.getByText('No matches')).toBeInTheDocument();
    });

    it('moves the highlight with the arrow keys', async () => {
        const user = userEvent.setup();
        render(<CommandPalette />);
        openPalette();

        const input = screen.getByRole('textbox');
        await user.type(input, 'azure');

        const options = screen.getAllByRole('option');
        expect(options.length).toBeGreaterThan(1);
        expect(options[0]).toHaveAttribute('aria-selected', 'true');

        await user.keyboard('{ArrowDown}');
        expect(screen.getAllByRole('option')[1]).toHaveAttribute('aria-selected', 'true');

        await user.keyboard('{ArrowUp}');
        expect(screen.getAllByRole('option')[0]).toHaveAttribute('aria-selected', 'true');
    });

    it('navigates to the highlighted result with Enter', async () => {
        const user = userEvent.setup();
        render(<CommandPalette />);
        openPalette();

        const input = screen.getByRole('textbox');
        await user.type(input, 'rupeerail');

        // Walk the whole list so the highlight wraps back to the first result.
        const options = screen.getAllByRole('option');
        for (let step = 0; step < options.length; step += 1) {
            await user.keyboard('{ArrowDown}');
        }

        await user.keyboard('{Enter}');

        expect(pushSpy).toHaveBeenCalledWith('/Projects/rupeerail');
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('closes on Escape', () => {
        render(<CommandPalette />);
        openPalette();

        expect(screen.getByRole('dialog')).toBeInTheDocument();

        fireEvent.keyDown(document, { key: 'Escape' });

        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    it('gives the focus back to the page when it closes', () => {
        render(
            <>
                <button type="button">Before</button>
                <CommandPalette />
            </>,
        );

        const trigger = screen.getByRole('button', { name: 'Before' });
        trigger.focus();

        openPalette();
        expect(screen.getByRole('textbox')).toHaveFocus();

        fireEvent.keyDown(document, { key: 'Escape' });
        expect(trigger).toHaveFocus();
    });

    it('keeps Tab inside the dialog', () => {
        render(<CommandPalette />);
        openPalette();

        const dialog = screen.getByRole('dialog');
        const focusable = Array.from(
            dialog.querySelectorAll<HTMLElement>(
                'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])',
            ),
        );

        expect(focusable.length).toBeGreaterThan(1);

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        last.focus();
        fireEvent.keyDown(last, { key: 'Tab' });
        expect(first).toHaveFocus();

        fireEvent.keyDown(first, { key: 'Tab', shiftKey: true });
        expect(last).toHaveFocus();
    });
});
