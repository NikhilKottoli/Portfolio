'use client';

import React from 'react';
import { motion } from 'motion/react';
import Ornament from './Ornament';

type SectionHeadingProps = {
    eyebrow: string;
    title: React.ReactNode;
    description?: string;
    align?: 'left' | 'center';
    action?: React.ReactNode;
    className?: string;
};

const SectionHeading = ({
    eyebrow,
    title,
    description,
    align = 'left',
    action,
    className = '',
}: SectionHeadingProps) => {
    const centered = align === 'center';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`flex flex-col gap-6 ${centered ? 'items-center text-center' : 'lg:flex-row lg:items-end lg:justify-between'} ${className}`}
        >
            <div className="max-w-2xl">
                <p className="font-display text-[9px] uppercase tracking-[0.42em] text-soul/60 sm:text-[10px]">
                    {eyebrow}
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-wide text-pale sm:text-4xl md:text-5xl">
                    {title}
                </h2>
                <Ornament className={`mt-5 ${centered ? 'justify-center' : ''}`} />
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
