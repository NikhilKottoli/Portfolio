import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const ROOT = process.cwd();
const COMPONENT_DIR = join(ROOT, 'src', 'app', 'components');
const DATA_DIR = join(ROOT, 'src', 'app', 'data');

/**
 * XML namespaces are identifiers, not resources that get fetched, so they are
 * allowed to stay on http even though every real link has to be https.
 */
const XML_NAMESPACES = ['http://www.w3.org/'];

type SourceFile = {
    file: string;
    source: string;
};

const readSources = (dir: string, extensions: string[]): SourceFile[] =>
    readdirSync(dir)
        .filter((file) => extensions.some((extension) => file.endsWith(extension)))
        .sort()
        .map((file) => ({ file: join(dir, file), source: readFileSync(join(dir, file), 'utf8') }));

/** Components and data files both hold links that have to stay honest. */
const readComponentSources = (): SourceFile[] => [
    ...readSources(COMPONENT_DIR, ['.tsx']),
    ...readSources(DATA_DIR, ['.ts', '.tsx']),
];

describe('link hygiene', () => {
    it('finds the remote links to validate', () => {
        const links = readComponentSources().flatMap(({ source }) =>
            Array.from(source.matchAll(/https?:\/\/[^'"\s)]+/g)),
        );

        expect(links.length).toBeGreaterThan(0);
    });

    it('never uses an insecure http:// link', () => {
        const insecure = readComponentSources().flatMap(({ file, source }) =>
            Array.from(source.matchAll(/['"](https?:\/\/[^'"]+)['"]/g))
                .filter((match) => match[1].startsWith('http://'))
                .filter((match) => !XML_NAMESPACES.some((namespace) => match[1].startsWith(namespace)))
                .map((match) => `${file} -> ${match[1]}`),
        );

        expect(insecure).toEqual([]);
    });

    it('gives every mailto link a valid address', () => {
        const malformed = readComponentSources().flatMap(({ file, source }) =>
            Array.from(source.matchAll(/mailto:([^'"\s)]+)/g))
                .filter((match) => !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(match[1]))
                .map((match) => `${file} -> ${match[1]}`),
        );

        expect(malformed).toEqual([]);
    });

    it('keeps the same email address everywhere', () => {
        const addresses = new Set(
            readComponentSources().flatMap(({ source }) =>
                Array.from(source.matchAll(/mailto:([^'"\s)]+)/g)).map((match) => match[1]),
            ),
        );

        expect(addresses.size).toBe(1);
        expect(Array.from(addresses)[0]).toBe('nikhilkottoli2005@gmail.com');
    });
});
