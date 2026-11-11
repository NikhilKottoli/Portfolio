'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, X } from 'lucide-react';

const NavBar = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: 'About', path: '/' },
        { name: 'Experience', path: '/Experience' },
        { name: 'Projects', path: '/Projects' },
        { name: 'Open Source', path: '/OpenSource' },
        { name: 'Contact', path: '/Contact' }
    ];

    const isActive = (path: string) => {
        return pathname === path;
    };

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
            className="fixed inset-x-0 top-0 z-50 px-4 pt-3 sm:px-6 sm:pt-6"
        >
            {/* Mobile navigation */}
            <div className="mx-auto max-w-7xl md:hidden">
                <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/60 px-4 py-2 shadow-2xl ring-1 ring-white/5 backdrop-blur-xl">
                    <button
                        onClick={() => navigate('/')}
                        aria-label="Go to home"
                        className="px-1 py-1 font-poppins text-sm font-bold tracking-[0.25em] text-white"
                    >
                        NK
                    </button>
                    <button
                        onClick={() => setIsOpen((open) => !open)}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        aria-label={isOpen ? 'Close menu' : 'Open menu'}
                        className="-mr-1 rounded-full p-2 text-gray-300 transition-colors hover:bg-white/10 hover:text-white"
                    >
                        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            id="mobile-menu"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.2 }}
                            className="mt-2 overflow-hidden rounded-2xl border border-white/10 bg-black/90 p-2 shadow-2xl backdrop-blur-xl"
                        >
                            {navItems.map((item) => (
                                <button
                                    key={item.name}
                                    onClick={() => navigate(item.path)}
                                    className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left font-poppins text-sm font-medium tracking-wide transition-colors ${
                                        isActive(item.path)
                                            ? 'bg-white text-black'
                                            : 'text-gray-300 hover:bg-white/5 hover:text-white'
                                    }`}
                                >
                                    {item.name}
                                    {isActive(item.path) && (
                                        <span className="h-1.5 w-1.5 rounded-full bg-black/70" />
                                    )}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Desktop navigation */}
            <div className="mx-auto hidden max-w-7xl md:block">
                <div className="flex justify-center">
                    <div className="flex items-center space-x-1 rounded-full border border-white/10 bg-black/50 p-2 shadow-2xl ring-1 ring-white/5 backdrop-blur-xl">
                        {navItems.map((item, index) => (
                            <motion.button
                                key={item.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => navigate(item.path)}
                                className={`
                  relative rounded-full px-5 py-2 text-sm font-medium
                  transition-all duration-300 ease-in-out
                  ${isActive(item.path)
                                        ? 'text-black'
                                        : 'text-gray-400 hover:text-white'
                                    }
                `}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {isActive(item.path) && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                                    />
                                )}

                                <span className="relative z-10 font-poppins tracking-wide">
                                    {item.name}
                                </span>
                            </motion.button>
                        ))}
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default NavBar;
