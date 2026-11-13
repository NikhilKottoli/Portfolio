'use client';

import React, { useEffect, useState } from 'react';

type DialogueBoxProps = {
    /** The full line. It is always exposed to assistive technology at once. */
    children: string;
    /** Optional speaker name shown in a corner tab. */
    speaker?: string;
    /** Milliseconds between revealed characters. */
    speed?: number;
    /** Renders the whole line immediately, skipping the animation. */
    instant?: boolean;
    className?: string;
};

/**
 * A classic GBA dialogue box.
 *
 * The line types itself out one character at a time, but the complete text is
 * rendered in the DOM from the first frame and exposed to assistive
 * technology immediately, so nobody has to wait for the animation.
 */
const DialogueBox = ({
    children,
    speaker,
    speed = 18,
    instant = false,
    className = '',
}: DialogueBoxProps) => {
    const full = children;
    const [revealed, setRevealed] = useState(instant ? full.length : 0);

    useEffect(() => {
        if (instant) {
            setRevealed(full.length);
            return;
        }

        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (reduced) {
            setRevealed(full.length);
            return;
        }

        setRevealed(0);
        const timer = window.setInterval(() => {
            setRevealed((current) => {
                if (current >= full.length) {
                    window.clearInterval(timer);
                    return current;
                }
                return current + 1;
            });
        }, speed);

        return () => window.clearInterval(timer);
    }, [full, instant, speed]);

    const done = revealed >= full.length;

    return (
        <div className={`pk-window px-4 py-3 sm:px-5 sm:py-4 ${className}`}>
            {speaker ? (
                <span className="absolute -top-3 left-3 border-2 border-bark bg-honey px-2 py-0.5 font-pixel-ui text-[0.6rem] uppercase tracking-[0.16em] text-ink">
                    {speaker}
                </span>
            ) : null}

            {/* The complete line, available to assistive technology from the start. */}
            <p className="sr-only">{full}</p>

            <p
                aria-hidden="true"
                className="font-body text-[0.98rem] leading-relaxed text-ink sm:text-lg"
            >
                {full.slice(0, revealed)}
                <span
                    className={`ml-1 inline-block text-berry ${done ? 'animate-blink' : ''}`}
                >
                    ▼
                </span>
            </p>
        </div>
    );
};

export default DialogueBox;
