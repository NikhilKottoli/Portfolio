'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getPokedexEntryByName } from '../data/pokedex';
import { entrySlug } from '../../lib/slug';

/**
 * Redirect legacy /Projects?entry=<name> links to their canonical project route.
 */
export default function LegacyEntryRedirect() {
    const router = useRouter();

    useEffect(() => {
        const name = new URLSearchParams(window.location.search).get('entry');
        if (!name) return;

        const entry = getPokedexEntryByName(name);
        if (!entry) return;

        router.replace(`/Projects/${entrySlug(entry)}`);
    }, []);

    return null;
}
