'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import PixelIcon, { type PixelIconName } from './pixel/PixelIcon';
import PixelBadge from './pixel/PixelBadge';
import PixelDivider from './pixel/PixelDivider';
import Reveal from './pixel/Reveal';
import SectionHeading from './SectionHeading';
import MenuSelector from './pixel/MenuSelector';
import {
    disciplines,
    technologies,
    keyItems,
    type InventoryItem,
    type Pocket,
} from '../data/inventory';
import { pokedexEntries } from '../data/pokedex';

type PocketMeta = {
    id: Pocket;
    /** The name printed on the bag tab. */
    label: string;
    /** One-line description of what the pocket holds. */
    hint: string;
    icon: PixelIconName;
};

const POCKETS: PocketMeta[] = [
    {
        id: 'tm',
        label: 'TMs',
        hint: 'Engineering disciplines',
        icon: 'chip',
    },
    {
        id: 'item',
        label: 'ITEMS',
        hint: 'Technologies & tools',
        icon: 'gear',
    },
    {
        id: 'key',
        label: 'KEY ITEMS',
        hint: 'Important platforms',
        icon: 'key',
    },
];

/**
 * One row in the bag list. Uses the GBA selection arrow when active.
 */
const BagRow = ({
    item,
    isSelected,
    onSelect,
}: {
    item: InventoryItem;
    isSelected: boolean;
    onSelect: () => void;
}) => {
    const selectedStyle = 'bg-leaf text-cream';
    const idleStyle = 'text-ink hover:bg-sand';

    return (
        <button
            type="button"
            onClick={onSelect}
            aria-current={isSelected ? 'true' : 'false'}
            className={`flex w-full items-center gap-2.5 border-b border-bark/15 px-3 py-2.5 text-left transition-colors ${isSelected ? selectedStyle : idleStyle}`}
        >
            <span className="w-4 shrink-0">
                {isSelected ? (
                    <MenuSelector className="text-honey" />
                ) : null}
            </span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-bark bg-sand">
                <PixelIcon name={item.icon} className="h-4 w-4 text-bark" />
            </span>
            <span className="min-w-0 flex-1">
                <span className="block font-pixel-ui text-[0.68rem] uppercase tracking-[0.1em]">
                    {item.name}
                </span>
                <span className="mt-0.5 block font-body text-[0.82rem] leading-snug opacity-80">
                    {item.summary}
                </span>
            </span>
        </button>
    );
};

/**
 * The detail panel for the selected bag entry.
 */
const ItemDetail = ({ item }: { item: InventoryItem }) => {
    const related = useMemo(
        () =>
            item.relatedProjects
                .map((name) => pokedexEntries.find((entry) => entry.name === name))
                .filter((entry): entry is (typeof pokedexEntries)[number] => Boolean(entry)),
        [item.relatedProjects],
    );

    const technologiesList =
        'technologies' in item ? (item as { technologies: string[] }).technologies : null;

    return (
        <div className="pk-panel flex h-full flex-col">
            <div className="flex items-center gap-3 border-b-[3px] border-bark bg-sand p-4 flex-shrink-0">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-bark bg-honey">
                    <PixelIcon name={item.icon} className="h-7 w-7 text-bark" />
                </span>
                <div className="min-w-0">
                    <span className="font-pixel-ui text-[0.58rem] uppercase tracking-[0.2em] text-berry">
                        {item.label}
                    </span>
                    <h3 className="font-pixel-ui text-[1.15rem] uppercase tracking-[0.06em] text-bark">
                        {item.name}
                    </h3>
                </div>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">
                <section>
                    <h4 className="flex items-center gap-2 font-pixel-ui text-[0.66rem] uppercase tracking-[0.2em] text-leaf">
                        <PixelIcon name="book" className="h-3.5 w-3.5 text-berry" />
                        Description
                    </h4>
                    <p className="mt-2 font-body text-[0.97rem] leading-relaxed text-ink">
                        {item.description}
                    </p>
                </section>

                <section>
                    <h4 className="flex items-center gap-2 font-pixel-ui text-[0.66rem] uppercase tracking-[0.2em] text-leaf">
                        <PixelIcon name="gear" className="h-3.5 w-3.5 text-berry" />
                        How it is used
                    </h4>
                    <p className="mt-2 font-body text-[0.97rem] leading-relaxed text-stone">
                        {item.usage}
                    </p>
                </section>

                {technologiesList && technologiesList.length > 0 ? (
                    <section>
                        <h4 className="flex items-center gap-2 font-pixel-ui text-[0.66rem] uppercase tracking-[0.2em] text-leaf">
                            <PixelIcon name="chip" className="h-3.5 w-3.5 text-berry" />
                            Related Technologies
                        </h4>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                            {technologiesList.map((tech) => (
                                <span
                                    key={tech}
                                    className="border border-bark/40 bg-sand px-2.5 py-1 font-mono text-[0.88rem] leading-tight text-bark"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </section>
                ) : null}

                <section>
                    <h4 className="flex items-center gap-2 font-pixel-ui text-[0.66rem] uppercase tracking-[0.2em] text-leaf">
                        <PixelIcon name="folder" className="h-3.5 w-3.5 text-berry" />
                        Related Projects
                    </h4>
                    {related.length > 0 ? (
                        <ul className="mt-3 space-y-2">
                            {related.map((entry) => (
                                <li key={entry.number}>
                                    <Link
                                        href="/Projects"
                                        className="pk-panel-recessed flex items-center gap-3 p-3 transition-colors hover:bg-sand"
                                    >
                                        <span className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-bark bg-cream">
                                            <PixelIcon name={entry.icon} className="h-4 w-4 text-bark" />
                                        </span>
                                        <span className="min-w-0 flex-1">
                                            <span className="block font-pixel-ui text-[0.62rem] uppercase tracking-[0.1em] text-bark">
                                                {entry.name}
                                            </span>
                                            <span className="mt-0.5 block font-body text-[0.84rem] leading-snug text-stone">
                                                {entry.category}
                                            </span>
                                        </span>
                                        <PixelIcon name="arrowRight" className="h-3.5 w-3.5 shrink-0 text-berry" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="mt-2 font-body text-[0.93rem] italic text-stone">
                            No linked projects — this one supports the underlying work rather than appearing on its own.
                        </p>
                    )}
                </section>

                {item.href ? (
                    <>
                        <PixelDivider />
                        <div>
                            <a
                                href={item.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pk-btn pk-btn-leaf px-4 py-2.5 font-pixel-ui text-[0.6rem] uppercase tracking-[0.14em]"
                            >
                                <PixelIcon name="arrowRight" className="h-3.5 w-3.5" />
                                Open link
                            </a>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
};

/**
 * The empty state shown when a pocket has no selection yet.
 */
const BagEmpty = ({ pocket }: { pocket: PocketMeta }) => (
    <div className="pk-panel flex h-full flex-col items-center justify-center p-8 text-center">
        <span className="flex h-16 w-16 items-center justify-center border-2 border-bark bg-sand">
            <PixelIcon name={pocket.icon} className="h-8 w-8 text-bark/40" />
        </span>
        <h3 className="mt-4 font-pixel-ui text-[1rem] uppercase tracking-[0.1em] text-stone">
            {pocket.label} selected
        </h3>
        <p className="mt-2 max-w-xs font-body text-[0.95rem] leading-relaxed text-stone">
            Pick an entry from the {pocket.label} pocket to see what it covers and where it was used.
        </p>
        <PixelDivider className="mt-6 w-full max-w-xs" />
    </div>
);

/**
 * The Inventory — a Pokémon Bag with three pockets.
 *
 * TMs are engineering disciplines, ITEMS are technologies, KEY ITEMS are the
 * platforms that matter most. Desktop shows the list and the detail side by
 * side; mobile stacks them.
 */
const Inventory = () => {
    const [pocket, setPocket] = useState<Pocket>('tm');
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const pocketItems = useMemo(() => {
        if (pocket === 'tm') return disciplines;
        if (pocket === 'item') return technologies;
        return keyItems;
    }, [pocket]);

    const selected = useMemo(
        () => pocketItems.find((item) => item.id === selectedId) ?? null,
        [pocketItems, selectedId],
    );

    // Switching pocket clears the selection so the detail panel never shows a
    // stale entry from another pocket.
    useEffect(() => {
        setSelectedId(null);
    }, [pocket]);

    const activePocket = POCKETS.find((entry) => entry.id === pocket) ?? POCKETS[0];

    return (
        <section
            className="relative border-t-[3px] border-bark bg-parchment py-16 sm:py-20"
            id="inventory"
        >
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
                <SectionHeading
                    eyebrow="The Bag"
                    title="Inventory"
                    description="What the trainer carries: the disciplines, the technologies and the platforms behind the work."
                    icon="book"
                />

                {/* Pocket selector. */}
                <Reveal className="mt-9">
                    <div
                        role="tablist"
                        aria-label="Inventory pockets"
                        className="flex flex-wrap gap-2"
                    >
                        {POCKETS.map((entry) => {
                            const isActive = entry.id === pocket;
                            const count =
                                entry.id === 'tm'
                                    ? disciplines.length
                                    : entry.id === 'item'
                                      ? technologies.length
                                      : keyItems.length;

                            return (
                                <button
                                    key={entry.id}
                                    role="tab"
                                    type="button"
                                    aria-selected={isActive}
                                    onClick={() => setPocket(entry.id)}
                                    className={`pk-panel-raised flex items-center gap-2.5 px-4 py-2.5 ${
                                        isActive ? 'bg-leaf text-cream' : 'bg-cream text-ink'
                                    }`}
                                >
                                    <PixelIcon
                                        name={entry.icon}
                                        className={`h-4 w-4 ${isActive ? 'text-honey' : 'text-berry'}`}
                                    />
                                    <span className="font-pixel-ui text-[0.62rem] uppercase tracking-[0.16em]">
                                        {entry.label}
                                    </span>
                                    <span
                                        className={`font-mono text-[0.95rem] leading-none ${
                                            isActive ? 'text-honey' : 'text-stone'
                                        }`}
                                    >
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                    <p className="mt-3 font-body text-[0.92rem] text-stone">
                        {activePocket.hint}
                    </p>
                </Reveal>

                {/* Bag body. */}
                <div className="mt-6 grid gap-4 lg:h-[68vh] lg:grid-cols-[340px_1fr] min-h-[calc(100vh-200px)]">
                    {/* List. */}
                    <Reveal className="lg:h-full">
                        <div className="pk-panel flex h-full flex-col overflow-hidden">
                            <div className="flex items-center justify-between border-b-[3px] border-bark bg-leaf px-4 py-2.5">
                                <span className="font-pixel-ui text-[0.66rem] uppercase tracking-[0.2em] text-cream">
                                    {activePocket.label}
                                </span>
                                <span className="font-mono text-[0.95rem] text-honey">
                                    {pocketItems.length}
                                </span>
                            </div>
                            <div className="flex-1 overflow-y-auto max-h-[380px]">
                                {pocketItems.map((item) => (
                                    <BagRow
                                        key={item.id}
                                        item={item}
                                        isSelected={selectedId === item.id}
                                        onSelect={() => setSelectedId(item.id)}
                                    />
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    {/* Detail. */}
                    <Reveal delay={80} className="lg:h-full">
                        {selected ? (
                            <ItemDetail item={selected} />
                        ) : (
                            <BagEmpty pocket={activePocket} />
                        )}
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default Inventory;
