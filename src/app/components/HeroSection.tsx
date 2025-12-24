'use client';

import React from 'react';
import { motion } from 'motion/react';
import LetterGlitch from './LetterGlitch';
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react';

const HeroSection = () => {
    return (
        <div className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black">
            {/* Background Glitch Effect */}
            <div className="absolute inset-0 z-0 opacity-20">
                <LetterGlitch
                    glitchSpeed={50}
                    centerVignette={true}
                    outerVignette={false}
                    smooth={true}
                />
            </div>

            {/* Content */}
            <div className="z-10 text-center px-4 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="mb-8 inline-block"
                >
                    {/* Simple monochrome pill */}
                    <span className="px-5 py-2 rounded-full border border-white/20 bg-black/50 backdrop-blur-md text-sm text-gray-300 font-medium tracking-[0.2em] uppercase">
                        Software Developer
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-6xl md:text-8xl font-black text-white mb-8 tracking-tighter leading-tight"
                >
                    NIKHIL <span className="text-gray-500">KOTTOLI</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                    className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto mb-12 font-light"
                >
                    Building digital experiences that fuse <span className="text-white font-medium border-b border-white/20 pb-0.5">performance</span> with <span className="text-white font-medium border-b border-white/20 pb-0.5">minimalism</span>.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    className="flex gap-8 justify-center"
                >
                    {/* Monochrome social links */}
                    <a href="https://github.com/NikhilKottoli" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                        <Github className="w-8 h-8" />
                    </a>
                    <a href="https://www.linkedin.com/in/nikhil-kottoli-92552128a/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                        <Linkedin className="w-8 h-8" />
                    </a>
                    <a href="mailto:nikhilkottoli2005@gmail.com" className="text-gray-400 hover:text-white transition-colors transform hover:scale-110">
                        <Mail className="w-8 h-8" />
                    </a>
                </motion.div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 z-10"
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2"
                >
                    <span className="text-[10px] uppercase tracking-widest text-gray-600">Scroll</span>
                    <ChevronDown className="w-6 h-6 text-gray-600" />
                </motion.div>
            </motion.div>

            {/* Overlay Vignette for seamless blending */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/0 via-black/0 to-black z-0" />
        </div>
    );
};

export default HeroSection;
