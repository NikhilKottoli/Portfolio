'use client';

import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

const Experience = () => {
    const experiences = [
        {
            title: "Web Developer",
            company: "IRIS - NITK's Administrative System",
            date: "November 2024 - Present",
            location: "NITK Surathkal",
            description: "Contributing to the official student-led ERP system of NITK. Building the R&D module and optimizing database queries with Ruby on Rails.",
            image: "/iris.png",
            tags: ["Ruby on Rails", "MySQL", "ActiveRecord"]
        },
        {
            title: "Executive Member",
            company: "IEEE NITK Student Branch",
            date: "October 2024 - Present",
            location: "NITK Surathkal",
            description: "Organizing technical workshops and hackathons. Mentoring junior members and leading initiatives to foster a coding culture.",
            image: "/ieee-nitk.png",
            tags: ["Leadership", "Management", "Mentoring"]
        }
    ];

    return (
        <section className="relative py-32 bg-black" id="experience">
            <div className="max-w-5xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        Experience & Education
                    </h2>
                    <div className="h-1 w-20 bg-white/20" />
                </motion.div>

                {/* Minimalist Timeline */}
                <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-[1px] before:bg-white/10">
                    {experiences.map((exp, index) => (
                        <div key={index} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            {/* Minimal Dot */}
                            <div className="flex items-center justify-center w-3 h-3 bg-black border border-white/50 rounded-full shrink-0 md:order-1 md:group-odd:-translate-x-[5px] md:group-even:translate-x-[5px] relative z-10 group-hover:bg-white transition-colors duration-300" />

                            {/* Card content */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] pl-8 md:px-0"
                            >
                                <div className={`glass-panel p-8 md:text-left ${index % 2 === 0 ? '' : 'md:text-right'} hover:border-white/30 transition-all duration-300`}>
                                    <h3 className="font-bold text-xl text-white mb-1">{exp.title}</h3>
                                    <h4 className="font-medium text-gray-400 mb-4">{exp.company}</h4>

                                    <p className="text-gray-500 text-sm leading-relaxed mb-6">
                                        {exp.description}
                                    </p>

                                    <div className={`flex flex-wrap gap-2 mb-6 ${index % 2 !== 0 ? 'md:justify-end' : ''}`}>
                                        {exp.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 text-[10px] uppercase tracking-wider font-bold rounded-sm bg-white/5 text-gray-400 border border-white/10">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className={`flex items-center gap-6 text-xs text-gray-600 border-t border-white/5 pt-4 ${index % 2 !== 0 ? 'md:justify-end' : ''}`}>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3 h-3" />
                                            <span>{exp.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-3 h-3" />
                                            <span>{exp.location}</span>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Experience;
