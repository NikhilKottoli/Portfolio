/**
 * Convert logo images to 16×16 badge sprite format using sharp for SVG→PNG.
 *
 * Usage:
 *   npx tsx scripts/convert-badge.ts --input ./logos/microsoft.svg --output microsoft
 */

import { mkdirSync, existsSync, writeFileSync } from 'node:fs';
import { resolve, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createCanvas, loadImage } from 'canvas';
import sharp from 'sharp';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');

// Badge palette - must match badgeSprites.ts
// Configurable badge size - 32x32 for more detail
const BADGE_SIZE = 32;

const BADGE_PALETTE: Record<string, string> = {
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

// Find closest palette color using Euclidean distance in RGB space
function closestPaletteColor(r: number, g: number, b: number): string {
    let bestKey = 'K';
    let bestDist = Infinity;

    for (const [key, hex] of Object.entries(BADGE_PALETTE)) {
        const pr = parseInt(hex.slice(1, 3), 16);
        const pg = parseInt(hex.slice(3, 5), 16);
        const pb = parseInt(hex.slice(5, 7), 16);
        const dist = (r - pr) ** 2 + (g - pg) ** 2 + (b - pb) ** 2;
        if (dist < bestDist) {
            bestDist = dist;
            bestKey = key;
        }
    }
    return bestKey;
}

// Simple Floyd-Steinberg dithering for better color quantization
function applyDithering(
    imageData: Uint8ClampedArray,
    width: number,
    height: number
): Uint8ClampedArray {
    const data = new Uint8ClampedArray(imageData);
    
    for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            
            const key = closestPaletteColor(r, g, b);
            const hex = BADGE_PALETTE[key];
            const pr = parseInt(hex.slice(1, 3), 16);
            const pg = parseInt(hex.slice(3, 5), 16);
            const pb = parseInt(hex.slice(5, 7), 16);
            
            const errR = r - pr;
            const errG = g - pg;
            const errB = b - pb;
            
            data[idx] = pr;
            data[idx + 1] = pg;
            data[idx + 2] = pb;
            
            // Distribute error to neighbors
            if (x + 1 < width) {
                const nIdx = (y * width + x + 1) * 4;
                data[nIdx] = Math.max(0, Math.min(255, data[nIdx] + errR * 7 / 16));
                data[nIdx + 1] = Math.max(0, Math.min(255, data[nIdx + 1] + errG * 7 / 16));
                data[nIdx + 2] = Math.max(0, Math.min(255, data[nIdx + 2] + errB * 7 / 16));
            }
            if (x > 0 && y + 1 < height) {
                const nIdx = ((y + 1) * width + x - 1) * 4;
                data[nIdx] = Math.max(0, Math.min(255, data[nIdx] + errR * 3 / 16));
                data[nIdx + 1] = Math.max(0, Math.min(255, data[nIdx + 1] + errG * 3 / 16));
                data[nIdx + 2] = Math.max(0, Math.min(255, data[nIdx + 2] + errB * 3 / 16));
            }
            if (y + 1 < height) {
                const nIdx = ((y + 1) * width + x) * 4;
                data[nIdx] = Math.max(0, Math.min(255, data[nIdx] + errR * 5 / 16));
                data[nIdx + 1] = Math.max(0, Math.min(255, data[nIdx + 1] + errG * 5 / 16));
                data[nIdx + 2] = Math.max(0, Math.min(255, data[nIdx + 2] + errB * 5 / 16));
            }
            if (x + 1 < width && y + 1 < height) {
                const nIdx = ((y + 1) * width + x + 1) * 4;
                data[nIdx] = Math.max(0, Math.min(255, data[nIdx] + errR * 1 / 16));
                data[nIdx + 1] = Math.max(0, Math.min(255, data[nIdx + 1] + errG * 1 / 16));
                data[nIdx + 2] = Math.max(0, Math.min(255, data[nIdx + 2] + errB * 1 / 16));
            }
        }
    }
    
    return data;
}

async function convertLogo(inputPath: string, outputName: string) {
    const fullInput = resolve(ROOT, inputPath);
    if (!existsSync(fullInput)) {
        console.error(`Input file not found: ${fullInput}`);
        process.exit(1);
    }

    const ext = extname(fullInput).toLowerCase();
    let pngBuffer: Buffer;

    if (ext === '.svg') {
        // Convert SVG to BADGE_SIZE x BADGE_SIZE PNG using sharp
        pngBuffer = await sharp(fullInput)
            .resize(BADGE_SIZE, BADGE_SIZE, { 
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 },
                kernel: sharp.kernel.lanczos3
            })
            .png()
            .toBuffer();
    } else {
        // For PNG/other, read and resize
        pngBuffer = await sharp(fullInput)
            .resize(BADGE_SIZE, BADGE_SIZE, { 
                fit: 'contain',
                background: { r: 0, g: 0, b: 0, alpha: 0 },
                kernel: sharp.kernel.lanczos3
            })
            .png()
            .toBuffer();
    }

    // Load the PNG into canvas
    const canvas = createCanvas(BADGE_SIZE, BADGE_SIZE);
    const ctx = canvas.getContext('2d');
    const img = await loadImage(pngBuffer);
    ctx.drawImage(img, 0, 0, BADGE_SIZE, BADGE_SIZE);

    // Get pixel data
    const imageData = ctx.getImageData(0, 0, BADGE_SIZE, BADGE_SIZE);
    
    // Apply dithering for better color quantization
    const dithered = applyDithering(imageData.data, BADGE_SIZE, BADGE_SIZE);
    
    // Convert to palette keys
    const rows: string[] = [];
    for (let y = 0; y < BADGE_SIZE; y++) {
        let row = '';
        for (let x = 0; x < BADGE_SIZE; x++) {
            const idx = (y * BADGE_SIZE + x) * 4;
            const r = dithered[idx];
            const g = dithered[idx + 1];
            const b = dithered[idx + 2];
            const a = dithered[idx + 3];
            
            if (a < 128) {
                row += '.'; // transparent
            } else {
                row += closestPaletteColor(r, g, b);
            }
        }
        rows.push(row);
    }
    
    // Generate output
    const output = `/** ${outputName} — auto-generated from ${inputPath}. */
export const ${outputName}Badge: BadgeArt = {
    title: '${outputName} logo on badge',
    rows: [
${rows.map(r => `        '${r}',`).join('\n')}
    ],
};`;
    
    console.log(output);
    console.log('\n--- Add to badgeSprites.ts ---');
    console.log(`    ${outputName}: ${outputName}Badge,`);
    
    return { name: outputName, rows };
}

async function main() {
    const args = process.argv.slice(2);
    const inputIdx = args.indexOf('--input');
    const outputIdx = args.indexOf('--output');

    if (inputIdx === -1 || outputIdx === -1) {
        console.log('Usage: npx tsx scripts/convert-badge.ts --input <path> --output <name>');
        console.log('Example: npx tsx scripts/convert-badge.ts --input ./logos/microsoft.svg --output microsoft');
        process.exit(1);
    }

    const input = args[inputIdx + 1];
    const output = args[outputIdx + 1];

    await convertLogo(input, output);
}

main();