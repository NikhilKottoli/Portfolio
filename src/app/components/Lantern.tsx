import React from 'react';

type LanternProps = {
    className?: string;
    style?: React.CSSProperties;
    sway?: boolean;
};

/** A hanging soul-lantern with a gilded cage and a soft cyan flame. */
const Lantern = ({ className = '', style, sway = false }: LanternProps) => {
    return (
        <div className={`relative ${sway ? 'hk-sway' : ''} ${className}`} aria-hidden="true" style={style}>
            <div className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 translate-y-2 rounded-full bg-soul/10 blur-2xl" />
            <svg viewBox="0 0 90 190" className="relative h-full w-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M45 0V56" stroke="#c8a96b" strokeOpacity="0.45" strokeWidth="1" />
                {[10, 22, 34, 46].map((y) => (
                    <ellipse
                        key={y}
                        cx="45"
                        cy={y}
                        rx="2.2"
                        ry="4"
                        stroke="#c8a96b"
                        strokeOpacity="0.42"
                        strokeWidth="0.9"
                    />
                ))}

                <path d="M45 50L50 56L45 62L40 56L45 50Z" fill="#c8a96b" fillOpacity="0.65" />

                <path d="M29 64H61L57 58H33L29 64Z" fill="#c8a96b" fillOpacity="0.3" stroke="#c8a96b" strokeOpacity="0.5" />
                <path
                    d="M31 64L59 64L65 88L59 114L31 114L25 88L31 64Z"
                    fill="#061017"
                    fillOpacity="0.9"
                    stroke="#c8a96b"
                    strokeOpacity="0.55"
                />
                <path d="M45 76C51 82 53 88 50 94C48 98 42 98 40 94C37 88 39 82 45 76Z" fill="#b9f2ff" fillOpacity="0.85" />
                <circle cx="45" cy="88" r="13" fill="#9adbe8" fillOpacity="0.12" />
                <path d="M31 114H59L55 122H35L31 114Z" fill="#c8a96b" fillOpacity="0.3" stroke="#c8a96b" strokeOpacity="0.5" />
                <path d="M45 122V132" stroke="#c8a96b" strokeOpacity="0.45" strokeWidth="1" />
                <path d="M45 132L49 136L45 140L41 136L45 132Z" fill="#c8a96b" fillOpacity="0.5" />
            </svg>
        </div>
    );
};

export default Lantern;