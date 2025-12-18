'use client';

import React from 'react';
import { Calendar, Building2, GraduationCap, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

const Experience = () => {
    const experiences = [
        {
            title: "Web Developer",
            company: "IRIS - NITK's Administrative System",
            date: "November 2024 - Present",
            location: "NITK Surathkal",
            description: [
                "IRIS is the official student-led ERP system of NITK, with 15K+ active users.",
                "Contributed to the development of the Research and Development module by gathering requirements and implementing features to meet user needs and enhance functionality",
                "Worked extensively with MySQL and ActiveRecord ORM for efficient database management and query optimization",
                "Refactored and optimized existing codebase, leveraging RuboCop and RSpec for code quality and testing"
            ],
            type: "Work",
            image: `/iris.png`, // Path fixed
            skills: ["Ruby on Rails", "MySQL", "ActiveRecord", "RSpec"]
        },
        {
            title: "Executive Member",
            company: "IEEE NITK Student Branch",
            date: "October 2024 - Present",
            location: "NITK Surathkal",
            description: [
                "Organized workshops and seminars on various technical topics",
                "Conducted coding competitions and hackathons for students",
                "Mentored junior members and guided them in their projects",
                "Collaborated with other student branches for joint events"
            ],
            type: "Volunteer",
            image: `/ieee-nitk.png`, // Path fixed
            skills: ["Leadership", "Event Management", "Mentoring", "Technical Writing"]
        }
    ];

    return (
        <div className="min-h-screen relative overflow-hidden bg-black">
            {/* Animated Background */}
            <div className="absolute inset-0">
                {/* Floating orbs */}
                <motion.div
                    animate={{
                        x: [0, 100, 0],
                        y: [0, -100, 0],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-[#3b82f6]/20 to-[#8b5cf6]/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, -150, 0],
                        y: [0, 100, 0],
                    }}
                    transition={{
                        duration: 25,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute top-1/2 right-20 w-96 h-96 bg-gradient-to-r from-[#06b6d4]/20 to-[#3b82f6]/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{
                        x: [0, 80, 0],
                        y: [0, -80, 0],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    className="absolute bottom-20 left-1/3 w-64 h-64 bg-gradient-to-r from-[#8b5cf6]/20 to-[#ec4899]/20 rounded-full blur-3xl"
                />

            </div>

            <div className="relative z-10 max-w-6xl mx-auto px-6 py-16">
                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Professional Experience
                    </h1>
                    <p className="text-lg text-[#cbd5e1] max-w-2xl mx-auto">
                        My journey in technology and leadership roles
                    </p>
                    <div className="mt-6 w-20 h-1 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] mx-auto rounded-full" />
                </motion.div>

                {/* Timeline */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-8 md:left-1/2 transform md:-translate-x-px top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#3b82f6] via-[#8b5cf6] to-[#3b82f6] opacity-60" />

                    {experiences.map((exp, index) => (
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.3 }}
                            key={index}
                            className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                }`}
                        >
                            {/* Timeline dot */}
                            <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-[#3b82f6] to-[#8b5cf6] rounded-full border-4 border-[#1e293b] shadow-lg z-10" />

                            {/* Content card - Glassy effect */}
                            <div className={`w-full md:w-5/12 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                                }`}>
                                <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-xl p-8 shadow-2xl hover:bg-white/30 transition-all duration-300 hover:border-white/30 hover:shadow-3xl">
                                    {/* Header */}
                                    <div className="flex items-start justify-between mb-6">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <div className={`p-2 rounded-lg backdrop-blur-sm ${exp.type === 'Work' ? 'bg-[#3b82f6]/20 border border-[#3b82f6]/30' : 'bg-[#22c55e]/20 border border-[#22c55e]/30'
                                                    }`}>
                                                    {exp.type === 'Work' ? (
                                                        <Building2 className={`w-5 h-5 ${exp.type === 'Work' ? 'text-[#60a5fa]' : 'text-[#4ade80]'
                                                            }`} />
                                                    ) : (
                                                        <GraduationCap className="w-5 h-5 text-[#4ade80]" />
                                                    )}
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm ${exp.type === 'Work'
                                                        ? 'bg-[#3b82f6]/20 text-[#93c5fd] border border-[#3b82f6]/30'
                                                        : 'bg-[#22c55e]/20 text-[#86efac] border border-[#22c55e]/30'
                                                    }`}>
                                                    {exp.type}
                                                </span>
                                            </div>

                                            <h3 className="text-2xl font-bold text-white mb-2">
                                                {exp.title}
                                            </h3>

                                            <p className="text-lg font-semibold text-[#60a5fa] mb-3">
                                                {exp.company}
                                            </p>

                                            <div className="flex flex-col sm:flex-row gap-4 text-[#cbd5e1] mb-4">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4" />
                                                    <span className="text-sm text-[#C0C0C0]">{exp.date}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4" />
                                                    <span className="text-sm text-[#C0C0C0]">{exp.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Company logo */}
                                        <div className="w-16 h-16 rounded-lg overflow-hidden backdrop-blur-sm bg-white/10 border border-white/20 ml-4">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={exp.image}
                                                alt={exp.company}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="space-y-3 mb-6">
                                        {exp.description.map((item, i) => (
                                            <motion.div
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.1 * i }}
                                                key={i}
                                                className="flex items-start gap-3"
                                            >
                                                <div className="w-1.5 h-1.5 bg-[#60a5fa] rounded-full mt-2 flex-shrink-0" />
                                                <p className="text-[#e2e8f0] leading-relaxed">{item}</p>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Skills */}
                                    <div className="flex flex-wrap gap-2">
                                        {exp.skills.map((skill, i) => (
                                            <span
                                                key={i}
                                                className="px-3 py-1 backdrop-blur-sm bg-white/10 text-[#e2e8f0] text-sm rounded-full border border-white/20 hover:bg-white/20 transition-colors"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Experience;
