import PixelIcon, { type PixelIconName } from './pixel/PixelIcon';
import PixelBadge from './pixel/PixelBadge';
import PixelDivider from './pixel/PixelDivider';
import type { PokedexEntry } from '../data/pokedex';

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
 * Detailed view of a Pokédex entry.
 */
export default function ProjectDetail({ entry }: { entry: PokedexEntry }) {
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
                    {entry.repoUrl && (
                        <a
                            href={entry.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pk-btn pk-btn-primary px-3 py-2 font-pixel-ui text-[0.56rem] uppercase tracking-[0.12em]"
                        >
                            <PixelIcon name="code" className="h-3 w-3" />
                            Repository
                        </a>
                    )}
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
                            {entry.highlights.map((highlight, highlightIndex) => (
                                <li
                                    key={highlightIndex}
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
                    {entry.repoUrl && (
                        <a
                            href={entry.repoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="pk-btn pk-btn-primary px-4 py-2.5 font-pixel-ui text-[0.6rem] uppercase tracking-[0.14em]"
                        >
                            <PixelIcon name="code" className="h-3.5 w-3.5" />
                            View on GitHub
                        </a>
                    )}
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
}
