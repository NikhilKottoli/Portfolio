'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Trophy, ExternalLink } from 'lucide-react';

const Achievements = () => {
    const achievements = [
        {
            title: "Build Resilient Apps with Polkadot Cloud",
            organizer: "Polkadot",
            position: "1st Place",
            prize: "$3000",
            desc: "Built 'Agora', a decentralized computation marketplace for the Polkadot ecosystem.",
            image: "/Agora.png",
            link: "https://devpost.com/software/agora-bkfo60"
        },
        {
            title: "Polkadot AssetHub 2025",
            organizer: "Polkadot",
            position: "3rd Place",
            prize: "$250",
            desc: "Created 'Polkaflow', a no-code visual workflow builder for smart contracts.",
            image: "/Polkadot.webp",
            link: "https://dorahacks.io/buidl/26737"
        }
    ];

    return (
        <section className="relative py-32 bg-black" id="achievements">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Honors & Awards
                    </h2>
                    <div className="h-1 w-20 bg-white/20" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {achievements.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="group relative border border-white/10 bg-black hover:border-white/30 transition-all duration-300"
                        >
                            <div className="relative h-48 overflow-hidden bg-white/5">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100" />
                                <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-black/80 border border-white/20 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                    <Trophy className="w-3 h-3 text-white" /> {item.position}
                                </div>
                            </div>

                            <div className="p-6 relative z-20">
                                <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                                    {item.title}
                                </h3>
                                <div className="text-xs font-medium text-gray-500 mb-4 uppercase tracking-wider">
                                    {item.organizer} • {item.prize} Prize
                                </div>
                                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                    {item.desc}
                                </p>

                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-gray-300 transition-colors"
                                >
                                    View Project <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Achievements;
