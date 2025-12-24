'use client';

import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'motion/react';

const NavBar = () => {
    const router = useRouter();
    const pathname = usePathname();

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

    return (
        <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed top-0 w-full py-6 z-50 pointer-events-none"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-auto">
                <div className="flex justify-center">
                    <div className="flex items-center space-x-1 p-2 bg-black/50 backdrop-blur-xl rounded-full border border-white/10 shadow-2xl ring-1 ring-white/5">
                        {navItems.map((item, index) => (
                            <motion.button
                                key={item.name}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                onClick={() => router.push(item.path)}
                                className={`
                  relative px-5 py-2 rounded-full font-medium text-sm
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
                                        className="absolute inset-0 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.3)]"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
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
