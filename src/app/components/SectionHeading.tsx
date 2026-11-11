'use client';

import React from 'react';
import { motion } from 'motion/react';
import KnightMark from './KnightMark';
import Charm from './Charm';
import NailDivider from './NailDivider';

type SectionHeadingProps = {
    eyebrow: string;
    title: React.ReactNode;
    description?: string;
    align?: 'left' | 'center';
    action?: React.ReactNode;
    icon?: React.ElementType;
    className?: string;
};

const SectionHeading = ({
    eyebrow,
    title,
    description,
    align = 'left',
    action,
    icon,
    className = '',
}: SectionHeadingProps) => {
    const centered = align === 'center';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative flex flex-col gap-6 ${centered ? 'items-center text-center' : 'lg:flex-row lg:items-end lg:justify-between'} ${className}`}
        >
            {/* Faint mask pressed into the stone behind the heading */}
            <KnightMark
                className={`pointer-events-none absolute -top-10 hidden h-32 w-32 text-pale/[0.03] sm:block ${
                    centered ? 'left-1/2 -translate-x-1/2' : 'right-0 lg:right-24'
                }`}
            />

            <div className="relative max-w-2xl">
                <div className={`flex items-center gap-3 ${centered ? 'justify-center' : ''}`}>
                    {icon ? (
                        <Charm icon={icon} size="sm" tone="gold" />
                    ) : (
                        <span className="flex h-8 w-8 items-center justify-center border border-gold/25">
                            <span className="h-1.5 w-1.5 rotate-45 border border-gold/60" />
                        </span>
                    )}
                    <p className="font-display text-[9px] uppercase tracking-[0.42em] text-soul/65 sm:text-[10px]">
                        {eyebrow}
                    </p>
                </div>

                <h2 className="mt-4 font-display text-3xl font-semibold leading-tight tracking-wide text-pale sm:text-4xl md:text-5xl">
                    {title}
                </h2>
                <NailDivider className={`mt-5 ${centered ? 'justify-center' : ''}`} />

                {description && (
                    <p className={`mt-5 max-w-xl text-base leading-relaxed text-mist/75 sm:text-lg ${centered ? 'mx-auto' : ''}`}>
                        {description}
                    </p>
                )}
            </div>
            {action}
        </motion.div>
    );
};

export default SectionHeading;
