import React from 'react';
import KnightMark from './KnightMark';
import HallownestSkyline from './HallownestSkyline';

/**
 * Fixed cave-world backdrop shared by every route.
 * Keeps the page feeling like it is set inside Hallownest without hurting legibility.
 */
const WorldBackdrop = () => {
    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_45%_at_50%_-8%,rgba(154,219,232,0.1),transparent_65%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_45%_38%_at_50%_110%,rgba(154,219,232,0.07),transparent_70%)]" />

            <KnightMark className="absolute left-1/2 top-[14%] h-[68vmin] w-[68vmin] -translate-x-1/2 text-pale/[0.022]" />

            <HallownestSkyline className="absolute inset-x-0 bottom-0 h-[36vh] w-full text-deep/60 opacity-40" />

            <div className="hk-fog absolute -bottom-24 left-1/2 h-[40vh] w-[125vw] -translate-x-1/2 rounded-[50%] bg-soul/[0.05] blur-[110px]" />
            <div className="hk-fog-slow absolute -bottom-16 left-[-10%] h-[30vh] w-[80vw] rounded-[50%] bg-gold/[0.025] blur-[100px]" />

            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(3,6,10,0.5)_100%)]" />
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-void via-void/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-void via-void/55 to-transparent" />
        </div>
    );
};

export default WorldBackdrop;
