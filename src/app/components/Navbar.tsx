'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X, GraduationCap } from 'lucide-react';
import KnightMark from './KnightMark';
import Charm from './Charm';

const navItems = [
    { name: 'About', path: '/' },
    { name: 'Experience', path: '/Experience' },
    { name: 'Projects', path: '/Projects' },
    { name: 'Open Source', path: '/OpenSource' },
    { name: 'Contact', path: '/Contact' }
];

const NavBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [progress, setProgress] = useState(0);

    const isActive = (path: string) => pathname === path;

    useEffect(() => { setIsOpen(false); }, [pathname]);

    useEffect(() => {
        let frame = 0;
        const update = () => {
            frame = 0;
            const max = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0);
        };
        const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
        update();
        window.addEventListener('scroll', onScroll, { passive: true });
        window.addEventListener('resize', onScroll);
        return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(frame); };
    }, [pathname]);

    const navigate = (path: string) => { setIsOpen(false); router.push(path); };

    return (
        <>
            {/* 3D Soul Thread - a physical line in the cave roof */}
            <div className="pointer-events-none fixed inset-x-0 top-0 z-[65] h-[3px]" aria-hidden="true">
                {/* Deep groove */}
                <div className="absolute inset-0 h-full bg-gradient-to-b from-void/80 via-transparent to-transparent" />
                {/* The thread itself - 3D with depth */}
                <div className="relative h-full origin-left will-change-transform" style={{ transform: `scaleX(${progress})` }}>
                    {/* Core glow */}
                    <div className="absolute inset-0 h-full bg-gradient-to-r from-souldim/80 via-soul to-gold/80 shadow-[0_0_16px_rgba(185,242,255,0.7),0_0_32px_rgba(214,181,109,0.4)]" />
                    {/* Highlight on top */}
                    <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-soul/60 to-transparent" />
                    {/* Subtle particles along thread */}
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-soul/70"
                            style={{
                                left: `${i * 12.5}%`,
                                animationDelay: `${i * 0.3}s`,
                                opacity: progress > i * 0.12 ? 1 : 0,
                                transition: 'opacity 0.3s ease'
                            }}
                        />
                    ))}
                </div>
            </div>

            <motion.nav
                initial={{ opacity: 0, y: -24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: 'easeOut' }}
                className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5"
            >
                <div className="mx-auto max-w-7xl">
                    <div className="grid grid-cols-2 items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
                        {/* Mask crest brand - 3D */}
                        <button
                            onClick={() => navigate('/')}
                            aria-label="Go to home"
                            className="group relative flex items-center gap-3 justify-self-start"
                        >
                            {/* Outer ring */}
                            <span className="relative flex h-12 w-12 items-center justify-center">
                                <span className="absolute inset-0 rotate-45 border border-gold/25 transition-all duration-500 group-hover:border-gold/65 group-hover:shadow-[0_0_24px_-4px_rgba(214,181,109,0.6)]" />
                                <span className="absolute inset-[6px] rotate-45 border border-pale/[0.05]" />
                                {/* Inner glow */}
                                <span className="absolute inset-2 rounded-full bg-soul/[0.08] blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <KnightMark className="relative h-8 w-8 text-pale/95 transition-all duration-500 group-hover:text-soul group-hover:drop-shadow-[0_0_14px_rgba(185,242,255,0.5)]" />
                            </span>
                            <span className="hidden text-left sm:block">
                                <span className="block font-logo text-[11px] font-bold uppercase tracking-[0.24em] text-pale">
                                    Nikhil
                                </span>
                                <span className="block font-display text-[7px] uppercase tracking-[0.42em] text-mist/45">
                                    Kottoli
                                </span>
                            </span>
                        </button>

                        {/* Desktop links - with depth panels */}
                        <div className="relative hidden items-center gap-0.5 border border-pale/10 bg-void/75 p-1.5 shadow-[0_24px_60px_-28px_rgba(0,0,0,1),inset_0_1px_0_rgba(242,237,221,0.05)] backdrop-blur-xl lg:flex">
                            <span className="pointer-events-none absolute -left-px -top-px h-2 w-2 border-l border-t border-gold/40" />
                            <span className="pointer-events-none absolute -bottom-px -right-px h-2 w-2 border-b border-r border-gold/40" />

                            {navItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => navigate(item.path)}
                                    className={`relative px-4 py-2 font-display text-[9px] uppercase tracking-[0.26em] transition-colors duration-300 ${
                                        isActive(item.path) ? 'text-pale' : 'text-mist/60 hover:text-pale'
                                    }`}
                                >
                                    {isActive(item.path) && (
                                        <motion.span
                                            layoutId="active-nav-tab"
                                            className="absolute inset-0 border border-gold/30 bg-gradient-to-b from-pale/[0.08] via-soul/[0.04] to-transparent shadow-[inset_0_0_24px_rgba(185,242,255,0.1),0_2px_8px_-2px_rgba(0,0,0,0.5)]"
                                            transition={{ type: 'spring', bounce: 0.15, duration: 0.55 }}
                                        >
                                            <span className="absolute -bottom-px left-1/2 h-px w-10 -translate-x-1/2 bg-gradient-to-r from-transparent via-gold/80 to-transparent" />
                                            <span className="absolute -top-px left-1/2 h-1 w-1 -translate-x-1/2 rotate-45 border border-gold/70 bg-void" />
                                        </motion.span>
                                    )}
                                    <span className="relative z-10">{item.name}</span>
                                </button>
                            ))}
                        </div>

                        {/* Resting place - charm with depth */}
                        <div className="hidden items-center gap-3 justify-self-end lg:flex">
                            <div className="relative">
                                <span className="absolute inset-0 rotate-45 border border-gold/20" />
                                <Charm icon={GraduationCap} size="sm" tone="soul" />
                            </div>
                            <span className="font-display text-[8px] uppercase tracking-[0.32em] text-mist/50">
                                NITK Surathkal
                            </span>
                        </div>

                        {/* Mobile trigger */}
                        <button
                            onClick={() => setIsOpen((open) => !open)}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                            aria-label={isOpen ? 'Close menu' : 'Open menu'}
                            className="flex h-10 w-10 items-center justify-center border border-pale/12 bg-void/70 text-mist/80 backdrop-blur-xl transition-all duration-300 hover:border-gold/35 hover:text-pale hover:shadow-[0_0_20px_-6px_rgba(214,181,109,0.4)] lg:hidden justify-self-end"
                        >
                            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                        </button>
                    </div>

                    {/* Mobile menu - deep panel */}
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                id="mobile-menu"
                                initial={{ opacity: 0, y: -12, scale: 0.98 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -12, scale: 0.98 }}
                                transition={{ duration: 0.28, ease: 'easeOut' }}
                                className="relative mt-2 overflow-hidden border border-pale/10 bg-abyss/98 p-2 shadow-[0_32px_80px_-32px_rgba(0,0,0,1),inset_0_1px_0_rgba(242,237,221,0.04)] backdrop-blur-xl lg:hidden"
                            >
                                <KnightMark className="pointer-events-none absolute -right-4 -top-2 h-24 w-24 text-pale/[0.03]" />
                                <div className="flex items-center gap-2 px-3 py-2 border-b border-pale/10 mb-2">
                                    <span className="h-1 w-1 rotate-45 bg-gold/70" />
                                    <p className="font-display text-[7px] uppercase tracking-[0.42em] text-mist/40">
                                        The Wanderer&apos;s Path
                                    </p>
                                </div>
                                {navItems.map((item, index) => (
                                    <button
                                        key={item.name}
                                        onClick={() => navigate(item.path)}
                                        className={`flex w-full items-center justify-between px-3 py-3.5 text-left font-display text-[10px] uppercase tracking-[0.26em] transition-all duration-300 ${
                                            isActive(item.path)
                                                ? 'border border-gold/25 bg-gradient-to-r from-pale/[0.06] to-soul/[0.03] text-pale shadow-[inset_0_0_20px_rgba(185,242,255,0.05)]'
                                                : 'border border-transparent text-mist/65 hover:bg-pale/[0.035] hover:text-pale'
                                        }`}
                                    >
                                        <span className="flex items-center gap-3">
                                            <span className="text-[8px] tracking-[0.2em] text-gold/45">
                                                {String(index + 1).padStart(2, '0')}
                                            </span>
                                            {item.name}
                                        </span>
                                        {isActive(item.path) && (
                                            <span className="relative h-1.5 w-1.5 rotate-45 bg-gold/80 before:absolute before:inset-0 before:rounded-full before:bg-gold/30 before:animate-ping" />
                                        )}
                                    </button>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.nav>
        </>
    );
};

export default NavBar;