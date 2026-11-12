/**
 * Pure helpers behind the LetterGlitch canvas effect.
 *
 * These live outside the component so they can be unit tested on their own:
 * colour maths and grid maths are the two spots where a rounding mistake or
 * an off-by-one is easy to introduce and hard to spot in the browser.
 */

/** Width in CSS pixels of a single character cell. */
export const LETTER_CHAR_WIDTH = 10;

/** Height in CSS pixels of a single character cell. */
export const LETTER_CHAR_HEIGHT = 20;

/** Font size used when drawing the characters. */
export const LETTER_FONT_SIZE = 16;

export type Rgb = {
    r: number;
    g: number;
    b: number;
};

const SHORT_HEX = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const LONG_HEX = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
const RGB_FUNCTION = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i;

/**
 * Parses `#abc`, `#aabbcc` and `rgb(1, 2, 3)` into RGB channels.
 * Returns null for anything that cannot be understood.
 */
export const parseColor = (color: string): Rgb | null => {
    if (typeof color !== 'string') return null;

    const normalized = color.replace(SHORT_HEX, (_match, r, g, b) => r + r + g + g + b + b);

    const hexMatch = LONG_HEX.exec(normalized);
    if (hexMatch) {
        return {
            r: parseInt(hexMatch[1], 16),
            g: parseInt(hexMatch[2], 16),
            b: parseInt(hexMatch[3], 16),
        };
    }

    const rgbMatch = RGB_FUNCTION.exec(color);
    if (rgbMatch) {
        return {
            r: parseInt(rgbMatch[1], 10),
            g: parseInt(rgbMatch[2], 10),
            b: parseInt(rgbMatch[3], 10),
        };
    }

    return null;
};

/**
 * Blends two colours. A factor of 0 returns `start`, a factor of 1 returns
 * `end`, and anything in between is a linear mix with rounded channels.
 */
export const interpolateColor = (start: Rgb, end: Rgb, factor: number): string => {
    const channel = (from: number, to: number) => Math.round(from + (to - from) * factor);

    return `rgb(${channel(start.r, end.r)}, ${channel(start.g, end.g)}, ${channel(start.b, end.b)})`;
};

/** Number of character cells needed to cover a canvas of the given CSS size. */
export const calculateGrid = (width: number, height: number): { columns: number; rows: number } => ({
    columns: Math.ceil(width / LETTER_CHAR_WIDTH),
    rows: Math.ceil(height / LETTER_CHAR_HEIGHT),
});
