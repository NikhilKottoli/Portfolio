'use client';

import React from 'react';
import { motion } from 'motion/react';
import SoulMotes from './SoulMotes';
import KnightMark from './KnightMark';
import KnightFigure from './KnightFigure';
import HallownestSkyline from './HallownestSkyline';
import HangingVines from './HangingVines';
import Lantern from './Lantern';
import Charm from './Charm';
import NailDivider from './NailDivider';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/NikhilKottoli', icon: Github, external: true },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nikhil-kottoli-92552128a/', icon: Linkedin, external: true },
    { label: 'Email', href: 'mailto:nikhilkottoli2005@gmail.com', icon: Mail, external: false },
];

const HeroSection = () => {
    return (
        <div className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden px-5 pb-24 pt-24 sm:px-8 sm:pb-48 sm:pt-32">
            {/* Cave chamber */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_58%_44%_at_50%_34%,rgba(185,242,255,0.115),transparent_68%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_46%_32%_at_50%_98%,rgba(214,181,109,0.06),transparent_72%)]" />

                {/* Mask sigil burned into the cavern wall */}
                <KnightMark className="absolute left-1/2 top-[12%] h-[64vmin] w-[64vmin] -translate-x-1/2 text-pale/[0.03]" />

                <SoulMotes className="absolute inset-0 h-full w-full opacity-90" />

                <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-void via-void/55 to-transparent" />

                {/* Living cave edges */}
                <HangingVines
                    side="left"
                    className="absolute -left-4 -top-6 h-[62vh] w-28 text-moss/30 sm:left-0 sm:w-40"
                />
                <HangingVines
                    side="right"
                    className="absolute -right-4 -top-6 h-[54vh] w-24 text-moss/25 sm:right-0 sm:w-36"
                />

                <Lantern sway className="absolute left-[5%] top-0 hidden h-56 w-24 lg:block xl:left-[9%]" />
                <Lantern sway className="absolute right-[6%] top-0 hidden h-44 w-20 lg:block xl:right-[10%]" />

                {/* Distant Hallownest skyline */}
                <div className="absolute inset-x-0 bottom-0 h-[52vh] sm:h-[48vh]">
                    <HallownestSkyline className="absolute inset-x-0 bottom-0 h-full w-full text-deep" />
                    <div className="absolute inset-0 bg-gradient-to-t from-void via-void/55 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-void to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-[radial-gradient(ellipse_38%_100%_at_50%_100%,rgba(185,242,255,0.09),transparent_70%)]" />
                </div>

                {/* The wanderer standing before the gate */}
                <KnightFigure className="hk-float absolute bottom-0 left-1/2 hidden h-[24vh] min-h-[176px] max-h-[230px] w-auto -translate-x-1/2 md:block" />
                <div className="absolute bottom-[3%] left-1/2 h-20 w-52 -translate-x-1/2 rounded-[50%] bg-soul/[0.07] blur-3xl" />

                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-void via-void/70 to-transparent" />
            </div>

            {/* Area title */}
            <div className="relative z-10 flex w-full max-w-4xl flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="flex items-center gap-3"
                >
                    <span className="h-px w-7 bg-gradient-to-r from-transparent to-gold/60 sm:w-10" />
                    <span className="font-display text-[9px] uppercase tracking-[0.42em] text-mist/75 sm:text-[10px]">
                        Software Developer
                    </span>
                    <span className="h-px w-7 bg-gradient-to-l from-transparent to-gold/60 sm:w-10" />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.86 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1, duration: 0.9, ease: 'easeOut' }}
                    className="relative mt-7 flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24"
                >
                    <span className="absolute inset-0 rotate-45 border border-gold/25" />
                    <span className="absolute inset-[7px] rotate-45 border border-pale/[0.06]" />
                    <span className="absolute inset-4 rounded-full bg-soul/[0.14] blur-xl" />
                    <KnightMark className="relative h-12 w-12 text-pale drop-shadow-[0_0_18px_rgba(185,242,255,0.4)] sm:h-14 sm:w-14" />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.95 }}
                    className="hk-glow mt-6 font-logo text-[clamp(2.5rem,9vw,5.65rem)] font-bold uppercase leading-[0.98] tracking-[0.1em] text-pale"
                >
                    <span className="block">Nikhil</span>
                    <span className="mt-1 block bg-gradient-to-b from-pale via-soul/90 to-souldim/80 bg-clip-text text-transparent">
                        Kottoli
                    </span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45, duration: 0.9 }}
                    className="mt-7 flex justify-center"
                >
                    <NailDivider />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.8 }}
                    className="mx-auto mt-5 max-w-2xl font-body text-lg font-light italic leading-relaxed text-mist/80 sm:text-xl md:text-2xl"
                >
                    An Engineering Student at{' '}
                    <span className="border-b border-gold/40 pb-0.5 font-medium not-italic text-pale">
                        NITK Surathkal
                    </span>
                    .
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                    className="mt-9 flex justify-center gap-3 sm:gap-5"
                >
                    {socialLinks.map(({ label, href, icon: Icon, external }) => (
                        <a
                            key={label}
                            href={href}
                            aria-label={label}
                            title={label}
                            target={external ? '_blank' : undefined}
                            rel={external ? 'noopener noreferrer' : undefined}
                            className="group flex flex-col items-center gap-2.5"
                        >
                            <Charm
                                icon={Icon}
                                size="md"
                                tone="gold"
                                className="transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_0_28px_-8px_rgba(214,181,109,0.5)]"
                            />
                            <span className="font-display text-[7px] uppercase tracking-[0.28em] text-mist/45 transition-colors duration-300 group-hover:text-soul">
                                {label}
                            </span>
                        </a>
                    ))}
                </motion.div>
            </div>

            {/* Scroll cue */}
            <motion.a
                href="#skills"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.15, duration: 1 }}
                className="group absolute bottom-6 right-5 z-10 flex flex-col items-center gap-2 sm:bottom-8 sm:right-8"
            >
                <span className="font-display text-[8px] uppercase tracking-[0.4em] text-mist/45 transition-colors group-hover:text-soul/70">
                    Descend
                </span>
                <motion.span
                    animate={{ y: [0, 7, 0] }}
                    transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
                    className="flex h-8 w-8 items-center justify-center border border-pale/10 transition-colors group-hover:border-soul/30"
                >
                    <ChevronDown className="h-4 w-4 text-mist/45 transition-colors group-hover:text-soul/80" />
                </motion.span>
            </motion.a>
        </div>
    );
};

export default HeroSection;
