/**
 * Pixel art used across the site.
 *
 * Every sprite is stored as a grid of characters, one character per pixel, and
 * rendered as SVG with `shape-rendering: crispEdges`. That keeps the artwork
 * resolution independent (a single sprite can be used at 24px or 240px and
 * stay perfectly sharp), keeps the payload tiny and avoids shipping binary
 * image assets.
 *
 * The trainer, the companion creatures and the scenery are original designs
 * written for this portfolio. They borrow the shape language of Game Boy
 * Advance sprites without reusing any existing game artwork.
 */

export type PixelPalette = Record<string, string>;

/** Shared palette. Letters are the alphabet of the sprite grids below. */
export const palette: PixelPalette = {
    K: '#2b2a26', // outline / ink
    S: '#f2c9a0', // skin
    s: '#d9a06f', // skin shadow
    H: '#5a3a25', // hair
    R: '#d8433b', // cap red
    r: '#a52f2a', // cap red shade
    J: '#33713f', // jacket green
    j: '#275630', // jacket green shade
    W: '#fffaf0', // shirt cream
    P: '#3f6fb5', // jeans blue
    p: '#2d4f80', // jeans blue shade
    B: '#7a4a25', // boots / straps brown
    Y: '#f2be3c', // honey yellow
    L: '#6f9f63', // leaf green
    l: '#4f7746', // leaf green shade
    G: '#8ccddc', // leafling body
    g: '#5fa0b4', // leafling shade
    O: '#ef6b3c', // emberling body
    o: '#c04a26', // emberling shade
    T: '#24382b', // trunk
    N: '#f5efdc', // cloud
    F: '#e0603f', // flower petal
    f: '#f2be3c', // flower centre
};

export type PixelArt = {
    /** Grid of pixels, one character per pixel. */
    rows: string[];
    /** Accessible name. Omit for purely decorative sprites. */
    title?: string;
};

/**
 * The trainer: red cap, green jacket, blue jeans. Drawn front-on with a
 * three-quarter turn so the silhouette stays readable at small sizes.
 */
export const trainerSprite: PixelArt = {
    title: 'Pixel art of Nikhil, the trainer, wearing a red cap and green jacket',
    rows: [
        '....KKKKKKKK....',
        '...KRRRRRRRRK...',
        '..KRRRRRRRRRRK..',
        '..KRRRRRRRRRRK..',
        '..KKrrrrrrrrKK..',
        '..KSSSSSSSSSSK..',
        '...KHSSSSSSHK...',
        '...KHSSSSSSHK...',
        '...KSSKSSKSSK...',
        '...KSSSSSSSSK...',
        '...KsSSSSSSsK...',
        '....KSSSSSSK....',
        '...KKKKKKKKKK...',
        '..KJJJJJJJJJJK..',
        '..KBWWWWWWWWKB..',
        '..KBWWWWWWWWKB..',
        '..KBJJJJJJJJBK..',
        '..KKJJJJJJJJKK..',
        '...KKKKKKKKKK...',
        '....KPPPPPPK....',
        '....KPPK.KPPK...',
        '....KPPK.KPPK...',
        '....KPPK.KPPK...',
        '...KBBBK.KBBBK..',
    ],
};

/** Head and shoulders, used on the trainer card and in the navbar. */
export const trainerAvatar: PixelArt = {
    title: 'Pixel art portrait of Nikhil in a red cap',
    rows: [
        '..KKKKKKKK..',
        '.KRRRRRRRRK.',
        'KRRRRRRRRRRK',
        'KKrrrrrrrrKK',
        'KSSSSSSSSSSK',
        '.KHSSSSSSHK.',
        '.KSSKSSKSSK.',
        '.KSSSSSSSSK.',
        '.KsSSSSSSsK.',
        '..KSSSSSSK..',
        '..KBWWWWKB..',
        '..KJJJJJJK..',
    ],
};

/** A small leafy companion that drifts around the hero. */
export const leaflingSprite: PixelArt = {
    rows: [
        '.....YY.....',
        '....Y..Y....',
        '...Y....Y...',
        '..Y......Y..',
        '..Y.GGGG.Y..',
        '.Y..KLLK..Y.',
        'Y...KLLK...Y',
        'Y...KKKK...Y',
        '.Y..KGGK..Y.',
        '..Y.KKKK.Y..',
        '...Y....Y...',
        '....Y..Y....',
    ],
};

/** A small ember companion that drifts around the hero. */
export const emberlingSprite: PixelArt = {
    rows: [
        '....YY....',
        '...Y..Y...',
        '..Y....Y..',
        '..Y.OOOY..',
        '.Y.OOKOOY.',
        '.Y.OKKKOY.',
        'Y.OOKKKOOY',
        'Y.OKKKKOOY',
        '.Y.OOKOOY.',
        '..Y.OOOY..',
        '...Y..Y...',
        '....YY....',
    ],
};

/** Scenery used by the pixel environment behind the hero. */
export const treeSprite: PixelArt = {
    rows: [
        '.....KKKK.....',
        '...KKLLLLKK...',
        '..KLLLLLLLLK..',
        '.KLLLLLLLLLLK.',
        '.KLLllllllLLK.',
        'KLLLllllllLLLK',
        'KLLllllllLLLLK',
        'KLLLllllllLLLK',
        '.KLLLLLLLLLLK.',
        '..KLLLLLLLLK..',
        '...KKLLLLKK...',
        '.....KTTK.....',
        '.....KTTK.....',
        '.....KTTK.....',
        '....KTTTTK....',
        '....KTTTTK....',
    ],
};

export const bushSprite: PixelArt = {
    rows: [
        '..KKKKKKKK..',
        '.KLLLLLLLLK.',
        'KLLLllllLLLK',
        'KLLllllllLLK',
        '.KLLLLLLLLK.',
        '..KKKKKKKK..',
    ],
};

export const cloudSprite: PixelArt = {
    rows: [
        '....KKKKKKKK....',
        '..KKNNNNNNNNKK..',
        '.KNNNNNNNNNNNNK.',
        'KNNNNNNNNNNNNNNK',
        'KNNNNNNNNNNNNNNK',
        '.KKNNNNNNNNNNKK.',
        '...KKKKKKKKKK...',
    ],
};

export const flowerSprite: PixelArt = {
    rows: [
        '..FfF..',
        '.FFfFF.',
        'FFfFFFf',
        '.FFfFF.',
        '..FfF..',
        '...L...',
        '...l...',
    ],
};

/** Grass tufts scattered across the ground of the hero scene. */
export const grassSprite: PixelArt = {
    rows: [
        'L.L.L.L',
        '.L.L.L.',
        'L.L.L.L',
        'l.l.l.l',
    ],
};

/** A hard-edged oval shadow, so sprites sit on the ground instead of floating. */
export const shadowSprite: PixelArt = {
    rows: [
        '................',
        '................',
        '....KKKKKKKK....',
        '..KKKKKKKKKKKK..',
        '.KKKKKKKKKKKKKK.',
        'KKKKKKKKKKKKKKKK',
        'KKKKKKKKKKKKKKKK',
        '.KKKKKKKKKKKKKK.',
        '..KKKKKKKKKKKK..',
        '....KKKKKKKK....',
        '................',
        '................',
    ],
};
