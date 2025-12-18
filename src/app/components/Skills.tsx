'use client';

import React from "react";
import { motion } from "motion/react";
import { Code, Palette, Zap, Trophy, Star, Wrench } from "lucide-react";

// SKILLS_DATA definition kept as is
const SKILLS_DATA = {
    // Page Content
    pageTitle: "Technical Skills",
    pageSubtitle: "A comprehensive overview of my technical expertise and proficiency levels",

    // Core Skills (Scrolling Section)
    coreSkills: [
        {
            title: "Solidity",
            description: "Smart contract development, blockchain fundamentals, and decentralized application (dApp) architecture",
            icon: Code
        },
        {
            title: "CSS3",
            description: "Advanced styling with Flexbox, Grid, animations, and responsive design principles",
            icon: Palette
        },
        {
            title: "JavaScript",
            description: "Modern ES6+ features, DOM manipulation, async programming, and interactive web experiences",
            icon: Zap
        },
        {
            title: "C++",
            description: "Data structures, algorithms, competitive programming, and system-level programming",
            icon: Trophy
        },
    ],

    // Specialized Skills (Grid Section)
    specializedSkills: [
        {
            title: "React",
            imageSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png",
            imageAlt: "React Logo",
            proficiency: 4
        },
        {
            title: "Tailwind CSS",
            imageSrc: "https://www.vectorlogo.zone/logos/tailwindcss/tailwindcss-icon.svg",
            imageAlt: "TailwindCSS",
            proficiency: 5
        },
        {
            title: "Docker",
            imageSrc: "https://logos-download.com/wp-content/uploads/2016/09/Docker_logo.png",
            imageAlt: "Docker Logo",
            proficiency: 3
        },
        {
            title: "Ruby on Rails",
            imageSrc: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/Ruby_On_Rails_Logo.svg/1200px-Ruby_On_Rails_Logo.svg.png",
            imageAlt: "Rails Logo",
            proficiency: 4
        },
    ],


    // Section Titles and Icons
    sections: {
        coreSkills: {
            title: "Core Technologies",
            icon: Code
        },
        specializedSkills: {
            title: "Specialized Frameworks & Tools",
            icon: Wrench
        }
    },

    // Animation Settings
    animations: {
        scrollDuration: 20, // seconds for horizontal scroll
        cardDelay: 0.1, // delay between card animations
        backgroundOrb1Duration: 20,
        backgroundOrb2Duration: 25
    }
};

// ============================
// COMPONENTS
// ============================
const SkillCard = ({ title, description, index, icon: Icon }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * SKILLS_DATA.animations.cardDelay }}
        className="flex-shrink-0 w-80 p-6 rounded-xl bg-[#0f172a]/80 backdrop-blur-sm border border-[#1e293b] hover:border-[#334155] transition-all duration-300 hover:bg-[#0f172a]/90 group"
    >
        <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-[#1e293b] group-hover:bg-[#334155] transition-colors">
                <Icon className="w-5 h-5 text-[#64748b] group-hover:text-[#94a3b8]" />
            </div>
            <h5 className="text-xl font-semibold text-[#f8fafc] group-hover:text-white transition-colors">
                {title}
            </h5>
        </div>
        <p className="text-[#94a3b8] group-hover:text-[#cbd5e1] transition-colors leading-relaxed">
            {description}
        </p>
    </motion.div>
);

const MainSkillCard = ({ title, imageSrc, imageAlt, index, proficiency }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: index * SKILLS_DATA.animations.cardDelay }}
        className="group relative"
    >
        <div className="relative flex flex-col items-center p-8 rounded-2xl bg-[#0f172a] border border-[#1e293b] hover:border-[#334155] transition-all duration-300 hover:bg-[#1e293b]/50 backdrop-blur-sm">
            {/* Skill Icon/Image */}
            <motion.div
                className="w-20 h-20 mb-6 flex items-center justify-center rounded-xl bg-[#1e293b] group-hover:bg-[#334155] transition-colors"
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
            >
                {imageSrc ? (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={imageSrc} alt={imageAlt} className="w-12 h-12 object-contain" />
                ) : (
                    <Code className="w-12 h-12 text-[#64748b]" />
                )}
            </motion.div>

            {/* Skill Title */}
            <h3 className="text-xl font-semibold text-[#f8fafc] mb-3 text-center group-hover:text-white transition-colors">
                {title}
            </h3>

            {/* Proficiency Stars */}
            <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star
                        key={i}
                        className={`w-4 h-4 ${i < proficiency
                                ? 'text-[#3b82f6] fill-[#3b82f6]'
                                : 'text-[#334155]'
                            }`}
                    />
                ))}
            </div>

            {/* Hover effect overlay */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#3b82f6]/5 to-[#8b5cf6]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
    </motion.div>
);

const CategorySection = ({ title, children, icon: Icon }) => (
    <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-16"
    >
        <div className="flex items-center gap-3 mb-8">
            <div className="p-3 rounded-xl bg-[#1e293b] border border-[#334155]">
                <Icon className="w-6 h-6 text-[#3b82f6]" />
            </div>
            <h2 className="text-3xl font-bold text-[#f8fafc]">{title}</h2>
        </div>
        {children}
    </motion.div>
);

// ============================
// MAIN COMPONENT
// ============================
const Skills = () => {
    const {
        pageTitle,
        pageSubtitle,
        coreSkills,
        specializedSkills,
        sections,
        animations
    } = SKILLS_DATA;

    return (
        <div className="min-h-screen bg-black relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0">
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -50, 0],
                    }}
                    transition={{
                        duration: animations.backgroundOrb1Duration,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-20 left-20 w-72 h-72 bg-[#3b82f6]/5 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, -100, 0],
                        y: [0, 50, 0],
                    }}
                    transition={{
                        duration: animations.backgroundOrb2Duration,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-20 right-20 w-96 h-96 bg-[#8b5cf6]/5 rounded-full blur-3xl"
                />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <h1 className="text-5xl md:text-6xl font-bold text-[#f8fafc] mb-6">
                        {pageTitle}
                    </h1>
                    <p className="text-xl text-[#94a3b8] max-w-2xl mx-auto">
                        {pageSubtitle}
                    </p>
                    <div className="mt-8 w-24 h-1 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] mx-auto rounded-full" />
                </motion.div>

                {/* Core Skills Section */}
                <CategorySection title={sections.coreSkills.title} icon={sections.coreSkills.icon}>
                    <div className="overflow-hidden py-4">
                        <motion.div
                            className="flex gap-6"
                            animate={{ x: [0, -1920] }}
                            transition={{
                                duration: animations.scrollDuration,
                                repeat: Infinity,
                                ease: "linear"
                            }}
                        >
                            {[...coreSkills, ...coreSkills, ...coreSkills].map((skill, index) => (
                                <SkillCard
                                    key={index}
                                    title={skill.title}
                                    description={skill.description}
                                    icon={skill.icon}
                                    index={index}
                                />
                            ))}
                        </motion.div>
                    </div>
                </CategorySection>

                {/* Specialized Skills Section */}
                <CategorySection title={sections.specializedSkills.title} icon={sections.specializedSkills.icon}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {specializedSkills.map((skill, index) => (
                            <MainSkillCard
                                key={index}
                                title={skill.title}
                                imageSrc={skill.imageSrc}
                                imageAlt={skill.imageAlt}
                                proficiency={skill.proficiency}
                                index={index}
                            />
                        ))}
                    </div>
                </CategorySection>
            </div>
        </div>
    );
};

export default Skills;
