import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = process.cwd();
const COMPONENT_DIR = join(ROOT, 'src', 'app', 'components');
const DATA_DIR = join(ROOT, 'src', 'app', 'data');
const PUBLIC_DIR = join(ROOT, 'public');

const IMAGE_EXTENSIONS = /\.(png|jpe?g|webp|gif|svg|avif|ico)$/i;

type SourceFile = {
    file: string;
    source: string;
};

const readSources = (dir: string, extensions: string[]): SourceFile[] =>
    readdirSync(dir)
        .filter((file) => extensions.some((extension) => file.endsWith(extension)))
        .sort()
        .map((file) => ({ file: join(dir, file), source: readFileSync(join(dir, file), 'utf8') }));

/** Components and data files both hold content that has to stay honest. */
const readComponentSources = (): SourceFile[] => [
    ...readSources(COMPONENT_DIR, ['.tsx']),
    ...readSources(DATA_DIR, ['.ts', '.tsx']),
];

/** Every local asset path referenced from a component, e.g. `/projects/RupeeRail.png`. */
const collectLocalAssets = (): { file: string; asset: string }[] =>
    readComponentSources().flatMap(({ file, source }) =>
        Array.from(source.matchAll(/(?:image|logo):\s*'(\/[^']+)'/g)).map((match) => ({
            file,
            asset: match[1],
        })),
    );

describe('asset integrity', () => {
    it('finds the local assets to validate', () => {
        expect(collectLocalAssets().length).toBeGreaterThan(0);
    });

    it('points every local image at a file that exists', () => {
        const missing = collectLocalAssets()
            .filter(({ asset }) => !existsSync(join(PUBLIC_DIR, asset)))
            .map(({ file, asset }) => `${file} -> ${asset}`);

        expect(missing).toEqual([]);
    });

    it('references assets with a known image extension', () => {
        const unexpected = collectLocalAssets()
            .filter(({ asset }) => !IMAGE_EXTENSIONS.test(asset))
            .map(({ file, asset }) => `${file} -> ${asset}`);

        expect(unexpected).toEqual([]);
    });

    it('never spells the same asset in two different ways', () => {
        const spellings = new Map<string, Set<string>>();

        for (const { asset } of collectLocalAssets()) {
            const key = asset.toLowerCase();
            const group = spellings.get(key) ?? new Set<string>();
            group.add(asset);
            spellings.set(key, group);
        }

        const inconsistent = Array.from(spellings.entries())
            .filter(([, group]) => group.size > 1)
            .map(([key, group]) => `${key}: ${Array.from(group).join(', ')}`);

        expect(inconsistent).toEqual([]);
    });
});
