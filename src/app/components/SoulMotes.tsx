'use client';

import { useEffect, useRef } from 'react';

type Mote = {
    x: number;
    y: number;
    scale: number;
    speed: number;
    drift: number;
    phase: number;
    alpha: number;
    gold: boolean;
};

const createGlowSprite = (gold: boolean) => {
    const size = 64;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d');
    if (!context) return canvas;

    const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
    if (gold) {
        gradient.addColorStop(0, 'rgba(236, 211, 158, 0.9)');
        gradient.addColorStop(0.3, 'rgba(200, 169, 107, 0.28)');
        gradient.addColorStop(1, 'rgba(200, 169, 107, 0)');
    } else {
        gradient.addColorStop(0, 'rgba(214, 245, 250, 0.95)');
        gradient.addColorStop(0.3, 'rgba(154, 219, 232, 0.32)');
        gradient.addColorStop(1, 'rgba(154, 219, 232, 0)');
    }

    context.fillStyle = gradient;
    context.fillRect(0, 0, size, size);
    return canvas;
};

export default function SoulMotes({ className = '' }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const parent = canvas.parentElement;
        const context = canvas.getContext('2d');
        if (!context || !parent) return;

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const blueSprite = createGlowSprite(false);
        const goldSprite = createGlowSprite(true);

        let width = 0;
        let height = 0;
        let frame = 0;
        let running = false;
        let motes: Mote[] = [];

        const resize = () => {
            const rect = parent.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            width = rect.width;
            height = rect.height;

            canvas.width = Math.floor(width * dpr);
            canvas.height = Math.floor(height * dpr);
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            context.setTransform(dpr, 0, 0, dpr, 0, 0);

            const count = Math.max(22, Math.min(58, Math.round((width * height) / 26000)));
            motes = Array.from({ length: count }, () => ({
                x: Math.random() * width,
                y: Math.random() * height,
                scale: 0.7 + Math.random() * 2.2,
                speed: 0.1 + Math.random() * 0.32,
                drift: 0.15 + Math.random() * 0.55,
                phase: Math.random() * Math.PI * 2,
                alpha: 0.16 + Math.random() * 0.42,
                gold: Math.random() < 0.16,
            }));
        };

        const draw = (time = 0) => {
            context.clearRect(0, 0, width, height);
            context.globalCompositeOperation = 'lighter';

            for (const mote of motes) {
                if (!reduceMotion) {
                    mote.y -= mote.speed;
                    mote.x += Math.sin(time * 0.00035 + mote.phase) * mote.drift * 0.12;
                }

                if (mote.y < -24) {
                    mote.y = height + 24;
                    mote.x = Math.random() * width;
                }
                if (mote.x < -24) mote.x = width + 24;
                if (mote.x > width + 24) mote.x = -24;

                const sprite = mote.gold ? goldSprite : blueSprite;
                const size = mote.scale * 13;
                context.globalAlpha = mote.alpha;
                context.drawImage(sprite, mote.x - size / 2, mote.y - size / 2, size, size);
            }

            context.globalAlpha = 1;
            context.globalCompositeOperation = 'source-over';

            if (running && !reduceMotion) {
                frame = requestAnimationFrame(draw);
            }
        };

        const start = () => {
            if (running) return;
            running = true;

            if (reduceMotion) {
                draw();
                running = false;
                return;
            }

            frame = requestAnimationFrame(draw);
        };

        const stop = () => {
            running = false;
            cancelAnimationFrame(frame);
        };

        const handleVisibility = () => {
            if (document.hidden) {
                stop();
            } else {
                start();
            }
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !document.hidden) {
                    start();
                } else {
                    stop();
                }
            },
            { threshold: 0.05 }
        );

        const resizeObserver = new ResizeObserver(() => {
            stop();
            resize();
            start();
        });

        resize();
        start();
        observer.observe(canvas);
        resizeObserver.observe(parent);
        document.addEventListener('visibilitychange', handleVisibility);

        return () => {
            stop();
            observer.disconnect();
            resizeObserver.disconnect();
            document.removeEventListener('visibilitychange', handleVisibility);
        };
    }, []);

    return <canvas ref={canvasRef} aria-hidden="true" className={`pointer-events-none ${className}`} />;
}
