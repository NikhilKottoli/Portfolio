import React from 'react';

type KnightMarkProps = {
    className?: string;
    style?: React.CSSProperties;
};

/**
 * An original, fan-art-inspired mask sigil: two swept horns over a pale mask.
 * Drawn from primitives so it stays crisp at any size and needs no external art.
 */
const KnightMark = ({ className = '', style }: KnightMarkProps) => {
    return (
        <svg
            viewBox="0 0 128 128"
            aria-hidden="true"
            className={className}
            style={style}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Horns */}
            <path
                d="M42 40C35 27 25 15 8 5C17 22 23 38 24 53C30 46 36 42 42 40Z"
                fill="currentColor"
            />
            <path
                d="M86 40C93 27 103 15 120 5C111 22 105 38 104 53C98 46 92 42 86 40Z"
                fill="currentColor"
            />

            {/* Mask */}
            <path
                d="M64 20C50 20 39 29 37 44C35 58 40 70 48 80L64 94L80 80C88 70 93 58 91 44C89 29 78 20 64 20Z"
                fill="currentColor"
            />

            {/* Hollow eyes */}
            <ellipse cx="50" cy="55" rx="5.8" ry="10" transform="rotate(12 50 55)" fill="#03060a" />
            <ellipse cx="78" cy="55" rx="5.8" ry="10" transform="rotate(-12 78 55)" fill="#03060a" />

            {/* Faint mask crack */}
            <path
                d="M43 36C47 39 50 43 51 47"
                stroke="#03060a"
                strokeOpacity="0.18"
                strokeWidth="0.9"
                strokeLinecap="round"
            />
        </svg>
    );
};

export default KnightMark;