import React from 'react';

type CharmProps = {
    icon: React.ElementType;
    className?: string;
    iconClassName?: string;
    size?: 'sm' | 'md' | 'lg';
    tone?: 'gold' | 'soul';
};

const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-11 w-11',
    lg: 'h-14 w-14',
};

const iconSizes = {
    sm: 'h-3.5 w-3.5',
    md: 'h-4.5 w-4.5',
    lg: 'h-6 w-6',
};

/**
 * A charm-notch socket inspired by Hollow Knight's charm inventory.
 * Eight small notches ring a gilded circle around an icon.
 */
const Charm = ({
    icon: Icon,
    className = '',
    iconClassName = '',
    size = 'md',
    tone = 'gold',
}: CharmProps) => {
    const ring = tone === 'soul' ? 'text-soul' : 'text-gold';

    return (
        <span
            className={`relative inline-flex shrink-0 items-center justify-center ${sizeClasses[size]} ${ring} ${className}`}
        >
            <svg viewBox="0 0 64 64" aria-hidden="true" className="absolute inset-0 h-full w-full">
                <circle
                    cx="32"
                    cy="32"
                    r="28.5"
                    fill="rgba(5, 8, 11, 0.6)"
                    stroke="currentColor"
                    strokeOpacity="0.38"
                    strokeWidth="1"
                />
                <circle
                    cx="32"
                    cy="32"
                    r="23"
                    fill="none"
                    stroke="currentColor"
                    strokeOpacity="0.18"
                    strokeWidth="1"
                />
                {Array.from({ length: 8 }, (_, index) => {
                    const angle = (index * Math.PI) / 4 - Math.PI / 2;
                    return (
                        <circle
                            key={index}
                            cx={32 + Math.cos(angle) * 28.5}
                            cy={32 + Math.sin(angle) * 28.5}
                            r="1.5"
                            fill="currentColor"
                            fillOpacity="0.8"
                        />
                    );
                })}
            </svg>
            <Icon
                aria-hidden="true"
                className={`relative ${iconSizes[size]} ${tone === 'soul' ? 'text-soul/80' : 'text-gold/85'} ${iconClassName}`}
            />
        </span>
    );
};

export default Charm;
