'use client';

import React from "react";
import { motion } from "motion/react";
import { Github, Linkedin, Mail, Code, Send } from "lucide-react";

const Contact = () => {
    return (
        <section className="relative py-32 bg-black overflow-hidden flex flex-col items-center justify-center min-h-[50vh]" id="contact">

            <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tighter">
                        Let's Connect
                    </h2>
                    <p className="text-xl text-gray-500 max-w-xl mx-auto font-light">
                        Ready to build something extraordinary?
                    </p>
                </motion.div>

                <div className="flex flex-wrap justify-center gap-4 mb-20">
                    <a href="https://github.com/NikhilKottoli" target="_blank" rel="noopener noreferrer"
                        className="group flex items-center gap-3 px-8 py-4 bg-black border border-white/10 hover:border-white hover:bg-white transition-all duration-300">
                        <Github className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                        <span className="text-gray-400 group-hover:text-black font-medium tracking-wide transition-colors">GitHub</span>
                    </a>
                    <a href="https://www.linkedin.com/in/nikhil-kottoli-92552128a/" target="_blank" rel="noopener noreferrer"
                        className="group flex items-center gap-3 px-8 py-4 bg-black border border-white/10 hover:border-white hover:bg-white transition-all duration-300">
                        <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                        <span className="text-gray-400 group-hover:text-black font-medium tracking-wide transition-colors">LinkedIn</span>
                    </a>
                    <a href="mailto:nikhilkottoli2005@gmail.com"
                        className="group flex items-center gap-3 px-8 py-4 bg-black border border-white/10 hover:border-white hover:bg-white transition-all duration-300">
                        <Mail className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                        <span className="text-gray-400 group-hover:text-black font-medium tracking-wide transition-colors">Email</span>
                    </a>
                    <a href="https://www.codechef.com/users/nikhil_k0tt0li" target="_blank" rel="noopener noreferrer"
                        className="group flex items-center gap-3 px-8 py-4 bg-black border border-white/10 hover:border-white hover:bg-white transition-all duration-300">
                        <Code className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                        <span className="text-gray-400 group-hover:text-black font-medium tracking-wide transition-colors">CodeChef</span>
                    </a>
                </div>

                <div className="inline-block border-t border-white/10 pt-10">
                    <p className="flex items-center justify-center gap-2 text-gray-500 text-sm tracking-widest uppercase">
                        nikhilkottoli2005@gmail.com
                    </p>
                    <footer className="mt-8 text-center text-gray-700 text-xs uppercase tracking-widest">
                        © {new Date().getFullYear()} Nikhil Kottoli
                    </footer>
                </div>
            </div>
        </section>
    );
};

export default Contact;
