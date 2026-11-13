'use client';

import React from 'react';
import PixelIcon from './pixel/PixelIcon';
import PixelBadge from './pixel/PixelBadge';
import Reveal from './pixel/Reveal';
import SectionHeading from './SectionHeading';

type Achievement = {
    title: string;
    organizer: string;
    position: string;
    prize: string;
    desc: string;
    image: string;
    link: string;
};

const achievements: Achievement[] = [
    {
        title: 'ETH Global Mumbai 2026',
        organizer: 'ETH Global',
        position: 'Finalist · Arc Track',
        prize: '$7,000 USDC',
        desc: "RupeeRail - Cross-border payments on Ethereum using stablecoins and account abstraction. Won Arc's Best Mobile Web Consumer Agent track.",
        image: '/projects/RupeeRail-ethglobal.png',
        link: 'https://github.com/NikhilKottoli/RupeeRail',
    },
    {
        title: 'Build Resilient Apps with Polkadot Cloud',
        organizer: 'Polkadot',
        position: '1st Place',
        prize: '$3000',
        desc: "Built 'Agora', a decentralized computation marketplace for the Polkadot ecosystem.",
        image: '/projects/Agora.png',
        link: 'https://devpost.com/software/agora-bkfo60',
    },
    {
        title: 'NEARCON Innovation Sandbox',
        organizer: 'NEAR AI',
        position: 'NOVA SDK winner',
        prize: '$1000',
        desc: "Private RAG, a vectorless, e2e encrypted, fully client side RAG using NEAR AI's TEE and NOVA's secure file storage",
        image: '/projects/PrivateRag.png',
        link: 'https://devspot.app/projects/1094',
    },
    {
        title: 'Polkadot AssetHub 2025',
        organizer: 'Polkadot',
        position: '3rd Place',
        prize: '$250',
        desc: "Created 'Polkaflow', a no-code visual workflow builder for smart contracts.",
        image: '/awards/Polkadot.webp',
        link: 'https://dorahacks.io/buidl/26737',
    },
];

const Achievements = () => {
    const [selectedAchievement, setSelectedAchievement] = React.useState<Achievement | null>(null);

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
        <section className="relative overflow-hidden bg-parchment py-16 sm:py-20" id="achievements">
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeading
                    eyebrow="Badge Shelf"
                    title="Honors & Awards"
                    description="Recognition earned at hackathons and builder programs across the ecosystem."
                    icon="star"
                />

                <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
                    {achievements.map((item, idx) => (
                        <Reveal key={item.title} delay={idx * 70} className="h-full">
                            <article
                                onClick={() => setSelectedAchievement(item)}
                                className="pk-panel-raised group flex h-full cursor-pointer flex-col overflow-hidden"
                            >
                                <div className="relative h-44 overflow-hidden border-b-[3px] border-bark bg-sand sm:h-52">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        loading="lazy"
                                        decoding="async"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                                        style={{ transformOrigin: 'center center' }}
                                    />
                                    <span className="absolute left-3 top-3 border-2 border-bark bg-cream px-2 py-0.5 font-pixel-ui text-[0.56rem] tracking-[0.18em] text-bark">
                                        {String(idx + 1).padStart(2, '0')}
                                    </span>
                                    <span className="absolute right-3 top-3 flex items-center gap-1.5 border-2 border-bark bg-honey px-2.5 py-1 font-pixel-ui text-[0.54rem] uppercase tracking-[0.16em] text-ink">
                                        <PixelIcon name="star" className="h-3 w-3" />
                                        {item.position}
                                    </span>
                                </div>

                                <div className="flex flex-1 flex-col p-5 sm:p-6">
                                    <h3 className="font-pixel-ui text-[0.95rem] uppercase leading-snug tracking-[0.06em] text-bark">
                                        {item.title}
                                    </h3>
                                    <p className="mt-2 font-pixel-ui text-[0.54rem] uppercase tracking-[0.2em] text-leaf">
                                        {item.organizer} · {item.prize} prize
                                    </p>
                                    <p className="mt-3.5 flex-1 font-body text-[0.95rem] leading-relaxed text-stone">
                                        {item.desc}
                                    </p>

                                    <a
                                        href={item.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        className="mt-5 inline-flex items-center gap-1.5 self-start font-pixel-ui text-[0.58rem] uppercase tracking-[0.16em] text-berry underline-offset-4 hover:underline"
                                    >
                                        View Project
                                        <PixelIcon name="arrowRight" className="h-3 w-3" />
                                    </a>
                                </div>
                            </article>
                        </Reveal>
                    ))}
                </div>
            </div>

            {/* Detailed modal. */}
            {selectedAchievement ? (
                <div
                    onClick={() => setSelectedAchievement(null)}
                    className="fixed inset-0 z-[70] flex items-center justify-center bg-bark/70 px-3 sm:px-4"
                >
                    <div
                        role="dialog"
                        aria-modal="true"
                        aria-label={selectedAchievement.title}
                        onClick={(e) => e.stopPropagation()}
                        className="pk-panel relative max-h-[86dvh] w-full max-w-2xl overflow-y-auto"
                    >
                        <button
                            onClick={() => setSelectedAchievement(null)}
                            aria-label="Close"
                            className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center border-2 border-bark bg-cream text-bark transition-colors hover:bg-honey"
                        >
                            <PixelIcon name="arrowDown" className="h-4 w-4 rotate-180" />
                        </button>

                        <div className="relative h-44 w-full overflow-hidden border-b-[3px] border-bark bg-sand sm:h-52">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={selectedAchievement.image}
                                alt={selectedAchievement.title}
                                className="h-full w-full object-cover"
                            />
                            <span className="absolute bottom-3 left-4 flex items-center gap-1.5 border-2 border-bark bg-honey px-2.5 py-1 font-pixel-ui text-[0.54rem] uppercase tracking-[0.16em] text-ink">
                                <PixelIcon name="star" className="h-3 w-3" />
                                {selectedAchievement.position}
                            </span>
                        </div>

                        <div className="p-5 sm:p-8">
                            <p className="font-pixel-ui text-[0.56rem] uppercase tracking-[0.24em] text-leaf">
                                {selectedAchievement.organizer}
                            </p>
                            <h3 className="mt-3 max-w-lg font-pixel-ui text-lg uppercase leading-snug tracking-[0.04em] text-bark sm:text-xl">
                                {selectedAchievement.title}
                            </h3>

                            <div className="mt-5 flex flex-wrap items-center gap-2">
                                <PixelBadge icon="badge" tone="leaf">
                                    {selectedAchievement.position}
                                </PixelBadge>
                                <PixelBadge icon="coin" tone="berry">
                                    {selectedAchievement.prize} Prize
                                </PixelBadge>
                            </div>

                            <p className="mt-6 border-t-2 border-bark/15 pt-6 font-body text-base leading-relaxed text-ink">
                                {selectedAchievement.desc}
                            </p>

                            <a
                                href={selectedAchievement.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pk-btn pk-btn-primary mt-7 inline-flex items-center gap-2 px-5 py-3 font-pixel-ui text-[0.6rem] uppercase tracking-[0.16em]"
                            >
                                View Project
                                <PixelIcon name="arrowRight" className="h-3.5 w-3.5" />
                            </a>
                        </div>
                    </div>
                </div>
            ) : null}
        </section>
    );
};

export default Achievements;
