'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Github, ArrowUpRight, Trophy } from 'lucide-react';
import SectionHeading from './SectionHeading';

type Project = {
    image: string;
    title: string;
    description: string;
    tech: string[];
    link: string;
    award?: string;
    deployment?: string;
};

const PROJECTS_DATA: Project[] = [
    {
        image: '/projects/RupeeRail.png',
        title: 'RupeeRail',
        description:
            'ETH Global 2026 Mumbai Finalist, Arc Track (Best Mobile Web Consumer Agent) - Cross-border payments on Ethereum using stablecoins and account abstraction.',
        tech: ['Solidity', 'React', 'Account Abstraction', 'ERC-4337'],
        link: 'https://github.com/NikhilKottoli/RupeeRail',
        award: 'ETH Global Mumbai 2026 Finalist'
    },
    {
        image: '/projects/PrivateRag.png',
        title: 'Private RAG',
        description: 'A vectorless, fully client-side RAG leveraging TEE and secure file storage.',
        tech: ['React', 'NEAR AI TEE', 'NOVA SDK'],
        link: 'https://devspot.app/projects/1094'
    },
    {
        image: '/projects/Agora.png',
        title: 'Agora',
        description: 'A parachain-ready computation marketplace for Polkadot.',
        tech: ['Rust', 'Substrate', 'React'],
        link: 'https://github.com/suyash101101/Agora'
    },
    {
        image: '/projects/ImpactChain.png',
        title: 'ImpactChain',
        description: 'Blockchain-backed social good initiatives platform.',
        tech: ['React', 'Solidity', 'Express'],
        link: 'https://github.com/NikhilKottoli/ImpactChain'
    },
    {
        image: '/projects/Polkaflow.png',
        title: 'Polkaflow',
        description: 'Visual blockchain workflow builder for smart contracts.',
        tech: ['React', 'Express', 'Solidity'],
        link: 'https://github.com/NikhilKottoli/Polkadot',
        deployment: 'https://684f67f55264e77559942f2f--polkaflownikhil.netlify.app/'
    },
    {
        image: '/projects/codemaster.png',
        title: 'CodeMaster',
        description: 'Real-time interview platform with code collaboration.',
        tech: ['React', 'Express', 'redis'],
        link: 'https://github.com/IEEE-NITK/Codemasters',
        deployment: 'https://codemasters-swart.vercel.app/'
    },
    {
        image: '/projects/Synkerr.jpeg',
        title: 'Synkerr',
        description: 'Social platform for professional collaboration.',
        link: 'https://github.com/NikhilKottoli/Synkerr_Homepage',
        tech: ['React', 'MongoDB', 'Express']
    },
    {
        image: '/projects/hamfest.png',
        title: 'Hamfest India 2026',
        description:
            "Official event platform for India's premier gathering of amateur radio enthusiasts at NITK Surathkal.",
        tech: ['Next.js', 'React', 'Tailwind CSS'],
        link: 'https://hfi2026.nitk.ac.in/'
    },
    {
        image: '/projects/DDS.png',
        title: 'Matrix Multiplier',
        description: 'Hardware-efficient matrix operations using digital logic.',
        link: 'https://github.com/NikhilKottoli/S2-T15',
        tech: ['verilog']
    }
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => (
    <motion.article
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: (index % 3) * 0.08 }}
        className="hk-panel hk-frame group relative overflow-hidden"
    >
        <div className="relative h-52 overflow-hidden bg-deep sm:h-60">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-70 saturate-[0.55] transition-all duration-700 group-hover:scale-[1.04] group-hover:opacity-95 group-hover:saturate-100"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-void via-void/20 to-transparent" />

            <div className="absolute left-4 top-4 z-20 flex items-center gap-2 border border-gold/35 bg-void/80 px-3 py-1.5 backdrop-blur-sm">
                <span className="font-display text-[8px] uppercase tracking-[0.22em] text-gold/85">
                    {String(index + 1).padStart(2, '0')}
                </span>
            </div>

            {project.award && (
                <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 border border-gold/35 bg-void/85 px-3 py-1.5 backdrop-blur-sm">
                    <Trophy className="h-3 w-3 text-gold" />
                    <span className="font-display text-[8px] uppercase tracking-[0.18em] text-gold/90">
                        Finalist
                    </span>
                </div>
            )}

            <div className="absolute right-4 top-4 z-20 flex gap-2 opacity-100 transition-all duration-300 sm:translate-y-1 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                {project.link && (
                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title}`}
                        className="flex h-8 w-8 items-center justify-center border border-pale/15 bg-void/80 text-mist/75 backdrop-blur-md transition-colors hover:border-gold/40 hover:text-gold"
                    >
                        {project.link.includes('github.com') ? (
                            <Github className="h-3.5 w-3.5" />
                        ) : (
                            <ArrowUpRight className="h-3.5 w-3.5" />
                        )}
                    </a>
                )}
                {project.deployment && project.deployment !== project.link && (
                    <a
                        href={project.deployment}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Open ${project.title} live site`}
                        className="flex h-8 w-8 items-center justify-center border border-pale/15 bg-void/80 text-mist/75 backdrop-blur-md transition-colors hover:border-gold/40 hover:text-gold"
                    >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                    </a>
                )}
            </div>
        </div>

        <div className="relative p-5 sm:p-6">
            <h3 className="font-display text-lg font-semibold tracking-wide text-pale sm:text-xl">
                {project.title}
            </h3>
            <p className="mt-3 line-clamp-2 font-body text-[15px] leading-relaxed text-mist/60">
                {project.description}
            </p>
            {project.award && (
                <p className="mt-3.5 flex items-center gap-1.5 font-display text-[8px] uppercase tracking-[0.2em] text-gold/60">
                    <Trophy className="h-3 w-3" />
                    {project.award}
                </p>
            )}
            <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                    <span
                        key={tech}
                        className="hk-chip px-2.5 py-1 font-display text-[8px] uppercase tracking-[0.2em] text-mist/55"
                    >
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    </motion.article>
);

const Projects = () => {
    return (
        <section className="relative overflow-hidden py-24 sm:py-28 lg:py-36" id="projects">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pale/10 to-transparent" />
            <div className="pointer-events-none absolute -left-40 top-1/3 h-[460px] w-[460px] rounded-full bg-soul/[0.04] blur-[140px]" />
            <div className="pointer-events-none absolute -right-40 bottom-0 h-[400px] w-[400px] rounded-full bg-gold/[0.03] blur-[140px]" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
                <SectionHeading
                    eyebrow="Chronicles"
                    title="Featured Work"
                    className="mb-12 sm:mb-16 lg:mb-20"
                    action={
                        <div className="flex items-center gap-3 self-start border border-pale/10 bg-pale/[0.02] px-4 py-2.5 lg:self-auto">
                            <span className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
                            <span className="font-display text-[8px] uppercase tracking-[0.28em] text-mist/65">
                                {PROJECTS_DATA.length} projects
                            </span>
                        </div>
                    }
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                    {PROJECTS_DATA.map((project, idx) => (
                        <ProjectCard key={project.title} project={project} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
