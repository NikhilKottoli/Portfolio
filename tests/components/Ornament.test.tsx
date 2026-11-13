import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import Ornament from '../../src/app/components/Ornament';

describe('Ornament', () => {
    it('is hidden from assistive technology', () => {
        const { container } = render(<Ornament />);

        expect(container.firstElementChild).toHaveAttribute('aria-hidden', 'true');
    });

    it('keeps the class it is given', () => {
        const { container } = render(<Ornament className="extra" />);

        expect(container.firstElementChild).toHaveClass('extra');
    });
});
