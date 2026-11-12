'use client';

import React, { useEffect, useRef, useState } from 'react';
import HallownestSkyline from './HallownestSkyline';
import KnightMark from './KnightMark';

/**
 * Multi-layer parallax system that creates depth through differential scroll motion.
 * Layers: distant sky → far spires → mid ruins → near arches → mask sigil → fog planes
 */
export function ParallaxLayers() {
    const ref = useRef<HTMLDivElement>(null);
    const [scrollY, setScrollY] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(900);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        let frame = 0;
        const update = () => {
            frame = 0;
            const rect = el.getBoundingClientRect();
            const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - window.innerHeight || 1)));
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

    return (
        <div
            ref={ref}
            className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
            aria-hidden="true"
            style={{ height: '200vh' }}
        >
            {/* Layer 0: Deep void gradient (static) */}
            <div className="absolute inset-0" style={{
                background: 'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(185,242,255,0.08), transparent 60%), radial-gradient(ellipse 50% 35% at 85% 55%, rgba(214,181,109,0.04), transparent 65%), linear-gradient(180deg, #03060a 0%, #050a10 45%, #03060a 100%)'
            }} />

            {/* Layer 1: Distant sky glow (barely moves) - 0.05x */}
            <div className="absolute inset-0 will-change-transform" style={{
                transform: `translate3d(0, ${scrollY * vh * 0.05}px, 0)`,
                background: 'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(185,242,255,0.06), transparent 70%)'
            }} />

            {/* Layer 2: Far spires - 0.15x */}
            <HallownestSkyline
                className="absolute inset-x-0 bottom-0 h-[55vh] will-change-transform opacity-30"
                style={{
                    transform: `translate3d(0, ${scrollY * vh * 0.15}px, 0) scale(1.02)`,
                    filter: 'blur(0.5px)',
                    color: '#08131a'
                }}
            />

            {/* Layer 3: Mid ruins - 0.25x */}
            <HallownestSkyline
                className="absolute inset-x-0 bottom-0 h-[48vh] will-change-transform opacity-45"
                style={{
                    transform: `translate3d(0, ${scrollY * vh * 0.25}px, 0)`,
                    filter: 'blur(0.3px)',
                    color: '#0a131a'
                }}
            />

            {/* Layer 4: Near arches - 0.35x */}
            <HallownestSkyline
                className="absolute inset-x-0 bottom-0 h-[42vh] will-change-transform opacity-60"
                style={{
                    transform: `translate3d(0, ${scrollY * vh * 0.35}px, 0)`,
                    color: '#0b1a22'
                }}
            />

            {/* Layer 5: Giant mask sigil burned into cavern - 0.45x */}
            <KnightMark
                className="absolute left-1/2 top-[18%] h-[70vmin] w-[70vmin] -translate-x-1/2 text-pale/[0.025] will-change-transform"
                style={{ transform: `translate3d(-50%, ${scrollY * vh * 0.45}px, 0)` }}
            />

            {/* Layer 6: Fog plane 1 (deep) - 0.3x */}
            <div className="absolute -bottom-32 left-1/2 h-[45vh] w-[130vw] -translate-x-1/2 rounded-[50%] bg-soul/[0.04] blur-[120px] will-change-transform" style={{
                transform: `translate3d(-50%, ${scrollY * vh * 0.3}px, 0)`
            }} />

            {/* Layer 7: Fog plane 2 (mid) - 0.5x */}
            <div className="absolute -bottom-20 left-[-5%] h-[35vh] w-[85vw] rounded-[50%] bg-gold/[0.02] blur-[100px] will-change-transform" style={{
                transform: `translate3d(0, ${scrollY * vh * 0.5}px, 0)`
            }} />

            {/* Layer 8: Fog plane 3 (near) - 0.7x */}
            <div className="absolute -bottom-10 left-[10%] h-[25vh] w-[60vw] rounded-[50%] bg-soul/[0.03] blur-[80px] will-change-transform" style={{
                transform: `translate3d(0, ${scrollY * vh * 0.7}px, 0)`
            }} />

            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(3,6,10,0.6)_100%)]" />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-void via-void/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-void via-void/55 to-transparent" />
        </div>
    );
}

export default ParallaxLayers;