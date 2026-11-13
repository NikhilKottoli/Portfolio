'use client';

import React from 'react';
import PixelIcon, { type PixelIconName } from './pixel/PixelIcon';
import PixelSprite from './pixel/PixelSprite';
import Reveal from './pixel/Reveal';
import SectionHeading from './SectionHeading';
import { bushSprite, leaflingSprite } from './pixel/sprites';

const DEVICON = 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons';
const SIMPLEICONS = 'https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons';

const ROMAN = ['I', 'II', 'III', 'IV'];

type Skill = {
    name: string;
    logo?: string;
    icon?: PixelIconName;
    /** Use for black single-colour logos that need to be inverted. */
    mono?: boolean;
    /** Use for dark logos that need a lighter tile to stay legible. */
    light?: boolean;
};

type SkillCategory = {
    title: string;
    subtitle: string;
    icon: PixelIconName;
    skills: Skill[];
};

const skillCategories: SkillCategory[] = [
    {
        title: 'Languages',
        subtitle: 'Core programming',
        icon: 'chip',
        skills: [
            { name: 'Ruby', logo: `${DEVICON}/ruby/ruby-original.svg` },
            { name: 'Python', logo: `${DEVICON}/python/python-original.svg` },
            { name: 'C', logo: `${DEVICON}/c/c-original.svg` },
            { name: 'C++', logo: `${DEVICON}/cplusplus/cplusplus-original.svg` },
            { name: 'C#', logo: `${DEVICON}/csharp/csharp-original.svg` },
            { name: 'SQL', icon: 'chart' },
            { name: 'JavaScript', logo: `${DEVICON}/javascript/javascript-original.svg` },
            { name: 'HTML', logo: `${DEVICON}/html5/html5-original.svg` },
            { name: 'CSS', logo: `${DEVICON}/css3/css3-original.svg` },
        ],
    },
    {
        title: 'Frameworks',
        subtitle: 'Application stack',
        icon: 'gear',
        skills: [
            { name: 'Ruby on Rails', logo: `${DEVICON}/rails/rails-plain.svg` },
            { name: 'React', logo: `${DEVICON}/react/react-original.svg` },
            { name: 'Node.js', logo: `${DEVICON}/nodejs/nodejs-original.svg` },
            { name: 'Django', logo: `${DEVICON}/django/django-plain.svg`, light: true },
            { name: '.NET', logo: `${DEVICON}/dotnetcore/dotnetcore-original.svg` },
            { name: 'LangChain', logo: `${SIMPLEICONS}/langchain.svg`, mono: true },
        ],
    },
    {
        title: 'Databases',
        subtitle: 'Data & storage',
        icon: 'folder',
        skills: [
            { name: 'MariaDB', logo: `${DEVICON}/mariadb/mariadb-original.svg`, light: true },
            { name: 'Redis', logo: `${DEVICON}/redis/redis-original.svg` },
            { name: 'Qdrant', logo: `${SIMPLEICONS}/qdrant.svg`, mono: true },
        ],
    },
    {
        title: 'Developer Tools',
        subtitle: 'Workflow & infrastructure',
        icon: 'book',
        skills: [
            { name: 'Git', logo: `${DEVICON}/git/git-original.svg` },
            { name: 'Docker', logo: `${DEVICON}/docker/docker-original.svg` },
            { name: 'Packetdrill', icon: 'cloud' },
            { name: 'Postman', logo: `${DEVICON}/postman/postman-original.svg` },
        ],
    },
];

const totalSkills = skillCategories.reduce((count, category) => count + category.skills.length, 0);

const SkillChip = ({ skill }: { skill: Skill }) => (
    <div className="pk-chip flex items-center gap-2.5 py-1.5 pl-1.5 pr-3">
        <span
            className={`flex h-6 w-6 shrink-0 items-center justify-center ${
                skill.light ? 'bg-cream' : 'bg-sand'
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
                    className={`h-4 w-4 object-contain transition-transform duration-300 hover:scale-110 ${
                        skill.mono ? 'invert' : ''
                    }`}
                />
            ) : skill.icon ? (
                <PixelIcon name={skill.icon} className="h-4 w-4 text-bark" />
            ) : null}
        </span>
        <span className="whitespace-nowrap font-body text-[13px] font-medium leading-none text-ink">
            {skill.name}
        </span>
    </div>
);

const Skills = () => {
    return (
        <section className="relative overflow-hidden border-t-[3px] border-bark bg-cream py-16 sm:py-20" id="skills">
            <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeading
                    eyebrow="Move List"
                    title="Technical Arsenal"
                    description="The languages, frameworks, data stores, and tools I use to design and ship software."
                    icon="chip"
                    action={
                        <div className="pk-plaque flex items-center gap-3 self-start px-4 py-2.5 lg:self-auto">
                            <span className="relative flex h-1.5 w-1.5" aria-hidden="true">
                                <span className="absolute inline-flex h-full w-full animate-pulse-ring bg-honey" />
                                <span className="relative inline-flex h-1.5 w-1.5 bg-honey" />
                            </span>
                            <span className="font-pixel-ui text-[0.56rem] uppercase tracking-[0.2em] text-cream">
                                {totalSkills} skills · IV disciplines
                            </span>
                        </div>
                    }
                />

                <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-5">
                    {skillCategories.map((category, index) => (
                        <Reveal key={category.title} delay={index * 70} className="h-full">
                            <div className="pk-panel-raised flex h-full flex-col p-5 sm:p-6">
                                <div className="mb-5 flex items-start justify-between gap-4">
                                    <div className="flex items-center gap-3.5">
                                        <span className="flex h-11 w-11 shrink-0 items-center justify-center border-2 border-bark bg-honey">
                                            <PixelIcon name={category.icon} className="h-5 w-5 text-bark" />
                                        </span>
                                        <div>
                                            <h3 className="font-pixel-ui text-[0.95rem] uppercase tracking-[0.08em] text-bark">
                                                {category.title}
                                            </h3>
                                            <p className="mt-1 font-pixel-ui text-[0.52rem] uppercase tracking-[0.2em] text-stone">
                                                {category.subtitle}
                                            </p>
                                        </div>
                                    </div>

                                    <span className="font-pixel-ui text-[0.7rem] tracking-[0.2em] text-leaf/60">
                                        {ROMAN[index]}
                                    </span>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill) => (
                                        <SkillChip key={skill.name} skill={skill} />
                                    ))}
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>

                <Reveal delay={120}>
                    <div className="mt-10 flex items-center justify-center gap-3 opacity-70">
                        <PixelSprite art={bushSprite} className="h-8 w-40" />
                        <PixelSprite art={leaflingSprite} className="h-9 w-9" />
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default Skills;
