'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
            title: "NEARCON Innovation Sandbox",
            organizer: "NEAR AI",
            position: "NOVA SDK winner",
            prize: "$1000",
            desc: "Private RAG, a vectorless, e2e encrypted, fully client side RAG using NEAR AI's TEE and NOVA's secure file storage",
            image: "/PrivateRag.png",
            link: "https://devspot.app/projects/1094"
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

    const [selectedAchievement, setSelectedAchievement] = React.useState<typeof achievements[0] | null>(null);

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
                            onClick={() => setSelectedAchievement(item)}
                            className="group relative border border-white/10 bg-black hover:border-white/30 transition-all duration-300 cursor-pointer"
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
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white hover:text-gray-300 transition-colors"
                                >
                                    View Project <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Detailed Modal */}
            <AnimatePresence>
                {selectedAchievement && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedAchievement(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-black border border-white/10 p-8 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative glass-panel"
                        >
                            <button
                                onClick={() => setSelectedAchievement(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>

                            <div className="mb-8">
                                <div className="flex flex-col md:flex-row items-start gap-6 mb-6">
                                    {selectedAchievement.image && (
                                        <div className="w-full md:w-48 h-32 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-white/5">
                                            <img
                                                src={selectedAchievement.image}
                                                alt={selectedAchievement.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{selectedAchievement.title}</h3>
                                        <h4 className="text-lg text-blue-400 mb-2">{selectedAchievement.organizer}</h4>
                                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
                                            <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded border border-white/10">
                                                <Trophy className="w-4 h-4 text-yellow-500" />
                                                <span className="text-white font-medium">{selectedAchievement.position}</span>
                                            </div>
                                            {selectedAchievement.prize && (
                                                <div className="flex items-center gap-1 bg-white/5 px-2 py-1 rounded border border-white/10">
                                                    <span className="text-green-400 font-bold">{selectedAchievement.prize} Prize</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <p className="text-gray-300 leading-relaxed mb-8">
                                    {selectedAchievement.desc}
                                </p>

                                {selectedAchievement.link && (
                                    <a
                                        href={selectedAchievement.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-bold uppercase tracking-widest hover:bg-gray-200 transition-colors rounded-lg"
                                    >
                                        View Project <ExternalLink className="w-4 h-4" />
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Achievements;
