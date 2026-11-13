import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render } from '@testing-library/react';
import SoulMotes from '../../src/app/components/SoulMotes';
import { clearCanvasContexts, getCanvasContexts } from '../helpers/canvas';

const rect = {
    width: 1000,
    height: 600,
    top: 0,
    left: 0,
    right: 1000,
    bottom: 600,
    x: 0,
    y: 0,
    toJSON: () => ({}),
} as DOMRect;

/** The context of the visible canvas, which is created before the sprite canvases. */
const mainContext = () => getCanvasContexts()[0];

const mockReducedMotion = (matches: boolean) => {
    vi.spyOn(window, 'matchMedia').mockImplementation(
        (query: string) =>
            ({
                matches,
                media: query,
                onchange: null,
                addListener: vi.fn(),
                removeListener: vi.fn(),
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                dispatchEvent: vi.fn(),
            }) as unknown as MediaQueryList,
    );
};

describe('SoulMotes', () => {
    beforeEach(() => {
        clearCanvasContexts();

        vi.useFakeTimers();
        vi.setSystemTime(new Date('2026-01-01T00:00:00Z'));

        vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue(rect);

        Object.defineProperty(document, 'hidden', { configurable: true, value: false });
    });

    afterEach(() => {
        vi.useRealTimers();
        Object.defineProperty(document, 'hidden', { configurable: true, value: false });
    });

    it('renders a canvas that is hidden from assistive technology', () => {
        const { container } = render(<SoulMotes className="motes" />);

        const canvas = container.querySelector('canvas');

        expect(canvas).toBeInTheDocument();
        expect(canvas).toHaveAttribute('aria-hidden', 'true');
        expect(canvas).toHaveClass('motes');
    });

    it('draws a field of motes on the canvas', () => {
        render(<SoulMotes />);
        vi.advanceTimersByTime(100);

        const context = mainContext();

        // The animation runs frame after frame, so the number of motes is
        // measured against the number of frames that were drawn.
        const frames = context.clearRect.mock.calls.length;
        const motesPerFrame = context.drawImage.mock.calls.length / frames;

        expect(frames).toBeGreaterThan(0);
        expect(motesPerFrame).toBeGreaterThanOrEqual(22);
        expect(motesPerFrame).toBeLessThanOrEqual(58);
    });

    it('keeps moving the motes', () => {
        render(<SoulMotes />);

        const context = mainContext();
        const drawsBefore = context.drawImage.mock.calls.length;

        vi.advanceTimersByTime(100);

        expect(context.drawImage.mock.calls.length).toBeGreaterThan(drawsBefore);
    });

    it('stops moving the motes when less motion is asked for', () => {
        mockReducedMotion(true);

        render(<SoulMotes />);

        const context = mainContext();
        const drawsBefore = context.drawImage.mock.calls.length;

        vi.advanceTimersByTime(100);

        expect(context.drawImage.mock.calls.length).toBe(drawsBefore);
    });

    it('stops drawing while the page is hidden', () => {
        render(<SoulMotes />);
        vi.advanceTimersByTime(100);

        const context = mainContext();
        const drawsBefore = context.drawImage.mock.calls.length;
        expect(drawsBefore).toBeGreaterThan(0);

        Object.defineProperty(document, 'hidden', { configurable: true, value: true });
        document.dispatchEvent(new Event('visibilitychange'));

        vi.advanceTimersByTime(100);

        expect(context.drawImage.mock.calls.length).toBe(drawsBefore);
    });

    it('stops the animation when it is taken off the page', () => {
        const cancelAnimation = vi.spyOn(window, 'cancelAnimationFrame');

        const { unmount } = render(<SoulMotes />);
        unmount();

        expect(cancelAnimation).toHaveBeenCalled();
    });
});
