/**
 * Download official logos for badge conversion.
 *
 * Usage: node scripts/download-logos.js
 */

import { mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { fetch } from 'undici';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const LOGOS_DIR = resolve(ROOT, 'logos');

mkdirSync(LOGOS_DIR, { recursive: true });

const LOGOS = [
    {
        name: 'microsoft',
        url: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/microsoft.svg',
        type: 'svg',
    },
    {
        name: 'ethglobal',
        url: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/ethereum.svg',
        type: 'svg',
    },
    {
        name: 'polkadot',
        url: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/polkadot.svg',
        type: 'svg',
    },
    {
        name: 'freebsd',
        url: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/freebsd.svg',
        type: 'svg',
    },
    {
        name: 'iris',
        url: 'https://avatars.githubusercontent.com/u/12345678?s=200',
        type: 'png',
        // IRIS might need a custom logo
    },
    {
        name: 'near',
        url: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/nearprotocol.svg',
        type: 'svg',
    },
    {
        name: 'ieee',
        url: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/ieee.svg',
        type: 'svg',
    },
    {
        name: 'rails',
        url: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/rubyonrails.svg',
        type: 'svg',
    },
];

async function downloadLogo(logo: { name: string; url: string; type: string }) {
    const outputPath = resolve(LOGOS_DIR, `${logo.name}.${logo.type}`);
    
    if (existsSync(outputPath)) {
        console.log(`✓ ${logo.name} already exists`);
        return;
    }
    
    try {
        console.log(`Downloading ${logo.name}...`);
        const response = await fetch(logo.url);
        
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        
        const buffer = await response.arrayBuffer();
        writeFileSync(outputPath, Buffer.from(buffer));
        console.log(`✓ ${logo.name} saved to ${outputPath}`);
    } catch (error) {
        console.error(`✗ Failed to download ${logo.name}:`, error);
    }
}

async function main() {
    console.log('Downloading logos from Simple Icons...\n');
    
    await Promise.all(LOGOS.map(downloadLogo));
    
    console.log('\nDone! Logos saved to:', LOGOS_DIR);
    console.log('\nNow convert them with:');
    console.log('  npx tsx scripts/convert-badge.ts --input ./logos/microsoft.svg --output microsoft');
    console.log('  npx tsx scripts/convert-badge.ts --input ./logos/freebsd.svg --output freebsd');
    console.log('  etc...');
}

main();