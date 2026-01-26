'use client';

import React from 'react';
import { motion } from 'motion/react';
import { GitMerge, ExternalLink, GitPullRequest, Star, CheckCircle2 } from 'lucide-react';

const OpenSource = () => {
    const contributions = [
        {
            orgName: "Ruby On Rails",
            logo: "https://avatars.githubusercontent.com/u/4223?s=200&v=4",
            description: "Web application framework that includes everything needed to create database-backed web applications.",
            prs: [
                {
                    repo: "rails/rails",
                    number: "55581",
                    title: "Documentation Correction for Rails Release 8.0",
                    status: "Merged",
                    link: "https://github.com/rails/rails/pull/55581",
                    date: "Oct 2025"
                },
                {
                    repo: "rails/cssbundling-rails",
                    number: "182",
                    title: "Documentation Fix for css bundler",
                    status: "Merged",
                    link: "https://github.com/rails/cssbundling-rails/pull/182",
                    date: "Nov 2025"
                }
            ]
        }
    ];

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

                <div className="grid grid-cols-1 gap-12">
                    {contributions.map((org, index) => (
                        <motion.div
                            key={org.orgName}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-[#FF00FF]/20 to-[#00FFFF]/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="relative bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-xl overflow-hidden hover:border-white/20 transition-all duration-300">
                                <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-white/20 rounded-full blur-md" />
                                        <img src={org.logo} alt={org.orgName} className="relative w-16 h-16 rounded-full border border-white/10 object-cover" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-3xl font-bold text-white mb-2">{org.orgName}</h3>
                                        <p className="text-gray-400 leading-relaxed max-w-2xl">{org.description}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                            </div>

                                            <h4 className="text-lg font-medium text-gray-200 group-hover/pr:text-white mb-2 line-clamp-2">
                                                {pr.title}
                                            </h4>

                                            <div className="mt-auto pt-2 flex items-center gap-2 text-xs text-gray-500">
                                                <GitPullRequest className="w-3 h-3" />
                                                <span>Pull Request</span>
                                                <span className="w-1 h-1 bg-gray-600 rounded-full" />
                                                <span>{pr.date}</span>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OpenSource;
