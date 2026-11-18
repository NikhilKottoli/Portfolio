import type { MetadataRoute } from 'next';
import { getSiteUrl } from '../lib/site';
import { entrySlug } from '../lib/slug';
import { pokedexEntries } from './data/pokedex';

const siteUrl = getSiteUrl();

/**
 * Every indexable route, relative to the site root.
 *
 * The home page is listed first and project deep links are derived from the
 * Pokédex so the sitemap never drifts from the routes that are generated.
 */
const sitemapPaths = [
    '/',
    '/Projects',
    '/Inventory',
    '/Badges',
    '/Experience',
    '/Contact',
    '/resume',
    ...pokedexEntries.map((entry) => `/Projects/${entrySlug(entry)}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
    return Array.from(new Set(sitemapPaths)).map((path) => ({
        url: path === '/' ? siteUrl : `${siteUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: path === '/' ? 1 : 0.8,
    }));
}
