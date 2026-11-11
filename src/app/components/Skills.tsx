'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Code2, Layers, Database, Wrench, Table2, Network } from 'lucide-react';
import SectionHeading from './SectionHeading';

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const SIMPLEICONS = 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons';

const ROMAN = ['I', 'II', 'III', 'IV'];

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
        <div className="group/chip hk-chip flex items-center gap-2.5 py-1.5 pl-1.5 pr-3">
            <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center ${
                    skill.light ? 'bg-pale/90' : 'bg-pale/[0.055]'
                }`}
            >
                {skill.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={skill.logo}
                        alt=""
                        aria-hidden="true"
                        loading="lazy"
                        decoding="async"
                        className={`h-4 w-4 object-contain transition-transform duration-300 group-hover/chip:scale-110 ${
                            skill.mono ? 'invert' : ''
                        }`}
                    />
                ) : Icon ? (
                    <Icon className="h-4 w-4 text-mist/70 transition-colors duration-300 group-hover/chip:text-soul" />
                ) : null}
            </span>
            <span className="whitespace-nowrap font-body text-[13px] font-medium leading-none text-mist/80 transition-colors duration-300 group-hover/chip:text-pale">
                {skill.name}
            </span>
        </div>
    );
};

const Skills = () => {
    return (
        <section className="relative overflow-hidden py-24 sm:py-28 lg:py-36" id="skills">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pale/10 to-transparent" />
            <div className="pointer-events-none absolute -right-40 top-10 h-[480px] w-[480px] rounded-full bg-soul/[0.045] blur-[130px]" />
            <div className="pointer-events-none absolute -left-40 bottom-0 h-[400px] w-[400px] rounded-full bg-gold/[0.03] blur-[130px]" />

            <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
                <SectionHeading
                    eyebrow="The Arsenal"
                    title="Technical Arsenal"
                    description="The languages, frameworks, data stores, and tools I use to design and ship software."
                    className="mb-12 sm:mb-16 lg:mb-20"
                    action={
                        <div className="flex items-center gap-3 self-start border border-pale/10 bg-pale/[0.02] px-4 py-2.5 lg:self-auto">
                            <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-soul/40 opacity-75" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-soul/80" />
                            </span>
                            <span className="font-display text-[8px] uppercase tracking-[0.28em] text-mist/65">
                                {totalSkills} skills · IV disciplines
                            </span>
                        </div>
                    }
                />

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
                    {skillCategories.map((category, index) => {
                        const CategoryIcon = category.icon;

                        return (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.08 }}
                                className="hk-panel hk-frame group/card relative overflow-hidden p-5 sm:p-7"
                            >
                                <div className="pointer-events-none absolute -right-20 -top-24 h-52 w-52 rounded-full bg-soul/[0.06] opacity-0 blur-3xl transition-opacity duration-500 group-hover/card:opacity-100" />

                                <div className="relative mb-6 flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3.5">
                                        <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                                            <span className="absolute inset-0 rotate-45 border border-gold/25 transition-colors duration-500 group-hover/card:border-gold/60" />
                                            <span className="absolute inset-[7px] rotate-45 border border-pale/[0.06]" />
                                            <CategoryIcon className="relative h-4 w-4 text-gold/80" />
                                        </div>
                                        <div>
                                            <h3 className="font-display text-base font-semibold tracking-wide text-pale sm:text-lg">
                                                {category.title}
                                            </h3>
                                            <p className="mt-1 font-display text-[8px] uppercase tracking-[0.32em] text-mist/45 sm:text-[9px]">
                                                {category.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    <span className="font-display text-[10px] tracking-[0.3em] text-gold/35">
                                        {ROMAN[index]}
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
