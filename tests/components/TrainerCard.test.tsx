import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import TrainerCard from '../../src/app/components/TrainerCard';
import { expectKnownExternalLinks, expectSafeExternalLinks } from '../helpers/assertions';

describe('TrainerCard', () => {
    it('looks like a collectible trainer card', () => {
        render(<TrainerCard />);

        const card = screen.getByLabelText('Trainer card');

        expect(card).toHaveTextContent('Trainer Card');
        expect(card).toHaveTextContent('Nikhil Kottoli');
        expect(card).toHaveTextContent('No. 2048');
    });

    it('lists the facts that identify the trainer', () => {
        render(<TrainerCard />);

        const card = screen.getByLabelText('Trainer card');

        expect(card).toHaveTextContent('Surathkal, Karnataka, India');
        expect(card).toHaveTextContent('Computer Science, NITK Surathkal');
        expect(card).toHaveTextContent('Microsoft — MAI Extensions Security');
    });

    it('links to each profile', () => {
        render(<TrainerCard />);

        expect(screen.getByRole('link', { name: 'GitHub' })).toHaveAttribute(
            'href',
            'https://github.com/NikhilKottoli',
        );
        expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute(
            'href',
            'mailto:nikhilkottoli2005@gmail.com',
        );
    });

    it('keeps every external link safe', () => {
        const { container } = render(<TrainerCard />);

        expectSafeExternalLinks(container);
        expectKnownExternalLinks(container);
    });
});
