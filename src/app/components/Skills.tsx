'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Code2, Layers, Database, Wrench, Table2, Network } from 'lucide-react';

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const SIMPLEICONS = 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons';

type Skill = {
    name: string;
    logo?: string;
    icon?: React.ElementType;
    /** Use for black single-colour logos that need to be inverted on dark backgrounds. */
    mono?: boolean;
    /** Use for dark logos that need a lighter tile to stay legible. */
    light?: boolean;
};

type SkillCategory = {
    title: string;
    subtitle: string;
    icon: React.ElementType;
    skills: Skill[];
};

const skillCategories: SkillCategory[] = [
    {
        title: 'Languages',
        subtitle: 'Core programming',
        icon: Code2,
        skills: [
            { name: 'Ruby', logo: `${DEVICON}/ruby/ruby-original.svg` },
            { name: 'Python', logo: `${DEVICON}/python/python-original.svg` },
            { name: 'C', logo: `${DEVICON}/c/c-original.svg` },
            { name: 'C++', logo: `${DEVICON}/cplusplus/cplusplus-original.svg` },
            { name: 'C#', logo: `${DEVICON}/csharp/csharp-original.svg` },
            { name: 'SQL', icon: Table2 },
            { name: 'JavaScript', logo: `${DEVICON}/javascript/javascript-original.svg` },
            { name: 'HTML', logo: `${DEVICON}/html5/html5-original.svg` },
            { name: 'CSS', logo: `${DEVICON}/css3/css3-original.svg` }
        ]
    },
    {
        title: 'Frameworks',
        subtitle: 'Application stack',
        icon: Layers,
        skills: [
            { name: 'Ruby on Rails', logo: `${DEVICON}/rails/rails-plain.svg` },
            { name: 'React', logo: `${DEVICON}/react/react-original.svg` },
            { name: 'Node.js', logo: `${DEVICON}/nodejs/nodejs-original.svg` },
            { name: 'Django', logo: `${DEVICON}/django/django-plain.svg`, light: true },
            { name: '.NET', logo: `${DEVICON}/dotnetcore/dotnetcore-original.svg` },
            { name: 'LangChain', logo: `${SIMPLEICONS}/langchain.svg`, mono: true }
        ]
    },
    {
        title: 'Databases',
        subtitle: 'Data & storage',
        icon: Database,
        skills: [
            { name: 'MariaDB', logo: `${DEVICON}/mariadb/mariadb-original.svg`, light: true },
            { name: 'Redis', logo: `${DEVICON}/redis/redis-original.svg` },
            { name: 'Qdrant', logo: `${SIMPLEICONS}/qdrant.svg`, mono: true }
        ]
    },
    {
        title: 'Developer Tools',
        subtitle: 'Workflow & infrastructure',
        icon: Wrench,
        skills: [
            { name: 'Git', logo: `${DEVICON}/git/git-original.svg` },
            { name: 'Docker', logo: `${DEVICON}/docker/docker-original.svg` },
            { name: 'Packetdrill', icon: Network },
            { name: 'Postman', logo: `${DEVICON}/postman/postman-original.svg` }
        ]
    }
];

const totalSkills = skillCategories.reduce((count, category) => count + category.skills.length, 0);

const SkillChip = ({ skill }: { skill: Skill }) => {
    const Icon = skill.icon;

    return (
        <div className="group/chip flex items-center gap-2.5 rounded-lg border border-white/[0.07] bg-white/[0.03] py-1.5 pl-1.5 pr-3 transition-colors duration-300 hover:border-white/20 hover:bg-white/[0.07]">
            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${skill.light ? 'bg-white/90' : 'bg-white/[0.06]'}`}>
                {skill.logo ? (
                    <img
                        src={skill.logo}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className={`h-4 w-4 object-contain transition-transform duration-300 group-hover/chip:scale-110 ${skill.mono ? 'invert' : ''}`}
                    />
                ) : Icon ? (
                    <Icon className="h-4 w-4 text-gray-500 transition-colors duration-300 group-hover/chip:text-white" />
                ) : null}
            </span>
            <span className="whitespace-nowrap text-xs font-medium text-gray-400 transition-colors duration-300 group-hover/chip:text-white">
                {skill.name}
            </span>
        </div>
    );
};

const Skills = () => {
    return (
        <section className="relative overflow-hidden bg-black py-20 sm:py-24 lg:py-32" id="skills">
            {/* Subtle background accent */}
            <div className="pointer-events-none absolute -right-32 top-0 h-[420px] w-[420px] rounded-full bg-white/[0.03] blur-[120px]" />
            <div className="pointer-events-none absolute -left-32 bottom-0 h-[360px] w-[360px] rounded-full bg-white/[0.02] blur-[120px]" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-10 flex flex-col gap-6 sm:mb-14 lg:mb-16 lg:flex-row lg:items-end lg:justify-between"
                >
                    <div className="max-w-2xl">
                        <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500">
                            Toolkit
                        </p>
                        <h2 className="mb-4 text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                            Technical Arsenal
                        </h2>
                        <p className="max-w-xl border-l-2 border-white/15 pl-4 text-sm leading-relaxed text-gray-500 sm:pl-6 sm:text-base">
                            The languages, frameworks, data stores, and tools I use to design and ship software.
                        </p>
                    </div>

                    <div className="flex items-center gap-3 self-start rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 lg:self-auto">
                        <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white/40 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-white/80" />
                        </span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-gray-400">
                            {totalSkills} skills · 04 disciplines
                        </span>
                    </div>
                </motion.div>

                <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2">
                    {skillCategories.map((category, index) => {
                        const CategoryIcon = category.icon;

                        return (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className="group/card relative overflow-hidden bg-[#070707] p-5 sm:p-6 lg:p-8"
                            >
                                <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/[0.04] opacity-0 blur-3xl transition-opacity duration-500 group-hover/card:opacity-100" />

                                <div className="relative mb-6 flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                                            <CategoryIcon className="h-5 w-5 text-gray-300" />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-semibold tracking-tight text-white sm:text-lg">
                                                {category.title}
                                            </h3>
                                            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-gray-600">
                                                {category.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    <span className="font-mono text-xs text-white/20">
                                        {String(index + 1).padStart(2, '0')}
                                    </span>
                                </div>

                                <div className="relative flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <SkillChip key={skill.name} skill={skill} />
                                    ))}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Skills;
