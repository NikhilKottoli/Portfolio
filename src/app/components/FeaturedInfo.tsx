import React from 'react';
import Link from 'next/link';
import PixelBadge from './pixel/PixelBadge';
import PixelIcon, { type PixelIconName } from './pixel/PixelIcon';
import PixelSprite from './pixel/PixelSprite';
import Reveal from './pixel/Reveal';
import SectionHeading from './SectionHeading';
import { flowerSprite, leaflingSprite } from './pixel/sprites';
import { currentStatus, recentAdventures } from '../data/trainer';
import { featuredProjects } from '../data/projects';

const ADVENTURE_ICONS: PixelIconName[] = ['cloud', 'spark', 'code'];
const PROJECT_ICONS: PixelIconName[] = ['coin', 'key', 'flag'];

/**
 * The quick overview below the hero: where Nikhil is right now, what he has
 * been up to, and a small window into the project Pokédex.
 */
const FeaturedInfo = () => {
    return (
        <section className="relative bg-parchment py-16 sm:py-20" id="status">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeading
                    eyebrow="Field Notes"
                    title="Status Report"
                    description="A short readout of where things stand right now, and what has been happening lately."
                    icon="chart"
                    action={
                        <Link
                            href="/Experience"
                            className="pk-btn px-4 py-2.5 font-pixel-ui text-[0.6rem] uppercase tracking-[0.14em]"
                        >
                            <PixelIcon name="user" className="h-3.5 w-3.5" />
                            Full journey
                        </Link>
                    }
                />

                <div className="mt-10 grid gap-5 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
                    {/* Current status. */}
                    <Reveal className="h-full">
                        <div className="pk-panel h-full p-5 sm:p-6">
                            <div className="flex items-center gap-2 border-b-2 border-bark/15 pb-3">
                                <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
                                    <span className="absolute inline-flex h-full w-full animate-pulse-ring bg-berry" />
                                    <span className="relative inline-flex h-2.5 w-2.5 bg-berry" />
                                </span>
                                <h3 className="font-pixel-ui text-[0.68rem] uppercase tracking-[0.2em] text-bark">
                                    Current Status
                                </h3>
                            </div>

                            <dl className="mt-4 space-y-3.5">
                                <div>
                                    <dt className="font-pixel-ui text-[0.52rem] uppercase tracking-[0.16em] text-stone">
                                        Role
                                    </dt>
                                    <dd className="font-body text-[1.02rem] font-bold text-ink">
                                        {currentStatus.role}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-pixel-ui text-[0.52rem] uppercase tracking-[0.16em] text-stone">
                                        Organisation
                                    </dt>
                                    <dd className="font-body text-[0.95rem] text-ink">
                                        {currentStatus.organisation}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-pixel-ui text-[0.52rem] uppercase tracking-[0.16em] text-stone">
                                        Focus
                                    </dt>
                                    <dd className="font-body text-[0.95rem] leading-relaxed text-ink">
                                        {currentStatus.focus}
                                    </dd>
                                </div>
                                <div>
                                    <dt className="font-pixel-ui text-[0.52rem] uppercase tracking-[0.16em] text-stone">
                                        Availability
                                    </dt>
                                    <dd className="font-body text-[0.95rem] leading-relaxed text-leaf">
                                        {currentStatus.availability}
                                    </dd>
                                </div>
                            </dl>

                            <div className="mt-5 flex flex-wrap gap-2 border-t-2 border-dashed border-bark/25 pt-4">
                                <PixelBadge icon="spark" tone="berry">
                                    Active
                                </PixelBadge>
                                <PixelBadge icon="shield" tone="leaf">
                                    Open to offers
                                </PixelBadge>
                            </div>
                        </div>
                    </Reveal>

                    {/* Recent adventures. */}
                    <Reveal delay={80} className="h-full">
                        <div className="pk-panel h-full p-5 sm:p-6">
                            <div className="flex items-center gap-2 border-b-2 border-bark/15 pb-3">
                                <PixelIcon name="flag" className="h-4 w-4 text-berry" />
                                <h3 className="font-pixel-ui text-[0.68rem] uppercase tracking-[0.2em] text-bark">
                                    Recent Adventures
                                </h3>
                            </div>

                            <ul className="mt-4 space-y-4">
                                {recentAdventures.map((adventure, index) => (
                                    <li
                                        key={adventure.title}
                                        className="flex gap-3.5 border-b border-dashed border-bark/20 pb-4 last:border-b-0 last:pb-0"
                                    >
                                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border-2 border-bark bg-sand">
                                            <PixelIcon
                                                name={ADVENTURE_ICONS[index % ADVENTURE_ICONS.length]}
                                                className="h-4 w-4 text-bark"
                                            />
                                        </span>
                                        <div className="min-w-0">
                                            <h4 className="font-body text-[1.02rem] font-bold leading-snug text-ink">
                                                {adventure.title}
                                            </h4>
                                            <p className="mt-1 font-body text-[0.93rem] leading-relaxed text-stone">
                                                {adventure.detail}
                                            </p>
                                            <p className="mt-1.5 font-mono text-[0.95rem] leading-none text-leaf">
                                                {adventure.tag}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </Reveal>
                </div>

                {/* Featured projects. */}
                <Reveal className="mt-12">
                    <div className="flex flex-wrap items-end justify-between gap-4">
                        <div>
                            <span className="inline-flex items-center gap-2 font-pixel-ui text-[0.6rem] uppercase tracking-[0.24em] text-leaf">
                                <PixelIcon name="folder" className="h-3.5 w-3.5 text-berry" />
                                Pokédex preview
                            </span>
                            <h3 className="pk-text-shadow-soft mt-2 font-pixel-ui text-[clamp(1.2rem,3vw,1.6rem)] uppercase tracking-[0.06em] text-bark">
                                Featured Projects
                            </h3>
                        </div>

                        <Link
                            href="/Projects"
                            className="pk-btn px-4 py-2.5 font-pixel-ui text-[0.6rem] uppercase tracking-[0.14em]"
                        >
                            See all projects
                            <PixelIcon name="arrowRight" className="h-3.5 w-3.5" />
                        </Link>
                    </div>

                    <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {featuredProjects.map((project, index) => (
                            <article
                                key={project.title}
                                className="pk-panel-raised flex flex-col p-5"
                            >
                                <div className="flex items-center justify-between gap-3">
                                    <span className="flex h-10 w-10 items-center justify-center border-2 border-bark bg-honey">
                                        <PixelIcon
                                            name={PROJECT_ICONS[index % PROJECT_ICONS.length]}
                                            className="h-5 w-5 text-bark"
                                        />
                                    </span>
                                    {project.award ? (
                                        <PixelBadge icon="badge" tone="berry">
                                            Finalist
                                        </PixelBadge>
                                    ) : null}
                                </div>

                                <h4 className="mt-4 font-pixel-ui text-[0.9rem] uppercase tracking-[0.08em] text-bark">
                                    {project.title}
                                </h4>
                                <p className="mt-2 flex-1 font-body text-[0.93rem] leading-relaxed text-stone">
                                    {project.description}
                                </p>

                                <div className="mt-4 flex flex-wrap gap-1.5">
                                    {project.tech.map((tech) => (
                                        <span
                                            key={tech}
                                            className="border border-bark/45 bg-sand px-2 py-0.5 font-mono text-[0.9rem] leading-tight text-bark"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-4 inline-flex items-center gap-1.5 self-start font-pixel-ui text-[0.58rem] uppercase tracking-[0.14em] text-berry underline-offset-4 hover:underline"
                                >
                                    Explore project
                                    <PixelIcon name="arrowRight" className="h-3 w-3" />
                                </a>
                            </article>
                        ))}
                    </div>
                </Reveal>

                {/* A quiet strip that closes the section. */}
                <Reveal delay={120}>
                    <div className="mt-12 flex items-center justify-center gap-3 opacity-70">
                        <PixelSprite art={leaflingSprite} className="h-9 w-9" />
                        <span className="font-pixel-ui text-[0.58rem] uppercase tracking-[0.22em] text-stone">
                            More entries in the Pokédex soon
                        </span>
                        <PixelSprite art={flowerSprite} className="h-8 w-8" />
                    </div>
                </Reveal>
            </div>
        </section>
    );
};

export default FeaturedInfo;
