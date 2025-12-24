'use client';

import React from "react";
import { motion } from "motion/react";
import { Github, ArrowUpRight } from "lucide-react";

const PROJECTS_DATA = [
    {
        image: `/Agora.png`,
        title: "Agora",
        description: "A parachain-ready computation marketplace for Polkadot.",
        tech: ["Rust", "Substrate", "React"],
        link: "https://github.com/suyash101101/Agora",
    },
    {
        image: `/ImpactChain.png`,
        title: "ImpactChain",
        description: "Blockchain-backed social good initiatives platform.",
        tech: ["React", "Solidity", "Express"],
        link: "https://github.com/NikhilKottoli/ImpactChain",
    },
    {
        image: `/Polkaflow.png`,
        title: "Polkaflow",
        description: "Visual blockchain workflow builder for smart contracts.",
        tech: ["React", "Express", "Solidity"],
        link: "https://github.com/NikhilKottoli/Polkadot",
        deployment: "https://684f67f55264e77559942f2f--polkaflownikhil.netlify.app/"
    },
    {
        image: `/codemaster.png`,
        title: "CodeMaster",
        description: "Real-time interview platform with code collaboration.",
        tech: ["React", "Express", "redis"],
        link: "https://github.com/IEEE-NITK/Codemasters",
        deployment: "https://codemasters-swart.vercel.app/"
    },
    {
        image: `/Synkerr.jpeg`,
        title: "Synkerr",
        description: "Social platform for professional collaboration.",
        link: "https://github.com/NikhilKottoli/Synkerr_Homepage",
        tech: ["React", "MongoDB", "Express"]
    },
    {
        image: `/DDS.png`,
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
        <div className="relative h-64 overflow-hidden bg-white/5">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105 filter grayscale group-hover:grayscale-0 opacity-80 group-hover:opacity-100"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />

            <div className="absolute top-4 right-4 z-20 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/80 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all">
                    <Github className="w-4 h-4" />
                </a>
                {project.deployment && (
                    <a href={project.deployment} target="_blank" rel="noopener noreferrer" className="p-2 bg-black/80 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black transition-all">
                        <ArrowUpRight className="w-4 h-4" />
                    </a>
                )}
            </div>
        </div>

        {/* Content */}
        <div className="p-6">
            <h3 className="text-xl font-bold text-white mb-3">
                {project.title}
            </h3>
            <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed">
                {project.description}
            </p>
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
        <section className="relative py-32 bg-black overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Featured Work
                    </h2>
                    <div className="h-1 w-20 bg-white/20" />
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PROJECTS_DATA.map((project, idx) => (
                        <ProjectCard key={idx} project={project} index={idx} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
