'use client';

import React, { useState, useMemo } from 'react';
import PixelIcon, { type PixelIconName } from './pixel/PixelIcon';
import PixelBadge from './pixel/PixelBadge';
import PixelDivider from './pixel/PixelDivider';
import Reveal from './pixel/Reveal';
import SectionHeading from './SectionHeading';
import MenuSelector from './pixel/MenuSelector';
import { journey, journeyCategories, type JourneyCategory, type JourneyMilestone } from '../data/journey';

const CATEGORY_ICONS: Record<JourneyCategory, PixelIconName> = {
    Education: 'book',
    Experience: 'flag',
    'Open Source': 'code',
    Leadership: 'star',
    Project: 'gear',
};

const CATEGORY_TONES: Record<JourneyCategory, 'berry' | 'leaf' | 'honey' | 'sand'> = {
    Education: 'sand',
    Experience: 'leaf',
    'Open Source': 'honey',
    Leadership: 'berry',
    Project: 'sand',
};

/**
 * One stop on the route. Clicking it opens the detail panel.
 */
const RouteStop = ({
    milestone,
    isSelected,
    onSelect,
}: {
    milestone: JourneyMilestone;
    isSelected: boolean;
    onSelect: () => void;
}) => {
    const selectedStyle = 'border-bark bg-leaf text-cream';
    const idleStyle = 'border-transparent bg-cream text-ink hover:border-bark hover:bg-sand';

    return (
        <button
            type="button"
            onClick={onSelect}
            aria-current={isSelected ? 'true' : 'false'}
            className={`pk-panel-raised flex w-full items-start gap-3 p-4 text-left transition-all ${isSelected ? selectedStyle : idleStyle}`}
        >
            {/* Route marker. */}
            <span className="relative flex h-11 w-11 shrink-0 items-center justify-center border-2 border-bark bg-sand">
                <PixelIcon name={CATEGORY_ICONS[milestone.category]} className="h-5 w-5 text-bark" />
            </span>

            <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-[0.82rem] leading-none opacity-80">
                        {milestone.period}
                    </span>
                    {milestone.ongoing ? (
                        <span className="border border-bark/40 bg-honey px-1.5 py-0.5 font-pixel-ui text-[0.48rem] uppercase tracking-[0.14em] text-ink">
                            Ongoing
                        </span>
                    ) : null}
                </span>
                <span className="mt-1.5 block font-pixel-ui text-[0.82rem] uppercase leading-tight tracking-[0.05em]">
                    {milestone.title}
                </span>
                <span className="mt-1 block font-body text-[0.86rem] leading-snug opacity-85">
                    {milestone.organisation}
                </span>
                <span className="mt-1.5 block font-body text-[0.84rem] leading-snug opacity-70">
                    {milestone.role}
                </span>
            </span>

            <span className="mt-1 shrink-0">
                {isSelected ? (
                    <MenuSelector className="text-honey" />
                ) : (
                    <PixelIcon name="arrowRight" className="h-3.5 w-3.5 opacity-50" />
                )}
            </span>
        </button>
    );
};

/**
 * The detail panel for the selected milestone.
 */
const MilestoneDetail = ({ milestone }: { milestone: JourneyMilestone }) => {
    return (
        <div className="pk-panel flex h-full flex-col overflow-hidden">
            <div className="border-b-[3px] border-bark bg-sand p-4 sm:p-5">
                <div className="flex flex-wrap items-center gap-2">
                    <PixelBadge icon={CATEGORY_ICONS[milestone.category]} tone={CATEGORY_TONES[milestone.category]}>
                        {milestone.category}
                    </PixelBadge>
                    {milestone.ongoing ? (
                        <PixelBadge icon="clock" tone="honey">
                            Ongoing
                        </PixelBadge>
                    ) : null}
                </div>

                <h3 className="mt-3 font-pixel-ui text-[1.15rem] uppercase leading-tight tracking-[0.05em] text-bark">
                    {milestone.title}
                </h3>
                <p className="mt-1.5 font-body text-[0.95rem] font-semibold text-leaf">
                    {milestone.organisation}
                </p>
                <p className="mt-0.5 font-mono text-[0.92rem] leading-none text-stone">
                    {milestone.period} · {milestone.role}
                </p>
            </div>

            <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">
                <section>
                    <h4 className="flex items-center gap-2 font-pixel-ui text-[0.66rem] uppercase tracking-[0.2em] text-leaf">
                        <PixelIcon name="book" className="h-3.5 w-3.5 text-berry" />
                        Overview
                    </h4>
                    <p className="mt-2 font-body text-[0.97rem] leading-relaxed text-ink">
                        {milestone.description}
                    </p>
                </section>

                <section>
                    <h4 className="flex items-center gap-2 font-pixel-ui text-[0.66rem] uppercase tracking-[0.2em] text-leaf">
                        <PixelIcon name="star" className="h-3.5 w-3.5 text-berry" />
                        Contributions
                    </h4>
                    <ul className="mt-2 space-y-1.5">
                        {milestone.contributions.map((contribution, index) => (
                            <li
                                key={index}
                                className="flex gap-2 font-body text-[0.95rem] leading-relaxed text-stone"
                            >
                                <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 shrink-0 bg-berry" />
                                {contribution}
                            </li>
                        ))}
                    </ul>
                </section>

                {milestone.href ? (
                    <>
                        <PixelDivider />
                        <div>
                            <a
                                href={milestone.href}
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
 * The empty state shown before a milestone is picked.
 */
const JourneyEmpty = () => (
    <div className="pk-panel flex h-full flex-col items-center justify-center p-8 text-center">
        <span className="flex h-16 w-16 items-center justify-center border-2 border-bark bg-sand">
            <PixelIcon name="flag" className="h-8 w-8 text-bark/40" />
        </span>
        <h3 className="mt-4 font-pixel-ui text-[1rem] uppercase tracking-[0.1em] text-stone">
            No stop selected
        </h3>
        <p className="mt-2 max-w-xs font-body text-[0.95rem] leading-relaxed text-stone">
            Pick a stop on the route to read what happened there.
        </p>
        <PixelDivider className="mt-6 w-full max-w-xs" />
    </div>
);

/**
 * The Journey — a route through the trainer's history.
 *
 * The route is drawn as a vertical line with markers, but every milestone is
 * a plain button in a scannable list. Nothing has to be walked through.
 */
const Journey = () => {
    const [category, setCategory] = useState<JourneyCategory | 'All'>('All');
    const [selectedId, setSelectedId] = useState<string | null>(null);

    const visible = useMemo(
        () => (category === 'All' ? journey : journey.filter((item) => item.category === category)),
        [category],
    );

    const selected = useMemo(
        () => visible.find((item) => item.id === selectedId) ?? null,
        [visible, selectedId],
    );

    return (
        <section
            className="relative overflow-hidden border-t-[3px] border-bark bg-parchment py-16 sm:py-20"
            id="journey"
        >
            <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
                <SectionHeading
                    eyebrow="Adventure Log"
                    title="Journey"
                    description="Education, employment, open source work, leadership and independent projects, in order."
                    icon="flag"
                />

                {/* Category filter. */}
                <Reveal className="mt-9">
                    <div role="tablist" aria-label="Journey categories" className="flex flex-wrap gap-2">
                        {(['All', ...journeyCategories] as const).map((entry) => {
                            const isActive = entry === category;
                            const count =
                                entry === 'All'
                                    ? journey.length
                                    : journey.filter((item) => item.category === entry).length;

                            return (
                                <button
                                    key={entry}
                                    role="tab"
                                    type="button"
                                    aria-selected={isActive}
                                    onClick={() => setCategory(entry)}
                                    className={`pk-panel-raised flex items-center gap-2 px-3.5 py-2 ${
                                        isActive ? 'bg-leaf text-cream' : 'bg-cream text-ink'
                                    }`}
                                >
                                    <PixelIcon
                                        name={entry === 'All' ? 'book' : CATEGORY_ICONS[entry]}
                                        className={`h-3.5 w-3.5 ${isActive ? 'text-honey' : 'text-berry'}`}
                                    />
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

                {/* Route body. */}
                <div className="mt-6 grid gap-4 lg:h-[72vh] lg:grid-cols-[1fr_380px]">
                    {/* Route list. */}
                    <Reveal className="lg:h-full">
                        <div className="pk-panel flex h-full flex-col overflow-hidden">
                            <div className="flex items-center justify-between border-b-[3px] border-bark bg-leaf px-4 py-2.5">
                                <span className="font-pixel-ui text-[0.66rem] uppercase tracking-[0.2em] text-cream">
                                    Route
                                </span>
                                <span className="font-mono text-[0.95rem] text-honey">
                                    {visible.length}
                                </span>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 sm:p-5">
                                <ol className="relative space-y-3 before:absolute before:bottom-3 before:left-[2.25rem] before:top-3 before:w-0.5 before:bg-bark/30">
                                    {visible.map((milestone, index) => (
                                        <li key={milestone.id}>
                                            <Reveal delay={(index % 4) * 60}>
                                                <div className="relative pl-9">
                                                    <span
                                                        aria-hidden="true"
                                                        className="absolute left-[2.25rem] top-4 -translate-x-1/2 flex h-6 w-6 items-center justify-center border-2 border-bark bg-cream"
                                                    >
                                                        <span className="h-2 w-2 rotate-45 bg-berry" />
                                                    </span>
                                                    <RouteStop
                                                        milestone={milestone}
                                                        isSelected={selected?.id === milestone.id}
                                                        onSelect={() => setSelectedId(milestone.id)}
                                                    />
                                                </div>
                                            </Reveal>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </Reveal>

                    {/* Detail panel. */}
                    <Reveal delay={80} className="lg:h-full">
                        {selected ? (
                            <MilestoneDetail milestone={selected} />
                        ) : (
                            <JourneyEmpty />
                        )}
                    </Reveal>
                </div>
            </div>
        </section>
    );
};

export default Journey;
