import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach, beforeAll, vi } from 'vitest';
import { installCanvasMock } from './helpers/canvas';

/**
 * `motion/react` powers every animation in this app. Animations are frame
 * driven and `whileInView` needs a live IntersectionObserver, so assertions
 * against real motion would either hang or depend on timing.
 *
 * The mock renders the underlying DOM element and drops the animation-only
 * props. Tests then assert on the markup and behaviour that users actually
 * get, deterministically.
 */
vi.mock('motion/react', async () => {
    const React = await import('react');

    const ANIMATION_ONLY_PROPS = [
        'initial',
        'animate',
        'exit',
        'whileHover',
        'whileTap',
        'whileFocus',
        'whileDrag',
        'whileInView',
        'viewport',
        'transition',
        'layout',
        'layoutId',
        'layoutDependency',
        'layoutScroll',
        'layoutRoot',
        'custom',
        'drag',
        'dragConstraints',
        'dragElastic',
        'dragMomentum',
        'dragPropagation',
        'onAnimationStart',
        'onAnimationComplete',
        'onUpdate',
        'onDrag',
        'onDragStart',
        'onDragEnd',
    ];

    // Cached per tag so the component identity stays stable across renders.
    // A fresh component on every render would remount the tree on each pass.
    const cache = new Map<string, ReturnType<typeof React.forwardRef>>();

    const createComponent = (tag: string) => {
        const cached = cache.get(tag);
        if (cached) return cached;

        const Component = React.forwardRef<HTMLElement, Record<string, unknown>>((props, ref) => {
            const rest: Record<string, unknown> = { ...props };
            for (const key of ANIMATION_ONLY_PROPS) delete rest[key];
            return React.createElement(tag, { ...rest, ref });
        });

        Component.displayName = `motion.${tag}`;
        cache.set(tag, Component);
        return Component;
    };

    const motion = new Proxy(
        {},
        {
            get(_target, tag) {
                if (typeof tag !== 'string') return undefined;
                return createComponent(tag);
            },
        },
    );

    const Passthrough = ({ children }: { children?: React.ReactNode }) =>
        React.createElement(React.Fragment, null, children);

    return {
        motion,
        AnimatePresence: Passthrough,
        MotionConfig: Passthrough,
        LayoutGroup: Passthrough,
        useInView: () => true,
        useReducedMotion: () => false,
        useMotionValue: (initial: unknown) => ({ get: () => initial, set: () => undefined, on: () => () => undefined }),
        useMotionValueEvent: () => undefined,
        useTransform: () => ({ get: () => 0 }),
        useSpring: () => ({ get: () => 0 }),
        useScroll: () => ({ scrollX: { get: () => 0 }, scrollY: { get: () => 0 } }),
        useAnimate: () => [async () => undefined, async () => undefined],
        useDragControls: () => ({ start: () => undefined }),
        Reorder: { Group: Passthrough, Item: Passthrough },
    };
});

beforeAll(() => {
    installCanvasMock();

    // IntersectionObserver drives the "enter the viewport" animations. The
    // stub reports every element as visible so nothing silently stays hidden.
    if (!globalThis.IntersectionObserver) {
        class MockIntersectionObserver implements IntersectionObserver {
            readonly root = null;
            readonly rootMargin = '';
            readonly thresholds: ReadonlyArray<number> = [];

            constructor(private readonly callback: IntersectionObserverCallback) {}

            observe(target: Element): void {
                this.callback(
                    [
                        {
                            isIntersecting: true,
                            target,
                            intersectionRatio: 1,
                            time: 0,
                            boundingClientRect: target.getBoundingClientRect(),
                            intersectionRect: target.getBoundingClientRect(),
                            rootBounds: null,
                        } as IntersectionObserverEntry,
                    ],
                    this,
                );
            }

            unobserve(): void {}
            disconnect(): void {}
            takeRecords(): IntersectionObserverEntry[] {
                return [];
            }
        }

        globalThis.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver;
    }

    if (!globalThis.ResizeObserver) {
        class MockResizeObserver implements ResizeObserver {
            observe(): void {}
            unobserve(): void {}
            disconnect(): void {}
        }

        globalThis.ResizeObserver = MockResizeObserver as unknown as typeof ResizeObserver;
    }

    if (!window.matchMedia) {
        window.matchMedia = ((query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: () => undefined,
            removeListener: () => undefined,
            addEventListener: () => undefined,
            removeEventListener: () => undefined,
            dispatchEvent: () => false,
        })) as unknown as typeof window.matchMedia;
    }
});

afterEach(() => {
    cleanup();
});
