'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Code } from 'lucide-react';
import SectionHeading from './SectionHeading';

const socialLinks = [
    {
        label: 'GitHub',
        href: 'https://github.com/NikhilKottoli',
        icon: Github,
        external: true
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/nikhil-kottoli-92552128a/',
        icon: Linkedin,
        external: true
    },
    {
        label: 'Email',
        href: 'mailto:nikhilkottoli2005@gmail.com',
        icon: Mail,
        external: false
    },
    {
        label: 'CodeChef',
        href: 'https://www.codechef.com/users/nikhil_k0tt0li',
        icon: Code,
        external: true
    }
];

const Contact = () => {
    return (
        <section
            className="relative flex min-h-[78svh] flex-col items-center justify-center overflow-hidden py-28 sm:py-32"
            id="contact"
        >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pale/10 to-transparent" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rotate-45 border border-pale/[0.035]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[48vmin] w-[48vmin] -translate-x-1/2 -translate-y-1/2 rotate-45 border border-gold/[0.05]" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-soul/[0.045] blur-[130px]" />

            <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
                <SectionHeading
                    align="center"
                    eyebrow="Correspondence"
                    title="Let's Connect"
                    description="Ready to build something extraordinary?"
                    className="mb-12 sm:mb-16"
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {socialLinks.map(({ label, href, icon: Icon, external }) => (
                        <a
                            key={label}
                            href={href}
                            target={external ? '_blank' : undefined}
                            rel={external ? 'noopener noreferrer' : undefined}
                            className="group flex items-center justify-center gap-3 border border-pale/12 bg-pale/[0.015] px-6 py-4 transition-all duration-300 hover:border-soul/35 hover:bg-soul/[0.05] hover:shadow-[0_0_34px_-18px_rgba(154,219,232,0.6)]"
                        >
                            <Icon className="h-4 w-4 text-mist/55 transition-colors duration-300 group-hover:text-soul" />
                            <span className="font-display text-[9px] uppercase tracking-[0.24em] text-mist/65 transition-colors duration-300 group-hover:text-pale">
                                {label}
                            </span>
                        </a>
                    ))}
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 }}
                    className="mt-14 flex flex-col items-center gap-4 sm:mt-16"
                >
                    <span className="h-px w-28 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
                    <a
                        href="mailto:nikhilkottoli2005@gmail.com"
                        className="break-all font-body text-sm tracking-wide text-mist/50 transition-colors duration-300 hover:text-soul"
                    >
                        nikhilkottoli2005@gmail.com
                    </a>
                    <span className="mt-1 h-1.5 w-1.5 rotate-45 border border-gold/50" aria-hidden="true" />
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
