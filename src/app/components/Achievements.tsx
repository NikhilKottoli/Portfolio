'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, ExternalLink, X } from 'lucide-react';
import SectionHeading from './SectionHeading';
import KnightMark from './KnightMark';

const Achievements = () => {
    const achievements = [
        {
            title: 'ETH Global Mumbai 2026',
            organizer: 'ETH Global',
            position: 'Finalist · Arc Track',
            prize: '$7,000 USDC',
            desc: "RupeeRail - Cross-border payments on Ethereum using stablecoins and account abstraction. Won Arc's Best Mobile Web Consumer Agent track.",
            image: '/projects/RupeeRail-ethglobal.png',
            link: 'https://github.com/NikhilKottoli/RupeeRail'
        },
        {
            title: 'Build Resilient Apps with Polkadot Cloud',
            organizer: 'Polkadot',
            position: '1st Place',
            prize: '$3000',
            desc: "Built 'Agora', a decentralized computation marketplace for the Polkadot ecosystem.",
            image: '/projects/Agora.png',
            link: 'https://devpost.com/software/agora-bkfo60'
        },
        {
            title: 'NEARCON Innovation Sandbox',
            organizer: 'NEAR AI',
            position: 'NOVA SDK winner',
            prize: '$1000',
            desc: "Private RAG, a vectorless, e2e encrypted, fully client side RAG using NEAR AI's TEE and NOVA's secure file storage",
            image: '/projects/PrivateRag.png',
            link: 'https://devspot.app/projects/1094'
        },
        {
            title: 'Polkadot AssetHub 2025',
            organizer: 'Polkadot',
            position: '3rd Place',
            prize: '$250',
            desc: "Created 'Polkaflow', a no-code visual workflow builder for smart contracts.",
            image: '/awards/Polkadot.webp',
            link: 'https://dorahacks.io/buidl/26737'
        }
    ];

    const [selectedAchievement, setSelectedAchievement] = React.useState<typeof achievements[0] | null>(null);

    React.useEffect(() => {
        if (!selectedAchievement) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setSelectedAchievement(null);
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedAchievement]);

    return (
        <section className="relative overflow-hidden py-24 sm:py-28 lg:py-36" id="achievements">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pale/10 to-transparent" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-gold/[0.035] blur-[140px]" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
                <SectionHeading
                    eyebrow="Relics & Trophies"
                    title="Honors & Awards"
                    description="Recognition earned at hackathons and builder programs across the ecosystem."
                    icon={Trophy}
                    className="mb-12 sm:mb-16 lg:mb-20"
                />

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
                    {achievements.map((item, idx) => (
                        <motion.article
                            key={item.title}
                            initial={{ opacity: 0, y: 24, scale: 0.98 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.08, type: 'spring', stiffness: 120, damping: 18 }}
                            onClick={() => setSelectedAchievement(item)}
                            className="hk-panel-raised hk-frame group relative cursor-pointer overflow-hidden"
                        >
                            <div className="relative h-48 overflow-hidden bg-deep sm:h-56">
                                {/* Depth glow */}
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-soul/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    loading="lazy"
                                    decoding="async"
                                    className="h-full w-full object-cover opacity-75 saturate-[0.65] transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-95 group-hover:saturate-100"
                                    style={{ transformOrigin: 'center center' }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/25 to-transparent" />
                                <span className="absolute left-4 top-4 font-display text-[10px] tracking-[0.3em] text-pale/55">
                                    {String(idx + 1).padStart(2, '0')}
                                </span>
                                <div className="absolute right-4 top-4 flex items-center gap-2 border border-gold/35 bg-void/80 px-3 py-1.5 backdrop-blur-sm">
                                    <Trophy className="h-3 w-3 text-gold" />
                                    <span className="font-display text-[8px] uppercase tracking-[0.2em] text-gold/90">
                                        {item.position}
                                    </span>
                                </div>
                            </div>

                            <div className="relative p-5 sm:p-6">
                                <h3 className="font-display text-lg font-semibold leading-snug tracking-wide text-pale sm:text-xl">
                                    {item.title}
                                </h3>
                                <p className="mt-2.5 font-display text-[8px] uppercase tracking-[0.24em] text-gold/60">
                                    {item.organizer} · {item.prize} prize
                                </p>
                                <p className="mt-4 line-clamp-3 font-body text-[15px] leading-relaxed text-mist/65">
                                    {item.desc}
                                </p>

                                <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                    className="mt-6 inline-flex items-center gap-2 font-display text-[8px] uppercase tracking-[0.26em] text-soul/65 transition-colors duration-300 hover:text-soul"
                                >
                                    View Project <ExternalLink className="h-3 w-3" />
                                </a>
                            </div>
                        </motion.article>
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
                        className="fixed inset-0 z-[70] flex items-center justify-center bg-void/85 px-3 backdrop-blur-md sm:px-4"
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-label={selectedAchievement.title}
                            initial={{ scale: 0.94, opacity: 0, y: 12 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.94, opacity: 0, y: 12 }}
                            transition={{ duration: 0.28, ease: 'easeOut' }}
                            onClick={(e) => e.stopPropagation()}
                            className="hk-panel-raised hk-frame relative max-h-[86dvh] w-full max-w-2xl overflow-y-auto"
                        >
                            <button
                                onClick={() => setSelectedAchievement(null)}
                                aria-label="Close"
                                className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center border border-pale/12 bg-void/70 text-mist/70 backdrop-blur-sm transition-colors hover:border-gold/40 hover:text-pale"
                            >
                                <X className="h-4 w-4" />
                            </button>

                            <KnightMark className="pointer-events-none absolute -right-6 top-16 z-10 h-28 w-28 text-pale/[0.04] sm:top-20" />

                            <div className="relative h-44 w-full overflow-hidden border-b border-pale/10 bg-deep sm:h-52">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={selectedAchievement.image}
                                    alt={selectedAchievement.title}
                                    className="h-full w-full object-cover opacity-85"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/35 to-transparent" />
                                <div className="absolute bottom-4 left-5 flex items-center gap-2 border border-gold/35 bg-void/80 px-3 py-1.5 backdrop-blur-sm sm:left-8">
                                    <Trophy className="h-3 w-3 text-gold" />
                                    <span className="font-display text-[8px] uppercase tracking-[0.2em] text-gold/90">
                                        {selectedAchievement.position}
                                    </span>
                                </div>
                            </div>

                            <div className="p-5 sm:p-8">
                                <p className="font-display text-[8px] uppercase tracking-[0.32em] text-soul/60">
                                    {selectedAchievement.organizer}
                                </p>
                                <h3 className="mt-3 max-w-lg font-display text-xl font-semibold leading-snug tracking-wide text-pale sm:text-2xl">
                                    {selectedAchievement.title}
                                </h3>

                                <div className="mt-5 flex flex-wrap items-center gap-2">
                                    <span className="hk-chip px-3 py-1.5 font-display text-[8px] uppercase tracking-[0.22em] text-mist/70">
                                        {selectedAchievement.position}
                                    </span>
                                    <span className="border border-gold/25 bg-gold/[0.06] px-3 py-1.5 font-display text-[8px] uppercase tracking-[0.22em] text-gold/80">
                                        {selectedAchievement.prize} Prize
                                    </span>
                                </div>

                                <p className="mt-6 border-t border-pale/10 pt-6 font-body text-base leading-relaxed text-mist/75">
                                    {selectedAchievement.desc}
                                </p>

                                <a
                                    href={selectedAchievement.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hk-btn mt-7 inline-flex items-center gap-2.5 px-6 py-3 font-display text-[9px] uppercase tracking-[0.26em] text-pale"
                                >
                                    View Project <ExternalLink className="h-3.5 w-3.5" />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Achievements;
