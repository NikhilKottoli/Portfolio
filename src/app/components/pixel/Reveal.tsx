'use client';

import React, { useEffect, useRef, useState } from 'react';

type RevealProps = {
    children: React.ReactNode;
    /** Stagger, in milliseconds. */
    delay?: number;
    className?: string;
};

/**
 * Fades content in the first time it enters the viewport.
 *
 * A small IntersectionObserver does the work so the page does not have to
 * ship an animation library. When the observer is unavailable the content is
 * simply shown.
 */
const Reveal = ({ children, delay = 0, className = '' }: RevealProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const [shown, setShown] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        if (typeof IntersectionObserver === 'undefined') {
            setShown(true);
            return;
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;
                    setShown(true);
                    observer.disconnect();
                });
            },
            { threshold: 0.08, rootMargin: '0px 0px -8% 0px' },
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={`pk-reveal transition-[opacity,transform] duration-500 ease-out ${
                shown ? 'translate-y-0 opacity-100' : 'translate-y-3 opacity-0'
            } ${className}`}
        >
            {children}
        </div>
    );
};

export default Reveal;
