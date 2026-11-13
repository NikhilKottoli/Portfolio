import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import DialogueBox from '../../src/app/components/pixel/DialogueBox';

const LINE = 'Hey there! Welcome to my profile.';

describe('DialogueBox', () => {
    it('exposes the whole line straight away', () => {
        render(<DialogueBox>{LINE}</DialogueBox>);

        expect(screen.getByText(LINE)).toBeInTheDocument();
    });

    it('names the speaker when one is given', () => {
        render(<DialogueBox speaker="Nikhil">{LINE}</DialogueBox>);

        expect(screen.getByText('Nikhil')).toBeInTheDocument();
    });

    it('shows the whole line at once when it is told to', () => {
        const { container } = render(<DialogueBox instant>{LINE}</DialogueBox>);

        const spoken = container.querySelector('[aria-hidden="true"]');

        expect(spoken?.textContent).toContain(LINE);
    });
});
