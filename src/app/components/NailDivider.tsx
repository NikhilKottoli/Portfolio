import React from 'react';
import { Sword } from 'lucide-react';

type NailDividerProps = {
    className?: string;
};

/** A thin area-title divider with a nail at its heart. */
const NailDivider = ({ className = '' }: NailDividerProps) => {
    return (
        <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/55 sm:w-16" />
            <span className="h-1 w-1 rotate-45 border border-gold/60" />
            <Sword className="h-3.5 w-3.5 text-gold/70" strokeWidth={1.4} />
            <span className="h-1 w-1 rotate-45 border border-gold/60" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/55 sm:w-16" />
        </div>
    );
};

export default NailDivider;
