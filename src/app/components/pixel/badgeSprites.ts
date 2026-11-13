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
    // Microsoft logo colors
    MR: '#f25022', // Microsoft red
    MG: '#7fba00', // Microsoft green
    MB: '#00a4ef', // Microsoft blue
    MY: '#ffb900', // Microsoft yellow
};

export type BadgeArt = {
    rows: string[];
    title?: string;
};

/** Microsoft — four-pane window logo (16×16). */
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

/** Microsoft — four-pane window logo (32×32) with authentic colors. */
export const microsoftBadge32: BadgeArt = {
    title: 'Badge with Microsoft 4-pane window logo (authentic colors)',
    rows: [
        '................................',
        '................................',
        '....KKKKKKKKKKKKKKKKKKKKKKKK....',
        '...KMRMRMRMRMRMRKKKKKMGKMGKMGKMG.',
        '..KMRMRMRMRMRMRKKKKKMGKMGKMGKMGK',
        '..KMRMRMRMRMRMRKKKKKMGKMGKMGKMGK',
        '.KMRMRMRMRMRMRKKKKKMGKMGKMGKMGKK',
        '.KMRMRMRMRMRMRKKKKKMGKMGKMGKMGKK',
        'KMRMRMRMRMRMRKKKKKMGKMGKMGKMGKKK',
        'KMRMRMRMRMRMRKKKKKMGKMGKMGKMGKKK',
        'KMRMRMRMRMRMRKKKKKMGKMGKMGKMGKKK',
        'KMRMRMRMRMRMRKKKKKMGKMGKMGKMGKKK',
        'KMRMRMRMRMRMRKKKKKMGKMGKMGKMGKKK',
        'KMRMRMRMRMRMRKKKKKMGKMGKMGKMGKKK',
        'KMRMRMRMRMRMRKKKKKMGKMGKMGKMGKKK',
        'KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK',
        '................................',
        '................................',
        'KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK',
        'KMMBMBMBMBMBKKKKKMMYMYMYMYMYKKKK',
        'KMMBMBMBMBMBKKKKKMMYMYMYMYMYKKKK',
        'KMMBMBMBMBMBKKKKKMMYMYMYMYMYKKKK',
        'KMMBMBMBMBMBKKKKKMMYMYMYMYMYKKKK',
        'KMMBMBMBMBMBKKKKKMMYMYMYMYMYKKKK',
        'KMMBMBMBMBMBKKKKKMMYMYMYMYMYKKKK',
        'KMMBMBMBMBMBKKKKKMMYMYMYMYMYKKKK',
        'KMMBMBMBMBMBKKKKKMMYMYMYMYMYKKKK',
        'KMMBMBMBMBMBKKKKKMMYMYMYMYMYKKKK',
        'KMMBMBMBMBMBKKKKKMMYMYMYMYMYKKKK',
        'KMMYMYMYMYMYKKKKKMMBMBMBMBMBKKKK',
        'KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKK',
        '................................',
        '................................',
    ],
};

/** ETH Global — diamond/logo on dark badge (auto-generated from simple-icons). */
export const ethGlobalBadge: BadgeArt = {
    title: 'Dark badge with ETH Global diamond logo',
    rows: [
        '................',
        '.......KK.......',
        '.......KKK......',
        '......KKKK......',
        '.....KKKKKK.....',
        '.....KKKKKK.....',
        '....KKKKKKKK....',
        '....KKKKKKKKK...',
        '....KKKKKKKK....',
        '.....KKKKKK.....',
        '....KK.KK.KK....',
        '.....KK..KK.....',
        '.....KKKKK......',
        '......KKKK......',
        '.......KK.......',
        '................',
    ],
};

/** Polkadot — multicolored dots on pink/purple badge (auto-generated from simple-icons). */
export const polkadotBadge: BadgeArt = {
    title: 'Purple badge with Polkadot multicolored dots',
    rows: [
        '......KKKK......',
        '.....KKKKKK.....',
        '...K..KKKK..K...',
        '.KKKK......KKKK.',
        '.KKK........KKK.',
        '.KKK........KKK.',
        '.KK..........KK.',
        '................',
        '................',
        '.KK..........KK.',
        '.KKK........KKK.',
        '.KKK........KKK.',
        '.KKKK......KKKK.',
        '...K..KKKK..K...',
        '.....KKKKKK.....',
        '......KKKK......',
    ],
};

/** FreeBSD — BSD daemon face on red badge (auto-generated from simple-icons). */
export const freebsdBadge: BadgeArt = {
    title: 'Red badge with FreeBSD daemon',
    rows: [
        '................',
        'KKK..KKKKK..KKK.',
        'KKKKKKKKKKKKKK..',
        '.KKKKKKKKKKKKK..',
        '.KKKKKKKKKKKKK..',
        '.KKKKKKKKKKKKK..',
        '.KKKKKKKKKKKKK..',
        '.KKKKKKKKKKKKKK.',
        '.KKKKKKKKKKKKKK.',
        '.KKKKKKKKKKKKK..',
        '.KKKKKKKKKKKKK..',
        '.KKKKKKKKKKKKK..',
        '..KKKKKKKKKKK...',
        '...KKKKKKKKK....',
        '....KKKKKKK.....',
        '................',
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

/** Rails — gem/logo on red badge (auto-generated from simple-icons). */
export const railsBadge: BadgeArt = {
    title: 'Red badge with Rails gem logo',
    rows: [
        '................',
        '................',
        '................',
        '................',
        '......KKKKKK....',
        '.....KKKKKKKKK..',
        '....KKKK........',
        '...KKKK.........',
        '..KKKK..........',
        'K.KKKKK.........',
        '.KKKKK..........',
        '.KKKKK..........',
        '.KKKKK..........',
        '................',
        '................',
        '................',
    ],
};

export const badgeSprites = {
    microsoft: microsoftBadge,
    microsoft32: microsoftBadge32,
    ethglobal: ethGlobalBadge,
    polkadot: polkadotBadge,
    freebsd: freebsdBadge,
    iris: irisBadge,
    tee: teeBadge,
    leadership: leadershipBadge,
    rails: railsBadge,
};

export type BadgeSpriteKey = keyof typeof badgeSprites;