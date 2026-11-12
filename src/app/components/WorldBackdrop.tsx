import React from 'react';
import ParallaxLayers from './ParallaxLayers';
import DepthFog from './DepthFog';
import ForegroundParallax from './ForegroundParallax';

/**
 * World backdrop - now uses the full parallax + fog depth system.
 * Used on non-home pages where we don't need the hero-specific elements.
 */
const WorldBackdrop = () => {
    return (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
            <ParallaxLayers />
            <DepthFog />
            <ForegroundParallax side="both" />
        </div>
    );
};

export default WorldBackdrop;