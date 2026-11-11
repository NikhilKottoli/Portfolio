'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

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

    const isActive = (path: string) => pathname === path;

    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    const navigate = (path: string) => {
        setIsOpen(false);
        router.push(path);
    };

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5"
        >
            <div className="mx-auto max-w-7xl">
                <div className="grid grid-cols-2 items-center gap-4 lg:grid-cols-[1fr_auto_1fr]">
                    {/* Sigil */}
                    <button
                        onClick={() => navigate('/')}
                        aria-label="Go to home"
                        className="group flex items-center gap-3 justify-self-start"
                    >
                        <span className="relative flex h-9 w-9 items-center justify-center">
                            <span className="absolute inset-1 rotate-45 border border-gold/35 transition-all duration-500 group-hover:border-gold/80 group-hover:shadow-[0_0_20px_-4px_rgba(200,169,107,0.55)]" />
                            <span className="absolute inset-0 rotate-45 border border-pale/[0.05]" />
                            <span className="relative font-display text-[9px] font-semibold tracking-[0.06em] text-pale">
                                NK
                            </span>
                        </span>
                        <span className="hidden text-left sm:block">
                            <span className="block font-display text-[10px] font-medium tracking-[0.34em] text-pale">
                                NIKHIL
                            </span>
                            <span className="block font-display text-[7px] uppercase tracking-[0.42em] text-mist/45">
                                Kottoli
                            </span>
                        </span>
                    </button>

                    {/* Desktop links */}
                    <div className="relative hidden items-center gap-0.5 border border-pale/10 bg-void/65 p-1.5 shadow-[0_18px_50px_-24px_rgba(0,0,0,0.95)] backdrop-blur-xl lg:flex">
                        <span className="pointer-events-none absolute -left-px -top-px h-2 w-2 border-l border-t border-gold/40" />
                        <span className="pointer-events-none absolute -bottom-px -right-px h-2 w-2 border-b border-r border-gold/40" />

                        {navItems.map((item) => (
                            <button
                                key={item.name}
                                onClick={() => navigate(item.path)}
                                className={`relative px-4 py-2 font-display text-[9px] uppercase tracking-[0.26em] transition-colors duration-300 ${
                                    isActive(item.path)
                                        ? 'text-pale'
                                        : 'text-mist/60 hover:text-pale'
                                }`}
                            >
                                {isActive(item.path) && (
                                    <motion.span
                                        layoutId="active-nav-tab"
                                        className="absolute inset-0 border border-gold/25 bg-pale/[0.055] shadow-[inset_0_0_22px_rgba(154,219,232,0.07)]"
                                        transition={{ type: 'spring', bounce: 0.15, duration: 0.55 }}
                                    >
                                        <span className="absolute -bottom-px left-1/2 h-px w-6 -translate-x-1/2 bg-gold/70" />
                                    </motion.span>
                                )}
                                <span className="relative z-10">{item.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Balance mark */}
                    <div className="hidden items-center gap-2.5 justify-self-end lg:flex">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-soul/35" />
                            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-soul/75" />
                        </span>
                        <span className="font-display text-[8px] uppercase tracking-[0.32em] text-mist/45">
                            NITK Surathkal
                        </span>
                    </div>

                    {/* Mobile trigger */}
                    <button
                        onClick={() => setIsOpen((open) => !open)}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        className="flex h-10 w-10 items-center justify-center border border-pale/12 bg-void/65 text-mist/80 backdrop-blur-xl transition-colors hover:border-gold/35 hover:text-pale lg:hidden justify-self-end"
                    >
                        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
                    </button>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            id="mobile-menu"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.22 }}
                            className="mt-2 overflow-hidden border border-pale/10 bg-abyss/95 p-2 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.95)] backdrop-blur-xl lg:hidden"
                        >
                            <p className="px-3 py-2 font-display text-[7px] uppercase tracking-[0.42em] text-mist/35">
                                Navigation
                            </p>
                            {navItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => navigate(item.path)}
                                    className={`flex w-full items-center justify-between px-3 py-3 text-left font-display text-[10px] uppercase tracking-[0.26em] transition-colors ${
                                        isActive(item.path)
                                            ? 'border border-gold/25 bg-pale/[0.055] text-pale'
                                            : 'border border-transparent text-mist/65 hover:bg-pale/[0.035] hover:text-pale'
                                    }`}
                                >
                                    {item.name}
                                    {isActive(item.path) && (
                                        <span className="h-1.5 w-1.5 rotate-45 bg-gold/80" />
                                    )}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default NavBar;
