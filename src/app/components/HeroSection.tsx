'use client';

import React from 'react';
import { motion } from 'motion/react';
import SoulMotes from './SoulMotes';
import Ornament from './Ornament';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
    { label: 'GitHub', href: 'https://github.com/NikhilKottoli', icon: Github, external: true },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/nikhil-kottoli-92552128a/', icon: Linkedin, external: true },
    { label: 'Email', href: 'mailto:nikhilkottoli2005@gmail.com', icon: Mail, external: false },
];

const HeroSection = () => {
    return (
        <div className="relative flex min-h-[100svh] w-full flex-col items-center justify-center overflow-hidden py-28">
            {/* Atmospheric backdrop */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_48%_at_50%_38%,rgba(154,219,232,0.1),transparent_70%)]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_30%_at_50%_60%,rgba(200,169,107,0.04),transparent_70%)]" />
                <SoulMotes className="absolute inset-0 h-full w-full opacity-80" />

                {/* Geometric sigils */}
                <div className="absolute left-1/2 top-[16%] h-[54vmin] w-[54vmin] -translate-x-1/2 rotate-45 border border-pale/[0.045]" />
                <div className="absolute left-1/2 top-[21%] h-[40vmin] w-[40vmin] -translate-x-1/2 rotate-45 border border-gold/[0.06]" />
                <div className="absolute left-1/2 top-[26%] h-[24vmin] w-[24vmin] -translate-x-1/2 rotate-45 border border-soul/[0.05]" />

                <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-void to-transparent" />
                <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-void via-void/85 to-transparent" />
            </div>

            {/* Fine corner frames */}
            <div className="pointer-events-none absolute inset-x-5 bottom-14 top-24 z-[1] hidden sm:block">
                <span className="absolute left-0 top-0 h-10 w-10 border-l border-t border-pale/10" />
                <span className="absolute right-0 top-0 h-10 w-10 border-r border-t border-pale/10" />
                <span className="absolute bottom-0 left-0 h-10 w-10 border-b border-l border-pale/10" />
                <span className="absolute bottom-0 right-0 h-10 w-10 border-b border-r border-pale/10" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-5xl px-5 text-center sm:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="mb-7"
                >
                    <span className="inline-flex items-center gap-3 font-display text-[9px] uppercase tracking-[0.42em] text-mist/70 sm:text-[10px]">
                        <span className="h-px w-6 bg-gradient-to-r from-transparent to-gold/60" />
                        Software Developer
                        <span className="h-px w-6 bg-gradient-to-l from-transparent to-gold/60" />
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15, duration: 0.9 }}
                    className="hk-glow font-display text-[clamp(2.65rem,8.2vw,5.2rem)] font-semibold leading-[1.08] tracking-[0.07em] text-pale"
                >
                    NIKHIL
                    <span className="block text-soul/75 sm:ml-5 sm:inline">KOTTOLI</span>
                </motion.h1>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.9 }}
                    className="mx-auto mt-7 flex justify-center"
                >
                    <Ornament />
                </motion.div>

                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="mx-auto mt-6 max-w-2xl text-lg font-light italic leading-relaxed text-mist/80 sm:text-xl md:text-2xl"
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
                    transition={{ delay: 0.65, duration: 0.8 }}
                    className="mt-10 flex justify-center gap-3 sm:gap-4"
                >
                    {socialLinks.map(({ label, href, icon: Icon, external }) => (
                        <a
                            key={label}
                            href={href}
                            aria-label={label}
                            target={external ? '_blank' : undefined}
                            rel={external ? 'noopener noreferrer' : undefined}
                            className="group flex h-11 w-11 items-center justify-center rounded-full border border-pale/15 bg-pale/[0.02] text-mist/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-soul/50 hover:text-soul hover:shadow-[0_0_28px_-8px_rgba(154,219,232,0.55)] sm:h-12 sm:w-12"
                        >
                            <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                        </a>
                    ))}
                </motion.div>
            </div>

            {/* Scroll cue */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 1 }}
                className="absolute bottom-7 z-10 sm:bottom-9"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="font-display text-[8px] uppercase tracking-[0.4em] text-mist/45">
                        Descend
                    </span>
                    <ChevronDown className="h-4 w-4 text-mist/45" />
                </motion.div>
            </motion.div>
        </div>
    );
};

export default HeroSection;
