'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, Code, Flame } from 'lucide-react';
import SectionHeading from './SectionHeading';
import Charm from './Charm';
import Lantern from './Lantern';
import NailDivider from './NailDivider';

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

            {/* The last lit outpost before the surface */}
            <Lantern sway className="pointer-events-none absolute bottom-24 left-[7%] hidden h-52 w-24 opacity-70 xl:block" />
            <Lantern sway className="pointer-events-none absolute bottom-24 right-[8%] hidden h-44 w-20 opacity-60 xl:block" />

            <div className="relative z-10 mx-auto w-full max-w-4xl px-4 text-center sm:px-6">
                <SectionHeading
                    align="center"
                    eyebrow="Rest at a Bench"
                    title="Let's Connect"
                    description="Ready to build something extraordinary?"
                    icon={Flame}
                    className="mb-12 sm:mb-16"
                />

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
                >
                    {socialLinks.map(({ label, href, icon: Icon, external }) => (
                        <a
                            key={label}
                            href={href}
                            target={external ? '_blank' : undefined}
                            rel={external ? 'noopener noreferrer' : undefined}
                            aria-label={label}
                            className="group relative flex flex-col items-center gap-3 border border-pale/12 bg-pale/[0.015] px-4 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/35 hover:bg-gold/[0.04] hover:shadow-[0_0_34px_-18px_rgba(214,181,109,0.6)] sm:px-5 sm:py-6"
                        >
                            <span className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                            <Charm
                                icon={Icon}
                                size="md"
                                tone="gold"
                                className="transition-colors duration-300 group-hover:text-soul"
                            />
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
                    <NailDivider />
                    <a
                        href="mailto:nikhilkottoli2005@gmail.com"
                        className="break-all font-body text-sm tracking-wide text-mist/50 transition-colors duration-300 hover:text-soul"
                    >
                        nikhilkottoli2005@gmail.com
                    </a>
                    <span className="mt-1 font-display text-[7px] uppercase tracking-[0.36em] text-mist/30">
                        The lantern is always lit
                    </span>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
