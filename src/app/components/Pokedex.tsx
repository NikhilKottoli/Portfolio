'use client';

import Link from 'next/link';
import PixelIcon, { type PixelIconName } from './pixel/PixelIcon';
import PixelBadge from './pixel/PixelBadge';
import PixelDivider from './pixel/PixelDivider';
import Reveal from './pixel/Reveal';
import SectionHeading from './SectionHeading';
import { pokedexEntries, type PokedexEntry } from '../data/pokedex';
import { entrySlug } from '../../lib/slug';

const CATEGORY_ICONS: Record<string, PixelIconName> = {
    'Blockchain': 'coin',
    'AI': 'chip',
    'Infrastructure': 'cloud',
    'Social Impact': 'heart',
    'Developer Tools': 'gear',
    'EdTech': 'key',
    'Social': 'flag',
    'Event Tech': 'bolt',
    'Hardware': 'chip',
};

/**
 * Individual project entry in the Pokédex list.
 */
const PokedexListItem = ({ entry }: { entry: PokedexEntry }) => {
    const categoryIcon = CATEGORY_ICONS[entry.category.split(' \u00B7 ')[0]] ?? 'coin';

    return (
        <Link
            href={`/Projects/${entrySlug(entry)}`}
            className="pk-panel-raised w-full flex items-center gap-3 p-3 text-left transition-all border-transparent bg-cream text-ink hover:border-bark hover:bg-sand"
        >
            <span className="flex shrink-0 items-center justify-center w-10 h-10 border-2 border-bark bg-sand">
                <PixelIcon name={entry.icon} className="h-5 w-5" />
            </span>

            <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-pixel-ui text-[0.55rem] uppercase tracking-[0.16em] shrink-0">
                        No. {String(entry.number).padStart(3, '0')}
                    </span>
                    <h4 className="font-pixel-ui text-[0.75rem] uppercase tracking-[0.08em] line-clamp-2">
                        {entry.name}
                    </h4>
                    {entry.award && (
                        <PixelBadge icon="star" tone="berry" className="shrink-0">
                            Finalist
                        </PixelBadge>
                    )}
                </div>
                <p className="mt-1 font-body text-[0.82rem] leading-snug line-clamp-2 opacity-80">
                    {entry.summary}
                </p>
                <div className="mt-2 flex items-center gap-1.5 flex-wrap">
                    <PixelIcon name={categoryIcon} className="h-3 w-3 opacity-60" />
                    <span className="font-mono text-[0.7rem] leading-none opacity-70">
                        {entry.category}
                    </span>
                </div>
            </div>

            <PixelIcon name="arrowRight" className="h-4 w-4 ml-2 shrink-0 text-berry" />
        </Link>
    );
};

/**
 * Empty state shown when the Pokédex has no registered entries.
 */
const PokedexEmpty = () => (
    <div className="pk-panel flex flex-col items-center justify-center p-8 text-center">
        <PixelIcon name="folder" className="h-16 w-16 text-bark/30" />
        <h3 className="mt-4 font-pixel-ui text-[1rem] uppercase tracking-[0.1em] text-stone">
            No Entries Found
        </h3>
        <p className="mt-2 font-body text-[0.95rem] leading-relaxed text-stone max-w-xs">
            No projects have been registered in the Pokédex yet.
        </p>
        <PixelDivider className="mt-6 w-full max-w-xs" />
        <p className="mt-4 font-pixel-ui text-[0.55rem] uppercase tracking-[0.2em] text-stone/60">
            {pokedexEntries.length} entries registered
        </p>
    </div>
);

/**
 * The Pokédex project list. Each entry links to its deep-linkable detail route.
 */
export const Pokedex = () => {
    return (
        <section
            className="relative border-t-[3px] border-bark bg-cream py-16 sm:py-20"
            id="pokedex"
        >
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
                <SectionHeading
                    eyebrow="Registered Entries"
                    title="Pokédex"
                    description="Every project the trainer has catalogued. Open an entry to inspect its data."
                    icon="folder"
                />

                <div className="mt-10">
                    <Reveal>
                        <div className="pk-panel overflow-hidden">
                            <div className="flex items-center justify-between border-b-[3px] border-bark bg-sand px-4 py-3">
                                <h3 className="font-pixel-ui text-[0.68rem] uppercase tracking-[0.2em] text-bark">
                                    Entries
                                </h3>
                                <span className="font-mono text-sm text-honey">
                                    {pokedexEntries.length}
                                </span>
                            </div>

                            {pokedexEntries.length > 0 ? (
                                <ul aria-label="Pokédex entries" className="p-3 space-y-2">
                                    {pokedexEntries.map((entry) => (
                                        <li key={entry.number}>
                                            <Reveal delay={(entry.number - 1) * 40}>
                                                <PokedexListItem entry={entry} />
                                            </Reveal>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <PokedexEmpty />
                            )}
                        </div>
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default Pokedex;
