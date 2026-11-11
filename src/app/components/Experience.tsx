'use client';

import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Experience = () => {
    const [selectedExperience, setSelectedExperience] = React.useState<typeof experiences[0] | null>(null);

    React.useEffect(() => {
        if (!selectedExperience) return;

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') setSelectedExperience(null);
        };

        const previousOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = previousOverflow;
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedExperience]);

    const experiences = [
                {
            title: "SDE Intern",
            company: "Microsoft",
            date: "May 2026 - Jul 2026",
            location: "Hyderabad, India",
            description: "Worked on cloud-scale security infrastructure for browser extensions in the MAI Extensions Security team.",
            image: "/experience/microsoft.png",
            tags: ["C#", "Azure", "Distributed Systems", "MCP", "Security"],
            detailedTimeline: [
                {
                    date: "May2026 - Jul 2026",
                    role: "SDE Intern",
                    description: "Designed and deployed a cloud-scale malware-hunting platform, reducing scan time for a catalog of browser extensions from 6 hours to 2-5 minutes."
                }
            ]
        },
        {
            title: "Head Of Maintainance",
            company: "IRIS - NITK's Administrative System",
            date: "November 2024 - Present",
            location: "NITK Surathkal",
            description: "Contributing to the official student-led ERP system of NITK with 23k+ users.",
            image: "/experience/iris.png",
            tags: ["Ruby on Rails", "MySQL", "Nginx"],
            detailedTimeline: [
                {
                    date: "April 2026",
                    role: "Head Of Maintainance",
                    description: "Oversees code quality and system upkeep by reviewing developer contributions, managing upgrades (Ruby, Rails, gems), and ensuring the platform remains stable and up to date. Regurly perform code audits and security checks to maintain the integrity of the system."
                },
                {
                    date: "Dec 2025",
                    role: "Web Lead",
                    description: "Managed a team of 8, Breaking down requirements into issues and sprints, and ensuring timely delivery of features."
                },
                {
                    date: "Nov 2024",
                    role: "Web Developer",
                    description: "Ruby on rails developer, worked on R&D module, implmeneted features like otp login."
                }
            ]
        },
        {
            title: "Executive Member",
            company: "IEEE NITK Student Branch",
            date: "October 2024 - Present",
            location: "NITK Surathkal",
            description: "Organizing technical workshops and hackathons. Mentoring junior members and leading initiatives to foster a coding culture.",
            image: "/experience/ieee-nitk.png",
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
        <section className="relative overflow-hidden bg-black py-20 sm:py-24 lg:py-32" id="experience">
            <div className="mx-auto max-w-5xl px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-12 sm:mb-16 lg:mb-20"
                >
                    <h2 className="mb-4 text-3xl font-bold text-white sm:mb-6 sm:text-4xl md:text-5xl">
                        Experience &amp; Education
                    </h2>
                    <div className="h-1 w-20 bg-white/20" />
                </motion.div>

                {/* Minimalist Timeline */}
                <div className="relative space-y-6 before:absolute before:left-[5px] before:top-0 before:h-full before:w-px before:bg-white/10 sm:space-y-8 lg:before:left-1/2 lg:before:-translate-x-1/2">
                    {experiences.map((exp, index) => (
                        <div
                            key={index}
                            className="group relative cursor-pointer pl-8 lg:grid lg:grid-cols-2 lg:gap-16 lg:pl-0"
                            onClick={() => setSelectedExperience(exp)}
                        >
                            {/* Minimal Dot */}
                            <div className="absolute left-0 top-7 z-10 h-3 w-3 shrink-0 rounded-full border border-white/50 bg-black transition-colors duration-300 group-hover:bg-white lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2" />

                            {/* Card content */}
                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className={`w-full min-w-0 lg:row-start-1 ${index % 2 === 0 ? 'lg:col-start-2' : 'lg:col-start-1'}`}
                            >
                                <div className={`glass-panel border border-white/10 p-5 transition-all duration-300 hover:border-white/30 sm:p-6 lg:p-8 ${index % 2 === 0 ? '' : 'lg:text-right'}`}>
                                    <h3 className="mb-1 text-lg font-bold text-white sm:text-xl">{exp.title}</h3>
                                    <h4 className="mb-3 font-medium text-gray-400 sm:mb-4">{exp.company}</h4>

                                    <p className="mb-5 text-sm leading-relaxed text-gray-500 sm:mb-6">
                                        {exp.description}
                                    </p>

                                    <div className={`mb-5 flex flex-wrap gap-2 sm:mb-6 ${index % 2 !== 0 ? 'lg:justify-end' : ''}`}>
                                        {exp.tags.map(tag => (
                                            <span key={tag} className="rounded-sm border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 sm:px-3">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/5 pt-4 text-xs text-gray-600 ${index % 2 !== 0 ? 'lg:justify-end' : ''}`}>
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
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-3 backdrop-blur-sm sm:px-4"
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-label={`${selectedExperience.title} at ${selectedExperience.company}`}
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="glass-panel relative max-h-[85dvh] w-full max-w-2xl overflow-y-auto rounded-xl border border-white/10 bg-black p-5 sm:rounded-2xl sm:p-8"
                        >
                            <button
                                onClick={() => setSelectedExperience(null)}
                                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>

                            <div className="mb-8">
                                <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:gap-6">
                                    {selectedExperience.image && (
                                        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                                            {/* Ideally use Next.js Image here, using standard img for now to match style */}
                                            <img
                                                src={selectedExperience.image}
                                                alt={selectedExperience.company}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    )}
                                    <div>
                                        <h3 className="mb-2 text-xl font-bold text-white sm:text-2xl">{selectedExperience.title}</h3>
                                        <h4 className="mb-2 text-base text-blue-400 sm:text-lg">{selectedExperience.company}</h4>
                                        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
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
                                <p className="mb-8 border-b border-white/10 pb-8 leading-relaxed text-gray-400">
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
