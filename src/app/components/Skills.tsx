'use client';

import React from "react";
import { motion } from "motion/react";
import { Palette, Server, Terminal } from "lucide-react";

const Skills = () => {
    const skillCategories = [
        {
            title: "Frontend",
            icon: Palette,
            skills: [
                { name: "React", level: 90 },
                { name: "Next.js", level: 85 },
                { name: "Tailwind", level: 95 },
                { name: "TypeScript", level: 80 }
            ]
        },
        {
            title: "Backend",
            icon: Server,
            skills: [
                { name: "Node.js", level: 85 },
                { name: "Ruby on Rails", level: 80 },
                { name: "PostgreSQL", level: 75 },
                { name: "Docker", level: 70 }
            ]
        },
        {
            title: "Core",
            icon: Terminal,
            skills: [
                { name: "C++", level: 90 },
                { name: "JavaScript", level: 95 },
                { name: "Solidity", level: 70 },
                { name: "System Design", level: 75 }
            ]
        }
    ];

    return (
        <section className="relative py-32 bg-black overflow-hidden" id="skills">
            {/* Minimalist background accent (removes colored blobs) */}
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
                            className="bg-black border border-white/10 p-8 rounded-sm hover:border-white/30 transition-colors duration-300"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-2 border border-white/10 rounded-sm">
                                    <category.icon className="w-5 h-5 text-gray-300" />
                                </div>
                                <h3 className="text-xl font-bold text-white tracking-wide">{category.title}</h3>
                            </div>

                            <div className="space-y-6">
                                {category.skills.map((skill) => (
                                    <div key={skill.name}>
                                        <div className="flex justify-between mb-2">
                                            <span className="text-gray-400 text-sm font-medium tracking-wide">{skill.name}</span>
                                            {/* Removed percentage text for cleaner look, visual bar is enough */}
                                        </div>
                                        <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: 0.2 }}
                                                className="h-full bg-white rounded-full"
                                            />
                                        </div>
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
