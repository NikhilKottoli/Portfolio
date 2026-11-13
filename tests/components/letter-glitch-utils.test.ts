import { describe, expect, it } from 'vitest';
import {
    LETTER_CHAR_HEIGHT,
    LETTER_CHAR_WIDTH,
    LETTER_FONT_SIZE,
    calculateGrid,
    interpolateColor,
    parseColor,
} from '../../src/app/components/letter-glitch-utils';

describe('parseColor', () => {
    it('parses a six digit hex colour', () => {
        expect(parseColor('#61dca3')).toEqual({ r: 0x61, g: 0xdc, b: 0xa3 });
    });

    it('parses a hex colour without the leading hash', () => {
        expect(parseColor('61dca3')).toEqual({ r: 0x61, g: 0xdc, b: 0xa3 });
    });

    it('expands three digit shorthand hex', () => {
        expect(parseColor('#abc')).toEqual({ r: 0xaa, g: 0xbb, b: 0xcc });
    });

    it('treats shorthand and full hex as the same colour', () => {
        expect(parseColor('#abc')).toEqual(parseColor('#aabbcc'));
    });

    it('ignores the case of the hex digits', () => {
        expect(parseColor('#ABCDEF')).toEqual({ r: 0xab, g: 0xcd, b: 0xef });
    });

    it('parses an rgb() string with spaces', () => {
        expect(parseColor('rgb(12, 34, 56)')).toEqual({ r: 12, g: 34, b: 56 });
    });

    it('parses an rgb() string without spaces', () => {
        expect(parseColor('rgb(12,34,56)')).toEqual({ r: 12, g: 34, b: 56 });
    });

    it('returns null for a colour it cannot understand', () => {
        expect(parseColor('not-a-color')).toBeNull();
        expect(parseColor('#12345')).toBeNull();
        expect(parseColor('#1234567')).toBeNull();
        expect(parseColor('')).toBeNull();
    });
});

describe('interpolateColor', () => {
    const black = { r: 0, g: 0, b: 0 };
    const white = { r: 255, g: 255, b: 255 };

    it('returns the start colour at a factor of zero', () => {
        expect(interpolateColor(black, white, 0)).toBe('rgb(0, 0, 0)');
    });

    it('returns the end colour at a factor of one', () => {
        expect(interpolateColor(black, white, 1)).toBe('rgb(255, 255, 255)');
    });

    it('blends every channel independently', () => {
        expect(interpolateColor({ r: 0, g: 0, b: 0 }, { r: 100, g: 200, b: 50 }, 0.5)).toBe('rgb(50, 100, 25)');
    });

    it('rounds fractional channels', () => {
        expect(interpolateColor(black, { r: 10, g: 10, b: 10 }, 0.05)).toBe('rgb(1, 1, 1)');
    });

    it('handles a blend that shrinks the channels', () => {
        expect(interpolateColor(white, black, 0.5)).toBe('rgb(128, 128, 128)');
    });
});

describe('calculateGrid', () => {
    it('covers the canvas exactly when it divides evenly', () => {
        expect(calculateGrid(400, 200)).toEqual({ columns: 40, rows: 10 });
    });

    it('rounds up so a partial cell is still covered', () => {
        expect(calculateGrid(405, 205)).toEqual({ columns: 41, rows: 11 });
    });

    it('returns an empty grid for an empty canvas', () => {
        expect(calculateGrid(0, 0)).toEqual({ columns: 0, rows: 0 });
    });

    it('uses the shared cell size constants', () => {
        expect(calculateGrid(LETTER_CHAR_WIDTH * 3, LETTER_CHAR_HEIGHT * 2)).toEqual({ columns: 3, rows: 2 });
    });

    it('keeps the character cell wider than it is tall', () => {
        expect(LETTER_CHAR_WIDTH).toBeLessThan(LETTER_CHAR_HEIGHT);
    });

    it('uses a readable font size', () => {
        expect(LETTER_FONT_SIZE).toBeGreaterThanOrEqual(12);
    });
});
