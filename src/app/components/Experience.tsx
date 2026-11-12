'use client';

import React from 'react';
import { Calendar, Compass, MapPin, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import SectionHeading from './SectionHeading';

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
            title: 'SDE Intern',
            company: 'Microsoft',
            date: 'May 2026 - Jul 2026',
            location: 'Hyderabad, India',
            description:
                'Worked on cloud-scale security infrastructure for browser extensions in the MAI Extensions Security team.',
            image: '/experience/microsoft.png',
            tags: ['C#', 'Azure', 'Distributed Systems', 'MCP', 'Security'],
            detailedTimeline: [
                {
                    date: 'May2026 - Jul 2026',
                    role: 'SDE Intern',
                    description:
                        'Designed and deployed a cloud-scale malware-hunting platform, reducing scan time for a catalog of browser extensions from 6 hours to 2-5 minutes.'
                }
            ]
        },
        {
            title: 'Head Of Maintainance',
            company: "IRIS - NITK's Administrative System",
            date: 'November 2024 - Present',
            location: 'NITK Surathkal',
            description:
                'Contributing to the official student-led ERP system of NITK with 23k+ users.',
            image: '/experience/iris.png',
            tags: ['Ruby on Rails', 'MySQL', 'Nginx'],
            detailedTimeline: [
                {
                    date: 'April 2026',
                    role: 'Head Of Maintainance',
                    description:
                        'Oversees code quality and system upkeep by reviewing developer contributions, managing upgrades (Ruby, Rails, gems), and ensuring the platform remains stable and up to date. Regurly perform code audits and security checks to maintain the integrity of the system.'
                },
                {
                    date: 'Dec 2025',
                    role: 'Web Lead',
                    description:
                        'Managed a team of 8, Breaking down requirements into issues and sprints, and ensuring timely delivery of features.'
                },
                {
                    date: 'Nov 2024',
                    role: 'Web Developer',
                    description:
                        'Ruby on rails developer, worked on R&D module, implmeneted features like otp login.'
                }
            ]
        },
        {
            title: 'Executive Member',
            company: 'IEEE NITK Student Branch',
            date: 'October 2024 - Present',
            location: 'NITK Surathkal',
            description:
                'Organizing technical workshops and hackathons. Mentoring junior members and leading initiatives to foster a coding culture.',
            image: '/experience/ieee-nitk.png',
            tags: ['Leadership', 'Management', 'Mentoring'],
            detailedTimeline: [
                {
                    date: 'Oct 2024',
                    role: 'Executive Member',
                    description: 'Inducted into the core committee to drive technical events.'
                }
            ]
        }
    ];

    return (
        <section className="relative overflow-hidden py-24 sm:py-28 lg:py-36" id="experience">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-pale/10 to-transparent" />
            <div className="pointer-events-none absolute left-1/2 top-1/4 h-[480px] w-[480px] -translate-x-1/2 rounded-full bg-soul/[0.035] blur-[140px]" />

            <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">
                <SectionHeading
                    eyebrow="The Pilgrim's Path"
                    title="Experience & Education"
                    description="Roles and communities that shaped how I build and lead."
                    icon={Compass}
                    className="mb-12 sm:mb-16 lg:mb-20"
                />

                {/* Timeline */}
                <div className="relative space-y-6 before:absolute before:left-[5px] before:top-0 before:h-full before:w-px before:bg-gradient-to-b before:from-transparent before:via-gold/25 before:to-transparent sm:space-y-8 lg:before:left-1/2 lg:before:-translate-x-1/2">
                    {experiences.map((exp, index) => (
                        <div
                            key={exp.title}
                            className="group relative cursor-pointer pl-8 lg:grid lg:grid-cols-2 lg:gap-16 lg:pl-0"
                            onClick={() => setSelectedExperience(exp)}
                        >
                            <div className="absolute left-0 top-7 z-10 h-2.5 w-2.5 rotate-45 border border-gold/60 bg-void shadow-[0_0_0_5px_rgba(3,6,10,0.9)] transition-all duration-300 group-hover:border-soul group-hover:bg-soul/20 group-hover:shadow-[0_0_0_5px_rgba(3,6,10,0.9),0_0_18px_rgba(185,242,255,0.55)] lg:left-1/2 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2" />

                            <motion.div
                                initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30, scale: 0.98 }}
                                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.08, type: 'spring', stiffness: 120, damping: 18 }}
                                className={`w-full min-w-0 lg:row-start-1 ${
                                    index % 2 === 0 ? 'lg:col-start-2' : 'lg:col-start-1'
                                }`}
                            >
                                <div
                                    className={`hk-panel-raised hk-frame p-5 transition-all duration-300 sm:p-6 lg:p-7 ${
                                        index % 2 === 0 ? '' : 'lg:text-right'
                                    }`}
                                >
                                    <div
                                        className={`mb-4 flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-[8px] uppercase tracking-[0.24em] text-soul/55 ${
                                            index % 2 !== 0 ? 'lg:justify-end' : ''
                                        }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <Calendar className="h-3 w-3" />
                                            {exp.date}
                                        </span>
                                        <span className="flex items-center gap-2 text-mist/40">
                                            <MapPin className="h-3 w-3" />
                                            {exp.location}
                                        </span>
                                    </div>

                                    <h3 className="font-display text-lg font-semibold tracking-wide text-pale sm:text-xl">
                                        {exp.title}
                                    </h3>
                                    <h4 className="mt-1.5 font-display text-[10px] uppercase tracking-[0.22em] text-gold/65">
                                        {exp.company}
                                    </h4>

                                    <p className="mt-4 font-body text-[15px] leading-relaxed text-mist/65">
                                        {exp.description}
                                    </p>

                                    <div
                                        className={`mt-5 flex flex-wrap gap-2 ${
                                            index % 2 !== 0 ? 'lg:justify-end' : ''
                                        }`}
                                    >
                                        {exp.tags.map((tag) => (
                                            <span
                                                key={tag}
                                                className="hk-chip px-2.5 py-1 font-display text-[8px] uppercase tracking-[0.18em] text-mist/55"
                                            >
                                                {tag}
                                            </span>
                                        ))}
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
                        className="fixed inset-0 z-[70] flex items-center justify-center bg-void/85 px-3 backdrop-blur-md sm:px-4"
                    >
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-label={`${selectedExperience.title} at ${selectedExperience.company}`}
                            initial={{ scale: 0.94, opacity: 0, y: 12 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.94, opacity: 0, y: 12 }}
                            transition={{ duration: 0.28, ease: 'easeOut' }}
                            onClick={(e) => e.stopPropagation()}
                            className="hk-panel-raised hk-frame relative max-h-[86dvh] w-full max-w-2xl overflow-y-auto p-5 sm:p-8"
                        >
                            <button
                                onClick={() => setSelectedExperience(null)}
                                aria-label="Close"
                                className="absolute right-4 top-4 z-20 flex h-9 w-9 items-center justify-center border border-pale/12 bg-void/70 text-mist/70 backdrop-blur-sm transition-colors hover:border-gold/40 hover:text-pale"
                            >
                                <X className="h-4 w-4" />
                            </button>

                            <div className="flex flex-col gap-5 border-b border-pale/10 pb-6 pr-10 sm:flex-row sm:items-center sm:gap-6">
                                {selectedExperience.image && (
                                    <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-pale/12 bg-deep">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={selectedExperience.image}
                                            alt={selectedExperience.company}
                                            className="h-full w-full object-cover opacity-85"
                                        />
                                        <span className="pointer-events-none absolute inset-0 border border-gold/10" />
                                    </div>
                                )}
                                <div>
                                    <h3 className="font-display text-xl font-semibold tracking-wide text-pale sm:text-2xl">
                                        {selectedExperience.title}
                                    </h3>
                                    <h4 className="mt-1.5 font-display text-[10px] uppercase tracking-[0.24em] text-gold/70">
                                        {selectedExperience.company}
                                    </h4>
                                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 font-display text-[8px] uppercase tracking-[0.22em] text-mist/45">
                                        <span className="flex items-center gap-2">
                                            <Calendar className="h-3 w-3" />
                                            {selectedExperience.date}
                                        </span>
                                        <span className="flex items-center gap-2">
                                            <MapPin className="h-3 w-3" />
                                            {selectedExperience.location}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="border-b border-pale/10 py-6 font-body text-base leading-relaxed text-mist/75">
                                {selectedExperience.description}
                            </p>

                            <div className="pt-6">
                                <h4 className="font-display text-[8px] uppercase tracking-[0.32em] text-soul/55">
                                    Journey Timeline
                                </h4>
                                <div className="mt-5 space-y-6">
                                    {selectedExperience.detailedTimeline?.map((item, i) => (
                                        <div
                                            key={i}
                                            className="relative border-l border-pale/10 pb-6 pl-8 last:border-0 last:pb-0"
                                        >
                                            <div className="absolute left-[-4px] top-1 h-2 w-2 rotate-45 bg-soul/80 shadow-[0_0_12px_rgba(154,219,232,0.55)]" />
                                            <span className="font-display text-[8px] uppercase tracking-[0.24em] text-soul/60">
                                                {item.date}
                                            </span>
                                            <h5 className="mt-2 font-display text-base font-semibold tracking-wide text-pale">
                                                {item.role}
                                            </h5>
                                            <p className="mt-2 font-body text-[15px] leading-relaxed text-mist/65">
                                                {item.description}
                                            </p>
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
