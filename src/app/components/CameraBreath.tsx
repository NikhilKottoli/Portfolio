'use client';

import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

/**
 * Subtle camera breath - the whole scene breathes slightly.
 * Applies a tiny transform to a wrapper to simulate camera breathing.
 */
export function CameraBreath({ children, intensity = 1 }: { children: React.ReactNode; intensity?: number }) {
    const breatheX = useSpring(useMotionValue(0), { stiffness: 60, damping: 22 });
    const breatheY = useSpring(useMotionValue(0), { stiffness: 60, damping: 22 });
    const breatheScale = useSpring(useMotionValue(1), { stiffness: 80, damping: 25 });
    const breatheRotate = useSpring(useMotionValue(0), { stiffness: 60, damping: 22 });

    useEffect(() => {
        let frame = 0;
        const animate = () => {
            frame = requestAnimationFrame(animate);
            const t = Date.now() * 0.00035;
            breatheX.set(Math.sin(t * 1.1) * 0.8 * intensity);
            breatheY.set(Math.cos(t * 0.9) * 0.6 * intensity);
            breatheScale.set(1 + Math.sin(t * 0.7) * 0.0008 * intensity);
            breatheRotate.set(Math.sin(t * 0.5) * 0.04 * intensity);
        };
        animate();
        return () => cancelAnimationFrame(frame);
    }, [breatheX, breatheY, breatheScale, breatheRotate, intensity]);

    return (
        <motion.div
            style={{
                x: breatheX,
                y: breatheY,
                scale: breatheScale,
                rotate: breatheRotate,
                transformOrigin: 'center center',
                willChange: 'transform',
            }}
            className="relative"
        >
            {children}
        </motion.div>
    );
}

export default CameraBreath;