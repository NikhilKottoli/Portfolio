import type { PokedexEntry } from '../app/data/pokedex';
import { entrySlug } from './slug';
import { absUrl, getSiteUrl } from './site';

const GITHUB_PROFILE_URL = 'https://github.com/NikhilKottoli';
const LINKEDIN_PROFILE_URL = 'https://www.linkedin.com/in/nikhil-kottoli-92552128a/';

/** Schema.org description of the site owner, used for the person rich result. */
export function personJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Nikhil Kottoli',
        url: getSiteUrl(),
        email: 'nikhilkottoli2005@gmail.com',
        jobTitle: 'Computer Science Student',
        affiliation: {
            '@type': 'CollegeOrUniversity',
            name: 'NITK Surathkal',
        },
        sameAs: [GITHUB_PROFILE_URL, LINKEDIN_PROFILE_URL],
    };
}

/** Schema.org description of the site itself, used for the website rich result. */
export function websiteJsonLd() {
    return {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Nikhil Kottoli — Portfolio',
        url: getSiteUrl(),
        description: 'Software developer. NITK Surathkal.',
    };
}

/** Schema.org description of a single project, used on its detail page. */
export function projectJsonLd(entry: PokedexEntry) {
    return {
        '@context': 'https://schema.org',
        '@type': 'SoftwareSourceCode',
        name: entry.name,
        description: entry.summary,
        codeRepository: entry.repoUrl || undefined,
        programmingLanguage: entry.tech,
        url: absUrl(`/Projects/${entrySlug(entry)}`),
    };
}
