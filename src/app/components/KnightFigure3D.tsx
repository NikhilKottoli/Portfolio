'use client';

import React from 'react';
import { motion } from 'motion/react';

/**
 * Knight figure with true 3D lighting:
 * - Rim light (back light catching edges)
 * - Key light (main illumination)
 * - Fill light (shadow lift)
 * - Ambient occlusion in crevices
 * - Cast shadow on ground
 * - Subsurface scattering on mask
 * - Breathing animation (CSS-based for performance)
 */
export function KnightFigure3D({ className = '', scale = 1 }: { className?: string; scale?: number }) {
    return (
        <motion.div
            className={`relative hk-breathe ${className}`}
            style={{ transform: `scale(${scale})`, willChange: 'transform' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
        >
            <svg
                viewBox="0 0 220 280"
                aria-hidden="true"
                className="h-full w-full"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.9)) drop-shadow(0 20px 30px rgba(0,0,0,0.7))' }}
            >
                <defs>
                    {/* Rim light gradient */}
                    <linearGradient id="rimLight" x1="0%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#1a2a2e" stopOpacity="0" />
                        <stop offset="40%" stopColor="#2a4a4e" stopOpacity="0.15" />
                        <stop offset="70%" stopColor="#b9f2ff" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#f2eddd" stopOpacity="0.65" />
                    </linearGradient>

                    {/* Key light gradient */}
                    <linearGradient id="keyLight" x1="100%" y1="100%" x2="0%" y2="0%">
                        <stop offset="0%" stopColor="#08131a" stopOpacity="0.9" />
                        <stop offset="50%" stopColor="#0e1f2a" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#b9f2ff" stopOpacity="0.12" />
                    </linearGradient>

                    {/* Mask subsurface */}
                    <radialGradient id="maskGlow" cx="50%" cy="40%" r="60%">
                        <stop offset="0%" stopColor="#f2eddd" stopOpacity="0.95" />
                        <stop offset="50%" stopColor="#e8dfcf" stopOpacity="0.8" />
                        <stop offset="80%" stopColor="#d6c8a8" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#b9f2ff" stopOpacity="0.08" />
                    </radialGradient>

                    {/* Cloak depth */}
                    <linearGradient id="cloakDepth" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#030608" />
                        <stop offset="30%" stopColor="#050a10" />
                        <stop offset="60%" stopColor="#030608" />
                        <stop offset="100%" stopColor="#010203" />
                    </linearGradient>

                    {/* Nail metal */}
                    <linearGradient id="nailMetal" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#dbe5e2" />
                        <stop offset="30%" stopColor="#f2eddd" />
                        <stop offset="50%" stopColor="#b9f2ff" />
                        <stop offset="70%" stopColor="#f2eddd" />
                        <stop offset="100%" stopColor="#dbe5e2" />
                    </linearGradient>

                    {/* Gold hilt */}
                    <linearGradient id="goldHilt" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#d6b56d" />
                        <stop offset="50%" stopColor="#f2e0a8" />
                        <stop offset="100%" stopColor="#b8954f" />
                    </linearGradient>

                    {/* Lantern glass glow */}
                    <radialGradient id="lanternGlow" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" stopColor="#fff8e7" stopOpacity="1" />
                        <stop offset="30%" stopColor="#f6e6b3" stopOpacity="0.9" />
                        <stop offset="60%" stopColor="#d6b56d" stopOpacity="0.4" />
                        <stop offset="100%" stopColor="#b8954f" stopOpacity="0" />
                    </radialGradient>

                    {/* Ambient occlusion */}
                    <filter id="ao" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3" result="blur" />
                        <feOffset dx="2" dy="4" result="offsetBlur" />
                        <feComposite in="SourceGraphic" in2="offsetBlur" operator="over" />
                    </filter>

                    {/* Soft shadow */}
                    <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="8" result="blur" />
                        <feOffset dx="0" dy="20" result="offsetBlur" />
                        <feComponentTransfer>
                            <feFuncA type="table" tableValues="0 0.35" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode in="offsetBlur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>

                    {/* Bloom for soul elements */}
                    <filter id="soulBloom" x="-100%" y="-100%" width="300%" height="300%">
                        <feGaussianBlur stdDeviation="6" result="blur" />
                        <feComponentTransfer>
                            <feFuncA type="table" tableValues="0 0.6" />
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                {/* Ground shadow - cast shadow with perspective */}
                <ellipse
                    cx="110"
                    cy="268"
                    rx="58"
                    ry="8"
                    fill="#000000"
                    fillOpacity="0.55"
                    filter="url(#softShadow)"
                />

                {/* Subtle shadow diffusion rings */}
                <ellipse cx="110" cy="268" rx="72" ry="10" fill="#000000" fillOpacity="0.18" />
                <ellipse cx="110" cy="268" rx="90" ry="12" fill="#000000" fillOpacity="0.08" />

                {/* LANTERN IN LEFT HAND (closer to viewer) */}
                <g filter="url(#soulBloom)">
                    {/* Chain */}
                    <path d="M58 130Q54 150 58 170" stroke="#b8954f" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" />
                    <ellipse cx="58" cy="172" rx="2.5" ry="4" fill="#b8954f" fillOpacity="0.8" />

                    {/* Lantern cage */}
                    <path d="M58 172V210" stroke="#d6b56d" strokeOpacity="0.6" strokeWidth="1.2" />
                    {[176, 184, 192, 200].map((y) => (
                        <ellipse key={y} cx="58" cy={y} rx="2.5" ry="4.5" stroke="#d6b56d" strokeOpacity="0.5" strokeWidth="1" />
                    ))}

                    {/* Top cap */}
                    <path d="M48 210H68" stroke="#d6b56d" strokeOpacity="0.7" strokeWidth="1.5" />
                    <path d="M46 210H70" stroke="#d6b56d" strokeOpacity="0.4" strokeWidth="0.8" />

                    {/* Lantern body */}
                    <rect x="42" y="210" width="32" height="32" fill="#051016" stroke="#d6b56d" strokeOpacity="0.6" rx="2" />
                    <rect x="44" y="212" width="28" height="28" fill="none" stroke="#d6b56d" strokeOpacity="0.3" rx="1" />

                    {/* Glass panes with glow */}
                    <rect x="45" y="213" width="12" height="26" fill="url(#lanternGlow)" rx="1" />
                    <rect x="61" y="213" width="12" height="26" fill="url(#lanternGlow)" rx="1" />

                    {/* Inner flame */}
                    <ellipse cx="58" cy="226" rx="7" ry="10" fill="url(#lanternGlow)" />
                    <ellipse cx="58" cy="224" rx="4" ry="7" fill="#fff8e7" fillOpacity="0.95" />

                    {/* Bottom cap */}
                    <path d="M42 242H70" stroke="#d6b56d" strokeOpacity="0.7" strokeWidth="1.5" />
                    <ellipse cx="58" cy="246" rx="8" ry="3" fill="#b8954f" fillOpacity="0.5" />

                    {/* Light bloom on ground */}
                    <ellipse cx="58" cy="268" rx="22" ry="4" fill="#d6b56d" fillOpacity="0.08" />
                    <ellipse cx="58" cy="268" rx="16" ry="3" fill="#f6e6b3" fillOpacity="0.12" />
                </g>

                {/* CLOAK & BODY - with depth and AO */}
                <g filter="url(#ao)">
                    {/* Deep cloak base */}
                    <path
                        d="M110 98C90 98 75 112 68 132L55 220C52 236 48 250 38 260C58 266 72 266 82 264L88 280L100 264L110 280L120 264L132 280L138 264C148 266 162 266 182 260C172 250 168 236 165 220L152 132C145 112 130 98 110 98Z"
                        fill="url(#cloakDepth)"
                    />

                    {/* Cloak inner shadow (AO in folds) */}
                    <path
                        d="M85 120C80 150 78 190 74 230"
                        stroke="#000000"
                        strokeOpacity="0.4"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M135 120C140 150 142 190 146 230"
                        stroke="#000000"
                        strokeOpacity="0.35"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                    />

                    {/* Cloak highlight folds (catching key light) */}
                    <path
                        d="M88 118C85 145 82 180 80 220"
                        stroke="#b9f2ff"
                        strokeOpacity="0.06"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />
                    <path
                        d="M132 118C135 145 138 180 140 220"
                        stroke="#b9f2ff"
                        strokeOpacity="0.04"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    />

                    {/* Rim light on cloak edges */}
                    <path
                        d="M110 98C90 98 75 112 68 132L55 220C52 236 48 250 38 260"
                        stroke="url(#rimLight)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <path
                        d="M110 98C130 98 145 112 152 132L165 220C168 236 172 250 182 260"
                        stroke="url(#rimLight)"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        fill="none"
                    />

                    {/* Bottom rim glow */}
                    <path
                        d="M38 260C58 266 72 266 82 264L88 280L100 264L110 280L120 264L132 280L138 264C148 266 162 266 182 260"
                        stroke="#b9f2ff"
                        strokeOpacity="0.25"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        fill="none"
                    />
                </g>

                {/* NAIL OVER SHOULDER - 3D metal */}
                <g transform="rotate(12 158 135)">
                    {/* Blade - tapered with highlight center */}
                    <path
                        d="M154 28L162 28L159 160L157 160L154 28Z"
                        fill="url(#nailMetal)"
                    />
                    {/* Central fuller groove */}
                    <path
                        d="M157 40L157 150"
                        stroke="#b9f2ff"
                        strokeOpacity="0.25"
                        strokeWidth="1"
                    />
                    {/* Edge highlight */}
                    <path
                        d="M154 28L157 150"
                        stroke="#f2eddd"
                        strokeOpacity="0.5"
                        strokeWidth="0.6"
                    />
                    <path
                        d="M162 28L159 150"
                        stroke="#08131a"
                        strokeOpacity="0.5"
                        strokeWidth="0.6"
                    />

                    {/* Crossguard */}
                    <path
                        d="M149 160H167V166H149V160Z"
                        fill="url(#goldHilt)"
                    />
                    <ellipse cx="158" cy="163" rx="9" ry="3" fill="url(#goldHilt)" />

                    {/* Grip */}
                    <path
                        d="M155 166H161V195H155V166Z"
                        fill="#87938f"
                    />
                    {/* Grip wrap */}
                    {[170, 175, 180, 185, 190].map((y) => (
                        <path
                            key={y}
                            d={`M153 ${y}Q158 ${y+1.5} 163 ${y}`}
                            stroke="#6b7a72"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                        />
                    ))}

                    {/* Pommel */}
                    <ellipse cx="158" cy="198" rx="7" ry="5" fill="url(#goldHilt)" />
                    <ellipse cx="158" cy="198" rx="4" ry="3" fill="#f2e0a8" fillOpacity="0.6" />
                </g>

                {/* LANTERN ON BELT (right side) */}
                <g transform="translate(145 195) scale(0.65)">
                    <path d="M0 0V20" stroke="#b8954f" strokeOpacity="0.6" strokeWidth="1" />
                    <ellipse cx="0" cy="20" rx="8" ry="12" fill="#051016" stroke="#d6b56d" strokeOpacity="0.5" />
                    <ellipse cx="0" cy="16" rx="6" ry="10" fill="url(#lanternGlow)" />
                    <ellipse cx="0" cy="14" rx="3" ry="5" fill="#fff8e7" fillOpacity="0.9" />
                </g>

                {/* MASK & HORNS - subsurface scattering */}
                <g transform="translate(110 80) scale(0.72) translate(-64 -64)">
                    {/* Horns - with rim light */}
                    <path
                        d="M42 40C35 27 25 15 8 5C17 22 23 38 24 53C30 46 36 42 42 40Z"
                        fill="url(#maskGlow)"
                    />
                    <path
                        d="M86 40C93 27 103 15 120 5C111 22 105 38 104 53C98 46 92 42 86 40Z"
                        fill="url(#maskGlow)"
                    />

                    {/* Horn rim highlights */}
                    <path
                        d="M42 40C35 27 25 15 8 5"
                        stroke="#f2eddd"
                        strokeOpacity="0.55"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        fill="none"
                    />
                    <path
                        d="M86 40C93 27 103 15 120 5"
                        stroke="#f2eddd"
                        strokeOpacity="0.55"
                        strokeWidth="0.8"
                        strokeLinecap="round"
                        fill="none"
                    />

                    {/* Mask face */}
                    <path
                        d="M64 20C50 20 39 29 37 44C35 58 40 70 48 80L64 94L80 80C88 70 93 58 91 44C89 29 78 20 64 20Z"
                        fill="url(#maskGlow)"
                    />

                    {/* Mask AO - eye sockets deeper */}
                    <ellipse cx="50" cy="55" rx="7" ry="11" transform="rotate(12 50 55)" fill="#010203" fillOpacity="0.9" />
                    <ellipse cx="78" cy="55" rx="7" ry="11" transform="rotate(-12 78 55)" fill="#010203" fillOpacity="0.9" />

                    {/* Eye hollows */}
                    <ellipse cx="50" cy="55" rx="5.8" ry="10" transform="rotate(12 50 55)" fill="#03060a" />
                    <ellipse cx="78" cy="55" rx="5.8" ry="10" transform="rotate(-12 78 55)" fill="#03060a" />

                    {/* Subsurface glow in mask (thin areas) */}
                    <ellipse cx="56" cy="38" rx="8" ry="6" transform="rotate(-15 56 38)" fill="#b9f2ff" fillOpacity="0.06" />
                    <ellipse cx="72" cy="38" rx="8" ry="6" transform="rotate(15 72 38)" fill="#b9f2ff" fillOpacity="0.06" />
                    <ellipse cx="64" cy="48" rx="10" ry="5" fill="#d6b56d" fillOpacity="0.04" />

                    {/* Mask crack - subtle */}
                    <path
                        d="M43 36C47 39 50 43 51 47"
                        stroke="#03060a"
                        strokeOpacity="0.25"
                        strokeWidth="1"
                        strokeLinecap="round"
                    />

                    {/* Chin highlight */}
                    <ellipse cx="64" cy="88" rx="12" ry="4" fill="#f2eddd" fillOpacity="0.08" />
                </g>

                {/* SOUL PARTICLES around knight */}
                <g fill="#b9f2ff" fillOpacity="0.6" filter="url(#soulBloom)">
                    <circle cx="95" cy="60" r="1.8" opacity="0.7" />
                    <circle cx="125" cy="55" r="1.4" opacity="0.5" />
                    <circle cx="85" cy="100" r="1.6" opacity="0.55" />
                    <circle cx="135" cy="95" r="1.3" opacity="0.45" />
                    <circle cx="70" cy="150" r="1.5" opacity="0.5" />
                    <circle cx="150" cy="145" r="1.2" opacity="0.4" />
                    <circle cx="60" cy="200" r="1.4" opacity="0.45" />
                    <circle cx="160" cy="195" r="1.3" opacity="0.35" />
                </g>

                {/* GOLD PARTICLES near lantern */}
                <g fill="#d6b56d" fillOpacity="0.55" filter="url(#soulBloom)">
                    <circle cx="45" cy="230" r="1.2" opacity="0.5" />
                    <circle cx="70" cy="225" r="1" opacity="0.4" />
                    <circle cx="50" cy="250" r="1.3" opacity="0.45" />
                </g>
            </svg>
        </motion.div>
    );
}

export default KnightFigure3D;