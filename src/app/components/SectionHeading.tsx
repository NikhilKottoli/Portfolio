import React from 'react';
import PixelIcon, { type PixelIconName } from './pixel/PixelIcon';
import PixelDivider from './pixel/PixelDivider';
import Reveal from './pixel/Reveal';

type SectionHeadingProps = {
    /** Short label printed above the title, like a field note header. */
    eyebrow: string;
    title: React.ReactNode;
    description?: string;
    align?: 'left' | 'center';
    action?: React.ReactNode;
    icon?: PixelIconName;
    className?: string;
};

/**
 * The heading used at the top of every section: a small pixel label, a bold
 * title, and a studded divider underneath.
 */
const SectionHeading = ({
    eyebrow,
    title,
    description,
    align = 'left',
    action,
    icon = 'spark',
    className = '',
}: SectionHeadingProps) => {
    const centered = align === 'center';

    return (
        <Reveal
            className={`flex flex-col gap-5 ${
                centered ? 'items-center text-center' : 'lg:flex-row lg:items-end lg:justify-between'
            } ${className}`}
        >
            <div className={centered ? 'flex flex-col items-center' : ''}>
                <span className="inline-flex items-center gap-2 font-pixel-ui text-[0.6rem] uppercase tracking-[0.24em] text-leaf">
                    <PixelIcon name={icon} className="h-3.5 w-3.5 text-berry" />
                    {eyebrow}
                </span>

                <h2 className="pk-text-shadow-soft mt-3 font-pixel-ui text-[clamp(1.35rem,3.6vw,2rem)] uppercase leading-tight tracking-[0.06em] text-bark">
                    {title}
                </h2>

                {description ? (
                    <p
                        className={`mt-3 max-w-2xl font-body text-[1.02rem] leading-relaxed text-stone ${
                            centered ? 'text-center' : ''
                        }`}
                    >
                        {description}
                    </p>
                ) : null}

                <PixelDivider
                    className={`mt-5 max-w-sm ${centered ? 'w-full' : ''}`}
                />
            </div>

            {action ? <div className="shrink-0">{action}</div> : null}
        </Reveal>
    );
};

export default SectionHeading;
