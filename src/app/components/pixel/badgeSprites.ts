/**
 * Badge emblems — pixel art logos for each organization/award.
 *
 * Each emblem is drawn on a 16×16 grid using a shared octagonal frame.
 * Colours are kept to the badge palette for consistency.
 */

export type BadgePalette = Record<string, string>;

/**
 * Shared badge palette.
 *
 * `K` is the hard outline, `B` the badge face (blue), `W` white/silver,
 * `Y` gold, `R` red, `G` green, `P` purple, `O` orange, `C` cyan,
 * `M` magenta, `N` navy, `L` light blue, `D` dark gray.
 */
export const badgePalette: BadgePalette = {
    K: '#24382b', // bark - outline
    B: '#0078d4', // Microsoft blue
    W: '#ffffff', // white
    Y: '#f2be3c', // gold
    R: '#d8433b', // berry/red
    G: '#33713f', // leaf/green
    P: '#8a5fc4', // purple
    O: '#ef6b3c', // orange
    C: '#00bcf2', // cyan
    M: '#e3008c', // magenta
    N: '#002050', // navy
    L: '#00b8d4', // light blue
    D: '#333333', // dark gray
    S: '#cc0000', // Rails red
    T: '#7c3aed', // violet
    V: '#00d4aa', // teal
    F: '#f05032', // FreeBSD red
    I: '#6b21a8', // IRIS purple
};

export type BadgeArt = {
    rows: string[];
    title?: string;
};

/** Microsoft — four-pane window logo on blue badge. */
export const microsoftBadge: BadgeArt = {
    title: 'Blue badge with Microsoft four-pane window logo',
    rows: [
        '....KKKKKKKK....',
        '...KBBBBBBBBBBK.',
        '..KBBBBBBBBBBBBK',
        '..KBBBBBBBBBBBBK',
        '.KBBBBBBBBBBBBBBK',
        'KBBBBKKKKKKBBBBBK',
        'KBBBBKWWWWWWBBBBK',
        'KBBBBKWWWWWWBBBBK',
        'KBBBBKWWWWWWBBBBK',
        'KBBBBKWWWWWWBBBBK',
        'KBBBBKWWWWWWBBBBK',
        'KBBBBKWWWWWWBBBBK',
        'KBBBBKWWWWWWBBBBK',
        'KBBBBKKKKKKBBBBBK',
        '.KBBBBBBBBBBBBK.',
        '..KBBBBBBBBBBK..',
    ],
};

/** ETH Global — diamond/logo on dark badge. */
export const ethGlobalBadge: BadgeArt = {
    title: 'Dark badge with ETH Global diamond logo',
    rows: [
        '....KKKKKKKK....',
        '...KDDDDDDDDDDK.',
        '..KDDDDDDDDDDDDK',
        '..KDDDDDDDDDDDDK',
        '.KDDDDDKKKKKDDDK',
        'KDDDDDKWWWWWWDDDK',
        'KDDDDKWWWWWWWWDDK',
        'KDDDKWWWWWWWWWDDK',
        'KDDDKWWWWWWWWWDDK',
        'KDDDDKWWWWWWWWDDK',
        'KDDDDDKWWWWWWDDDK',
        'KDDDDDDKKKKKDDDDK',
        'KDDDDDDDDDDDDDDDK',
        '.KDDDDDDDDDDDDDK.',
        '..KDDDDDDDDDDDK..',
        '....KKKKKKKK....',
    ],
};

/** Polkadot — multicolored dots on pink/purple badge. */
export const polkadotBadge: BadgeArt = {
    title: 'Purple badge with Polkadot multicolored dots',
    rows: [
        '....KKKKKKKK....',
        '...KPPPPPPPPPPK.',
        '..KPPPPPPPPPPPPK',
        '..KPPPPPPPPPPPPK',
        '.KPPPPPKKKKKPPPPK',
        'KPPPPKWWWWKWWWPPK',
        'KPPPKWWWWWWWWWPPK',
        'KPPPKWWWWWWWWWPPK',
        'KPPPKWWWWWWWWWPPK',
        'KPPPKWWWWWWWWWPPK',
        'KPPPPKWWWWKWWWPPK',
        'KPPPPPKKKKKPPPPPK',
        'KPPPPPPPPPPPPPPPK',
        '.KPPPPPPPPPPPPPK.',
        '..KPPPPPPPPPPPK..',
        '....KKKKKKKK....',
    ],
};

/** FreeBSD — BSD daemon face on red badge. */
export const freebsdBadge: BadgeArt = {
    title: 'Red badge with FreeBSD daemon',
    rows: [
        '....KKKKKKKK....',
        '...KFFFFFFFFFFFK.',
        '..KFFFFFFFFFFFFFK',
        '..KFFFFFFFFFFFFFK',
        '.KFFFFFKKKKKFFFFFK',
        'KFFFFFKWWWWKFFFFFK',
        'KFFFFKWWWWWWWWFFFK',
        'KFFFFKWWWWWWWWFFFK',
        'KFFFFKWWWWWWWWFFFK',
        'KFFFFKWWWWKWWWFFFK',
        'KFFFFFKWWWWKFFFFFK',
        'KFFFFFKKKKKFFFFFK',
        'KFFFFFFFFFFFFFFFFK',
        '.KFFFFFFFFFFFFFK.',
        '..KFFFFFFFFFFFK..',
        '....KKKKKKKK....',
    ],
};

/** IRIS — eye/iris flower on purple badge. */
export const irisBadge: BadgeArt = {
    title: 'Purple badge with IRIS eye logo',
    rows: [
        '....KKKKKKKK....',
        '...KIIIIIIIIIIK.',
        '..KIIIIIIIIIIIIK',
        '..KIIIIIIIIIIIIK',
        '.KIIIIIIKKKKIIIIK',
        'KIIIIKWWWWKWWWIIK',
        'KIIIIKWWWWWWWWIIK',
        'KIIIKWWWWWWWWWKIK',
        'KIIIKWWWWWWWWWKIK',
        'KIIIIKWWWWKWWWIIK',
        'KIIIIKWWWWWWWWIIK',
        'KIIIIKKKKKKKIIIIK',
        'KIIIIIIIIIIIIIIIIK',
        '.KIIIIIIIIIIIIK.',
        '..KIIIIIIIIIIK..',
        '....KKKKKKKK....',
    ],
};

/** NEAR — NEAR logo on teal badge. */
export const teeBadge: BadgeArt = {
    title: 'Teal badge with NEAR logo',
    rows: [
        '....KKKKKKKK....',
        '...KVVVVVVVVVVK.',
        '..KVVVVVVVVVVVVK',
        '..KVVVVVVVVVVVVK',
        '.KVVVVVKKKKKVVVVK',
        'KVVVVKWWWWKWWVVVK',
        'KVVVKWWWWWWWWWVVK',
        'KVVKWWWWWWWWWWVVK',
        'KVVKWWWWWWWWWWVVK',
        'KVVVKWWWWWWWWWVVK',
        'KVVVVKWWWWKWWVVVK',
        'KVVVVVKKKKKVVVVVK',
        'KVVVVVVVVVVVVVVVK',
        '.KVVVVVVVVVVVVK.',
        '..KVVVVVVVVVVK..',
        '....KKKKKKKK....',
    ],
};

/** IEEE — kite/diamond with arrow on blue badge. */
export const leadershipBadge: BadgeArt = {
    title: 'Blue badge with IEEE kite logo',
    rows: [
        '....KKKKKKKK....',
        '...KBBBBBBBBBBBK.',
        '..KBBBBBBBBBBBBK',
        '..KBBBBBBBBBBBBK',
        '.KBBBBBKKKKKBBBBK',
        'KBBBBKWWWWWWBBBBK',
        'KBBBKWWWWWWWWBBBK',
        'KBBKWWWWWWWWWWBBK',
        'KBBKWWWWWWWWWWBBK',
        'KBBBKWWWWWWWWBBBK',
        'KBBBBKWWWWWWBBBBK',
        'KBBBBBKKKKKBBBBK',
        'KBBBBBBBBBBBBBBBK',
        '.KBBBBBBBBBBBBK.',
        '..KBBBBBBBBBBK..',
        '....KKKKKKKK....',
    ],
};

/** Rails — gem/logo on red badge. */
export const railsBadge: BadgeArt = {
    title: 'Red badge with Rails gem logo',
    rows: [
        '....KKKKKKKK....',
        '...KSSSSSSSSSSK.',
        '..KSSSSSSSSSSSSK',
        '..KSSSSSSSSSSSSK',
        '.KSSSSSKKKKKSSSSK',
        'KSSSSKWWWWWWSSSSK',
        'KSSSKWWWWWWWWSSSK',
        'KSSKWWWWWWWWWWSSK',
        'KSSKWWWWWWWWWWSSK',
        'KSSSKWWWWWWWWSSSK',
        'KSSSSKWWWWWWSSSSK',
        'KSSSSSKKKKKSSSSSK',
        'KSSSSSSSSSSSSSSSK',
        '.KSSSSSSSSSSSSK.',
        '..KSSSSSSSSSSK..',
        '....KKKKKKKK....',
    ],
};

export const badgeSprites = {
    microsoft: microsoftBadge,
    ethglobal: ethGlobalBadge,
    polkadot: polkadotBadge,
    freebsd: freebsdBadge,
    iris: irisBadge,
    tee: teeBadge,
    leadership: leadershipBadge,
    rails: railsBadge,
};

export type BadgeSpriteKey = keyof typeof badgeSprites;