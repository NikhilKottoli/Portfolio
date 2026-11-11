'use client';

import React from "react";
import { motion } from "motion/react";
import { Github, ArrowUpRight, Trophy } from "lucide-react";

const PROJECTS_DATA = [
    {
        image: '/projects/RupeeRail.png',
        title: "RupeeRail",
        description: "ETH Global 2026 Mumbai Finalist, Arc Track (Best Mobile Web Consumer Agent) - Cross-border payments on Ethereum using stablecoins and account abstraction.",
        tech: ["Solidity", "React", "Account Abstraction", "ERC-4337"],
        link: "https://github.com/NikhilKottoli/RupeeRail",
        award: "ETH Global Mumbai 2026 Finalist"
    },
    {
        image: '/projects/PrivateRag.png',
        title: "Private RAG",
        description: "A vectorless, fully client-side RAG leveraging TEE and secure file storage.",
        tech: ["React", "NEAR AI TEE", "NOVA SDK"],
        link: "https://devspot.app/projects/1094"
    },
    {
        image: `/projects/Agora.png`,
        title: "Agora",
        description: "A parachain-ready computation marketplace for Polkadot.",
        tech: ["Rust", "Substrate", "React"],
        link: "https://github.com/suyash101101/Agora",
    },
    {
        image: `/projects/ImpactChain.png`,
        title: "ImpactChain",
        description: "Blockchain-backed social good initiatives platform.",
        tech: ["React", "Solidity", "Express"],
        link: "https://github.com/NikhilKottoli/ImpactChain",
    },
    {
        image: `/projects/Polkaflow.png`,
        title: "Polkaflow",
        description: "Visual blockchain workflow builder for smart contracts.",
        tech: ["React", "Express", "Solidity"],
        link: "https://github.com/NikhilKottoli/Polkadot",
        deployment: "https://684f67f55264e77559942f2f--polkaflownikhil.netlify.app/"
    },
    {
        image: `/projects/codemaster.png`,
        title: "CodeMaster",
        description: "Real-time interview platform with code collaboration.",
        tech: ["React", "Express", "redis"],
        link: "https://github.com/IEEE-NITK/Codemasters",
        deployment: "https://codemasters-swart.vercel.app/"
    },
    {
        image: `/projects/Synkerr.jpeg`,
        title: "Synkerr",
        description: "Social platform for professional collaboration.",
        link: "https://github.com/NikhilKottoli/Synkerr_Homepage",
        tech: ["React", "MongoDB", "Express"]
    },
    {
        image: `/projects/hamfest.png`,
        title: "Hamfest India 2026",
        description: "Official event platform for India's premier gathering of amateur radio enthusiasts at NITK Surathkal.",
        tech: ["Next.js", "React", "Tailwind CSS"],
        link: "https://hfi2026.nitk.ac.in/"
    },
    {
        image: `/projects/DDS.png`,
        title: "Matrix Multiplier",
        description: "Hardware-efficient matrix operations using digital logic.",
        link: "https://github.com/NikhilKottoli/S2-T15",
        tech: ["verilog"],
    }
];

const ProjectCard = ({ project, index }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.1 }}
        className="group relative bg-black border border-white/10 hover:border-white/30 transition-all duration-500"
    >
        {/* Image Container - Grayscale by default, color on hover */}
        <div className="relative h-52 overflow-hidden bg-white/5 sm:h-64">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover opacity-80 filter grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

            {project.award && (
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1 bg-yellow-500/20 border border-yellow-500/50 text-yellow-400 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                    <Trophy className="w-3 h-3" />
                    <span>Finalist</span>
                </div>
            )}

            <div className="absolute right-4 top-4 z-20 flex translate-y-0 gap-2 opacity-100 transition-opacity duration-300 sm:translate-y-2 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/80 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all">
                        {project.link.includes("github.com") ? <Github className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </a>
                )}
                {project.deployment && project.deployment !== project.link && (
                    <a href={project.deployment} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/80 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                    </a>
                )}
            </div>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6">
            <h3 className="text-xl font-bold text-white mb-3">
                {project.title}
            </h3>
            <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                {project.description}
            </p>
            {project.award && (
                <p className="text-yellow-400 text-xs font-medium mb-4 flex items-center gap-1">
                    <Trophy className="w-3 h-3" />
                    {project.award}
                </p>
            )}
            <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                    <span key={tech} className="px-2 py-1 text-[10px] uppercase tracking-wider font-medium text-gray-400 border border-white/10">
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    </motion.div>
);

const Projects = () => {
    return (
        <section className="relative overflow-hidden bg-black py-20 sm:py-24 lg:py-32">
            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 sm:mb-16"
                >
                    <h2 className="mb-4 text-3xl font-bold text-white sm:mb-6 sm:text-4xl md:text-5xl">
                        Featured Work
                    </h2>
                    <div className="h-1 w-20 bg-white/20" />
                </motion.div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
                    {PROJECTS_DATA.map((project, idx) => (
                        <ProjectCard key={idx} project={project} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
