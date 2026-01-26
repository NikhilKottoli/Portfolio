'use client';

import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Experience = () => {
    const [selectedExperience, setSelectedExperience] = React.useState<typeof experiences[0] | null>(null);

    const experiences = [
        {
            title: "Web Lead",
            company: "IRIS - NITK's Administrative System",
            date: "November 2024 - Present",
            location: "NITK Surathkal",
            description: "Contributing to the official student-led ERP system of NITK. Building the R&D module and optimizing database queries with Ruby on Rails.",
            image: "/iris.png",
            tags: ["Ruby on Rails", "MySQL", "ActiveRecord"],
            detailedTimeline: [
                {
                    date: "Dec 2025",
                    role: "Web Lead",
                    description: "Led the migration of legacy modules to the new architecture, improving system response time by 40%."
                },
                {
                    date: "Nov 2024",
                    role: "Web Developer",
                    description: "Selected as one of the few freshers to join the team. Started with bug fixes and minor feature additions."
                }
            ]
        },
        {
            title: "Executive Member",
            company: "IEEE NITK Student Branch",
            date: "October 2024 - Present",
            location: "NITK Surathkal",
            description: "Organizing technical workshops and hackathons. Mentoring junior members and leading initiatives to foster a coding culture.",
            image: "/ieee-nitk.png",
            tags: ["Leadership", "Management", "Mentoring"],
            detailedTimeline: [
                {
                    date: "Oct 2024",
                    role: "Executive Member",
                    description: "Inducted into the core committee to drive technical events."
                }
            ]
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
                        <div
                            key={index}
                            className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group cursor-pointer"
                            onClick={() => setSelectedExperience(exp)}
                        >
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

            {/* Detailed Modal */}
            <AnimatePresence>
                {selectedExperience && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedExperience(null)}
                        className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-black border border-white/10 p-8 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto relative glass-panel"
                        >
                            <button
                                onClick={() => setSelectedExperience(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>

                            <div className="mb-8">
                                <div className="flex items-start gap-6 mb-6">
                                    {selectedExperience.image && (
                                        <div className="h-20 rounded-xl overflow-hidden border border-white/10 shrink-0 bg-white/5">
                                            {/* Ideally use Next.js Image here, using standard img for now to match style */}
                                            <img
                                                src={selectedExperience.image}
                                                alt={selectedExperience.company}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="text-2xl font-bold text-white mb-2">{selectedExperience.title}</h3>
                                        <h4 className="text-lg text-blue-400 mb-2">{selectedExperience.company}</h4>
                                        <div className="flex items-center gap-4 text-sm text-gray-500">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                <span>{selectedExperience.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <MapPin className="w-4 h-4" />
                                                <span>{selectedExperience.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-gray-400 leading-relaxed mb-8 border-b border-white/10 pb-8">
                                    {selectedExperience.description}
                                </p>

                                <div className="space-y-6">
                                    <h4 className="text-sm uppercase tracking-wider text-gray-500 font-bold mb-4">Journey Timeline</h4>
                                    {selectedExperience.detailedTimeline?.map((item, i) => (
                                        <div key={i} className="relative pl-8 border-l border-white/10 last:border-0 pb-6 last:pb-0">
                                            <div className="absolute left-[-5px] top-1 w-2.5 h-2.5 rounded-full bg-blue-500 ring-4 ring-black" />
                                            <span className="text-xs font-mono text-blue-400 mb-1 block">{item.date}</span>
                                            <h5 className="text-white font-bold mb-2 text-lg">{item.role}</h5>
                                            <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Experience;
