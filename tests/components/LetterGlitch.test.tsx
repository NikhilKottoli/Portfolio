import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import LetterGlitch from '../../src/app/components/LetterGlitch';
import { LETTER_CHAR_HEIGHT, LETTER_CHAR_WIDTH } from '../../src/app/components/letter-glitch-utils';
import { clearCanvasContexts, getLatestCanvasContext } from '../helpers/canvas';

const VIEWPORT_WIDTH = 400;
const VIEWPORT_HEIGHT = 200;

const rect = {
    width: VIEWPORT_WIDTH,
    height: VIEWPORT_HEIGHT,
    top: 0,
    left: 0,
    right: VIEWPORT_WIDTH,
    bottom: VIEWPORT_HEIGHT,
    x: 0,
    y: 0,
    toJSON: () => ({}),
} as DOMRect;

describe('LetterGlitch', () => {
    beforeEach(() => {
        clearCanvasContexts();

        // The animation loop is frame driven. Freezing the clock keeps the
        // number of draw calls deterministic.
        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));

        vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue(rect);
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it('renders a canvas inside the container', () => {
        const { container } = render(<LetterGlitch className="glitch" />);

        const canvas = container.querySelector('canvas');

        expect(canvas).toBeInTheDocument();
        expect(canvas?.parentElement).toHaveClass('glitch');
    });

    it('sizes the canvas to its container', () => {
        const { container } = render(<LetterGlitch />);

        const canvas = container.querySelector('canvas') as HTMLCanvasElement;

        expect(canvas.width).toBe(VIEWPORT_WIDTH);
        expect(canvas.height).toBe(VIEWPORT_HEIGHT);
        expect(canvas.style.width).toBe(`${VIEWPORT_WIDTH}px`);
        expect(canvas.style.height).toBe(`${VIEWPORT_HEIGHT}px`);
    });

    it('scales the canvas by the device pixel ratio', () => {
        render(<LetterGlitch />);

        expect(getLatestCanvasContext()?.setTransform).toHaveBeenCalledWith(1, 0, 0, 1, 0, 0);
    });

    it('draws one character per grid cell', () => {
        render(<LetterGlitch />);

        const expectedCells = (VIEWPORT_WIDTH / LETTER_CHAR_WIDTH) * (VIEWPORT_HEIGHT / LETTER_CHAR_HEIGHT);

        expect(getLatestCanvasContext()?.fillText).toHaveBeenCalledTimes(expectedCells);
    });

    it('clears the canvas before drawing', () => {
        render(<LetterGlitch />);

        expect(getLatestCanvasContext()?.clearRect).toHaveBeenCalledWith(0, 0, VIEWPORT_WIDTH, VIEWPORT_HEIGHT);
    });

    it('draws with a monospace font', () => {
        render(<LetterGlitch />);

        expect(getLatestCanvasContext()?.font).toBe('16px monospace');
    });

    it('renders only the outer vignette by default', () => {
        const { container } = render(<LetterGlitch />);

        expect(container.querySelectorAll('div')).toHaveLength(2);
    });

    it('renders the centre vignette when it is requested', () => {
        const { container } = render(<LetterGlitch centerVignette />);

        expect(container.querySelectorAll('div')).toHaveLength(3);
    });

    it('can render without any vignette', () => {
        const { container } = render(<LetterGlitch outerVignette={false} />);

        expect(container.querySelectorAll('div')).toHaveLength(1);
    });

    it('redraws after the container is resized', () => {
        render(<LetterGlitch />);

        const context = getLatestCanvasContext();
        const drawsBeforeResize = context?.clearRect.mock.calls.length ?? 0;

        window.dispatchEvent(new Event('resize'));
        vi.advanceTimersByTime(150);

        expect(context?.clearRect.mock.calls.length ?? 0).toBeGreaterThan(drawsBeforeResize);
    });

    it('stops the animation and detaches its listeners on unmount', () => {
        const cancelAnimation = vi.spyOn(window, 'cancelAnimationFrame');
        const removeListener = vi.spyOn(window, 'removeEventListener');

        const { unmount } = render(<LetterGlitch />);
        unmount();

        expect(cancelAnimation).toHaveBeenCalled();
        expect(removeListener).toHaveBeenCalledWith('resize', expect.any(Function));
    });
});
