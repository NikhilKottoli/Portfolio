'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, motion } from 'motion/react';

/**
 * True 3D soul motes - multiple depth layers with different parallax speeds,
 * sizes, and opacities. Responds to scroll and mouse.
 */
export function SoulMotes3D({ className = '', count = 60 }: { className?: string; count?: number }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const { scrollYProgress } = useScroll();
    const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
    const [viewport, setViewport] = useState({ w: 1440, h: 900 });
    const [reduceMotion, setReduceMotion] = useState(false);

    useEffect(() => {
        setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
        const canvas = canvasRef.current;
        if (!canvas) return;

        const parent = canvas.parentElement;
        const ctx = canvas.getContext('2d');
        if (!ctx || !parent) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        let width = 0;
        let height = 0;
        let running = false;
        let frame = 0;
        let motes: Mote[] = [];

        interface Mote {
            x: number;
            y: number;
            z: number; // 0 = far, 1 = near
            baseX: number;
            baseY: number;
            scale: number;
            speed: number;
            drift: number;
            phase: number;
            alpha: number;
            gold: boolean;
            hue: number;
        }

        const createSprites = () => {
            const blue = document.createElement('canvas');
            blue.width = 64; blue.height = 64;
            const bctx = blue.getContext('2d')!;
            const bg = bctx.createRadialGradient(32, 32, 0, 32, 32, 32);
            bg.addColorStop(0, 'rgba(185,242,255,0.95)');
            bg.addColorStop(0.3, 'rgba(154,219,232,0.4)');
            bg.addColorStop(1, 'rgba(154,219,232,0)');
            bctx.fillStyle = bg; bctx.fillRect(0, 0, 64, 64);

            const gold = document.createElement('canvas');
            gold.width = 64; gold.height = 64;
            const gctx = gold.getContext('2d')!;
            const gg = gctx.createRadialGradient(32, 32, 0, 32, 32, 32);
            gg.addColorStop(0, 'rgba(242,237,221,0.95)');
            gg.addColorStop(0.3, 'rgba(214,181,109,0.45)');
            gg.addColorStop(1, 'rgba(214,181,109,0)');
            gctx.fillStyle = gg; gctx.fillRect(0, 0, 64, 64);

            return { blue, gold };
        };

        const { blue, gold } = createSprites();

        const resize = () => {
            const rect = parent.getBoundingClientRect();
            width = rect.width;
            height = rect.height;
            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            const c = Math.max(20, Math.min(count, Math.round((width * height) / 22000)));
            motes = Array.from({ length: c }, (_, i) => {
                const z = Math.random();
                const isGold = Math.random() < 0.12;
                return {
                    x: Math.random() * width,
                    y: Math.random() * height,
                    z,
                    baseX: Math.random() * width,
                    baseY: Math.random() * height,
                    scale: 0.5 + z * 2.2,
                    speed: 0.05 + z * 0.45,
                    drift: 0.1 + z * 0.6,
                    phase: Math.random() * Math.PI * 2,
                    alpha: 0.08 + z * 0.5,
                    gold: isGold,
                    hue: isGold ? 45 : 195,
                };
            });
        };

        const draw = (time: number) => {
            ctx.clearRect(0, 0, width, height);
            ctx.globalCompositeOperation = 'lighter';

            const scroll = scrollYProgress.get();
            const scrollOffset = scroll * height * 0.6;

            for (const mote of motes) {
                if (!reduceMotion) {
                    const parallax = 1 - mote.z * 0.7;
                    mote.y -= mote.speed * (0.7 + mote.z * 0.6);
                    mote.x += Math.sin(time * 0.0004 + mote.phase) * mote.drift * 0.15 * parallax;
                    mote.x += (mouse.x - 0.5) * 30 * mote.z * 0.02;
                    mote.y += (mouse.y - 0.5) * 20 * mote.z * 0.02;
                    mote.x += scrollOffset * (1 - mote.z) * 0.15;
                }

                // Wrap around
                if (mote.y < -30) { mote.y = height + 30; mote.x = Math.random() * width; }
                if (mote.x < -30) mote.x = width + 30;
                if (mote.x > width + 30) mote.x = -30;

                const sprite = mote.gold ? gold : blue;
                const size = mote.scale * 10 * (0.6 + mote.z * 0.8);
                const alpha = mote.alpha * (0.5 + mote.z * 0.6);
                ctx.globalAlpha = alpha;
                ctx.drawImage(sprite, mote.x - size / 2, mote.y - size / 2, size, size);
            }

            ctx.globalAlpha = 1;
            ctx.globalCompositeOperation = 'source-over';

            if (running && !reduceMotion) {
                frame = requestAnimationFrame(draw);
            }
        };

        const start = () => { running = true; if (reduceMotion) { draw(0); running = false; } else { frame = requestAnimationFrame(draw); } };
        const stop = () => { running = false; cancelAnimationFrame(frame); };

        const handleVisibility = () => { document.hidden ? stop() : start(); };

        const observer = new IntersectionObserver(([entry]) => { entry.isIntersecting && !document.hidden ? start() : stop(); }, { threshold: 0.05 });
        const resizeObserver = new ResizeObserver(() => { stop(); resize(); start(); });

        resize();
        start();
        observer.observe(canvas);
        resizeObserver.observe(parent);
        document.addEventListener('visibilitychange', handleVisibility);

        return () => { stop(); observer.disconnect(); resizeObserver.disconnect(); document.removeEventListener('visibilitychange', handleVisibility); };
    }, [scrollYProgress, mouse, viewport, reduceMotion, count]);

    const onMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMouse({ x: (e.clientX - rect.left) / rect.width, y: (e.clientY - rect.top) / rect.height });
    };

    return (
        <canvas
            ref={canvasRef}
            onMouseMove={onMove}
            onTouchMove={(e) => { const t = e.touches[0]; const rect = e.currentTarget.getBoundingClientRect(); setMouse({ x: (t.clientX - rect.left) / rect.width, y: (t.clientY - rect.top) / rect.height }); }}
            aria-hidden="true"
            className={`pointer-events-none ${className}`}
            style={{ touchAction: 'none' }}
        />
    );
}

export default SoulMotes3D;