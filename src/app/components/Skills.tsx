'use client';

import React from "react";
import { motion } from "motion/react";
import { Palette, Server, Terminal, Box } from "lucide-react";

const Skills = () => {
    const skillCategories = [
        {
            title: "Frontend",
            icon: Palette,
            skills: [
                { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
                { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
                { name: "Tailwind", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
                { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" }
            ]
        },
        {
            title: "Backend",
            icon: Server,
            skills: [
                { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
                { name: "Ruby on Rails", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/rails/rails-plain-wordmark.svg" },
                { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
                { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" }
            ]
        },
        {
            title: "Core",
            icon: Terminal,
            skills: [
                { name: "C++", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
                { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
                { name: "Solidity", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/solidity/solidity-original.svg" },
                { name: "System Design", icon: Box } // Fallback for System Design
            ]
        }
    ];

    return (
        <section className="relative py-32 bg-black overflow-hidden" id="skills">
            {/* Minimalist background accent */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/[0.02] rounded-full blur-[100px]" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Technical Arsenal
                    </h2>
                    <p className="text-gray-500 max-w-xl text-lg border-l-2 border-white/20 pl-6">
                        A curated set of technologies utilized to architect scalable, high-performance systems.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {skillCategories.map((category, idx) => (
                        <motion.div
                            key={category.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-sm hover:border-white/30 transition-colors duration-300"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-2 border border-white/10 rounded-sm">
                                    <category.icon className="w-5 h-5 text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-white tracking-wide">{category.title}</h3>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {category.skills.map((skill) => (
                                    <div
                                        key={skill.name}
                                        className="flex flex-col items-center justify-center p-4 border border-white/5 rounded-sm hover:bg-white/5 transition-colors duration-300 group"
                                    >
                                        <div className="h-12 w-12 mb-3 flex items-center justify-center relative">
                                            {skill.logo ? (
                                                <img
                                                    src={skill.logo}
                                                    alt={`${skill.name} logo`}
                                                    className="max-h-full max-w-full transition-all duration-300 bg-white/5"
                                                    loading="lazy"
                                                />
                                            ) : skill.icon ? (
                                                <skill.icon className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors" />
                                            ) : null}
                                        </div>
                                        <span className="text-gray-400 text-xs font-medium tracking-wide group-hover:text-white transition-colors">{skill.name}</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
