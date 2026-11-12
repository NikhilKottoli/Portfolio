'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GitMerge, ExternalLink, GitPullRequest, ChevronDown, CheckCircle2 } from 'lucide-react';
import SectionHeading from './SectionHeading';

const OpenSource = () => {
    const contributions = [
        {
            orgName: 'FreeBSD',
            logo: '/experience/FreeBSD.png',
            description:
                'FreeBSD is an operating system used to power modern servers, desktops, and embedded platforms.',
            totalLinesChanged: 45,
            prs: [
                {
                    repo: 'freebsd/freebsd',
                    number: 'rG506e3e30a43c',
                    title: 'Align PRR implementation with RFC 9937',
                    status: 'Merged',
                    link: 'https://reviews.freebsd.org/D56535',
                    date: 'Jan 2025',
                    linesChanged: 45
                }
            ]
        },
        {
            orgName: 'Ruby On Rails',
            logo: 'https://avatars.githubusercontent.com/u/4223?s=200&v=4',
            description:
                'Web application framework that includes everything needed to create database-backed web applications.',
            totalLinesChanged: 10,
            prs: [
                {
                    repo: 'rails/rails',
                    number: '55581',
                    title: 'Documentation Correction for Rails Release 8.0',
                    status: 'Merged',
                    link: 'https://github.com/rails/rails/pull/55581',
                    date: 'Oct 2025',
                    linesChanged: 2
                },
                {
                    repo: 'rails/cssbundling-rails',
                    number: '182',
                    title: 'Documentation Fix for css bundler',
                    status: 'Merged',
                    link: 'https://github.com/rails/cssbundling-rails/pull/182',
                    date: 'Nov 2025',
                    linesChanged: 4
                },
                {
                    repo: 'rails/cssbundling-rails',
                    number: '181',
                    status: 'Open',
                    title: 'Changes application.tailwind.css to application.css',
                    link: 'https://github.com/rails/cssbundling-rails/pull/181',
                    date: 'Oct 2025',
                    linesChanged: 4
                }
            ]
        },
        {
            orgName: 'ns-3',
            logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf2P7LnXYhr5tqWh1rQ_-H9Q3dVUY_IOO4zQ&s',
            description:
                'ns-3 is a discrete-event network simulator for Internet systems, targeted primarily for research and education purposes.',
            totalLinesChanged: 3001,
            prs: [
                {
                    repo: 'ns-3/ns-3',
                    number: '2744',
                    title: 'Recent acknowledgement (RACK) in ns-3',
                    status: 'Open',
                    link: 'https://gitlab.com/nsnam/ns-3-dev/-/merge_requests/2744',
                    date: 'Feb 2026',
                    linesChanged: 3001
                }
            ]
        }
    ];

    const [openOrgs, setOpenOrgs] = useState<Record<string, boolean>>({});

    const toggle = (name: string) => {
        setOpenOrgs((prev) => ({ ...prev, [name]: !prev[name] }));
    };

    return (
        <section className="relative overflow-hidden py-24 sm:py-28 lg:py-36" id="opensource">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pale/10 to-transparent" />
            <div className="pointer-events-none absolute -left-40 top-1/4 h-[460px] w-[460px] rounded-full bg-soul/[0.04] blur-[140px]" />
            <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[420px] w-[420px] rounded-full bg-gold/[0.03] blur-[140px]" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
                <SectionHeading
                    align="center"
                    eyebrow="Lore & Contributions"
                    title="Open Source"
                    description="Contributing to the ecosystem that powers the modern web."
                    icon={GitMerge}
                    className="mb-12 sm:mb-16 lg:mb-20"
                />

                <div className="grid grid-cols-1 gap-5 lg:gap-6">
                    {contributions.map((org, index) => {
                        const isOpen = !!openOrgs[org.orgName];
                        const mergedCount = org.prs.filter((p) => p.status === 'Merged').length;
                        const openCount = org.prs.filter((p) => p.status === 'Open').length;

                        return (
                            <motion.div
                                key={org.orgName}
                                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08, type: 'spring', stiffness: 120, damping: 18 }}
                                className="hk-panel-raised hk-frame group"
                            >
                                <button
                                    onClick={() => toggle(org.orgName)}
                                    aria-expanded={isOpen}
                                    className="flex w-full items-center gap-4 p-5 text-left sm:gap-6 sm:p-6 md:p-7"
                                >
                                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center">
                                        <span className="absolute inset-0 rotate-45 border border-gold/25 transition-colors duration-500 group-hover:border-gold/50" />
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={org.logo}
                                            alt={org.orgName}
                                            loading="lazy"
                                            decoding="async"
                                            className="relative h-9 w-9 border border-pale/15 object-cover sm:h-10 sm:w-10"
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1">
                                        <h3 className="font-display text-lg font-semibold tracking-wide text-pale sm:text-2xl">
                                            {org.orgName}
                                        </h3>
                                        <p className="mt-1 line-clamp-1 hidden font-body text-[15px] leading-relaxed text-mist/55 sm:block">
                                            {org.description}
                                        </p>

                                        <div className="mt-3 flex flex-wrap items-center gap-2 md:hidden">
                                            {mergedCount > 0 && (
                                                <div className="flex items-center gap-1.5 border border-moss/25 bg-moss/[0.06] px-2 py-1 font-display text-[8px] uppercase tracking-[0.16em] text-moss/85">
                                                    <CheckCircle2 className="h-3 w-3" />
                                                    {mergedCount} merged
                                                </div>
                                            )}
                                            {openCount > 0 && (
                                                <div className="flex items-center gap-1.5 border border-gold/25 bg-gold/[0.05] px-2 py-1 font-display text-[8px] uppercase tracking-[0.16em] text-gold/85">
                                                    <GitPullRequest className="h-3 w-3" />
                                                    {openCount} open
                                                </div>
                                            )}
                                            <div className="flex items-center gap-1.5 border border-soul/20 bg-soul/[0.05] px-2 py-1 font-display text-[8px] uppercase tracking-[0.16em] text-soul/75">
                                                <GitMerge className="h-3 w-3" />
                                                {org.totalLinesChanged} lines
                                            </div>
                                        </div>
                                    </div>

                                    <div className="hidden shrink-0 items-center gap-2.5 md:flex">
                                        {mergedCount > 0 && (
                                            <div className="flex items-center gap-1.5 border border-moss/25 bg-moss/[0.06] px-3 py-1.5 font-display text-[9px] uppercase tracking-[0.18em] text-moss/85">
                                                <CheckCircle2 className="h-3 w-3" />
                                                {mergedCount} merged
                                            </div>
                                        )}
                                        {openCount > 0 && (
                                            <div className="flex items-center gap-1.5 border border-gold/25 bg-gold/[0.05] px-3 py-1.5 font-display text-[9px] uppercase tracking-[0.18em] text-gold/85">
                                                <GitPullRequest className="h-3 w-3" />
                                                {openCount} open
                                            </div>
                                        )}
                                        <div className="flex items-center gap-1.5 border border-soul/20 bg-soul/[0.05] px-3 py-1.5 font-display text-[9px] uppercase tracking-[0.18em] text-soul/75">
                                            <GitMerge className="h-3 w-3" />
                                            {org.totalLinesChanged} lines
                                        </div>
                                    </div>

                                    <motion.div
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.25 }}
                                        className="ml-1 flex h-8 w-8 shrink-0 items-center justify-center border border-pale/10 text-mist/50"
                                    >
                                        <ChevronDown className="h-4 w-4" />
                                    </motion.div>
                                </button>

                                <AnimatePresence initial={false}>
                                    {isOpen && (
                                        <motion.div
                                            key="prs"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                                            className="overflow-hidden"
                                        >
                                            <div className="grid grid-cols-1 gap-4 border-t border-pale/10 px-4 pb-4 pt-4 sm:px-6 sm:pb-6 sm:pt-5 md:grid-cols-2 md:px-7">
                                                {org.prs.map((pr) => (
                                                    <a
                                                        key={pr.number}
                                                        href={pr.link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="group/pr relative flex flex-col overflow-hidden hk-panel-recessed p-4 transition-all duration-300 hover:border-soul/30 hover:bg-soul/[0.035] sm:p-5"
                                                    >
                                                        <div className="absolute right-3 top-3 opacity-0 transition-opacity duration-300 group-hover/pr:opacity-100">
                                                            <ExternalLink className="h-4 w-4 text-soul/70" />
                                                        </div>

                                                        <div className="mb-3 flex flex-wrap items-center gap-2 sm:gap-3">
                                                            <div className="flex items-center gap-2 border border-soul/20 bg-soul/[0.05] px-2 py-1 font-display text-[8px] uppercase tracking-[0.16em] text-soul/75">
                                                                <GitMerge className="h-3 w-3" />
                                                                {pr.repo}#{pr.number}
                                                            </div>
                                                            {pr.status === 'Merged' && (
                                                                <div className="flex items-center gap-1.5 border border-moss/25 bg-moss/[0.06] px-2 py-1 font-display text-[8px] uppercase tracking-[0.16em] text-moss/85">
                                                                    <CheckCircle2 className="h-3 w-3" />
                                                                    Merged
                                                                </div>
                                                            )}
                                                            {pr.status === 'Open' && (
                                                                <div className="flex items-center gap-1.5 border border-gold/25 bg-gold/[0.05] px-2 py-1 font-display text-[8px] uppercase tracking-[0.16em] text-gold/85">
                                                                    <GitPullRequest className="h-3 w-3" />
                                                                    Open
                                                                </div>
                                                            )}
                                                        </div>

                                                        <h4 className="mb-2 line-clamp-2 font-body text-base font-medium leading-snug text-pale/85 transition-colors sm:text-lg">
                                                            {pr.title}
                                                        </h4>

                                                        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2 font-display text-[8px] uppercase tracking-[0.16em] text-mist/40">
                                                            <GitPullRequest className="h-3 w-3" />
                                                            <span>Pull Request</span>
                                                            <span className="h-1 w-1 rotate-45 bg-gold/40" />
                                                            <span>{pr.date}</span>
                                                            {pr.linesChanged && (
                                                                <>
                                                                    <span className="h-1 w-1 rotate-45 bg-gold/40" />
                                                                    <span className="text-moss/65">
                                                                        +{pr.linesChanged} lines
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>
                                                    </a>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default OpenSource;
