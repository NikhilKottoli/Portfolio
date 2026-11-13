import React from 'react';
import PixelIcon, { type PixelIconName } from './PixelIcon';

type PixelBadgeProps = {
    icon?: PixelIconName;
    children: React.ReactNode;
    /** `berry` is the classic FireRed accent, `leaf` reads as a collected item. */
    tone?: 'berry' | 'leaf' | 'honey' | 'sand' | 'bark';
    className?: string;
    title?: string;
};

const toneClasses: Record<NonNullable<PixelBadgeProps['tone']>, string> = {
    berry: 'bg-berry text-cream',
    leaf: 'bg-leaf text-cream',
    honey: 'bg-honey text-ink',
    sand: 'bg-sand text-ink',
    bark: 'bg-bark text-cream',
};

/**
 * A small collectible-style badge, like the ones that line the bottom of a
 * Pokémon summary screen.
 */
const PixelBadge = ({
    icon = 'star',
    children,
    tone = 'sand',
    className = '',
    title,
}: PixelBadgeProps) => {
    return (
        <span
            title={title}
            className={`pk-chip px-2.5 py-1 font-pixel-ui text-[0.6rem] uppercase tracking-[0.14em] ${toneClasses[tone]} ${className}`}
        >
            <PixelIcon name={icon} className="h-3 w-3 shrink-0" />
            {children}
        </span>
    );
};

export default PixelBadge;
