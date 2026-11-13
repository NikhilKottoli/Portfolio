'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PixelIcon, { type PixelIconName } from './pixel/PixelIcon';
import PixelSprite from './pixel/PixelSprite';
import PixelBadge from './pixel/PixelBadge';
import PixelDivider from './pixel/PixelDivider';
import PixelPanel from './pixel/PixelPanel';
import Reveal from './pixel/Reveal';
import SectionHeading from './SectionHeading';
import DialogueBox from './pixel/DialogueBox';
import { pokedexEntries, type PokedexEntry } from '../data/pokedex';
import { useSound } from './SoundProvider';

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
const PokedexListItem = ({
    entry,
    isSelected,
    onSelect,
}: {
    entry: PokedexEntry;
    isSelected: boolean;
    onSelect: () => void;
}) => {
    const categoryIcon = CATEGORY_ICONS[entry.category.split(' \u00B7 ')[0]] ?? 'coin';

    const selectedStyle = 'border-bark bg-leaf text-cream shadow-[4px_4px_0_0_var(--bark)]';
    const unselectedStyle = 'border-transparent bg-cream text-ink hover:border-bark hover:bg-sand';

    // In selected state (bg-leaf text-cream), the berry badge is light-on-light.
    // Use a variant with dark text for selected rows.
    const badgeTone = isSelected ? 'bark' : 'berry';

    return (
        <button
            type="button"
            onClick={onSelect}
            aria-current={isSelected ? 'true' : 'false'}
            aria-pressed={isSelected}
            className={`pk-panel-raised w-full flex items-center gap-3 p-3 text-left transition-all ${isSelected ? selectedStyle : unselectedStyle}`}
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
                        <PixelBadge icon="star" tone={badgeTone} className="shrink-0">
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

            {isSelected && (
                <PixelIcon name="arrowRight" className="h-4 w-4 ml-2 shrink-0 text-honey" />
            )}
        </button>
    );
};

/**
 * Detailed view of a Pokédex entry.
 */
const PokedexDetail = ({ entry }: { entry: PokedexEntry }) => {
    const categoryIcon = CATEGORY_ICONS[entry.category.split(' \u00B7 ')[0]] ?? 'coin';

    return (
        <div className="pk-panel h-full flex flex-col">
            {/* Header */ }
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b-[3px] border-bark bg-sand p-4 flex-shrink-0">
                <div className="flex items-center gap-3">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center border-2 border-bark bg-honey">
                        <PixelIcon name={entry.icon} className="h-7 w-7 text-bark" />
                    </span>
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="font-pixel-ui text-[0.6rem] uppercase tracking-[0.16em] text-stone">
                                No. {String(entry.number).padStart(3, '0')}
                            </span>
                            <h3 className="font-pixel-ui text-[1.1rem] uppercase tracking-[0.06em] text-bark">
                                {entry.name}
                            </h3>
                        </div>
                        <div className="mt-1.5 flex flex-wrap items-center gap-2">
                            <PixelIcon name={categoryIcon} className="h-3.5 w-3.5 text-leaf" />
                            <span className="font-mono text-[0.9rem] leading-none text-stone">
                                {entry.category}
                            </span>
                            {entry.award && (
                                <PixelBadge icon="star" tone="berry">
                                    Finalist
                                </PixelBadge>
                            )}
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                    <a
                        href={entry.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pk-btn pk-btn-primary px-3 py-2 font-pixel-ui text-[0.56rem] uppercase tracking-[0.12em]"
                    >
                        <PixelIcon name="code" className="h-3 w-3" />
                        Repository
                    </a>
                    {entry.demoUrl && (
                        <a
                            href={entry.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pk-btn pk-btn-leaf px-3 py-2 font-pixel-ui text-[0.56rem] uppercase tracking-[0.12em]"
                        >
                            <PixelIcon name="arrowRight" className="h-3 w-3" />
                            Live Demo
                        </a>
                    )}
                </div>
            </div>

            {/* Content */ }
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                {/* Description */ }
                <section>
                    <h4 className="font-pixel-ui text-[0.68rem] uppercase tracking-[0.2em] text-leaf flex items-center gap-2">
                        <PixelIcon name="book" className="h-3.5 w-3.5 text-berry" />
                        Overview
                    </h4>
                    <p className="mt-2 font-body text-[0.95rem] leading-relaxed text-ink">
                        {entry.description}
                    </p>
                </section>

                <PixelDivider label="Engineering" />

                {/* Problem */ }
                <section>
                    <h4 className="font-pixel-ui text-[0.68rem] uppercase tracking-[0.2em] text-leaf flex items-center gap-2">
                        <PixelIcon name="spark" className="h-3.5 w-3.5 text-berry" />
                        Problem
                    </h4>
                    <p className="mt-2 font-body text-[0.95rem] leading-relaxed text-stone">
                        {entry.problem}
                    </p>
                </section>

                {/* Approach */ }
                <section>
                    <h4 className="font-pixel-ui text-[0.68rem] uppercase tracking-[0.2em] text-leaf flex items-center gap-2">
                        <PixelIcon name="gear" className="h-3.5 w-3.5 text-berry" />
                        Technical Approach
                    </h4>
                    <p className="mt-2 font-body text-[0.95rem] leading-relaxed text-stone">
                        {entry.approach}
                    </p>
                </section>

                {/* Architecture */ }
                <section>
                    <h4 className="font-pixel-ui text-[0.68rem] uppercase tracking-[0.2em] text-leaf flex items-center gap-2">
                        <PixelIcon name="chip" className="h-3.5 w-3.5 text-berry" />
                        Architecture
                    </h4>
                    <p className="mt-2 font-body text-[0.95rem] leading-relaxed text-stone whitespace-pre-line">
                        {entry.architecture}
                    </p>
                </section>

                {/* Highlights */ }
                {entry.highlights.length > 0 && (
                    <section>
                        <h4 className="font-pixel-ui text-[0.68rem] uppercase tracking-[0.2em] text-leaf flex items-center gap-2">
                            <PixelIcon name="star" className="h-3.5 w-3.5 text-berry" />
                            Highlights
                        </h4>
                        <ul className="mt-2 space-y-1.5">
                            {entry.highlights.map((highlight, i) => (
                                <li
                                    key={i}
                                    className="flex gap-2 font-body text-[0.93rem] leading-relaxed text-ink"
                                >
                                    <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-berry" />
                                    {highlight}
                                </li>
                            ))}
                        </ul>
                    </section>
                )}

                {/* Context */ }
                {entry.context && (
                    <section>
                        <h4 className="font-pixel-ui text-[0.68rem] uppercase tracking-[0.2em] text-leaf flex items-center gap-2">
                            <PixelIcon name="flag" className="h-3.5 w-3.5 text-berry" />
                            Context
                        </h4>
                        <p className="mt-2 font-body text-[0.95rem] leading-relaxed text-stone">
                            {entry.context}
                        </p>
                    </section>
                )}

                {/* Tech Stack */ }
                <section>
                    <h4 className="font-pixel-ui text-[0.68rem] uppercase tracking-[0.2em] text-leaf flex items-center gap-2">
                        <PixelIcon name="code" className="h-3.5 w-3.5 text-berry" />
                        Technologies
                    </h4>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                        {entry.tech.map((tech) => (
                            <span
                                key={tech}
                                className="border border-bark/40 bg-sand px-2.5 py-1 font-mono text-[0.88rem] leading-tight text-bark"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </section>

                {/* Footer actions */ }
                <PixelDivider />
                <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                        href={entry.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pk-btn pk-btn-primary px-4 py-2.5 font-pixel-ui text-[0.6rem] uppercase tracking-[0.14em]"
                    >
                        <PixelIcon name="code" className="h-3.5 w-3.5" />
                        View on GitHub
                    </a>
                    {entry.demoUrl && (
                        <a
                            href={entry.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pk-btn pk-btn-leaf px-4 py-2.5 font-pixel-ui text-[0.6rem] uppercase tracking-[0.14em]"
                        >
                            <PixelIcon name="arrowRight" className="h-3.5 w-3.5" />
                            Open Live Demo
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

/**
 * Empty state when no project is selected.
 */
const PokedexEmpty = () => (
    <div className="pk-panel flex flex-col items-center justify-center h-full p-8 text-center">
        <PixelIcon name="folder" className="h-16 w-16 text-bark/30" />
        <h3 className="mt-4 font-pixel-ui text-[1rem] uppercase tracking-[0.1em] text-stone">
            Select a Project
        </h3>
        <p className="mt-2 font-body text-[0.95rem] leading-relaxed text-stone max-w-xs">
            Choose an entry from the Pok\u00E9dex to view its detailed information, architecture, and links.
        </p>
        <PixelDivider className="mt-6 w-full max-w-xs" />
        <p className="mt-4 font-pixel-ui text-[0.55rem] uppercase tracking-[0.2em] text-stone/60">
            {pokedexEntries.length} entries registered
        </p>
    </div>
);

/**
 * The main Pok\u00E9dex interface \u2014 a two-pane layout on desktop,
 * stacked on mobile with a bottom sheet style detail panel.
 */
export const Pokedex = () => {
    const [selectedEntry, setSelectedEntry] = useState<PokedexEntry | null>(null);
    const [mobileDetailOpen, setMobileDetailOpen] = useState(false);
    const { playPokeball } = useSound();

    // Close mobile detail on escape
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && mobileDetailOpen) {
                setMobileDetailOpen(false);
                setSelectedEntry(null);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [mobileDetailOpen]);

    const handleSelect = (entry: PokedexEntry) => {
        setSelectedEntry(entry);
        playPokeball();
        if (window.innerWidth < 1024) {
            setMobileDetailOpen(true);
        }
    };

    const handleCloseDetail = () => {
        setMobileDetailOpen(false);
        // On mobile, keep selection but close panel; on desktop, clear selection
        if (window.innerWidth >= 1024) {
            setSelectedEntry(null);
        }
    };

    return (
        <section
            className="relative border-t-[3px] border-bark bg-cream py-16 sm:py-20"
            id="pokedex"
        >
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
                <SectionHeading
                    eyebrow="Registered Entries"
                    title="Pokédex"
                    description="Every project the trainer has catalogued. Select an entry to inspect its data."
                    icon="folder"
                />

                {/* Desktop: two-pane layout */ }
                <div className="mt-10 hidden lg:grid lg:grid-cols-[340px_1fr] lg:gap-4 lg:h-[70vh] min-h-[calc(100vh-200px)]">
                    {/* Project List */ }
                    <Reveal className="h-full">
                        <div className="pk-panel h-full flex flex-col overflow-hidden">
                            <div className="flex items-center justify-between border-b-[3px] border-bark bg-sand px-4 py-3">
                                <h3 className="font-pixel-ui text-[0.68rem] uppercase tracking-[0.2em] text-bark">
                                    Entries
                                </h3>
                                <span className="font-mono text-sm text-honey">
                                    {pokedexEntries.length}
                                </span>
                            </div>
                            <div className="flex-1 overflow-y-auto p-3 space-y-2 max-h-[380px]">
                                {pokedexEntries.map((entry) => (
                                    <Reveal key={entry.number} delay={(entry.number - 1) * 40}>
                                        <PokedexListItem
                                            entry={entry}
                                            isSelected={selectedEntry?.number === entry.number}
                                            onSelect={() => handleSelect(entry)}
                                        />
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    {/* Detail Panel */ }
                    <Reveal delay={80} className="h-full min-h-0">
                        {selectedEntry ? (
                            <PokedexDetail entry={selectedEntry} />
                        ) : (
                            <PokedexEmpty />
                        )}
                    </Reveal>
                </div>

                {/* Mobile: stacked layout with bottom sheet */ }
                <div className="lg:hidden">
                    {/* List */ }
                    <Reveal className="mb-4">
                        <div className="pk-panel overflow-hidden">
                            <div className="flex items-center justify-between border-b-[3px] border-bark bg-sand px-4 py-3">
                                <h3 className="font-pixel-ui text-[0.68rem] uppercase tracking-[0.2em] text-bark">
                                    Entries
                                </h3>
                                <span className="font-mono text-sm text-honey">
                                    {pokedexEntries.length}
                                </span>
                            </div>
                            <div className="p-3 space-y-2 max-h-96 overflow-y-auto">
                                {pokedexEntries.map((entry) => (
                                    <Reveal key={entry.number} delay={(entry.number - 1) * 30}>
                                        <PokedexListItem
                                            entry={entry}
                                            isSelected={selectedEntry?.number === entry.number}
                                            onSelect={() => handleSelect(entry)}
                                        />
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    {/* Selected summary (compact) */ }
                    {selectedEntry && !mobileDetailOpen && (
                        <Reveal className="mb-4">
                            <div className="pk-panel-raised p-4">
                                <div className="flex items-center gap-3">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-bark bg-honey">
                                        <PixelIcon name={selectedEntry.icon} className="h-5 w-5 text-bark" />
                                    </span>
                                    <div className="min-w-0 flex-1">
                                        <span className="font-pixel-ui text-[0.55rem] uppercase tracking-[0.16em] text-stone">
                                            No. {String(selectedEntry.number).padStart(3, '0')}
                                        </span>
                                        <h4 className="font-pixel-ui text-[0.85rem] uppercase tracking-[0.06em] text-bark truncate">
                                            {selectedEntry.name}
                                        </h4>
                                    </div>
                                    <button
                                        onClick={() => setMobileDetailOpen(true)}
                                        className="pk-btn px-3 py-2 font-pixel-ui text-[0.56rem] uppercase tracking-[0.12em]"
                                    >
                                        View Details
                                        <PixelIcon name="arrowRight" className="h-3 w-3" />
                                    </button>
                                </div>
                            </div>
                        </Reveal>
                    )}
                </div>

                {/* Mobile Bottom Sheet Detail */ }
                {mobileDetailOpen && selectedEntry && (
                    <div
                        className="fixed inset-0 z-[60] flex items-end sm:items-center sm:justify-center bg-bark/70 px-3 sm:px-4 pb-3"
                        role="dialog"
                        aria-modal="true"
                        aria-label={`${selectedEntry.name} details`}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="pk-panel w-full max-w-2xl max-h-[85vh] overflow-hidden sm:max-h-[90vh] animate-slide-up"
                        >
                            <div className="flex items-center justify-between border-b-[3px] border-bark bg-sand px-4 py-3">
                                <h3 className="font-pixel-ui text-[0.68rem] uppercase tracking-[0.2em] text-bark">
                                    Entry Details
                                </h3>
                                <button
                                    onClick={handleCloseDetail}
                                    aria-label="Close details"
                                    className="flex h-9 w-9 items-center justify-center border-2 border-bark bg-cream text-bark transition-colors hover:bg-honey"
                                >
                                    <PixelIcon name="arrowDown" className="h-4 w-4 rotate-180" />
                                </button>
                            </div>
                            <div className="overflow-y-auto max-h-[75vh] sm:max-h-[80vh]">
                                <PokedexDetail entry={selectedEntry} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default Pokedex;