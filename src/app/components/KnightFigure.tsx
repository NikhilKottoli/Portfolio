import React from 'react';

type KnightFigureProps = {
    className?: string;
};

/**
 * An original silhouette inspired by Hollow Knight's wandering knight:
 * pale horned mask, tattered cloak, a nail over the shoulder, and a small lantern.
 */
const KnightFigure = ({ className = '' }: KnightFigureProps) => {
    return (
        <svg
            viewBox="0 0 180 240"
            aria-hidden="true"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Ground shadow */}
            <ellipse cx="90" cy="232" rx="46" ry="6" fill="#000000" fillOpacity="0.55" />

            {/* Lantern glow */}
            <circle cx="50" cy="160" r="22" fill="#f2dc9a" fillOpacity="0.06" />

            {/* Nail, held over the shoulder */}
            <g transform="rotate(12 130 120)">
                <path d="M126 24L132 24L130 134L128 134L126 24Z" fill="#dbe5e2" fillOpacity="0.82" />
                <path d="M121 134H137V139H121V134Z" fill="#b99e69" fillOpacity="0.9" />
                <path d="M126.5 139H131.5V160H126.5V139Z" fill="#87938f" />
            </g>

            {/* Cloak and body */}
            <path
                d="M90 84C75 84 63 95 59 112L49 186C47 198 44 208 37 216C52 220 62 220 69 218L73 231L82 218L90 232L98 218L107 231L111 218C118 220 128 220 143 216C136 208 133 198 131 186L121 112C117 95 105 84 90 84Z"
                fill="#030608"
            />

            {/* Rim light so the silhouette reads against the void */}
            <path
                d="M90 84C75 84 63 95 59 112L49 186C47 198 44 208 37 216C52 220 62 220 69 218L73 231L82 218L90 232L98 218L107 231L111 218C118 220 128 220 143 216C136 208 133 198 131 186L121 112C117 95 105 84 90 84Z"
                fill="none"
                stroke="#f2eddd"
                strokeOpacity="0.16"
                strokeWidth="1.1"
            />

            {/* Subtle cloak folds */}
            <path d="M74 108C68 132 65 166 61 198" stroke="#e9e4d4" strokeOpacity="0.055" strokeWidth="1" />
            <path d="M106 108C112 132 115 166 119 198" stroke="#e9e4d4" strokeOpacity="0.04" strokeWidth="1" />

            {/* Lantern in the left hand */}
            <path d="M56 128L50 148" stroke="#c8a96b" strokeOpacity="0.65" strokeWidth="1" />
            <rect x="44" y="148" width="12" height="15" fill="#08131a" stroke="#c8a96b" strokeOpacity="0.65" />
            <path d="M42 148H58L55 143H45L42 148Z" fill="#c8a96b" fillOpacity="0.55" />
            <circle cx="50" cy="155.5" r="2.6" fill="#f6e6b3" fillOpacity="0.95" />

            {/* Mask and horns */}
            <g transform="translate(90 68) scale(0.64) translate(-64 -64)">
                <path d="M42 40C35 27 25 15 8 5C17 22 23 38 24 53C30 46 36 42 42 40Z" fill="#eee8d7" />
                <path d="M86 40C93 27 103 15 120 5C111 22 105 38 104 53C98 46 92 42 86 40Z" fill="#eee8d7" />
                <path
                    d="M64 20C50 20 39 29 37 44C35 58 40 70 48 80L64 94L80 80C88 70 93 58 91 44C89 29 78 20 64 20Z"
                    fill="#eee8d7"
                />
                <ellipse cx="50" cy="55" rx="5.8" ry="10" transform="rotate(12 50 55)" fill="#05080b" />
                <ellipse cx="78" cy="55" rx="5.8" ry="10" transform="rotate(-12 78 55)" fill="#05080b" />
                <path
                    d="M43 36C47 39 50 43 51 47"
                    stroke="#05080b"
                    strokeOpacity="0.16"
                    strokeWidth="0.9"
                    strokeLinecap="round"
                />
            </g>
        </svg>
    );
};

export default KnightFigure;
