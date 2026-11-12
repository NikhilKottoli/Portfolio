'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Volumetric fog layers at different depths that respond to scroll and subtle mouse parallax.
 * Creates the sense of thick cave atmosphere.
 */
export function DepthFog() {
    const [scrollY, setScrollY] = useState(0);
    const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
    const [viewport, setViewport] = useState({ w: 1440, h: 900 });

    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            setScrollY(Math.max(0, Math.min(1, window.scrollY / (document.documentElement.scrollHeight - window.innerHeight || 1))));
        };
        const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
        const onMove = (e: MouseEvent) => {
            setMouse({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
        };
        const onResize = () => {
            setViewport({ w: window.innerWidth, h: window.innerHeight });
            update();
        };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('mousemove', onMove, { passive: true });
        window.addEventListener('resize', onResize);
        return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('mousemove', onMove); window.removeEventListener('resize', onResize); cancelAnimationFrame(frame); };
    }, []);

    const { w, h } = viewport;
    const mx = (mouse.x - 0.5) * 40;
    const my = (mouse.y - 0.5) * 30;

    const fogLayers = [
        { depth: 0, speed: 0.15, opacity: 0.035, blur: 140, size: 1.4, color: 'soul', y: -0.1 },
        { depth: 1, speed: 0.25, opacity: 0.025, blur: 120, size: 1.2, color: 'gold', y: 0.1 },
        { depth: 2, speed: 0.4, opacity: 0.03, blur: 100, size: 1.1, color: 'soul', y: 0.3 },
        { depth: 3, speed: 0.6, opacity: 0.02, blur: 80, size: 1.0, color: 'mist', y: 0.5 },
        { depth: 4, speed: 0.85, opacity: 0.015, blur: 60, size: 0.9, color: 'soul', y: 0.7 },
    ];

    return (
        <div className="pointer-events-none fixed inset-0 z-5 overflow-hidden" aria-hidden="true">
            {fogLayers.map((layer, i) => {
                const translateY = scrollY * h * layer.speed + my * (layer.speed * 0.5);
                const translateX = mx * (layer.speed * 0.3);
                const colorMap = {
                    soul: `rgba(185,242,255,${layer.opacity})`,
                    gold: `rgba(214,181,109,${layer.opacity})`,
                    mist: `rgba(183,197,199,${layer.opacity})`,
                };
                return (
                    <div
                        key={i}
                        className="absolute left-1/2 rounded-[50%] will-change-transform blur-[140px]"
                        style={{
                            width: `${w * layer.size}px`,
                            height: `${h * layer.size}px`,
                            transform: `translate3d(calc(-50% + ${translateX}px), ${translateY + h * layer.y}px, 0)`,
                            background: `radial-gradient(ellipse 60% 50% at 50% 50%, ${colorMap[layer.color]}, transparent 70%)`,
                            filter: `blur(${layer.blur}px)`,
                            opacity: 1 - layer.depth * 0.12,
                        }}
                    />
                );
            })}
        </div>
    );
}

export default DepthFog;