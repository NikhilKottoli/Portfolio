'use client';

import React from 'react';
import LetterGlitch from './LetterGlitch';

const HeroSection = () => {
    return (
        <div className="hero-section relative overflow-hidden flex flex-col gap-5 h-screen p-10">

            <div className="absolute inset-0 z-[5]">
                <LetterGlitch
                    glitchSpeed={50}
                    centerVignette={true}
                    outerVignette={false}
                    smooth={true}
                />
            </div>

            {/* Hero content (z-10, higher than background) */}
            <div className="flex flex-col gap-5 w-full h-full justify-center items-center pl-[5%] z-10">
                <h1 className="text-[#FFFFFF] text-7xl font-bold font-raleway">Hey, my name is</h1>
                <h1 className="text-[#FFFFFF] text-7xl font-bold font-raleway">Nikhil Kottoli</h1>
            </div>

            {/* Scroll Down Indicator */}
            <div className="absolute bottom-10 right-10 z-10">
                <p className="bg-[#D3D3D3] p-2 rounded-3xl animate-jiggle text-black">Scroll Down &#8595;</p>
            </div>
        </div>
    );
}

export default HeroSection;
