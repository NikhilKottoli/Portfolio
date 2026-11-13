import { describe, expect, it } from 'vitest';
import {
    bushSprite,
    cloudSprite,
    emberlingSprite,
    flowerSprite,
    grassSprite,
    leaflingSprite,
    palette,
    shadowSprite,
    trainerAvatar,
    trainerSprite,
    treeSprite,
} from '../../src/app/components/pixel/sprites';
import { pixelIcons } from '../../src/app/components/pixel/PixelIcon';

const SPRITES = {
    trainerSprite,
    trainerAvatar,
    leaflingSprite,
    emberlingSprite,
    treeSprite,
    bushSprite,
    cloudSprite,
    flowerSprite,
    grassSprite,
    shadowSprite,
};

describe('pixel art', () => {
    it('draws every sprite on a rectangular grid', () => {
        for (const [name, sprite] of Object.entries(SPRITES)) {
            const width = sprite.rows[0].length;

            expect(sprite.rows.length, name).toBeGreaterThan(0);

            for (const [index, row] of sprite.rows.entries()) {
                expect(row.length, `${name} row ${index}`).toBe(width);
            }
        }
    });

    it('only uses colours that exist in the palette', () => {
        for (const [name, sprite] of Object.entries(SPRITES)) {
            for (const row of sprite.rows) {
                for (const char of row) {
                    if (char === '.') continue;
                    expect(Object.keys(palette), `${name} uses ${char}`).toContain(char);
                }
            }
        }
    });

    it('draws every icon on an eight by eight grid', () => {
        for (const [name, rows] of Object.entries(pixelIcons)) {
            expect(rows.length, name).toBe(8);

            for (const row of rows) {
                expect(row.length, name).toBe(8);
            }
        }
    });

    it('describes the trainer artwork for assistive technology', () => {
        expect(trainerSprite.title).toBeTruthy();
        expect(trainerAvatar.title).toBeTruthy();
    });
});
