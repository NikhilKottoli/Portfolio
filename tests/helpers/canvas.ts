import { vi } from 'vitest';

export type MockGradient = {
    addColorStop: ReturnType<typeof vi.fn>;
};

export type MockCanvasContext = {
    canvas: HTMLCanvasElement | null;
    fillStyle: unknown;
    strokeStyle: unknown;
    font: string;
    textBaseline: string;
    globalAlpha: number;
    globalCompositeOperation: string;
    setTransform: ReturnType<typeof vi.fn>;
    clearRect: ReturnType<typeof vi.fn>;
    fillRect: ReturnType<typeof vi.fn>;
    strokeRect: ReturnType<typeof vi.fn>;
    fillText: ReturnType<typeof vi.fn>;
    strokeText: ReturnType<typeof vi.fn>;
    drawImage: ReturnType<typeof vi.fn>;
    createRadialGradient: ReturnType<typeof vi.fn>;
    createLinearGradient: ReturnType<typeof vi.fn>;
    createPattern: ReturnType<typeof vi.fn>;
    beginPath: ReturnType<typeof vi.fn>;
    closePath: ReturnType<typeof vi.fn>;
    moveTo: ReturnType<typeof vi.fn>;
    lineTo: ReturnType<typeof vi.fn>;
    arc: ReturnType<typeof vi.fn>;
    rect: ReturnType<typeof vi.fn>;
    stroke: ReturnType<typeof vi.fn>;
    fill: ReturnType<typeof vi.fn>;
    save: ReturnType<typeof vi.fn>;
    restore: ReturnType<typeof vi.fn>;
    translate: ReturnType<typeof vi.fn>;
    scale: ReturnType<typeof vi.fn>;
    rotate: ReturnType<typeof vi.fn>;
    measureText: ReturnType<typeof vi.fn>;
};

const contexts: MockCanvasContext[] = [];
const contextByCanvas = new WeakMap<HTMLCanvasElement, MockCanvasContext>();

export const createMockCanvasContext = (canvas: HTMLCanvasElement | null = null): MockCanvasContext => ({
    canvas,
    fillStyle: '#000000',
    strokeStyle: '#000000',
    font: '10px sans-serif',
    textBaseline: 'alphabetic',
    globalAlpha: 1,
    globalCompositeOperation: 'source-over',
    setTransform: vi.fn(),
    clearRect: vi.fn(),
    fillRect: vi.fn(),
    strokeRect: vi.fn(),
    fillText: vi.fn(),
    strokeText: vi.fn(),
    drawImage: vi.fn(),
    createRadialGradient: vi.fn(() => ({ addColorStop: vi.fn() }) as MockGradient),
    createLinearGradient: vi.fn(() => ({ addColorStop: vi.fn() }) as MockGradient),
    createPattern: vi.fn(() => null),
    beginPath: vi.fn(),
    closePath: vi.fn(),
    moveTo: vi.fn(),
    lineTo: vi.fn(),
    arc: vi.fn(),
    rect: vi.fn(),
    stroke: vi.fn(),
    fill: vi.fn(),
    save: vi.fn(),
    restore: vi.fn(),
    translate: vi.fn(),
    scale: vi.fn(),
    rotate: vi.fn(),
    measureText: vi.fn(() => ({ width: 0 })),
});

/**
 * jsdom has no 2d canvas implementation, so `getContext('2d')` normally returns
 * null. The decorative canvas components bail out early in that case, which
 * would silently skip most of their logic. This mock keeps them exercised.
 */
export const installCanvasMock = (): void => {
    HTMLCanvasElement.prototype.getContext = function (this: HTMLCanvasElement) {
        const existing = contextByCanvas.get(this);
        if (existing) return existing;

        const context = createMockCanvasContext(this);
        contextByCanvas.set(this, context);
        contexts.push(context);
        return context;
    } as any;
};

/** Every 2d context handed out since the last `clearCanvasContexts()` call. */
export const getCanvasContexts = (): MockCanvasContext[] => contexts;

/** The most recently created 2d context, or undefined when none was created. */
export const getLatestCanvasContext = (): MockCanvasContext | undefined => contexts[contexts.length - 1];

export const clearCanvasContexts = (): void => {
    contexts.length = 0;
};
