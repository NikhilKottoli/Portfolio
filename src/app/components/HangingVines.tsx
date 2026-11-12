import React from 'react';

type HangingVinesProps = {
    side?: 'left' | 'right';
    className?: string;
    style?: React.CSSProperties;
};

/** Hanging cave vines with faint soul buds. */
const HangingVines = ({ side = 'left', className = '', style }: HangingVinesProps) => {
    return (
        <svg
            viewBox="0 0 180 420"
            aria-hidden="true"
            className={`${className} ${side === 'right' ? '-scale-x-100' : ''}`}
            style={style}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.4" strokeLinecap="round">
                <path d="M26 -10C68 62 30 124 74 196C108 252 66 304 84 398" />
                <path d="M8 -10C34 48 20 102 44 150C64 190 38 232 50 286" strokeOpacity="0.38" />
                <path d="M58 -10C86 30 78 72 100 112" strokeOpacity="0.3" />
            </g>

            <g fill="currentColor" fillOpacity="0.5">
                <ellipse cx="48" cy="52" rx="9" ry="4" transform="rotate(-38 48 52)" />
                <ellipse cx="33" cy="94" rx="8" ry="3.5" transform="rotate(28 33 94)" />
                <ellipse cx="62" cy="122" rx="10" ry="4" transform="rotate(-42 62 122)" />
                <ellipse cx="46" cy="170" rx="8" ry="3.5" transform="rotate(34 46 170)" />
                <ellipse cx="79" cy="214" rx="11" ry="4.5" transform="rotate(-26 79 214)" />
                <ellipse cx="67" cy="270" rx="8" ry="3.5" transform="rotate(30 67 270)" />
                <ellipse cx="85" cy="314" rx="9" ry="3.5" transform="rotate(-34 85 314)" />
                <ellipse cx="78" cy="356" rx="7" ry="3" transform="rotate(26 78 356)" />
            </g>

            <g fill="#b9f2ff" fillOpacity="0.5">
                <circle cx="54" cy="76" r="1.5" />
                <circle cx="71" cy="150" r="1.2" />
                <circle cx="58" cy="238" r="1.4" />
                <circle cx="88" cy="338" r="1.3" />
            </g>
        </svg>
    );
};

export default HangingVines;