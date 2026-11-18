import { afterEach, describe, expect, it, vi } from 'vitest';
import { serializeJsonLd } from '../../src/lib/json-ld';
import { personJsonLd, projectJsonLd, websiteJsonLd } from '../../src/lib/structured-data';
import { entrySlug } from '../../src/lib/slug';
import { pokedexEntries } from '../../src/app/data/pokedex';

afterEach(() => {
    vi.unstubAllEnvs();
});

describe('serializeJsonLd', () => {
    it('escapes the characters that could break out of a script tag', () => {
        const serialized = serializeJsonLd({ x: '</script><img onerror=1>&' });

        expect(serialized).not.toContain('<');
        expect(serialized).not.toContain('>');
        expect(serialized).not.toContain('&');
        expect(serialized).toContain('\\u003c');
        expect(serialized).toContain('\\u003e');
        expect(serialized).toContain('\\u0026');
    });

    it('keeps the JSON structure readable', () => {
        const serialized = serializeJsonLd({ '@type': 'Person', name: 'Nikhil Kottoli' });

        expect(JSON.parse(serialized)).toEqual({ '@type': 'Person', name: 'Nikhil Kottoli' });
    });
});

describe('personJsonLd', () => {
    it('describes the site owner', () => {
        const person = personJsonLd();

        expect(person['@context']).toBe('https://schema.org');
        expect(person['@type']).toBe('Person');
        expect(person.name).toBe('Nikhil Kottoli');
        expect(person.jobTitle).toBe('Computer Science Student');
        expect(person.affiliation.name).toBe('NITK Surathkal');
        expect(person.sameAs).toContain('https://github.com/NikhilKottoli');
        expect(person.sameAs).toContain('https://www.linkedin.com/in/nikhil-kottoli-92552128a/');
    });

    it('points at the configured site url', () => {
        vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://example.com');

        expect(personJsonLd().url).toBe('https://example.com');
    });
});

describe('websiteJsonLd', () => {
    it('describes the site', () => {
        const website = websiteJsonLd();

        expect(website['@context']).toBe('https://schema.org');
        expect(website['@type']).toBe('WebSite');
        expect(website.name).toBe('Nikhil Kottoli — Portfolio');
        expect(website.description).toBe('Software developer. NITK Surathkal.');
    });

    it('points at the configured site url', () => {
        vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://example.com');

        expect(websiteJsonLd().url).toBe('https://example.com');
    });
});

describe('projectJsonLd', () => {
    it('maps a pokedex entry to a software source code entry', () => {
        vi.stubEnv('NEXT_PUBLIC_SITE_URL', 'https://example.com');

        const entry = pokedexEntries[0];
        const project = projectJsonLd(entry);

        expect(project['@context']).toBe('https://schema.org');
        expect(project['@type']).toBe('SoftwareSourceCode');
        expect(project.name).toBe(entry.name);
        expect(project.description).toBe(entry.summary);
        expect(project.programmingLanguage).toEqual(entry.tech);
        expect(project.codeRepository).toBe(entry.repoUrl);
        expect(project.url).toBe(`https://example.com/Projects/${entrySlug(entry)}`);
    });
});
