import React from 'react';
import KnightMark from './KnightMark';
import NailDivider from './NailDivider';

/**
 * The quiet end of the map: a small sigil, the maker's name, and a way back up.
 */
const SiteFooter = () => {
    const year = new Date().getFullYear();

    return (
        <footer className="relative overflow-hidden border-t border-pale/[0.07] py-14 sm:py-16">
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
            <div className="pointer-events-none absolute left-1/2 top-0 h-56 w-[36rem] -translate-x-1/2 rounded-full bg-soul/[0.04] blur-[100px]" />

            <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-7 px-4 text-center sm:px-6">
                <NailDivider />

                <div className="flex flex-col items-center gap-3">
                    <KnightMark className="h-9 w-9 text-pale/70" />
                    <p className="font-logo text-base font-bold uppercase tracking-[0.24em] text-pale">
                        Nikhil Kottoli
                    </p>
                    <p className="font-display text-[8px] uppercase tracking-[0.38em] text-mist/40">
                        A small light in the dark · NITK Surathkal
                    </p>
                </div>

                <div className="flex items-center gap-4 font-display text-[8px] uppercase tracking-[0.28em] text-mist/35">
                    <span>© {year}</span>
                    <span className="h-1 w-1 rotate-45 border border-gold/40" />
                    <a
                        href="#"
                        className="transition-colors duration-300 hover:text-soul/75"
                    >
                        Return to the surface
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default SiteFooter;
