/** Convert a display name into a URL-safe slug. */
export function slugify(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');
}

/** Return an entry's explicit slug, falling back to its name. */
export function entrySlug(entry: { name: string; slug?: string }): string {
    return entry.slug ?? slugify(entry.name);
}

/** Find an entry whose resolved slug matches the requested slug. */
export function getEntryBySlug<T extends { name: string; slug?: string }>(
    entries: readonly T[],
    slug: string,
): T | undefined {
    return entries.find((entry) => entrySlug(entry) === slug);
}
