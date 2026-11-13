'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import PixelIcon from './pixel/PixelIcon';
import PixelBadge from './pixel/PixelBadge';
import PixelDivider from './pixel/PixelDivider';
import Reveal from './pixel/Reveal';
import SectionHeading from './SectionHeading';
import MenuSelector from './pixel/MenuSelector';
import { badges, badgeKinds, type Badge, type BadgeKind } from '../data/badges';
import { badgeSprites, badgePalette, type BadgeArt } from './pixel/badgeSprites';

type BadgeSpriteProps = {
    art: BadgeArt;
    className?: string;
};

/**
 * Renders a badge emblem as crisp-edged SVG.
 *
 * Badge emblems use their own palette so they stay visually separate from
 * the trainer sprites.
 */
const BadgeSprite = ({ art, className = '' }: BadgeSpriteProps) => {
    const width = art.rows[0]?.length ?? 16;
    const height = art.rows.length;
    const paths = new Map<string, string[]>();

    art.rows.forEach((row, y) => {
        [...row].forEach((char, x) => {
            const colour = badgePalette[char];
            if (!colour) return;
            const existing = paths.get(colour) ?? [];
            existing.push(`M${x} ${y}h1v1h-1z`);
            paths.set(colour, existing);
        });
    });

    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            className={className}
            role="img"
            aria-label={art.title}
            shapeRendering="crispEdges"
            xmlns="http://www.w3.org/2000/svg"
        >
            {Array.from(paths.entries()).map(([colour, data]) => (
                <path key={colour} d={data.join('')} fill={colour} />
            ))}
        </svg>
    );
};

/**
 * A single badge in the collection grid.
 */
const BadgeTile = ({
    badge,
    isSelected,
    onSelect,
}: {
    badge: Badge;
    isSelected: boolean;
    onSelect: () => void;
}) => {
    const selectedStyle = 'border-bark bg-leaf shadow-[4px_4px_0_0_var(--bark)]';
    const idleStyle = 'border-bark bg-cream hover:bg-sand';

    return (
        <button
            type="button"
            onClick={onSelect}
            aria-current={isSelected ? 'true' : 'false'}
            className={`pk-panel-raised flex h-full w-full flex-col items-center gap-3 p-4 text-center transition-all ${isSelected ? selectedStyle : idleStyle}`}
        >
            <BadgeSprite art={badgeSprites[badge.sprite]} className="h-20 w-20" />
            <span className="flex flex-col gap-1">
                <span className="font-pixel-ui text-[0.68rem] uppercase leading-tight tracking-[0.08em]">
                    {badge.name}
                </span>
                <span className="font-body text-[0.82rem] leading-snug opacity-80">
                    {badge.organisation}
                </span>
                {badge.period ? (
                    <span className="font-mono text-[0.8rem] leading-none opacity-70">
                        {badge.period}
                    </span>
                ) : null}
            </span>
            {isSelected ? (
                <span className="mt-auto flex items-center gap-1 font-pixel-ui text-[0.52rem] uppercase tracking-[0.18em] text-honey">
                    <MenuSelector className="text-honey" />
                    Selected
                </span>
            ) : null}
        </button>
    );
};

/**
 * The detail panel for the selected badge.
 */
const BadgeDetail = ({ badge }: { badge: Badge }) => {
    return (
        <div className="pk-panel flex h-full flex-col">
            <div className="flex items-center gap-4 border-b-[3px] border-bark bg-sand p-4 sm:p-5 flex-shrink-0">
                <BadgeSprite art={badgeSprites[badge.sprite]} className="h-20 w-20 shrink-0" />
                <div className="min-w-0">
                    <PixelBadge icon="badge" tone={badge.kind === 'Award' ? 'berry' : 'leaf'}>
                        {badge.kind}
                    </PixelBadge>
                    <h3 className="mt-2 font-pixel-ui text-[1.15rem] uppercase leading-tight tracking-[0.05em] text-bark">
                        {badge.name}
                    </h3>
                    <p className="mt-1 font-body text-[0.92rem] font-semibold text-leaf">
                        {badge.organisation}
                    </p>
                    {badge.period ? (
                        <p className="mt-0.5 font-mono text-[0.9rem] leading-none text-stone">
                            {badge.period}
                        </p>
                    ) : null}
                </div>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">
                <section>
                    <h4 className="flex items-center gap-2 font-pixel-ui text-[0.66rem] uppercase tracking-[0.2em] text-leaf">
                        <PixelIcon name="book" className="h-3.5 w-3.5 text-berry" />
                        What happened
                    </h4>
                    <p className="mt-2 font-body text-[0.97rem] leading-relaxed text-ink">
                        {badge.description}
                    </p>
                </section>

                <section>
                    <h4 className="flex items-center gap-2 font-pixel-ui text-[0.66rem] uppercase tracking-[0.2em] text-leaf">
                        <PixelIcon name="spark" className="h-3.5 w-3.5 text-berry" />
                        Why it matters
                    </h4>
                    <p className="mt-2 font-body text-[0.97rem] leading-relaxed text-stone">
                        {badge.significance}
                    </p>
                </section>

                {badge.supporting ? (
                    <section>
                        <h4 className="flex items-center gap-2 font-pixel-ui text-[0.66rem] uppercase tracking-[0.2em] text-leaf">
                            <PixelIcon name="folder" className="h-3.5 w-3.5 text-berry" />
                            Supporting work
                        </h4>
                        <p className="mt-2 font-body text-[0.97rem] text-stone">
                            <span className="font-semibold text-ink">{badge.supporting}</span> — see the
                            Pokédex for the full entry.
                        </p>
                        <Link
                            href="/Projects"
                            className="pk-btn mt-3 px-4 py-2.5 font-pixel-ui text-[0.6rem] uppercase tracking-[0.14em]"
                        >
                            <PixelIcon name="arrowRight" className="h-3.5 w-3.5" />
                            Open the Pokédex
                        </Link>
                    </section>
                ) : null}

                {badge.href ? (
                    <>
                        <PixelDivider />
                        <div>
                            <a
                                href={badge.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="pk-btn pk-btn-leaf px-4 py-2.5 font-pixel-ui text-[0.6rem] uppercase tracking-[0.14em]"
                            >
                                <PixelIcon name="arrowRight" className="h-3.5 w-3.5" />
                                View source
                            </a>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
};

/**
 * The empty state shown before a badge is picked.
 */
const BadgeEmpty = () => (
    <div className="pk-panel flex h-full flex-col items-center justify-center p-8 text-center">
        <span className="flex h-16 w-16 items-center justify-center border-2 border-bark bg-sand">
            <PixelIcon name="badge" className="h-8 w-8 text-bark/40" />
        </span>
        <h3 className="mt-4 font-pixel-ui text-[1rem] uppercase tracking-[0.1em] text-stone">
            No badge selected
        </h3>
        <p className="mt-2 max-w-xs font-body text-[0.95rem] leading-relaxed text-stone">
            Choose a badge from the case to read the full story behind it.
        </p>
        <PixelDivider className="mt-6 w-full max-w-xs" />
    </div>
);

/**
 * The Badge Case — a collection grid on the left, the selected badge on the
 * right. Desktop shows both at once; mobile stacks them.
 */
const BadgeCase = () => {
    const [kind, setKind] = useState<BadgeKind | 'All'>('All');
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const visible = useMemo(
        () => (kind === 'All' ? badges : badges.filter((badge) => badge.kind === kind)),
        [kind],
    );

    const selected = useMemo(
        () => badges.find((badge) => badge.id === selectedId) ?? null,
        [selectedId],
    );

    // Keep the selection valid when a filter hides it.
    const effectiveSelected =
        selected && visible.some((badge) => badge.id === selected.id) ? selected : null;

    return (
        <section
            className="relative border-t-[3px] border-bark bg-cream py-16 sm:py-20"
            id="badges"
        >
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
                <SectionHeading
                    eyebrow="The Badge Case"
                    title="Badges"
                    description="Verified milestones — employments, awards, upstream contributions and leadership roles."
                    icon="badge"
                />

                {/* Filter tabs. */}
                <Reveal className="mt-9">
                    <div role="tablist" aria-label="Badge categories" className="flex flex-wrap gap-2">
                        {(['All', ...badgeKinds] as const).map((entry) => {
                            const isActive = entry === kind;
                            const count =
                                entry === 'All'
                                    ? badges.length
                                    : badges.filter((badge) => badge.kind === entry).length;

                            return (
                                <button
                                    key={entry}
                                    role="tab"
                                    type="button"
                                    aria-selected={isActive}
                                    onClick={() => setKind(entry)}
                                    className={`pk-panel-raised flex items-center gap-2 px-3.5 py-2 ${
                                        isActive ? 'bg-leaf text-cream' : 'bg-cream text-ink'
                                    }`}
                                >
                                    <span className="font-pixel-ui text-[0.58rem] uppercase tracking-[0.14em]">
                                        {entry}
                                    </span>
                                    <span
                                        className={`font-mono text-[0.92rem] leading-none ${
                                            isActive ? 'text-honey' : 'text-stone'
                                        }`}
                                    >
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </Reveal>

                {/* Case body. */}
                <div className="mt-6 grid gap-4 lg:h-[68vh] lg:grid-cols-[1fr_380px] min-h-[calc(100vh-200px)]">
                    {/* Collection grid. */}
                    <Reveal className="lg:h-full">
                        <div className="pk-panel flex h-full flex-col overflow-hidden">
                            <div className="flex items-center justify-between border-b-[3px] border-bark bg-leaf px-4 py-2.5">
                                <span className="font-pixel-ui text-[0.66rem] uppercase tracking-[0.2em] text-cream">
                                    Collection
                                </span>
                                <span className="font-mono text-[0.95rem] text-honey">
                                    {visible.length}
                                </span>
                            </div>
                            <div className="grid flex-1 content-start gap-3 overflow-y-auto p-4 sm:grid-cols-2 xl:grid-cols-3 max-h-[380px]">
                                {visible.map((badge, index) => (
                                    <Reveal key={badge.id} delay={(index % 3) * 60} className="h-full">
                                        <BadgeTile
                                            badge={badge}
                                            isSelected={effectiveSelected?.id === badge.id}
                                            onSelect={() => setSelectedId(badge.id)}
                                        />
                                    </Reveal>
                                ))}
                            </div>
                        </div>
                    </Reveal>

                    {/* Detail panel. */}
                    <Reveal delay={80} className="lg:h-full min-h-0">
                        {effectiveSelected ? (
                            <BadgeDetail badge={effectiveSelected} />
                        ) : (
                            <BadgeEmpty />
                        )}
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default BadgeCase;
