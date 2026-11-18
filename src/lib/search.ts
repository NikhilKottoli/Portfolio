/**
 * A searchable index over everything the portfolio already knows.
 *
 * The command palette needs one flat list to query, so the index is assembled
 * from the existing data modules — projects, skills, badges, journey
 * milestones and the navigation destinations. No second source of truth.
 */

import { pokedexEntries } from '../app/data/pokedex';
import { technologies, disciplines, keyItems } from '../app/data/inventory';
import { badges } from '../app/data/badges';
import { journey } from '../app/data/journey';
import { navItems } from '../app/data/trainer';
import { entrySlug } from './slug';

/** One row in the command palette: a title, a hint and where it leads. */
export type SearchItem = {
    id: string;
    title: string;
    subtitle: string;
    href: string;
    kind: 'project' | 'skill' | 'badge' | 'journey' | 'page';
};

/** How many results a single query may return. */
const MAX_RESULTS = 8;

/** How many suggestions are offered before anything has been typed. */
const POPULAR_LIMIT = 6;

/** The entries offered first when the query box is still empty. */
const POPULAR_IDS = [
    'project-iris-erp',
    'project-rupeerail',
    'project-private-rag',
    'skill-ai-engineering',
    'badge-microsoft-internship',
    'journey-microsoft',
];

/** Build every searchable row from the data modules that already exist. */
function buildIndex(): SearchItem[] {
    const projects: SearchItem[] = pokedexEntries.map((entry) => {
        const slug = entrySlug(entry);

        return {
            id: `project-${slug}`,
            title: entry.name,
            subtitle: entry.summary,
            href: `/Projects/${slug}`,
            kind: 'project',
        };
    });

    const skills: SearchItem[] = [...technologies, ...disciplines, ...keyItems].map((item) => ({
        id: `skill-${item.id}`,
        title: item.name,
        subtitle: item.summary,
        href: '/Inventory',
        kind: 'skill',
    }));

    const badgeItems: SearchItem[] = badges.map((badge) => ({
        id: `badge-${badge.id}`,
        title: badge.name,
        subtitle: `${badge.organisation} · ${badge.kind}`,
        href: '/Badges',
        kind: 'badge',
    }));

    const milestones: SearchItem[] = journey.map((milestone) => ({
        id: `journey-${milestone.id}`,
        title: milestone.title,
        subtitle: `${milestone.organisation} · ${milestone.period}`,
        href: '/Experience',
        kind: 'journey',
    }));

    const pages: SearchItem[] = navItems.map((navItem) => ({
        id: `page-${navItem.path}`,
        title: navItem.name,
        subtitle: navItem.caption,
        href: navItem.path,
        kind: 'page',
    }));

    return [...projects, ...skills, ...badgeItems, ...milestones, ...pages];
}

/** The full index, built once when the module is first loaded. */
const INDEX: SearchItem[] = buildIndex();

/** Split a value into lowercase words so word starts can be tested. */
function words(value: string): string[] {
    return value.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}

/** True when every character of the needle appears in the haystack in order. */
function isSubsequence(haystack: string, needle: string): boolean {
    let cursor = 0;

    for (const character of haystack) {
        if (character === needle[cursor]) cursor += 1;
        if (cursor === needle.length) return true;
    }

    return cursor === needle.length;
}

/** True when any word in the value starts with the needle. */
function startsAnyWord(value: string, needle: string): boolean {
    return words(value).some((word) => word.startsWith(needle));
}

/**
 * Score one entry against the query.
 *
 * An exact title beats a title prefix, which beats a word start, which beats
 * a loose subsequence match. Zero means the entry does not match at all.
 */
function scoreItem(item: SearchItem, query: string): number {
    const title = item.title.toLowerCase();
    const subtitle = item.subtitle.toLowerCase();
    const compactQuery = query.replace(/\s+/g, '');

    if (title === query) return 1000;
    if (title.startsWith(query)) return 900;
    if (startsAnyWord(title, query)) return 700;
    if (subtitle.startsWith(query)) return 500;
    if (startsAnyWord(subtitle, query)) return 400;
    if (isSubsequence(title, query)) return 300;
    if (isSubsequence(subtitle, query)) return 200;
    if (compactQuery && isSubsequence(title.replace(/\s+/g, ''), compactQuery)) return 150;
    if (compactQuery && isSubsequence(subtitle.replace(/\s+/g, ''), compactQuery)) return 100;

    return 0;
}

/** The suggestions shown before the user has typed anything. */
function popularItems(): SearchItem[] {
    const byId = new Map(INDEX.map((item) => [item.id, item]));
    const picked: SearchItem[] = [];

    for (const id of POPULAR_IDS) {
        const item = byId.get(id);
        if (item) picked.push(item);
        if (picked.length === POPULAR_LIMIT) return picked;
    }

    for (const item of INDEX) {
        if (picked.length === POPULAR_LIMIT) break;
        if (!picked.includes(item)) picked.push(item);
    }

    return picked;
}

/**
 * Search the whole index for a query.
 *
 * Matching is case-insensitive and forgiving: "rupee rail" still finds
 * "RupeeRail" because the spaces are ignored. The eight best matches are
 * returned, best first.
 */
export function searchItems(query: string): SearchItem[] {
    const normalised = query.trim().toLowerCase();

    if (!normalised) return popularItems();

    const ranked = INDEX.map((item) => ({ item, score: scoreItem(item, normalised) }))
        .filter((entry) => entry.score > 0)
        .sort(
            (left, right) =>
                right.score - left.score ||
                left.item.title.length - right.item.title.length ||
                left.item.id.localeCompare(right.item.id),
        );

    return ranked.slice(0, MAX_RESULTS).map((entry) => entry.item);
}
