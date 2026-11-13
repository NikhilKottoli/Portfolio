import React from 'react';

type PixelDividerProps = {
    /** Optional label printed in the middle of the rule. */
    label?: string;
    className?: string;
};

/**
 * A separator drawn as a run of small square studs with a solid diamond in
 * the middle, the way classic GBA screens divide a header from a body.
 */
const PixelDivider = ({ label, className = '' }: PixelDividerProps) => {
    return (
        <div
            className={`flex items-center gap-3 ${className}`}
            role={label ? 'separator' : undefined}
            aria-label={label}
        >
            <span
                aria-hidden="true"
                className="h-1 flex-1 bg-[repeating-linear-gradient(to_right,var(--bark)_0_4px,transparent_4px_10px)] opacity-45"
            />
            <span
                aria-hidden="true"
                className="grid h-3 w-3 place-items-center bg-honey [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]"
            />
            <span
                aria-hidden="true"
                className="h-1 flex-1 bg-[repeating-linear-gradient(to_right,var(--bark)_0_4px,transparent_4px_10px)] opacity-45"
            />
        </div>
    );
};

export default PixelDivider;
