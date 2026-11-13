/**
 * Original badge emblems for the Badge Case.
 *
 * Every emblem is drawn from scratch on the same 16×16 grid, using a shared
 * octagonal frame so the set reads as one collection while each badge keeps
 * its own silhouette and colour. No official gym badge artwork is used.
 */

export type BadgePalette = Record<string, string>;

/**
 * Shared badge palette.
 *
 * `K` is the hard outline, `B` the badge face, `W` the silver inner emblem,
 * `Y` the gold accent, and the remaining letters are badge-specific colours.
 */
export const badgePalette: BadgePalette = {
    K: '#24382b',
    B: '#3f6fb5',
    b: '#2d4f80',
    W: '#fffaf0',
    w: '#d8ccab',
    Y: '#f2be3c',
    R: '#d8433b',
    r: '#a52f2a',
    G: '#33713f',
    g: '#275630',
    P: '#8a5fc4',
    p: '#63419a',
    O: '#ef6b3c',
    o: '#c04a26',
    S: '#7a4a25',
    C: '#8ccddc',
    T: '#f5efdc',
};

export type BadgeArt = {
    rows: string[];
    title?: string;
};

/**
 * MS internship — a four-pane window emblem on a blue badge.
 */
export const microsoftBadge: BadgeArt = {
    title: 'Blue badge with a four-pane window emblem',
    rows: [
        '...KKKKKKKKKK...',
        '..KBBBBBBBBBBK..',
        '.KBBBBBBBBBBBBK.',
        '.KBBBBBBBBBBBBK.',
        'KBBBBBBBBBBBBBBK',
        'KBBBBBKKKKKBBBBK',
        'KBBBBBKWKWKBBBBK',
        'KBBBBBKWKWKBBBBK',
        'KBBBBBKWKWKBBBBK',
        'KBBBBBKWKWKBBBBK',
        'KBBBBBKKKKKBBBBK',
        'KBBBBBBBBBBBBBBK',
        'KBBBBBBBBBBBBBBK',
        '.KBBBBBBBBBBBBK.',
        '..KBBBBBBBBBBK..',
        '...KKKKKKKKKK...',
    ],
};

/** ETH Global — a gold star on a red badge. */
export const ethGlobalBadge: BadgeArt = {
    title: 'Red badge with a gold star emblem',
    rows: [
        '...KKKKKKKKKK...',
        '..KRRRRRRRRRRK..',
        '.KRRRRRRRRRRRRK.',
        '.KRRRRRRRRRRRRK.',
        'KRRRRRRRRRRRRRRK',
        'KRRRRRKKKKKKRRRK',
        'KRRRKKYYYKYYKKRK',
        'KRRKKYKKKKKYYKKK',
        'KRRKYKKKKKKKYYKK',
        'KRRKYKKKKKKKYYKK',
        'KRRRKKYYYKYYKKRK',
        'KRRRRRKKKKKKRRRK',
        'KRRRRRRRRRRRRRRK',
        '.KRRRRRRRRRRRRK.',
        '..KRRRRRRRRRRK..',
        '...KKKKKKKKKK...',
    ],
};

/** Polkadot — connected nodes on a violet badge. */
export const polkadotBadge: BadgeArt = {
    title: 'Violet badge with a connected node emblem',
    rows: [
        '...KKKKKKKKKK...',
        '..KPPPPPPPPPPK..',
        '.KPPPPPPPPPPPPK.',
        '.KPPPPPPPPPPPPK.',
        'KPPPPPPPPPPPPPPK',
        'KPPPPKKKKKKPPPPK',
        'KPPPPKWWWKPPPPPK',
        'KPPPKWWWWWKPPPPK',
        'KPPPKWWWWWKPPPPK',
        'KPPPPKWWWKPPPPPK',
        'KPPPPKKKKKKPPPPK',
        'KPPPPPPPPPPPPPPK',
        'KPPPPPPPPPPPPPPK',
        '.KPPPPPPPPPPPPK.',
        '..KPPPPPPPPPPK..',
        '...KKKKKKKKKK...',
    ],
};

/** FreeBSD — a shield with a wave on a bay-blue badge. */
export const freebsdBadge: BadgeArt = {
    title: 'Blue badge with a shield and wave emblem',
    rows: [
        '...KKKKKKKKKK...',
        '..KCCCCCCCCCCK..',
        '.KCCCCCCCCCCCCK.',
        '.KCCCCCCCCCCCCK.',
        'KCCCCCCCCCCCCCCK',
        'KCCCCCKKKKKCCCCK',
        'KCCCCKWWWKCCCCCK',
        'KCCCKWWWWWKCCCCK',
        'KCCKWWWWWWWWKCCK',
        'KCCKWWWWWWWWKCCK',
        'KCCKKWWWWWWKKCCK',
        'KCCCKKKKKKKKCCCK',
        'KCCCCCCCCCCCCCCK',
        '.KCCCCCCCCCCCCK.',
        '..KCCCCCCCCCCK..',
        '...KKKKKKKKKK...',
    ],
};

/** IRIS maintainer — a gear emblem on a green badge. */
export const irisBadge: BadgeArt = {
    title: 'Green badge with a gear emblem',
    rows: [
        '...KKKKKKKKKK...',
        '..KGGGGGGGGGGK..',
        '.KGGGGGGGGGGGGK.',
        '.KGGGGGGGGGGGGK.',
        'KGGGGGGGGGGGGGGK',
        'KGGGGGKKKKKGGGGK',
        'KGGGGKWWWWWKGGGK',
        'KGGGKWWWWWWWKGGK',
        'KGGKWWWWWWWWWKGG',
        'KGGKWWWWWWWWWKGG',
        'KGGGGKWWWWWKGGGK',
        'KGGGGGKKKKKGGGGK',
        'KGGGGGGGGGGGGGGK',
        '.KGGGGGGGGGGGGK.',
        '..KGGGGGGGGGGK..',
        '...KKKKKKKKKK...',
    ],
};

/** IEEE / leadership — a lightning bolt on an orange badge. */
export const leadershipBadge: BadgeArt = {
    title: 'Orange badge with a lightning bolt emblem',
    rows: [
        '...KKKKKKKKKK...',
        '..KOOOOOOOOOOK..',
        '.KOOOOOOOOOOOOK.',
        '.KOOOOOOOOOOOOK.',
        'KOOOOOOOOOOOOOOK',
        'KOOOOOKKKKKOOOOOK',
        'KOOOOOKWWWKOOOOOK',
        'KOOOOOKWKWKOOOOOK',
        'KOOOOOKWWWKOOOOOK',
        'KOOOOOKWKOKOOOOOK',
        'KOOOOOKWOKOOOOOOK',
        'KOOOOOKKOOOOOOOOOK',
        'KOOOOOOOOOOOOOOK',
        '.KOOOOOOOOOOOOK.',
        '..KOOOOOOOOOOOK..',
        '...KKKKKKKKKK...',
    ],
};

/** NEAR TEE — a padlock on a teal badge. */
export const teeBadge: BadgeArt = {
    title: 'Teal badge with a padlock emblem',
    rows: [
        '...KKKKKKKKKK...',
        '..KCCCCCCCCCCK..',
        '.KCCCCCCCCCCCCK.',
        '.KCCCCCCCCCCCCK.',
        'KCCCCCCCCCCCCCCK',
        'KCCCCCCKKKKCCCCK',
        'KCCCCCKKKKKKCCCK',
        'KCCCCKWWWWWKCCCK',
        'KCCCKWWWWWWWKCCK',
        'KCCKWKWWWWWWKWCCK',
        'KCCKWKWWWWWWKWCCK',
        'KCCKWKWWWWWWKWCCK',
        'KCCCCKKKKKKKKCCK',
        '.KCCCCCCCCCCCCK.',
        '..KCCCCCCCCCCK..',
        '...KKKKKKKKKK...',
    ],
};

/** Rails — a faceted gem on a tan badge. */
export const railsBadge: BadgeArt = {
    title: 'Tan badge with a cut-gem emblem',
    rows: [
        '...KKKKKKKKKK...',
        '..KSSSSSSSSSSK..',
        '.KSSSSSSSSSSSSK.',
        '.KSSSSSSSSSSSSK.',
        'KSSSSSSSSSSSSSSK',
        'KSSSSSKKKKKSSSSK',
        'KSSSSKWWWWWKSSSK',
        'KSSSKWKKKKWKSSSK',
        'KSSKWKWWKWKKSSK',
        'KSSKWKWWKWKKSSK',
        'KSSSKWKKKKWKSSSK',
        'KSSSSKWWWWWKSSSK',
        'KSSSSSKKKKKSSSSK',
        'KSSSSSSSSSSSSSSK',
        '.KSSSSSSSSSSSSK.',
        '..KSSSSSSSSSSK..',
        '...KKKKKKKKKK...',
    ],
};

export const badgeSprites = {
    microsoft: microsoftBadge,
    ethglobal: ethGlobalBadge,
    polkadot: polkadotBadge,
    freebsd: freebsdBadge,
    iris: irisBadge,
    leadership: leadershipBadge,
    tee: teeBadge,
    rails: railsBadge,
};

export type BadgeSpriteKey = keyof typeof badgeSprites;
