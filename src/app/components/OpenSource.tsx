'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GitMerge, ExternalLink, GitPullRequest, ChevronDown, CheckCircle2 } from 'lucide-react';

const OpenSource = () => {
    const contributions = [
        {
            orgName: "FreeBSD",
            logo: "/experience/FreeBSD.png",
            description: "FreeBSD is an operating system used to power modern servers, desktops, and embedded platforms.",
            totalLinesChanged: 45,
            prs: [
                {
                    repo: "freebsd/freebsd",
                    number: "rG506e3e30a43c",
                    title: "Align PRR implementation with RFC 9937",
                    status: "Merged",
                    link: "https://reviews.freebsd.org/D56535",
                    date: "Jan 2025",
                    linesChanged: 45,
                }
            ]
        },
        {
            orgName: "Ruby On Rails",
            logo: "https://avatars.githubusercontent.com/u/4223?s=200&v=4",
            description: "Web application framework that includes everything needed to create database-backed web applications.",
            totalLinesChanged: 10,
            prs: [
                {
                    repo: "rails/rails",
                    number: "55581",
                    title: "Documentation Correction for Rails Release 8.0",
                    status: "Merged",
                    link: "https://github.com/rails/rails/pull/55581",
                    date: "Oct 2025",
                    linesChanged: 2,
                },
                {
                    repo: "rails/cssbundling-rails",
                    number: "182",
                    title: "Documentation Fix for css bundler",
                    status: "Merged",
                    link: "https://github.com/rails/cssbundling-rails/pull/182",
                    date: "Nov 2025",
                    linesChanged: 4,
                },
                {
                    repo: "rails/cssbundling-rails",
                    number: "181",
                    status: "Open",
                    title: "Changes application.tailwind.css to application.css",
                    link: "https://github.com/rails/cssbundling-rails/pull/181",
                    date: "Oct 2025",
                    linesChanged: 4,
                }
            ]
        },
        {
            orgName: "ns-3",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTf2P7LnXYhr5tqWh1rQ_-H9Q3dVUY_IOO4zQ&s",
            description: "ns-3 is a discrete-event network simulator for Internet systems, targeted primarily for research and education purposes.",
            totalLinesChanged: 3001,
            prs: [
                {
                    repo: "ns-3/ns-3",
                    number: "2744",
                    title: "Recent acknowledgement (RACK) in ns-3",
                    status: "Open",
                    link: "https://gitlab.com/nsnam/ns-3-dev/-/merge_requests/2744",
                    date: "Feb 2026",
                    linesChanged: 3001,
                }
            ]
        }
    ];

    const [openOrgs, setOpenOrgs] = useState<Record<string, boolean>>({});

    const toggle = (name: string) => {
        setOpenOrgs(prev => ({ ...prev, [name]: !prev[name] }));
    };

    return (
        <section className="relative overflow-hidden bg-black py-20 sm:py-24 lg:py-32" id="opensource">
            {/* Background Gradients */}
            <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#FF00FF]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-[#00FFFF]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 text-center sm:mb-16 lg:mb-20"
                >
                    <h2 className="mb-4 text-3xl font-black tracking-tight text-white sm:mb-6 sm:text-4xl md:text-6xl">
                        OPEN SOURCE
                    </h2>
                    <p className="mx-auto max-w-2xl text-base text-gray-400 sm:text-lg">
                        Contributing to the ecosystem that powers the modern web.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-6">
                    {contributions.map((org, index) => {
                        const isOpen = !!openOrgs[org.orgName];
                        const mergedCount = org.prs.filter(p => p.status === 'Merged').length;
                        const openCount = org.prs.filter(p => p.status === 'Open').length;

                        return (
                            <motion.div
                                key={org.orgName}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative group"
                            >
                                {/* Hover glow */}
                                <div className="absolute inset-0 bg-gradient-to-r from-[#FF00FF]/20 to-[#00FFFF]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300">

                                    {/* ── Clickable header row ── */}
                                    <button
                                        onClick={() => toggle(org.orgName)}
                                        className="flex w-full items-center gap-4 p-4 text-left sm:gap-6 sm:p-6 md:p-8"
                                    >
                                        {/* Logo */}
                                        <div className="relative shrink-0">
                                            <div className="absolute inset-0 rounded-full bg-white/20 blur-md" />
                                            <img
                                                src={org.logo}
                                                alt={org.orgName}
                                                loading="lazy"
                                                decoding="async"
                                                className="relative h-12 w-12 rounded-full border border-white/10 object-cover sm:h-14 sm:w-14"
                                            />
                                        </div>

                                        {/* Name + description */}
                                        <div className="min-w-0 flex-1">
                                            <h3 className="mb-1 text-xl font-bold text-white sm:text-2xl">{org.orgName}</h3>
                                            <p className="line-clamp-1 hidden text-sm leading-relaxed text-gray-400 sm:block">{org.description}</p>

                                            {/* Compact stats for mobile */}
                                            <div className="mt-2 flex flex-wrap items-center gap-2 md:hidden">
                                                {mergedCount > 0 && (
                                                    <div className="flex items-center gap-1 rounded-full border border-[#00FF00]/20 bg-[#00FF00]/10 px-2 py-1 font-mono text-[10px] text-[#00FF00]">
                                                        <CheckCircle2 className="h-3 w-3" />
                                                        {mergedCount} merged
                                                    </div>
                                                )}
                                                {openCount > 0 && (
                                                    <div className="flex items-center gap-1 rounded-full border border-[#FACC15]/20 bg-[#FACC15]/10 px-2 py-1 font-mono text-[10px] text-[#FACC15]">
                                                        <GitPullRequest className="h-3 w-3" />
                                                        {openCount} open
                                                    </div>
                                                )}
                                                <div className="flex items-center gap-1 rounded-full border border-[#00FFFF]/20 bg-[#00FFFF]/10 px-2 py-1 font-mono text-[10px] text-[#00FFFF]">
                                                    <GitMerge className="h-3 w-3" />
                                                    {org.totalLinesChanged} lines
                                                </div>
                                            </div>
                                        </div>

                                        {/* Stats pills */}
                                        <div className="hidden shrink-0 items-center gap-3 md:flex">
                                            {mergedCount > 0 && (
                                                <div className="flex items-center gap-1.5 text-xs font-mono text-[#00FF00] bg-[#00FF00]/10 border border-[#00FF00]/20 px-3 py-1.5 rounded-full">
                                                    <CheckCircle2 className="w-3 h-3" />
                                                    {mergedCount} merged
                                                </div>
                                            )}
                                            {openCount > 0 && (
                                                <div className="flex items-center gap-1.5 text-xs font-mono text-[#FACC15] bg-[#FACC15]/10 border border-[#FACC15]/20 px-3 py-1.5 rounded-full">
                                                    <GitPullRequest className="w-3 h-3" />
                                                    {openCount} open
                                                </div>
                                            )}
                                            <div className="flex items-center gap-1.5 text-xs font-mono text-[#00FFFF] bg-[#00FFFF]/10 border border-[#00FFFF]/20 px-3 py-1.5 rounded-full">
                                                <GitMerge className="w-3 h-3" />
                                                {org.totalLinesChanged} lines
                                            </div>
                                        </div>

                                        {/* Chevron */}
                                        <motion.div
                                            animate={{ rotate: isOpen ? 180 : 0 }}
                                            transition={{ duration: 0.25 }}
                                            className="shrink-0 ml-2"
                                        >
                                            <ChevronDown className="w-5 h-5 text-gray-400" />
                                        </motion.div>
                                    </button>

                                    {/* ── Expandable PR list ── */}
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
                                                <div className="grid grid-cols-1 gap-4 border-t border-white/10 px-4 pb-4 pt-4 sm:px-6 sm:pb-6 sm:pt-5 md:grid-cols-2 md:px-8">
                                                    {org.prs.map((pr) => (
                                                        <a
                                                            key={pr.number}
                                                            href={pr.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="group/pr relative flex flex-col overflow-hidden rounded-lg border border-white/5 bg-black/40 p-4 transition-all duration-300 hover:border-white/20 hover:bg-white/5 sm:p-5"
                                                        >
                                                            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover/pr:opacity-100 transition-opacity duration-300">
                                                                <ExternalLink className="w-4 h-4 text-white" />
                                                            </div>

                                                            <div className="mb-3 flex flex-wrap items-center gap-2 sm:gap-3">
                                                                <div className="flex items-center gap-2 text-xs font-mono text-[#00FFFF] bg-[#00FFFF]/10 px-2 py-1 rounded">
                                                                    <GitMerge className="w-3 h-3" />
                                                                    {pr.repo}#{pr.number}
                                                                </div>
                                                                {pr.status === 'Merged' && (
                                                                    <div className="flex items-center gap-1 text-xs font-mono text-[#00FF00] bg-[#00FF00]/10 px-2 py-1 rounded">
                                                                        <CheckCircle2 className="w-3 h-3" />
                                                                        MERGED
                                                                    </div>
                                                                )}
                                                                {pr.status === 'Open' && (
                                                                    <div className="flex items-center gap-1 text-xs font-mono text-[#FACC15] bg-[#FACC15]/10 px-2 py-1 rounded">
                                                                        <GitPullRequest className="w-3 h-3" />
                                                                        OPEN
                                                                    </div>
                                                                )}
                                                            </div>

                                                            <h4 className="mb-2 line-clamp-2 text-base font-medium text-gray-200 group-hover/pr:text-white sm:text-lg">
                                                                {pr.title}
                                                            </h4>

                                                            <div className="mt-auto pt-2 flex items-center gap-2 text-xs text-gray-500">
                                                                <GitPullRequest className="w-3 h-3" />
                                                                <span>Pull Request</span>
                                                                <span className="w-1 h-1 bg-gray-600 rounded-full" />
                                                                <span>{pr.date}</span>
                                                                {pr.linesChanged && (
                                                                    <>
                                                                        <span className="w-1 h-1 bg-gray-600 rounded-full" />
                                                                        <span className="text-[#00FF00]/70">+{pr.linesChanged} lines</span>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </a>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default OpenSource;