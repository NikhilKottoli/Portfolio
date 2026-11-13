import React from 'react';

export type PixelIconName =
    | 'home'
    | 'user'
    | 'folder'
    | 'code'
    | 'mail'
    | 'arrowRight'
    | 'arrowDown'
    | 'badge'
    | 'star'
    | 'gear'
    | 'chip'
    | 'cloud'
    | 'key'
    | 'shield'
    | 'chart'
    | 'coin'
    | 'heart'
    | 'spark'
    | 'book'
    | 'clock'
    | 'pin'
    | 'flag'
    | 'bolt'
    | 'speaker'
    | 'speakerOff';

/**
 * Eight by eight pixel icons.
 *
 * Every icon is a single-tone silhouette: `K` marks a solid pixel and `.`
 * marks empty space. Keeping them one colour means they inherit the text
 * colour of whatever they sit next to, so a menu item reads correctly when
 * it is highlighted.
 */
export const pixelIcons: Record<PixelIconName, string[]> = {
    home: [
        '..KKKK..',
        '.KKKKKK.',
        'KKKKKKKK',
        'K.KKKK.K',
        'K.KKKK.K',
        'K.KKKK.K',
        'K.KKKK.K',
        'KKKKKKKK',
    ],
    user: [
        '...KK...',
        '..KKKK..',
        '..KKKK..',
        '...KK...',
        '...KK...',
        '..KKKK..',
        '.KKKKKK.',
        'KKKKKKKK',
    ],
    folder: [
        '........',
        '.KKKK...',
        'KKKKKK..',
        'KKKKKKKK',
        'KKKKKKKK',
        'KKKKKKKK',
        'KKKKKKKK',
        '.KKKKKK.',
    ],
    code: [
        '..K..K..',
        '.KK..KK.',
        'KK....KK',
        'KK....KK',
        'KK....KK',
        '.KK..KK.',
        '..K..K..',
        '........',
    ],
    mail: [
        'KKKKKKKK',
        'K......K',
        'K.KKKK.K',
        'K.K..K.K',
        'K.K..K.K',
        'K.KKKK.K',
        'K......K',
        'KKKKKKKK',
    ],
    arrowRight: [
        'K.......',
        'KK......',
        'KKK.....',
        'KKKK....',
        'KKKKK...',
        'KKKK....',
        'KKK.....',
        'KK......',
    ],
    arrowDown: [
        '........',
        '........',
        'KKKKKKKK',
        '.KKKKKK.',
        '..KKKK..',
        '...KK...',
        '....K...',
        '........',
    ],
    badge: [
        '..KKKK..',
        '.KKKKKK.',
        'KKKKKKKK',
        'KKKKKKKK',
        'KKKKKKKK',
        '.KKKKKK.',
        '..KKKK..',
        '..K..K..',
    ],
    star: [
        '...KK...',
        '...KK...',
        '.KKKKKK.',
        'KKKKKKKK',
        '..KKKK..',
        '..K..K..',
        '.KK..KK.',
        '........',
    ],
    gear: [
        '..KKKK..',
        '.KKKKKK.',
        'KKK..KKK',
        'KK....KK',
        'KK....KK',
        'KKK..KKK',
        '.KKKKKK.',
        '..KKKK..',
    ],
    chip: [
        '..K..K..',
        '.KKKKKK.',
        'KKK..KKK',
        'KK....KK',
        'KK....KK',
        'KKK..KKK',
        '.KKKKKK.',
        '..K..K..',
    ],
    cloud: [
        '..KKKK..',
        '.KKKKKK.',
        'KKKKKKKK',
        'KKKKKKKK',
        '.KKKKKK.',
        '..KKKK..',
        '........',
        '........',
    ],
    key: [
        'KKK.....',
        'K.KK....',
        'KKK.....',
        '..K.....',
        '..KK....',
        '..K.K...',
        '...K....',
        '........',
    ],
    shield: [
        '.KKKK...',
        'KKKKKK..',
        'KKKKKK..',
        '.KKKK...',
        '.KKKK...',
        '..KK....',
        '..KK....',
        '...K....',
    ],
    chart: [
        'K.......',
        'K.......',
        'KK......',
        'K.K.....',
        'K.KK....',
        'K.KK....',
        'K.KKK...',
        'KKKKKKK.',
    ],
    coin: [
        '..KKKK..',
        '.KKKKKK.',
        'KKKKKKKK',
        'KKK..KKK',
        'KK....KK',
        'KK....KK',
        'KKK..KKK',
        '.KKKKKK.',
    ],
    heart: [
        '.KK..KK.',
        'KKKKKKKK',
        'KKKKKKKK',
        '.KKKKKK.',
        '..KKKK..',
        '...KK...',
        '....K...',
        '........',
    ],
    spark: [
        '....K...',
        '....K...',
        '...KK...',
        '..KKKK..',
        '.KKKKKK.',
        '..KKKK..',
        '...KK...',
        '....K...',
    ],
    book: [
        'KKKKKK..',
        'K.KKKK..',
        'K.KKKK..',
        'K.KKKK..',
        'K.KKKK..',
        'K.KKKK..',
        'KKKKKK..',
        '........',
    ],
    clock: [
        '..KKKK..',
        '.KKKKKK.',
        'KK.KK.KK',
        'KK.KK.KK',
        'KKKKKKKK',
        'KK....KK',
        '.KKKKKK.',
        '..KKKK..',
    ],
    pin: [
        '..KKKK..',
        '.KKKKKK.',
        'KKKKKKKK',
        'KKKKKKKK',
        '.KKKKKK.',
        '..KKKK..',
        '...KK...',
        '....K...',
    ],
    flag: [
        'KKK.....',
        'KKKKKK..',
        'KKKKKKKK',
        'KKK.KKKK',
        'KKK.....',
        'KKK.....',
        'KKK.....',
        '........',
    ],
    bolt: [
        '....KK..',
        '...KKK..',
        '..KKKK..',
        '.KKKK...',
        '..KKK...',
        '..KK....',
        '.KK.....',
        '........',
    ],
    speaker: [
        '...K....',
        '..KK....',
        '.KKKK...',
        '.KKKK...',
        '.KKKK...',
        '..KK....',
        '...K....',
        '........',
    ],
    speakerOff: [
        '...K....',
        '..KK....',
        '.KKKK...',
        'K...K...',
        'K...K...',
        '..KK....',
        '...K....',
        '........',
    ],
};

type PixelIconProps = {
    name: PixelIconName;
    className?: string;
    /** Overrides the icon colour. Defaults to the inherited text colour. */
    color?: string;
    title?: string;
};

/**
 * A single-colour pixel icon rendered as crisp-edged SVG.
 *
 * The colour is applied with `currentColor` so the icon inherits from the
 * surrounding text, which keeps menu items readable when they are selected.
 */
const PixelIcon = ({ name, className = '', color, title }: PixelIconProps) => {
    const rows = pixelIcons[name];
    const width = rows[0]?.length ?? 8;

    let d = '';
    rows.forEach((row, y) => {
        [...row].forEach((char, x) => {
            if (char === '.') return;
            d += `M${x} ${y}h1v1h-1z`;
        });
    });

    return (
        <svg
            viewBox={`0 0 ${width} ${rows.length}`}
            className={className}
            role={title ? 'img' : undefined}
            aria-label={title}
            aria-hidden={title ? undefined : true}
            shapeRendering="crispEdges"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d={d} fill={color ?? 'currentColor'} />
        </svg>
    );
};

export default PixelIcon;
