'use client';

import React from 'react';
import { motion } from 'motion/react';
import SoulMotes3D from './SoulMotes3D';
import KnightMark from './KnightMark';
import KnightFigure3D from './KnightFigure3D';
import HangingVines from './HangingVines';
import Lantern from './Lantern';
import Charm from './Charm';
import NailDivider from './NailDivider';
import ParallaxLayers from './ParallaxLayers';
import ForegroundParallax from './ForegroundParallax';
import DepthFog from './DepthFog';
import CameraBreath from './CameraBreath';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/NikhilKottoli', icon: Github, external: true },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nikhil-kottoli-92552128a/', icon: Linkedin, external: true },
    { label: 'Email', href: 'mailto:nikhilkottoli2005@gmail.com', icon: Mail, external: false },
];

const HeroSection = () => {
    return (
        <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden">
            {/* DEPTH SYSTEM - Order matters for z-index */}
            <ParallaxLayers />
            <DepthFog />
            <ForegroundParallax side="both" />
            <SoulMotes3D count={70} className="absolute inset-0 z-10" />

            {/* Camera breath wrapper for content */}
            <CameraBreath intensity={0.8}>
                <div className="relative z-20 flex min-h-[100svh] w-full max-w-6xl flex-col items-center justify-center overflow-hidden px-5 pb-28 pt-24 sm:px-8 sm:pb-48 sm:pt-32">
                    {/* Area title - floats slightly */}
                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: 'easeOut' }}
                        className="absolute top-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3 text-center"
                    >
                        <span className="h-px w-7 bg-gradient-to-r from-transparent to-gold/60 sm:w-10" />
                        <span className="font-display text-[9px] uppercase tracking-[0.42em] text-mist/75 sm:text-[10px]">
                            Software Developer
                        </span>
                        <span className="h-px w-7 bg-gradient-to-l from-transparent to-gold/60 sm:w-10" />
                    </motion.div>

                    {/* Mask crest - center of the cave */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.86 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.12, duration: 1, ease: 'easeOut' }}
                        className="relative mt-10 flex h-22 w-22 items-center justify-center sm:h-26 sm:w-26"
                    >
                        <span className="absolute inset-0 rotate-45 border border-gold/20" />
                        <span className="absolute inset-[8px] rotate-45 border border-pale/[0.05]" />
                        <span className="absolute inset-5 rounded-full bg-soul/[0.12] blur-xl" />
                        <KnightMark className="relative h-13 w-13 text-pale drop-shadow-[0_0_22px_rgba(185,242,255,0.45)] sm:h-15 sm:w-15" />
                    </motion.div>

                    {/* Name - Cinzel Decorative, stacked */}
                    <motion.h1
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.22, duration: 1, ease: 'easeOut' }}
                        className="hk-glow mt-7 font-logo text-[clamp(2.6rem,9vw,5.8rem)] font-bold uppercase leading-[0.95] tracking-[0.1em] text-pale text-center"
                    >
                        <span className="block">Nikhil</span>
                        <span className="mt-1 block bg-gradient-to-b from-pale via-soul/90 to-souldim/80 bg-clip-text text-transparent">
                            Kottoli
                        </span>
                    </motion.h1>

                    {/* Nail divider */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.45, duration: 0.8 }}
                        className="mt-8 flex justify-center"
                    >
                        <NailDivider />
                    </motion.div>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55, duration: 0.85 }}
                        className="mx-auto mt-6 max-w-2xl font-body text-lg font-light italic leading-relaxed text-mist/80 text-center sm:text-xl md:text-2xl"
                    >
                        An Engineering Student at{' '}
                        <span className="border-b border-gold/40 pb-0.5 font-medium not-italic text-pale">
                            NITK Surathkal
                        </span>
                        .
                    </motion.p>

                    {/* Charm social links */}
                    <motion.div
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7, duration: 0.8 }}
                        className="mt-10 flex justify-center gap-4 sm:gap-6"
                    >
                        {socialLinks.map(({ label, href, icon: Icon, external }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                title={label}
                                target={external ? '_blank' : undefined}
                                rel={external ? 'noopener noreferrer' : undefined}
                                className="group flex flex-col items-center gap-3"
                            >
                                <Charm
                                    icon={Icon}
                                    size="md"
                                    tone="gold"
                                    className="transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-[0_0_32px_-6px_rgba(214,181,109,0.6)]"
                                />
                                <span className="font-display text-[7px] uppercase tracking-[0.28em] text-mist/45 transition-colors duration-300 group-hover:text-soul">
                                    {label}
                                </span>
                            </a>
                        ))}
                    </motion.div>

                    {/* The Knight Figure - standing at the gate */}
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 z-25 hidden md:block"
                        style={{ pointerEvents: 'none' }}
                    >
                        <KnightFigure3D scale={1.1} />
                        {/* Ground contact glow */}
                        <div className="absolute bottom-3 left-1/2 h-16 w-48 -translate-x-1/2 rounded-[50%] bg-soul/[0.06] blur-3xl" />
                    </motion.div>

                    {/* Scroll cue */}
                    <motion.a
                        href="#skills"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.2, duration: 1 }}
                        className="group absolute bottom-7 right-6 z-30 flex flex-col items-center gap-2 sm:bottom-10 sm:right-10"
                    >
                        <span className="font-display text-[8px] uppercase tracking-[0.4em] text-mist/45 transition-colors group-hover:text-soul/70">
                            Descend
                        </span>
                        <motion.div
                            animate={{ y: [0, 8, 0] }}
                            transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut' }}
                            className="flex h-9 w-9 items-center justify-center border border-pale/10 transition-colors group-hover:border-soul/30"
                        >
                            <ChevronDown className="h-4.5 w-4.5 text-mist/45 transition-colors group-hover:text-soul/80" />
                        </motion.div>
                    </motion.a>
                </div>
            </CameraBreath>

            {/* Vignette edges */}
            <div className="pointer-events-none fixed inset-0 z-40" aria-hidden="true">
                <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-void via-void/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-void via-void/60 to-transparent" />
            </div>
        </div>
    );
};

export default HeroSection;