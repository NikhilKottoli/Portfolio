'use client';

import React, { useEffect, useRef, useState } from 'react';
import HangingVines from './HangingVines';
import Lantern from './Lantern';

/**
 * Foreground elements that move faster than scroll (parallax factor > 1).
 * Creates the feeling of looking past nearby cave geometry.
 */
export function ForegroundParallax({ side = 'both' }: { side?: 'left' | 'right' | 'both' }) {
    const ref = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(900);

    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const progress = Math.max(0, Math.min(1, window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1)));
            setScrollY(progress);
        };
        const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
        const onResize = () => { setViewportHeight(window.innerHeight); update(); };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onResize);
        return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onResize); cancelAnimationFrame(frame); };
    }, []);

    const vh = viewportHeight;
    const showLeft = side === 'left' || side === 'both';
    const showRight = side === 'right' || side === 'both';

    return (
        <div
            ref={ref}
            className="pointer-events-none fixed inset-0 z-20 overflow-hidden"
            aria-hidden="true"
            style={{ height: '200vh' }}
        >
            {/* Left vines - 1.15x (slightly faster than scroll) */}
            {showLeft && (
                <HangingVines
                    side="left"
                    className="absolute -left-2 -top-8 h-[70vh] w-32 text-moss/25 will-change-transform"
                    style={{
                        transform: `translate3d(0, ${scrollY * vh * 1.15}px, 0)`,
                        filter: 'blur(0.3px)'
                    }}
                />
            )}

            {/* Right vines - 1.15x */}
            {showRight && (
                <HangingVines
                    side="right"
                    className="absolute -right-2 -top-8 h-[62vh] w-28 text-moss/20 will-change-transform"
                    style={{
                        transform: `translate3d(0, ${scrollY * vh * 1.15}px, 0)`,
                        filter: 'blur(0.3px)'
                    }}
                />
            )}

            {/* Left lantern - 1.2x (closest feeling) */}
            {showLeft && (
                <Lantern
                    sway
                    className="absolute left-[3%] top-0 hidden h-64 w-28 lg:block"
                    style={{ transform: `translate3d(0, ${scrollY * vh * 1.2}px, 0)` }}
                />
            )}

            {/* Right lantern - 1.18x */}
            {showRight && (
                <Lantern
                    sway
                    className="absolute right-[4%] top-0 hidden h-56 w-24 lg:block"
                    style={{ transform: `translate3d(0, ${scrollY * vh * 1.18}px, 0)` }}
                />
            )}

            {/* Rocky outcrop left - 1.3x (very foreground) */}
            {showLeft && (
                <svg
                    viewBox="0 0 200 300"
                    className="absolute -left-8 bottom-10 h-[35vh] w-40 text-deep/80 will-change-transform"
                    style={{
                        transform: `translate3d(0, ${scrollY * vh * 1.3}px, 0)`,
                        filter: 'blur(0.8px)'
                    }}
                    aria-hidden="true"
                    fill="currentColor"
                >
                    <path d="M20 300L50 180L90 260L120 140L160 240L190 120L200 300H20Z" opacity="0.6" />
                    <path d="M10 300L40 200L70 270L100 150L130 250L160 130L180 300H10Z" opacity="0.4" />
                </svg>
            )}

            {/* Rocky outcrop right - 1.25x */}
            {showRight && (
                <svg
                    viewBox="0 0 200 300"
                    className="absolute -right-8 bottom-10 h-[30vh] w-36 text-deep/70 will-change-transform"
                    style={{
                        transform: `translate3d(0, ${scrollY * vh * 1.25}px, 0)`,
                        filter: 'blur(0.6px)'
                    }}
                    aria-hidden="true"
                    fill="currentColor"
                >
                    <path d="M180 300L150 180L110 260L80 140L40 240L10 120L0 300H180Z" opacity="0.55" />
                    <path d="M190 300L160 200L130 270L100 150L70 250L40 130L20 300H190Z" opacity="0.35" />
                </svg>
            )}

            {/* Hanging chains/roots near camera - 1.4x */}
            {showLeft && (
                <svg
                    viewBox="0 0 40 400"
                    className="absolute left-[2%] top-0 h-full w-10 text-deep/40 will-change-transform"
                    style={{ transform: `translate3d(0, ${scrollY * vh * 1.4}px, 0)` }}
                    aria-hidden="true"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                >
                    <path d="M20 0Q15 100 22 200Q28 300 18 400" opacity="0.5" />
                    <path d="M25 0Q30 80 22 180Q16 280 26 400" opacity="0.3" strokeWidth="1" />
                </svg>
            )}
        </div>
    );
}

export default ForegroundParallax;