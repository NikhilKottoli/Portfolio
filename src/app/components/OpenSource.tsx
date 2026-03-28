'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { GitMerge, ExternalLink, GitPullRequest, ChevronDown, CheckCircle2 } from 'lucide-react';

const OpenSource = () => {
    const contributions = [
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
        <section className="relative py-32 bg-black overflow-hidden" id="opensource">
            {/* Background Gradients */}
            <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#FF00FF]/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-[#00FFFF]/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20 text-center"
                >
                    <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                        OPEN SOURCE
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
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
                                        className="w-full flex items-center gap-6 p-6 md:p-8 text-left"
                                    >
                                        {/* Logo */}
                                        <div className="relative shrink-0">
                                            <div className="absolute inset-0 bg-white/20 rounded-full blur-md" />
                                            <img
                                                src={org.logo}
                                                alt={org.orgName}
                                                className="relative w-14 h-14 rounded-full border border-white/10 object-cover"
                                            />
                                        </div>

                                        {/* Name + description */}
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-2xl font-bold text-white mb-1">{org.orgName}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed line-clamp-1">{org.description}</p>
                                        </div>

                                        {/* Stats pills */}
                                        <div className="hidden sm:flex items-center gap-3 shrink-0">
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
                                                <div className="border-t border-white/10 px-6 md:px-8 pb-6 pt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {org.prs.map((pr) => (
                                                        <a
                                                            key={pr.number}
                                                            href={pr.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="group/pr flex flex-col p-5 rounded-lg bg-black/40 border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all duration-300 relative overflow-hidden"
                                                        >
                                                            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover/pr:opacity-100 transition-opacity duration-300">
                                                                <ExternalLink className="w-4 h-4 text-white" />
                                                            </div>

                                                            <div className="flex items-center gap-3 mb-3">
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

                                                            <h4 className="text-lg font-medium text-gray-200 group-hover/pr:text-white mb-2 line-clamp-2">
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