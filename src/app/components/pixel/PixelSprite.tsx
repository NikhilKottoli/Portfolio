import React from 'react';
import { palette, type PixelArt } from './sprites';

type PixelSpriteProps = {
    art: PixelArt;
    /** Rendered size of the sprite. The grid itself is never scaled unevenly. */
    className?: string;
    /** Accessible label. When omitted the sprite is treated as decoration. */
    title?: string;
    style?: React.CSSProperties;
};

/**
 * Renders a pixel grid as SVG.
 *
 * Each pixel is a crisp-edged rectangle and the whole grid is scaled by the
 * browser, so the artwork stays sharp at any size without shipping a bitmap.
 */
const PixelSprite = ({ art, className = '', title, style }: PixelSpriteProps) => {
    const width = art.rows[0]?.length ?? 0;
    const height = art.rows.length;

    // Group pixels by colour so the SVG only carries one path per colour.
    const paths = new Map<string, string[]>();

    art.rows.forEach((row, y) => {
        [...row].forEach((char, x) => {
            const colour = palette[char];
            if (!colour) return;

            const existing = paths.get(colour) ?? [];
            existing.push(`M${x} ${y}h1v1h-1z`);
            paths.set(colour, existing);
        });
    });

    const label = title ?? art.title;

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            className={className}
            style={style}
            role={label ? 'img' : undefined}
            aria-label={label}
            aria-hidden={label ? undefined : true}
            shapeRendering="crispEdges"
            xmlns="http://www.w3.org/2000/svg"
        >
            {Array.from(paths.entries()).map(([colour, data]) => (
                <path key={colour} d={data.join('')} fill={colour} />
            ))}
        </svg>
    );
};

export default PixelSprite;
