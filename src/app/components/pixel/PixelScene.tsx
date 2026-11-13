import React from 'react';
import PixelSprite from './PixelSprite';
import {
    bushSprite,
    cloudSprite,
    flowerSprite,
    grassSprite,
    treeSprite,
} from './sprites';

type PixelSceneProps = {
    /** Scales the whole scenery down on smaller screens. */
    density?: 'full' | 'sparse';
    className?: string;
};

/**
 * The pixel environment that sits behind the hero.
 *
 * It is scenery only: every part of it is hidden from assistive technology
 * and it never takes pointer events, so it can never get in the way of the
 * introduction.
 */
const PixelScene = ({ density = 'full', className = '' }: PixelSceneProps) => {
    const sparse = density === 'sparse';

    return (
        <div
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
        >
            {/* Sky wash and a soft horizon band. */}
            <div className="absolute inset-x-0 top-0 h-[62%] bg-[linear-gradient(to_bottom,rgba(140,205,220,0.30),rgba(140,205,220,0.05)_58%,transparent)]" />
            <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(to_bottom,transparent,rgba(111,159,99,0.22))]" />

            {/* Drifting clouds. */}
            <div className="absolute inset-x-0 top-0 h-[46%]">
                <PixelSprite
                    art={cloudSprite}
                    className="absolute left-[4%] top-[6%] h-8 w-32 opacity-90 animate-drift"
                />
                <PixelSprite
                    art={cloudSprite}
                    className="absolute right-[6%] top-[16%] h-6 w-24 opacity-75 animate-drift [animation-delay:-4s]"
                />
                {!sparse ? (
                    <PixelSprite
                        art={cloudSprite}
                        className="absolute left-[38%] top-[2%] h-5 w-20 opacity-60 animate-drift [animation-delay:-7s]"
                    />
                ) : null}
            </div>

            {/* Far treeline. */}
            <div className="absolute inset-x-0 bottom-[26%] h-[30%] opacity-70">
                <PixelSprite
                    art={treeSprite}
                    className="absolute left-[2%] bottom-0 h-28 w-[10.5rem]"
                />
                <PixelSprite
                    art={treeSprite}
                    className="absolute right-[3%] bottom-0 h-24 w-44 opacity-85"
                />
            </div>

            {/* Ground furniture. */}
            <div className="absolute inset-x-0 bottom-0 h-[30%]">
                <PixelSprite
                    art={bushSprite}
                    className="absolute left-[16%] bottom-[6%] h-10 w-48"
                />
                <PixelSprite
                    art={bushSprite}
                    className="absolute right-[14%] bottom-[4%] h-9 w-40 opacity-90"
                />
                <PixelSprite
                    art={flowerSprite}
                    className="absolute left-[30%] bottom-[2%] h-10 w-10"
                />
                <PixelSprite
                    art={flowerSprite}
                    className="absolute right-[28%] bottom-[1%] h-8 w-8 opacity-90"
                />
                {!sparse ? (
                    <>
                        <PixelSprite
                            art={grassSprite}
                            className="absolute left-[8%] bottom-[2%] h-6 w-24"
                        />
                        <PixelSprite
                            art={grassSprite}
                            className="absolute right-[6%] bottom-[3%] h-5 w-20"
                        />
                        <PixelSprite
                            art={grassSprite}
                            className="absolute left-[42%] bottom-[1%] h-5 w-20 opacity-80"
                        />
                    </>
                ) : null}
            </div>
        </div>
    );
};

export default PixelScene;
