'use client';

import React from "react";
import { motion } from "motion/react";
import { Github, Linkedin, Mail, Code, Send } from "lucide-react";

const Contact = () => {
    return (
        <section className="relative flex min-h-[50vh] flex-col items-center justify-center overflow-hidden bg-black py-20 sm:py-24 lg:py-32" id="contact">

            <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="mb-10 sm:mb-16"
                >
                    <h2 className="mb-4 text-4xl font-bold tracking-tighter text-white sm:mb-6 sm:text-5xl md:text-7xl">
                        Let's Connect
                    </h2>
                    <p className="mx-auto max-w-xl text-base font-light text-gray-500 sm:text-xl">
                        Ready to build something extraordinary?
                    </p>
                </motion.div>

                <div className="mb-12 flex flex-col justify-center gap-3 sm:mb-20 sm:flex-row sm:flex-wrap sm:gap-4">
                    <a href="https://github.com/NikhilKottoli" target="_blank" rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-3 border border-white/10 bg-black px-6 py-4 transition-all duration-300 hover:border-white hover:bg-white sm:px-8">
                        <Github className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                        <span className="text-gray-400 group-hover:text-black font-medium tracking-wide transition-colors">GitHub</span>
                    </a>
                    <a href="https://www.linkedin.com/in/nikhil-kottoli-92552128a/" target="_blank" rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-3 border border-white/10 bg-black px-6 py-4 transition-all duration-300 hover:border-white hover:bg-white sm:px-8">
                        <Linkedin className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                        <span className="text-gray-400 group-hover:text-black font-medium tracking-wide transition-colors">LinkedIn</span>
                    </a>
                    <a href="mailto:nikhilkottoli2005@gmail.com"
                        className="group flex items-center justify-center gap-3 border border-white/10 bg-black px-6 py-4 transition-all duration-300 hover:border-white hover:bg-white sm:px-8">
                        <Mail className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                        <span className="text-gray-400 group-hover:text-black font-medium tracking-wide transition-colors">Email</span>
                    </a>
                    <a href="https://www.codechef.com/users/nikhil_k0tt0li" target="_blank" rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-3 border border-white/10 bg-black px-6 py-4 transition-all duration-300 hover:border-white hover:bg-white sm:px-8">
                        <Code className="w-5 h-5 text-gray-400 group-hover:text-black transition-colors" />
                        <span className="text-gray-400 group-hover:text-black font-medium tracking-wide transition-colors">CodeChef</span>
                    </a>
                </div>

                <div className="inline-block border-t border-white/10 pt-10">
                    <p className="flex items-center justify-center gap-2 break-all text-xs uppercase tracking-widest text-gray-500 sm:text-sm">
                        nikhilkottoli2005@gmail.com
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
