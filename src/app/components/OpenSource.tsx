'use client';

import React from 'react';
import { motion } from 'motion/react';
import { GitMerge, ExternalLink } from 'lucide-react';

const OpenSource = () => {
    const contributions = [
        {
            orgName: "Ruby On Rails",
            logo: "https://avatars.githubusercontent.com/u/4223?s=200&v=4",
            prs: [
                {
                    repo: "rails/rails",
                    number: "55581",
                    title: "Documentation Correction for Rails Release 8.0",
                    status: "Merged",
                    link: "https://github.com/rails/rails/pull/55581"
                },
                {
                    repo: "rails/cssbundling-rails",
                    number: "182",
                    title: "Documentation Fix for css bundler",
                    status: "Merged",
                    link: "https://github.com/rails/cssbundling-rails/pull/182"
                }
            ]
        }
    ];

    return (
        <section className="relative py-32 bg-black overflow-hidden" id="opensource">
            <div className="max-w-6xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Open Source Contributions
                    </h2>
                    <div className="h-1 w-20 bg-white/20" />
                </motion.div>

                <div className="space-y-12">
                    {contributions.map((org, index) => (
                        <motion.div
                            key={org.orgName}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-black border border-white/10 p-8 hover:border-white/30 transition-colors duration-300"
                        >
                            <div className="flex items-center gap-6 mb-8 border-b border-white/10 pb-8">
                                {/* Grayscale Logo */}
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={org.logo} alt={org.orgName} className="w-12 h-12 grayscale opacity-70" />
                                <div>
                                    <h3 className="text-2xl font-bold text-white tracking-tight">{org.orgName}</h3>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4">
                                {org.prs.map((pr) => (
                                    <a
                                        key={pr.number}
                                        href={pr.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group p-4 bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-white/10 transition-all duration-300 block"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div>
                                                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2 uppercase tracking-wider">
                                                    <span className="flex items-center gap-1"><GitMerge className="w-3 h-3" /> {pr.repo}</span>
                                                    <span>#{pr.number}</span>
                                                    <span className="px-1.5 py-0.5 border border-white/20 text-white/70 rounded-[1px] text-[10px]">
                                                        {pr.status}
                                                    </span>
                                                </div>
                                                <h4 className="font-medium text-lg text-gray-300 group-hover:text-white transition-colors">
                                                    {pr.title}
                                                </h4>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors shrink-0" />
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default OpenSource;
